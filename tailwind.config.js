/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: 'hsl(61, 70%, 52%)',
        red: 'hsl(4, 69%, 50%)',
        slate: {
          100: 'hsl(202, 86%, 94%)',
          300: 'hsl(203, 41%, 72%)',
          500: 'hsl(200, 26%, 54%)',
          700: 'hsl(200, 24%, 40%)',
          900: 'hsl(202, 55%, 16%)',
        }
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.5vw + 0.5rem, 1rem)',
        'fluid-sm': 'clamp(0.875rem, 0.5vw + 0.625rem, 1.125rem)',
        'fluid-base': 'clamp(1rem, 0.5vw + 0.75rem, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 0.5vw + 0.875rem, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 1vw + 1rem, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 1vw + 1.25rem, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1vw + 1.5rem, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1vw + 1.75rem, 3rem)',
        'fluid-5xl': 'clamp(3rem, 1vw + 2.25rem, 4rem)',
        'fluid-6xl': 'clamp(3.75rem, 1vw + 2.75rem, 5rem)',
        'fluid-7xl': 'clamp(4.5rem, 1vw + 3.5rem, 6rem)',
        'fluid-8xl': 'clamp(6rem, 1vw + 4.5rem, 8rem)',
        'fluid-9xl': 'clamp(8rem, 1vw + 6rem, 10rem)',
      },
    },
  },
  plugins: [],
}