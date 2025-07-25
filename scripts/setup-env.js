#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envTemplate = `# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=your_strapi_cloud_database_url_here
DATABASE_HOST=your_strapi_cloud_host
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=true

# Strapi Configuration
NODE_ENV=development
HOST=0.0.0.0
PORT=1337

# Admin Panel
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
APP_KEYS=your_app_keys_comma_separated
JWT_SECRET=your_jwt_secret

# For local development with cloud data
STRAPI_ADMIN_BACKEND_URL=http://localhost:1337
`;

const localEnvPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(localEnvPath)) {
  fs.writeFileSync(localEnvPath, envTemplate);
  console.log('✅ Created .env.local template');
  console.log('📝 Please update the values with your Strapi Cloud database credentials');
} else {
  console.log('⚠️  .env.local already exists');
}

console.log('\n📋 Next steps:');
console.log('1. Get your database credentials from Strapi Cloud dashboard');
console.log('2. Update .env.local with your actual values');
console.log('3. Run: npm run dev'); 