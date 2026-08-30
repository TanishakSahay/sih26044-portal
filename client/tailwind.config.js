/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#161B22',
          light: '#242B35',
          lighter: '#30363D',
          muted: '#6E7681',
          subtle: '#8B949E',
        },
        paper: {
          DEFAULT: '#F7F5F0',
          card: '#FFFFFF',
          darker: '#EFECE6',
          border: '#E2DCD5',
        },
        signal: {
          DEFAULT: '#4F46E5', // Signal Indigo
          light: '#6366F1',
          dark: '#4338CA',
          subtle: '#EEF2FF',
        },
        momentum: {
          DEFAULT: '#0EA5A0', // Momentum Teal
          light: '#14B8A6',
          dark: '#0F766E',
          subtle: '#F0FDFA',
        },
        ember: {
          DEFAULT: '#F97316', // Ember
          light: '#FB923C',
          dark: '#EA580C',
          subtle: '#FFF7ED',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.70)',
          dark: 'rgba(22, 27, 34, 0.75)',
          border: 'rgba(255, 255, 255, 0.35)',
          borderDark: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
        'glow-indigo': '0 0 25px -5px rgba(79, 70, 229, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(14, 165, 160, 0.4)',
        'glow-ember': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
      },
      backgroundImage: {
        'mesh-sig': 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(14, 165, 160, 0.08) 100%)',
        'mesh-hero': 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #0EA5A0 100%)',
      }
    },
  },
  plugins: [],
}
