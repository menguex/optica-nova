import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--nova-ink)",
        graphite: "var(--nova-graphite)",
        smoke: "var(--nova-smoke)",
        silver: "var(--nova-silver)",
        bone: "var(--nova-bone)",
        paper: "var(--nova-paper)",
        cream: "var(--nova-cream)",
        optic: "var(--nova-optic-blue)",
        mist: "var(--nova-cyan-mist)",
        background: "var(--nova-bg)",
        foreground: "var(--nova-fg)",
        muted: "var(--nova-fg-muted)",
        subtle: "var(--nova-fg-subtle)",
        line: "var(--nova-line)",
        glass: "var(--nova-glass)",
        reserve: "var(--nova-reserve-bg)",
        "reserve-fg": "var(--nova-reserve-fg)",
        "surface-dark": "var(--nova-surface-dark)",
        "surface-light": "var(--nova-surface-light)",
        "on-light": "var(--nova-on-light-text)",
        "on-dark": "var(--nova-reserve-fg)",
        cta: {
          DEFAULT: "var(--nova-cta-bg)",
          fg: "var(--nova-cta-fg)",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.14em",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        float: "var(--shadow-float)",
        glow: "var(--shadow-glow)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        luxury: "var(--ease-luxury)",
        expo: "var(--ease-out-expo)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
