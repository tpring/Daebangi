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
        main: ["SUIT-Regular", "sans-serif"],
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
      fontWeight: {
        basics: "500",
        subtitle: "700",
        title: "900",
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
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
