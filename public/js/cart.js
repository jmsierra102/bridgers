// Cart Page
const API_BASE = 'http://localhost:5000/api';

function displayCart() {
  const cartItems = CartManager.getCart();
  const container = document.getElementById('cart-items');

  if (cartItems.length === 0) {
    container.innerHTML = '<p style="padding: 2rem; text-align: center; color: #999;">Your cart is empty. <a href="/shop">Continue shopping</a></p>';
    updateCartTotals();
    return;
  }

  container.innerHTML = cartItems.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Size: ${item.size} | Color: ${item.color}</p>
        <p><strong>${formatCurrency(item.price)}</strong> each</p>
      </div>
      <div style="text-align: center;">
        <p>Qty: ${item.quantity}</p>
        <p style="font-size: 1.1rem; font-weight: 600; color: #c41e3a;">${formatCurrency(item.price * item.quantity)}</p>
      </div>
      <button class="btn" onclick="removeFromCart(${index})" style="background-color: #e74c3c;">Remove</button>
    </div>
  `).join('');

  updateCartTotals();
}

function removeFromCart(index) {
  CartManager.removeItem(index);
  displayCart();
}

function updateCartTotals() {
  const total = CartManager.getTotal();
  document.getElementById('subtotal').textContent = formatCurrency(total);
  document.getElementById('total').textContent = formatCurrency(total);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

document.addEventListener('DOMContentLoaded', displayCart);
