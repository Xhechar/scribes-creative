import { notFound } from "next/navigation";
import { getPostByIdAdmin } from "@/lib/services/admin.service";
import { getAllCategories } from "@/lib/services/category.service";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [post, categories] = await Promise.all([
    getPostByIdAdmin(params.id),
    getAllCategories(),
  ]);

  if (!post) notFound();

  return (
    <BlogPostForm
      postId={post.id}
      categories={categories.map((c: { id: string; name: string }) => ({
        id: c.id,
        name: c.name,
      }))}
      initialData={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? "",
        tags: (post.tags as string[]) ?? [],
        categoryId: post.categoryId ?? "",
        seoTitle:
          (post as unknown as { seoTitle: string | null }).seoTitle ?? "",
        seoDescription:
          (post as unknown as { seoDescription: string | null })
            .seoDescription ?? "",
        publishedAt: post.publishedAt?.toISOString() ?? null,
      }}
    />
  );
}