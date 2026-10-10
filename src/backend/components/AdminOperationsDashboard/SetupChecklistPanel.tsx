"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SetupChecklistItemData, ChecklistStatus, LanguageCode } from "@/backend/types/AdminOperationsDashboard";
export type SetupChecklistItem = SetupChecklistItemData;
export interface SetupChecklistPanelProps {
  checklist: SetupChecklistItem[];
  currentLang: LanguageCode;
  onUpdateChecklistStatus?: (id: string, newStatus: ChecklistStatus, newFieldValue: string) => void;
}
export default function SetupChecklistPanel({
  checklist = [],
  currentLang = "EN",
  onUpdateChecklistStatus
}: SetupChecklistPanelProps) {
  const [editingItem, setEditingItem] = useState<SetupChecklistItem | null>(null);
  const [inputStatus, setInputStatus] = useState<ChecklistStatus>("COMPLETED");
  const [inputValue, setInputValue] = useState<string>("");
  const panelTexts: Record<LanguageCode, {
    title: string;
    desc: string;
    completedText: string;
    inReviewText: string;
    pendingText: string;
    complianceRate: string;
    editTitle: string;
    statusLabel: string;
    fieldValLabel: string;
    saveButton: string;
    cancelButton: string;
    emptyText: string;
  }> = {
    DE: {
      title: "Unternehmens-Stammdaten & WKO-Compliance",
      desc: "Status der gesetzlichen Unternehmensangaben für Wien (GewO § 46)",
      completedText: "Bestätigt",
      inReviewText: "In Prüfung",
      pendingText: "Ausstehend",
      complianceRate: "Konformitätsgrad",
      editTitle: "Compliance-Eintrag & Rechtsprüfung bearbeiten",
      statusLabel: "Prüfungsstatus",
      fieldValLabel: "Hinterlegte Betriebsdaten / Registernummer",
      saveButton: "Angaben speichern",
      cancelButton: "Abbrechen",
      emptyText: "Keine Nachweiseinträge vorhanden"
    },
    EN: {
      title: "Austrian Statutory Compliance & Setup",
      desc: "Status tracker for official Austrian commercial records & Gewerbe registry",
      completedText: "Verified",
      inReviewText: "Under Review",
      pendingText: "Action Needed",
      complianceRate: "Compliance Readiness",
      editTitle: "Update Verification Status & Compliance Record",
      statusLabel: "Verification Status",
      fieldValLabel: "Configured Business Value / Registry Reference",
      saveButton: "Save Compliance Item",
      cancelButton: "Cancel",
      emptyText: "No statutory compliance items recorded"
    },
    RU: {
      title: "Чеклист регистрации и комплаенса",
      desc: "Статус официальных реквизитов компании в Вене (GewO § 46)",
      completedText: "Подтверждено",
      inReviewText: "На проверке",
      pendingText: "Требуется действие",
      complianceRate: "Готовность профиля",
      editTitle: "Редактировать статус комплаенса",
      statusLabel: "Статус проверки",
      fieldValLabel: "Реквизиты и регистрационные данные",
      saveButton: "Сохранить",
      cancelButton: "Отмена",
      emptyText: "Записи комплаенса отсутствуют"
    }
  };
  const t = panelTexts[currentLang] || panelTexts.EN;
  const completedCount = checklist.filter(item => item.status === "COMPLETED").length;
  const progressPercent = checklist.length > 0 ? Math.round(completedCount / checklist.length * 100) : 0;
  const statusBadge = (status: ChecklistStatus) => {
    switch (status) {
      case "COMPLETED":
        return <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-success px-1.5 py-0.5 text-[10px] font-bold text-success-foreground" data-api-unique-id='setupchecklistpanel-rb4b80013e82e7c16-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <CheckCircle2 className="h-2.5 w-2.5" data-api-unique-id='setupchecklistpanel-r62f634a44c1ee86c-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' />
            {t.completedText}
          </span>;
      case "IN_REVIEW":
        return <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-warning px-1.5 py-0.5 text-[10px] font-bold text-warning-foreground" data-api-unique-id='setupchecklistpanel-r9839047df7a63d9e-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <Clock className="h-2.5 w-2.5" data-api-unique-id='setupchecklistpanel-r6e4befa606a9796c-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' />
            {t.inReviewText}
          </span>;
      case "PENDING":
        return <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground" data-api-unique-id='setupchecklistpanel-rf32c8e6a085fe2e9-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <AlertTriangle className="h-2.5 w-2.5" data-api-unique-id='setupchecklistpanel-rbcef58705c45e17b-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' />
            {t.pendingText}
          </span>;
    }
  };
  const statusOptions: Record<ChecklistStatus, string> = {
    COMPLETED: `${t.completedText} (COMPLETED)`,
    IN_REVIEW: `${t.inReviewText} (IN_REVIEW)`,
    PENDING: `${t.pendingText} (PENDING)`
  };
  const handleOpenEdit = (item: SetupChecklistItem) => {
    setEditingItem(item);
    setInputStatus(item.status);
    setInputValue(item.fieldValue);
  };
  const handleSave = () => {
    if (!editingItem) return;
    if (onUpdateChecklistStatus) {
      onUpdateChecklistStatus(editingItem.id, inputStatus, inputValue);
    }
    setEditingItem(null);
  };
  return <div data-controller-name="Business Setup Compliance Checklist Panel" className="flex min-w-0 flex-col rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='setupchecklistpanel-r7377a29932547f42-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
      {/* Header with completion meter */}
      <div className="flex min-w-0 flex-col gap-2 pb-3 border-b border-border" data-api-unique-id='setupchecklistpanel-r2cc8f4cad3ea0e37-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
        <div className="flex items-start justify-between gap-2" data-api-unique-id='setupchecklistpanel-re238121198bcdde9-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
          <div className="min-w-0 flex-1" data-api-unique-id='setupchecklistpanel-r0eb3c3008501be61-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <h3 className="font-display text-sm font-bold text-foreground sm:text-base truncate" data-api-unique-id='setupchecklistpanel-rf4c66fb48c6d320b-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
              {t.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate" data-api-unique-id='setupchecklistpanel-rfa84a8b3649437d0-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>{t.desc}</p>
          </div>
          <div className="text-right shrink-0" data-api-unique-id='setupchecklistpanel-rfa7cb9d53bdaffde-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <span className="font-mono text-sm font-bold text-foreground" data-api-unique-id='setupchecklistpanel-r7a7d723b2511bcf5-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" data-api-unique-id='setupchecklistpanel-rcff76085743dd118-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
          <div className="h-full bg-primary transition-all duration-300" style={{
          width: `${progressPercent}%`
        }} data-api-unique-id='setupchecklistpanel-r3aa0253e9e000ff2-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' />
        </div>
      </div>

      {/* Checklist Entries */}
      <div className="mt-2 flex min-w-0 flex-col divide-y divide-border" data-api-unique-id='setupchecklistpanel-r557a42b9b7e2a162-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
        {checklist.length === 0 ? <div className="py-4 text-center text-xs text-muted-foreground" data-api-unique-id='setupchecklistpanel-rb812ea232bfe17f7-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            {t.emptyText}
          </div> : checklist.map((item, index) => <div key={item.id} className="flex min-w-0 flex-col gap-1.5 py-2.5 first:pt-0 last:pb-0" data-api-unique-id='setupchecklistpanel-r52275b931386f388-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1'>
              <div className="flex items-center justify-between gap-2" data-api-unique-id='setupchecklistpanel-r9e35e60039e67e60-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1'>
                <span className="font-medium text-xs text-foreground truncate max-w-[190px]" data-api-unique-id='setupchecklistpanel-r66415d707ca3919a-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1' data-api-bind-info={`checklist-${index}-title`} data-api-map-var-name='item'>
                  {item.title}
                </span>
                <div className="flex items-center gap-1.5 shrink-0" data-api-unique-id='setupchecklistpanel-r71b62abf38fd779a-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1'>
                  {statusBadge(item.status)}
                  <button type="button" onClick={() => handleOpenEdit(item)} className="inline-flex h-5 w-5 items-center justify-center rounded border border-border bg-muted text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title={`Edit ${item.title}`} data-api-unique-id='setupchecklistpanel-r4a92e528e196586c-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1'>
                    <Edit2 className="h-2.5 w-2.5" data-api-unique-id='setupchecklistpanel-r516723fd2ff662e8-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1' />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground" data-api-unique-id='setupchecklistpanel-r99f3541498b9179f-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1'>
                <span className="font-mono text-foreground font-medium truncate max-w-[210px]" data-api-unique-id='setupchecklistpanel-rf94475b906e60525-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1' data-api-bind-info={`checklist-${index}-fieldValue`} data-api-map-var-name='item'>
                  {item.fieldValue}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground shrink-0" data-api-unique-id='setupchecklistpanel-rb0fc694d08416a68-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' data-api-in-loop='1' data-api-bind-info={`checklist-${index}-legalRef`} data-api-map-var-name='item'>
                  {item.legalRef}
                </span>
              </div>
            </div>)}
      </div>

      {/* Bottom Austrian Commercial Registry Stamp */}
      <div className="mt-3 border-t border-border pt-2 text-[11px] text-muted-foreground" data-api-unique-id='setupchecklistpanel-r9e74db4f1ea3b639-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
        <div className="flex items-center justify-between" data-api-unique-id='setupchecklistpanel-r3d0a381397321dfb-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
          <div className="flex items-center gap-1" data-api-unique-id='setupchecklistpanel-r4d7ffbd05d47c740-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <ShieldCheck className="h-3.5 w-3.5 text-success" data-api-unique-id='setupchecklistpanel-rbd29208271048e47-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' />
            <span data-api-unique-id='setupchecklistpanel-rb573889579ba3395-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>Wirtschaftskammer Österreich (WKO)</span>
          </div>
          <span className="font-mono text-xs font-semibold text-foreground" data-api-unique-id='setupchecklistpanel-r887c55f6efdb0082-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            Wien Fachgruppe 112
          </span>
        </div>
      </div>

      {/* Edit Checklist Item Dialog */}
      <Dialog open={!!editingItem} onOpenChange={open => !open && setEditingItem(null)} data-api-unique-id='setupchecklistpanel-rb70591d96f7d47b5-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md p-6 bg-card text-card-foreground border-border" data-api-unique-id='setupchecklistpanel-rd47763df8df5822d-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
          <DialogHeader data-api-unique-id='setupchecklistpanel-r64045a1b75d7aec0-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <DialogTitle className="text-base font-bold font-display text-foreground" data-api-unique-id='setupchecklistpanel-r801bb3f7660a0c07-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
              {t.editTitle}
            </DialogTitle>
          </DialogHeader>

          {editingItem && <div className="flex flex-col gap-4 py-2" data-api-unique-id='setupchecklistpanel-r374b26f2f07720f2-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
              <div data-api-unique-id='setupchecklistpanel-r26a57e18f8eb4192-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                <label className="text-xs font-semibold text-foreground block" data-api-unique-id='setupchecklistpanel-rd06dc667149e2a74-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                  {editingItem.title}
                </label>
                <p className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='setupchecklistpanel-r5d0567348f3920bd-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                  Legal citation: <span className="font-mono" data-api-unique-id='setupchecklistpanel-r1a54541fb417e7c9-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>{editingItem.legalRef}</span>
                </p>
              </div>

              <div data-api-unique-id='setupchecklistpanel-rc896cd3d80e7004b-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                <label className="text-xs font-semibold text-foreground block mb-1" data-api-unique-id='setupchecklistpanel-rb70d2193ecd56e16-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                  {t.statusLabel}
                </label>
                <Select key={editingItem.id} value={inputStatus} onValueChange={val => setInputStatus(val as ChecklistStatus)} data-api-unique-id='setupchecklistpanel-r0c32e989934296a0-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                  <SelectTrigger className="h-9 w-full border-border bg-background text-xs text-foreground" data-api-unique-id='setupchecklistpanel-r7f2803b12f4b62d2-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                    <SelectValue data-api-unique-id='setupchecklistpanel-r4a2ebfb0b4322297-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                      {statusOptions[inputStatus]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent data-api-unique-id='setupchecklistpanel-r443aab6bea2bbe1b-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                    <SelectItem value="COMPLETED" data-api-unique-id='setupchecklistpanel-ra134cfea605cf073-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>{statusOptions.COMPLETED}</SelectItem>
                    <SelectItem value="IN_REVIEW" data-api-unique-id='setupchecklistpanel-r470a78ea173bdac2-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>{statusOptions.IN_REVIEW}</SelectItem>
                    <SelectItem value="PENDING" data-api-unique-id='setupchecklistpanel-r328785d9d7f4af81-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>{statusOptions.PENDING}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div data-api-unique-id='setupchecklistpanel-r593062ac44ab205f-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                <label className="text-xs font-semibold text-foreground block mb-1" data-api-unique-id='setupchecklistpanel-rad4c5d4b95bf2d77-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
                  {t.fieldValLabel}
                </label>
                <textarea rows={2} value={inputValue} onChange={e => setInputValue(e.target.value)} className="w-full rounded-md border border-input bg-background p-2 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='setupchecklistpanel-rb05d3f74be363e82-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel' />
              </div>
            </div>}

          <DialogFooter className="flex items-center justify-end gap-2 pt-2 border-t border-border" data-api-unique-id='setupchecklistpanel-r2685436185a547b6-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
            <button type="button" onClick={() => setEditingItem(null)} className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted" data-api-unique-id='setupchecklistpanel-r35ef63305d37c027-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
              {t.cancelButton}
            </button>
            <button type="button" onClick={handleSave} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='setupchecklistpanel-raa45af13ae034254-s774128560' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/SetupChecklistPanel'>
              {t.saveButton}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}