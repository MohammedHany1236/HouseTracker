import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// Get user's alerts (requires auth)
router.get('/', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const alerts = db.prepare(`
      SELECT a.*, p.name as property_name FROM alerts a
      LEFT JOIN properties p ON a.property_id = p.id
      WHERE a.user_id = ?
      ORDER BY a.created_at DESC
    `).all(req.userId);

    res.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get unread alert count (requires auth)
router.get('/unread/count', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const result = db.prepare(`
      SELECT COUNT(*) as count FROM alerts
      WHERE user_id = ? AND read = 0
    `).get(req.userId);

    res.json({ unread_count: result.count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark alert as read (requires auth)
router.put('/:id/read', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const alert = db.prepare('SELECT id FROM alerts WHERE id = ? AND user_id = ?').get(id, req.userId);

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    const stmt = db.prepare('UPDATE alerts SET read = 1 WHERE id = ?');
    stmt.run(id);

    res.json({ message: 'Alert marked as read' });
  } catch (error) {
    console.error('Mark alert error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete alert (requires auth)
router.delete('/:id', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM alerts WHERE id = ? AND user_id = ?');
    stmt.run(id, req.userId);

    res.json({ message: 'Alert deleted' });
  } catch (error) {
    console.error('Delete alert error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create alert (requires auth) - for manually creating alerts
router.post('/', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { property_id, type, title, message } = req.body;

    if (!type || !title || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(`
      INSERT INTO alerts (user_id, property_id, type, title, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(req.userId, property_id || null, type, title, message);

    res.status(201).json({
      message: 'Alert created',
      alert: {
        id: result.lastInsertRowid,
        user_id: req.userId,
        property_id,
        type,
        title,
        message,
        read: 0,
      },
    });
  } catch (error) {
    console.error('Create alert error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
