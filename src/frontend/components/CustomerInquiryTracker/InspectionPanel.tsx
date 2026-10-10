"use client";

import React from "react";
import { ShieldCheck, MapPin, User, Phone, Mail, Calendar, Clock, Euro, BadgeCheck, CheckCircle2, FileText, Printer, X, PackageCheck, PackageX, Flame } from "lucide-react";
import type { QuoteRequest, InquiryStatus } from "@/frontend/types/CustomerInquiryTracker";
import { STATUS_CONFIG } from "@/frontend/components/CustomerInquiryTracker/InquiryList";
interface InspectionPanelProps {
  inquiry: QuoteRequest | null;
  onCloseMobile?: () => void;
}
const DEFAULT_STATUS_CONFIG: Record<InquiryStatus, {
  label: string;
  de: string;
  stepIndex: number;
  badgeStyle: string;
}> = {
  NEW: {
    label: "Intake Registered",
    de: "Auftragseingang",
    stepIndex: 1,
    badgeStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50"
  },
  CONTACTED: {
    label: "Dispatch Callback",
    de: "Erstkontakt & Klärung",
    stepIndex: 2,
    badgeStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50"
  },
  ESTIMATE_SENT: {
    label: "Estimate Issued",
    de: "Kostenvoranschlag",
    stepIndex: 3,
    badgeStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50"
  },
  QUOTED: {
    label: "Binding Quote",
    de: "Verbindliches Angebot",
    stepIndex: 4,
    badgeStyle: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50"
  },
  SCHEDULED: {
    label: "Craftsman Dispatched",
    de: "Disponiert & Vor Ort",
    stepIndex: 5,
    badgeStyle: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/50"
  },
  COMPLETED: {
    label: "Inspection Sign-off",
    de: "Abnahme & Protokoll",
    stepIndex: 6,
    badgeStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
  }
};
const MILESTONES: Array<{
  status: InquiryStatus;
  title: string;
  de: string;
  desc: string;
}> = [{
  status: "NEW",
  title: "1. Intake Registered",
  de: "Auftragseingang",
  desc: "Inquiry logged into Viennese craftsmen dispatch ledger."
}, {
  status: "CONTACTED",
  title: "2. Dispatch Callback",
  de: "Erstkontakt & Klärung",
  desc: "Lead artisan reviewed Altbau specs and verified feasibility."
}, {
  status: "ESTIMATE_SENT",
  title: "3. Estimate Issued",
  de: "Kostenvoranschlag",
  desc: "Preliminary material and hourly breakdown delivered."
}, {
  status: "QUOTED",
  title: "4. Binding Quote",
  de: "Verbindliches Angebot",
  desc: "Fixed-scope pricing confirmed with Austrian GewO trade scope."
}, {
  status: "SCHEDULED",
  title: "5. Craftsman Dispatched",
  de: "Disponiert & Vor Ort",
  desc: "Artisan team scheduled for execution at Vienna address."
}, {
  status: "COMPLETED",
  title: "6. Inspection Sign-off",
  de: "Abnahme & Protokoll",
  desc: "Work order completed and handed over with guarantee receipt."
}];
export default function InspectionPanel({
  inquiry,
  onCloseMobile
}: InspectionPanelProps) {
  if (!inquiry) {
    return <div className="bg-card text-card-foreground border border-border rounded-md p-8 text-center space-y-3 sticky top-20" data-api-unique-id='inspectionpanel-r78bad25e4a0e8c4d-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
        <FileText className="w-10 h-10 mx-auto text-muted-foreground stroke-1" data-api-unique-id='inspectionpanel-rb5cd638f35f50f06-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
        <h3 className="font-header font-bold text-base text-foreground" data-api-unique-id='inspectionpanel-re187fa0144480632-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          No Inquiry Selected
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='inspectionpanel-ra372d27b74872dc4-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          Select any quote request from the left ledger to inspect comprehensive task specs, Altbau address verification, and milestone progress.
        </p>
      </div>;
  }
  const currentStatusMeta = STATUS_CONFIG && STATUS_CONFIG[inquiry.status] || DEFAULT_STATUS_CONFIG[inquiry.status] || DEFAULT_STATUS_CONFIG.NEW;
  const currentStep = currentStatusMeta.stepIndex || 1;
  const isMeister = inquiry.serviceCategory?.craftClassification === "MEISTER_KOOPERATION";
  const formattedDate = inquiry.createdAtFormatted || (inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("de-AT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }) : "—");
  return <div className="bg-card text-card-foreground border border-border rounded-md shadow-soft overflow-hidden sticky top-20" data-api-unique-id='inspectionpanel-r8eea9a5a8a70f4be-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
      {/* Dossier Header Stamp */}
      <div className="bg-secondary/40 border-b border-border p-4 sm:p-5" data-api-unique-id='inspectionpanel-r80438597bd3be332-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
        <div className="flex items-start justify-between gap-3" data-api-unique-id='inspectionpanel-rc341b579702a098b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <div className="space-y-1 min-w-0" data-api-unique-id='inspectionpanel-rc7b4257c95d5d50f-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <div className="flex items-center gap-2 flex-wrap" data-api-unique-id='inspectionpanel-r3c6fac4cb8eb31f2-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="font-mono text-xs font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-sm" data-api-unique-id='inspectionpanel-re91385f96197d0fc-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                {inquiry.trackingCode}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider" data-api-unique-id='inspectionpanel-r6e2c3f940dff3ebb-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Viennese Handwerker-Dossier
              </span>
            </div>
            <h3 className="text-lg font-bold font-header text-foreground truncate" data-api-unique-id='inspectionpanel-r1956a085c07081e1-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              {inquiry.taskTitle}
            </h3>
            <p className="text-xs text-muted-foreground" data-api-unique-id='inspectionpanel-r11b3b7b75ed24574-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              Submitted on {formattedDate} • Language:{" "}
              <span className="font-semibold text-foreground" data-api-unique-id='inspectionpanel-r3317782eca26b315-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                {inquiry.submissionLang}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0" data-api-unique-id='inspectionpanel-r793d8053f4e098fc-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <button type="button" onClick={() => window.print()} title="Print Dossier Receipt" className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors cursor-pointer" data-api-unique-id='inspectionpanel-ra76c6e02e1e27604-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <Printer className="w-4 h-4" data-api-unique-id='inspectionpanel-r9c2e1748b1dd940e-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
            </button>
            {onCloseMobile && <button type="button" onClick={onCloseMobile} className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted border border-border lg:hidden cursor-pointer" data-api-unique-id='inspectionpanel-r5de5049d03088fd7-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <X className="w-4 h-4" data-api-unique-id='inspectionpanel-r0ca1bf7d0a51b579-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
              </button>}
          </div>
        </div>

        {/* Current status pill highlight */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-border/60" data-api-unique-id='inspectionpanel-r8d43e5876a156507-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <span className="text-xs text-muted-foreground" data-api-unique-id='inspectionpanel-r5110140bcf2ec42c-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>Lifecycle Phase:</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-bold tracking-wide uppercase ${currentStatusMeta.badgeStyle}`} data-api-unique-id='inspectionpanel-re96e0aa43685ff3d-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <BadgeCheck className="w-3.5 h-3.5" data-api-unique-id='inspectionpanel-r5d0da963eade6d96-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
            {currentStatusMeta.label} ({currentStatusMeta.de})
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto" data-api-unique-id='inspectionpanel-r324a5edec3da58b5-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
        {/* SECTION 1: 6-Step Austrian Architectural Blueprint Milestone Timeline */}
        <div className="space-y-3" data-api-unique-id='inspectionpanel-r481f997dcc15697b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <div className="flex items-center justify-between gap-2" data-api-unique-id='inspectionpanel-r7b9d107872a189ca-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-header" data-api-unique-id='inspectionpanel-r9a7afe0adb656ca9-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              Fulfillment Milestones
            </h4>
            <span className="text-xs font-semibold text-foreground" data-api-unique-id='inspectionpanel-r834df699f867b02c-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              Step {currentStep} of 6
            </span>
          </div>

          <div className="relative pl-6 space-y-4 border-l-2 border-border ml-2" data-api-unique-id='inspectionpanel-r1bb056d81984062c-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            {MILESTONES.map((step, index) => {
            const stepNum = index + 1;
            const isPast = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return <div key={step.status} className="relative group" data-api-unique-id='inspectionpanel-reae05a8c473c8528-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1'>
                  {/* Timeline indicator node */}
                  <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center transition-colors ${isPast ? "bg-emerald-600 text-white" : isCurrent ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground border border-border"}`} data-api-unique-id='inspectionpanel-r7bafc9fce7b6a5ae-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1'>
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" data-api-unique-id='inspectionpanel-r1d04d3073b4b9ed6-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1' /> : <span className="text-[9px] font-bold font-mono" data-api-unique-id='inspectionpanel-r9dc0f68efa956f7b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1'>
                        {stepNum}
                      </span>}
                  </div>

                  <div className="space-y-0.5" data-api-unique-id='inspectionpanel-ra4cd7c99e357b033-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1'>
                    <div className="flex items-baseline justify-between gap-2" data-api-unique-id='inspectionpanel-r2141995e80542bb8-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1'>
                      <span className={`text-xs font-bold ${isCurrent ? "text-primary font-header" : isPast ? "text-foreground" : "text-muted-foreground"}`} data-api-unique-id='inspectionpanel-r4cebaa2d45c15014-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1' data-api-bind-info={`MILESTONES-${index}-title`} data-api-map-var-name='step'>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium" data-api-unique-id='inspectionpanel-r9963c6b839533d39-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1' data-api-bind-info={`MILESTONES-${index}-de`} data-api-map-var-name='step'>
                        {step.de}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-normal" data-api-unique-id='inspectionpanel-r6475bd7987bb99ed-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' data-api-in-loop='1' data-api-bind-info={`MILESTONES-${index}-desc`} data-api-map-var-name='step'>
                      {step.desc}
                    </p>
                  </div>
                </div>;
          })}
          </div>
        </div>

        {/* SECTION 2: Altbau Street Address & Contact Details */}
        <div className="space-y-3 border-t border-border pt-4" data-api-unique-id='inspectionpanel-r6d28d508fd6fc1bb-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-header" data-api-unique-id='inspectionpanel-r6a0a7705f4f2fa10-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            Site Location & Contact
          </h4>

          <div className="bg-muted/70 rounded-md p-3.5 space-y-3 border border-border" data-api-unique-id='inspectionpanel-r1ac5ab43670abf59-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <div className="flex items-start gap-2.5" data-api-unique-id='inspectionpanel-r222fd6d613e21107-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" data-api-unique-id='inspectionpanel-r56cf214eacbfe0d7-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
              <div className="text-xs space-y-0.5 min-w-0" data-api-unique-id='inspectionpanel-r6b90ec30f4a35bea-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <span className="font-bold text-foreground block" data-api-unique-id='inspectionpanel-r7662ff5c3e1bd9a9-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                  {inquiry.addressSnippet}
                </span>
                <span className="text-muted-foreground block" data-api-unique-id='inspectionpanel-r1c1b666f68d91e4b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                  District {inquiry.district?.districtCode} (
                  {inquiry.district?.districtName}), Vienna
                </span>
                <span className="inline-block bg-accent/10 text-accent font-semibold text-[10px] px-1.5 py-0.5 rounded-sm mt-1" data-api-unique-id='inspectionpanel-r3fb26635e0d53159-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                  Logistics Zone: {inquiry.district?.zone ? inquiry.district.zone.replace(/_/g, " ") : "STANDARD"} • Lead time: ~{inquiry.district?.leadTimeHours ?? 24}h
                </span>
              </div>
            </div>

            <div className="border-t border-border/60 pt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" data-api-unique-id='inspectionpanel-ref8ac73f6339506d-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <div className="flex items-center gap-2" data-api-unique-id='inspectionpanel-re09468552999d35b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" data-api-unique-id='inspectionpanel-r4d8e77e094713217-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                <span className="text-foreground truncate font-medium" data-api-unique-id='inspectionpanel-r6f241daa644197d4-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                  {inquiry.clientName}
                </span>
              </div>
              <div className="flex items-center gap-2" data-api-unique-id='inspectionpanel-r79e85c8c401b6ca2-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" data-api-unique-id='inspectionpanel-r47a7605da309e699-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                <span className="text-foreground truncate font-mono text-[11px]" data-api-unique-id='inspectionpanel-re070438e2eff3f62-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                  {inquiry.clientPhone}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2" data-api-unique-id='inspectionpanel-r16c20806d38c9d98-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" data-api-unique-id='inspectionpanel-rfad496f4f15522ca-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                <span className="text-foreground truncate font-mono text-[11px]" data-api-unique-id='inspectionpanel-ra3288b4930901ad3-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                  {inquiry.clientEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Task Description & Specifications */}
        <div className="space-y-3 border-t border-border pt-4" data-api-unique-id='inspectionpanel-r1dace155bdbf38a3-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-header" data-api-unique-id='inspectionpanel-ra72f09b437995839-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            Task Description & Work Scope
          </h4>

          <div className="text-xs text-foreground bg-background p-3.5 rounded-md border border-input leading-relaxed whitespace-pre-wrap" data-api-unique-id='inspectionpanel-r790cab1fe7e6a9a5-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            {inquiry.taskDescription}
          </div>

          {inquiry.scopeNotes && <div className="bg-secondary/40 text-secondary-foreground p-3 rounded-md text-xs border border-border space-y-1" data-api-unique-id='inspectionpanel-r774941922d212dc5-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="font-semibold block uppercase tracking-wide text-[10px] text-muted-foreground" data-api-unique-id='inspectionpanel-r8c1ddc7d92a5b125-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Artisan Scope Notes:
              </span>
              <p className="leading-relaxed" data-api-unique-id='inspectionpanel-r26e704943fd401b1-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>{inquiry.scopeNotes}</p>
            </div>}
        </div>

        {/* SECTION 4: Estimate & Technical Schedule Summary */}
        <div className="space-y-3 border-t border-border pt-4" data-api-unique-id='inspectionpanel-re9648556585fa357-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-header" data-api-unique-id='inspectionpanel-r50d0778fa1289b51-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            Calculation & Timing
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs" data-api-unique-id='inspectionpanel-rf7f0ef87a1aa2466-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <div className="p-3 rounded-md bg-muted/60 border border-border" data-api-unique-id='inspectionpanel-r7b4f3a6997c03d9b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inspectionpanel-r70686c08d82d7270-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Estimated Hours
              </span>
              <span className="text-sm font-bold font-header text-foreground flex items-center gap-1 mt-0.5" data-api-unique-id='inspectionpanel-r03db72149729ae3e-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <Clock className="w-3.5 h-3.5 text-primary" data-api-unique-id='inspectionpanel-rbb27f0dc06b0146e-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                {inquiry.estimatedHours} Hours
              </span>
            </div>

            <div className="p-3 rounded-md bg-muted/60 border border-border" data-api-unique-id='inspectionpanel-r8407c9a303833c68-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inspectionpanel-rd3fe860a965e938f-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Estimated Budget
              </span>
              <span className="text-sm font-bold font-header text-foreground flex items-center gap-1 mt-0.5" data-api-unique-id='inspectionpanel-rc8f373830f5ea79a-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <Euro className="w-3.5 h-3.5 text-primary" data-api-unique-id='inspectionpanel-r2eaf5cdcd8c1f4bd-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                €{inquiry.estimatedBudgetEur} (excl. VAT)
              </span>
            </div>

            <div className="p-3 rounded-md bg-muted/60 border border-border" data-api-unique-id='inspectionpanel-ra249daad3fdcf505-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inspectionpanel-r424c15b53d779cac-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Preferred Date
              </span>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1 mt-0.5" data-api-unique-id='inspectionpanel-r61d558d5ff9a8930-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='inspectionpanel-r27feffd0f5551f3c-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                {inquiry.preferredDate}
              </span>
            </div>

            <div className="p-3 rounded-md bg-muted/60 border border-border" data-api-unique-id='inspectionpanel-re4fbb1c1ca18dc95-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inspectionpanel-rec1def198d94011b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Time Window
              </span>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1 mt-0.5" data-api-unique-id='inspectionpanel-r31105591b41f81f8-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <Clock className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='inspectionpanel-rb0e1c964eda2d2b9-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                {inquiry.preferredTimeSlot}
              </span>
            </div>

            <div className="p-3 rounded-md bg-muted/60 border border-border" data-api-unique-id='inspectionpanel-r661cbafb4e81d304-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inspectionpanel-r341376d210514945-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Material Provision
              </span>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1 mt-0.5" data-api-unique-id='inspectionpanel-re6b5e2bd3978da4a-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                {inquiry.hasMaterials ? <>
                    <PackageCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" data-api-unique-id='inspectionpanel-ra612ca8382075722-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                    Self-Supplied
                  </> : <>
                    <PackageX className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='inspectionpanel-r6eeb3a128826e191-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
                    Craftsman Sourced
                  </>}
              </span>
            </div>

            <div className="p-3 rounded-md bg-muted/60 border border-border" data-api-unique-id='inspectionpanel-r85caea0fe067fdd6-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block" data-api-unique-id='inspectionpanel-re74af8c824bed427-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Priority Tier
              </span>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1 mt-0.5" data-api-unique-id='inspectionpanel-rfbf8d7750cdad31e-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                {inquiry.isUrgent ? <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1" data-api-unique-id='inspectionpanel-r7f5d1bd4b12e19ce-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                    <Flame className="w-3.5 h-3.5" data-api-unique-id='inspectionpanel-r444a79b98ef4ddb9-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' /> Express Dispatch
                  </span> : <span className="text-muted-foreground" data-api-unique-id='inspectionpanel-r825947091472f692-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>Standard Schedule</span>}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 5: Legal Scope & GewO Compliance Stamp */}
        <div className="space-y-2 border-t border-border pt-4" data-api-unique-id='inspectionpanel-r6bb2299634811bb2-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
          <div className="flex items-start gap-2 bg-muted p-3 rounded-md border border-border text-xs" data-api-unique-id='inspectionpanel-rbde5a31c8215bd1d-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
            <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" data-api-unique-id='inspectionpanel-r5e973b1fe0a3e08b-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel' />
            <div className="space-y-1 min-w-0" data-api-unique-id='inspectionpanel-redbc757e56b675d6-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
              <span className="font-bold text-foreground block" data-api-unique-id='inspectionpanel-r72ca0d7d3f268b03-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                Austrian Trade Law & Legal Compliance
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed" data-api-unique-id='inspectionpanel-re683f886f49667d0-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                {isMeister ? "Regulated trade execution in formal partnership with Austrian Meisterbetriebe under Gewerbeordnung (GewO)." : "Certified free trade craft execution (Freies Handwerk) conforming to Viennese artisan quality guidelines."}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground font-mono flex-wrap" data-api-unique-id='inspectionpanel-r9d2257aa3f0144d8-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>
                <span data-api-unique-id='inspectionpanel-r86ecfcb63bd38d3c-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>Terms Agreed: {inquiry.agreedToTerms ? "YES (WKO AGB)" : "NO"}</span>
                <span data-api-unique-id='inspectionpanel-ree24166631d797b6-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>•</span>
                <span data-api-unique-id='inspectionpanel-r0842d5a0d080a7d0-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>Category: {inquiry.serviceCategory?.titleEn || inquiry.serviceCategory?.key}</span>
                {inquiry.serviceCategory?.leadArtisan && <>
                    <span data-api-unique-id='inspectionpanel-r626b4b7908e1087c-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>•</span>
                    <span data-api-unique-id='inspectionpanel-rf331104a6e435081-s1838688517' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/InspectionPanel'>Lead Artisan: {inquiry.serviceCategory.leadArtisan}</span>
                  </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}