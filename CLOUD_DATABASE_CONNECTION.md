# Connect Local to Cloud Database

## 🔄 **Method 2: Direct Database Connection**

If you want your local Strapi to use the same database as your cloud instance:

### Step 1: Get Cloud Database Credentials
You'll need to get these from your Strapi Cloud dashboard:
- Database URL
- Host
- Port
- Database name
- Username
- Password

### Step 2: Update Local Environment
Update your `.env.local` file:

```env
# Development Environment Configuration
NODE_ENV=development

# Cloud Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=your_cloud_database_url_here
DATABASE_HOST=your_cloud_host
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=true

# Server Configuration
HOST=0.0.0.0
PORT=1337

# LIVE CLOUD SECRETS
APP_KEYS=d436958c8639c210b5f00fb233fa3968d24b54e728c90946e10876943745a951
API_TOKEN_SALT=70090614377e0604657b1e2a640f9734fa2dac1406e74f6e6c18a0f0b8b59a38
ADMIN_JWT_SECRET=302268387568bc8925996b1deebfcff8b9e7c5fb91f66ada2b370b8d0a9ab55d
JWT_SECRET=5ffcd0c85135116688abcaa29c3ec160a5a975e332f147b15ba14acc948f8124
TRANSFER_TOKEN_SALT=199191552d9ac9f79217eab8a0e3a96c8a80df33a266d288bced57ca5319853d

# Admin Panel Configuration
STRAPI_ADMIN_BACKEND_URL=http://localhost:1337

# Development Settings
STRAPI_TELEMETRY_DISABLED=true
```

### Step 3: Restart Local Strapi
```bash
pkill -f strapi
npm run dev-local
```

## ⚠️ **Important Considerations:**

### ✅ **Advantages:**
- Real-time data sync
- No need for import/export
- Same data in both environments

### ❌ **Disadvantages:**
- Changes affect cloud data directly
- Risk of data corruption
- Requires database credentials
- May not work if cloud database doesn't allow external connections

## 🎯 **Recommendation:**

**Use Method 1 (Export/Import)** for safer data transfer, especially for:
- Initial data migration
- Large datasets
- When you want to keep environments separate

**Use Method 2 (Direct Connection)** for:
- Real-time development
- When you need to work with live data
- Advanced development workflows 