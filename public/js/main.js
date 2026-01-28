// Main JS - Global utilities
const API_BASE = 'http://localhost:5000/api';

// Local storage helpers
const CartManager = {
  getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  },

  setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  addItem(product, size, color, quantity) {
    const cart = this.getCart();
    const existingItem = cart.find(
      item => item.product_id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        product_id: product.id,
        name: product.name,
        price: product.price,
        size,
        color,
        quantity,
        image: product.image
      });
    }

    this.setCart(cart);
  },

  removeItem(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.setCart(cart);
  },

  clearCart() {
    localStorage.removeItem('cart');
  },

  getTotal() {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Date formatting
function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString));
}
