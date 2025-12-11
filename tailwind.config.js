import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.js"

  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
     primary: {
          50:  '#FFFAE6',
          100: '#FFF3C4',
          200: '#FFE89A',
          300: '#FFD86E',
          400: '#FFCA45',
          500: '#FFBF00', // Or principal (Gold)
          600: '#E6AC00',
          700: '#CC9900',
          800: '#A67E00',
          900: '#735700',
        },

        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'logo': ['Pacifico', 'serif'],
      }
    },
  },
  plugins: [],
}

export default config