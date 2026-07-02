import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/icon.png"; // TODO: update to /logo.png if using a raster file

interface LogoProps {
  /** "dark-bg" → logo on nav/footer dark surfaces. "light-bg" → logo on white/paper. */
  variant?: "dark-bg" | "light-bg";
  /** Rendered height in px. Width is always auto (preserves aspect ratio). */
  height?: number;
  /**
   * Show the business name to the right of the logo image.
   * Renders "SCRIBES" in the display font with "Creative Solutions" in
   * the mono font below — colours adapt to the variant automatically.
   */
  showName?: boolean;
  /** Wrap the whole thing in a <Link href="/">. Set false for non-navigable contexts. */
  asLink?: boolean;
  className?: string;
}

export function Logo({
  variant = "dark-bg",
  height = 38,
  showName = false,
  asLink = true,
  className,
}: LogoProps) {
  const isDark = variant === "dark-bg";

  const imgEl = (
    <Image
      src={LOGO_SRC}
      alt="Scribes Creative Solutions"
      // next/image needs explicit dimensions for layout calculation.
      // For SVGs the pixel values only define the intrinsic aspect ratio;
      // the `h-auto w-auto` CSS + inline style control the real rendered size.
      // Adjust the multiplier (3.5) if your logo is wider or narrower.
      width={Math.round(height * 3.5)}
      height={height}
      className={cn(
        "shrink-0 object-contain w-auto",
        isDark &&
          "[filter:drop-shadow(0_0_6px_rgba(255,255,255,0.12))_drop-shadow(0_1px_2px_rgba(0,0,0,0.4))]",
        !isDark && "[filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.08))]",
      )}
      style={{ height: `${height}px` }}
      priority
    />
  );

  // Vertical divider between logo image and wordmark text
  const divider = (
    <span
      className={cn(
        "mx-2.5 block w-px self-stretch",
        isDark ? "bg-brand-paper/20" : "bg-brand-navy/15",
      )}
      aria-hidden="true"
    />
  );

  const nameEl = (
    <span className="flex flex-col justify-center leading-none">
      <span
        className={cn(
          "font-display font-extrabold tracking-tight",
          isDark ? "text-brand-paper" : "text-brand-navy",
        )}
        style={{ fontSize: Math.round(height * 0.52) }}
      >
        SCRIBES
      </span>
      <span
        className={cn(
          "mt-0.5 font-mono uppercase tracking-[0.15em]",
          isDark ? "text-brand-paper/50" : "text-brand-slate",
        )}
        style={{ fontSize: Math.round(height * 0.24) }}
      >
        Creative Solutions
      </span>
    </span>
  );

  const content = showName ? (
    <span className={cn("flex items-center", className)}>
      {imgEl}
      {divider}
      {nameEl}
    </span>
  ) : (
    <span className={cn("inline-flex", className)}>{imgEl}</span>
  );

  if (!asLink) return content;
  return (
    <Link href="/" aria-label="Scribes Creative Solutions — Home">
      {content}
    </Link>
  );
}