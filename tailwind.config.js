/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultFonts = ['sans-serif', 'system-ui', 'apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'];

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gothammedium: ['gothammedium', defaultFonts],
        gothambold: ['gothambold', ...defaultFonts],
        gothamblack: ['gothamblack', ...defaultFonts],
        gothamlight: ['gothamlight', ...defaultFonts],
        gothambook: ['gothambook', ...defaultFonts],
        gothambookitalic: ['gothambookitalic', ...defaultFonts],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('nth-child-n5', '&:nth-child(n+5)');
    }),
  ],
};
