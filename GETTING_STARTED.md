# Bridgers Youth Organization Website - Getting Started Guide

## ✅ Project Setup Complete!

Your Bridgers Youth Organization website is now ready to use. Here's what's been built:

### 📁 Project Structure

```
bridgers/
├── public/                    # Frontend files (HTML, CSS, JavaScript)
├── backend/                   # Backend API and database
├── data/                      # SQLite database
├── package.json              # Dependencies
├── server.js                 # Express server
└── README.md                 # Full documentation
```

## 🚀 Quick Start

### 1. Start the Server

```bash
cd /Users/johnmarieon/Developer/bridgers
node server.js
```

Or with custom port:
```bash
PORT=3000 node server.js
```

The server will start on `http://localhost:5000` (or your custom port)

### 2. Access the Website

**Public Pages:**
- 🏠 Home: `http://localhost:5000`
- ℹ️ About: `http://localhost:5000/about`
- 📅 Events: `http://localhost:5000/events`
- 📧 Contact: `http://localhost:5000/contact`
- 🛍️ Shop: `http://localhost:5000/shop`

**Customer Checkout:**
- 🛒 Cart: `http://localhost:5000/cart`
- 💳 Checkout: `http://localhost:5000/checkout`
- ✅ Order Confirmation: `http://localhost:5000/order-confirmation`

**Admin:**
- 📊 Dashboard: `http://localhost:5000/admin`

### 3. Seed Sample Data (Optional)

Add sample products to test the shop:

```bash
node scripts/seed.js
```

This will add:
- 3 sample t-shirt products
- Size variants (XS-XXL)
- Color options (Black, White, Navy, Red)

## 🎨 Design Overview

The website follows the design from your mockup:

- **Header**: Clean navigation bar with logo
- **Hero Section**: Large background image with "BRIDGERS NYI" title
- **Color Scheme**: 
  - Primary Dark: `#1a2332`
  - Primary Blue: `#2c3e50`
  - Accent Red: `#c41e3a`
  - Light Gray: `#f5f5f5`

## 🛍️ Shop Workflow

### Customer Journey:
1. Browse shop → Select product
2. Choose size and color
3. Add to cart (stored in browser)
4. Review cart
5. Checkout (name & email only)
6. Order confirmation

### Cart Management:
- Uses **browser localStorage** (no server needed)
- Cart persists between page refreshes
- No user accounts required

## 📊 Admin Dashboard

Access at `/admin` to view:

**KPIs:**
- Total Revenue (from completed orders)
- Total Orders
- Average Order Value

**Insights:**
- Top-selling products
- Size popularity
- Color preferences
- All orders with status

## 📡 API Endpoints

All endpoints start with `/api`:

### Shop API
```
GET /api/shop/products          # List all products
GET /api/shop/products/:id      # Get product with variants
```

### Orders API
```
POST /api/orders/create         # Create order
GET /api/orders/:id             # Get order details
```

### Admin API
```
GET /api/admin/dashboard        # Get KPI data
GET /api/admin/orders           # List all orders
```

## 🗄️ Database

**SQLite Database Location:**
```
/Users/johnmarieon/Developer/bridgers/data/bridgers.db
```

**Tables:**
- `products` - Merchandise items
- `product_variants` - Size/color combinations
- `orders` - Customer orders
- `order_items` - Items in orders
- `admin_users` - Admin credentials (future use)

## ⚙️ Customization

### Change Site Text
Edit HTML files in `/public`:
- `index.html` - Home page
- `about.html` - About page
- `events.html` - Events listing
- `contact.html` - Contact form

### Add Products
Edit `/scripts/seed.js` and add to the `products` array:
```javascript
{
  name: 'New Shirt Name',
  description: 'Description here',
  price: 25.00,
  image: 'images/shirt.jpg'
}
```

Then run: `node scripts/seed.js`

### Change Colors
Edit `/public/css/style.css` CSS variables:
```css
:root {
  --primary-dark: #1a2332;
  --accent-red: #c41e3a;
  /* ... more colors ... */
}
```

### Update Contact Info
Edit `/public/contact.html` and update:
- Email address
- Phone number
- Location

## 📋 Feature Checklist

### Phase 1 (Current) ✅
- [x] Static website pages (Home, About, Events, Contact)
- [x] Product listing page
- [x] Shopping cart (localStorage-based)
- [x] Guest checkout (no accounts)
- [x] Order confirmation
- [x] Admin dashboard with KPIs
- [x] SQLite database
- [x] Express API backend

### Phase 2 (Coming)
- [ ] Stripe/PayPal payment integration
- [ ] Email notifications
- [ ] Inventory management
- [ ] Admin authentication

### Phase 3 (Future)
- [ ] Optional user accounts
- [ ] Order tracking for customers
- [ ] Enhanced analytics
- [ ] Mobile app

## 🔧 Troubleshooting

### Port already in use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=3001 node server.js
```

### Database errors
```bash
# Reinitialize database (deletes all data)
rm data/bridgers.db
node server.js
```

### Cart not working
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache

### API not responding
- Confirm server is running
- Check port number (5000 by default)
- Verify API URLs in JavaScript files

## 📞 Configuration Files

### package.json
Defines project dependencies and scripts

### server.js
Main Express application entry point

### backend/database.js
SQLite database connection and queries

### backend/routes/
API endpoint handlers

## 💡 Next Steps

1. **Customize Content**
   - Update organization info in HTML files
   - Add real product images to `/public/images`
   - Update contact information

2. **Add Products**
   - Run `node scripts/seed.js` for sample products
   - Or manually insert into database

3. **Test Functionality**
   - Browse shop
   - Add items to cart
   - Complete checkout
   - View admin dashboard

4. **Deployment** (when ready)
   - Choose hosting platform (Heroku, AWS, DigitalOcean, etc.)
   - Configure production database
   - Set up payment processing

## 📚 Resources

- **Express.js Docs**: https://expressjs.com
- **better-sqlite3 Docs**: https://github.com/WiseLibs/better-sqlite3
- **CSS Guide**: `/public/css/style.css` (fully commented)
- **API Documentation**: See README.md

## 🎯 Success Criteria

✅ Website clearly communicates Bridgers' mission  
✅ Users can easily browse and purchase merchandise  
✅ Cart and checkout are frictionless  
✅ Admin can see sales metrics and insights  
✅ All orders are tracked and stored  

## 📝 Notes

- This is **Phase 1** with simulated payments
- All orders marked as "pending" awaiting manual payment processing
- No user authentication required (admin features available to all currently)
- Database is automatically initialized on first run

---

**Built for Bridgers Youth Organization | January 2025**

For questions or issues, check the main README.md file.
