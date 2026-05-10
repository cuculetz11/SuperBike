/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        'gold-dark': '#8B6914',
        cream: '#F5F0E8',
        'gray-dim': '#1A1A1A',
        'gray-border': '#2A2A2A',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.3em',
        'mega': '0.5em',
      },
    },
  },
  plugins: [],
};
