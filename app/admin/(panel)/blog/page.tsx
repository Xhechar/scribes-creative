import Link from "next/link";
import { Plus, Pencil, Globe, FileText } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/services/admin.service";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  publishedAt: Date | null;
  tags: string[];
  category: { name: string } | null;
}

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function AdminBlogPage() {
  const rawPosts = await getAllPostsAdmin();
  const posts = rawPosts as unknown as PostRow[];
  const published = posts.filter((p) => p.publishedAt);
  const drafts = posts.filter((p) => !p.publishedAt);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">
            Blog
          </h1>
          <p className="mt-1 font-body text-sm text-brand-slate">
            {published.length} published · {drafts.length} draft
            {drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 font-body text-sm font-semibold text-brand-paper hover:bg-brand-red/90"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-brand-navy/20 bg-white py-16 text-center">
          <FileText className="h-10 w-10 text-brand-navy/20" />
          <p className="font-body text-sm text-brand-slate">No posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="font-body text-sm font-semibold text-brand-red hover:underline"
          >
            Create a post →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-brand-navy/10 bg-brand-paper/50">
                <tr>
                  {["Title", "Status", "Category", "Tags", "Date", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5">
                {posts.map((post: PostRow) => (
                  <tr key={post.id} className="group hover:bg-brand-paper/30">
                    <td className="px-4 py-3">
                      <p className="font-body text-sm font-semibold text-brand-navy">
                        {post.title}
                      </p>
                      <p className="font-mono text-[10px] text-brand-slate">
                        /blog/{post.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {post.publishedAt ? (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-green-600">
                          <Globe className="h-3 w-3" /> Published
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-brand-slate">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-brand-slate">
                      {post.category?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full bg-brand-amber/15 px-2 py-0.5 font-mono text-[9px] text-brand-navy"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-brand-slate">
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="flex h-7 w-7 items-center justify-center rounded text-brand-slate hover:bg-brand-navy/10 hover:text-brand-navy"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <DeletePostButton id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
