# Strapi Development Troubleshooting

## Issue: "Strapi is in production mode, editing content types is disabled"

### Solution ✅
1. **Ensure NODE_ENV=development** in your environment
2. **Use the development script**: `npm run dev-local`
3. **Check your .env.local file** has the correct settings

### Quick Fix
```bash
# Stop any running Strapi processes
pkill -f strapi

# Start in development mode
npm run dev-local
```

## Environment Configuration

### For Local Development (.env.local)
```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### For Cloud Database Connection (.env.local)
```env
NODE_ENV=development
DATABASE_CLIENT=postgres
DATABASE_URL=your_cloud_database_url
DATABASE_SSL=true
```

## Common Issues

### 1. Production Mode Error
- **Cause**: NODE_ENV not set to development
- **Fix**: Set `NODE_ENV=development` in .env.local

### 2. Database Connection Issues
- **Cause**: Wrong database configuration
- **Fix**: Check DATABASE_CLIENT and connection details

### 3. Port Already in Use
- **Cause**: Another Strapi instance running
- **Fix**: `pkill -f strapi` then restart

### 4. Permission Issues
- **Cause**: File permissions or database access
- **Fix**: Check file permissions and database credentials

## Development Commands

```bash
# Start development server
npm run dev-local

# Setup environment
npm run setup-env

# Build for production
npm run build

# Start production server
npm start
```

## Environment Priority
Strapi loads environment variables in this order:
1. `.env.local` (highest priority)
2. `.env`
3. System environment variables

## Debug Mode
```bash
# Start with debug logging
NODE_ENV=development DEBUG=* npm run dev
``` 