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

## 🔧 Configuration

Dark mode is enabled in `tailwind.config.js`:

```javascript
darkMode: 'class'
```

Theme preference is saved to `localStorage` and persists across page reloads.

