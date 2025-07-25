# Strapi Cloud Environment Variables Update Guide

## 🚨 If You Can't Access Strapi Cloud Dashboard

### Method 1: Via Strapi Cloud CLI

```bash
# Install Strapi Cloud CLI if not already installed
npm install -g @strapi/cloud-cli

# Login to Strapi Cloud
strapi cloud login

# List your projects
strapi cloud projects

# Set environment variables
strapi cloud env set --project=your-project-id APP_KEYS="iFZpK2j/YX7ZYWwNCYsTgQ==,B+X0MHq5lSt9+HYyw6rCww==,W6qLZxmhl2iHbawSnCCPEQ==,YMpM+ErttT991OgEBmCb4A=="
strapi cloud env set --project=your-project-id API_TOKEN_SALT="2KeNm5TpIS5UXe1OETU4uA=="
strapi cloud env set --project=your-project-id ADMIN_JWT_SECRET="nq+b57VKVFdsQDWdg0oQsQ=="
strapi cloud env set --project=your-project-id TRANSFER_TOKEN_SALT="XeA0JyN1KXKdi4u2KboKSQ=="
strapi cloud env set --project=your-project-id ENCRYPTION_KEY="L+ITmW5oj1Aouy2Z7rxQ0Kvu3F0AklSmbogjELWowYQ="
strapi cloud env set --project=your-project-id JWT_SECRET="d8bWGfcc7FV5SOfvljJpwA=="
```

### Method 2: Via GitHub Actions (if configured)

Create a GitHub Action to update environment variables:

```yaml
# .github/workflows/update-env.yml
name: Update Strapi Cloud Environment Variables

on:
  workflow_dispatch:

jobs:
  update-env:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update Environment Variables
        run: |
          # Add your environment variable update logic here
          echo "Updating environment variables..."
```

### Method 3: Contact Strapi Support

If you can't access the dashboard:

1. **Email Support**: support@strapi.io
2. **Include Details**:
   - Your project ID
   - The environment variables you need to update
   - Screenshots of any error messages

### Method 4: Temporary Workaround - Use Local Development

Until you can update the cloud environment variables:

```bash
# Continue working locally with the new secrets
npm run dev-local

# Your local Strapi will work with the updated secrets
# Cloud will need to be updated when accessible
```

## 🔧 Environment Variables to Update

### Required Variables:
```
APP_KEYS=iFZpK2j/YX7ZYWwNCYsTgQ==,B+X0MHq5lSt9+HYyw6rCww==,W6qLZxmhl2iHbawSnCCPEQ==,YMpM+ErttT991OgEBmCb4A==
API_TOKEN_SALT=2KeNm5TpIS5UXe1OETU4uA==
ADMIN_JWT_SECRET=nq+b57VKVFdsQDWdg0oQsQ==
TRANSFER_TOKEN_SALT=XeA0JyN1KXKdi4u2KboKSQ==
ENCRYPTION_KEY=L+ITmW5oj1Aouy2Z7rxQ0Kvu3F0AklSmbogjELWowYQ=
JWT_SECRET=d8bWGfcc7FV5SOfvljJpwA==
```

### Optional Variables:
```
NODE_ENV=production
DATABASE_CLIENT=postgres
```

## 🚨 Emergency Procedures

### If Cloud is Completely Unavailable:

1. **Continue Local Development**:
   ```bash
   npm run dev-local
   # Work on your content types and features locally
   ```

2. **Export Data When Possible**:
   ```bash
   npm run sync-data
   # Export your local data for later import
   ```

3. **Document Changes**:
   - Keep track of what you've changed locally
   - Note any new content types or features
   - Prepare for when cloud access is restored

## 📞 Support Contacts

- **Strapi Support**: support@strapi.io
- **Strapi Discord**: https://discord.strapi.io
- **Strapi Documentation**: https://docs.strapi.io

## 🔄 Recovery Steps

Once you can access Strapi Cloud:

1. Update environment variables
2. Redeploy your application
3. Import any local data using the sync script
4. Verify everything is working correctly 