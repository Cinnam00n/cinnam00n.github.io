/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {

    extend: {
      colors: {
        'darkgreen': '#2D3D25',
        'white': '#FFFAE3'
      },
      backgroundImage: {
        'baner-horizontal': "url('img/baner-horizontal.jpg')",
        'baner-vertical': "url('img/baner-vertical.png')"
      },
      height: {
        'box': '10vh'
      },
      fontFamily: {
        'body': 'Signika, sans-serif'
      }
    },
  },
  plugins: [],
}

