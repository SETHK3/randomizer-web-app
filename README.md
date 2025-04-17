# Random Select Generator

A frontend web application to randomly select from a selection bank.

## Tech Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Font Awesome
- localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Features

- Displays a selection bank
- Add new entries to the selection bank (automatically capitalized)
- Supports multiple word entries with proper capitalization
- Randomly selects an entry from the bank
- Highlights the selected entry
- Starts with an empty selection bank on each page load
- Resets selection after 5 seconds

## How It Works

1. The app uses an empty selection bank on initial load
2. When you add entries, they're saved during your current session
3. All entries are automatically capitalized (first letter of each word)
4. The random selection process picks an entry from the stored list
5. The UI highlights the selected entry in the sidebar

No backend server or database is required - everything runs directly in the browser!
