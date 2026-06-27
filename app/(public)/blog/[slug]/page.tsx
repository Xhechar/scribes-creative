import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/services/post.service";
import { Breadcrumb } from "@/components/ui/shared";
import { JsonLd, blogPostingSchema } from "@/components/seo/JsonLD";
import { siteConfig } from "@/lib/data/site-config";
import type { PostFull } from "@/types";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: (post as unknown as PostFull).seoTitle ?? post.title,
    description: (post as unknown as PostFull).seoDescription ?? post.excerpt,
  };
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const rawPost = await getPostBySlug(params.slug);
  if (!rawPost || !rawPost.publishedAt) notFound();
  const post = rawPost as unknown as PostFull;

  const schema = blogPostingSchema({
    title: post.title,
    excerpt: post.excerpt,
    url: `https://scribescreative.co.ke/blog/${post.slug}`,
    publishedAt: new Date(post.publishedAt!),
    updatedAt: new Date(post.updatedAt),
    authorName: siteConfig.businessName,
    publisherName: siteConfig.businessName,
    imageUrl: post.coverImage,
  });

  return (
    <>
      <JsonLd data={schema} />
      <section className="bg-brand-navy py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
          />
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-brand-amber/20 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-brand-amber"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-paper sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-brand-paper/50">
              {formatDate(post.publishedAt)}
            </span>
            {post.category && (
              <Link
                href={`/services/${post.category.slug}`}
                className="font-mono text-xs text-brand-amber hover:underline"
              >
                {post.category.name}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {post.coverImage && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div
            className="font-body text-sm leading-relaxed text-brand-slate
              [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-navy
              [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-navy
              [&_p]:mt-4
              [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul>li]:mt-1.5
              [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol>li]:mt-1.5
              [&_strong]:font-semibold [&_strong]:text-brand-navy
              [&_a]:text-brand-red [&_a]:underline [&_a]:underline-offset-2
              [&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-amber [&_blockquote]:pl-4 [&_blockquote]:italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      <section className="bg-brand-navy py-14 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="font-display text-2xl font-bold text-brand-paper">
            Ready to put this into practice?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="bg-brand-paper px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body text-sm font-semibold text-brand-navy hover:text-brand-red"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}