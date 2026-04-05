import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    '../../apps/web/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF7',
        stone: 'rgba(26,25,22,0.09)',
        indigo: '#2D3561',
        indigoTint: '#EEF0F8',
        // Semantic badge colors
        badgeNew: {
          fill: '#E6F1FB',
          text: '#0C447C',
        },
        badgeContacted: {
          fill: '#FAEEDA',
          text: '#633806',
        },
        badgeSelected: {
          fill: '#E1F5EE',
          text: '#085041',
        },
        badgeRejected: {
          fill: '#FCEBEB',
          text: '#791F1F',
        },
      },
      borderRadius: {
        card: '14px',
        input: '8px',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(var(--amplitude, 8px))' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        drift: {
          '0%': { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(var(--dx, 20px), var(--dy, 20px))' },
        },
      },
      animation: {
        float: 'float var(--duration, 4s) ease-in-out infinite var(--delay, 0s)',
        pulseRing: 'pulseRing var(--ring-duration, 3s) linear infinite',
        drift: 'drift var(--drift-duration, 6s) linear infinite var(--drift-delay, 0s)',
      },
    },
  },
  plugins: [],
};

export default config;
