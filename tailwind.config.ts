import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#06080f',
        neonBlue: '#42e9ff',
        neonPurple: '#a970ff',
        neonRed: '#ff4d6d'
      },
      boxShadow: {
        glowBlue: '0 0 16px rgba(66, 233, 255, 0.45)',
        glowPurple: '0 0 16px rgba(169, 112, 255, 0.45)',
        glowRed: '0 0 18px rgba(255, 77, 109, 0.55)'
      },
      animation: {
        shake: 'shake 0.35s ease-in-out'
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
