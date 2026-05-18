import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// Get user's deals (requires auth)
router.get('/', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const deals = db.prepare(`
      SELECT d.*, p.name, p.price, p.location, p.image_url FROM deals d
      INNER JOIN properties p ON d.property_id = p.id
      WHERE d.user_id = ?
      ORDER BY d.created_at DESC
    `).all(req.userId);

    res.json({ deals });
  } catch (error) {
    console.error('Get deals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific deal (requires auth)
router.get('/:id', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const deal = db.prepare(`
      SELECT d.*, p.name, p.price, p.location, p.image_url, p.beds, p.baths, p.sqft FROM deals d
      INNER JOIN properties p ON d.property_id = p.id
      WHERE d.id = ? AND d.user_id = ?
    `).get(id, req.userId);

    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.json({ deal });
  } catch (error) {
    console.error('Get deal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create deal (requires auth)
router.post('/', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { property_id, status, notes } = req.body;

    if (!property_id) {
      return res.status(400).json({ error: 'property_id is required' });
    }

    // Check if property exists
    const property = db.prepare('SELECT id FROM properties WHERE id = ?').get(property_id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const stmt = db.prepare(`
      INSERT INTO deals (user_id, property_id, status, notes)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(req.userId, property_id, status || 'pending', notes || '');

    res.status(201).json({
      message: 'Deal created',
      deal: {
        id: result.lastInsertRowid,
        user_id: req.userId,
        property_id,
        status: status || 'pending',
        notes: notes || '',
      },
    });
  } catch (error) {
    console.error('Create deal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update deal (requires auth)
router.put('/:id', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const { status, notes } = req.body;

    const deal = db.prepare('SELECT id FROM deals WHERE id = ? AND user_id = ?').get(id, req.userId);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    let updateQuery = 'UPDATE deals SET updated_at = CURRENT_TIMESTAMP';
    const params = [];

    if (status !== undefined) {
      updateQuery += ', status = ?';
      params.push(status);
    }
    if (notes !== undefined) {
      updateQuery += ', notes = ?';
      params.push(notes);
    }

    updateQuery += ' WHERE id = ?';
    params.push(id);

    const stmt = db.prepare(updateQuery);
    stmt.run(...params);

    const updatedDeal = db.prepare(`
      SELECT d.*, p.name, p.price, p.location, p.image_url FROM deals d
      INNER JOIN properties p ON d.property_id = p.id
      WHERE d.id = ?
    `).get(id);

    res.json({ message: 'Deal updated', deal: updatedDeal });
  } catch (error) {
    console.error('Update deal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete deal (requires auth)
router.delete('/:id', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM deals WHERE id = ? AND user_id = ?');
    stmt.run(id, req.userId);

    res.json({ message: 'Deal deleted' });
  } catch (error) {
    console.error('Delete deal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
