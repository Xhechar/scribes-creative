import {
  IBM_Plex_Sans,
  JetBrains_Mono,
  Big_Shoulders,
  Raleway,
  Inter,
  Playball,
} from "next/font/google";

export const displayFont = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const monoFont = Playball({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});
