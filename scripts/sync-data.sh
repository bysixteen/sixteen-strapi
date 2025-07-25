#!/bin/bash

# Data synchronization script for Strapi Local ↔ Cloud

echo "🔄 Strapi Data Synchronization Tool"
echo "=================================="

# Check if Strapi is running
if ! curl -s http://localhost:1337/admin > /dev/null; then
    echo "❌ Strapi is not running on localhost:1337"
    echo "Please start Strapi with: npm run dev-local"
    exit 1
fi

echo "✅ Strapi is running locally"

# Function to export data
export_data() {
    echo "📤 Exporting data from local Strapi..."
    strapi export --no-encrypt
    if [ $? -eq 0 ]; then
        echo "✅ Export completed successfully!"
        echo "📁 Export file created in project root"
        echo "📋 Next steps:"
        echo "   1. Go to your Strapi Cloud dashboard"
        echo "   2. Navigate to Settings → Import/Export"
        echo "   3. Click 'Import' and upload the export file"
    else
        echo "❌ Export failed"
        exit 1
    fi
}

# Function to import data
import_data() {
    echo "📥 Importing data to local Strapi..."
    echo "Please provide the export file path:"
    read -p "File path: " file_path
    
    if [ -f "$file_path" ]; then
        strapi import -f "$file_path"
        if [ $? -eq 0 ]; then
            echo "✅ Import completed successfully!"
        else
            echo "❌ Import failed"
            exit 1
        fi
    else
        echo "❌ File not found: $file_path"
        exit 1
    fi
}

# Main menu
echo ""
echo "Choose an option:"
echo "1) Export local data to cloud"
echo "2) Import cloud data to local"
echo "3) Exit"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        export_data
        ;;
    2)
        import_data
        ;;
    3)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac 