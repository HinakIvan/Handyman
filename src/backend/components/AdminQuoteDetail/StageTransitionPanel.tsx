"use client";

import React, { useState } from "react";
import { QuoteRequestDetailDTO, QuoteStatus } from "@/backend/types/AdminQuoteDetail";
import { GitCommit, CheckCircle2, Lock, ArrowRight, PhoneCall, Send, CalendarCheck, CheckCheck, Flame, AlertTriangle, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
interface StageTransitionPanelProps {
  quote: QuoteRequestDetailDTO;
  onUpdateQuote: (updates: Partial<QuoteRequestDetailDTO>) => void;
}
interface StepConfig {
  key: QuoteStatus;
  title: string;
  subtitle: string;
  actionName: string;
  icon: React.ElementType;
  description: string;
}
const PIPELINE_STEPS: StepConfig[] = [{
  key: "NEW",
  title: "New Lead Inflow",
  subtitle: "Customer ticket received online",
  actionName: "Reopen Lead Inflow",
  icon: GitCommit,
  description: "Initial request ingested. Awaiting first telephone triage."
}, {
  key: "CONTACTED",
  title: "Phone Consultation Logged",
  subtitle: "Altbau specs & timing clarified",
  actionName: "Log Client Consultation Call",
  icon: PhoneCall,
  description: "Admin confirmed dimensions, wall materials, and parking permissions."
}, {
  key: "ESTIMATE_SENT",
  title: "Estimate Transmitted",
  subtitle: "Official PDF/Email rate sent",
  actionName: "Transmit Binding Estimate",
  icon: Send,
  description: "Scope hours & hourly rates compiled into commercial proposal."
}, {
  key: "QUOTED",
  title: "Client Rate Acceptance",
  subtitle: "Customer approved pricing",
  actionName: "Confirm Client Acceptance",
  icon: CheckCircle2,
  description: "Client signed off on estimated hours and Vienna travel fee."
}, {
  key: "SCHEDULED",
  title: "Artisan Schedule Assigned",
  subtitle: "Master Craftsman reserved",
  actionName: "Assign Master Artisan Schedule",
  icon: CalendarCheck,
  description: "Dispatched to assigned artisan calendar in Vienna municipal sector."
}, {
  key: "COMPLETED",
  title: "Finalized & Archived",
  subtitle: "Work done, record permanently locked",
  actionName: "Finalize Assembly & Lock Record",
  icon: CheckCheck,
  description: "Job concluded, hours confirmed, ready for invoicing. Permanently locks all edits."
}];
export default function StageTransitionPanel({
  quote,
  onUpdateQuote
}: StageTransitionPanelProps) {
  const isCompleted = quote.status === "COMPLETED";

  // Confirm Final Completion Modal state
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [completionNotes, setCompletionNotes] = useState("");
  const rawStepIndex = PIPELINE_STEPS.findIndex(s => s.key === quote.status);
  const currentStepIndex = rawStepIndex >= 0 ? rawStepIndex : 0;
  const handleAdvanceNext = () => {
    if (isCompleted) return;
    if (currentStepIndex < PIPELINE_STEPS.length - 1) {
      const nextStep = PIPELINE_STEPS[currentStepIndex + 1];
      if (nextStep.key === "COMPLETED") {
        setIsCompletionModalOpen(true);
      } else {
        onUpdateQuote({
          status: nextStep.key
        });
        toast.success(`Workflow transitioned to: ${nextStep.title}`);
      }
    }
  };
  const handleDirectTransition = (targetStatus: QuoteStatus) => {
    if (isCompleted) return;
    if (targetStatus === "COMPLETED") {
      setIsCompletionModalOpen(true);
    } else {
      onUpdateQuote({
        status: targetStatus
      });
      toast.success(`Lifecycle status updated to: ${PIPELINE_STEPS.find(s => s.key === targetStatus)?.title || targetStatus}`);
    }
  };
  const handleConfirmFinalCompletion = () => {
    const archivalText = completionNotes.trim() || "Job completed and signed off.";
    const updatedScopeNotes = quote.scopeNotes ? `${quote.scopeNotes}\n[Archival Note]: ${archivalText}` : `[Archival Note]: ${archivalText}`;
    onUpdateQuote({
      status: "COMPLETED",
      scopeNotes: updatedScopeNotes
    });
    setIsCompletionModalOpen(false);
    toast.success("Quote permanently completed and locked against revisions");
  };
  return <div data-controller-name="Workflow Stage Transition and Operational Decision Panel" className="flex w-full min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-5" data-api-unique-id='stagetransitionpanel-rd1466ce585746808-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3" data-api-unique-id='stagetransitionpanel-r98329a7af2314327-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
        <div className="flex items-center gap-2" data-api-unique-id='stagetransitionpanel-r0dc48f52226b755c-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground" data-api-unique-id='stagetransitionpanel-re638bd2da373bb98-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <GitCommit className="h-4 w-4" data-api-unique-id='stagetransitionpanel-r728b7327ab894666-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
          </div>
          <div className="flex flex-col" data-api-unique-id='stagetransitionpanel-rf141fd885c380799-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <h3 className="font-header text-sm font-bold tracking-tight text-foreground" data-api-unique-id='stagetransitionpanel-rdadb23795b79fa0c-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Operational Stage Pipeline
            </h3>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='stagetransitionpanel-r8a42995b20b1c5bb-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Sequential Vienna GewO Lifecycle Controls
            </span>
          </div>
        </div>

        {isCompleted && <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[11px] font-bold text-success-foreground" data-api-unique-id='stagetransitionpanel-r83bb8e091f553c14-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <Lock className="h-3 w-3" data-api-unique-id='stagetransitionpanel-rc2559c8d8db31459-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
            LOCKED
          </span>}
      </div>

      {/* Primary Next Action CTA Button */}
      {!isCompleted ? <div className="flex flex-col gap-2 rounded-lg border border-primary/30 bg-secondary p-3 text-secondary-foreground" data-api-unique-id='stagetransitionpanel-r8869e58a1a0adbc2-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          <div className="flex items-center justify-between text-xs" data-api-unique-id='stagetransitionpanel-r7f1219aa63a75463-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <span className="font-semibold text-foreground" data-api-unique-id='stagetransitionpanel-r25a8f6e9e147d79a-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Recommended Next Action:
            </span>
            <span className="font-mono text-[11px] text-muted-foreground" data-api-unique-id='stagetransitionpanel-rff4255b13eb868cb-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Phase {currentStepIndex + 1} &rarr; {currentStepIndex + 2}
            </span>
          </div>

          {currentStepIndex < PIPELINE_STEPS.length - 1 && <button type="button" onClick={handleAdvanceNext} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='stagetransitionpanel-r05085e2c62bbbf6e-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              <span data-api-unique-id='stagetransitionpanel-r430525625c6beb10-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
                {PIPELINE_STEPS[currentStepIndex + 1].actionName}
              </span>
              <ArrowRight className="h-4 w-4" data-api-unique-id='stagetransitionpanel-rf01c0297e08fb052-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
            </button>}

          <p className="text-[11px] text-muted-foreground leading-tight" data-api-unique-id='stagetransitionpanel-rf3aed3fab3fe0213-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            {PIPELINE_STEPS[currentStepIndex + 1]?.description || "All operational requirements satisfied."}
          </p>
        </div> : <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground" data-api-unique-id='stagetransitionpanel-r94827045493aab6b-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          <ShieldAlert className="h-4 w-4 shrink-0 text-success" data-api-unique-id='stagetransitionpanel-rdfbba7a3f66dc466-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
          <div className="flex flex-col gap-1" data-api-unique-id='stagetransitionpanel-r8dc79360f02537e3-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <span className="font-semibold text-foreground" data-api-unique-id='stagetransitionpanel-re0260425ab0cde16-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Lifecycle Concluded
            </span>
            <span className="text-[11px] leading-tight" data-api-unique-id='stagetransitionpanel-re65532554f27228c-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Under Austrian Gewerbeordnung guidelines, finalized records are immutable. To make adjustments, a supervisor must generate an amendment ticket.
            </span>
          </div>
        </div>}

      {/* Urgency Dispatch Flag Switch */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-3 text-xs" data-api-unique-id='stagetransitionpanel-r503c51c0bc0dcb7e-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
        <div className="flex items-center gap-2" data-api-unique-id='stagetransitionpanel-r0a92b94fe769c9f8-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          <Flame className={`h-4 w-4 ${quote.isUrgent ? "text-destructive" : "text-muted-foreground"}`} data-api-unique-id='stagetransitionpanel-rf95a152d43d57b94-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
          <div className="flex flex-col" data-api-unique-id='stagetransitionpanel-rbdedd4955210a751-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <span className="font-semibold text-foreground" data-api-unique-id='stagetransitionpanel-rc425c507e95cb6d5-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Urgent Inflow Flag (24h Dispatch)
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='stagetransitionpanel-r132f89b0171ceb0e-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Prioritizes lead in master artisan queue
            </span>
          </div>
        </div>

        <button type="button" disabled={isCompleted} onClick={() => onUpdateQuote({
        isUrgent: !quote.isUrgent
      })} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${quote.isUrgent ? "bg-destructive" : "bg-border"}`} data-api-unique-id='stagetransitionpanel-rc323005ca950c4ea-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${quote.isUrgent ? "translate-x-5" : "translate-x-0"}`} data-api-unique-id='stagetransitionpanel-r269d241c5163b3d3-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
        </button>
      </div>

      {/* Vertical Lifecycle Stepper Pipeline */}
      <div className="flex min-w-0 flex-col gap-1 text-xs" data-api-unique-id='stagetransitionpanel-r935ce26bd5ef5be1-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='stagetransitionpanel-re2d3a8ae9d76e3eb-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          Detailed State Progression
        </span>

        <div className="mt-1 flex flex-col divide-y divide-border rounded-lg border border-border bg-card" data-api-unique-id='stagetransitionpanel-rfe580653728471de-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          {PIPELINE_STEPS.map((step, index) => {
          const isDone = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isFuture = index > currentStepIndex;
          return <div key={step.key} className={`flex items-start justify-between gap-3 p-3 transition ${isCurrent ? "bg-secondary" : isDone ? "bg-card" : "bg-card opacity-60"}`} data-api-unique-id='stagetransitionpanel-rce3a02ee56cefe21-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                <div className="flex items-start gap-2.5 min-w-0" data-api-unique-id='stagetransitionpanel-r9b623a03803822e6-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isCurrent ? "bg-primary text-primary-foreground shadow-sm" : isDone ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`} data-api-unique-id='stagetransitionpanel-r0ccdf0b7b1afa550-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='stagetransitionpanel-r8b54bfd219fca61d-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1' /> : <span data-api-unique-id='stagetransitionpanel-r88c3dfc2df205bc0-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>{index + 1}</span>}
                  </div>

                  <div className="flex flex-col min-w-0" data-api-unique-id='stagetransitionpanel-r25a26bb3b74e3b7c-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                    <div className="flex items-center gap-2" data-api-unique-id='stagetransitionpanel-rf994b80d719bd928-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                      <span className="font-semibold text-foreground" data-api-unique-id='stagetransitionpanel-rcf32e7d4e098b925-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1' data-api-bind-info={`PIPELINE_STEPS-${index}-title`} data-api-map-var-name='step'>
                        {step.title}
                      </span>
                      {isCurrent && <span className="inline-flex rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary-foreground" data-api-unique-id='stagetransitionpanel-re080b25d19983684-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                          ACTIVE
                        </span>}
                    </div>
                    <span className="text-[11px] text-muted-foreground" data-api-unique-id='stagetransitionpanel-r252689b8bac32603-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1' data-api-bind-info={`PIPELINE_STEPS-${index}-subtitle`} data-api-map-var-name='step'>
                      {step.subtitle}
                    </span>
                  </div>
                </div>

                {/* Direct Jump Action Button if not completed and not current */}
                {!isCompleted && !isCurrent && <button type="button" onClick={() => handleDirectTransition(step.key)} className="shrink-0 cursor-pointer rounded border border-border bg-muted px-2 py-1 text-[10px] font-semibold text-foreground transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='stagetransitionpanel-r98bc8b33d7ea0828-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' data-api-in-loop='1'>
                    {isFuture ? "Jump to" : "Revert"}
                  </button>}
              </div>;
        })}
        </div>
      </div>

      {/* Completion & Final Lock Modal Dialog */}
      <Dialog open={isCompletionModalOpen} onOpenChange={setIsCompletionModalOpen} data-api-unique-id='stagetransitionpanel-re32f01ef74d973eb-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-lg" data-api-unique-id='stagetransitionpanel-rd70d70d5b9e1115a-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
          <DialogHeader data-api-unique-id='stagetransitionpanel-r3aa63d49fad26f8f-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <div className="flex items-center gap-2 text-warning" data-api-unique-id='stagetransitionpanel-r7fc92a2340607a3a-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              <AlertTriangle className="h-5 w-5" data-api-unique-id='stagetransitionpanel-r6935c308ecb49300-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
              <DialogTitle className="font-header text-lg font-bold" data-api-unique-id='stagetransitionpanel-rab4f31073f6cb9cf-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
                Finalize & Lock Quote #{quote.trackingCode}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground" data-api-unique-id='stagetransitionpanel-r1c4d694e1bc12fec-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Transitioning to <strong className="text-foreground" data-api-unique-id='stagetransitionpanel-r489787fc96c3b6b0-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>COMPLETED</strong> enforces an immutable audit lock under Austrian GewO 1994 compliance. You will no longer be able to edit hours, pricing, or customer specifications.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-2 text-xs" data-api-unique-id='stagetransitionpanel-r0e044dfff19a9a60-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <div className="rounded-lg border border-border bg-muted p-3 text-muted-foreground" data-api-unique-id='stagetransitionpanel-r8174e604166af20f-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              <div className="flex justify-between font-semibold text-foreground" data-api-unique-id='stagetransitionpanel-rc611ec2ecc92fdbf-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
                <span data-api-unique-id='stagetransitionpanel-r24c2de89ab4ba20a-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>Final Labor Scope:</span>
                <span className="font-mono" data-api-unique-id='stagetransitionpanel-r614093bcedc8f7c5-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>{quote.estimatedHours} Hours</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-1" data-api-unique-id='stagetransitionpanel-r43b7e501e55e384f-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
                <span data-api-unique-id='stagetransitionpanel-r6d712bbde5fd32e6-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>Final Billing Amount:</span>
                <span className="font-mono text-primary font-bold" data-api-unique-id='stagetransitionpanel-rc2832fdb948f2916-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
                  €{Number(quote.estimatedBudgetEur || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='stagetransitionpanel-r1d57c9e536514c5f-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              <label className="text-xs font-semibold text-foreground" data-api-unique-id='stagetransitionpanel-r93083944bab3fa26-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
                Archival Sign-Off Notes (Optional)
              </label>
              <textarea rows={3} value={completionNotes} onChange={e => setCompletionNotes(e.target.value)} placeholder="Confirmation of customer sign-off, invoice reference, or artisan inspection checklist completion..." className="w-full rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='stagetransitionpanel-rcb66be29db99dd82-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end" data-api-unique-id='stagetransitionpanel-rde4d70be7aa7f939-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
            <button type="button" onClick={() => setIsCompletionModalOpen(false)} className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary" data-api-unique-id='stagetransitionpanel-rbeff895614d5a609-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              Cancel
            </button>
            <button type="button" onClick={handleConfirmFinalCompletion} className="inline-flex items-center gap-1.5 rounded-md bg-success px-3.5 py-1.5 text-xs font-bold text-success-foreground hover:bg-success/90" data-api-unique-id='stagetransitionpanel-re51ae7ea821d5afc-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>
              <Lock className="h-3.5 w-3.5" data-api-unique-id='stagetransitionpanel-r0f97120cc80e27d3-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel' />
              <span data-api-unique-id='stagetransitionpanel-rff27fe13c4cb1a48-s4052270590' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/StageTransitionPanel'>Confirm & Lock Permanently</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}