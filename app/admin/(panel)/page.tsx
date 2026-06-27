import Link from "next/link";
import {
  Inbox,
  Star,
  FileText,
  ImageIcon,
  ArrowRight,
  Phone,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentLeads,
} from "@/lib/services/admin.service";

interface LeadRow {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  createdAt: Date;
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div>
        <p className="font-display text-2xl font-bold text-brand-navy">
          {value}
        </p>
        <p className="font-body text-xs text-brand-slate">{label}</p>
      </div>
      <ArrowRight className="ml-auto h-4 w-4 text-brand-navy/20" />
    </Link>
  );
}

export default async function AdminDashboard() {
  const [stats, recentLeads] = await Promise.all([
    getDashboardStats(),
    getRecentLeads(5),
  ]);
  const leads = recentLeads as unknown as LeadRow[];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          Dashboard
        </h1>
        <p className="mt-1 font-body text-sm text-brand-slate">
          Overview of what needs your attention.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="New Leads"
          value={stats.newLeads}
          icon={Inbox}
          href="/admin/leads"
          color="bg-brand-red"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews}
          icon={Star}
          href="/admin/reviews"
          color="bg-brand-amber"
        />
        <StatCard
          label="Published Posts"
          value={stats.publishedPosts}
          icon={FileText}
          href="/admin/blog"
          color="bg-brand-navy"
        />
        <StatCard
          label="Portfolio Items"
          value={stats.portfolioCount}
          icon={ImageIcon}
          href="/admin/portfolio"
          color="bg-brand-navy/70"
        />
      </div>
      {leads.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-brand-navy">
              New Leads
            </h2>
            <Link
              href="/admin/leads"
              className="font-body text-sm font-medium text-brand-red hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-brand-navy/10 bg-brand-paper/50">
                <tr>
                  {["Name", "Phone", "Message", "Date"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-slate"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5">
                {leads.map((lead: LeadRow) => (
                  <tr key={lead.id} className="hover:bg-brand-paper/30">
                    <td className="px-4 py-3 font-body text-sm font-medium text-brand-navy">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 font-body text-sm text-brand-slate hover:text-brand-navy"
                      >
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </a>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 font-body text-xs text-brand-slate">
                      {lead.message ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-brand-slate">
                      {new Date(lead.createdAt).toLocaleDateString("en-KE")}
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