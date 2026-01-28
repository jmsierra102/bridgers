const Database = require('./backend/database');

async function seedDatabase() {
  const db = new Database();

  try {
    // Wait for DB to initialize
    await new Promise(resolve => setTimeout(resolve, 500));

    // Sample products
    const products = [
      {
        name: 'Classic Bridgers Tee',
        description: 'Premium cotton crew neck. Classic design with Bridgers logo.',
        price: 25.00,
        image: 'images/tee-classic.jpg'
      },
      {
        name: 'Mission Statement Tee',
        description: 'Featuring our mission statement: "Bridging Communities, Building Futures"',
        price: 28.00,
        image: 'images/tee-mission.jpg'
      },
      {
        name: 'Youth Empowerment Tee',
        description: 'Limited edition design celebrating youth leadership and community impact.',
        price: 30.00,
        image: 'images/tee-empowerment.jpg'
      }
    ];

    // Insert products
    for (const product of products) {
      const result = await db.run(
        `INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`,
        [product.name, product.description, product.price, product.image]
      );

      // Add size and color variants
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const colors = ['Black', 'White', 'Navy', 'Red'];

      for (const size of sizes) {
        for (const color of colors) {
          await db.run(
            `INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, ?, ?, ?)`,
            [result.id, size, color, 50]
          );
        }
      }

      console.log(`✓ Added product: ${product.name}`);
    }

    // Add sample admin user (password: admin123)
    await db.run(
      `INSERT INTO admin_users (username, password, role) VALUES (?, ?, ?)`,
      ['admin', 'admin123', 'admin']
    );
    console.log('✓ Added admin user (username: admin, password: admin123)');

    console.log('\n✅ Database seeded successfully!');
    await db.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    await db.close();
    process.exit(1);
  }
}

seedDatabase();
