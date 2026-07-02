/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#5241c5", // logo primary blue/purple — used for accents, headings, interactive
          amber: "#e68e66", // logo orange — secondary accent, hover states
          red: "#cf564d", // logo red — primary CTAs, registration-mark motif

          dark: "#160f3a", // very dark purple — ONLY for nav/footer/admin sidebar backgrounds
          // keeps the multicolour logo always readable
          paper: "#F7F4EE", // off-white background
          slate: "#5B5F73", // muted body/secondary text
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};

