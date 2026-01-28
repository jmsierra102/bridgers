// Admin Dashboard
const API_BASE = 'http://localhost:5000/api';

async function loadDashboard() {
  try {
    const response = await fetch(`${API_BASE}/admin/dashboard`);
    const data = await response.json();

    // Update KPIs
    document.getElementById('kpi-revenue').textContent = formatCurrency(data.totalRevenue);
    document.getElementById('kpi-orders').textContent = data.totalOrders;
    document.getElementById('kpi-avg-order').textContent = formatCurrency(data.averageOrderValue);

    // Top Products
    const topProductsContainer = document.getElementById('top-products');
    topProductsContainer.innerHTML = data.topProducts.length === 0 
      ? '<p style="color: #999;">No sales data yet</p>'
      : data.topProducts.map(p => `
          <div style="padding: 0.75rem 0; border-bottom: 1px solid #eee;">
            <p style="font-weight: 600;">${p.name}</p>
            <p style="color: #666;">${p.sales} units sold</p>
          </div>
        `).join('');

    // Size Popularity
    const sizeContainer = document.getElementById('size-popularity');
    sizeContainer.innerHTML = data.sizePopularity.length === 0
      ? '<p style="color: #999;">No size data yet</p>'
      : data.sizePopularity.map(s => `
          <div style="padding: 0.75rem 0; border-bottom: 1px solid #eee;">
            <p style="font-weight: 600;">Size ${s.size}</p>
            <p style="color: #666;">${s.count} ordered</p>
          </div>
        `).join('');
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

async function loadOrders() {
  try {
    const response = await fetch(`${API_BASE}/admin/orders`);
    const orders = await response.json();

    const tableContainer = document.getElementById('orders-table');
    tableContainer.innerHTML = orders.length === 0
      ? '<tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">No orders yet</td></tr>'
      : orders.map(order => `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 1rem;">${order.order_number}</td>
            <td style="padding: 1rem;">${order.customer_name}</td>
            <td style="padding: 1rem;">${formatCurrency(order.total_amount)}</td>
            <td style="padding: 1rem;">
              <span style="background: ${order.status === 'completed' ? '#27ae60' : '#f39c12'}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem;">
                ${order.status}
              </span>
            </td>
            <td style="padding: 1rem;">${formatDate(order.created_at)}</td>
          </tr>
        `).join('');
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString));
}

// Navigation
document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();

  // Admin navigation
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all links
      document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all sections
      document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
      });

      // Show selected section
      const section = link.dataset.section;
      document.getElementById(`${section}-section`).style.display = 'block';

      if (section === 'orders') {
        loadOrders();
      }
    });
  });
});
