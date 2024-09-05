import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-color-default': '#f9fafa',
        'color-text-base': '#11111A',
        'color-text-alt': '#5E5E5E',
        'color-primary': '#6100FF',
        'color-secondary': '#f0e8fc',
      },
      boxShadow: {
        'card-shadow': '2px 1px 20px 0px #0000000D',
        'bold-shadow': '0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        md: ['18px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['32px', '32px'],
      },
      animation: {
        'slide-down': 'slide-down 200ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
      },
      keyframes: {
        'slide-down': {
          from: {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-up': {
          from: {
            transform: 'translateY(0)',
            opacity: '1',
          },
          to: {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
