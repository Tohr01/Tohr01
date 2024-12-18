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
        },
        colors: {
          'bsGreen': '#3C817A',
          'bsGray': '#2F4146',
          'bsPurple': '#9b59b6',
        },
        textShadow: {
          sm: '0 1px 2px var(--tw-shadow-color)',
          DEFAULT: '0 2px 4px var(--tw-shadow-color)',
          lg: '0 8px 16px var(--tw-shadow-color)',
        },
        boxShadow: {
            'default': '0 3px 20px rgba(0,0,0,0.14)' 
        },
        borderWidth: {
          '3': '3px'
        },
        textDecorationThickness: {
          '6': '6px'
        }
      },
    }
  }
  
  