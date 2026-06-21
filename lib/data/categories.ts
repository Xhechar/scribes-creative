import { NavCategory } from "@/types";

export const categories: NavCategory[] = [
  {
    id: "branding-design",
    name: "Branding & Identity",
    slug: "branding-design",
    description:
      "Logos, business cards, letterheads, and the full identity kit.",
    icon: "Palette",
    type: "CREATIVE",
    displayOrder: 1,
  },
  {
    id: "print-signage",
    name: "Print & Signage",
    slug: "print-signage",
    description:
      "Flyers, banners, brochures, large format printing, and shop signage.",
    icon: "Printer",
    type: "CREATIVE",
    displayOrder: 2,
  },
  {
    id: "events-occasions",
    name: "Events, Weddings & Memorials",
    slug: "events-occasions",
    description:
      "Invitations, programs, backdrops, and keepsakes for life's milestones.",
    icon: "Heart",
    type: "CREATIVE",
    displayOrder: 3,
  },
  {
    id: "branded-merchandise",
    name: "Branded Merchandise",
    slug: "branded-merchandise",
    description:
      "T-shirts, caps, bags, diaries, and jerseys carrying your brand.",
    icon: "Shirt",
    type: "CREATIVE",
    displayOrder: 4,
  },
  {
    id: "photography",
    name: "Photography",
    slug: "photography",
    description:
      "Event coverage, portrait sessions, product shoots, and passport photos.",
    icon: "Camera",
    type: "CREATIVE",
    displayOrder: 5,
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "Websites that bring your new brand identity online.",
    icon: "Code2",
    type: "CREATIVE",
    displayOrder: 6,
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing & Social Media",
    slug: "digital-marketing",
    description:
      "Getting your brand in front of the customers actively looking for it.",
    icon: "Megaphone",
    type: "CREATIVE",
    displayOrder: 7,
  },
  {
    id: "government-cyber",
    name: "Government & Cyber Services",
    slug: "government-cyber",
    description:
      "KRA, NTSA, business registration, and education portal services.",
    icon: "Landmark",
    type: "UTILITY",
    displayOrder: 8,
  },
];

export const creativeCategories = categories.filter(
  (c) => c.type === "CREATIVE",
);
export const utilityCategories = categories.filter(
  (c) => c.type === "UTILITY",
);