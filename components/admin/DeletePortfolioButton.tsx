"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader } from "lucide-react";

export function DeletePortfolioButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (
      !confirm("Delete this project and all its images? This cannot be undone.")
    )
      return;
    setLoading(true);
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-red-50 hover:text-brand-red disabled:opacity-50"
      title="Delete"
    >
      {loading ? (
        <Loader className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}