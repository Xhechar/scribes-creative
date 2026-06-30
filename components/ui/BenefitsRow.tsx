import { Tag, Zap, ShieldCheck, Layers, type LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  label: string;
}

const defaultBenefits: Benefit[] = [
  { icon: Tag, label: "Free Quotes" },
  { icon: Zap, label: "Fast Turnaround" },
  { icon: ShieldCheck, label: "Quality Materials" },
  { icon: Layers, label: "One Studio, Full Identity" },
];

export function BenefitsRow({
  benefits = defaultBenefits,
  className = "",
}: {
  benefits?: Benefit[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      {benefits.map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-2.5 rounded-lg border border-brand-navy/10 bg-white px-3.5 py-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-amber/15">
            <b.icon className="h-4 w-4 text-brand-navy" />
          </span>
          <span className="font-body text-xs font-medium leading-tight text-brand-navy">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}