import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#b22222",
          foreground: "#ffffff",
          hover: "#9a1d1d",
        },
        secondary: {
          DEFAULT: "#f5efe6",
          foreground: "#5c3a21",
        },
        accent: {
          DEFAULT: "#5c3a21",
          foreground: "#ffffff",
        },
        "gray-border": "rgba(92, 58, 33, 0.15)",
        "gray-bg": "#f5efe6",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "Lato", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "zoom-in": "zoom-in 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
      },
      keyframes: {
        "zoom-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        card: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
