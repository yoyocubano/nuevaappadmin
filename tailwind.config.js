/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ecb613',
        'primary-dark': '#d4a20f',
        'background-light': '#FAF8F3',
        'background-dark': '#1a1a1a',
        'surface-light': '#FFFFFF',
        'surface-dark': '#2C2C2C',
      },
    },
  },
  plugins: [],
}
