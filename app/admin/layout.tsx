import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getDashboardStats } from "@/lib/services/admin.service";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, stats] = await Promise.all([auth(), getDashboardStats()]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* <AdminSidebar
        newLeads={stats.newLeads}
        pendingReviews={stats.pendingReviews} blurphur
      /> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}