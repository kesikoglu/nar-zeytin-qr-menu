import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
