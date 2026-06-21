export interface PortfolioItemSeed {
  id: string;
  title: string;
  slug: string;
  description: string;
  clientName?: string;
  categorySlug: string;
  isFeatured: boolean;
  displayOrder: number;
  coverImageSeed: string; // seed string for the picsum.photos placeholder
}

// TODO: replace every entry with a real completed project once photography exists.
export const portfolioItems: PortfolioItemSeed[] = [
  {
    id: "amara-foods-rebrand",
    title: "Amara Foods Rebrand",
    slug: "amara-foods-rebrand",
    description:
      "A full identity refresh for a Nairobi food startup — logo, packaging, and labels.",
    clientName: "Amara Foods",
    categorySlug: "branding-design",
    isFeatured: true,
    displayOrder: 1,
    coverImageSeed: "scribes-portfolio-branding",
  },
  {
    id: "konza-construction-signage",
    title: "Konza Construction Signage",
    slug: "konza-construction-signage",
    description:
      "Shopfront fascia and vehicle branding for a growing construction supplier.",
    clientName: "Konza Construction",
    categorySlug: "print-signage",
    isFeatured: true,
    displayOrder: 2,
    coverImageSeed: "scribes-portfolio-signage",
  },
  {
    id: "riverside-wedding-suite",
    title: "Riverside Wedding Suite",
    slug: "riverside-wedding-suite",
    description:
      "Invitations, programs, and a backdrop wall designed as one cohesive set.",
    categorySlug: "events-occasions",
    isFeatured: true,
    displayOrder: 3,
    coverImageSeed: "scribes-portfolio-wedding",
  },
  {
    id: "pamoja-cafe-uniforms",
    title: "Pamoja Café Uniforms",
    slug: "pamoja-cafe-uniforms",
    description:
      "Branded aprons and caps rolled out across a growing café chain.",
    clientName: "Pamoja Café",
    categorySlug: "branded-merchandise",
    isFeatured: true,
    displayOrder: 4,
    coverImageSeed: "scribes-portfolio-merch",
  },
  {
    id: "nairobi-tech-summit-coverage",
    title: "Nairobi Tech Summit Coverage",
    slug: "nairobi-tech-summit-coverage",
    description:
      "Full-day event photography for a 500-attendee tech conference.",
    categorySlug: "photography",
    isFeatured: true,
    displayOrder: 5,
    coverImageSeed: "scribes-portfolio-photography",
  },
  {
    id: "daystar-logistics-website",
    title: "Daystar Logistics Website",
    slug: "daystar-logistics-website",
    description:
      "A fast, SEO-ready site built to match a freshly designed brand identity.",
    clientName: "Daystar Logistics",
    categorySlug: "web-development",
    isFeatured: true,
    displayOrder: 6,
    coverImageSeed: "scribes-portfolio-webdev",
  },
];
