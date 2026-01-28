const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get dashboard KPIs
  router.get('/dashboard', async (req, res) => {
    try {
      const totalRevenue = await db.get(
        'SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = "completed"'
      );
      
      const totalOrders = await db.get(
        'SELECT COUNT(*) as count FROM orders WHERE status = "completed"'
      );

      const averageOrderValue = await db.get(
        'SELECT COALESCE(AVG(total_amount), 0) as avg FROM orders WHERE status = "completed"'
      );

      const topProducts = await db.all(`
        SELECT p.name, COUNT(oi.id) as sales
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY p.id
        ORDER BY sales DESC
        LIMIT 5
      `);

      const sizePopularity = await db.all(`
        SELECT size, COUNT(*) as count
        FROM order_items
        GROUP BY size
        ORDER BY count DESC
      `);

      const colorPopularity = await db.all(`
        SELECT color, COUNT(*) as count
        FROM order_items
        GROUP BY color
        ORDER BY count DESC
      `);

      res.json({
        totalRevenue: totalRevenue.total,
        totalOrders: totalOrders.count,
        averageOrderValue: averageOrderValue.avg,
        topProducts,
        sizePopularity,
        colorPopularity
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get all orders
  router.get('/orders', async (req, res) => {
    try {
      const orders = await db.all('SELECT * FROM orders ORDER BY created_at DESC');
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
