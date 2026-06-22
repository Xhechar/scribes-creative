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
          navy: "#030028", // primary — headings, nav/footer, primary text - 000259 -other -> 030028
          amber: "#E63946", // secondary accent — highlights, hover states - FF9D00 -other -> E63946
          red: "#FFAE00", // tertiary accent — primary CTAs, registration-mark motif
          paper: "#F7F4EE", // background
          slate: "#5B5F73", // muted/secondary text
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

