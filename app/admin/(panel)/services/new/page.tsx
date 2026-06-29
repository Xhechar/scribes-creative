import { getAllCategories } from "@/lib/services/category.service";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function NewServicePage() {
  const cats = await getAllCategories();
  return (
    <ServiceForm
      categories={cats.map((c: { id: string; name: string }) => ({
        id: c.id,
        name: c.name,
      }))}
    />
  );
}