"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface PortfolioFormProps {
  itemId?: string;
  categories: Category[];
  initialData?: {
    title: string;
    slug: string;
    description: string;
    clientName: string;
    categoryId: string;
    isFeatured: boolean;
    displayOrder: number;
    imageUrls: string[];
  };
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function PortfolioForm({
  itemId,
  categories,
  initialData,
}: PortfolioFormProps) {
  const router = useRouter();
  const isEditing = Boolean(itemId);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    clientName: initialData?.clientName ?? "",
    categoryId: initialData?.categoryId ?? "",
    isFeatured: initialData?.isFeatured ?? false,
    displayOrder: initialData?.displayOrder ?? 0,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.imageUrls?.length ? initialData.imageUrls : [""],
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => {
      const next = {
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      if (name === "title" && !isEditing) next.slug = slugify(value);
      return next;
    });
  }

  function updateImageUrl(idx: number, val: string) {
    setImageUrls((prev) => prev.map((u, i) => (i === idx ? val : u)));
  }

  function addImageUrl() {
    setImageUrls((prev) => [...prev, ""]);
  }

  function removeImageUrl(idx: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEditing
      ? `/api/admin/portfolio/${itemId}`
      : "/api/admin/portfolio";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrls: imageUrls.filter(Boolean) }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save.");
      }

      router.push("/admin/portfolio");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          {isEditing ? "Edit Portfolio Item" : "Add Portfolio Item"}
        </h1>
      </div>

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
              Title *
            </label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              URL Slug *
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
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="resize-none rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Client Name
            </label>
            <input
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Category
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            >
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          <div className="flex items-center gap-3 pt-5">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              checked={form.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-brand-navy/30 accent-brand-red"
            />
            <label
              htmlFor="isFeatured"
              className="font-body text-sm text-brand-navy"
            >
              Feature on homepage
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
            Image URLs (first is cover)
          </label>
          {imageUrls.map((url, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                value={url}
                onChange={(e) => updateImageUrl(idx, e.target.value)}
                placeholder={`https://res.cloudinary.com/... (image ${idx + 1})`}
                className="flex-1 rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageUrl(idx)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-navy/10 text-brand-slate hover:bg-red-50 hover:text-brand-red"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageUrl}
            className="flex items-center gap-1.5 self-start font-body text-sm font-medium text-brand-navy hover:text-brand-red"
          >
            <Plus className="h-4 w-4" /> Add another image
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-navy/10 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/portfolio")}
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
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}