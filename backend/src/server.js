import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/database.js';
import { authMiddleware } from './middleware/auth.js';

// Routes
import authRoutes from './routes/auth.js';
import propertiesRoutes from './routes/properties.js';
import alertsRoutes from './routes/alerts.js';
import dealsRoutes from './routes/deals.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Public routes
app.use('/api/auth', authRoutes);

// Properties route (public)
app.use('/api/properties', propertiesRoutes);

// Protected routes - apply auth middleware
app.use('/api/properties', authMiddleware, propertiesRoutes);
app.use('/api/alerts', authMiddleware, alertsRoutes);
app.use('/api/deals', authMiddleware, dealsRoutes);

// Dashboard stats (requires auth)
app.get('/api/dashboard/stats', authMiddleware, (req, res) => {
  try {
    const savedCount = db.prepare(`
      SELECT COUNT(*) as count FROM saved_properties WHERE user_id = ?
    `).get(req.userId).count;

    const alertsCount = db.prepare(`
      SELECT COUNT(*) as count FROM alerts WHERE user_id = ?
    `).get(req.userId).count;

    const unreadAlerts = db.prepare(`
      SELECT COUNT(*) as count FROM alerts WHERE user_id = ? AND read = 0
    `).get(req.userId).count;

    const dealsCount = db.prepare(`
      SELECT COUNT(*) as count FROM deals WHERE user_id = ?
    `).get(req.userId).count;

    const avgPrice = db.prepare(`
      SELECT AVG(p.price) as avg_price FROM saved_properties sp
      INNER JOIN properties p ON sp.property_id = p.id
      WHERE sp.user_id = ?
    `).get(req.userId).avg_price || 0;

    const goodDealsCount = db.prepare(`
      SELECT COUNT(*) as count FROM saved_properties sp
      INNER JOIN properties p ON sp.property_id = p.id
      WHERE sp.user_id = ? AND p.status = 'good-deal'
    `).get(req.userId).count;

    res.json({
      saved_properties: savedCount,
      active_alerts: alertsCount,
      unread_alerts: unreadAlerts,
      deals_count: dealsCount,
      avg_price_tracked: Math.round(avgPrice),
      good_deals_found: goodDealsCount,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🏠 HousesTracker Backend running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
  console.log(`🔐 CORS enabled for ${CORS_ORIGIN}\n`);
});
