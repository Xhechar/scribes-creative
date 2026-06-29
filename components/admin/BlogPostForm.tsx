"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Save, Eye, Loader } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface BlogPostFormProps {
  postId?: string;
  categories: Category[];
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string[];
    categoryId: string;
    seoTitle: string;
    seoDescription: string;
    publishedAt: string | null;
  };
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function BlogPostForm({
  postId,
  categories,
  initialData,
}: BlogPostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(postId);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    tags: initialData?.tags?.join(", ") ?? "",
    categoryId: initialData?.categoryId ?? "",
    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",
    publishedAt: initialData?.publishedAt ?? "",
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
      if (name === "title" && !isEditing) next.slug = slugify(value);
      return next;
    });
  }

  async function save(publish: boolean) {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      publishedAt: publish
        ? new Date().toISOString()
        : form.publishedAt || null,
    };
    const url = isEditing ? `/api/admin/blog/${postId}` : "/api/admin/blog";
    const method = isEditing ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to save.");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  const isPublished = Boolean(form.publishedAt);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          {isEditing ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex items-center gap-2">
          {isPublished && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-brand-navy/20 px-4 py-2 font-body text-sm font-medium text-brand-navy hover:bg-brand-navy/5"
            >
              <Eye className="h-4 w-4" /> Preview
            </a>
          )}
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-md border border-brand-navy/20 px-4 py-2 font-body text-sm font-medium text-brand-navy hover:bg-brand-navy/5 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => save(true)}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90 disabled:opacity-60"
          >
            {saving && <Loader className="h-4 w-4 animate-spin" />}
            {isPublished ? "Update & Publish" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. 5 Signs Your Business Needs a Rebrand"
              className="rounded-lg border border-brand-navy/20 px-4 py-2.5 font-display text-lg font-bold text-brand-navy placeholder:font-body placeholder:text-base placeholder:font-normal placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              placeholder="Short summary shown in listings..."
              className="resize-none rounded-lg border border-brand-navy/20 px-4 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Content *
            </label>
            <TipTapEditor
              content={form.content}
              onChange={(html) =>
                setForm((prev) => ({ ...prev, content: html }))
              }
              placeholder="Start writing your post…"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="rounded-lg border border-brand-navy/10 bg-white p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Status
            </p>
            <p
              className={`mt-1.5 font-body text-sm font-semibold ${isPublished ? "text-green-600" : "text-brand-slate"}`}
            >
              {isPublished
                ? `Published ${new Date(form.publishedAt!).toLocaleDateString("en-KE")}`
                : "Draft"}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              URL Slug
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3 py-2 font-mono text-xs text-brand-navy focus:border-brand-navy focus:outline-none"
            />
            <span className="font-mono text-[9px] text-brand-slate">
              /blog/{form.slug || "…"}
            </span>
          </div>

          <ImageUpload
            label="Cover Image"
            value={form.coverImage}
            onChange={(url) => setForm((p) => ({ ...p, coverImage: url }))}
            aspectRatio="video"
          />

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Branding, Print, Tips"
              className="rounded-lg border border-brand-navy/20 px-3 py-2 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              Related Category
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="rounded-lg border border-brand-navy/20 px-3 py-2 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg border border-brand-navy/10 bg-white p-4">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate">
              SEO
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase tracking-[0.1em] text-brand-slate">
                  Meta Title
                </label>
                <input
                  name="seoTitle"
                  value={form.seoTitle}
                  onChange={handleChange}
                  className="rounded border border-brand-navy/20 px-2.5 py-1.5 font-body text-xs text-brand-navy focus:border-brand-navy focus:outline-none"
                />
                <span className="font-mono text-[9px] text-brand-slate">
                  {form.seoTitle.length}/60
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase tracking-[0.1em] text-brand-slate">
                  Meta Description
                </label>
                <textarea
                  name="seoDescription"
                  value={form.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="resize-none rounded border border-brand-navy/20 px-2.5 py-1.5 font-body text-xs text-brand-navy focus:border-brand-navy focus:outline-none"
                />
                <span className="font-mono text-[9px] text-brand-slate">
                  {form.seoDescription.length}/160
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}