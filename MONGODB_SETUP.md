# MongoDB Setup Instructions for MogiApp

Since MongoDB is not currently installed on your Windows system, you'll need to install it to make your application work properly.

## Option 1: Install MongoDB Community Server (Recommended)

1. Download MongoDB Community Server:
   - Visit: https://www.mongodb.com/try/download/community
   - Select Version: 7.0.x (latest stable)
   - Platform: Windows x64
   - Package: msi
   - Click "Download"

2. Install MongoDB:
   - Run the downloaded .msi file
   - Choose "Complete" setup type
   - Select "Run service as Network Service user" 
   - Install MongoDB Compass (GUI tool) if you want
   - Complete the installation

3. Verify Installation:
   - Open Command Prompt or PowerShell
   - Run: `mongod --version`
   - You should see version information

4. Start MongoDB Service:
   - The installer should automatically start the MongoDB service
   - To verify: `net start MongoDB`

## Option 2: Use MongoDB Atlas (Cloud Database)

If you prefer to use a cloud database instead:

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Update your [config.js](file:///c%3A/Users/Irham/Documents/mogi-unified-suite/server/config.js) file with the Atlas connection string:
   ```javascript
   MONGODB_URI: process.env.MONGODB_URI || 'your_atlas_connection_string_here'
   ```

## Option 3: Use Docker (If you have Docker installed)

1. Pull MongoDB image:
   ```
   docker pull mongo
   ```

2. Run MongoDB container:
   ```
   docker run --name mongodb -p 27017:27017 -d mongo
   ```

## After Installation

Once MongoDB is installed and running:

1. Start your server:
   ```
   cd server
   npm install
   npm start
   ```

2. Your application should now be able to connect to the database at `mongodb://localhost:27017/mogiapp`

## Database Schema

Your application has two main models:
1. **User**: username, email, password, role, isActive
2. **Blog**: title, slug, body, image, and metadata fields

The database will be automatically created when your application first connects to MongoDB.