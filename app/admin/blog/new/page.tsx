import { getAllCategories } from "@/lib/services/category.service";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default async function NewBlogPostPage() {
  const categories = await getAllCategories();

  return (
    <BlogPostForm
      categories={categories.map((c: { id: string; name: string }) => ({
        id: c.id,
        name: c.name,
      }))}
    />
  );
}