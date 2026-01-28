# Bridgers Youth Organization Website

A mission-driven website for Bridgers Youth Organization featuring an integrated merch shop to support youth programs and community initiatives.

## Features

- **Organization Website**: Home, About, Events, Contact pages
- **Merch Shop**: Product listing, shopping cart, checkout (guest checkout)
- **Admin Dashboard**: Sales analytics, order tracking, KPI insights
- **Database**: SQLite for orders, products, and admin data
- **Responsive Design**: Mobile-first, modern aesthetic

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: Session-based for admin dashboard (Phase 1)

## Project Structure

```
bridgers/
├── public/                    # Frontend files
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/                   # JavaScript files
│   │   ├── main.js           # Global utilities
│   │   ├── shop.js           # Shop page logic
│   │   ├── cart.js           # Cart management
│   │   ├── checkout.js       # Checkout form
│   │   ├── admin.js          # Admin dashboard
│   │   ├── contact.js        # Contact form
│   │   └── order-confirmation.js
│   ├── images/               # Product/page images
│   ├── index.html            # Home page
│   ├── about.html            # About page
│   ├── events.html           # Events page
│   ├── contact.html          # Contact page
│   ├── shop.html             # Shop page
│   ├── cart.html             # Cart page
│   ├── checkout.html         # Checkout page
│   ├── order-confirmation.html
│   ├── admin.html            # Admin dashboard
│   └── 404.html              # 404 page
├── backend/
│   ├── database.js           # Database class
│   ├── routes/
│   │   ├── shop.js           # Shop API routes
│   │   ├── orders.js         # Orders API routes
│   │   └── admin.js          # Admin API routes
│   └── middleware/           # Auth middleware (future)
├── data/                     # SQLite database file
├── package.json              # Node.js dependencies
├── server.js                 # Express server
└── README.md                 # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. **Navigate to project directory**:
   ```bash
   cd /path/to/bridgers
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the website**:
   - Frontend: `http://localhost:5000`
   - Shop: `http://localhost:5000/shop`
   - Admin Dashboard: `http://localhost:5000/admin`
   - API: `http://localhost:5000/api`

## Database

The SQLite database is automatically initialized on first run with the following tables:

- **products**: Merch items (shirts)
- **product_variants**: Size and color combinations
- **orders**: Customer orders
- **order_items**: Individual items in orders
- **admin_users**: Admin credentials (future)

### Seed Sample Data

To add sample products to the database, run:
```bash
node scripts/seed.js
```

## API Endpoints

### Shop
- `GET /api/shop/products` - List all products
- `GET /api/shop/products/:id` - Get product details with variants

### Orders
- `POST /api/orders/create` - Create a new order
- `GET /api/orders/:id` - Get order details

### Admin
- `GET /api/admin/dashboard` - Get dashboard KPIs
- `GET /api/admin/orders` - List all orders

## User Flows

### Customer Flow
1. Browse home page and learn about Bridgers
2. Explore merch shop
3. Select product, size, and color
4. Add to cart
5. Proceed to checkout
6. Enter name and email (no account required)
7. Submit order
8. Receive confirmation

### Admin Flow
1. Access `/admin` dashboard
2. View KPIs: Total Revenue, Total Orders, Average Order Value
3. See top-selling items and size preferences
4. View all orders and track status

## Design Principles

- **Mission-First**: Website emphasizes Bridgers' mission, merch is secondary
- **No Friction**: Guest checkout, minimal required information
- **Trust & Transparency**: Clear messaging that proceeds support programs
- **Youth-Oriented**: Modern, clean, accessible design
- **Mobile-First**: Responsive across all devices

## Roadmap

### Phase 1 ✅ (Current)
- [x] Static website pages
- [x] Merch shop UI
- [x] Shopping cart
- [x] Checkout (guest)
- [x] Basic admin dashboard

### Phase 2 (Next)
- [ ] Stripe/PayPal integration
- [ ] Email notifications
- [ ] Inventory management
- [ ] Admin authentication

### Phase 3 (Future)
- [ ] User accounts (optional)
- [ ] Order tracking for customers
- [ ] Analytics dashboard
- [ ] Transparency dashboard (funds raised)

## Key Features Explained

### Cart Management
- Uses browser localStorage
- Cart persists across page refreshes
- No server-side session needed for customers

### Admin Dashboard
- Shows 3 core KPIs in real-time
- Identifies best-selling products
- Tracks size/color popularity
- Lists all orders with status

### Guest Checkout
- No login required
- Only name and email needed
- Order confirmation via email

## Customization

### Add Products
Edit `scripts/seed.js` or manually insert into the database:
```javascript
await db.run(
  `INSERT INTO products (name, description, price, image) 
   VALUES (?, ?, ?, ?)`,
  ['Product Name', 'Description', 25.00, 'image.jpg']
);
```

### Update Colors & Theme
Edit `public/css/style.css`:
- `--primary-dark`: Main color
- `--accent-red`: Secondary color
- `--light-gray`: Background color

### Change Site Copy
All text is in HTML files. Search and replace:
- Organization name
- Mission statement
- Contact information

## Troubleshooting

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database errors
```bash
# Delete database and reinitialize
rm data/bridgers.db
npm start
```

### CORS errors
Ensure API requests use the correct base URL: `http://localhost:5000/api`

## Support

For questions about the Bridgers Youth Organization, contact:
- Email: info@bridgersnyouth.org
- Phone: (123) 456-7890

## License

MIT License - Feel free to modify for Bridgers Youth Organization use.

---

**Built for Bridgers Youth Organization | 2025**
