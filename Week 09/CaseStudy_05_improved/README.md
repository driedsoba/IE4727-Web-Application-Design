# JavaJam Coffee House - Improved Version (React + Tailwind CSS)

This is an enhanced version of the JavaJam Coffee House application, rebuilt with modern frontend technologies while maintaining the original PHP backend.

## Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Modern icon library
- **Vite** - Next-generation frontend tooling

### Backend (RETAINED)
- **PHP 7.4+** - Server-side processing
- **MySQL/MariaDB** - Database management
- **MySQLi** - Database connectivity with prepared statements

## Key Improvements Over Base Version

### 1. Modern UI/UX
- Responsive design with Tailwind CSS
- Smooth transitions and animations
- Card-based layouts
- Icon integration with Lucide React
- Gradient backgrounds and modern color scheme
- Mobile-friendly navigation

### 2. Enhanced User Experience
- Real-time price updates without page refresh
- Loading states for better feedback
- Inline form validation
- Success/error message notifications
- Hover effects and interactive elements

### 3. Code Quality
- Component-based architecture
- Custom React hooks for data fetching
- Centralized API service
- Type-safe prop handling
- Reusable UI components

### 4. Performance
- Vite for fast development and build
- Code splitting with React Router
- Optimized re-renders with React hooks
- Efficient state management

## Project Structure

```
CaseStudy_05_improved/
├── backend/                      # PHP backend (same as base version)
│   ├── api_products.php
│   ├── api_update_price.php
│   ├── api_checkout.php
│   ├── api_sales_report.php
│   └── dbconnect.php
├── database/                     # Database files
│   ├── javajam_db.sql
│   └── test_data.sql
├── public/                       # Static assets
│   ├── coffee.jpg
│   └── croissant.png
├── src/
│   ├── components/              # React components
│   │   ├── Layout/
│   │   │   ├── Navigation.jsx   # Main navigation bar
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   └── Layout.jsx       # Layout wrapper
│   │   ├── Menu/
│   │   │   └── ProductCard.jsx  # Product display card
│   │   └── Admin/
│   ├── pages/                   # Page components
│   │   ├── HomePage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── MusicPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── PriceUpdatePage.jsx
│   │   └── SalesReportPage.jsx
│   ├── hooks/                   # Custom React hooks
│   │   └── useProducts.js       # Product data fetching hook
│   ├── services/                # API services
│   │   └── api.js               # Centralized API calls
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind CSS + custom styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Installation

### Prerequisites
- Node.js 16+ and npm
- XAMPP (Apache + MySQL)
- Modern web browser

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd CaseStudy_05_improved
   npm install
   ```

2. **Configure Backend**
   - Ensure XAMPP is running (Apache + MySQL)
   - Import `database/javajam_db.sql` in phpMyAdmin
   - Optionally import `database/test_data.sql` for sample data
   - Verify backend is accessible at `http://localhost/...`

3. **Update API Base URL**
   Edit `src/services/api.js` and update the `API_BASE_URL` to match your setup:
   ```javascript
   const API_BASE_URL = 'http://localhost/YOUR_PATH/CaseStudy_05_improved/backend';
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Component Development

All React components are in `src/components/` and `src/pages/`. Follow these conventions:

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and single-responsibility
- Use Tailwind utility classes for styling
- Handle loading and error states

### API Integration

All API calls go through `src/services/api.js`. To add a new endpoint:

```javascript
async newEndpoint(params) {
  try {
    const response = await fetch(`${API_BASE_URL}/new_endpoint.php`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Features

### Customer Features
- **Interactive Menu** - Real-time price calculations, quantity selection, option choices
- **Shopping Cart** - Visual cart with total, checkout functionality
- **Order Confirmation** - Success messages with order details

### Admin Features
- **Price Management** - Update product prices with immediate feedback
- **Sales Analytics** - Comprehensive reports with three views:
  - Sales by Product (with breakdown)
  - Sales by Category
  - Best Selling Product identification

### General Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with smooth animations
- **Fast Performance** - Optimized with Vite and React

## Deployment

### Production Build

1. **Build the React app**
   ```bash
   npm run build
   ```
   This creates optimized files in `dist/` folder

2. **Deploy Backend**
   - Copy `backend/` folder to your web server
   - Copy `database/` files
   - Import database

3. **Deploy Frontend**
   - Copy contents of `dist/` folder to web server
   - Configure server to handle client-side routing
   - Update API_BASE_URL in built JavaScript files if needed

### XAMPP Deployment

1. Copy entire `CaseStudy_05_improved` folder to `C:\xampp\htdocs\`
2. Build React app: `npm run build`
3. Configure Apache to serve `dist/` folder or use proxy
4. Access at `http://localhost/CaseStudy_05_improved/dist/`

## Comparison: Base vs Improved

| Feature | Base Version | Improved Version |
|---------|-------------|------------------|
| Frontend | Vanilla JS + Custom CSS | React + Tailwind CSS |
| Routing | Multi-page (server-side) | SPA with React Router |
| State Management | DOM manipulation | React Hooks |
| Styling | Custom CSS classes | Tailwind utility classes |
| Components | None | Reusable React components |
| Icons | None | Lucide React icons |
| Build Tool | None | Vite |
| Dev Experience | Manual refresh | Hot Module Replacement |
| Performance | Standard | Optimized with code splitting |
| Maintainability | Moderate | High (component-based) |

## Additional Marks Justification

This improved version demonstrates:

1. **Modern Frontend Framework** (React.js)
   - Component-based architecture
   - Custom hooks for data management
   - Efficient state management
   - Professional code organization

2. **Advanced Styling** (Tailwind CSS)
   - Responsive design
   - Modern UI components
   - Consistent design system
   - Professional aesthetics

3. **Enhanced User Experience**
   - Single Page Application (SPA)
   - Real-time updates
   - Loading states
   - Error handling
   - Smooth animations

4. **Code Quality**
   - Clean architecture
   - Reusable components
   - Centralized API service
   - Best practices followed

5. **Development Tools**
   - Modern build system (Vite)
   - Hot reload development
   - Production optimization
   - ESLint integration

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- No authentication/authorization (both versions)
- No real-time notifications (requires WebSocket)
- No offline support
- Backend remains PHP (not Node.js)

## Future Enhancements

- Add authentication for admin pages
- Implement WebSocket for real-time updates
- Add chart visualizations (Chart.js/Recharts)
- Implement progressive web app (PWA) features
- Add unit and integration tests
- Migrate backend to Node.js + Express (for full JavaScript stack)
- Add MongoDB for more flexible data storage

## Author

Jun Le  
Nanyang Technological University  
IE4727 Web Application Design - 2025

## License

Educational project for IE4727 course.
