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
        primary: "#E5D9F2",
        secondary: "#F5EFFF",
        tertiary: "#CDC1FF",
        quaternary: "#A594F9",
        customHover: '#DEDEF0',
        buttonHover: "#C68FE6",
      },
      animation: {
        distort: 'distort 1s ease-in-out',
      },
      keyframes: {
        distort: {
          '0%': {
            filter: 'blur(0)',
          },
          '50%': {
            filter: 'blur(4px)',
          },
          '100%': {
            filter: 'blur(0)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
