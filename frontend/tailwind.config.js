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
    }
    ,},
  },
  plugins: [],
}