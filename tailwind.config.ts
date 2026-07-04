import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        paper: "#f7f7f4",
        line: "#dedbd2",
        sage: "#7b8f76",
        clay: "#b66f4f",
        steel: "#57718a",
        mint: "#dfe8dc",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(31, 35, 32, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
