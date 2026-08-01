import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f0ff",
          100: "#e6e1ff",
          500: "#6c4cf1",
          600: "#5b3ce0",
          700: "#4a2fc0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
