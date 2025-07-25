#!/usr/bin/env node

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🚀 AUTOMATED MIGRATION SCRIPT');
console.log('=============================');

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

// Function to extract all content data
async function extractAllData() {
  console.log('\n📊 EXTRACTING ALL LOCAL DATA...');
  console.log('================================');
  
  const migrationData = {
    agencies: [],
    positions: [],
    services: [],
    works: [],
    media: [],
    timestamp: new Date().toISOString()
  };

  try {
    // Extract Agencies
    console.log('🏢 Extracting Agencies...');
    const agencies = await makeRequest(`${LOCAL_BASE_URL}/api/agencies?populate=*`);
    migrationData.agencies = agencies.data || [];
    console.log(`   ✅ Found ${migrationData.agencies.length} agencies`);

    // Extract Positions
    console.log('💼 Extracting Positions...');
    const positions = await makeRequest(`${LOCAL_BASE_URL}/api/positions?populate=*`);
    migrationData.positions = positions.data || [];
    console.log(`   ✅ Found ${migrationData.positions.length} positions`);

    // Extract Services
    console.log('🔧 Extracting Services...');
    const services = await makeRequest(`${LOCAL_BASE_URL}/api/services?populate=*`);
    migrationData.services = services.data || [];
    console.log(`   ✅ Found ${migrationData.services.length} services`);

    // Extract Works
    console.log('🎨 Extracting Works...');
    const works = await makeRequest(`${LOCAL_BASE_URL}/api/works?populate=*`);
    migrationData.works = works.data || [];
    console.log(`   ✅ Found ${migrationData.works.length} works`);

    // Extract Media Files
    console.log('📁 Extracting Media Files...');
    const media = await makeRequest(`${LOCAL_BASE_URL}/api/upload/files`);
    migrationData.media = media || [];
    console.log(`   ✅ Found ${migrationData.media.length} media files`);

    return migrationData;

  } catch (error) {
    console.log('❌ Error extracting data:', error.message);
    return null;
  }
}

// Function to create migration files
function createMigrationFiles(data) {
  console.log('\n📝 CREATING MIGRATION FILES...');
  console.log('==============================');

  // Create migration data file
  const migrationFile = path.join(__dirname, '..', 'migration-data.json');
  fs.writeFileSync(migrationFile, JSON.stringify(data, null, 2));
  console.log(`✅ Created: migration-data.json`);

  // Create step-by-step migration guide
  createMigrationGuide(data);

  // Create individual content files
  createContentFiles(data);

  return migrationFile;
}

// Function to create migration guide
function createMigrationGuide(data) {
  const guide = `# 🚀 COMPLETE MIGRATION GUIDE

## 📋 MIGRATION SUMMARY
- **Agencies**: ${data.agencies.length} entries
- **Positions**: ${data.positions.length} entries
- **Services**: ${data.services.length} entries
- **Works**: ${data.works.length} entries
- **Media Files**: ${data.media.length} files

## 🔗 ADMIN URLs
- **Local Admin**: http://localhost:1337/admin
- **Cloud Admin**: https://supportive-baseball-03e494ce0b.strapiapp.com/admin

## 📊 DETAILED MIGRATION STEPS

### Step 1: Agencies (${data.agencies.length} entries)
${data.agencies.map((agency, index) => `${index + 1}. **${agency.attributes.Name}**`).join('\n')}

### Step 2: Positions (${data.positions.length} entries)
${data.positions.map((position, index) => `${index + 1}. **${position.attributes.Name}**`).join('\n')}

### Step 3: Services (${data.services.length} entries)
${data.services.map((service, index) => `${index + 1}. **${service.attributes.Name || service.attributes.Title || 'Unnamed Service'}**`).join('\n')}

### Step 4: Works (${data.works.length} entries)
${data.works.map((work, index) => `${index + 1}. **${work.attributes.Title || work.attributes.Name || 'Unnamed Work'}**`).join('\n')}

### Step 5: Media Files (${data.media.length} files)
Upload all files from: \`public/uploads/\`

## 🎯 MIGRATION PROCESS

1. **Open both admin panels** in separate browser tabs
2. **Copy content entry by entry** from local to cloud
3. **Upload media files** to cloud Media Library
4. **Update content references** to new media URLs

## 📁 MIGRATION FILES
- \`migration-data.json\` - Complete data export
- \`content-agencies.json\` - Agency data only
- \`content-positions.json\` - Position data only
- \`content-services.json\` - Service data only
- \`content-works.json\` - Work data only

## ✅ VERIFICATION
After migration, verify:
- All content types are present in cloud
- All media files are uploaded
- All relationships work correctly
- API endpoints return data

**Migration completed on**: ${new Date().toLocaleString()}
`;

  const guideFile = path.join(__dirname, '..', 'COMPLETE_MIGRATION_GUIDE.md');
  fs.writeFileSync(guideFile, guide);
  console.log(`✅ Created: COMPLETE_MIGRATION_GUIDE.md`);
}

// Function to create individual content files
function createContentFiles(data) {
  const contentDir = path.join(__dirname, '..', 'migration-content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
  }

  // Create individual JSON files for each content type
  fs.writeFileSync(path.join(contentDir, 'agencies.json'), JSON.stringify(data.agencies, null, 2));
  fs.writeFileSync(path.join(contentDir, 'positions.json'), JSON.stringify(data.positions, null, 2));
  fs.writeFileSync(path.join(contentDir, 'services.json'), JSON.stringify(data.services, null, 2));
  fs.writeFileSync(path.join(contentDir, 'works.json'), JSON.stringify(data.works, null, 2));
  fs.writeFileSync(path.join(contentDir, 'media.json'), JSON.stringify(data.media, null, 2));

  console.log(`✅ Created: migration-content/ directory with individual files`);
}

// Function to display migration summary
function displayMigrationSummary(data) {
  console.log('\n📊 MIGRATION SUMMARY');
  console.log('===================');
  console.log(`🏢 Agencies: ${data.agencies.length} entries`);
  console.log(`💼 Positions: ${data.positions.length} entries`);
  console.log(`🔧 Services: ${data.services.length} entries`);
  console.log(`🎨 Works: ${data.works.length} entries`);
  console.log(`📁 Media Files: ${data.media.length} files`);

  console.log('\n🎯 NEXT STEPS:');
  console.log('==============');
  console.log('1. Open COMPLETE_MIGRATION_GUIDE.md');
  console.log('2. Follow the step-by-step instructions');
  console.log('3. Use migration-data.json for reference');
  console.log('4. Upload media files from public/uploads/');
  
  console.log('\n🔗 ADMIN URLs:');
  console.log('==============');
  console.log('Local:  http://localhost:1337/admin');
  console.log('Cloud:  https://supportive-baseball-03e494ce0b.strapiapp.com/admin');
}

// Main execution
async function main() {
  console.log('🔄 Starting automated migration...\n');
  
  const data = await extractAllData();
  if (!data) {
    console.log('❌ Failed to extract data. Please ensure Strapi is running.');
    process.exit(1);
  }

  const migrationFile = createMigrationFiles(data);
  displayMigrationSummary(data);

  console.log('\n✅ MIGRATION PREPARATION COMPLETE!');
  console.log('==================================');
  console.log('📁 Files created:');
  console.log(`   - ${migrationFile}`);
  console.log('   - COMPLETE_MIGRATION_GUIDE.md');
  console.log('   - migration-content/ directory');
  
  console.log('\n🚀 Ready to migrate! Follow the guide in COMPLETE_MIGRATION_GUIDE.md');
}

main().catch(console.error); 