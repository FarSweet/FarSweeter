import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a855f7',
          DEFAULT: '#7e22ce',
          dark: '#5b21b6',
        },
        secondary: {
          light: '#c084fc',
          DEFAULT: '#a855f7',
          dark: '#7e22ce',
        },
        background: '#1a1a1a',
      },
    },
  },
  plugins: [],
};
export default config;
