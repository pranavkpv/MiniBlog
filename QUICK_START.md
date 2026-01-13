# Quick Start Guide

Get up and running in 5 minutes!

## Option 1: Docker (Easiest)

```bash
# 1. Clone the repository
git clone <repository-url>
cd mini-blogging-platform

# 2. Create .env file
echo "JWT_SECRET=$(openssl rand -base64 32)" > .env

# 3. Start everything
docker-compose up -d

# 4. Check status
docker-compose ps

# 5. View logs
docker-compose logs -f backend
```

Backend will be available at: http://localhost:5000
Health check: http://localhost:5000/health

## Option 2: Local Development

### Prerequisites Check
```bash
node --version  # Should be v16+
npm --version
mongod --version  # Or use MongoDB Atlas
```

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env and set:
# - MONGODB_URI (local or Atlas)
# - JWT_SECRET (generate a random string)

# 4. Start MongoDB (if local)
# Option A: Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Option B: MongoDB Atlas
# Use connection string in .env

# 5. Start backend
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
# 1. Navigate to frontend (in new terminal)
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# 4. Start frontend
npm start
```

Frontend runs on: http://localhost:3000

## Testing the Application

1. **Register a new user**
   - Go to http://localhost:3000/register
   - Enter email and password (min 6 characters)
   - Click "Create account"

2. **Login**
   - Go to http://localhost:3000/login
   - Enter credentials
   - You'll be redirected to "My Posts"

3. **Create a post**
   - Click "Create New Post"
   - Enter title and content
   - Click "Create Post"

4. **Edit/Delete posts**
   - From "My Posts" page
   - Click "Edit" or "Delete" on any post

## API Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Posts (replace TOKEN with JWT from login)
```bash
curl -X GET http://localhost:5000/api/posts \
  -H "Authorization: Bearer TOKEN"
```

### Create Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"This is the content"}'
```

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `docker ps` or `mongod --version`
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use: `netstat -an | grep 5000`

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in backend

### MongoDB connection issues
- Verify MongoDB is running
- Check connection string format
- For Atlas: Ensure IP is whitelisted and credentials are correct

### Docker issues
- Ensure Docker is running
- Check logs: `docker-compose logs`
- Restart containers: `docker-compose restart`

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the code structure
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Read [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for contribution guidelines

## Need Help?

- Check the main [README.md](./README.md)
- Review error messages in console/logs
- Ensure all environment variables are set correctly

