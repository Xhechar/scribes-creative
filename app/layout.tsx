import type { Metadata } from "next";
import { displayFont, bodyFont, monoFont } from "@/lib/fonts";
import { siteConfig } from "@/lib/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scribescreative.co.ke"),
  title: {
    default: `${siteConfig.businessName} | Branding, Print & Web Design in Nairobi`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Scribes Creative Solutions designs, prints, and builds the brand identity that makes Nairobi businesses look the part — branding, large format printing, photography, web development, and more.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: siteConfig.businessName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
