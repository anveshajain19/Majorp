module.exports = {
  darkMode: 'class', // Enable dark mode with class-based toggling
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offBlack: '#292929',
        grey: '#B5B5B5',
        offWhite: '#c8c8c8',
        base: '#121212',
        success: '#03DAC5',
        primary: '#09f',
        offPrimary: '#0af',
        bgBlack: '#1A1A1A',
        offgrey: '#343434',
        offgreyer: '#353535',
        expblue: '#0099FF',
        exppurple: '#8463d0',

        // Dark mode specific colors
        darkPrimary: '#0A84FF',
        darkSuccess: '#00C07F',
        darkBackground: '#181818',
        darkCard: '#242424',
        darkText: '#E5E5E5',
        darkBorder: '#444444',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        lightBg: '#f9f9f9', // Light mode background
        darkBg: '#181818', // Dark mode background
      }),
      textColor: theme => ({
        ...theme('colors'),
        lightText: '#1A1A1A', // Light mode text
        darkText: '#E5E5E5',  // Dark mode text
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
