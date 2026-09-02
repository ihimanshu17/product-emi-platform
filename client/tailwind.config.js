/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        navy: {
          800: '#151E2E',
          850: '#0F172A',
          900: '#0A0F1D',
          950: '#060913',
        },
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          600: '#5b21b6',
          700: '#4c1d95',
          800: '#3b0764',
          900: '#2e1065',
        },
        fi: {
          blue: '#1E40AF',
          blueHover: '#1D4ED8',
          purple: '#6D28D9',
          green: '#10B981',
          dark: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 30px -6px rgba(15, 23, 42, 0.09), 0 4px 12px -3px rgba(15, 23, 42, 0.04)',
        'fintech': '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 4px 10px -3px rgba(15, 23, 42, 0.03)',
        'fintech-hover': '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.05)',
        'selected': '0 0 0 2px #2563EB, 0 10px 20px -3px rgba(37, 99, 235, 0.15)',
        'glow-blue': '0 0 35px -5px rgba(37, 99, 235, 0.25)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
