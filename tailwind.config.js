/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-black': '#000000',
        'neon-blue': '#00d4ff',
        'neon-cyan': '#0ff0fc',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(to bottom right, #000000 via #0f172a to #00d4ff)',
      },
    },
  },
  plugins: [],
}
