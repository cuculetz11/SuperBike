/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#080808',
        'black-soft': '#0E0E0E',
        orange: {
          DEFAULT: '#F5A623',
          light: '#FFD080',
          hot: '#FF8C00',
        },
        red: {
          DEFAULT: '#E03C31',
          glow: '#FF4136',
        },
        cream: '#FFF8F0',
        'gray-card': '#141414',
        'gray-border': '#222222',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        ultra: '0.3em',
        mega: '0.5em',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
