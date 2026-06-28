/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        panel: "#0D0D11",
        primary: {
          DEFAULT: "#8B5CF6", // Violet
          dark: "#7C3AED",
          light: "#A78BFA",
        },
        secondary: {
          DEFAULT: "#06B6D4", // Cyan
          dark: "#0891B2",
          light: "#22D3EE",
        },
        accent: {
          DEFAULT: "#F43F5E", // Rose
          green: "#10B981",  // Emerald
        }
      },
      animation: {
        "marquee-left": "marquee-left 25s linear infinite",
        "marquee-right": "marquee-right 25s linear infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 1, filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.6))" },
          "50%": { opacity: 0.7, filter: "drop-shadow(0 0 5px rgba(139, 92, 246, 0.2))" }
        }
      },
    },
  },
  plugins: [],
};
