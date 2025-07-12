/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#010409',
          light: '#0D1117',
        },
        secondary: '#C9D1D9',
        accent: {
          DEFAULT: '#58A6FF',
          hover: '#79C0FF',
        },
        subtle: '#8B949E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
