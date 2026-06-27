import { getAllCategories } from "@/lib/services/category.service";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default async function NewPortfolioItemPage() {
  const categories = await getAllCategories();
  return (
    <PortfolioForm
      categories={categories.map((c: { id: string; name: string }) => ({
        id: c.id,
        name: c.name,
      }))}
    />
  );
}