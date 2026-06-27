interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Schema builders ────────────────────────────────────────────────────────

export function localBusinessSchema({
  name,
  description,
  phone,
  email,
  address,
  latitude,
  longitude,
  url,
}: {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  latitude: number;
  longitude: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
      streetAddress: address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative Services",
    },
  };
}

export function serviceSchema({
  name,
  description,
  url,
  providerName,
}: {
  name: string;
  description: string;
  url: string;
  providerName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: providerName,
    },
    areaServed: {
      "@type": "City",
      name: "Nairobi",
    },
  };
}

export function blogPostingSchema({
  title,
  excerpt,
  url,
  publishedAt,
  updatedAt,
  authorName,
  publisherName,
  imageUrl,
}: {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: Date;
  updatedAt: Date;
  authorName: string;
  publisherName: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url,
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: publisherName },
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}