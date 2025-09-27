# MogiApp Setup Instructions

## Prerequisites

1. Node.js (version 14 or higher) - OR -
2. Docker (version 18.06 or higher) - Recommended for easy setup

## Installation Options

You can run this application in two ways:
1. **Traditional Setup** (install dependencies locally)
2. **Docker Setup** (recommended - everything runs in containers)

## Option 1: Docker Setup (Recommended)

With Docker, you can run the entire application stack with a single command:

### Quick Start with Docker

```bash
# Clone the repository (if you haven't already)
git clone <repository-url>
cd mogi-unified-suite

# Start all services (MongoDB, server, frontend)
docker-compose up -d

# Or for development with hot-reloading:
docker-compose -f docker-compose.dev.yml up -d
```

Your application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Docker Services

The Docker setup includes:
- **MongoDB**: Database service on port 27017
- **Server**: Node.js backend on port 5000
- **Frontend**: React/Vite frontend on port 5173

### Useful Docker Commands

```bash
# View logs
docker-compose logs

# View specific service logs
docker-compose logs server

# Stop all services
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Access MongoDB shell
docker exec -it mogiapp-mongodb mongo

# Access server container
docker exec -it mogiapp-server sh

# Access frontend container
docker exec -it mogiapp-frontend sh
```

## Option 2: Traditional Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Database Setup

You have three options for setting up the database:

#### Option A: Local MongoDB Installation
1. Install MongoDB Community Server following the instructions in [MONGODB_SETUP.md](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/MONGODB_SETUP.md)
2. Make sure MongoDB service is running

#### Option B: MongoDB Atlas (Cloud)
1. Create a free MongoDB Atlas cluster
2. Update the [server/config.js](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/server/config.js) with your Atlas connection string

#### Option C: Docker MongoDB Only
```bash
docker run --name mongodb -p 27017:27017 -d mongo
```

### 3. Initialize Database (Optional but Recommended)

After installing MongoDB and starting the service:

```bash
cd server
npm run init-db
```

This will:
- Create a sample admin user (username: admin, password: admin123)
- Create a sample blog post

### 4. Environment Variables (Optional)

Create a `.env` file in the [server](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/server) directory to override default configurations:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mogiapp
JWT_SECRET=your-super-secret-jwt-key
```

### 5. Running the Application

#### Development Mode

```bash
# Start backend server
cd server
npm run dev

# In another terminal, start frontend
cd ..
npm run dev
```

#### Production Mode

```bash
# Build frontend
npm run build

# Start backend server
cd server
npm start
```

### 6. Accessing the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Backend API Docs: http://localhost:5000/api-docs (if implemented)

## Project Structure

```
├── public              # Public assets
├── server              # Backend server
│   ├── controllers     # Request handlers
│   ├── middleware      # Custom middleware
│   ├── models          # Database models
│   ├── routes          # API routes
│   ├── config.js       # Configuration
│   ├── index.js        # Server entry point
│   └── init-db.js      # Database initialization script
├── src                 # Frontend source
│   ├── components      # React components
│   ├── contexts        # React contexts
│   ├── hooks           # Custom hooks
│   ├── lib             # Utility functions
│   ├── pages           # Page components
│   ├── App.css         # Global styles
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── index.html          # HTML template
├── package.json        # Frontend dependencies
├── vite.config.ts      # Vite configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Blog Routes
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create new blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB service is running
2. Check if the connection string in [config.js](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/server/config.js) is correct
3. Verify MongoDB is accessible on port 27017

### Common Errors
- "MongoDB connection error": Check if MongoDB is installed and running
- "Module not found": Run `npm install` in both root and server directories
- "Port already in use": Change the PORT in [config.js](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/server/config.js)

### Need Help?
Refer to [MONGODB_SETUP.md](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/MONGODB_SETUP.md) for detailed MongoDB installation instructions.