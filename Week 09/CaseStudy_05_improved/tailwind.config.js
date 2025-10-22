/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        javajam: {
          brown: '#8B4513',
          cream: '#F5DEB3',
          coffee: '#6F4E37',
        }
      }
    },
  },
  plugins: [],
}
