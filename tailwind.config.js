/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-green': '#2D5A27', // Vert forêt pour la nature
        'agro-lime': '#A3E635',  // Vert tendre pour la croissance
        'agro-earth': '#78350F', // Marron pour la terre
      },
    },
  },
  plugins: [],
}