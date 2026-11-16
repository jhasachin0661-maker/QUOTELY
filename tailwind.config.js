/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#171528',
          deep: '#121020',
          elevated: '#1D1A32',
        },
        velvet: {
          DEFAULT: '#28233F',
          surface: '#201C33',
          card: '#2D2747',
          hover: '#352E53',
          light: '#3D355F',
        },
        electric: {
          DEFAULT: '#7167F8',
          hover: '#5F54E8',
          subtle: 'rgba(113, 103, 248, 0.12)',
          border: 'rgba(113, 103, 248, 0.3)',
        },
        ember: {
          DEFAULT: '#FF765E',
          hover: '#FF6247',
          active: '#E6533A',
          subtle: 'rgba(255, 118, 94, 0.14)',
        },
        marigold: {
          DEFAULT: '#F2C45B',
          subtle: 'rgba(242, 196, 91, 0.15)',
        },
        mint: {
          DEFAULT: '#9BE2C2',
          subtle: 'rgba(155, 226, 194, 0.14)',
          border: 'rgba(155, 226, 194, 0.3)',
        },
        lavender: {
          DEFAULT: '#C9BDFB',
          subtle: 'rgba(201, 189, 251, 0.12)',
        },
        cloud: {
          DEFAULT: '#E8E3F2',
          subtle: 'rgba(232, 227, 242, 0.08)',
          border: 'rgba(232, 227, 242, 0.14)',
        },
        editorial: {
          light: '#F4F1FA',
          muted: '#B5B0C9',
          subtle: '#8C86A5',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'nocturne': '0 12px 36px -10px rgba(10, 8, 20, 0.65), 0 0 0 1px rgba(232, 227, 242, 0.07)',
        'nocturne-lg': '0 24px 60px -15px rgba(8, 6, 18, 0.8), 0 0 0 1px rgba(232, 227, 242, 0.1)',
        'glow-ember': '0 4px 20px -2px rgba(255, 118, 94, 0.35)',
        'glow-electric': '0 4px 20px -2px rgba(113, 103, 248, 0.4)',
        'glow-mint': '0 4px 20px -2px rgba(155, 226, 194, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}

