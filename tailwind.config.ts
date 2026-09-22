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
        // next/font sets these variables on <html>; the fallbacks matter only
        // for the swap window.
        sans:    ['var(--font-ui)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Instrument Serif', 'Georgia', 'serif'],
        serif:   ['var(--font-display)', 'Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        edl: {
          // Semantic — warm neutrals only. A swatch must never be read
          // against a tint that shifts how its colour appears.
          white:    '#ffffff',
          paper:    '#f6f4ef',
          raised:   '#fbfaf7',
          cream:    '#efece4',
          ink:      '#1b1a16',
          muted:    '#6f6b62',
          line:     '#e4e0d7',
          'line-soft': '#eeebe4',
          // The single accent, used sparingly for emphasis and hover.
          accent:   '#2e3b32',
          'accent-lt': '#eef0eb',
          // Kept so existing call sites keep compiling; both now resolve to
          // the accent rather than the old sage-green named "blue".
          blue:     '#2e3b32',
          'blue-lt':'#eef0eb',
          sand:     '#d8d3c7',
          warm:     '#efece4',
          // Numeric scale — warm grey, not slate
          50:  '#f6f4ef',
          100: '#efece4',
          200: '#e4e0d7',
          300: '#d0cabd',
          400: '#9b978d',
          500: '#6f6b62',
          600: '#57534b',
          700: '#403d36',
          800: '#2a2822',
          900: '#1b1a16',
        }
      },
      boxShadow: {
        // Shadows stay almost invisible: this design separates with hairlines.
        luxury:       '0 24px 80px rgba(27, 26, 22, 0.08)',
        card:         '0 1px 2px rgba(27, 26, 22, 0.04)',
        'card-hover': '0 12px 32px rgba(27, 26, 22, 0.09)',
        'inset-top':  'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      letterSpacing: {
        'widest-xl':  '0.22em',
        'widest-2xl': '0.28em',
      }
    }
  },
  plugins: []
};

export default config;
