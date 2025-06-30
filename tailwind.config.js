/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cool-bg': '#f5f7fa',
        'cool-card': '#ffffff',
        'cool-text': '#333333',
        'cool-text-light': '#555555',
        'cool-accent': '#a3bffa',
        'cool-border': '#e0e0e0',
      },
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'cool': '12px',
      },
      boxShadow: {
        'cool': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'cool-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};