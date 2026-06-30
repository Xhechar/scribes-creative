import Link from "next/link";
import { Plus, Pencil, Layers } from "lucide-react";
import { getAllCategoriesAdmin } from "@/lib/services/admin.service";
import { DeleteCategoryButton } from "@/components/admin/DeleteCategoryButton";

interface CatRow {
  id: string;
  name: string;
  slug: string;
  type: string;
  displayOrder: number;
  icon: string | null;
  _count: { services: number };
}

export default async function AdminCategoriesPage() {
  const rawCats = await getAllCategoriesAdmin();
  const cats = rawCats as unknown as CatRow[];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">
            Categories
          </h1>
          <p className="mt-1 font-body text-sm text-brand-slate">
            {cats.length} categories
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
        >
          <Plus className="h-4 w-4" /> New Category
        </Link>
      </div>

      {cats.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-brand-navy/20 bg-white py-16 text-center">
          <Layers className="h-10 w-10 text-brand-navy/20" />
          <p className="font-body text-sm text-brand-slate">
            No categories yet.
          </p>
          <Link
            href="/admin/categories/new"
            className="font-body text-sm font-semibold text-brand-red hover:underline"
          >
            Create one →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead className="border-b border-brand-navy/10 bg-brand-paper/50">
                <tr>
                  {["Category", "Type", "Services", "Order", ""].map((h) => (
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
                {cats.map((cat: CatRow) => (
                  <tr key={cat.id} className="group hover:bg-brand-paper/30">
                    <td className="px-4 py-3">
                      <p className="font-body text-sm font-semibold text-brand-navy">
                        {cat.name}
                      </p>
                      <p className="font-mono text-[10px] text-brand-slate">
                        /services/{cat.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wide ${
                          cat.type === "CREATIVE"
                            ? "bg-brand-navy/10 text-brand-navy"
                            : "bg-brand-amber/15 text-brand-navy"
                        }`}
                      >
                        {cat.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-brand-slate">
                      {cat._count.services}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-brand-slate">
                      {cat.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100">
                        <Link
                          href={`/admin/categories/${cat.id}`}
                          className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-brand-navy/10 hover:text-brand-navy"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <DeleteCategoryButton
                          id={cat.id}
                          serviceCount={cat._count.services}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}