/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kdam: ['"Kdam Thmor Pro"', "sans-serif"],
        "press-start": ['"Press Start 2P"', "cursive"],
      },
      colors: {
        "sidebar-blue": "#2f88b5",
        "student-gold": "goldenrod",
      },
    },
  },
  plugins: [],
};
