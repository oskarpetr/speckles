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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "green-primary": "#3C672D",
        "green-primary-hover": "#325725",
        "green-light": "#D4DBCF",
        "black-primary": "#121212",
        "white-primary": "#FFF5E7",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
export default config;
