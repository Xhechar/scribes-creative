"use client";

import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: LeadStatus;
  createdAt: Date;
}

const statusColors: Record<LeadStatus, string> = {
  NEW: "bg-brand-red/10 text-brand-red border border-brand-red/20",
  CONTACTED: "bg-brand-amber/15 text-brand-navy border border-brand-amber/30",
  CONVERTED: "bg-green-100 text-green-700 border border-green-200",
  CLOSED: "bg-gray-100 text-gray-500 border border-gray-200",
};

const statusOptions: LeadStatus[] = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"];

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<LeadStatus | "ALL">("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

  async function updateStatus(id: string, status: LeadStatus) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["ALL", ...statusOptions] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-body text-xs font-medium transition-colors",
              filter === s
                ? "border-brand-navy bg-brand-navy text-brand-paper"
                : "border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5",
            )}
          >
            {s === "ALL" ? "All Leads" : s.charAt(0) + s.slice(1).toLowerCase()}
            {s !== "ALL" && (
              <span className="ml-1.5 font-mono text-[10px]">
                {leads.filter((l) => l.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <p className="px-5 py-10 text-center font-body text-sm text-brand-slate">
            No leads in this category.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b border-brand-navy/10 bg-brand-paper/50">
              <tr>
                {["Name", "Contact", "Service / Message", "Status", "Date"].map(
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
              {filtered.map((lead) => (
                <>
                  <tr
                    key={lead.id}
                    className="cursor-pointer hover:bg-brand-paper/30"
                    onClick={() =>
                      setExpanded(expanded === lead.id ? null : lead.id)
                    }
                  >
                    <td className="px-4 py-3 font-body text-sm font-semibold text-brand-navy">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 font-body text-sm text-brand-slate hover:text-brand-navy"
                      >
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </a>
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-0.5 flex items-center gap-1.5 font-body text-xs text-brand-slate hover:text-brand-navy"
                        >
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </a>
                      )}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 font-body text-xs text-brand-slate">
                      {lead.message ?? "—"}
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(lead.id, e.target.value as LeadStatus)
                        }
                        className={cn(
                          "rounded-full px-3 py-1 font-body text-xs font-medium focus:outline-none",
                          statusColors[lead.status],
                        )}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0) + s.slice(1).toLowerCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-brand-slate">
                      {new Date(lead.createdAt).toLocaleDateString("en-KE")}
                    </td>
                  </tr>
                  {expanded === lead.id && lead.message && (
                    <tr
                      key={`${lead.id}-expanded`}
                      className="bg-brand-paper/30"
                    >
                      <td colSpan={5} className="px-5 py-3">
                        <p className="font-body text-sm text-brand-navy">
                          {lead.message}
                        </p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
