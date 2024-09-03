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
        primary: "#FF5656",
        "primary-1": "#FF6B6B",
        "primary-2": "#FF8C8C",
        secondary: "#F9D79F",
        "secondary-1": "#9C8663",
        border: "#E9E9E9",
        "sub-border": "#F8F8F8",
        neutral: "#4E4E4E",
        base: "#636363",
        underline: "#BABABA",
        error: "#FF3737",
      },
      fontSize: {
        md: "16px",
      },
      boxShadow: {
        custom: "4px 5px 18px 0px #00000020",
      },
    },
  },
  plugins: [],
};
export default config;
