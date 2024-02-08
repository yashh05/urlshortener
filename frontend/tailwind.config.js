/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'scale(0) rotate(0deg)' },
          '100%': { transform: 'scale(1) rotate(720deg)' },
        },
      },
      animation: {
        'logo-smooth': 'wiggle 1.5s ease-in-out',
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
        roboto: "Roboto, sans- serif"
      }
    },
  },
  plugins: [],
}