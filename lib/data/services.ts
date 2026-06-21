export interface ServiceSeed {
  id: string;
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  requirements: string[];
  priceFrom?: number;
  priceUnit?: string;
  displayOrder: number;
}

// TODO: confirm real pricing with the owner — most printing varies too much
// for a fixed "from" price, so priceFrom is left out where that's the case.
export const services: ServiceSeed[] = [
  // Branding & Identity
  {
    id: "logo-design",
    categorySlug: "branding-design",
    name: "Logo Design",
    slug: "logo-design",
    description:
      "A distinct mark built around what makes your business different.",
    requirements: [
      "Business name",
      "Target customers or industry",
      "Colors or styles you like (optional)",
    ],
    displayOrder: 1,
  },
  {
    id: "business-cards",
    categorySlug: "branding-design",
    name: "Business Cards",
    slug: "business-cards",
    description: "Premium printed cards that make a strong first impression.",
    requirements: [
      "Existing logo (if any)",
      "Contact details to include",
      "Quantity needed",
    ],
    priceFrom: 1500,
    priceUnit: "per 100 pieces",
    displayOrder: 2,
  },
  {
    id: "letterheads",
    categorySlug: "branding-design",
    name: "Letterheads",
    slug: "letterheads",
    description: "Branded letterheads for official business correspondence.",
    requirements: [
      "Existing logo",
      "Business registration details",
      "Quantity needed",
    ],
    displayOrder: 3,
  },
  {
    id: "compliment-slips",
    categorySlug: "branding-design",
    name: "Compliment Slips",
    slug: "compliment-slips",
    description:
      "Small branded notes for packages, deliveries, and thank-yous.",
    requirements: ["Existing logo", "Quantity needed"],
    displayOrder: 4,
  },
  {
    id: "company-profiles",
    categorySlug: "branding-design",
    name: "Company Profiles & Booklets",
    slug: "company-profiles",
    description:
      "A polished booklet that presents your business to clients and investors.",
    requirements: [
      "Business overview/content",
      "Photos or visuals to include",
      "Approx. number of pages",
    ],
    displayOrder: 5,
  },

  // Print & Signage
  {
    id: "flyers-posters",
    categorySlug: "print-signage",
    name: "Flyers & Posters",
    slug: "flyers-posters",
    description: "Eye-catching print for promotions, sales, and announcements.",
    requirements: ["Design content or file", "Size and quantity needed"],
    displayOrder: 1,
  },
  {
    id: "banners",
    categorySlug: "print-signage",
    name: "Banners & Pull-up Banners",
    slug: "banners",
    description: "Durable banners for storefronts, events, and exhibitions.",
    requirements: [
      "Design content/visuals",
      "Size needed",
      "Indoor or outdoor use",
    ],
    displayOrder: 2,
  },
  {
    id: "brochures-catalogs",
    categorySlug: "print-signage",
    name: "Brochures & Catalogs",
    slug: "brochures-catalogs",
    description:
      "Multi-page print pieces showcasing your products or services.",
    requirements: [
      "Content and product details",
      "Number of pages",
      "Quantity needed",
    ],
    displayOrder: 3,
  },
  {
    id: "shop-signage",
    categorySlug: "print-signage",
    name: "Shop Signage & Fascia Boards",
    slug: "shop-signage",
    description:
      "Storefront signs that get your business noticed from the street.",
    requirements: [
      "Shop dimensions or a photo of the frontage",
      "Existing logo/branding",
    ],
    displayOrder: 4,
  },
  {
    id: "vehicle-branding",
    categorySlug: "print-signage",
    name: "Vehicle Branding",
    slug: "vehicle-branding",
    description:
      "Full or partial vehicle wraps for matatus, vans, and company cars.",
    requirements: [
      "Vehicle make/model",
      "Existing logo/branding",
      "Full wrap or partial coverage",
    ],
    displayOrder: 5,
  },
  {
    id: "large-format-printing",
    categorySlug: "print-signage",
    name: "Large Format Printing",
    slug: "large-format-printing",
    description:
      "High-resolution prints at virtually any size, indoor or outdoor.",
    requirements: [
      "File or design content",
      "Size needed",
      "Material preference (if known)",
    ],
    displayOrder: 6,
  },

  // Events, Weddings & Memorials
  {
    id: "invitation-cards",
    categorySlug: "events-occasions",
    name: "Invitation Cards",
    slug: "invitation-cards",
    description:
      "Printed invitations for weddings, parties, and corporate events.",
    requirements: [
      "Event details (date, venue, etc.)",
      "Design style preference",
      "Quantity needed",
    ],
    displayOrder: 1,
  },
  {
    id: "event-programs",
    categorySlug: "events-occasions",
    name: "Event Programs & Booklets",
    slug: "event-programs",
    description: "Printed programs that guide guests through your event.",
    requirements: ["Event schedule/content", "Quantity needed"],
    displayOrder: 2,
  },
  {
    id: "wedding-suites",
    categorySlug: "events-occasions",
    name: "Wedding Suites",
    slug: "wedding-suites",
    description:
      "A matching set — invitations, programs, menus, and thank-you cards.",
    requirements: [
      "Wedding date and theme/colors",
      "Approx. guest count",
      "Items needed in the suite",
    ],
    displayOrder: 3,
  },
  {
    id: "funeral-memorial",
    categorySlug: "events-occasions",
    name: "Funeral Programs & Memorial Cards",
    slug: "funeral-memorial",
    description:
      "Respectful, same-day printing for funeral programs and memorial keepsakes.",
    requirements: [
      "Photos of the departed",
      "Service details and order of program",
      "Quantity needed",
    ],
    displayOrder: 4,
  },
  {
    id: "tickets",
    categorySlug: "events-occasions",
    name: "Tickets",
    slug: "tickets",
    description:
      "Numbered, secure tickets for concerts, church events, and fundraisers.",
    requirements: [
      "Event details",
      "Quantity needed",
      "Numbering/security features required",
    ],
    displayOrder: 5,
  },

  // Branded Merchandise
  {
    id: "t-shirt-printing",
    categorySlug: "branded-merchandise",
    name: "T-Shirt Printing",
    slug: "t-shirt-printing",
    description:
      "Custom printed or embroidered t-shirts for teams, events, and promotions.",
    requirements: [
      "Existing logo/design",
      "Sizes and quantity",
      "Shirt color preference",
    ],
    displayOrder: 1,
  },
  {
    id: "caps-bags",
    categorySlug: "branded-merchandise",
    name: "Branded Caps & Bags",
    slug: "caps-bags",
    description: "Caps, tote bags, and conference bags carrying your logo.",
    requirements: ["Existing logo", "Item type and quantity"],
    displayOrder: 2,
  },
  {
    id: "diaries-notebooks",
    categorySlug: "branded-merchandise",
    name: "Diaries & Notebooks",
    slug: "diaries-notebooks",
    description:
      "Branded diaries and notebooks for staff gifts and corporate giveaways.",
    requirements: [
      "Existing logo",
      "Quantity needed",
      "Cover style preference",
    ],
    displayOrder: 3,
  },
  {
    id: "jerseys",
    categorySlug: "branded-merchandise",
    name: "Jerseys",
    slug: "jerseys",
    description: "Custom team jerseys for sports clubs and corporate leagues.",
    requirements: [
      "Team name and colors",
      "Sizes and quantity",
      "Player names/numbers (if needed)",
    ],
    displayOrder: 4,
  },

  // Photography
  {
    id: "event-photography",
    categorySlug: "photography",
    name: "Event Photography",
    slug: "event-photography",
    description: "Full event coverage, from setup to send-off.",
    requirements: ["Event date, time, and venue", "Hours of coverage needed"],
    priceFrom: 5000,
    priceUnit: "per hour",
    displayOrder: 1,
  },
  {
    id: "portrait-photoshoot",
    categorySlug: "photography",
    name: "Portrait & Photoshoot Sessions",
    slug: "portrait-photoshoot",
    description:
      "Individual or group portrait sessions, in-studio or on location.",
    requirements: [
      "Preferred date",
      "Number of people",
      "Studio or on-location",
    ],
    displayOrder: 2,
  },
  {
    id: "product-photography",
    categorySlug: "photography",
    name: "Product Photography",
    slug: "product-photography",
    description:
      "Clean, consistent product shots for your catalog or online store.",
    requirements: ["Number of products", "Background/style preference"],
    displayOrder: 3,
  },
  {
    id: "passport-photos",
    categorySlug: "photography",
    name: "Passport Photos",
    slug: "passport-photos",
    description: "Same-day passport and ID photos to spec.",
    requirements: ["Document type (passport, ID, visa, etc.)"],
    priceFrom: 200,
    priceUnit: "per set",
    displayOrder: 4,
  },

  // Web Development
  {
    id: "website-design-development",
    categorySlug: "web-development",
    name: "Website Design & Development",
    slug: "website-design-development",
    description: "A fast, SEO-ready website built around your brand identity.",
    requirements: [
      "Pages needed",
      "Existing brand assets (logo, colors)",
      "Reference sites you like",
    ],
    displayOrder: 1,
  },
  {
    id: "website-maintenance",
    categorySlug: "web-development",
    name: "Website Maintenance & Updates",
    slug: "website-maintenance",
    description:
      "Ongoing updates, fixes, and content changes for an existing site.",
    requirements: ["Current website URL", "Access/login details"],
    displayOrder: 2,
  },
  {
    id: "hosting-domain",
    categorySlug: "web-development",
    name: "Hosting & Domain Setup",
    slug: "hosting-domain",
    description:
      "Domain registration and reliable hosting, set up and managed for you.",
    requirements: ["Preferred domain name", "Expected traffic/usage"],
    displayOrder: 3,
  },
];