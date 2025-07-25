# Security Guide - Preventing Secret Exposure

## 🚨 Critical Security Rules

### ❌ NEVER Commit These Files:
- `.env`
- `.env.local`
- `.env.production`
- Any file containing secrets

### ✅ Always Use:
- `.gitignore` to exclude environment files
- Environment variables in production
- Different secrets for each environment

## 🔐 Secret Management

### Local Development
```bash
# Use .env.local (already in .gitignore)
cp .env.example .env.local
# Edit .env.local with your secrets
```

### Strapi Cloud
- Set environment variables in Strapi Cloud dashboard
- Never commit secrets to Git

### Regenerating Secrets
```bash
# Generate new secrets
node -e "console.log('APP_KEYS=' + Array.from({length: 4}, () => require('crypto').randomBytes(16).toString('base64')).join(','));"
```

## 🛡️ Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in committed files
- [ ] Different secrets for local/cloud
- [ ] Regular secret rotation
- [ ] Environment variables in production

## 🚨 If Secrets Are Exposed

1. **Immediate Actions:**
   - Remove from Git history: `git filter-branch`
   - Force push: `git push --force`
   - Regenerate all secrets
   - Update all environments

2. **Notify:**
   - Team members
   - Security team
   - Rotate any related credentials

## 📋 Environment Files

### Safe to Commit:
- `.env.example` (template only)
- `config/` files (no secrets)

### Never Commit:
- `.env`
- `.env.local`
- `.env.production`
- Any file with actual secrets

## 🔄 Secret Rotation Process

1. Generate new secrets
2. Update local `.env.local`
3. Update Strapi Cloud environment variables
4. Restart applications
5. Verify functionality 