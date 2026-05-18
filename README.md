
# HousesTracker - Real Estate Management Platform

A modern, full-stack web application for tracking real estate properties, managing deals, and receiving market insights with real-time alerts.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Express.js + Node.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: TailwindCSS + shadcn/ui
- **Charts**: Recharts

## Features

✅ **User Authentication** - Sign up and login with secure JWT tokens  
✅ **Property Management** - Browse, search, filter, and save properties  
✅ **Dashboard** - Real-time statistics and market insights  
✅ **Alert System** - Get notified about price drops and new listings  
✅ **Deal Tracking** - Track properties you're considering  
✅ **Responsive Design** - Optimized for mobile and desktop  
✅ **Production Ready** - Built with error handling and validation  

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm installed

### Installation

1. **Clone and navigate to project**
```bash
cd HousesTracker
```

2. **Install dependencies (frontend and backend)**
```bash
npm install
npm run backend:install
```

3. **Initialize the database**
```bash
npm run backend:db:init
```

4. **Create environment files** (already provided, but you can customize):
   - Frontend: `.env` (default VITE_API_BASE_URL=http://localhost:5000/api)
   - Backend: `backend/.env` (default PORT=5000)

### Running the Application

**Development Mode** (runs frontend and backend concurrently):
```bash
npm run dev
```

This will:
- Start the frontend on `http://localhost:5173`
- Start the backend on `http://localhost:5000`

**Frontend Only**:
```bash
npm run dev:frontend
```

**Backend Only**:
```bash
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

This builds the frontend with Vite. The backend is already JavaScript-ready.

## Demo Credentials

**Email**: john@example.com  
**Password**: password123

These credentials are created during database initialization and can be used to explore the application.

## Project Structure

```
HousesTracker/
├── src/                          # Frontend source
│   ├── app/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Application pages
│   │   └── routes.tsx           # Route definitions
│   └── services/                # API client and hooks
├── backend/                      # Backend Express server
│   ├── src/
│   │   ├── db/                  # Database setup
│   │   ├── routes/              # API endpoints
│   │   └── middleware/          # Auth middleware
│   └── data/                    # SQLite database file
├── index.html
├── vite.config.ts               # Vite configuration
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties/:id/save` - Save property
- `DELETE /api/properties/:id/save` - Unsave property
- `GET /api/properties/user/saved` - Get user's saved properties

### Alerts
- `GET /api/alerts` - Get user's alerts
- `POST /api/alerts` - Create alert
- `PUT /api/alerts/:id/read` - Mark alert as read
- `DELETE /api/alerts/:id` - Delete alert

### Deals
- `GET /api/deals` - Get user's deals
- `GET /api/deals/:id` - Get single deal
- `POST /api/deals` - Create deal
- `PUT /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Delete deal

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- first_name
- last_name
- created_at, updated_at

### Properties Table
- id (Primary Key)
- name
- location
- price
- beds, baths, sqft
- status (good-deal, fair, overpriced)
- price_change
- created_at, updated_at

### Saved Properties (Many-to-Many)
- id (Primary Key)
- user_id (Foreign Key)
- property_id (Foreign Key)
- saved_at

### Alerts
- id (Primary Key)
- user_id (Foreign Key)
- property_id (Foreign Key, nullable)
- type (price-drop, new-listing, market-insight, etc.)
- title, message
- read (boolean)
- created_at

### Deals
- id (Primary Key)
- user_id (Foreign Key)
- property_id (Foreign Key)
- status (pending, active, closed)
- notes
- created_at, updated_at

## Authentication Flow

1. User signs up with email and password
2. Backend hashes password and stores user in database
3. JWT token is returned to frontend
4. Token is stored in localStorage
5. All subsequent API requests include `Authorization: Bearer <token>` header
6. Backend validates token on protected routes

## State Management

The application uses React hooks for state management:
- `useAuth()` - Authentication state and methods
- `useProperties()` - Properties data and operations
- `useSavedProperties()` - User's saved properties
- `useAlerts()` - User's alerts
- `useDeals()` - User's deals
- `useDashboardStats()` - Dashboard statistics

## Error Handling

- All API calls are wrapped in try-catch blocks
- Errors are displayed to users via toast notifications
- Backend validates all input data
- Proper HTTP status codes are returned

## Security Features

- Passwords are hashed using bcryptjs (10 salt rounds)
- JWT tokens expire after 7 days
- CORS is configured for localhost development
- SQL injection protection via parameterized queries
- Authentication middleware protects private routes

## Customization

### Adding New Properties
Edit `backend/src/db/init.js` to add more sample properties in the `properties` array.

### Changing JWT Secret
Update `backend/.env`:
```
JWT_SECRET=your_custom_secret_key
```

### Changing API Port
Update `backend/.env`:
```
PORT=3000
```

### Changing Frontend API URL
Update `frontend/.env`:
```
VITE_API_BASE_URL=http://your-api-url/api
```

## Troubleshooting

### Port Already in Use
If port 5000 (backend) or 5173 (frontend) is already in use:
- Change the port in `.env` file
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Database Errors
If you get database errors:
1. Delete `backend/data/houses_tracker.db`
2. Run `npm run backend:db:init` again

### CORS Errors
Ensure `CORS_ORIGIN` in `backend/.env` matches your frontend URL:
```
CORS_ORIGIN=http://localhost:5173
```

### Module Not Found Errors
Run `npm install` in both root and backend directories:
```bash
npm install
npm run backend:install
```

## Production Deployment

### Frontend
The Vite build output is in `dist/`. Deploy to:
- Vercel, Netlify, GitHub Pages
- Traditional hosting (nginx, Apache, etc.)

### Backend
Deploy to:
- Heroku, Railway, Render
- Traditional VPS/servers
- Docker containers

### Database
For production, consider:
- PostgreSQL instead of SQLite
- MongoDB for NoSQL approach
- Managed database services (AWS RDS, Supabase, etc.)

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

---

**Happy tracking! 🏠**
  