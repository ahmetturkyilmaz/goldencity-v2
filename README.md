# Notes API - Assessment Implementation


Complete CRUD API implementation for Notes functionality with authentication, database integration, and error handling.


## Folder Structure

```
contracts/
├── models/
│   └── Note.js                    # Mongoose model with validations
├── controllers/
│   └── noteController.js          # CRUD operations
├── routes/
│   └── noteRoute.js               # API route definitions
├── middlewares/
│   └── helpers/
│       └── errorMiddleware.js     # Centralized error handling
├── config/
│   └── database.js                # Database connection (in-memory support)
└── app.js                         # Express app (routes registered here)

Notes_API.postman_collection.json  # Postman collection for testing
Notes_API.postman_environment.json # Postman environment variables
```

## Architecture

### Database Layer
- **Mongoose ODM** for MongoDB operations
- **In-memory MongoDB** using `mongodb-memory-server` (no installation needed)
- Automatic fallback: Uses in-memory if `MONGO_URI` not set, real MongoDB if provided

### Model Layer (`models/Note.js`)
- Schema definition with validations
- Fields: `user` (ObjectId ref), `title` (required, 1-50 chars), `content` (optional, max 500 chars)
- Automatic timestamps (`createdAt`, `updatedAt`)

### Controller Layer (`controllers/noteController.js`)
- Business logic and authorization
- User isolation: Users can only access their own notes
- CRUD operations with proper error handling

### Route Layer (`routes/noteRoute.js`)
- RESTful endpoint definitions
- Authentication middleware on all routes
- Clean route organization

### Middleware Layer
- **Authentication**: `isAuthenticatedUser` - JWT token validation
- **Error Handling**: `errorMiddleware` - Centralized error responses
    - Mongoose ValidationError → 400
    - Mongoose CastError → 400
    - ErrorHandler instances → Uses statusCode
    - All other errors → 500


## API Endpoints

All endpoints require authentication (JWT token in cookies).

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes` | Get all notes for authenticated user |
| GET | `/api/notes/:id` | Get a specific note by ID |
| PUT | `/api/notes/:id` | Update a note by ID |
| DELETE | `/api/notes/:id` | Delete a note by ID |

### Request/Response Examples

**Create Note:**
```json
POST /api/notes
{
  "title": "My Note",
  "content": "Note content (optional)"
}

Response (201):
{
  "success": true,
  "message": "Note created successfully",
  "note": { ... }
}
```

**Update Note:**
```json
PUT /api/notes/:id
{
  "title": "Updated Title"
}

Response (200):
{
  "success": true,
  "message": "Note updated successfully",
  "note": { ... }
}
```

## Security & Validation

- **Authentication**: All endpoints require JWT token
- **Authorization**: Users can only access their own notes
- **Validation**:
    - Title: Required, 1-50 characters
    - Content: Optional, max 500 characters
- **Error Handling**: Consistent error responses with proper HTTP status codes

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start server:**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3099`
   In-memory MongoDB starts automatically if `MONGO_URI` not set

3. **Test with Postman:**
    - Import `Notes_API.postman_collection.json`
    - Import `Notes_API.postman_environment.json`
    - Run "Authentication > Register" or "Login" first
    - Test Notes API endpoints

## Features

- RESTful API design
- In-memory MongoDB (no installation needed)
- JWT authentication
- User-specific data isolation
- Error handling
- Model-level validation
- Postman collection included

# Frontend Integration - Landing Page Enhancements

## Features

- **Dark/Light Mode Toggle** - Theme switcher in navbar with smooth transitions
- **Enhanced Hero Section** - New background image with animated particles and gradients
- **Smooth Animations** - Framer Motion animations throughout
- **Fully Responsive** - Works on mobile, tablet, and desktop

## Quick Start

```bash
npm install
npm start
```

##  Key Files

- `src/contexts/ThemeContext.jsx` - Theme state management
- `src/components/layout/Navbar.jsx` - Theme toggle button
- `src/pages/Home.jsx` - Enhanced landing page
- `tailwind.config.js` - Dark mode configuration

##  Using Dark Mode

### In Components

```jsx
import { useTheme } from '../contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

### In Styles

```jsx
<div className="bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white">
  Content
</div>
```

## Configuration

Dark mode is enabled in `tailwind.config.js`:

```javascript
darkMode: 'class'
```

Theme preference is saved to `localStorage` and persists across page reloads.

