import Link from "next/link";
import Image from "next/image";
import {
  Inbox,
  Star,
  FileText,
  ImageIcon,
  ArrowRight,
  Phone,
  Globe,
  Clock,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentLeads,
  getRecentBlogPosts,
  getRecentPortfolioItems,
} from "@/lib/services/admin.service";

interface LeadRow {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  createdAt: Date;
}
interface PostRow {
  id: string;
  title: string;
  slug: string;
  publishedAt: Date | null;
  coverImage: string | null;
}
interface PortfolioRow {
  id: string;
  title: string;
  images: { url: string }[];
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  color,
  subtitle,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  href: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl font-bold text-brand-navy">
          {value}
        </p>
        <p className="font-body text-xs text-brand-slate">{label}</p>
        {subtitle && (
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-brand-navy/40">
            {subtitle}
          </p>
        )}
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-navy/20 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red" />
    </Link>
  );
}

function formatDate(d: Date | null) {
  if (!d) return "Draft";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
  }).format(new Date(d));
}

export default async function AdminDashboard() {
  const [stats, recentLeads, recentPosts, recentPortfolio] = await Promise.all([
    getDashboardStats(),
    getRecentLeads(5),
    getRecentBlogPosts(4),
    getRecentPortfolioItems(4),
  ]);

  const leads = recentLeads as unknown as LeadRow[];
  const posts = recentPosts as unknown as PostRow[];
  const portfolio = recentPortfolio as unknown as PortfolioRow[];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          Dashboard
        </h1>
        <p className="mt-1 font-body text-sm text-brand-slate">
          Here's what needs your attention today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="New Leads"
          value={stats.newLeads}
          icon={Inbox}
          href="/admin/leads"
          color="bg-brand-red"
          subtitle="Awaiting response"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews}
          icon={Star}
          href="/admin/reviews"
          color="bg-brand-amber"
          subtitle="Need approval"
        />
        <StatCard
          label="Published Posts"
          value={stats.publishedPosts}
          icon={FileText}
          href="/admin/blog"
          color="bg-brand-navy"
          subtitle="Live on site"
        />
        <StatCard
          label="Portfolio Items"
          value={stats.portfolioCount}
          icon={ImageIcon}
          href="/admin/portfolio"
          color="bg-brand-navy/70"
          subtitle="Total projects"
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 font-display text-base font-bold text-brand-navy">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "New Blog Post", href: "/admin/blog/new" },
            { label: "Add Portfolio Item", href: "/admin/portfolio/new" },
            { label: "Add Service", href: "/admin/services/new" },
            { label: "Add FAQ", href: "/admin/faqs" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="rounded-lg border border-brand-navy/15 px-4 py-2 font-body text-sm font-medium text-brand-navy transition-colors hover:border-brand-red hover:text-brand-red"
            >
              + {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent leads */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-brand-navy">
              Recent Leads
            </h2>
            <Link
              href="/admin/leads"
              className="font-body text-xs font-medium text-brand-red hover:underline"
            >
              View all →
            </Link>
          </div>
          {leads.length === 0 ? (
            <div className="rounded-xl border border-dashed border-brand-navy/15 p-6 text-center">
              <p className="font-body text-sm text-brand-slate">
                No leads yet.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm divide-y divide-brand-navy/5">
              {leads.map((lead: LeadRow) => (
                <div
                  key={lead.id}
                  className="flex items-start gap-3 p-4 hover:bg-brand-paper/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red/10 font-display text-sm font-bold text-brand-red">
                    {lead.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm font-semibold text-brand-navy">
                      {lead.name}
                    </p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1 font-body text-xs text-brand-slate hover:text-brand-navy"
                    >
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </a>
                    {lead.message && (
                      <p className="mt-0.5 truncate font-body text-xs text-brand-slate">
                        {lead.message}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-brand-slate/60 shrink-0">
                    {formatDate(lead.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent blog posts */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-brand-navy">
              Recent Posts
            </h2>
            <Link
              href="/admin/blog"
              className="font-body text-xs font-medium text-brand-red hover:underline"
            >
              View all →
            </Link>
          </div>
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-brand-navy/15 p-6 text-center">
              <p className="font-body text-sm text-brand-slate">
                No posts yet.
              </p>
              <Link
                href="/admin/blog/new"
                className="mt-2 inline-block font-body text-sm font-medium text-brand-red hover:underline"
              >
                Write your first post →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {posts.map((post: PostRow) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  className="flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white p-3 shadow-sm transition-colors hover:bg-brand-paper/30"
                >
                  {post.coverImage ? (
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-brand-navy/5">
                      <FileText className="h-5 w-5 text-brand-navy/30" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-sm font-semibold text-brand-navy">
                      {post.title}
                    </p>
                    <span
                      className={`flex items-center gap-1 font-mono text-[10px] ${post.publishedAt ? "text-green-600" : "text-brand-slate"}`}
                    >
                      {post.publishedAt ? (
                        <Globe className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {post.publishedAt
                        ? `Published ${formatDate(post.publishedAt)}`
                        : "Draft"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent portfolio */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-brand-navy">
              Recent Portfolio
            </h2>
            <Link
              href="/admin/portfolio"
              className="font-body text-xs font-medium text-brand-red hover:underline"
            >
              View all →
            </Link>
          </div>
          {portfolio.length === 0 ? (
            <div className="rounded-xl border border-dashed border-brand-navy/15 p-6 text-center">
              <p className="font-body text-sm text-brand-slate">
                No portfolio items yet.
              </p>
              <Link
                href="/admin/portfolio/new"
                className="mt-2 inline-block font-body text-sm font-medium text-brand-red hover:underline"
              >
                Add your first project →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {portfolio.map((item: PortfolioRow) => {
                const cover = item.images[0]?.url;
                return (
                  <Link
                    key={item.id}
                    href={`/admin/portfolio/${item.id}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-brand-navy/10"
                  >
                    {cover ? (
                      <Image
                        src={cover}
                        alt={item.title}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-brand-navy/5">
                        <ImageIcon className="h-8 w-8 text-brand-navy/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-navy/70 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="font-body text-xs font-semibold text-white">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}