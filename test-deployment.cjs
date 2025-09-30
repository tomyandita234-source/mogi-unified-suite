const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Testing MogiApp Deployment Process...\\n');

// Function to check if required environment file exists
function checkEnvFile() {
  console.log('🔑 Checking environment configuration...');
  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');
  
  if (fs.existsSync(envPath)) {
    console.log('  ✅ .env file found');
    return true;
  } else if (fs.existsSync(envExamplePath)) {
    console.log('  ⚠️  .env file not found, but .env.example exists');
    console.log('     Please copy .env.example to .env and configure your settings');
    return false;
  } else {
    console.log('  ❌ Neither .env nor .env.example file found');
    return false;
  }
}

// Function to check Dockerfile structure
function checkDockerfiles() {
  console.log('🐳 Checking Dockerfile structure...');
  
  const requiredDockerfiles = [
    'Dockerfile.unified',
    'server/Dockerfile.unified'
  ];
  
  let allExist = true;
  for (const dockerfile of requiredDockerfiles) {
    const fullPath = path.join(__dirname, dockerfile);
    if (fs.existsSync(fullPath)) {
      console.log('  ✅ ' + dockerfile + ' exists');
    } else {
      console.log('  ❌ ' + dockerfile + ' is missing');
      allExist = false;
    }
  }
  
  return allExist;
}

// Function to check Prisma setup
function checkPrismaSetup() {
  console.log('📊 Checking Prisma setup...');
  
  const prismaDir = path.join(__dirname, 'server', 'prisma');
  const schemaPath = path.join(prismaDir, 'schema.prisma');
  const migrationsDir = path.join(prismaDir, 'migrations');
  
  if (!fs.existsSync(prismaDir)) {
    console.log('  ❌ Prisma directory not found');
    return false;
  }
  
  if (!fs.existsSync(schemaPath)) {
    console.log('  ❌ Prisma schema file not found');
    return false;
  }
  
  if (!fs.existsSync(migrationsDir)) {
    console.log('  ❌ Prisma migrations directory not found');
    return false;
  }
  
  console.log('  ✅ Prisma setup is complete');
  return true;
}

// Main test function
function testDeployment() {
  try {
    // Check prerequisites
    const envOk = checkEnvFile();
    const dockerfilesOk = checkDockerfiles();
    const prismaOk = checkPrismaSetup();
    
    console.log('\\n📋 Deployment Requirements Check:');
    console.log('  Environment: ' + (envOk ? '✅' : '❌'));
    console.log('  Dockerfiles: ' + (dockerfilesOk ? '✅' : '❌'));
    console.log('  Prisma: ' + (prismaOk ? '✅' : '❌'));
    
    const allRequirementsMet = envOk && dockerfilesOk && prismaOk;
    
    if (allRequirementsMet) {
      console.log('\\n🎉 All requirements met! Ready for deployment.');
      console.log('\\n🚀 To deploy in production mode:');
      console.log('   docker-compose up -d');
      console.log('\\n🔧 To deploy in development mode:');
      console.log('   docker-compose -f docker-compose.dev.yml up -d');
      return true;
    } else {
      console.log('\\n⚠️  Some requirements are not met. Please fix the issues above.');
      return false;
    }
  } catch (error) {
    console.error('❌ Error during deployment test:', error.message);
    return false;
  }
}

// Run the test
const success = testDeployment();
process.exit(success ? 0 : 1);