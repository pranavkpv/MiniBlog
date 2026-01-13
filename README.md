📝 Mini Blog: Clean Architecture Platform
A high-performance, secure, and scalable blogging platform. This project serves as a showcase for Clean Architecture on the backend and a Modern Dark-Mode UX on the frontend.

🏗️ Architecture Philosophy
The backend is built following Uncle Bob’s Clean Architecture. This ensures the business logic is independent of frameworks, databases, or UI.

Domain Layer: Pure business logic, entities, and repository interfaces. No dependencies.

Application Layer: Use cases that orchestrate the flow of data to and from entities.

Infrastructure Layer: Low-level details like MongoDB models, JWT implementation, and Bcrypt hashing.

Presentation Layer: Express controllers, routes, and custom error-handling middleware.

🚀 Key Features
Premium UX/UI: A sleek, dark-themed interface built with Tailwind CSS, featuring glassmorphism and smooth transitions.

Full CRUD: Users can create, read, update, and soft-delete their stories.

Security First:

JWT-based authentication with secure storage.

Password hashing via bcrypt.

Ownership Enforcement: Users can only modify or delete their own data.

Interactive Forms: Real-time validation, loading states, and password visibility toggles.

💻 Tech Stack
Frontend
React 18 (Functional Components & Hooks)

Tailwind CSS (Custom Dark-Mode System)

React Router Dom (Protected Route implementation)

Axios (Interceptors for Auth tokens)

React Hot Toast (User notifications)

Backend
Node.js & Express

MongoDB & Mongoose (ODM)

JSON Web Tokens (JWT) (Session management)

Clean Architecture Pattern

📂 Project Structure

mini-blogging-platform/
├── backend/                  # Clean Architecture Backend
│   ├── src/
│   │   ├── domain/           # Entities & Repository Interfaces
│   │   ├── application/      # Use Cases (Business Logic)
│   │   ├── infrastructure/   # DB Models & Implementations
│   │   └── presentation/     # Controllers & Routes
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/       # UI Components (Buttons, Inputs)
│   │   ├── contexts/         # Auth State Management
│   │   ├── pages/            # View Components (Login, MyPosts)
│   │   └── services/         # API Integration Logic

🛠️ Getting Started
1. Prerequisites
Node.js: v16 or higher

MongoDB: A local instance or a MongoDB Atlas URI

2. Environment Setup
Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_ultra_secret_key
NODE_ENV=development

Create a .env file in the frontend directory:

REACT_APP_API_URL=http://localhost:5000/api

3. Installation & Execution

# Install dependencies for both
cd backend && npm install
cd ../frontend && npm install

# Start Backend (Port 5000)
cd backend
npm run dev

# Start Frontend (Port 3000)
cd frontend
npm start

🛣️ API Documentation
Authentication

Method,Endpoint,Description
POST,/api/auth/register,Create a new account
POST,/api/auth/login,Authenticate and get token

Method,Endpoint,Auth,Description
GET,/api/posts,🔑,Get user-specific posts
POST,/api/posts,🔑,Create a new story
PUT,/api/posts/:id,🔑,Update existing post
DELETE,/api/posts/:id,🔑,Soft-delete a post