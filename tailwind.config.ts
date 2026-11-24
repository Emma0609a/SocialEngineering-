import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: { top: "#7B6CA6", mid: "#D96BA0", bottom: "#F6B07A" },
        chrome: { indigo: "#2B3A8F", blue: "#1E6FD9", light: "#8FB8E8" },
        ink: "#1A1526",
        paper: "#F7F3EE",
        bait: { ok: "#36C17A", urgent: "#E3443B" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Anton", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        sunset:
          "linear-gradient(180deg, #7B6CA6 0%, #D96BA0 48%, #F6B07A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
