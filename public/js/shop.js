// Shop Page - Product Listing
const API_BASE = 'http://localhost:5000/api';

async function loadProducts() {
  try {
    const response = await fetch(`${API_BASE}/shop/products`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('products-container').innerHTML = '<p>Error loading products</p>';
  }
}

function displayProducts(products) {
  const container = document.getElementById('products-container');
  
  if (products.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">No products available yet.</p>';
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="product-card" onclick="viewProduct(${product.id})">
      <img src="${product.image || 'images/placeholder.jpg'}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatCurrency(product.price)}</p>
        <p class="product-description">${product.description || 'Official Bridgers merchandise'}</p>
        <button class="btn" onclick="viewProduct(${product.id}); event.stopPropagation();">View Details</button>
      </div>
    </div>
  `).join('');
}

function viewProduct(productId) {
  window.location.href = `/shop?product=${productId}`;
}

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);

// Format currency helper
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}
