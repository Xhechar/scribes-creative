export interface FaqSeed {
  id: string;
  question: string;
  answer: string;
  categorySlug?: string; // undefined = site-wide
  displayOrder: number;
}

export const faqs: FaqSeed[] = [
  // General — site-wide
  {
    id: "faq-where-are-you",
    question: "Where are you located?",
    answer:
      "We are based in Nairobi, Kenya. Walk-in customers are welcome — contact us for exact directions or to confirm opening hours before visiting.",
    displayOrder: 1,
  },
  {
    id: "faq-how-long",
    question: "How long does a typical order take?",
    answer:
      "Timelines depend on the job — business cards can be ready in 24–48 hours, while a full brand identity project typically takes 5–10 working days. We'll always confirm a turnaround when you place your order.",
    displayOrder: 2,
  },
  {
    id: "faq-rush-orders",
    question: "Do you handle rush or same-day orders?",
    answer:
      "Yes, for most print jobs. WhatsApp or call us with your deadline and we'll tell you honestly whether it's achievable and what it will cost.",
    displayOrder: 3,
  },
  {
    id: "faq-payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, bank transfer, and cash. A deposit is required before work begins on design projects; print orders are typically paid in full upfront.",
    displayOrder: 4,
  },
  {
    id: "faq-revisions",
    question: "How many design revisions do I get?",
    answer:
      "All design projects include two rounds of revisions at no extra charge. Additional rounds are billed separately — we'll let you know the rate upfront.",
    displayOrder: 5,
  },
  {
    id: "faq-file-formats",
    question: "What file format should I send my design in?",
    answer:
      "We prefer print-ready PDF, AI, or PSD files. If you only have a JPG or PNG, let us know — we can assess whether it's usable or advise on a redesign.",
    displayOrder: 6,
  },
  {
    id: "faq-delivery",
    question: "Do you offer delivery?",
    answer:
      "Yes, we can arrange delivery within Nairobi for larger or bulk orders. Delivery fees apply and are confirmed at the time of order.",
    displayOrder: 7,
  },
  {
    id: "faq-no-design",
    question: "What if I don't have a design ready?",
    answer:
      "No problem — our in-house design team can create one for you. Just share your business details, preferred look, and any references you like, and we'll take it from there.",
    displayOrder: 8,
  },

  // Branding & Identity
  {
    id: "faq-brand-what-included",
    question: "What's included in a full brand identity package?",
    answer:
      "A full package typically includes a logo (with variants), brand colors, typography choices, and a one-page brand guide. Business cards, letterheads, and other print assets are added as separate items.",
    categorySlug: "branding-design",
    displayOrder: 1,
  },
  {
    id: "faq-brand-own-files",
    question: "Will I own the final design files?",
    answer:
      "Yes. Once the project is paid in full you receive the original editable files (AI/PSD) along with all export formats needed for print and digital use.",
    categorySlug: "branding-design",
    displayOrder: 2,
  },

  // Photography
  {
    id: "faq-photo-booking",
    question: "How do I book a photography session?",
    answer:
      "WhatsApp or call us with your preferred date, type of session, and location. We'll confirm availability and send a booking summary with what to expect on the day.",
    categorySlug: "photography",
    displayOrder: 1,
  },
  {
    id: "faq-photo-delivery",
    question: "How long until I receive my edited photos?",
    answer:
      "Edited images are delivered within 3–5 working days for most sessions. Event photography may take up to 7 days depending on the volume of footage.",
    categorySlug: "photography",
    displayOrder: 2,
  },
];
