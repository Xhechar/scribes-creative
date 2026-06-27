import { getAllServicesAdmin } from "@/lib/services/admin.service";

interface ServiceRow {
  id: string;
  name: string;
  description: string;
  priceFrom: number | null;
  priceUnit: string | null;
  requirements: string[];
  category: { name: string; slug: string } | null;
}

interface ServiceGroup {
  categoryName: string;
  items: ServiceRow[];
}

export default async function AdminServicesPage() {
  const rawServices = await getAllServicesAdmin();
  const services = rawServices as unknown as ServiceRow[];

  const groupMap: Record<string, ServiceGroup> = {};
  for (const s of services) {
    const key = s.category?.name ?? "Uncategorised";
    if (!groupMap[key]) groupMap[key] = { categoryName: key, items: [] };
    groupMap[key].items.push(s);
  }
  const groups = Object.values(groupMap);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          Services
        </h1>
        <p className="mt-1 font-body text-sm text-brand-slate">
          {services.length} services across {groups.length} categories. Edit via{" "}
          <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 font-mono text-xs">
            lib/data/services.ts
          </code>{" "}
          and re-seed to update.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {groups.map(({ categoryName, items }) => (
          <div
            key={categoryName}
            className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm"
          >
            <div className="border-b border-brand-navy/10 bg-brand-paper/50 px-4 py-2.5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-navy">
                {categoryName}
              </h2>
            </div>
            <table className="w-full text-left">
              <tbody className="divide-y divide-brand-navy/5">
                {items.map((s: ServiceRow) => (
                  <tr key={s.id} className="hover:bg-brand-paper/20">
                    <td className="px-4 py-3">
                      <p className="font-body text-sm font-semibold text-brand-navy">
                        {s.name}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-brand-slate">
                        {s.description}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {s.priceFrom ? (
                        <span className="font-mono text-[10px] text-brand-red">
                          From Ksh {s.priceFrom.toLocaleString()} {s.priceUnit}
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-brand-slate">
                          Quote on request
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-brand-slate">
                      {s.requirements.length} requirements
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}