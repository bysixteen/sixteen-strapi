# Strapi Local ↔ Cloud Deployment Guide

## Understanding the Environments

### 🏠 Local Development
- **Mode**: Development (content type editing enabled)
- **Database**: SQLite (`.tmp/data.db`)
- **Purpose**: Create and edit content types, develop features

### ☁️ Strapi Cloud
- **Mode**: Production (content type editing disabled)
- **Database**: PostgreSQL (managed by Strapi Cloud)
- **Purpose**: Live production environment

## Workflow: Local → Cloud

### Step 1: Develop Locally
```bash
# Start local development
npm run dev-local

# Edit content types in http://localhost:1337/admin
# Add content and test features
```

### Step 2: Deploy Changes
```bash
# Commit your changes
git add .
git commit -m "Add new content types and features"
git push

# Strapi Cloud will automatically rebuild and deploy
```

### Step 3: Sync Data (Optional)

#### Option A: Export from Local, Import to Cloud
```bash
# Export from local
strapi export --no-encrypt

# Import to cloud (via Strapi Cloud dashboard)
# Upload the export file in Settings → Import/Export
```

#### Option B: Connect Local to Cloud Database
Update `.env.local` with cloud database credentials:
```env
NODE_ENV=development
DATABASE_CLIENT=postgres
DATABASE_URL=your_cloud_database_url
DATABASE_SSL=true
```

## Content Type Management

### ✅ Best Practice Workflow
1. **Create content types locally** (development mode)
2. **Test and refine locally**
3. **Commit and push to GitHub**
4. **Strapi Cloud automatically deploys**
5. **Add content via admin panel in cloud**

### ❌ What You Can't Do
- Edit content types directly in Strapi Cloud (production mode)
- Use the same database for both environments (security)

## Data Synchronization

### Local → Cloud
```bash
# Export local data
strapi export --no-encrypt

# Import to cloud via dashboard
# Settings → Import/Export → Import
```

### Cloud → Local
```bash
# Export from cloud via dashboard
# Settings → Import/Export → Export

# Import to local
strapi import -f export_filename.tar.gz
```

## Environment-Specific Configurations

### Local Development (.env.local)
```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Cloud Production (Strapi Cloud)
```env
NODE_ENV=production
DATABASE_CLIENT=postgres
# Managed by Strapi Cloud
```

## Common Scenarios

### Scenario 1: New Content Type
1. Create locally in development mode
2. Test with sample data
3. Push to GitHub
4. Cloud automatically deploys
5. Add real content in cloud admin

### Scenario 2: Update Existing Content Type
1. Modify locally in development mode
2. Test changes
3. Push to GitHub
4. Cloud automatically deploys
5. Existing data is preserved

### Scenario 3: Bulk Data Import
1. Prepare data locally
2. Export from local
3. Import to cloud via dashboard
4. Verify in cloud admin

## Troubleshooting

### Production Mode Error in Cloud
- **Normal**: Strapi Cloud runs in production mode
- **Solution**: Make changes locally, deploy to cloud

### Missing Data in Cloud
- **Cause**: Different databases
- **Solution**: Export from local, import to cloud

### Deployment Issues
- **Check**: GitHub repository for latest changes
- **Verify**: Strapi Cloud build logs
- **Test**: Local development first

## Commands Reference

```bash
# Local development
npm run dev-local

# Export data
strapi export --no-encrypt

# Import data
strapi import -f filename.tar.gz

# Deploy to cloud
git add . && git commit -m "message" && git push
``` 