import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2.5rem", xl: "3rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F5EFE6",
          50: "#FCFAF6",
          100: "#F9F5EF",
          200: "#F5EFE6",
          300: "#EDE3D4",
          400: "#E2D4BF",
          500: "#D4C2A6",
        },
        espresso: {
          DEFAULT: "#2A1F18",
          50: "#6B5A4E",
          100: "#5A493D",
          200: "#4A3A2F",
          300: "#3B2D24",
          400: "#2A1F18",
          500: "#1F1611",
          600: "#150F0B",
        },
        gold: {
          DEFAULT: "#A8834B",
          light: "#C9A961",
          pale: "#E6D5B0",
          dark: "#8A6A3A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { luxe: "0.25em", wider2: "0.15em" },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.08" }],
        "display-md": ["clamp(2rem, 3.6vw, 3.25rem)", { lineHeight: "1.12" }],
        "display-sm": ["clamp(1.6rem, 2.4vw, 2.25rem)", { lineHeight: "1.2" }],
      },
      boxShadow: {
        luxe: "0 20px 60px -20px rgba(42, 31, 24, 0.25)",
        soft: "0 8px 30px -12px rgba(42, 31, 24, 0.18)",
        gold: "0 0 0 1px rgba(168, 131, 75, 0.35)",
      },
      transitionTimingFunction: { luxe: "cubic-bezier(0.22, 1, 0.36, 1)" },
      transitionDuration: { "1200": "1200ms", "1500": "1500ms" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "ken-burns": { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.12)" } },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.8s ease-out both",
        "ken-burns": "ken-burns 12s ease-out both",
        "slide-down": "slide-down 0.3s ease-out both",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
