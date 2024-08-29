/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: "hsl(61, 70%, 52%)",
        red: "hsl(4, 69%, 50%)",
        slate: {
          100: "hsl(202, 86%, 94%)",
          300: "hsl(203, 41%, 72%)",
          500: "hsl(200, 26%, 54%)",
          700: "hsl(200, 24%, 40%)",
          900: "hsl(202, 55%, 16%)",
        },
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.65rem + 0.2vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.3vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.4vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.25rem + 0.6vw, 1.875rem)",
        "fluid-3xl": "clamp(1.875rem, 1.5rem + 0.75vw, 2.25rem)",
        "fluid-4xl": "clamp(2.25rem, 1.75rem + 1vw, 2.5rem)",
        "fluid-5xl": "clamp(3rem, 2.5rem + 1.25vw, 3.5rem)",
        "fluid-6xl": "clamp(3.75rem, 3rem + 1.5vw, 4rem)",
        "fluid-7xl": "clamp(4.5rem, 3.5rem + 2vw, 5rem)",
        "fluid-8xl": "clamp(6rem, 4.5rem + 3vw, 7rem)",
        "fluid-9xl": "clamp(8rem, 6rem + 4vw, 9rem)",
      },
    },
  },
  plugins: [],
};
