"use client";

import React from "react";
import { Search, ArrowUpDown } from "lucide-react";
import type { InquiryStatus, SortOption } from "@/frontend/types/CustomerInquiryTracker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusTab: "ALL" | InquiryStatus;
  onStatusTabChange: (status: "ALL" | InquiryStatus) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  statusCounts: Record<"ALL" | InquiryStatus, number>;
}
const STATUS_TABS: Array<{
  id: "ALL" | InquiryStatus;
  label: string;
  de: string;
}> = [{
  id: "ALL",
  label: "All Records",
  de: "Alle"
}, {
  id: "NEW",
  label: "New",
  de: "Neu eingegangen"
}, {
  id: "CONTACTED",
  label: "Contacted",
  de: "Erstkontakt"
}, {
  id: "ESTIMATE_SENT",
  label: "Estimate Sent",
  de: "Kostenvoranschlag"
}, {
  id: "QUOTED",
  label: "Quoted",
  de: "Festpreisangebot"
}, {
  id: "SCHEDULED",
  label: "Scheduled",
  de: "Disponiert"
}, {
  id: "COMPLETED",
  label: "Completed",
  de: "Abgenommen"
}];
export default function InquiryToolbar({
  searchQuery,
  onSearchChange,
  statusTab,
  onStatusTabChange,
  sortBy,
  onSortByChange,
  statusCounts
}: ToolbarProps) {
  return <div className="bg-card text-card-foreground border border-border rounded-md p-4 space-y-4 shadow-soft" data-api-unique-id='inquirytoolbar-r34a02fc535ca3b2e-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
      {/* Top row: Search input + Sorting selector */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3" data-api-unique-id='inquirytoolbar-r551250e930d51684-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
        <div className="relative flex-1 min-w-0" data-api-unique-id='inquirytoolbar-ref8a5b09dd14bb3c-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" data-api-unique-id='inquirytoolbar-r53769fec65804d05-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' />
          <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search by tracking code (e.g. VIE-2025-0841) or task headline..." className="w-full bg-background text-foreground border border-input rounded-md pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='inquirytoolbar-r47abd0fecfc10e9f-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' />
        </div>

        <div className="flex items-center gap-2 shrink-0" data-api-unique-id='inquirytoolbar-rd487eca7f810b9d1-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1" data-api-unique-id='inquirytoolbar-r52e605d049f22258-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
            <ArrowUpDown className="w-3.5 h-3.5" data-api-unique-id='inquirytoolbar-r913b1de0e8351938-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' />
            <span className="font-medium whitespace-nowrap" data-api-unique-id='inquirytoolbar-rbcb4b229a5f21941-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>Order:</span>
          </div>
          <Select value={sortBy} onValueChange={val => onSortByChange(val as SortOption)} data-api-unique-id='inquirytoolbar-r92f067b576349355-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
            <SelectTrigger className="w-[190px] h-9 text-xs bg-background text-foreground border-input" data-api-unique-id='inquirytoolbar-r0700c1bd45bf7787-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
              <SelectValue placeholder="Sort quotes..." data-api-unique-id='inquirytoolbar-r64f337b1314c78af-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground" data-api-unique-id='inquirytoolbar-re3260df82403a2f7-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
              <SelectItem value="date-desc" data-api-unique-id='inquirytoolbar-r7572dbecd092e382-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>Newest Submission</SelectItem>
              <SelectItem value="date-asc" data-api-unique-id='inquirytoolbar-r49f5047d72d94dda-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>Oldest Submission</SelectItem>
              <SelectItem value="urgency" data-api-unique-id='inquirytoolbar-r283349bcb61d46d4-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>Urgency First</SelectItem>
              <SelectItem value="budget-desc" data-api-unique-id='inquirytoolbar-ra4bb94ed1d22ae88-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>Highest Budget (€)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bottom row: Lifecycle status tabs bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin" data-api-unique-id='inquirytoolbar-rd9e514a9d7a7ea56-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar'>
        {STATUS_TABS.map((tab, index) => {
        const isActive = statusTab === tab.id;
        const count = statusCounts[tab.id] ?? 0;
        return <button key={tab.id} type="button" onClick={() => onStatusTabChange(tab.id)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "bg-primary text-primary-foreground font-semibold shadow-soft" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='inquirytoolbar-r308efcc9f3534602-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' data-api-in-loop='1'>
              <span data-api-unique-id='inquirytoolbar-rb4d850b5ee3bebb1-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' data-api-in-loop='1' data-api-bind-info={`STATUS_TABS-${index}-label`} data-api-map-var-name='tab'>{tab.label}</span>
              <span className={`inline-flex items-center justify-center min-w-4 px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? "bg-white text-foreground font-bold" : "bg-card text-muted-foreground"}`} data-api-unique-id='inquirytoolbar-r6e8b2ae264faad9b-s825255578' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryToolbar' data-api-in-loop='1'>
                {count}
              </span>
            </button>;
      })}
      </div>
    </div>;
}