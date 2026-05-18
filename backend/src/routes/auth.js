import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/database.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Sign up
router.post('/signup', (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    const stmt = db.prepare(`
      INSERT INTO users (email, password, first_name, last_name)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(email, hashedPassword, first_name, last_name);

    const token = generateToken(result.lastInsertRowid);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.lastInsertRowid,
        email,
        first_name,
        last_name,
      },
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = db.prepare('SELECT id, password, first_name, last_name, email FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/profile', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = db.prepare('SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?').get(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile
router.put('/profile', (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(`
      UPDATE users
      SET first_name = ?, last_name = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(first_name, last_name, req.userId);

    const user = db.prepare('SELECT id, email, first_name, last_name FROM users WHERE id = ?').get(req.userId);
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
