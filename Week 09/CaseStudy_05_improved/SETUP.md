# Quick Setup Guide

## Step 1: Verify XAMPP is Running
1. Open XAMPP Control Panel
2. Start Apache
3. Start MySQL
4. Verify at: http://localhost/phpmyadmin

## Step 2: Import Database
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Create database named `javajam` (if not exists)
3. Import `database/javajam_db.sql`
4. Import `database/test_data.sql` (optional, for sample data)

## Step 3: Update API URL
1. Open `src/services/api.js`
2. Update line 2:
   ```javascript
   const API_BASE_URL = 'http://localhost/IE4727-Web-Application-Design/Week%2009/CaseStudy_05_improved/backend';
   ```
   Change the path to match your XAMPP htdocs structure.

## Step 4: Install Dependencies
```bash
cd CaseStudy_05_improved
npm install
```

## Step 5: Start Development Server
```bash
npm run dev
```

Application will open at: http://localhost:5173

## Troubleshooting

### CORS Errors
If you see CORS errors in browser console:
1. Add to each PHP file in backend/ folder at the top (after <?php):
   ```php
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type");
   ```

### API Connection Failed
1. Check XAMPP is running
2. Verify API_BASE_URL in `src/services/api.js`
3. Test backend directly: http://localhost/YOUR_PATH/backend/api_products.php
4. Should return JSON with success:true

### Build Errors
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npm run dev`

### Tailwind Not Working
1. Check `tailwind.config.js` exists
2. Check `postcss.config.js` exists
3. Check `@tailwind` directives in `src/index.css`
4. Restart dev server

## Production Build

When ready to deploy:
```bash
npm run build
```

Built files will be in `dist/` folder. Copy to web server.
