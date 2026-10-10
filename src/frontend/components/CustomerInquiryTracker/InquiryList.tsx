"use client";

import React from "react";
import { Calendar, Euro, Layers, MapPin, AlertCircle, PackageCheck, ChevronRight, Shield } from "lucide-react";
import type { QuoteRequest, InquiryStatus } from "@/frontend/types/CustomerInquiryTracker";
interface InquiryListProps {
  inquiries: QuoteRequest[];
  selectedId: string | null;
  onSelectInquiry: (inquiry: QuoteRequest) => void;
}
export const STATUS_CONFIG: Record<InquiryStatus, {
  label: string;
  de: string;
  badgeStyle: string;
  stepIndex: number;
}> = {
  NEW: {
    label: "New Request",
    de: "Neu erfasst",
    badgeStyle: "bg-muted text-muted-foreground",
    stepIndex: 1
  },
  CONTACTED: {
    label: "Contacted",
    de: "Erstkontakt",
    badgeStyle: "bg-info text-info-foreground",
    stepIndex: 2
  },
  ESTIMATE_SENT: {
    label: "Estimate Sent",
    de: "Kostenvoranschlag",
    badgeStyle: "bg-warning text-warning-foreground",
    stepIndex: 3
  },
  QUOTED: {
    label: "Quoted",
    de: "Festpreisangebot",
    badgeStyle: "bg-secondary text-secondary-foreground",
    stepIndex: 4
  },
  SCHEDULED: {
    label: "Scheduled",
    de: "Disponiert",
    badgeStyle: "bg-primary text-primary-foreground",
    stepIndex: 5
  },
  COMPLETED: {
    label: "Completed",
    de: "Abgenommen",
    badgeStyle: "bg-success text-success-foreground",
    stepIndex: 6
  }
};
export default function InquiryList({
  inquiries,
  selectedId,
  onSelectInquiry
}: InquiryListProps) {
  if (inquiries.length === 0) {
    return <div className="bg-card text-card-foreground border border-border rounded-md p-10 text-center space-y-3" data-api-unique-id='inquirylist-r6616a6267b2753e7-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList'>
        <Layers className="w-10 h-10 mx-auto text-muted-foreground stroke-1" data-api-unique-id='inquirylist-rbdee487b2f69838f-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' />
        <h3 className="text-base font-semibold font-header text-foreground" data-api-unique-id='inquirylist-r577265b0c0efdbd6-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList'>
          No matching quote requests
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto" data-api-unique-id='inquirylist-r29e0dd7c2e227e4b-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList'>
          No handyman work orders correspond to current tracking code or filter tab criteria.
        </p>
      </div>;
  }
  return <div className="space-y-3" data-api-unique-id='inquirylist-r404c9cb6c49fcdd2-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList'>
      {inquiries.map((item, index) => {
      const isSelected = item.id === selectedId;
      const statusMeta = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.NEW;
      const isMeister = item.serviceCategory?.craftClassification === "MEISTER_KOOPERATION";
      const dateDisplay = item.createdAtFormatted || (item.createdAt ? new Date(item.createdAt).toLocaleDateString("de-AT") : "");
      return <article key={item.id} onClick={() => onSelectInquiry(item)} className={`w-full text-left bg-card text-card-foreground border rounded-md p-4 transition-all duration-150 cursor-pointer shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary ring-1 ring-primary bg-secondary/20" : "border-border hover:border-primary/40"}`} data-api-unique-id='inquirylist-r29d9d7a05269ce51-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
            {/* Header: Tracking Code, Urgency Chip, Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5 mb-3" data-api-unique-id='inquirylist-r237e91ecb26901c9-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
              <div className="flex items-center gap-2 flex-wrap min-w-0" data-api-unique-id='inquirylist-r4e50e4c3cc1dd6f6-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className="font-mono text-xs font-bold tracking-tight text-foreground bg-muted px-2 py-0.5 rounded-sm border border-border" data-api-unique-id='inquirylist-r6e56364c0ba28138-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' data-api-bind-info={`inquiries-${index}-trackingCode`} data-api-map-var-name='item'>
                  {item.trackingCode}
                </span>
                {item.isUrgent && <span className="inline-flex items-center gap-1 bg-destructive text-destructive-foreground px-2 py-0.5 rounded-sm text-[11px] font-semibold tracking-wide uppercase" data-api-unique-id='inquirylist-radc350cf2ee54a83-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                    <AlertCircle className="w-3 h-3 shrink-0" data-api-unique-id='inquirylist-r85847b58572469a1-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                    Urgent / Eilauftrag
                  </span>}
                {dateDisplay && <span className="text-[11px] text-muted-foreground" data-api-unique-id='inquirylist-r138d4e2aaeed21ba-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                    {dateDisplay}
                  </span>}
              </div>

              <div className="flex items-center gap-2 shrink-0" data-api-unique-id='inquirylist-r5f085e508f2dd57f-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-semibold tracking-wide uppercase ${statusMeta.badgeStyle}`} data-api-unique-id='inquirylist-r45eb1a46df3b2feb-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  {statusMeta.label}
                </span>
              </div>
            </div>

            {/* Task Headline & Category */}
            <div className="space-y-1.5 mb-3" data-api-unique-id='inquirylist-r09ee8418578a0066-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
              <div className="flex items-start justify-between gap-2" data-api-unique-id='inquirylist-r231ad061fb0fc929-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <h4 className="font-header font-bold text-base text-foreground line-clamp-2" data-api-unique-id='inquirylist-r43b95c4de85ff208-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' data-api-bind-info={`inquiries-${index}-taskTitle`} data-api-map-var-name='item'>
                  {item.taskTitle}
                </h4>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-primary translate-x-1" : "text-muted-foreground"}`} data-api-unique-id='inquirylist-r67396f4fbf999046-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
              </div>

              {/* Service trade category & trade compliance mark */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground" data-api-unique-id='inquirylist-r8584d82315499600-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className="inline-flex items-center gap-1 font-medium text-foreground" data-api-unique-id='inquirylist-rb29ee893c3e22e14-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  <Layers className="w-3.5 h-3.5 text-primary" data-api-unique-id='inquirylist-rdb55eac0eb286185-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                  {item.serviceCategory?.titleEn || "Craft Service"}
                </span>
                <span className="text-border" data-api-unique-id='inquirylist-r5c81d229a201e34a-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>•</span>
                <span className="inline-flex items-center gap-1 text-[11px]" data-api-unique-id='inquirylist-r4cbc314a711504e2-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  <Shield className="w-3 h-3 text-accent" data-api-unique-id='inquirylist-r2b65a7bf599c7fbe-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                  {isMeister ? "Meister Kooperation (GewO)" : "Freies Handwerk"}
                </span>
              </div>
            </div>

            {/* Key Grid Data: District stamp, schedule, budget, materials */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-muted/60 p-2.5 rounded-sm border border-border/70" data-api-unique-id='inquirylist-r142bca7108a8c48a-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
              <div className="space-y-0.5 min-w-0" data-api-unique-id='inquirylist-r19bcbc4cccf3deee-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inquirylist-r70bfd9eea456e27f-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  District
                </span>
                <span className="font-semibold text-foreground truncate block inline-flex items-center gap-1" data-api-unique-id='inquirylist-r06dc786146ae8273-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  <MapPin className="w-3 h-3 text-primary shrink-0" data-api-unique-id='inquirylist-rf8e0aa8aa6359a2c-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                  {item.district?.districtCode} {item.district?.districtName}
                </span>
              </div>

              <div className="space-y-0.5 min-w-0" data-api-unique-id='inquirylist-r43adf5ffc4bde026-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inquirylist-r90775433bcc56c26-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  Target Date
                </span>
                <span className="font-medium text-foreground truncate block inline-flex items-center gap-1" data-api-unique-id='inquirylist-r3a689569bb1b1bd2-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' data-api-bind-info={`inquiries-${index}-preferredDate`} data-api-map-var-name='item'>
                  <Calendar className="w-3 h-3 text-muted-foreground shrink-0" data-api-unique-id='inquirylist-r067edaff4629ceed-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                  {item.preferredDate}
                </span>
              </div>

              <div className="space-y-0.5 min-w-0" data-api-unique-id='inquirylist-r7ee3a857e0a92353-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inquirylist-rb17590146d3e9577-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  Est. Budget
                </span>
                <span className="font-semibold text-foreground truncate block inline-flex items-center gap-1" data-api-unique-id='inquirylist-rfdcc4fdcc3da8d40-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' data-api-bind-info={`inquiries-${index}-estimatedBudgetEur`} data-api-map-var-name='item'>
                  <Euro className="w-3 h-3 text-foreground shrink-0" data-api-unique-id='inquirylist-ra3f7630286471111-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                  €{item.estimatedBudgetEur} ({item.estimatedHours}h)
                </span>
              </div>

              <div className="space-y-0.5 min-w-0" data-api-unique-id='inquirylist-r7e84e325d860a909-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inquirylist-r82a6f509312a5492-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  Materials
                </span>
                <span className="font-medium text-foreground truncate block inline-flex items-center gap-1" data-api-unique-id='inquirylist-rbaa775d7ffa31b6b-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1'>
                  <PackageCheck className="w-3 h-3 text-muted-foreground shrink-0" data-api-unique-id='inquirylist-racf0dc3643328806-s1620683780' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InquiryList' data-api-in-loop='1' />
                  {item.hasMaterials ? "Client-Supplied" : "Craftsman Sourced"}
                </span>
              </div>
            </div>
          </article>;
    })}
    </div>;
}