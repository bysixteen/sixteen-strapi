# 🚀 Simple Migration Steps: Local → Strapi Cloud

## 📋 **What You Need to Migrate:**
- **7 Agencies** (Fantasy Interactive, Resn, Bros&Co, etc.)
- **8 Positions** (Creative Director, Art Director, etc.)
- **10 Services**
- **6 Works**
- **39 Media Files** (146 MB)

## 🔄 **Step-by-Step Migration:**

### **Step 1: Open Both Admin Panels**
1. **Local Admin**: http://localhost:1337/admin
2. **Cloud Admin**: [Your Strapi Cloud URL]
3. **Use separate browser tabs**

### **Step 2: Migrate Agencies (7 entries)**
1. In **local admin**: Go to Content Manager → Agency
2. For each agency:
   - Copy the **Name** field
   - In **cloud admin**: Create new Agency entry
   - Paste the name
   - Save

### **Step 3: Migrate Positions (8 entries)**
1. In **local admin**: Go to Content Manager → Position
2. For each position:
   - Copy the **Name** field
   - In **cloud admin**: Create new Position entry
   - Paste the name
   - Save

### **Step 4: Migrate Services (10 entries)**
1. In **local admin**: Go to Content Manager → Service
2. For each service:
   - Copy **all field values**
   - In **cloud admin**: Create new Service entry
   - Paste all values
   - Save

### **Step 5: Migrate Works (6 entries)**
1. In **local admin**: Go to Content Manager → Work
2. For each work:
   - Copy **all field values**
   - In **cloud admin**: Create new Work entry
   - Paste all values
   - Save

### **Step 6: Migrate Media Files**
1. In **cloud admin**: Go to Media Library
2. Upload files from your local `public/uploads/` folder
3. Update content references to new media URLs

## 🎯 **Quick Commands:**

```bash
# View your content summary
npm run migrate-content

# Start local development
npm run dev-local

# Export data (if needed)
npm run sync-data
```

## 📊 **Your Content Summary:**

### Agencies:
- Fantasy Interactive
- Resn
- Bros&Co
- Moniepoint
- Magic Leap
- Heirloom
- idean

### Positions:
- Creative Director
- Art Director
- Senior Designer
- Lead Product Designer
- Lead UX Designer
- Design System Lead
- UX Lead
- UI Lead

## 💡 **Tips:**
- Copy text content first, then handle media
- Use browser tabs for both admins
- Check relationships between content
- Verify each content type after migration
- Keep local environment running

## ✅ **Verification:**
After migration, test your cloud admin panel to ensure:
- All content types are present
- All media files are uploaded
- All relationships work correctly
- API endpoints return data

**Ready to start migrating!** 🚀 