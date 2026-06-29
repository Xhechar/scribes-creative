"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface Category {
  id: string;
  name: string;
}

interface ServiceFormProps {
  serviceId?: string;
  categories: Category[];
  initialData?: {
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    requirements: string[];
    processSteps: string[];
    priceFrom: string;
    priceUnit: string;
    image: string;
    isFeatured: boolean;
    displayOrder: number;
  };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function MultiInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
        {label}
      </label>
      {values.map((val, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={val}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={`${placeholder} ${i + 1}`}
            className="flex-1 rounded-lg border border-brand-navy/20 px-3.5 py-2 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
          />
          {values.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-navy/10 text-brand-slate hover:bg-red-50 hover:text-brand-red"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="flex items-center gap-1.5 self-start font-body text-xs font-medium text-brand-navy hover:text-brand-red"
      >
        <Plus className="h-3.5 w-3.5" /> Add {label.toLowerCase()}
      </button>
    </div>
  );
}

export function ServiceForm({
  serviceId,
  categories,
  initialData,
}: ServiceFormProps) {
  const router = useRouter();
  const isEditing = Boolean(serviceId);

  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    categoryId: initialData?.categoryId ?? categories[0]?.id ?? "",
    priceFrom: initialData?.priceFrom ?? "",
    priceUnit: initialData?.priceUnit ?? "",
    image: initialData?.image ?? "",
    isFeatured: initialData?.isFeatured ?? false,
    displayOrder: initialData?.displayOrder ?? 0,
  });
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements ?? [""],
  );
  const [processSteps, setProcessSteps] = useState<string[]>(
    initialData?.processSteps ?? [""],
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
      if (name === "name" && !isEditing) next.slug = slugify(value);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEditing
      ? `/api/admin/services/${serviceId}`
      : "/api/admin/services";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          requirements: requirements.filter(Boolean),
          processSteps: processSteps.filter(Boolean),
          displayOrder: Number(form.displayOrder),
          priceFrom: form.priceFrom ? Number(form.priceFrom) : null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to save");
      }
      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-navy">
        {isEditing ? "Edit Service" : "New Service"}
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm"
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Category *
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Starting Price (Ksh)
            </label>
            <input
              name="priceFrom"
              type="number"
              value={form.priceFrom}
              onChange={handleChange}
              placeholder="e.g. 1500"
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Price Unit
            </label>
            <input
              name="priceUnit"
              value={form.priceUnit}
              onChange={handleChange}
              placeholder="e.g. per 100 pieces"
              className="rounded-lg border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
            />
          </div>
        </div>

        <MultiInput
          label="Requirements"
          values={requirements}
          onChange={setRequirements}
          placeholder="e.g. Existing logo"
        />
        <MultiInput
          label="Process Steps"
          values={processSteps}
          onChange={setProcessSteps}
          placeholder="e.g. Contact us with details"
        />

        <ImageUpload
          label="Service Image"
          value={form.image}
          onChange={(url) => setForm((p) => ({ ...p, image: url }))}
        />

        <div className="flex items-center gap-3">
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
            Feature this service
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-navy/10 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
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
            {saving ? "Saving…" : "Save Service"}
          </button>
        </div>
      </form>
    </div>
  );
}