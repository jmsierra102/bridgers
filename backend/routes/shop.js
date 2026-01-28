const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all products
  router.get('/products', async (req, res) => {
    try {
      const products = await db.all(`
        SELECT p.*, 
               GROUP_CONCAT(DISTINCT pv.size) as sizes,
               GROUP_CONCAT(DISTINCT pv.color) as colors
        FROM products p
        LEFT JOIN product_variants pv ON p.id = pv.product_id
        GROUP BY p.id
      `);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get single product with variants
  router.get('/products/:id', async (req, res) => {
    try {
      const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
      const variants = await db.all('SELECT * FROM product_variants WHERE product_id = ?', [req.params.id]);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ ...product, variants });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
