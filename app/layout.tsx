import type { Metadata } from "next";
import { displayFont, bodyFont, monoFont } from "@/lib/fonts";
import { siteConfig } from "@/lib/data/site-config";
import { getAllCategories } from "@/lib/services/category.service";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scribescreative.co.ke"), // TODO: confirm final domain
  title: {
    default: `${siteConfig.businessName} | Branding, Print & Web Design in Eldoret, Kenya`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Scribes Creative Solutions designs, prints, and builds the brand identity that makes businesses look the part — branding, large format printing, photography, web development, and more.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: siteConfig.businessName,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();
  const headerCategories = categories.map((category) => ({
    ...category,
    icon: category.icon ?? "",
  }));

  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Header categories={headerCategories} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
