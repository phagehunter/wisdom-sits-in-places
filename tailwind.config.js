/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Fine-mat cream" — the tones of an 'ie toga, used for display type & accents
        sepia: {
          100: '#f5ecdb',
          200: '#ecdcbf',
          300: '#e0c088',
          400: '#cda062',
          500: '#b3854a',
          600: '#8f6a3a',
          700: '#6b4f2c',
        },
      },
      fontFamily: {
        // Brand: Cormorant Garamond (display) + Source Serif 4 (reading) + Source Sans 3 (UI) — self-hosted via @fontsource
        display: ['"Cormorant Garamond"', '"Iowan Old Style"', 'Palatino', 'Georgia', 'serif'],
        reading: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
