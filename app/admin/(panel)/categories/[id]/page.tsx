import { notFound } from "next/navigation";
import { getCategoryAdmin } from "@/lib/services/admin.service";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;

  const cat = await getCategoryAdmin(paramsId);
  if (!cat) notFound();

  return (
    <CategoryForm
      categoryId={cat.id}
      initialData={{
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon ?? "Palette",
        type: cat.type,
        displayOrder: cat.displayOrder,
      }}
    />
  );
}
