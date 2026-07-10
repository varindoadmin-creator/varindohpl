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
        sans:    ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'sans-serif']
      },
      colors: {
        edl: {
          // Semantic named
          white:    '#ffffff',
          paper:    '#f8fafc',
          cream:    '#f1f5f9',
          ink:      '#0b1424',
          muted:    '#64748b',
          line:     '#e2e8f0',
          blue:     '#374151',
          'blue-lt':'#f3f4f6',
          warm:     '#f8fafc',
          sand:     '#cbd5e1',
          // Numeric scale (neutral slate)
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
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
