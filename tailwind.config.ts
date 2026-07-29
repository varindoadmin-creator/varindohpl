import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        edl: {
          // Semantic named
          white:    '#ffffff',
          paper:    '#fbfaf6',
          cream:    '#f1f3ec',
          ink:      '#20302a',
          muted:    '#68756f',
          line:     '#dfe5de',
          blue:     '#527663',
          'blue-lt':'#edf2ea',
          warm:     '#f5e6df',
          sand:     '#cbd8ce',
          // Numeric scale (neutral slate)
          50:  '#f7f8f4',
          100: '#edf2ea',
          200: '#dfe7df',
          300: '#c7d4ca',
          400: '#96aa9d',
          500: '#687b70',
          600: '#52675c',
          700: '#3c5047',
          800: '#293d34',
          900: '#182a22',
        }
      },
      boxShadow: {
        luxury:       '0 32px 96px rgba(11, 20, 36, 0.10)',
        card:         '0 4px 24px rgba(11, 20, 36, 0.07)',
        'card-hover': '0 16px 48px rgba(11, 20, 36, 0.13)',
        'inset-top':  'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      letterSpacing: {
        'widest-xl':  '0.25em',
        'widest-2xl': '0.32em',
      }
    }
  },
  plugins: []
};

export default config;
