# Bridgers Website - Quick Reference Card

## 🚀 Start Server
```bash
cd /Users/johnmarieon/Developer/bridgers
PORT=3000 node server.js
```
👉 **Visit**: http://localhost:3000

## 🛍️ Main Pages
| Name | URL |
|------|-----|
| Home | http://localhost:3000 |
| Shop | http://localhost:3000/shop |
| Admin | http://localhost:3000/admin |
| About | http://localhost:3000/about |
| Contact | http://localhost:3000/contact |

## 📦 Commands
```bash
# Load sample products
node scripts/seed.js

# Install dependencies
npm install

# Check Node version
node --version
```

## 📁 Key Files
- `server.js` - Main app
- `public/` - Website files
- `backend/` - API code
- `data/bridgers.db` - Database
- `README.md` - Full docs

## 🎨 Colors
- Navy: `#1a2332`
- Blue: `#2c3e50`  
- Red: `#c41e3a`
- Gray: `#f5f5f5`

## 📊 Admin Dashboard
View at: http://localhost:3000/admin
- Total Revenue
- Total Orders
- Average Order Value
- Top Products
- Size Preferences

## 🛒 Shop Flow
1. Browse products
2. Select size/color
3. Add to cart
4. Checkout (email only)
5. Order confirmation

## 💡 Tips
- Cart uses browser storage
- No login required
- Database auto-creates
- Responsive on mobile
- All endpoints at /api

## ❌ Troubleshooting
**Port in use?**
```bash
lsof -ti:3000 | xargs kill -9
```

**Broken database?**
```bash
rm data/bridgers.db
node server.js
```

## 📚 Documentation
- `README.md` - Full guide
- `GETTING_STARTED.md` - Quick start
- `PROJECT_SUMMARY.md` - Technical
- `BUILD_COMPLETE.md` - Features

---
✅ **Website is ready to use!**
