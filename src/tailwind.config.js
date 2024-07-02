/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
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
        'textGray': '#838383',
        'mainPurple': '#686DE0',
        'mainPurpleSat': '#8588c2',
        'mainPurpleDark': '#4834D4',
        'darkModeBg': '#30336B',
        'darkModeBgDark': '#130F40',
        'darkRectangle': '#0E0B2F'
      },
      borderWidth: {
          '8': '8px'
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
      }
    },
  }
}

