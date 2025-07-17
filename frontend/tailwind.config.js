/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
      custom: '0 0 0 2px #2e2e2e',
      custom2: '0 0 4px 4px #7fd55448',

    },
  },
    
  },
  plugins: [],
}