"use client";

import React, { useState } from "react";
import { QuoteRequestDetailDTO, ConsultationNote } from "@/backend/types/AdminQuoteDetail";
import { History, PhoneForwarded, Plus, Clock, User, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ConsultationHistoryLogProps {
  quote: QuoteRequestDetailDTO;
  onAddNote?: (note: ConsultationNote) => void;
}
const ACTION_TYPE_OPTIONS = [{
  value: "Telephone Consultation",
  label: "Telephone Consultation"
}, {
  value: "Commercial Estimate Transmitted",
  label: "Commercial Estimate Transmitted"
}, {
  value: "Client Rate Approval Call",
  label: "Client Rate Approval Call"
}, {
  value: "Artisan Dispatch Notice",
  label: "Artisan Dispatch Notice"
}, {
  value: "Altbau Inspection Followup",
  label: "Altbau Inspection Followup"
}];
export default function ConsultationHistoryLog({
  quote,
  onAddNote
}: ConsultationHistoryLogProps) {
  const isCompleted = quote.status === "COMPLETED";
  const [isAdding, setIsAdding] = useState(false);
  const [actionType, setActionType] = useState<string>("Telephone Consultation");
  const [newNote, setNewNote] = useState<string>("");
  const logs: ConsultationNote[] = quote.consultationHistory || [];
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || isCompleted) return;
    const noteItem: ConsultationNote = {
      id: `log-${Date.now()}`,
      adminName: "Current Admin (Operations)",
      timestamp: "Just now",
      actionTaken: actionType,
      note: newNote.trim()
    };
    if (onAddNote) {
      onAddNote(noteItem);
    }
    setNewNote("");
    setIsAdding(false);
  };
  return <div data-controller-name="Consultation Audit Trail and Call History Log" className="flex w-full min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-6" data-api-unique-id='consultationhistorylog-r919a01e390bcb829-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3" data-api-unique-id='consultationhistorylog-ra2c6081e077dc4e9-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
        <div className="flex items-center gap-2" data-api-unique-id='consultationhistorylog-r24f511a852b32421-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground" data-api-unique-id='consultationhistorylog-r1af3aece823d9211-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <History className="h-4 w-4 text-primary" data-api-unique-id='consultationhistorylog-r35111503488725f5-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' />
          </div>
          <div className="flex flex-col" data-api-unique-id='consultationhistorylog-r6d9e33f89901c983-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <h3 className="font-header text-sm font-bold tracking-tight text-foreground" data-api-unique-id='consultationhistorylog-r9e38b335d2103007-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              Audit Trail & Consultation Log
            </h3>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='consultationhistorylog-rebb3105b7df35808-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              Chronological log of phone calls, estimates sent, and dispatch entries
            </span>
          </div>
        </div>

        {!isCompleted && !isAdding && <button type="button" onClick={() => setIsAdding(true)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-foreground transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='consultationhistorylog-rb0c9c9e5b9cd7240-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <Plus className="h-3.5 w-3.5 text-primary" data-api-unique-id='consultationhistorylog-r7eee20fc0557748a-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' />
            <span data-api-unique-id='consultationhistorylog-r46b4ad1b26f42f22-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>Log Call Note</span>
          </button>}
      </div>

      {/* Add Log Form */}
      {!isCompleted && isAdding && <form onSubmit={handleAddSubmit} className="flex min-w-0 flex-col gap-3 rounded-lg border border-primary/30 bg-muted p-3.5 text-xs" data-api-unique-id='consultationhistorylog-r85645b4e6cd7f6fa-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
          <div className="flex items-center justify-between" data-api-unique-id='consultationhistorylog-rd5b2902aea84c277-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]" data-api-unique-id='consultationhistorylog-r2974a935ef7bfd8e-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              New Administrative Action Log
            </span>
            <button type="button" onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-foreground text-xs" data-api-unique-id='consultationhistorylog-r7d09c25d2cd511b4-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" data-api-unique-id='consultationhistorylog-rb3cef48cff70bbd7-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <div className="flex flex-col gap-1" data-api-unique-id='consultationhistorylog-ra68462e801d2f5e1-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              <label className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='consultationhistorylog-r851b74476b6ad64d-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
                Action Type
              </label>
              <Select value={actionType} onValueChange={setActionType} data-api-unique-id='consultationhistorylog-r79f6bd3b1da5de78-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
                <SelectTrigger size="sm" className="w-full bg-background" data-api-unique-id='consultationhistorylog-rdf19b214d44d4447-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
                  <SelectValue placeholder="Select action type" data-api-unique-id='consultationhistorylog-r663cd42aa687033c-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
                    {ACTION_TYPE_OPTIONS.find(opt => opt.value === actionType)?.label || actionType}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent data-api-unique-id='consultationhistorylog-r533ac50ee859c188-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
                  {ACTION_TYPE_OPTIONS.map((opt, index) => <SelectItem key={opt.value} value={opt.value} data-api-unique-id='consultationhistorylog-re079c92720ed675f-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' data-api-bind-info={`ACTION_TYPE_OPTIONS-${index}-label`} data-api-map-var-name='opt'>
                      {opt.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1" data-api-unique-id='consultationhistorylog-r1353ead6076254e5-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              <label className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='consultationhistorylog-r3ca392c80662610b-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
                Logged By
              </label>
              <input type="text" disabled value="Operations Administrator" className="rounded border border-border bg-muted px-2.5 py-1.5 text-xs text-muted-foreground" data-api-unique-id='consultationhistorylog-r303832908059493c-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' />
            </div>
          </div>

          <div className="flex flex-col gap-1" data-api-unique-id='consultationhistorylog-r972f90c3fa7e3e0f-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <label className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='consultationhistorylog-r62c5589bd672435f-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              Internal Conversation & Scope Summary
            </label>
            <textarea rows={2} required value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Record details of the discussion with the customer..." className="w-full rounded border border-border bg-background p-2 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='consultationhistorylog-r39daa67be797db05-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' />
          </div>

          <div className="flex justify-end gap-2 pt-1" data-api-unique-id='consultationhistorylog-rdf2a6e288e79fc83-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
            <button type="submit" className="inline-flex cursor-pointer items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/90" data-api-unique-id='consultationhistorylog-rd7e8c2d3ac881323-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
              <Check className="h-3.5 w-3.5" data-api-unique-id='consultationhistorylog-rfeb6de0f293604c8-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' />
              <span data-api-unique-id='consultationhistorylog-r06308baa3977b9b1-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>Save Call Log Entry</span>
            </button>
          </div>
        </form>}

      {/* Timeline entries */}
      {logs.length === 0 ? <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground" data-api-unique-id='consultationhistorylog-rd8ea47bbdd2d3fee-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
          <p data-api-unique-id='consultationhistorylog-rb98828ba1621c9e5-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>No consultation notes or audit entries logged yet.</p>
        </div> : <div className="flex flex-col gap-3" data-api-unique-id='consultationhistorylog-r8285bd59d135d8bc-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog'>
          {logs.map((item, index) => <div key={item.id} className="flex min-w-0 items-start gap-3 rounded-lg border border-border bg-card p-3 text-xs" data-api-unique-id='consultationhistorylog-re1b40fac9e562422-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1'>
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground" data-api-unique-id='consultationhistorylog-r856ce44e8f964f17-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1'>
                <PhoneForwarded className="h-3.5 w-3.5 text-primary" data-api-unique-id='consultationhistorylog-r5300d756e7d04109-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1" data-api-unique-id='consultationhistorylog-r8c2cf8badfb9cf09-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1'>
                <div className="flex flex-wrap items-center justify-between gap-1" data-api-unique-id='consultationhistorylog-r18529eb0a229fd9a-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1'>
                  <span className="font-bold text-foreground" data-api-unique-id='consultationhistorylog-r8b7314ca6eeb7f0b-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' data-api-bind-info={`logs-${index}-actionTaken`} data-api-map-var-name='item'>
                    {item.actionTaken}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground" data-api-unique-id='consultationhistorylog-ra67c9eeb27da5def-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' data-api-bind-info={`logs-${index}-timestamp`} data-api-map-var-name='item'>
                    <Clock className="h-3 w-3" data-api-unique-id='consultationhistorylog-r3d052a71acb5bd38-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' />
                    {item.timestamp}
                  </span>
                </div>

                <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap" data-api-unique-id='consultationhistorylog-re892697fa3b14058-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' data-api-bind-info={`logs-${index}-note`} data-api-map-var-name='item'>
                  {item.note}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1" data-api-unique-id='consultationhistorylog-re43676393fb84e15-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1'>
                  <User className="h-3 w-3 text-accent" data-api-unique-id='consultationhistorylog-r9786047a6a8f2adc-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' />
                  <span data-api-unique-id='consultationhistorylog-r8539fb6123460e6f-s344258093' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ConsultationHistoryLog' data-api-in-loop='1' data-api-bind-info={`logs-${index}-adminName`} data-api-map-var-name='item'>{item.adminName}</span>
                </div>
              </div>
            </div>)}
        </div>}
    </div>;
}