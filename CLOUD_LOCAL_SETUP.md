# Strapi Cloud + Local Development Setup

This guide shows you how to use your Strapi Cloud data in your local development environment.

## Option 1: Connect Local to Cloud Database (Recommended)

### Step 1: Get Your Cloud Database Credentials

1. Go to your Strapi Cloud dashboard
2. Navigate to your project
3. Go to Settings → Database
4. Copy the database connection details

### Step 2: Set Up Local Environment

Run the setup script:
```bash
npm run setup-env
```

This will create a `.env.local` file with a template.

### Step 3: Update Environment Variables

Edit `.env.local` with your actual Strapi Cloud database credentials:

```env
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://username:password@host:port/database
DATABASE_HOST=your-strapi-cloud-host
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=true

# Strapi Configuration
NODE_ENV=development
HOST=0.0.0.0
PORT=1337

# Get these from your Strapi Cloud dashboard
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
APP_KEYS=key1,key2,key3,key4
JWT_SECRET=your_jwt_secret

# For local development
STRAPI_ADMIN_BACKEND_URL=http://localhost:1337
```

### Step 4: Start Local Development

```bash
npm run dev
```

Your local Strapi will now use the same database as your cloud instance!

## Option 2: Export/Import Data

### Export from Cloud
```bash
# From Strapi Cloud CLI
strapi export --no-encrypt
```

### Import to Local
```bash
# Import to your local instance
strapi import -f export_20250725115332.tar.gz
```

## Option 3: Use Different Databases

### For Local Development Only
Keep using SQLite locally by setting:
```env
DATABASE_CLIENT=sqlite
```

### For Production-like Testing
Use PostgreSQL locally with Docker:
```bash
docker run --name strapi-postgres -e POSTGRES_PASSWORD=strapi -e POSTGRES_DB=strapi -p 5432:5432 -d postgres:13
```

## Environment-Specific Configurations

### Development (.env.local)
```env
NODE_ENV=development
DATABASE_CLIENT=postgres
# Connect to cloud database
```

### Production (Strapi Cloud)
```env
NODE_ENV=production
DATABASE_CLIENT=postgres
# Cloud database credentials
```

## Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use different databases for different environments** when possible
3. **Backup your cloud data regularly**
4. **Test schema changes locally first**

## Troubleshooting

### Connection Issues
- Check if your cloud database allows external connections
- Verify SSL settings
- Ensure firewall rules allow your IP

### Permission Issues
- Make sure your database user has proper permissions
- Check if the database exists and is accessible

### SSL Issues
- Set `DATABASE_SSL_REJECT_UNAUTHORIZED=false` for testing
- Use proper SSL certificates for production

## Commands Reference

```bash
# Setup environment
npm run setup-env

# Start local development
npm run dev

# Build for production
npm run build

# Export data
strapi export

# Import data
strapi import -f filename.tar.gz
``` 