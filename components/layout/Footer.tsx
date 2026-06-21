import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";
import { categories } from "@/lib/data/categories";
import { siteConfig } from "@/lib/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-brand-paper">
      <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-extrabold">SCRIBES</span>
            <p className="mt-3 font-body text-sm text-brand-paper/70">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex gap-3">
              {siteConfig.facebookUrl && (
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-paper/10 transition-colors hover:bg-brand-amber hover:text-brand-navy"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
              )}
              {siteConfig.instagramUrl && (
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-paper/10 transition-colors hover:bg-brand-amber hover:text-brand-navy"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              )}
              {siteConfig.tiktokUrl && (
                <a
                  href={siteConfig.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-paper/10 transition-colors hover:bg-brand-amber hover:text-brand-navy"
                >
                  <FaTiktok className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-amber">
              Quick Links
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link
                  href="/about"
                  className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-amber">
              Services
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-amber">
              Get In Touch
            </span>
            <ul className="mt-3 flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-body text-sm text-brand-paper/80 hover:text-brand-paper"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
                <span className="font-body text-sm text-brand-paper/80">
                  {siteConfig.address}
                </span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-red/90"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-paper/10 pt-6">
          <p className="font-body text-xs text-brand-paper/60">
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}