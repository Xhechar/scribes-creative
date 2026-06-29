import { notFound } from "next/navigation";
import { getServiceAdmin } from "@/lib/services/admin.service";
import { getAllCategories } from "@/lib/services/category.service";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;
  const [service, cats] = await Promise.all([
    getServiceAdmin(paramsId),
    getAllCategories(),
  ]);

  if (!service) notFound();

  const s = service as unknown as {
    id: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    requirements: string[];
    processSteps: string[];
    priceFrom: number | null;
    priceUnit: string | null;
    image: string | null;
    isFeatured: boolean;
    displayOrder: number;
  };

  return (
    <ServiceForm
      serviceId={s.id}
      categories={cats.map((c: { id: string; name: string }) => ({
        id: c.id,
        name: c.name,
      }))}
      initialData={{
        name: s.name,
        slug: s.slug,
        description: s.description,
        categoryId: s.categoryId,
        requirements: s.requirements,
        processSteps: s.processSteps,
        priceFrom: s.priceFrom?.toString() ?? "",
        priceUnit: s.priceUnit ?? "",
        image: s.image ?? "",
        isFeatured: s.isFeatured,
        displayOrder: s.displayOrder,
      }}
    />
  );
}