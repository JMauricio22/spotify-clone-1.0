/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultFonts = ['sans-serif', 'system-ui', 'apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'];

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: ['aside header', 'aside main', 'player player'],
      },
      gridTemplateColumns: {
        layout: '250px minmax(530px,1fr)',
      },
      gridTemplateRows: {
        layout: '60px 1fr 90px',
      },
      screens: {
        '2lg': '1160px',
        '3lg': '1200px',
        '4lg': '1320px',
      },
      backgroundImage: {
        'playlist-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, #121212 280px)',
      },
      fontFamily: {
        gothammedium: ['gothammedium', defaultFonts],
        gothambold: ['gothambold', ...defaultFonts],
        gothamblack: ['gothamblack', ...defaultFonts],
        gothamlight: ['gothamlight', ...defaultFonts],
        gothambook: ['gothambook', ...defaultFonts],
        gothambookitalic: ['gothambookitalic', ...defaultFonts],
      },
      animation: {
        'spinner-bounce': 'sk-bouncedelay 1.4s ease-in-out infinite both',
        'spinner-bounce-delay-1': 'sk-bouncedelay 1.4s ease-in-out -0.32s infinite both',
        'spinner-bounce-delay-2': 'sk-bouncedelay 1.4s ease-in-out -0.16s infinite both',
      },
      keyframes: {
        'sk-bouncedelay': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1.0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('nth-child-n5', '&:nth-child(n+5)');
    }),
    require('tailwind-scrollbar'),
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
};
