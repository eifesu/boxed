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
        'gray': '#373737',
        'black': '#1E1E1E',
        'primary': '#FF6A00',
        'red': '#C71F1F'
      }
    },
    
  },
  plugins: [],
}