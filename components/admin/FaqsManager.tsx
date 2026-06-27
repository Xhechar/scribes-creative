"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Loader } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  categoryId: string | null;
  category: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

export function FaqsManager({
  initialFaqs,
  categories,
}: {
  initialFaqs: FaqItem[];
  categories: Category[];
}) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const emptyForm = {
    question: "",
    answer: "",
    categoryId: "",
    displayOrder: 0,
  };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function handleFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function startEdit(faq: FaqItem) {
    setAdding(false);
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      categoryId: faq.categoryId ?? "",
      displayOrder: faq.displayOrder,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setAdding(false);
    setForm(emptyForm);
  }

  async function saveNew() {
    if (!form.question.trim() || !form.answer.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newFaq = await res.json();
      const cat = categories.find((c) => c.id === form.categoryId) ?? null;
      setFaqs((prev) => [
        ...prev,
        { ...newFaq, category: cat ? { name: cat.name } : null },
      ]);
      cancelEdit();
    }
    setSaving(false);
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const cat = categories.find((c) => c.id === form.categoryId) ?? null;
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                ...form,
                categoryId: form.categoryId || null,
                category: cat ? { name: cat.name } : null,
              }
            : f,
        ),
      );
      cancelEdit();
    }
    setSaving(false);
  }

  async function deleteFaq(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    if (res.ok) setFaqs((prev) => prev.filter((f) => f.id !== id));
  }

  const EditForm = ({ onSave }: { onSave: () => void }) => (
    <div className="flex flex-col gap-3 rounded-lg border border-brand-navy/20 bg-brand-paper/50 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate">
          Question *
        </label>
        <input
          name="question"
          value={form.question}
          onChange={handleFormChange}
          className="rounded-md border border-brand-navy/20 px-3 py-2 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate">
          Answer *
        </label>
        <textarea
          name="answer"
          rows={4}
          value={form.answer}
          onChange={handleFormChange}
          className="resize-none rounded-md border border-brand-navy/20 px-3 py-2 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate">
            Category (optional)
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleFormChange}
            className="rounded-md border border-brand-navy/20 px-3 py-2 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
          >
            <option value="">General (site-wide)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate">
            Display Order
          </label>
          <input
            name="displayOrder"
            type="number"
            value={form.displayOrder}
            onChange={handleFormChange}
            className="rounded-md border border-brand-navy/20 px-3 py-2 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={cancelEdit}
          className="flex items-center gap-1.5 rounded-md border border-brand-navy/20 px-3 py-1.5 font-body text-sm text-brand-navy hover:bg-brand-navy/5"
        >
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-md bg-brand-red px-3 py-1.5 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90 disabled:opacity-60"
        >
          {saving ? (
            <Loader className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm"
        >
          {editingId === faq.id ? (
            <div className="p-4">
              <EditForm onSave={() => saveEdit(faq.id)} />
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4">
              <div className="flex-1">
                {faq.category && (
                  <span className="mb-1.5 inline-block rounded-full bg-brand-amber/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-brand-navy">
                    {faq.category.name}
                  </span>
                )}
                <p className="font-body text-sm font-semibold text-brand-navy">
                  {faq.question}
                </p>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-brand-slate">
                  {faq.answer}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => startEdit(faq)}
                  className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-brand-navy/10 hover:text-brand-navy"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => deleteFaq(faq.id)}
                  className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-red-50 hover:text-brand-red"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {adding ? (
        <div className="rounded-xl border border-brand-navy/10 bg-white p-4 shadow-sm">
          <EditForm onSave={saveNew} />
        </div>
      ) : (
        <button
          onClick={() => {
            setAdding(true);
            setEditingId(null);
            setForm(emptyForm);
          }}
          className="flex items-center gap-2 self-start rounded-lg border border-dashed border-brand-navy/20 px-4 py-2.5 font-body text-sm font-medium text-brand-navy hover:border-brand-red hover:text-brand-red"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      )}
    </div>
  );
}