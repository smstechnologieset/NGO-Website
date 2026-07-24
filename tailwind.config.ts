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
        paper: "#F0F5F9",
        ink: "#0A192F",
        primary: {
          DEFAULT: "#0B284C",
          hover: "#061B35",
          light: "#E0EBF5",
        },
        accent: {
          DEFAULT: "#0284C7",
          hover: "#0369A1",
          light: "#E0F2FE",
        },
        secondaryAccent: {
          DEFAULT: "#0077B6",
          hover: "#023E8A",
          light: "#EBF8FF",
        },
        mutedBorder: "#CBD5E1",
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
