import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["LINESeedKR-Bd", "sans-serif"],
        secondary: ["Ainmom", "sans-serif"],
      },
      colors: {
        main: "#FFF7DB",
        base: "#FBF8EE",
        point: "#A16040",
      },
      fontSize: {
        basics: "1rem",
        subtitle: "1.5rem",
        title: "2rem",
      },
      screens: {
        "md-max": { max: "1068px" },
        "sm-max": { max: "734px" },
      },
      width: {
        "main-desktop": "1020px",
        "main-tablet": "710px",
        "main-mobile": "82%",
      },
      height: {
        "37": "37px",
      },
      animation: {
        baked: "",
      },
      keyframes: {
        shake: {},
      },
    },
  },
  plugins: [],
};
export default config;
