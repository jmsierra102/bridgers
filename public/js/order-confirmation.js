// Order Confirmation Page
function displayOrderConfirmation() {
  const orderId = sessionStorage.getItem('order_id');
  const orderNumber = sessionStorage.getItem('order_number');
  const customerEmail = sessionStorage.getItem('customer_email');
  const orderTotal = sessionStorage.getItem('order_total');

  if (!orderNumber) {
    window.location.href = '/';
    return;
  }

  document.getElementById('order-number').textContent = orderNumber;
  document.getElementById('customer-email').textContent = customerEmail;
  document.getElementById('order-total').textContent = formatCurrency(parseFloat(orderTotal));

  // Clear session data
  sessionStorage.clear();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

document.addEventListener('DOMContentLoaded', displayOrderConfirmation);
