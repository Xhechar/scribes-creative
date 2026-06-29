import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
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
      <AdminShell
        newLeads={stats.newLeads}
        pendingReviews={stats.pendingReviews}
      >
        {children}
      </AdminShell>
    </AdminProviders>
  );
}
