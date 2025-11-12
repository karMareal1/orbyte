/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orbyte-blue': '#1e3a5f',
        'orbyte-green': '#4ade80',
        'orbyte-orange': '#fb923c',
      },
    },
  },
  plugins: [],
}

