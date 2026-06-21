export type CategoryType = "CREATIVE" | "UTILITY";

export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // lucide-react icon name, resolved via the icon map in Header
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
  address: string;
  latitude: number;
  longitude: number;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}