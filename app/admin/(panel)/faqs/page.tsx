import { getAllFaqsAdmin } from "@/lib/services/admin.service";
import { FaqsManager } from "@/components/admin/FaqsManager";
import { getAllCategories } from "@/lib/services/category.service";

export default async function AdminFaqsPage() {
  const [faqs, categories] = await Promise.all([
    getAllFaqsAdmin(),
    getAllCategories(),
  ]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          FAQs
        </h1>
        <p className="mt-1 font-body text-sm text-brand-slate">
          {faqs.length} questions. General FAQs show on the homepage; category
          FAQs show on service pages.
        </p>
      </div>
      <FaqsManager
        initialFaqs={faqs as Parameters<typeof FaqsManager>[0]["initialFaqs"]}
        categories={categories.map((c: { id: string; name: string }) => ({
          id: c.id,
          name: c.name,
        }))}
      />
    </div>
  );
}