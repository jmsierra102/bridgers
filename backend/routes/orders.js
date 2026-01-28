const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Create order
  router.post('/create', async (req, res) => {
    try {
      const { customer_name, customer_email, items, total_amount } = req.body;
      
      // Generate order number
      const orderNumber = 'ORD-' + Date.now();

      // Insert order
      const orderResult = await db.run(
        `INSERT INTO orders (order_number, customer_name, customer_email, total_amount, status) 
         VALUES (?, ?, ?, ?, 'pending')`,
        [orderNumber, customer_name, customer_email, total_amount]
      );

      // Insert order items
      for (const item of items) {
        await db.run(
          `INSERT INTO order_items (order_id, product_id, size, color, quantity, price) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [orderResult.id, item.product_id, item.size, item.color, item.quantity, item.price]
        );
      }

      res.json({ 
        success: true, 
        order_id: orderResult.id,
        order_number: orderNumber 
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get order by ID
  router.get('/:id', async (req, res) => {
    try {
      const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
      const items = await db.all(`
        SELECT oi.*, p.name 
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [req.params.id]);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ ...order, items });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
