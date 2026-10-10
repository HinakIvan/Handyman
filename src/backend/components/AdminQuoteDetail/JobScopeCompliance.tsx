"use client";

import React, { useState } from "react";
import { QuoteRequestDetailDTO, PreferredTimeSlot } from "@/backend/types/AdminQuoteDetail";
import { ShieldCheck, Award, UserCheck, Calendar, Clock, Hammer, FileText, Boxes, Edit3, Check, X, AlertCircle, Building2 } from "lucide-react";
import { toast } from "sonner";
interface JobScopeComplianceProps {
  quote: QuoteRequestDetailDTO;
  onUpdateQuote: (updates: Partial<QuoteRequestDetailDTO>) => void;
}
const TIME_SLOT_LABELS: Record<PreferredTimeSlot, {
  label: string;
  hours: string;
}> = {
  MORNING: {
    label: "Morning Slot",
    hours: "08:00 - 12:00"
  },
  AFTERNOON: {
    label: "Afternoon Slot",
    hours: "13:00 - 17:00"
  },
  FLEXIBLE: {
    label: "Flexible Day",
    hours: "Full Day Window"
  }
};
export default function JobScopeCompliance({
  quote,
  onUpdateQuote
}: JobScopeComplianceProps) {
  const isCompleted = quote.status === "COMPLETED";

  // Editable fields for task title, description & materials
  const [isEditingScope, setIsEditingScope] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(quote.taskTitle);
  const [editDesc, setEditDesc] = useState<string>(quote.taskDescription);
  const [editHasMaterials, setEditHasMaterials] = useState<boolean>(quote.hasMaterials);
  const isMeister = quote.serviceCategory.craftClassification === "MEISTER_KOOPERATION";
  const handleStartEdit = () => {
    if (isCompleted) return;
    setEditTitle(quote.taskTitle);
    setEditDesc(quote.taskDescription);
    setEditHasMaterials(quote.hasMaterials);
    setIsEditingScope(true);
  };
  const handleSaveScope = () => {
    if (isCompleted) return;
    onUpdateQuote({
      taskTitle: editTitle,
      taskDescription: editDesc,
      hasMaterials: editHasMaterials
    });
    setIsEditingScope(false);
    toast.success("Job specification & Altbau parameters updated successfully");
  };
  const handleCancelScope = () => {
    setEditTitle(quote.taskTitle);
    setEditDesc(quote.taskDescription);
    setEditHasMaterials(quote.hasMaterials);
    setIsEditingScope(false);
  };
  return <div data-controller-name="Job Scope and Trade Compliance Specification Panel" className="flex w-full min-w-0 flex-col gap-5 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-6" data-api-unique-id='jobscopecompliance-r3a270eabb65a57dc-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
      {/* Header with Austrian Trade Compliance Badge */}
      <div className="flex min-w-0 flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='jobscopecompliance-r939c05c47e85d821-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
        <div className="flex min-w-0 items-center gap-2.5" data-api-unique-id='jobscopecompliance-rbb08f7b54fc1bbf7-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground" data-api-unique-id='jobscopecompliance-r0e93f52230a2583f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <Hammer className="h-5 w-5" data-api-unique-id='jobscopecompliance-r4ee16df349b2d0fb-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
          </div>
          <div className="flex min-w-0 flex-col" data-api-unique-id='jobscopecompliance-r2a60366ca125331f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <h2 className="font-header text-base font-bold tracking-tight text-foreground lg:text-lg" data-api-unique-id='jobscopecompliance-r31c8536e93e7f9b7-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              Job Scope & Austrian Trade Compliance
            </h2>
            <p className="text-xs text-muted-foreground" data-api-unique-id='jobscopecompliance-r72f6809e5200723d-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              Austrian GewO 1994 trade classification & on-site technical inspection
            </p>
          </div>
        </div>

        {/* GewO 1994 Compliance Seal */}
        <div className="flex shrink-0 items-center gap-2" data-api-unique-id='jobscopecompliance-r6623d92a6add6186-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          {isMeister ? <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground" data-api-unique-id='jobscopecompliance-rcd4ecf4e3c9fe1cf-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <Award className="h-3.5 w-3.5 text-warning" data-api-unique-id='jobscopecompliance-rd12605af17226d58-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
              <span data-api-unique-id='jobscopecompliance-r7ff0dfac02e2c0d0-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>MEISTER-KOOPERATION (Reglementiertes Gewerbe)</span>
            </div> : <div className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-bold text-foreground border border-border" data-api-unique-id='jobscopecompliance-rd1ec80c1ee770274-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <ShieldCheck className="h-3.5 w-3.5 text-success" data-api-unique-id='jobscopecompliance-r332a52bd49d55f4f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
              <span data-api-unique-id='jobscopecompliance-r284133f225157b6e-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>FREIES HANDWERK (Austrian GewO §5)</span>
            </div>}
        </div>
      </div>

      {/* Multilingual Service Category Meta Bar */}
      <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-muted p-3 text-xs" data-api-unique-id='jobscopecompliance-r026c4e62ef31b8db-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
        <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='jobscopecompliance-r56ad403269367ff6-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          <span className="font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='jobscopecompliance-r1f276f1ad3b4979b-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            Service Category Reference: {quote.serviceCategory.key}
          </span>
          <span className="font-mono text-xs" data-api-unique-id='jobscopecompliance-r4ea9afcb72bd7d0a-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            Ref ID: {quote.serviceCategoryId}
          </span>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-3" data-api-unique-id='jobscopecompliance-rf49396f68c864d85-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          <div className="flex flex-col rounded bg-card p-2 border border-border" data-api-unique-id='jobscopecompliance-rfb1fb3737dcd10a6-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <span className="text-[10px] font-bold text-muted-foreground uppercase" data-api-unique-id='jobscopecompliance-r44ca43f2f8593fed-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              DE (German)
            </span>
            <span className="font-medium text-foreground" data-api-unique-id='jobscopecompliance-r36caea49cf8d1feb-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              {quote.serviceCategory.titleDe}
            </span>
          </div>
          <div className="flex flex-col rounded bg-card p-2 border border-border" data-api-unique-id='jobscopecompliance-r2c293cc6ad1cba1f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <span className="text-[10px] font-bold text-muted-foreground uppercase" data-api-unique-id='jobscopecompliance-r696980f4b7d78330-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              EN (English)
            </span>
            <span className="font-medium text-foreground" data-api-unique-id='jobscopecompliance-r9226bb2c7a5eec25-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              {quote.serviceCategory.titleEn}
            </span>
          </div>
          <div className="flex flex-col rounded bg-card p-2 border border-border" data-api-unique-id='jobscopecompliance-r1d0071df23d66502-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <span className="text-[10px] font-bold text-muted-foreground uppercase" data-api-unique-id='jobscopecompliance-rb719c817fd4993c3-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              RU (Russian)
            </span>
            <span className="font-medium text-foreground" data-api-unique-id='jobscopecompliance-rc45b2c79f0ba1229-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              {quote.serviceCategory.titleRu}
            </span>
          </div>
        </div>

        {/* Lead Artisan Assignment */}
        {quote.serviceCategory.leadArtisan && <div className="flex items-center gap-2 pt-1 text-muted-foreground" data-api-unique-id='jobscopecompliance-r0c913bc6d18a8ea0-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <UserCheck className="h-4 w-4 text-primary shrink-0" data-api-unique-id='jobscopecompliance-ra9fcac95fc73fa3f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
            <span data-api-unique-id='jobscopecompliance-r3e864a80d3d10237-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              Designated Master Craftsman:{" "}
              <strong className="text-foreground font-semibold" data-api-unique-id='jobscopecompliance-r170dc8f66f2fb265-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                {quote.serviceCategory.leadArtisan}
              </strong>
            </span>
          </div>}
      </div>

      {/* Customer Job Scope & Altbau Specification */}
      <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4" data-api-unique-id='jobscopecompliance-r6cb7d26cf4d3f961-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
        <div className="flex items-center justify-between" data-api-unique-id='jobscopecompliance-ree64a9af54b077ba-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          <div className="flex items-center gap-2" data-api-unique-id='jobscopecompliance-re1780fe388e599fc-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <FileText className="h-4 w-4 text-primary" data-api-unique-id='jobscopecompliance-ra507687ab62f48b2-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='jobscopecompliance-r67febaa308b35d51-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              Customer Work Request & Site Conditions
            </h3>
          </div>

          {!isCompleted && !isEditingScope && <button type="button" onClick={handleStartEdit} className="inline-flex cursor-pointer items-center gap-1 rounded bg-muted px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='jobscopecompliance-rf1b0d24da4f45728-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <Edit3 className="h-3 w-3" data-api-unique-id='jobscopecompliance-r98272186d0641007-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
              <span data-api-unique-id='jobscopecompliance-r507c2d170b5fbe0f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>Edit Task Details</span>
            </button>}
        </div>

        {isEditingScope ? <div className="flex min-w-0 flex-col gap-3 pt-1" data-api-unique-id='jobscopecompliance-r5f24091b0075da1c-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <div className="flex flex-col gap-1" data-api-unique-id='jobscopecompliance-r5ea8b3e18eb64119-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='jobscopecompliance-r413ec272c0655c45-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                Task Title
              </label>
              <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='jobscopecompliance-r95006db1be21c9f6-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
            </div>

            <div className="flex flex-col gap-1" data-api-unique-id='jobscopecompliance-r0b366a9085005b32-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='jobscopecompliance-r658e945a09091db8-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                Comprehensive Scope & Altbau Building Notes (Ceilings, Wall types, Scaffolding)
              </label>
              <textarea rows={4} value={editDesc} onChange={e => setEditDesc(e.target.value)} className="rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='jobscopecompliance-r5cad6cb8e45e65c8-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
            </div>

            <div className="flex items-center gap-2 pt-1" data-api-unique-id='jobscopecompliance-r7e1eb75951b65cd6-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <input type="checkbox" id="editHasMaterials" checked={editHasMaterials} onChange={e => setEditHasMaterials(e.target.checked)} className="h-4 w-4 rounded border-border text-primary focus-visible:ring-ring" data-api-unique-id='jobscopecompliance-r3bb0c64d570199bd-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
              <label htmlFor="editHasMaterials" className="text-xs font-medium text-foreground cursor-pointer" data-api-unique-id='jobscopecompliance-rdb11a32d0164adb2-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                Client supplies all primary fixtures, fittings, and paint
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border" data-api-unique-id='jobscopecompliance-re4f701d7a2295929-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <button type="button" onClick={handleCancelScope} className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='jobscopecompliance-rf49cde488fd1b002-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                <X className="h-3.5 w-3.5" data-api-unique-id='jobscopecompliance-r2f940ad56e3056fa-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
                <span data-api-unique-id='jobscopecompliance-r5a7ab536960421e4-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>Cancel</span>
              </button>
              <button type="button" onClick={handleSaveScope} className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='jobscopecompliance-r934c6c18e7280a21-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                <Check className="h-3.5 w-3.5" data-api-unique-id='jobscopecompliance-r74fa49bf0bedc7cd-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
                <span data-api-unique-id='jobscopecompliance-rf3899b4cf8008fd4-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>Save Specification</span>
              </button>
            </div>
          </div> : <div className="flex min-w-0 flex-col gap-2.5" data-api-unique-id='jobscopecompliance-rf6038124837edd78-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <h4 className="font-header text-sm font-bold text-foreground" data-api-unique-id='jobscopecompliance-rea64901bf51bb399-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              {quote.taskTitle}
            </h4>
            <div className="rounded-md bg-muted p-3 text-xs leading-relaxed text-foreground whitespace-pre-wrap" data-api-unique-id='jobscopecompliance-re532ad186814e6e3-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              {quote.taskDescription}
            </div>

            {/* Altbau Special Condition Warning Badge if mentioned */}
            {quote.taskDescription.toLowerCase().includes("altbau") && <div className="flex items-center gap-2 rounded-md border border-warning/30 bg-muted p-2.5 text-xs text-foreground" data-api-unique-id='jobscopecompliance-rc79460c5a33b80d3-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                <Building2 className="h-4 w-4 text-warning shrink-0" data-api-unique-id='jobscopecompliance-rd817741f65aa7686-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
                <span data-api-unique-id='jobscopecompliance-r84aead009f250810-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                  <strong data-api-unique-id='jobscopecompliance-rf0e9a37474cc0fc1-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>Viennese Altbau Condition Identified:</strong> High ceilings (&gt;3.4m), reed plaster/lath walls, or traditional double windows require specialized anchor plugs and safety scaffolding.
                </span>
              </div>}
          </div>}
      </div>

      {/* Customer Schedule Preference & Material Status */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2" data-api-unique-id='jobscopecompliance-r1c20ec413910e1b7-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
        {/* Preferred Date & Time Slot */}
        <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-card p-3.5" data-api-unique-id='jobscopecompliance-r5a8665d6c1a93822-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          <div className="flex items-center gap-2 text-muted-foreground" data-api-unique-id='jobscopecompliance-red4baf9ada6317f2-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <Calendar className="h-4 w-4 text-accent" data-api-unique-id='jobscopecompliance-r74b36e67a14dc8f1-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
            <span className="text-xs font-bold uppercase tracking-wider" data-api-unique-id='jobscopecompliance-r803cf2c180ba9ad4-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              Customer Time Window
            </span>
          </div>

          <div className="flex flex-col gap-1" data-api-unique-id='jobscopecompliance-r6a7bac1e8e36ad67-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <span className="font-mono text-sm font-bold text-foreground" data-api-unique-id='jobscopecompliance-r781ee2443098aa6f-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              {quote.preferredDate || "Not Specified / ASAP"}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='jobscopecompliance-rbbe978b7ac628b09-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              <Clock className="h-3.5 w-3.5 text-primary" data-api-unique-id='jobscopecompliance-rfcf36481ca5398a3-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
              <span data-api-unique-id='jobscopecompliance-rc8d1ce010d575c4d-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                {TIME_SLOT_LABELS[quote.preferredTimeSlot]?.label} (
                {TIME_SLOT_LABELS[quote.preferredTimeSlot]?.hours})
              </span>
            </div>
          </div>
        </div>

        {/* Materials Provision */}
        <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-card p-3.5" data-api-unique-id='jobscopecompliance-r43b441212d032bf9-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
          <div className="flex items-center gap-2 text-muted-foreground" data-api-unique-id='jobscopecompliance-r9b9dbb4940575d13-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            <Boxes className="h-4 w-4 text-accent" data-api-unique-id='jobscopecompliance-re41c9e36b80297f8-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
            <span className="text-xs font-bold uppercase tracking-wider" data-api-unique-id='jobscopecompliance-rb6cf9bcfcf4f83de-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
              Material Provision Status
            </span>
          </div>

          <div className="flex items-center gap-2" data-api-unique-id='jobscopecompliance-rbb65ff4c52cd4940-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            {quote.hasMaterials ? <span className="inline-flex items-center gap-1.5 rounded-full bg-success px-2.5 py-0.5 text-xs font-bold text-success-foreground" data-api-unique-id='jobscopecompliance-rf54cdb6522c08cba-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                <Check className="h-3.5 w-3.5" data-api-unique-id='jobscopecompliance-r95df115e8c46442d-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
                Client Provides Materials
              </span> : <span className="inline-flex items-center gap-1.5 rounded-full bg-warning px-2.5 py-0.5 text-xs font-bold text-warning-foreground" data-api-unique-id='jobscopecompliance-r9dd645e9fa7e1235-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
                <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='jobscopecompliance-r32fd0bba20db273c-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance' />
                Handwerk Sourcing Required
              </span>}
          </div>
          <span className="text-[11px] text-muted-foreground" data-api-unique-id='jobscopecompliance-r6ff3149cdfe25388-s3374592568' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/JobScopeCompliance'>
            {quote.hasMaterials ? "Fixtures, tiles, or cabinetry on-site at time of dispatch" : "Consumables, specialized anchors, and timber sourced by artisan"}
          </span>
        </div>
      </div>
    </div>;
}