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
  ],
};
