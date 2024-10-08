/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'green': '#1DB954',
      'black': '#191414',
      'white': '#FFFFFF',
      'red': '#FF0000',
      'gray': '#6b7280',
      'light-gray': '#B3B3B3',
    }
  },
  plugins: [],
};


