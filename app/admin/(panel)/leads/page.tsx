import { getAllLeads } from "@/lib/services/admin.service";
import { LeadsTable } from "@/components/admin/LeadsTable";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          Leads
        </h1>
        <p className="mt-1 font-body text-sm text-brand-slate">
          Enquiries submitted via the website contact form.
        </p>
      </div>
      <LeadsTable
        initialLeads={leads as Parameters<typeof LeadsTable>[0]["initialLeads"]}
      />
    </div>
  );
}