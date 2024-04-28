const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#18181B',
              // DEFAULT: '#008a5e',
              foreground: '#FFF',
            },
            focus: '#A1A1AA',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#008a5e',
            },
          },
        },
      },
    }),
  ],
};
