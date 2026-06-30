import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getAllPortfolioAdmin } from "@/lib/services/admin.service";
import { DeletePortfolioButton } from "@/components/admin/DeletePortfolioButton";

export default async function AdminPortfolioPage() {
  const items = await getAllPortfolioAdmin();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">
            Portfolio
          </h1>
          <p className="mt-1 font-body text-sm text-brand-slate">
            {items.length} projects
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
        >
          <Plus className="h-4 w-4" /> Add Project
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead className="border-b border-brand-navy/10 bg-brand-paper/50">
              <tr>
                {["Project", "Category", "Featured", "Order", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-navy/5">
              {items.map(
                (item: {
                  id: string;
                  title: string;
                  clientName?: string | null;
                  isFeatured?: boolean;
                  displayOrder?: number;
                  category?: { name: string } | null;
                  images?: { url: string }[];
                }) => {
                  const cover = (
                    item as unknown as { images: { url: string }[] }
                  ).images[0]?.url;
                  return (
                    <tr key={item.id} className="group hover:bg-brand-paper/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-brand-navy/5">
                            {cover && (
                              <Image
                                src={cover}
                                alt={item.title}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-body text-sm font-semibold text-brand-navy">
                              {item.title}
                            </p>
                            {(item as unknown as { clientName: string | null })
                              .clientName && (
                              <p className="font-body text-xs text-brand-slate">
                                {
                                  (item as unknown as { clientName: string })
                                    .clientName
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-body text-xs text-brand-slate">
                        {(
                          item as unknown as {
                            category: { name: string } | null;
                          }
                        ).category?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {(item as unknown as { isFeatured: boolean })
                          .isFeatured && (
                          <Star className="h-4 w-4 fill-brand-amber text-brand-amber" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-brand-slate">
                        {
                          (item as unknown as { displayOrder: number })
                            .displayOrder
                        }
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100">
                          <Link
                            href={`/admin/portfolio/${item.id}`}
                            className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-brand-navy/10 hover:text-brand-navy"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                          <DeletePortfolioButton id={item.id} />
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <p className="px-5 py-12 text-center font-body text-sm text-brand-slate">
            No portfolio items yet.
          </p>
        )}
      </div>
    </div>
  );
}
