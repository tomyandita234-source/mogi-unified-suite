# MogiApp Unified Suite

## Project Overview

MogiApp Unified Suite is a full-stack web application with a React frontend and Node.js/Express backend, using MySQL as the database with Prisma ORM.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Docker Setup (Recommended)

For the easiest setup, you can run the entire application using Docker:

```sh
# Start all services (MySQL, server, frontend)
docker-compose up -d

# Or for development with hot-reloading:
docker-compose -f docker-compose.dev.yml up -d
```

Your application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js
- Express
- MySQL
- Prisma ORM

## Deployment

### Prerequisites for Deployment

1. Node.js 18+ installed on your server
2. MySQL 8.0+ database accessible from your server
3. Git installed on your server

### Deployment Steps

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd mogi-unified-suite
   ```

2. **Set Environment Variables**
   Create a `.env` file in the server directory with your configuration:
   ```env
   DATABASE_URL="mysql://username:password@host:port/database"
   JWT_SECRET="your-jwt-secret"
   PORT=5000
   ```

3. **Run Deployment Script**
   On Linux/macOS:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
   
   On Windows:
   ```cmd
   deploy.bat
   ```

### Manual Deployment

For manual deployment, refer to the detailed guide in [DEPLOYMENT.md](DEPLOYMENT.md) and [PRISMA_DEPLOYMENT_GUIDE.md](PRISMA_DEPLOYMENT_GUIDE.md).

### Docker Deployment

For containerized deployment, use the production docker-compose file:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Development

To start the development environment:
```bash
# Start all services
docker-compose up -d

# Or start services separately
cd server && npm run dev
cd frontend && npm run dev
```