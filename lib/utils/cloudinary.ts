interface CloudinaryOptions {
  width?: number;
  height?: number;
  /**
   * q_auto:best  → ~90 quality — hero images, covers
   * q_auto:good  → ~75 quality — recommended for most images  (DEFAULT)
   * q_auto:eco   → ~65 quality — thumbnails, admin previews
   * q_auto       → Cloudinary chooses per image content
   */
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco";
  /** f_auto lets Cloudinary serve WebP/AVIF based on the browser */
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  /**
   * fill  → crop to exactly w×h (most common for cards)
   * scale → resize, no crop
   * fit   → fit within w×h, no crop (full image visible)
   * thumb → smart crop using face/subject detection
   */
  crop?: "fill" | "scale" | "fit" | "thumb";
  /** Only relevant when crop is "fill" or "thumb" */
  gravity?: "auto" | "face" | "faces" | "center" | "north" | "south";
}

export function getCloudinaryUrl(
  src: string,
  options: CloudinaryOptions = {}
): string {
  if (!src || !src.includes("res.cloudinary.com")) return src;

  const {
    width,
    height,
    quality = "auto:good",
    format = "auto",
    crop = "fill",
    gravity = "auto",
  } = options;

  const transforms: string[] = [
    `f_${format}`,
    `q_${quality}`,
    "dpr_auto", // serves 2× on retina, 1× on standard — free performance boost
  ];

  if (width)  transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width && height) {
    transforms.push(`c_${crop}`);
    transforms.push(`g_${gravity}`);
  }

  const t = transforms.join(",");

  if (src.includes("/image/upload/")) {
    return src.replace("/image/upload/", `/image/upload/${t}/`);
  }

  return src;
}

// ── Blur placeholder ──────────────────────────────────────────────────────────

/**
 * Returns a tiny (20px wide) blurred Cloudinary URL.
 * Pass to <Image placeholder="blur" blurDataURL={getCloudinaryBlurUrl(url)}>.
 *
 * This replaces the jarring white flash with a smooth colour-matched fade-in.
 * Cloudinary caches the tiny variant after the first request so subsequent
 * loads of the placeholder are near-instant.
 *
 * Usage:
 *   <Image
 *     src={CloudinaryPresets.card(url)}
 *     placeholder="blur"
 *     blurDataURL={getCloudinaryBlurUrl(url)}
 *     fill
 *     sizes="..."
 *   />
 */
export function getCloudinaryBlurUrl(src: string): string {
  if (!src || !src.includes("res.cloudinary.com")) {
    // Neutral 1×1 grey — placeholder="blur" requires blurDataURL to be defined
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+9ePQAI6ANyOYVm4QAAAABJRU5ErkJggg==";
  }
  return src.replace(
    "/image/upload/",
    "/image/upload/w_20,h_20,q_1,f_jpg,e_blur:800/"
  );
}

// ── Named presets ─────────────────────────────────────────────────────────────
//
// Pick the preset that matches the display context.
// Always pair with the matching `sizes` prop on <Image>.

export const CloudinaryPresets = {
  /**
   * Hero / full-width banners.
   * sizes="100vw"
   */
  hero: (src: string) =>
    getCloudinaryUrl(src, { width: 1400, quality: "auto:best", crop: "fill", gravity: "auto" }),

  /**
   * Portfolio / blog grid cards (3-col desktop, 2-col tablet, full mobile).
   * sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
   */
  card: (src: string) =>
    getCloudinaryUrl(src, { width: 800, quality: "auto:good", crop: "fill", gravity: "auto" }),

  /**
   * Portfolio item detail — large cover image (2/3 column on desktop).
   * sizes="(min-width: 1024px) 700px, 100vw"
   */
  detail: (src: string) =>
    getCloudinaryUrl(src, { width: 1200, quality: "auto:best", crop: "scale" }),

  /**
   * Blog post cover (centred, max ~700px wide).
   * sizes="(min-width: 768px) 700px, 100vw"
   */
  blog: (src: string) =>
    getCloudinaryUrl(src, { width: 1200, quality: "auto:good", crop: "fill", gravity: "auto" }),

  /**
   * Blog listing card thumbnails.
   * sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
   */
  blogCard: (src: string) =>
    getCloudinaryUrl(src, { width: 720, quality: "auto:good", crop: "fill", gravity: "auto" }),

  /**
   * Story / About page section images.
   * sizes="(min-width: 1024px) 480px, 100vw"
   */
  story: (src: string) =>
    getCloudinaryUrl(src, { width: 960, quality: "auto:good", crop: "fill", gravity: "auto" }),

  /**
   * Admin table row thumbnails — very small.
   * sizes="64px"
   */
  admin: (src: string) =>
    getCloudinaryUrl(src, { width: 200, quality: "auto:eco", crop: "fill", gravity: "auto" }),

  /**
   * Review author photos (small circular avatars).
   * sizes="40px"
   */
  avatar: (src: string) =>
    getCloudinaryUrl(src, { width: 80, height: 80, quality: "auto:eco", crop: "thumb", gravity: "face" }),
};