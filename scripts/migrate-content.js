#!/usr/bin/env node

const https = require('https');
const http = require('http');

console.log('🔄 Strapi Content Migration Helper');
console.log('==================================');

const LOCAL_BASE_URL = 'http://localhost:1337';

// Function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

// Function to extract and display content
async function extractContent() {
  console.log('\n📊 Your Local Content Summary:');
  console.log('==============================');

  try {
    // Agencies
    console.log('\n🏢 AGENCIES (7 entries):');
    const agencies = await makeRequest(`${LOCAL_BASE_URL}/api/agencies`);
    agencies.data.forEach(agency => {
      console.log(`  - ${agency.attributes.Name}`);
    });

    // Positions
    console.log('\n💼 POSITIONS (8 entries):');
    const positions = await makeRequest(`${LOCAL_BASE_URL}/api/positions`);
    positions.data.forEach(position => {
      console.log(`  - ${position.attributes.Name}`);
    });

    // Services
    console.log('\n🔧 SERVICES (10 entries):');
    const services = await makeRequest(`${LOCAL_BASE_URL}/api/services`);
    services.data.forEach(service => {
      console.log(`  - ${service.attributes.Name || service.attributes.Title || 'Unnamed Service'}`);
    });

    // Works
    console.log('\n🎨 WORKS (6 entries):');
    const works = await makeRequest(`${LOCAL_BASE_URL}/api/works`);
    works.data.forEach(work => {
      console.log(`  - ${work.attributes.Title || work.attributes.Name || 'Unnamed Work'}`);
    });

  } catch (error) {
    console.log('❌ Error fetching content:', error.message);
  }
}

// Function to display migration steps
function showMigrationSteps() {
  console.log('\n📋 MIGRATION STEPS:');
  console.log('===================');
  
  console.log('\n1️⃣  PREPARE YOUR WORKSPACE:');
  console.log('   - Local Admin: http://localhost:1337/admin');
  console.log('   - Cloud Admin: [Your Strapi Cloud URL]');
  console.log('   - Open both in separate browser tabs');
  
  console.log('\n2️⃣  MIGRATE AGENCIES (7 entries):');
  console.log('   - Go to Content Manager → Agency in local admin');
  console.log('   - For each agency, copy the Name field');
  console.log('   - Create new agency in cloud admin');
  console.log('   - Paste the name and save');
  
  console.log('\n3️⃣  MIGRATE POSITIONS (8 entries):');
  console.log('   - Go to Content Manager → Position in local admin');
  console.log('   - For each position, copy the Name field');
  console.log('   - Create new position in cloud admin');
  console.log('   - Paste the name and save');
  
  console.log('\n4️⃣  MIGRATE SERVICES (10 entries):');
  console.log('   - Go to Content Manager → Service in local admin');
  console.log('   - Copy all field values for each service');
  console.log('   - Create new service in cloud admin');
  console.log('   - Paste all values and save');
  
  console.log('\n5️⃣  MIGRATE WORKS (6 entries):');
  console.log('   - Go to Content Manager → Work in local admin');
  console.log('   - Copy all field values for each work');
  console.log('   - Create new work in cloud admin');
  console.log('   - Paste all values and save');
  
  console.log('\n6️⃣  MIGRATE MEDIA FILES:');
  console.log('   - Go to Media Library in cloud admin');
  console.log('   - Upload files from: public/uploads/');
  console.log('   - Update content references to new media URLs');
}

// Function to show API endpoints
function showAPIEndpoints() {
  console.log('\n🔗 API ENDPOINTS FOR DATA EXTRACTION:');
  console.log('=====================================');
  console.log('curl http://localhost:1337/api/agencies');
  console.log('curl http://localhost:1337/api/positions');
  console.log('curl http://localhost:1337/api/services');
  console.log('curl http://localhost:1337/api/works');
  console.log('curl http://localhost:1337/api/upload/files');
}

// Main execution
async function main() {
  await extractContent();
  showMigrationSteps();
  showAPIEndpoints();
  
  console.log('\n🎯 TIPS:');
  console.log('========');
  console.log('• Copy text content first, then handle media');
  console.log('• Use browser tabs to have both admins open');
  console.log('• Check relationships between content types');
  console.log('• Verify each content type after migration');
  console.log('• Keep local environment running for reference');
  
  console.log('\n✅ Ready to start migration!');
}

main().catch(console.error); 