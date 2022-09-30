/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ecom_blue: {
          light: '#365AA3',
          DEFAULT: '#073763',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
