"use client";

import React from "react";
import { CheckCircle2, Clock, AlertCircle, Scale, ChevronRight } from "lucide-react";
import { SetupChecklistItem, ComplianceStatus } from "@/backend/types/AdminComplianceChecklist";
interface ComplianceTableProps {
  items: SetupChecklistItem[];
  selectedItem: SetupChecklistItem | null;
  onSelectItem: (item: SetupChecklistItem) => void;
  statusFilter: string;
  onFilterChange: (status: string) => void;
}
export default function ComplianceTable({
  items,
  selectedItem,
  onSelectItem,
  statusFilter,
  onFilterChange
}: ComplianceTableProps) {
  const filteredItems = items.filter(item => {
    if (statusFilter === "ALL") return true;
    return item.status === statusFilter;
  });
  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case "COMPLETED":
        return <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success px-2.5 py-0.5 text-xs font-semibold text-success-foreground whitespace-nowrap" data-api-unique-id='compliancetable-r602e8c26e4c3cf2c-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            <CheckCircle2 className="h-3 w-3" data-api-unique-id='compliancetable-r0038865c012c9aeb-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' />
            COMPLETED
          </span>;
      case "IN_REVIEW":
        return <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-warning px-2.5 py-0.5 text-xs font-semibold text-warning-foreground whitespace-nowrap" data-api-unique-id='compliancetable-r2b839e7035b62262-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            <Clock className="h-3 w-3" data-api-unique-id='compliancetable-r1e12bbf3113f35b0-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' />
            IN_REVIEW
          </span>;
      case "PENDING":
        return <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground whitespace-nowrap" data-api-unique-id='compliancetable-r5ae23d695be07971-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            <AlertCircle className="h-3 w-3" data-api-unique-id='compliancetable-rc1cdbe95e4ebf4b3-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' />
            PENDING
          </span>;
      default:
        return null;
    }
  };
  return <div data-controller-name="Compliance Requirements Table" className="flex min-w-0 flex-col rounded-lg border border-border bg-card text-card-foreground shadow-soft" data-api-unique-id='compliancetable-re67e608f1809b008-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
      {/* Table Header & Status Filter Toolbar */}
      <div className="flex min-w-0 flex-col gap-3 border-b border-border p-4" data-api-unique-id='compliancetable-r8b73f00501a470ce-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
        <div className="flex min-w-0 flex-col gap-1" data-api-unique-id='compliancetable-r88ddf58347a93288-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
          <div className="flex items-center gap-2" data-api-unique-id='compliancetable-r9ff30e56ec9ece47-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            <h2 className="font-header text-base font-bold text-foreground" data-api-unique-id='compliancetable-rfc52a5ac0eef01f1-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
              Statutory Requirement Ledger
            </h2>
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground" data-api-unique-id='compliancetable-r99e26f120d61a50a-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
              {filteredItems.length} of {items.length} records
            </span>
          </div>
          <p className="text-xs text-muted-foreground" data-api-unique-id='compliancetable-rd3c034f063e9fe51-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            Click any row to load the verification citation, update official registry entries, or adjudicate compliance status.
          </p>
        </div>

        {/* Filter Chip Bar */}
        <div className="flex min-w-0 max-w-full items-center gap-1.5 overflow-x-auto pb-1" data-api-unique-id='compliancetable-r17a925dc7892a804-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
          <span className="shrink-0 text-xs font-medium text-muted-foreground mr-1" data-api-unique-id='compliancetable-rb4f90369e1cb48f2-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            Filter Status:
          </span>
          <button type="button" onClick={() => onFilterChange("ALL")} className={`inline-flex shrink-0 items-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${statusFilter === "ALL" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='compliancetable-rd9bf3a10b7ed6f94-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            All Items ({items.length})
          </button>
          <button type="button" onClick={() => onFilterChange("PENDING")} className={`inline-flex shrink-0 items-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${statusFilter === "PENDING" ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='compliancetable-r8d8f0551e07c9ef0-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            Pending ({items.filter(i => i.status === "PENDING").length})
          </button>
          <button type="button" onClick={() => onFilterChange("IN_REVIEW")} className={`inline-flex shrink-0 items-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${statusFilter === "IN_REVIEW" ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='compliancetable-rdc07b2abdeedb57a-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            In Review ({items.filter(i => i.status === "IN_REVIEW").length})
          </button>
          <button type="button" onClick={() => onFilterChange("COMPLETED")} className={`inline-flex shrink-0 items-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${statusFilter === "COMPLETED" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='compliancetable-r8b001af1f49a7958-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            Completed ({items.filter(i => i.status === "COMPLETED").length})
          </button>
        </div>
      </div>

      {/* Table Data Shell with Horizontal Scroll Containment */}
      <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='compliancetable-r3590fbe4b0f99611-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
        <table className="w-full min-w-[760px] text-left text-sm border-collapse" data-api-unique-id='compliancetable-rd1f33ce64aeed3bb-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
          <thead data-api-unique-id='compliancetable-r7438fb939ecbbb2b-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            <tr className="border-b border-border bg-muted/60 text-xs font-semibold text-muted-foreground" data-api-unique-id='compliancetable-r8fa8a93c63544a3f-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
              <th className="py-2.5 px-3 whitespace-nowrap" data-api-unique-id='compliancetable-rb8a973ee4484f02e-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>Identifier & Legal Citation</th>
              <th className="py-2.5 px-3 min-w-[200px]" data-api-unique-id='compliancetable-r42008c49b51e078a-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>Requirement & Detailed Mandate</th>
              <th className="py-2.5 px-3 min-w-[190px]" data-api-unique-id='compliancetable-ra640574cc13366a3-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>Configured Official Value</th>
              <th className="py-2.5 px-3 whitespace-nowrap text-center" data-api-unique-id='compliancetable-r4380dda995626410-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>Status</th>
              <th className="py-2.5 px-3 whitespace-nowrap text-right" data-api-unique-id='compliancetable-r6b4348bca11447e8-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>Last Verified</th>
              <th className="py-2.5 px-3 whitespace-nowrap text-center w-12" data-api-unique-id='compliancetable-r66bdd1e9dfff7de5-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border" data-api-unique-id='compliancetable-rf2ba5ebb4367cc7b-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
            {filteredItems.length === 0 ? <tr data-api-unique-id='compliancetable-rd2bc0e20eaa05a49-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
                <td colSpan={6} className="py-8 px-4 text-center text-xs text-muted-foreground" data-api-unique-id='compliancetable-racf7e7bf8eb4d1a0-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
                  No statutory compliance items matching the &quot;{statusFilter}&quot; filter criteria.
                </td>
              </tr> : filteredItems.map((item, index) => {
            const isSelected = selectedItem?.id === item.id;
            return <tr key={item.id} onClick={() => onSelectItem(item)} className={`cursor-pointer transition-colors hover:bg-secondary/40 ${isSelected ? "bg-secondary/70 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"}`} data-api-unique-id='compliancetable-r64d4c9dc7727c26f-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                    {/* Identifier & Legal Citation */}
                    <td className="py-3 px-3 align-top whitespace-nowrap" data-api-unique-id='compliancetable-r2b7be50b4e7a0136-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                      <div className="flex flex-col gap-1" data-api-unique-id='compliancetable-rf301647b58fe8462-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                        <span className="font-mono text-xs font-bold text-foreground" data-api-unique-id='compliancetable-r4d3d9a0ef4d10b4f-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-itemKey`} data-api-map-var-name='item'>
                          {item.itemKey}
                        </span>
                        <div className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border" data-api-unique-id='compliancetable-re6fc929dc8e61216-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                          <Scale className="h-3 w-3 text-accent" data-api-unique-id='compliancetable-rae06e5845ac0b5f4-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' />
                          <span data-api-unique-id='compliancetable-r912c19cdc6c616ec-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-legalRef`} data-api-map-var-name='item'>{item.legalRef}</span>
                        </div>
                      </div>
                    </td>

                    {/* Headline requirement & subtitle */}
                    <td className="py-3 px-3 align-top min-w-[200px]" data-api-unique-id='compliancetable-r2b70a082f17ff971-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                      <div className="flex flex-col gap-0.5 min-w-0" data-api-unique-id='compliancetable-r88d2efd530169304-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                        <span className="font-medium text-foreground text-sm" data-api-unique-id='compliancetable-r7a4698d90b6abc25-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-title`} data-api-map-var-name='item'>
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-2" data-api-unique-id='compliancetable-r1a06f1448917ae53-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-subtitle`} data-api-map-var-name='item'>
                          {item.subtitle}
                        </span>
                      </div>
                    </td>

                    {/* Configured Verified Value */}
                    <td className="py-3 px-3 align-top min-w-[190px]" data-api-unique-id='compliancetable-rbd3e58b412281341-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                      <div className="flex flex-col gap-1 min-w-0" data-api-unique-id='compliancetable-r4ff8d872370c58e4-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                        {item.fieldValue ? <div className="rounded border border-border bg-background p-1.5 font-mono text-xs text-foreground break-all" data-api-unique-id='compliancetable-r370713bae401ec16-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-fieldValue`} data-api-map-var-name='item'>
                            {item.fieldValue}
                          </div> : <span className="italic text-xs text-destructive" data-api-unique-id='compliancetable-re2f863485fc94004-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                            No verified value configured
                          </span>}
                      </div>
                    </td>

                    {/* Verification Status */}
                    <td className="py-3 px-3 align-top whitespace-nowrap text-center" data-api-unique-id='compliancetable-r73a9b395b23f41ff-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Last verified timestamp */}
                    <td className="py-3 px-3 align-top whitespace-nowrap text-right font-mono text-xs text-muted-foreground" data-api-unique-id='compliancetable-r8e3498f57e4a41f1-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-lastUpdated`} data-api-map-var-name='item'>
                      {item.lastUpdated}
                    </td>

                    {/* Quick Selection Action Indicator */}
                    <td className="py-3 px-3 align-middle text-center w-12" data-api-unique-id='compliancetable-re1eb0ed873b6d0df-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                      <button type="button" onClick={e => {
                  e.stopPropagation();
                  onSelectItem(item);
                }} className={`inline-flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} title="Audit and configure this item" data-api-unique-id='compliancetable-rda97e294b8f3b8c4-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1'>
                        <ChevronRight className="h-4 w-4" data-api-unique-id='compliancetable-rcb73b76e5325660c-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable' data-api-in-loop='1' />
                      </button>
                    </td>
                  </tr>;
          })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="flex flex-wrap items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground" data-api-unique-id='compliancetable-r45074f1a7827f1a1-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
        <span className="font-mono" data-api-unique-id='compliancetable-r2d771fac281a3cda-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
          Austrian Commercial Code Audit Standard: BGBl. I Nr. 194/1994 (GewO)
        </span>
        <span className="font-semibold text-foreground" data-api-unique-id='compliancetable-rc7a5c087e406b8d3-s3415574967' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceTable'>
          Vienna Handwerk Administrative Desk
        </span>
      </div>
    </div>;
}