"use client";

import React from "react";
import { FileText, Clock, Hammer, CheckCircle2 } from "lucide-react";
import type { InquiryMetrics } from "@/frontend/types/CustomerInquiryTracker";
interface MetricsOverviewProps {
  metrics: InquiryMetrics;
  activeFilterTab?: string;
  onMetricClick?: (statusGroup: "ALL" | "REVIEW" | "IN_PROGRESS" | "COMPLETED") => void;
}
export default function MetricsOverview({
  metrics,
  activeFilterTab,
  onMetricClick
}: MetricsOverviewProps) {
  const cards = [{
    id: "ALL" as const,
    label: "Total Submitted",
    germanSubtext: "Aufträge Gesamt",
    value: metrics?.totalSubmitted ?? 0,
    icon: FileText,
    accentColor: "border-border",
    badgeText: "Archive",
    badgeColor: "bg-muted text-muted-foreground"
  }, {
    id: "REVIEW" as const,
    label: "Review & Estimates",
    germanSubtext: "In Prüfung / Schätzung",
    value: metrics?.activeReview ?? 0,
    icon: Clock,
    accentColor: "border-warning/40",
    badgeText: "Phase 1–3",
    badgeColor: "bg-warning text-warning-foreground"
  }, {
    id: "IN_PROGRESS" as const,
    label: "Booked & In Execution",
    germanSubtext: "Disponiert & Montage",
    value: metrics?.inProgress ?? 0,
    icon: Hammer,
    accentColor: "border-primary/40",
    badgeText: "Scheduled",
    badgeColor: "bg-primary text-primary-foreground"
  }, {
    id: "COMPLETED" as const,
    label: "Fulfilled & Inspected",
    germanSubtext: "Erfolgreich Abgenommen",
    value: metrics?.completed ?? 0,
    icon: CheckCircle2,
    accentColor: "border-success/40",
    badgeText: "Signed Off",
    badgeColor: "bg-success text-success-foreground"
  }];
  return <div data-controller-name="Customer Inquiry Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-api-unique-id='metricsoverview-r8377306dbfece4ec-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview'>
      {cards.map((card, index) => {
      const Icon = card.icon;
      const isActive = activeFilterTab === card.id;
      return <button key={card.id} type="button" onClick={() => onMetricClick?.(card.id)} className={`w-full text-left bg-card text-card-foreground border rounded-md p-5 shadow-soft transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "ring-2 ring-primary border-primary" : card.accentColor} hover:border-primary/60`} data-api-unique-id='metricsoverview-rfa9c8086d9b313c9-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1'>
            <div className="flex items-start justify-between gap-3" data-api-unique-id='metricsoverview-r59f52ee954b9d0d0-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1'>
              <div className="space-y-1 min-w-0" data-api-unique-id='metricsoverview-rdfb136a736cc766f-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1'>
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground" data-api-unique-id='metricsoverview-re180b410b7cc0bcb-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-label`} data-api-map-var-name='card'>
                  {card.label}
                </span>
                <p className="text-2xl font-bold font-header tracking-tight text-foreground" data-api-unique-id='metricsoverview-rcfc319d0db3ff164-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-value`} data-api-map-var-name='card'>
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground" data-api-unique-id='metricsoverview-r36c3df521d7e4b32-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-germanSubtext`} data-api-map-var-name='card'>
                  {card.germanSubtext}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0" data-api-unique-id='metricsoverview-rabc00229be7bcd65-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1'>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-semibold tracking-wide uppercase ${card.badgeColor}`} data-api-unique-id='metricsoverview-r9bba039907cfeca1-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-badgeText`} data-api-map-var-name='card'>
                  {card.badgeText}
                </span>
                <div className="p-2 rounded-sm bg-muted text-muted-foreground" data-api-unique-id='metricsoverview-r8e4ad3440de17619-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1'>
                  <Icon className="w-4 h-4" data-api-bind-info={`cards-${index}-icon`} data-api-map-var-name='card' data-api-unique-id='metricsoverview-r6894fa9d53798fe1-s3298117602' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/MetricsOverview' data-api-in-loop='1' />
                </div>
              </div>
            </div>
          </button>;
    })}
    </div>;
}