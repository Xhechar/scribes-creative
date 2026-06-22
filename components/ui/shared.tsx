import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Section wrapper ───────────────────────────────────────────────────────
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────
interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-slate hover:text-brand-navy"
          >
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-brand-navy/30" />
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-slate hover:text-brand-navy"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-navy">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
