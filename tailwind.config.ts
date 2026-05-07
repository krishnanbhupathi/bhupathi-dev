import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7E7CE',
        'bg-plain': '#FFF8EE',
        surface: '#FFF5E6',
        'surface-2': '#EDD9B7',
        line: '#DBC9A4',
        'line-strong': '#C4AE87',
        text: '#102C26',
        'text-dim': '#3A5449',
        'text-mute': '#6B7F77',
        accent: '#b2e659',
        'accent-ink': '#102C26',
        'accent-soft': '#e8f6d1',
      },
      fontFamily: {
        sans: ['Geist Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1320px',
      },
      letterSpacing: {
        brand: '-0.32px',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '360px',
        '2xs': '480px',
      },
    },
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '0',
    },
  },
  plugins: [],
};

export default config;
