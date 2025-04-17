# Setup Guide

## Starting the Application

This is a frontend-only application that doesn't require a backend server.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to http://localhost:3000

## Troubleshooting

### Frontend Issues

If you're having issues with the application:

1. Make sure Node.js is installed:

   ```bash
   node --version
   ```

2. Clear any cached data:

   ```bash
   npm cache clean --force
   rm -rf .next
   rm -rf node_modules
   npm install
   ```

3. If you're having trouble adding selections, try:
   - Opening the application in a private/incognito window
   - Using a different browser
   - Checking your browser's console for errors (F12 or Ctrl+Shift+I)

## Using the Application

1. The sidebar displays the current entries in the selection bank
2. Use the input field below the title to add new entries to the bank
   - All entries will have their first letter of each word capitalized automatically
   - Multiple word entries are supported (e.g., "new york" becomes "New York")
3. Click the "Pick !!!" button to randomly select an entry
4. The selected entry will be highlighted in the sidebar
5. The selection bank starts empty each time you load the page

## Features

- Fresh selection bank on each page load
- Automatic capitalization of entries
- Responsive UI with hover effects
- Automatically highlights the selected entry
