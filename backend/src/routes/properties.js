import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// Get all properties
router.get('/', (req, res) => {
  try {
    const properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
    res.json({ properties });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get property by id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save property (requires auth)
router.post('/:id/save', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const property = db.prepare('SELECT id FROM properties WHERE id = ?').get(id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const stmt = db.prepare(`
      INSERT OR IGNORE INTO saved_properties (user_id, property_id)
      VALUES (?, ?)
    `);
    stmt.run(req.userId, id);

    res.json({ message: 'Property saved' });
  } catch (error) {
    console.error('Save property error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unsave property (requires auth)
router.delete('/:id/save', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const stmt = db.prepare(`
      DELETE FROM saved_properties
      WHERE user_id = ? AND property_id = ?
    `);
    stmt.run(req.userId, id);

    res.json({ message: 'Property unsaved' });
  } catch (error) {
    console.error('Unsave property error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's saved properties (requires auth)
router.get('/user/saved', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const properties = db.prepare(`
      SELECT p.* FROM properties p
      INNER JOIN saved_properties sp ON p.id = sp.property_id
      WHERE sp.user_id = ?
      ORDER BY sp.saved_at DESC
    `).all(req.userId);

    res.json({ properties });
  } catch (error) {
    console.error('Get saved properties error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
