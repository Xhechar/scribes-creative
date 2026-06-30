import Link from "next/link";
import { Plus, Pencil, Briefcase } from "lucide-react";
import { getAllServicesAdmin } from "@/lib/services/admin.service";
import { DeleteServiceButton } from "@/components/admin/DeleteServiceButton";

interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  priceFrom: number | null;
  priceUnit: string | null;
  displayOrder: number;
  isFeatured: boolean;
  category: { name: string } | null;
}

export default async function AdminServicesPage() {
  const rawServices = await getAllServicesAdmin();
  const services = rawServices as unknown as ServiceRow[];

  const grouped = services.reduce<
    Record<string, { name: string; items: ServiceRow[] }>
  >((acc, s) => {
    const key = s.category?.name ?? "Uncategorised";
    if (!acc[key]) acc[key] = { name: key, items: [] };
    acc[key].items.push(s);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">
            Services
          </h1>
          <p className="mt-1 font-body text-sm text-brand-slate">
            {services.length} services across {Object.keys(grouped).length}{" "}
            categories
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
        >
          <Plus className="h-4 w-4" /> New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-brand-navy/20 bg-white py-16 text-center">
          <Briefcase className="h-10 w-10 text-brand-navy/20" />
          <p className="font-body text-sm text-brand-slate">No services yet.</p>
          <Link
            href="/admin/services/new"
            className="font-body text-sm font-semibold text-brand-red hover:underline"
          >
            Add the first one →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.values(grouped).map(({ name: catName, items }) => (
            <div
              key={catName}
              className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm"
            >
              <div className="border-b border-brand-navy/10 bg-brand-paper/50 px-4 py-2.5 flex items-center justify-between">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-navy">
                  {catName}
                </h2>
                <span className="font-mono text-[10px] text-brand-slate">
                  {items.length} services
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left">
                  <tbody className="divide-y divide-brand-navy/5">
                    {items.map((s: ServiceRow) => (
                      <tr key={s.id} className="group hover:bg-brand-paper/20">
                        <td className="px-4 py-3">
                          <p className="font-body text-sm font-semibold text-brand-navy">
                            {s.name}
                          </p>
                          <p className="font-mono text-[10px] text-brand-slate">
                            /services/…/{s.slug}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          {s.priceFrom ? (
                            <span className="font-mono text-[10px] text-brand-red">
                              Ksh {s.priceFrom.toLocaleString()} {s.priceUnit}
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] text-brand-slate">
                              Quote only
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-[10px] text-brand-slate">
                          # {s.displayOrder}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100">
                            <Link
                              href={`/admin/services/${s.id}`}
                              className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-brand-navy/10 hover:text-brand-navy"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Link>
                            <DeleteServiceButton id={s.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
