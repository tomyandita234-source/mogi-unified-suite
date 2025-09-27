# Use Node.js 18 as base image
FROM node:18-alpine

# Install additional dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install serve to serve the static files
RUN npm install -g serve

# Copy package files and dist folder (assuming dist is built locally)
COPY package*.json ./
COPY dist ./dist

# Expose port
EXPOSE 5173

# Serve the application
CMD ["serve", "-s", "dist", "-l", "5173"]