#!/usr/bin/env node

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🚀 EXPORT WITH IMPORT/EXPORT PLUGIN');
console.log('===================================');

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

// Function to export data in import/export plugin format
async function exportForImportPlugin() {
  console.log('\n📊 EXPORTING DATA FOR IMPORT/EXPORT PLUGIN...');
  console.log('==============================================');
  
  const exportData = {
    agencies: [],
    positions: [],
    services: [],
    works: [],
    timestamp: new Date().toISOString()
  };

  try {
    // Export Agencies
    console.log('🏢 Exporting Agencies...');
    const agencies = await makeRequest(`${LOCAL_BASE_URL}/api/agencies?populate=*`);
    exportData.agencies = agencies.data || [];
    console.log(`   ✅ Found ${exportData.agencies.length} agencies`);

    // Export Positions
    console.log('💼 Exporting Positions...');
    const positions = await makeRequest(`${LOCAL_BASE_URL}/api/positions?populate=*`);
    exportData.positions = positions.data || [];
    console.log(`   ✅ Found ${exportData.positions.length} positions`);

    // Export Services
    console.log('🔧 Exporting Services...');
    const services = await makeRequest(`${LOCAL_BASE_URL}/api/services?populate=*`);
    exportData.services = services.data || [];
    console.log(`   ✅ Found ${exportData.services.length} services`);

    // Export Works
    console.log('🎨 Exporting Works...');
    const works = await makeRequest(`${LOCAL_BASE_URL}/api/works?populate=*`);
    exportData.works = works.data || [];
    console.log(`   ✅ Found ${exportData.works.length} works`);

    return exportData;

  } catch (error) {
    console.log('❌ Error exporting data:', error.message);
    return null;
  }
}

// Function to create import-ready files
function createImportFiles(data) {
  console.log('\n📝 CREATING IMPORT-READY FILES...');
  console.log('==================================');

  // Create individual CSV files for each content type
  const importDir = path.join(__dirname, '..', 'import-files');
  if (!fs.existsSync(importDir)) {
    fs.mkdirSync(importDir);
  }

  // Create Agencies CSV
  const agenciesCSV = createCSV(data.agencies, 'agencies');
  fs.writeFileSync(path.join(importDir, 'agencies.csv'), agenciesCSV);
  console.log('✅ Created: import-files/agencies.csv');

  // Create Positions CSV
  const positionsCSV = createCSV(data.positions, 'positions');
  fs.writeFileSync(path.join(importDir, 'positions.csv'), positionsCSV);
  console.log('✅ Created: import-files/positions.csv');

  // Create Services CSV
  const servicesCSV = createCSV(data.services, 'services');
  fs.writeFileSync(path.join(importDir, 'services.csv'), servicesCSV);
  console.log('✅ Created: import-files/services.csv');

  // Create Works CSV
  const worksCSV = createCSV(data.works, 'works');
  fs.writeFileSync(path.join(importDir, 'works.csv'), worksCSV);
  console.log('✅ Created: import-files/works.csv');

  // Create JSON files for import plugin
  fs.writeFileSync(path.join(importDir, 'agencies.json'), JSON.stringify(data.agencies, null, 2));
  fs.writeFileSync(path.join(importDir, 'positions.json'), JSON.stringify(data.positions, null, 2));
  fs.writeFileSync(path.join(importDir, 'services.json'), JSON.stringify(data.services, null, 2));
  fs.writeFileSync(path.join(importDir, 'works.json'), JSON.stringify(data.works, null, 2));

  console.log('✅ Created JSON files for import plugin');

  return importDir;
}

// Function to create CSV from data
function createCSV(data, contentType) {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0].attributes || {});
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(item => {
    const values = headers.map(header => {
      const value = item.attributes[header];
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value || '';
    });
    return values.join(',');
  });

  return [csvHeaders, ...csvRows].join('\n');
}

// Function to create import instructions
function createImportInstructions() {
  const instructions = `# 🚀 IMPORT/EXPORT PLUGIN MIGRATION GUIDE

## 📋 What's New
The import/export plugin has been installed and data has been prepared for easier migration.

## 📁 Import Files Created
- \`import-files/agencies.csv\` - Agencies in CSV format
- \`import-files/positions.csv\` - Positions in CSV format
- \`import-files/services.csv\` - Services in CSV format
- \`import-files/works.csv\` - Works in CSV format
- \`import-files/*.json\` - JSON files for import plugin

## 🔗 Admin URLs
- **Local Admin**: http://localhost:1337/admin
- **Cloud Admin**: https://supportive-baseball-03e494ce0b.strapiapp.com/admin

## 🎯 Migration Steps

### Option 1: Using Import/Export Plugin (Recommended)
1. **In your cloud admin**: Go to Content Manager
2. **Look for Import/Export options** in the interface
3. **Upload the CSV or JSON files** from import-files/
4. **Follow the plugin's import process**

### Option 2: Manual Migration (Fallback)
1. **Open both admin panels** in separate browser tabs
2. **Copy content entry by entry** from local to cloud
3. **Use the CSV files as reference** for field values

## 📊 Data Summary
- **Agencies**: 7 entries
- **Positions**: 8 entries
- **Services**: 10 entries
- **Works**: 6 entries

## ✅ Next Steps
1. Check if the import/export plugin appears in your admin interface
2. Try importing the CSV/JSON files to your cloud instance
3. If plugin doesn't work, fall back to manual migration

**Migration prepared on**: ${new Date().toLocaleString()}
`;

  const instructionsFile = path.join(__dirname, '..', 'IMPORT_PLUGIN_GUIDE.md');
  fs.writeFileSync(instructionsFile, instructions);
  console.log('✅ Created: IMPORT_PLUGIN_GUIDE.md');
}

// Function to display summary
function displaySummary(data) {
  console.log('\n📊 EXPORT SUMMARY');
  console.log('=================');
  console.log(`🏢 Agencies: ${data.agencies.length} entries`);
  console.log(`💼 Positions: ${data.positions.length} entries`);
  console.log(`🔧 Services: ${data.services.length} entries`);
  console.log(`🎨 Works: ${data.works.length} entries`);

  console.log('\n🎯 NEXT STEPS:');
  console.log('==============');
  console.log('1. Check your admin interface for import/export options');
  console.log('2. Try importing the CSV/JSON files to your cloud instance');
  console.log('3. If plugin doesn\'t work, use manual migration');
  
  console.log('\n📁 Files created:');
  console.log('================');
  console.log('- import-files/ directory with CSV and JSON files');
  console.log('- IMPORT_PLUGIN_GUIDE.md with instructions');
}

// Main execution
async function main() {
  console.log('🔄 Starting export with import/export plugin...\n');
  
  const data = await exportForImportPlugin();
  if (!data) {
    console.log('❌ Failed to export data. Please ensure Strapi is running.');
    process.exit(1);
  }

  const importDir = createImportFiles(data);
  createImportInstructions();
  displaySummary(data);

  console.log('\n✅ EXPORT COMPLETE!');
  console.log('==================');
  console.log('📁 Files created:');
  console.log(`   - ${importDir}/ directory`);
  console.log('   - IMPORT_PLUGIN_GUIDE.md');
  
  console.log('\n🚀 Check your admin interface for import/export options!');
}

main().catch(console.error); 