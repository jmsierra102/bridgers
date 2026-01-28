// Checkout Page
const API_BASE = 'http://localhost:5000/api';

function displayOrderSummary() {
  const cartItems = CartManager.getCart();
  const container = document.getElementById('order-summary');

  if (cartItems.length === 0) {
    window.location.href = '/cart';
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd;">
      <p style="margin-bottom: 0.25rem;"><strong>${item.name}</strong></p>
      <p style="font-size: 0.85rem; color: #666;">Size: ${item.size} | Color: ${item.color}</p>
      <p style="font-size: 0.85rem; color: #666;">Qty: ${item.quantity} × ${formatCurrency(item.price)}</p>
      <p style="text-align: right; font-weight: 600;">${formatCurrency(item.price * item.quantity)}</p>
    </div>
  `).join('');

  updateCheckoutTotals();
}

function updateCheckoutTotals() {
  const total = CartManager.getTotal();
  document.getElementById('summary-subtotal').textContent = formatCurrency(total);
  document.getElementById('summary-total').textContent = formatCurrency(total);
}

async function submitCheckout(e) {
  e.preventDefault();

  const cartItems = CartManager.getCart();
  if (cartItems.length === 0) {
    alert('Your cart is empty');
    return;
  }

  const formData = new FormData(document.getElementById('checkout-form'));
  
  const orderData = {
    customer_name: formData.get('name'),
    customer_email: formData.get('email'),
    items: cartItems,
    total_amount: CartManager.getTotal()
  };

  try {
    const response = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();
    
    if (result.success) {
      // Store order details for confirmation page
      sessionStorage.setItem('order_id', result.order_id);
      sessionStorage.setItem('order_number', result.order_number);
      sessionStorage.setItem('customer_email', orderData.customer_email);
      sessionStorage.setItem('order_total', orderData.total_amount);
      
      CartManager.clearCart();
      window.location.href = '/order-confirmation';
    } else {
      alert('Error creating order: ' + result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error processing order');
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

document.addEventListener('DOMContentLoaded', () => {
  displayOrderSummary();
  document.getElementById('checkout-form').addEventListener('submit', submitCheckout);
});
