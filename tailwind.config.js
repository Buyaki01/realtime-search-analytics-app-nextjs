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
        'primary': '#d40d9a',
        'secondary': 'rgb(146, 212, 59)',
      },
      backgroundColor: {
        'primary': '#d40d9a',
        'secondary': 'rgb(146, 212, 59)',
      },
    },
  },
  plugins: [],
}
