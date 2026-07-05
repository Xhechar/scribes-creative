import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/services/post.service";
import type { PostSummary } from "@/types";
import {
  CloudinaryPresets,
  getCloudinaryBlurUrl,
} from "@/lib/utils/cloudinary";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Branding tips, print guides, and business advice from Scribes Creative Solutions in Nairobi.",
};

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = (await getAllPosts()) as PostSummary[];

  return (
    <>
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">
            Blog
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-paper sm:text-5xl">
            Branding &amp; print insights.
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-brand-paper/70">
            Practical guides on building a brand, choosing print finishes, and
            getting your business found online.
          </p>
        </div>
      </section>

      <section className="bg-brand-paper py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="font-body text-sm text-brand-slate">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: PostSummary) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={CloudinaryPresets.blogCard(post.coverImage)}
                        placeholder="blur"
                        blurDataURL={getCloudinaryBlurUrl(post.coverImage)}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-brand-navy/5" />
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-amber/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-brand-navy"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-lg font-bold text-brand-navy leading-tight">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 font-body text-xs text-brand-slate">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="font-mono text-[10px] text-brand-slate">
                        {formatDate(post.publishedAt)}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-navy/30 transition-colors group-hover:text-brand-red" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}