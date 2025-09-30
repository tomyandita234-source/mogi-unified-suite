const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying MogiApp Deployment Requirements...\\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'server/package.json',
  'server/prisma/schema.prisma',
  'server/controllers/prisma',
  'server/routes',
  'Dockerfile.unified',
  'server/Dockerfile.unified',
  'docker-compose.yml',
  'docker-compose.dev.yml'
];

let allFilesExist = true;
console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} (MISSING)`);
    allFilesExist = false;
  }
});

console.log('\\n🗑️  Checking for redundant files...');
const redundantFiles = [
  'Dockerfile',
  'Dockerfile.dev',
  'server/Dockerfile',
  'server/Dockerfile.dev',
  'server/Dockerfile.prod',
  'MONGODB_SETUP.md',
  'SETUP_INSTRUCTIONS.md'
];

let redundantFilesFound = false;
redundantFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ⚠️  ${file} (REDUNDANT - Should be removed)`);
    redundantFilesFound = true;
  }
});

console.log('\\n📚 Checking technology stack consistency...');
const readmePath = path.join(__dirname, 'README.md');
const dockerInstructionsPath = path.join(__dirname, 'DOCKER_INSTRUCTIONS.md');
const prismaGuidePath = path.join(__dirname, 'PRISMA_DEPLOYMENT_GUIDE.md');

const readmeContent = fs.readFileSync(readmePath, 'utf8');
const dockerInstructionsContent = fs.readFileSync(dockerInstructionsPath, 'utf8');
const prismaGuideContent = fs.readFileSync(prismaGuidePath, 'utf8');

// Check if docs consistently mention MySQL
const mentionsMySQL = [
  readmeContent.includes('MySQL'),
  dockerInstructionsContent.includes('MySQL'),
  prismaGuideContent.includes('MySQL')
].filter(Boolean).length;

const mentionsMongoDB = [
  readmeContent.includes('MongoDB'),
  dockerInstructionsContent.includes('MongoDB'),
  prismaGuideContent.includes('MongoDB')
].filter(Boolean).length;

if (mentionsMySQL > mentionsMongoDB) {
  console.log('  ✅ Technology stack consistently mentions MySQL');
} else {
  console.log('  ⚠️  Inconsistent technology stack (mentions MongoDB where it should be MySQL)');
}

console.log('\\n📋 Summary:');
if (allFilesExist) {
  console.log('  ✅ All required files are present');
} else {
  console.log('  ❌ Some required files are missing');
}

if (redundantFilesFound) {
  console.log('  ⚠️  Redundant files found that should be removed');
} else {
  console.log('  ✅ No redundant files found');
}

console.log('\\n🚀 Ready for deployment: ', allFilesExist ? 'YES' : 'NO');