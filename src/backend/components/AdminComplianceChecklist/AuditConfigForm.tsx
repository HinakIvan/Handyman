"use client";

import React, { useState, useEffect } from "react";
import { Scale, Save, CheckCircle2, Clock, AlertCircle, Building2, PhoneCall, MapPin, Calendar, Sparkles } from "lucide-react";
import { SetupChecklistItem, ComplianceStatus } from "@/backend/types/AdminComplianceChecklist";
import { toast } from "sonner";
interface AuditConfigFormProps {
  selectedItem: SetupChecklistItem | null;
  onUpdateItem: (id: string, fieldValue: string, status: ComplianceStatus) => void;
}
export default function AuditConfigForm({
  selectedItem,
  onUpdateItem
}: AuditConfigFormProps) {
  const [fieldValue, setFieldValue] = useState("");
  const [status, setStatus] = useState<ComplianceStatus>("PENDING");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state whenever selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      setFieldValue(selectedItem.fieldValue || "");
      setStatus(selectedItem.status || "PENDING");
    }
  }, [selectedItem]);
  if (!selectedItem) {
    return <div data-controller-name="Compliance Audit Workspace" className="flex min-w-0 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center text-card-foreground shadow-soft" data-api-unique-id='auditconfigform-r09215d531219a1f9-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
        <Scale className="h-10 w-10 text-muted-foreground/50" data-api-unique-id='auditconfigform-r6340a43d7350223a-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
        <h3 className="mt-2 font-header text-sm font-semibold text-foreground" data-api-unique-id='auditconfigform-rfd2732fd617ee690-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          No Item Selected for Audit
        </h3>
        <p className="mt-1 text-xs text-muted-foreground" data-api-unique-id='auditconfigform-ra4b62fb0b245520c-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          Select a compliance requirement row from the ledger to inspect legal citations and update verified records.
        </p>
      </div>;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdateItem(selectedItem.id, fieldValue, status);
      toast.success(`Compliance updated: ${selectedItem.itemKey} is now ${status}`);
    } catch {
      toast.error("Failed to persist compliance update.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const getQuickHelperInfo = (key: string) => {
    switch (key) {
      case "VAT_UID":
        return {
          icon: <Building2 className="h-4 w-4 text-primary" data-api-unique-id='auditconfigform-rb6f8d61e23c67d9e-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />,
          placeholder: "e.g. ATU78923412",
          hint: "Austrian Value Added Tax Identification (Umsatzsteuer-Identifikationsnummer). Must begin with 'ATU' followed by 8 alphanumeric characters.",
          formatExample: "ATU78923412 (Vienna Central Tax Office / Finanzamt Österreich)"
        };
      case "OFFICIAL_CONTACT":
        return {
          icon: <PhoneCall className="h-4 w-4 text-primary" data-api-unique-id='auditconfigform-r61e6f86dc916620e-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />,
          placeholder: "e.g. +43 1 512 3456 / dispo@wien-handwerk.at",
          hint: "Mandatory emergency hotline and operations contact required under Austrian E-Commerce Act (ECG) & GewO § 63.",
          formatExample: "+43 1 512 3456 (24/7 Dispatch Desk, 1010 Wien)"
        };
      case "REGISTERED_ADDRESS":
        return {
          icon: <MapPin className="h-4 w-4 text-primary" data-api-unique-id='auditconfigform-rc97e755062efe65b-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />,
          placeholder: "e.g. Kärntner Ring 12/Top 4, 1010 Wien, Commercial Court Vienna FN 543210x",
          hint: "Official registered commercial address registered at Handelsgericht Wien (Commercial Court of Vienna).",
          formatExample: "Kärntner Ring 12, 1010 Wien, Austria (Commercial Court Vienna FN 543210x)"
        };
      case "OPERATING_HOURS":
        return {
          icon: <Calendar className="h-4 w-4 text-primary" data-api-unique-id='auditconfigform-r3fe6936cdd96f915-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />,
          placeholder: "e.g. Mon-Fri 07:00-19:00, Sat 08:00-14:00 (Vienna Trade Registry Schedule)",
          hint: "Approved artisan service hours compliant with Austrian Labor and Opening Hours Regulations (Öffnungszeitengesetz).",
          formatExample: "Mon-Fri: 07:00-19:00 | Sat: 08:00-14:00 (Emergency On-Call 24/7)"
        };
      default:
        return {
          icon: <Scale className="h-4 w-4 text-primary" data-api-unique-id='auditconfigform-r52baa13221fc24bc-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />,
          placeholder: "Enter verified compliance record value...",
          hint: "Provide officially verified statutory details and commercial registry citation.",
          formatExample: "Official certified value"
        };
    }
  };
  const helper = getQuickHelperInfo(selectedItem.itemKey);
  return <div data-controller-name="Compliance Audit Workspace" className="flex min-w-0 flex-col rounded-lg border border-border bg-card text-card-foreground shadow-soft" data-api-unique-id='auditconfigform-rc9dd18b607715877-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
      {/* Header bar of audit workspace */}
      <div className="flex min-w-0 flex-col gap-2 border-b border-border p-4 bg-muted/30" data-api-unique-id='auditconfigform-rf5c2f8b26a19fd5d-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
        <div className="flex items-center justify-between gap-2" data-api-unique-id='auditconfigform-ra1d9de192563c5b0-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          <div className="flex items-center gap-2" data-api-unique-id='auditconfigform-rf161b8b97cf8fc96-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <span className="font-mono text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded border border-border" data-api-unique-id='auditconfigform-ra80997a23fdc5611-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              {selectedItem.itemKey}
            </span>
            <span className="text-xs font-semibold text-muted-foreground" data-api-unique-id='auditconfigform-r8dadd802dea0850b-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Audit & Verification</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground" data-api-unique-id='auditconfigform-r9c5324c7443e41a0-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            ID: {selectedItem.id.slice(0, 16)}...
          </span>
        </div>
        <h2 className="font-header text-base font-bold text-foreground" data-api-unique-id='auditconfigform-r371f58f4a4857880-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          {selectedItem.title}
        </h2>
        <p className="text-xs text-muted-foreground" data-api-unique-id='auditconfigform-rb298000f9ac5160b-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          {selectedItem.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-4 p-4" data-api-unique-id='auditconfigform-r3928259eccbfe145-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
        {/* Statutory Legal Citation Box */}
        <div className="flex min-w-0 flex-col gap-1.5 rounded-md border border-accent/20 bg-secondary/50 p-3 text-xs" data-api-unique-id='auditconfigform-rb2a7b00c4cd4d198-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          <div className="flex items-center gap-1.5 font-semibold text-foreground" data-api-unique-id='auditconfigform-rbc0a0a8b670645aa-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <Scale className="h-4 w-4 text-accent" data-api-unique-id='auditconfigform-rd05256b666e8eb30-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
            <span data-api-unique-id='auditconfigform-rb353c94d169df27d-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Statutory Legal Citation & Mandate</span>
          </div>
          <div className="font-mono text-xs text-foreground font-medium" data-api-unique-id='auditconfigform-r429bf9c4f43cc6c9-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            {selectedItem.legalRef}
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed" data-api-unique-id='auditconfigform-r5aedcd145fbb42ac-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            {helper.hint}
          </p>
        </div>

        {/* Configured Verified Business Value Input */}
        <div className="flex min-w-0 flex-col gap-1.5" data-api-unique-id='auditconfigform-r94a00d87273b0378-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          <label htmlFor="fieldValueInput" className="flex items-center justify-between text-xs font-semibold text-foreground" data-api-unique-id='auditconfigform-r1352db09c921a39a-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='auditconfigform-r89dfb71c3f6a0c22-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              {helper.icon}
              <span data-api-unique-id='auditconfigform-r1c1646cae18d4595-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Official Verified Record / Value</span>
            </span>
            <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='auditconfigform-r126d2845eff528f1-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              Statutory Field
            </span>
          </label>
          <textarea id="fieldValueInput" rows={3} value={fieldValue} onChange={e => setFieldValue(e.target.value)} placeholder={helper.placeholder} className="w-full rounded-md border border-input bg-background p-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required data-api-unique-id='auditconfigform-ra44d496405deea38-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
          <div className="flex items-center justify-between text-[11px] text-muted-foreground" data-api-unique-id='auditconfigform-r8dd70471d1a0779b-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <span className="font-mono truncate mr-2" data-api-unique-id='auditconfigform-r807229dfaf8b2e65-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Example: {helper.formatExample}</span>
            <button type="button" onClick={() => setFieldValue(helper.formatExample)} className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-primary hover:underline" data-api-unique-id='auditconfigform-r5a2739066dcab45d-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              <Sparkles className="h-3 w-3" data-api-unique-id='auditconfigform-r16e711cfc154619b-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
              Use Standard
            </button>
          </div>
        </div>

        {/* Verification Status Adjudication */}
        <div className="flex min-w-0 flex-col gap-2" data-api-unique-id='auditconfigform-r0b95507970c66ac4-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          <label className="text-xs font-semibold text-foreground" data-api-unique-id='auditconfigform-rc625228570183f3f-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            Verification Status Adjudication
          </label>
          <div className="grid grid-cols-3 gap-2" data-api-unique-id='auditconfigform-r656cf3d92b3f2544-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            {/* PENDING */}
            <button type="button" onClick={() => setStatus("PENDING")} className={`flex flex-col items-center justify-center gap-1 rounded-md border p-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${status === "PENDING" ? "border-destructive bg-destructive text-destructive-foreground font-bold shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='auditconfigform-r8144117adae30a55-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              <AlertCircle className="h-4 w-4" data-api-unique-id='auditconfigform-r3d4e3d871cd6094c-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
              <span data-api-unique-id='auditconfigform-r2cee0876ac32a484-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>PENDING</span>
            </button>

            {/* IN_REVIEW */}
            <button type="button" onClick={() => setStatus("IN_REVIEW")} className={`flex flex-col items-center justify-center gap-1 rounded-md border p-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${status === "IN_REVIEW" ? "border-warning bg-warning text-warning-foreground font-bold shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='auditconfigform-r7dd40daf2b8bb2cc-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              <Clock className="h-4 w-4" data-api-unique-id='auditconfigform-r6ff3965b70a800a7-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
              <span data-api-unique-id='auditconfigform-rf070dabc331e88df-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>IN_REVIEW</span>
            </button>

            {/* COMPLETED */}
            <button type="button" onClick={() => setStatus("COMPLETED")} className={`flex flex-col items-center justify-center gap-1 rounded-md border p-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${status === "COMPLETED" ? "border-success bg-success text-success-foreground font-bold shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='auditconfigform-r40dda9d2667b8563-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
              <CheckCircle2 className="h-4 w-4" data-api-unique-id='auditconfigform-rfd22e803bc3cd4e5-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
              <span data-api-unique-id='auditconfigform-r78438f623520830d-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>COMPLETED</span>
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground" data-api-unique-id='auditconfigform-r712d7a57f25e66ad-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            Selecting <strong className="text-foreground" data-api-unique-id='auditconfigform-rb756a1b5ee17ee2a-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>COMPLETED</strong> certifies the entry for Austrian municipal audits and automated invoice issuance.
          </p>
        </div>

        {/* Audit Timestamp & Inspector Metadata */}
        <div className="flex flex-col gap-1 rounded-md border border-border bg-muted/40 p-2.5 text-xs text-muted-foreground" data-api-unique-id='auditconfigform-r3d41158b794d6259-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          <div className="flex items-center justify-between" data-api-unique-id='auditconfigform-r985816219d122b62-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <span data-api-unique-id='auditconfigform-rbeb5a1decff4c1ba-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Last Audit Timestamp:</span>
            <span className="font-mono font-medium text-foreground" data-api-unique-id='auditconfigform-r332a1d47084461a5-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>{selectedItem.lastUpdated}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]" data-api-unique-id='auditconfigform-rdb463f0e9384c907-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <span data-api-unique-id='auditconfigform-r6a5b0c5d3a5b4cfc-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Auditing Authority:</span>
            <span className="font-medium text-foreground" data-api-unique-id='auditconfigform-r998ec145d59df7f5-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Wirtschaftskammer Wien (WKO) Standard</span>
          </div>
        </div>

        {/* Save and Submit Action Button */}
        <div className="flex items-center justify-end gap-2 border-t border-border pt-3" data-api-unique-id='auditconfigform-r477a8f25b8a77a98-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
          <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none" data-api-unique-id='auditconfigform-r0b2c9801f2bca897-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>
            <Save className="h-4 w-4" data-api-unique-id='auditconfigform-rf01303cf48b13cbb-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm' />
            <span data-api-unique-id='auditconfigform-r486703d50006e6ef-s2371371387' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/AuditConfigForm'>Save & Apply Verification</span>
          </button>
        </div>
      </form>
    </div>;
}