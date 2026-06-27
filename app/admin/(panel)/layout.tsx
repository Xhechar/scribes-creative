import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminProviders } from "@/components/admin/AdminProviders";
import { getDashboardStats } from "@/lib/services/admin.service";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const stats = await getDashboardStats();

  return (
    <AdminProviders>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <AdminSidebar
          newLeads={stats.newLeads}
          pendingReviews={stats.pendingReviews}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminProviders>
  );
}