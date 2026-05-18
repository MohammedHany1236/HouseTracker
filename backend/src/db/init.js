import db from './database.js';
import bcrypt from 'bcryptjs';

const seedDatabase = () => {
  // Check if data already exists
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) {
    console.log('Database already seeded, skipping...');
    return;
  }

  // Create demo user
  const hashedPassword = bcrypt.hashSync('password123', 10);
  const userStmt = db.prepare(`
    INSERT INTO users (email, password, first_name, last_name)
    VALUES (?, ?, ?, ?)
  `);
  
  const userResult = userStmt.run('john@example.com', hashedPassword, 'John', 'Doe');
  const userId = userResult.lastInsertRowid;

  // Sample properties data
  const properties = [
    { name: 'Modern Downtown Loft', location: 'Manhattan, NY', price: 285000, beds: 2, baths: 2, sqft: 1200, status: 'good-deal', price_change: -12, image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600' },
    { name: 'Suburban Family Home', location: 'Brooklyn, NY', price: 420000, beds: 4, baths: 3, sqft: 2400, status: 'fair', price_change: 0, image_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600' },
    { name: 'Luxury Penthouse', location: 'Queens, NY', price: 675000, beds: 3, baths: 2, sqft: 1800, status: 'overpriced', price_change: 8, image_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600' },
    { name: 'Cozy Studio Apartment', location: 'Manhattan, NY', price: 195000, beds: 1, baths: 1, sqft: 650, status: 'good-deal', price_change: -8, image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' },
    { name: 'Spacious Townhouse', location: 'Brooklyn, NY', price: 550000, beds: 3, baths: 3, sqft: 2200, status: 'fair', price_change: 3, image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600' },
    { name: 'Waterfront Condo', location: 'Manhattan, NY', price: 890000, beds: 2, baths: 2, sqft: 1500, status: 'overpriced', price_change: 15, image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
  ];

  const propertyStmt = db.prepare(`
    INSERT INTO properties (name, location, price, beds, baths, sqft, status, price_change, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const propertyIds = [];
  properties.forEach(prop => {
    const result = propertyStmt.run(prop.name, prop.location, prop.price, prop.beds, prop.baths, prop.sqft, prop.status, prop.price_change, prop.image_url);
    propertyIds.push(result.lastInsertRowid);
  });

  // Save first 3 properties for the user
  const savePropStmt = db.prepare(`
    INSERT INTO saved_properties (user_id, property_id)
    VALUES (?, ?)
  `);

  propertyIds.slice(0, 3).forEach(propId => {
    savePropStmt.run(userId, propId);
  });

  // Create sample alerts
  const alertStmt = db.prepare(`
    INSERT INTO alerts (user_id, property_id, type, title, message)
    VALUES (?, ?, ?, ?, ?)
  `);

  alertStmt.run(userId, propertyIds[0], 'price-drop', 'Price Drop Alert', 'Downtown Loft dropped by 12%');
  alertStmt.run(userId, propertyIds[1], 'new-listing', 'New Match Found', 'Brooklyn House matches your criteria');
  alertStmt.run(userId, null, 'market-insight', 'Market Insight', 'Manhattan prices trending down');

  console.log('Database seeded successfully!');
  console.log('Demo user: john@example.com / password123');
};

seedDatabase();
