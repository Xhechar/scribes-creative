"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader } from "lucide-react";

export function DeleteCategoryButton({
  id,
  serviceCount,
}: {
  id: string;
  serviceCount: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (serviceCount > 0) {
      if (
        !confirm(
          `This category has ${serviceCount} service${serviceCount > 1 ? "s" : ""} attached. Deleting it will also delete those services. Continue?`,
        )
      )
        return;
    } else {
      if (!confirm("Delete this category?")) return;
    }
    setLoading(true);
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
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