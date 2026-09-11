import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        "paper-dim": "#F2EDE3",
        ink: "#171512",
        "ink-soft": "#4A4640",
        navy: "#101A2E",
        "navy-soft": "#243254",
        accent: "#8A2432",
        "accent-soft": "#B6543F",
        primaria: "#1F5C4A",
        line: "#E1DACB",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
