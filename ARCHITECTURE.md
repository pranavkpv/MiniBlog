# Architecture Documentation

## Clean Architecture Overview

This project follows **Clean Architecture** principles, ensuring separation of concerns, testability, and maintainability. The architecture is divided into four main layers:

### Layer Structure

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Controllers, Routes, Middleware)     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Application Layer                 │
│     (Services, Use Cases)                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Domain Layer                      │
│  (Entities, Repository Interfaces)      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Infrastructure Layer                │
│  (Database, External Services)           │
└─────────────────────────────────────────┘
```

## Layer Details

### 1. Domain Layer (`backend/src/domain/`)

**Purpose**: Contains core business logic and entities. This layer is framework-agnostic and has no dependencies on external libraries.

**Components**:
- **Entities** (`entities/`): Core business objects
  - `User.js`: User domain entity with business rules
  - `Post.js`: Post domain entity with business methods
  
- **Repository Interfaces** (`repositories/`): Contracts for data access
  - `IUserRepository.js`: Interface for user data operations
  - `IPostRepository.js`: Interface for post data operations

**Key Principles**:
- No dependencies on frameworks or libraries
- Contains pure business logic
- Defines interfaces, not implementations

### 2. Application Layer (`backend/src/application/`)

**Purpose**: Contains use cases and application-specific business logic. Orchestrates domain entities and coordinates with infrastructure.

**Components**:
- **Services** (`services/`):
  - `AuthService.js`: Handles authentication use cases (register, login)
  - `PostService.js`: Handles post management use cases (CRUD operations)

**Responsibilities**:
- Implements use cases
- Validates business rules
- Coordinates between domain and infrastructure
- Enforces ownership and permissions

### 3. Infrastructure Layer (`backend/src/infrastructure/`)

**Purpose**: Implements technical details and external integrations. This layer depends on the domain layer.

**Components**:
- **Database** (`database/models/`):
  - `User.js`: Mongoose schema for User
  - `Post.js`: Mongoose schema for Post
  
- **Repositories** (`repositories/`):
  - `UserRepository.js`: MongoDB implementation of IUserRepository
  - `PostRepository.js`: MongoDB implementation of IPostRepository
  
- **Auth Services** (`auth/`):
  - `JwtService.js`: JWT token generation and verification
  - `PasswordService.js`: Password hashing and comparison

**Key Principles**:
- Implements interfaces defined in domain layer
- Handles all external dependencies (MongoDB, JWT, bcrypt)
- Can be swapped without affecting other layers

### 4. Presentation Layer (`backend/src/presentation/`)

**Purpose**: Handles HTTP requests and responses. This is the entry point for the application.

**Components**:
- **Controllers** (`controllers/`):
  - `AuthController.js`: Handles auth-related HTTP requests
  - `PostController.js`: Handles post-related HTTP requests
  
- **Routes** (`routes/`):
  - `authRoutes.js`: Authentication endpoints
  - `postRoutes.js`: Post management endpoints
  
- **Middleware** (`middleware/`):
  - `authMiddleware.js`: JWT authentication middleware
  - `errorHandler.js`: Centralized error handling

**Responsibilities**:
- Request/response handling
- Input validation
- Error formatting
- HTTP status codes

## Data Flow

### Example: Creating a Post

1. **Request arrives** → `presentation/routes/postRoutes.js`
2. **Authentication** → `presentation/middleware/authMiddleware.js` validates JWT
3. **Controller** → `presentation/controllers/PostController.js` receives request
4. **Service** → `application/services/PostService.js` handles business logic
5. **Repository** → `infrastructure/repositories/PostRepository.js` saves to database
6. **Response** → Controller formats and returns response

## Dependency Rule

The **Dependency Rule** is strictly followed:
- **Inner layers** (Domain) have no dependencies on outer layers
- **Outer layers** depend on inner layers
- Dependencies point **inward** toward the domain

```
Presentation → Application → Domain ← Infrastructure
```

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Changes in one layer don't affect others
3. **Scalability**: Easy to add new features or swap implementations
4. **Independence**: Business logic is independent of frameworks
5. **Flexibility**: Can change database or framework without rewriting business logic

## Security Considerations

- **Authentication**: JWT tokens with expiration
- **Authorization**: Ownership enforcement at service layer
- **Password Security**: bcrypt hashing with salt
- **Input Validation**: express-validator for request validation
- **Error Handling**: Centralized error handler prevents information leakage

## Scalability Features

- **Repository Pattern**: Easy to switch databases or add caching
- **Service Layer**: Business logic separated from data access
- **Middleware**: Reusable authentication and error handling
- **Environment Configuration**: Environment-based settings for different deployments

## Future Enhancements

This architecture supports easy addition of:
- Caching layer (Redis)
- Message queue (RabbitMQ/Kafka)
- Additional authentication methods (OAuth)
- Microservices split
- GraphQL API layer
- Event sourcing

