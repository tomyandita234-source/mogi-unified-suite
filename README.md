# MogiApp Unified Suite

A comprehensive business solution platform with integrated Point of Sale, Payment Gateway, Operations Management, Fleet Tracking, Digital Signature, Library Management, Campus Management, CRM, and Content Creation tools.

## 🚀 Quick Start

### Docker Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd mogi-unified-suite

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:5000
```

### Traditional Setup

```bash
# Install dependencies
npm install
cd server
npm install
cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
cd server
npx prisma migrate deploy
npm run init-db
cd ..

# Start development servers
# Terminal 1:
cd server
npm run dev

# Terminal 2:
npm run dev
```

## 🏗️ Technology Stack

-   **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
-   **Backend**: Node.js, Express.js, Prisma ORM
-   **Database**: MySQL 8.0
-   **Deployment**: Docker, Docker Compose

## 📁 Project Structure

```
mogi-unified-suite/
├── public/              # Static assets
├── server/              # Backend server
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── prisma/          # Database schema and migrations
│   ├── routes/          # API routes
│   ├── config.js        # Configuration
│   └── index.js         # Server entry point
├── src/                 # Frontend source
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   └── App.tsx          # Main App component
├── uploads/             # Uploaded files
├── docker-compose.yml   # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── README.md            # This file
```

## 🐳 Docker Deployment

### Production Deployment

```bash
# Build and start production services
docker-compose up -d

# Run database migrations
docker exec -it mogiapp-server npx prisma migrate deploy

# Initialize database with sample data
docker exec -it mogiapp-server npm run init-db

# View logs
docker-compose logs -f
```

### Development Deployment

```bash
# Build and start development services with hot-reloading
docker-compose -f docker-compose.dev.yml up -d

# Initialize database with sample data
docker exec -it mogiapp-server-dev npm run init-db

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Docker Services Overview

-   **MySQL Database**:
    -   Production: Port 3306, Container: `mogiapp-mysql`
    -   Development: Port 3307, Container: `mogiapp-mysql-dev`
-   **Backend Server**: Port 5000
-   **Frontend**:
    -   Production: Port 80, Container: `mogiapp-frontend`
    -   Development: Port 8082, Container: `mogiapp-frontend-dev`

### Database Access

```bash
# Access MySQL database directly
# Production:
docker exec -it mogiapp-mysql mysql -u mogiuser -pmogipassword mogiapp

# Development:
docker exec -it mogiapp-mysql-dev mysql -u mogiuser -pmogipassword mogiapp
```

## 🔧 Manual Deployment

### Prerequisites

-   Node.js 18+
-   MySQL 8.0+
-   Git

### Steps

1. **Clone Repository**

    ```bash
    git clone <repository-url>
    cd mogi-unified-suite
    ```

2. **Install Dependencies**

    ```bash
    # Frontend
    npm install

    # Backend
    cd server
    npm install
    cd ..
    ```

3. **Configure Environment**

    ```bash
    cp .env.example .env
    # Edit .env with your configuration
    ```

4. **Database Setup**

    ```bash
    cd server
    npx prisma generate
    npx prisma migrate deploy
    npm run init-db
    cd ..
    ```

5. **Build Frontend**

    ```bash
    npm run build
    ```

6. **Start Services**

    ```bash
    # Start backend
    cd server
    npm start

    # Start frontend (in another terminal)
    cd ..
    npm run preview
    ```

## 🌐 Accessing the Application

-   **Frontend**: http://localhost (Docker) or http://localhost:5173 (Development)
-   **Backend API**: http://localhost:5000
-   **Health Check**: http://localhost:5000/api/health

## 🔐 Default Admin Credentials

-   **Username**: admin
-   **Password**: admin123

## 📚 API Documentation

### Authentication

-   `POST /api/users/login` - User login
-   `POST /api/users/register` - User registration

### User Management

-   `GET /api/users/profile` - Get user profile
-   `PUT /api/users/profile` - Update user profile
-   `GET /api/users` - Get all users (admin only)
-   `GET /api/users/:id` - Get user by ID (admin only)
-   `PUT /api/users/:id` - Update user (admin only)
-   `DELETE /api/users/:id` - Delete user (admin only)

### Blog Management

-   `GET /api/blogs` - Get all blogs
-   `GET /api/blogs/:id` - Get blog by ID
-   `POST /api/blogs` - Create new blog (admin only)
-   `PUT /api/blogs/:id` - Update blog (admin only)
-   `DELETE /api/blogs/:id` - Delete blog (admin only)

### Product Management

-   `GET /api/products` - Get all products
-   `GET /api/products/:id` - Get product by ID
-   `POST /api/products` - Create new product (admin only)
-   `PUT /api/products/:id` - Update product (admin only)
-   `DELETE /api/products/:id` - Delete product (admin only)

## 🛠️ Development Workflow

1. **Frontend Development**:

    - Edit files in `src/` directory
    - Changes automatically reload in development mode

2. **Backend Development**:

    - Edit files in `server/` directory
    - Server automatically restarts in development mode

3. **Database Changes**:
    - Modify `server/prisma/schema.prisma`
    - Run `npx prisma migrate dev --name migration_name` to create migration
    - Run `npx prisma generate` to update Prisma client

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd server
npm test
```

## 📖 Documentation

For detailed documentation, please refer to:

-   [DOCKER_SETUP_GUIDE.md](DOCKER_SETUP_GUIDE.md) - Comprehensive Docker setup guide
-   [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
-   [PRISMA_DEPLOYMENT_GUIDE.md](PRISMA_DEPLOYMENT_GUIDE.md) - Prisma deployment guide

## 🤝 Support

For support, please contact the development team or create an issue in the repository.
