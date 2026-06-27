import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllCategories } from "@/lib/services/category.service";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();

  return (
    <div className="flex min-h-screen flex-col bg-brand-paper">
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}