import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'zim-primary': '#6BE29A',
        'zim-secondary': '#543A8F',
        'zim-secondary-light': '#6444aa',
        'zim-secondary-dark': '#4e3487',
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};
