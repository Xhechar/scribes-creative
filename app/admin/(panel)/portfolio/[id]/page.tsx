import { notFound } from "next/navigation";
import { getPortfolioItemAdmin } from "@/lib/services/admin.service";
import { getAllCategories } from "@/lib/services/category.service";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default async function EditPortfolioItemPage({
  params,
}: {
  params: { id: string };
}) {
  const [item, categories] = await Promise.all([
    getPortfolioItemAdmin(params.id),
    getAllCategories(),
  ]);

  if (!item) notFound();

  const images = (item as unknown as { images: { url: string }[] }).images;

  return (
    <PortfolioForm
      itemId={item.id}
      categories={categories.map((c: { id: string; name: string }) => ({
        id: c.id,
        name: c.name,
      }))}
      initialData={{
        title: item.title,
        slug: item.slug,
        description:
          (item as unknown as { description: string | null }).description ?? "",
        clientName:
          (item as unknown as { clientName: string | null }).clientName ?? "",
        categoryId:
          (item as unknown as { categoryId: string | null }).categoryId ?? "",
        isFeatured: (item as unknown as { isFeatured: boolean }).isFeatured,
        displayOrder: (item as unknown as { displayOrder: number })
          .displayOrder,
        imageUrls: images.map((img) => img.url),
      }}
    />
  );
}