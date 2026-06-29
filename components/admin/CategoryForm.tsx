"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader } from "lucide-react";

interface CategoryFormProps {
  categoryId?: string;
  initialData?: {
    name: string;
    slug: string;
    description: string;
    icon: string;
    type: string;
    displayOrder: number;
  };
}

const ICON_OPTIONS = [
  "Palette",
  "Printer",
  "Heart",
  "Shirt",
  "Camera",
  "Code2",
  "Megaphone",
  "Landmark",
  "BookOpen",
  "Globe",
  "Star",
  "Shield",
  "Truck",
  "Store",
  "Music",
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function CategoryForm({ categoryId, initialData }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(categoryId);

  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    icon: initialData?.icon ?? "Palette",
    type: initialData?.type ?? "CREATIVE",
    displayOrder: initialData?.displayOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "name" && !isEditing) next.slug = slugify(value);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEditing
      ? `/api/admin/categories/${categoryId}`
      : "/api/admin/categories";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          displayOrder: Number(form.displayOrder),
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to save");
      }
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-navy">
        {isEditing ? "Edit Category" : "New Category"}
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Name *
            </label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Slug *
            </label>
            <input
              name="slug"
              required
              value={form.slug}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-mono text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
            Description
          </label>
          <textarea
            name="description"
            rows={2}
            value={form.description}
            onChange={handleChange}
            className="resize-none rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Icon (Lucide)
            </label>
            <select
              name="icon"
              value={form.icon}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            >
              {ICON_OPTIONS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            >
              <option value="CREATIVE">Creative (portfolio-driven)</option>
              <option value="UTILITY">Utility (walk-in / document)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Display Order
            </label>
            <input
              name="displayOrder"
              type="number"
              value={form.displayOrder}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-navy/10 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="rounded-md border border-brand-navy/20 px-4 py-2 font-body text-sm text-brand-navy hover:bg-brand-navy/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-md bg-brand-red px-5 py-2 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90 disabled:opacity-60"
          >
            {saving ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}