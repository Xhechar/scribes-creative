import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustStripProps {
  averageRating: number;
  reviewCount: number;
  label?: string; // e.g. "in Branding & Identity" — omit for site-wide
  variant?: "light" | "dark";
  className?: string;
}

export function TrustStrip({
  averageRating,
  reviewCount,
  label,
  variant = "light",
  className,
}: TrustStripProps) {
  if (reviewCount === 0) return null;

  const isDark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.round(averageRating)
                ? "fill-brand-amber text-brand-amber"
                : isDark
                  ? "fill-brand-paper/15 text-brand-paper/15"
                  : "fill-brand-navy/10 text-brand-navy/10",
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          "font-body text-sm font-semibold",
          isDark ? "text-brand-paper" : "text-brand-navy",
        )}
      >
        {averageRating.toFixed(1)}
      </span>
      <span
        className={cn(
          "font-body text-sm",
          isDark ? "text-brand-paper/60" : "text-brand-slate",
        )}
      >
        ({reviewCount} review{reviewCount === 1 ? "" : "s"}
        {label ? ` ${label}` : ""})
      </span>
    </div>
  );
}