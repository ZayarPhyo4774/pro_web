import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        gold: 'var(--color-gold)',
        forest: 'var(--color-forest)',
        offwhite: 'var(--color-offwhite)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        'muted-soft': 'var(--color-muted-soft)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        accent: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        myanmar: ['var(--font-myanmar)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        'glow-gold': '0 24px 60px rgba(200,169,107,0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
