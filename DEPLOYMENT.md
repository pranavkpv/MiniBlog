# Deployment Guide

This guide covers deployment options for the Mini Blogging Platform.

## Option 1: Docker Compose (Recommended for Local/Development)

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. Clone the repository and navigate to the project directory

2. Create a `.env` file in the root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

3. Start all services:
```bash
docker-compose up -d
```

4. The application will be available at:
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

5. To stop all services:
```bash
docker-compose down
```

6. To view logs:
```bash
docker-compose logs -f backend
```

## Option 2: AWS Deployment

### Using AWS ECS (Elastic Container Service)

1. **Build and push Docker image to ECR:**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t blogging-platform-backend ./backend

# Tag image
docker tag blogging-platform-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/blogging-platform-backend:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/blogging-platform-backend:latest
```

2. **Create ECS Task Definition** (task-definition.json):
```json
{
  "family": "blogging-platform-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/blogging-platform-backend:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "PORT",
          "value": "5000"
        },
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "MONGODB_URI",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:<account-id>:secret:mongodb-uri"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:<account-id>:secret:jwt-secret"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "node -e \"require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})\""],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/blogging-platform-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

3. **Deploy MongoDB using AWS DocumentDB** or **MongoDB Atlas**

4. **Create Application Load Balancer** for health checks and routing

### Using AWS Elastic Beanstalk

1. Install EB CLI:
```bash
pip install awsebcli
```

2. Initialize EB:
```bash
eb init -p node.js blogging-platform
```

3. Create environment:
```bash
eb create blogging-platform-env
```

4. Set environment variables:
```bash
eb setenv MONGODB_URI=<your-mongodb-uri> JWT_SECRET=<your-secret> NODE_ENV=production
```

## Option 3: Azure Deployment

### Using Azure Container Instances

1. **Build and push to Azure Container Registry:**
```bash
az acr build --registry <registry-name> --image blogging-platform-backend:latest ./backend
```

2. **Deploy container:**
```bash
az container create \
  --resource-group <resource-group> \
  --name blogging-backend \
  --image <registry-name>.azurecr.io/blogging-platform-backend:latest \
  --dns-name-label blogging-backend \
  --ports 5000 \
  --environment-variables \
    PORT=5000 \
    NODE_ENV=production \
  --secure-environment-variables \
    MONGODB_URI=<mongodb-uri> \
    JWT_SECRET=<jwt-secret>
```

### Using Azure App Service

1. **Create App Service:**
```bash
az webapp create --resource-group <resource-group> --plan <app-service-plan> --name <app-name> --runtime "NODE:18-lts"
```

2. **Configure environment variables:**
```bash
az webapp config appsettings set \
  --resource-group <resource-group> \
  --name <app-name> \
  --settings \
    PORT=5000 \
    NODE_ENV=production \
    MONGODB_URI=<mongodb-uri> \
    JWT_SECRET=<jwt-secret>
```

## Option 4: Google Cloud Platform (GCP)

### Using Cloud Run

1. **Build and push to Container Registry:**
```bash
gcloud builds submit --tag gcr.io/<project-id>/blogging-platform-backend ./backend
```

2. **Deploy to Cloud Run:**
```bash
gcloud run deploy blogging-backend \
  --image gcr.io/<project-id>/blogging-platform-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars PORT=5000,NODE_ENV=production \
  --set-secrets MONGODB_URI=mongodb-uri:latest,JWT_SECRET=jwt-secret:latest \
  --port 5000
```

## Environment Variables

Required environment variables:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `NODE_ENV`: Environment (development/production)

## Health Check Endpoint

The application exposes a health check endpoint at `/health` that returns:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Considerations

1. **Never commit `.env` files** - Use environment variables or secret management services
2. **Use strong JWT_SECRET** - Generate a secure random string
3. **Enable HTTPS** - Use SSL/TLS certificates in production
4. **Configure CORS** - Restrict allowed origins in production
5. **Use MongoDB Atlas** - For managed database with built-in security
6. **Enable rate limiting** - Consider adding rate limiting middleware
7. **Monitor logs** - Set up logging and monitoring solutions

## Frontend Deployment

For frontend deployment, build the React app and serve with a static hosting service:

1. **Build the frontend:**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy to:**
   - **Netlify**: Drag and drop the `build` folder
   - **Vercel**: Connect GitHub repository
   - **AWS S3 + CloudFront**: Upload build folder to S3 bucket
   - **Azure Static Web Apps**: Use Azure CLI or GitHub Actions

3. **Set environment variable:**
   - `REACT_APP_API_URL`: Your backend API URL

