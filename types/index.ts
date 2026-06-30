export type CategoryType = "CREATIVE" | "UTILITY";

export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null; // lucide-react icon name, resolved via the icon map in Header
  type: CategoryType;
  displayOrder: number;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // international format, no symbols, for wa.me links
  email: string;
  hours: { days: string, time: string }[];
  address: string;
  latitude: number;
  longitude: number;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

// ─── Service catalog ──────────────────────────────────────────────────────
export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  requirements: string[];
  processSteps: string[];
  priceFrom: number | null;
  priceUnit: string | null;
  displayOrder: number;
  image: string | null;
  isFeatured: boolean;
  categoryId: string;
  category?: NavCategory | null;
}

// ─── Portfolio ────────────────────────────────────────────────────────────
export interface PortfolioImage {
  id: string;
  url: string;
  caption: string | null;
  order: number;
  portfolioItemId: string;
}

export interface PortfolioItemSummary {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  clientName: string | null;
  isFeatured: boolean;
  displayOrder: number;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
  images: Pick<PortfolioImage, "url" | "caption">[];
}

export interface PortfolioItemFull extends PortfolioItemSummary {
  images: PortfolioImage[];
}

// ─── Reviews ──────────────────────────────────────────────────────────────
export type ReviewSource = "GOOGLE" | "SITE";

export interface ReviewItem {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  comment: string;
  source: ReviewSource;
  isApproved: boolean;
  publishedAt: Date;
  categoryId: string | null;
  serviceId: string | null;
}

// ─── Blog ─────────────────────────────────────────────────────────────────
export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
  publishedAt: Date | null;
  category: { name: string; slug: string } | null;
}

export interface PostFull extends PostSummary {
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: Date;
  category: { id: string; name: string; slug: string } | null;
}

// ─── Leads ────────────────────────────────────────────────────────────────
export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: LeadStatus;
  createdAt: Date;
  categoryId: string | null;
  serviceId: string | null;
}