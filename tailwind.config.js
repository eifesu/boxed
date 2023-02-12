/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-dark': '#232323',
        'gray': '#C8C8C8',
        'black': '#DBDBDB',
        'primary': '#FF6A00',
        'red': '#C71F1F',
        'white': '#232323'
      }
    },
    
  },
  plugins: [],
}