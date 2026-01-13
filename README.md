# Mini Blogging Platform

A secure, scalable mini blogging platform built with Node.js, Express, MongoDB, and React following clean architecture principles.

## Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/          # Core business entities and interfaces
├── application/     # Use cases and business logic
├── infrastructure/  # Database, external services, frameworks
└── presentation/    # API controllers, routes, middleware
```

## Technology Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React (Functional Components)
- React Router
- Axios
- TailwindCSS

## Features

- User authentication (Register/Login)
- JWT-based session management
- CRUD operations for blog posts
- Ownership enforcement (users can only manage their own posts)
- Soft delete for posts
- Protected routes
- Responsive UI

## Project Structure

```
mini-blogging-platform/
├── backend/
│   ├── src/
│   │   ├── domain/              # Domain layer (entities, interfaces)
│   │   │   ├── entities/        # Business entities (User, Post)
│   │   │   └── repositories/    # Repository interfaces
│   │   ├── application/         # Application layer (use cases)
│   │   └── services/            # Business logic services
│   │   ├── infrastructure/     # Infrastructure layer
│   │   │   ├── database/        # MongoDB models
│   │   │   ├── repositories/    # Repository implementations
│   │   │   └── auth/            # JWT & Password services
│   │   └── presentation/        # Presentation layer
│   │       ├── controllers/     # Request handlers
│   │       ├── routes/          # API routes
│   │       └── middleware/      # Express middleware
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── contexts/           # React contexts (Auth)
│   │   ├── pages/              # Page components
│   │   └── services/           # API services
│   └── package.json
├── docker-compose.yml          # Docker Compose configuration
├── DEPLOYMENT.md               # Deployment guide
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local, Docker, or Atlas)
- npm or yarn
- Docker (optional, for containerized deployment)

### Quick Start with Docker (Recommended)

1. Clone the repository
```bash
git clone <repository-url>
cd mini-blogging-platform
```

2. Create `.env` file in root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

3. Start all services:
```bash
docker-compose up -d
```

4. Access the application:
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Manual Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mini-blogging-platform
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables

Backend (create `backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogging-platform
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

Frontend (create `frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start MongoDB (if not using Docker):
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Or use MongoDB Atlas connection string
```

6. Start the application

Backend:
```bash
cd backend
npm run dev
```

Frontend (in a new terminal):
```bash
cd frontend
npm start
```

The frontend will open at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Posts (Protected)
- `GET /api/posts` - Get all posts for logged-in user
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post (owner only)
- `DELETE /api/posts/:id` - Soft delete a post (owner only)

## Deployment

See `DEPLOYMENT.md` for cloud deployment instructions.

## License

MIT

