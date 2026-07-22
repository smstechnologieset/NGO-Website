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
        paper: "#FBF7F1",
        ink: "#22302A",
        primary: {
          DEFAULT: "#2F6F5E",
          hover: "#235447",
          light: "#EAEFEA",
        },
        accent: {
          DEFAULT: "#E1A94C",
          hover: "#CD9539",
          light: "#FCF6EB",
        },
        secondaryAccent: {
          DEFAULT: "#C97B8B",
          hover: "#B46575",
          light: "#FAF0F2",
        },
        mutedBorder: "#DCD3C4",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
