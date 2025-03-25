/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          serif: ['Roboto', 'serif'],
        },
        colors: {
          primary: {
            50: '#f0f8ff',
            100: '#e0f0fe',
            200: '#bae1fd',
            300: '#7dccfd',
            400: '#3bb0fb',
            500: '#0e98f0',
            600: '#0177cc',
            700: '#015fa3',
            800: '#065186',
            900: '#0a4570',
          },
          secondary: {
            50: '#fef5f7',
            100: '#fde7ed',
            200: '#fcceda',
            300: '#fa9ab5',
            400: '#f6678f',
            500: '#f03a6a',
            600: '#db1c4f',
            700: '#b61243',
            800: '#981240',
            900: '#81123c',
          },
          accent: {
            50: '#f7f8dc',
            100: '#f1f3c1',
            200: '#e8e98a',
            300: '#dedf53',
            400: '#d4d52c',
            500: '#bcbc23',
            600: '#9c9c1c',
            700: '#7c7c17',
            800: '#646414',
            900: '#535313',
          },
        },
        animation: {
          'flow': 'flow 30s linear infinite',
        },
        keyframes: {
          flow: {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-50%)' },
          }
        },
        backgroundImage: {
          'gradient-flow': 'linear-gradient(-45deg, rgba(238, 119, 82, 0.7), rgba(231, 60, 126, 0.7), rgba(35, 166, 213, 0.7), rgba(35, 213, 171, 0.7))',
        },
        backgroundSize: {
          'flow': '400% 400%',
        },
      },
    },
    plugins: [],
  }