# Strapi Quick Reference

## 🚀 Development Commands

```bash
# Start local development
npm run dev-local

# Sync data between local and cloud
npm run sync-data

# Setup environment
npm run setup-env
```

## 📝 Content Type Workflow

### ✅ Correct Workflow
1. **Edit locally** (development mode) - `npm run dev-local`
2. **Test changes** in local admin panel
3. **Commit & push** to GitHub
4. **Cloud auto-deploys** from GitHub
5. **Add content** in cloud admin panel

### ❌ What Doesn't Work
- Editing content types in Strapi Cloud (production mode)
- Seeing local data in cloud (different databases)

## 🔄 Data Synchronization

### Local → Cloud
```bash
npm run sync-data
# Choose option 1: Export local data
# Upload export file to Strapi Cloud dashboard
```

### Cloud → Local
```bash
# Export from Strapi Cloud dashboard
# Download export file
npm run sync-data
# Choose option 2: Import cloud data
```

## 🌐 URLs

- **Local Admin**: http://localhost:1337/admin
- **Local API**: http://localhost:1337
- **Cloud Admin**: Your Strapi Cloud URL
- **Cloud API**: Your Strapi Cloud API URL

## 🔧 Environment Files

- **`.env.local`** - Local development settings
- **`.env`** - Default settings
- **Strapi Cloud** - Managed environment variables

## 📁 Key Files

- **`DEPLOYMENT_GUIDE.md`** - Complete workflow guide
- **`TROUBLESHOOTING.md`** - Common issues and solutions
- **`CLOUD_LOCAL_SETUP.md`** - Initial setup guide

## 🚨 Common Issues

### "Production mode" error in cloud
- **Normal behavior** - Strapi Cloud runs in production
- **Solution** - Make changes locally, deploy to cloud

### No data in cloud
- **Cause** - Different databases
- **Solution** - Export from local, import to cloud

### Can't edit content types
- **Local** - Use `npm run dev-local`
- **Cloud** - Not possible (production mode) 