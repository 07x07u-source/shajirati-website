import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef4f0",
          100: "#dbe8df",
          200: "#b9d1c0",
          300: "#8db39a",
          400: "#629076",
          500: "#417158",
          600: "#315b45",
          700: "#234B35",
          800: "#1b3c2b",
          900: "#183328",
          950: "#0d1d16"
        },
        sand: {
          50: "#fcfaf6",
          100: "#F7F0E5",
          200: "#eee1cf",
          300: "#dfc9aa"
        }
      },
      boxShadow: {
        float: "0 18px 60px -24px rgba(13, 45, 29, .28)",
        glass: "0 12px 34px -18px rgba(13, 45, 29, .28), inset 0 1px 0 rgba(255,255,255,.72)"
      }
    }
  },
  plugins: []
};

export default config;
