/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./**/*.{html,js}",
      "!node_modules"
    ],
    theme: {
      extend: {
        fontFamily: {
          rubikBold: ['Rubik-Bold', 'sans-serif'],
          rubikSemiBold: ['Rubik-Semibold', 'sans-serif'],
          rubikMedium: ['Rubik-Medium', 'sans-serif'],
          rubik: ['Rubik-Regular', 'sans-serif']
        }
      }
    }
  }
  
  