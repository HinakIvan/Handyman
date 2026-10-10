"use client";

import React, { useState } from "react";
import { Shield, Check, Info, ArrowUpRight, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { ServiceCategoryItem, LanguageCode, ServiceCategoryKey } from "@/backend/types/AdminOperationsDashboard";
export type ServiceCategory = ServiceCategoryItem;
interface CategoryStatusPanelProps {
  categories: ServiceCategoryItem[];
  currentLang: LanguageCode;
  onFilterByCategory?: (key: ServiceCategoryKey) => void;
  onUpdateCategoryRate?: (id: string, newRate: number, newArtisan: string) => void;
}
export default function CategoryStatusPanel({
  categories = [],
  currentLang,
  onFilterByCategory,
  onUpdateCategoryRate
}: CategoryStatusPanelProps) {
  const [editingCategory, setEditingCategory] = useState<ServiceCategoryItem | null>(null);
  const [inputRate, setInputRate] = useState<number>(15);
  const [inputArtisan, setInputArtisan] = useState<string>("");
  const [rateError, setRateError] = useState<string | null>(null);
  const panelTitles: Record<LanguageCode, {
    title: string;
    subtitle: string;
    rateBaseline: string;
    legalTagFree: string;
    legalTagMeister: string;
    leadsTag: string;
    viewInquiries: string;
    editTitle: string;
    minRateNotice: string;
    leadArtisanLabel: string;
    saveButton: string;
    cancelButton: string;
    emptyState: string;
  }> = {
    DE: {
      title: "Handwerks-Sparten & Tarife",
      subtitle: "Gewerberechtliche Klassifikation gem. GewO 1994",
      rateBaseline: "Basis: ab €15/Std.",
      legalTagFree: "Freies Handwerk",
      legalTagMeister: "Meister-Kooperation",
      leadsTag: "Anfragen",
      viewInquiries: "Filtern",
      editTitle: "Stundensatz & Meisterteam anpassen",
      minRateNotice: "Gesetzlicher Mindestsatz für Wien: mind. €15,00/Std.",
      leadArtisanLabel: "Zuständiges Meisterteam / Partner",
      saveButton: "Tarif speichern",
      cancelButton: "Abbrechen",
      emptyState: "Keine Handwerks-Sparten verfügbar."
    },
    EN: {
      title: "Trade Categories & Rates",
      subtitle: "Austrian Trade Regulation (GewO) compliance matrix",
      rateBaseline: "Baseline: from €15/h",
      legalTagFree: "Unregulated Trade",
      legalTagMeister: "Master Craft Partner",
      leadsTag: "leads",
      viewInquiries: "Filter",
      editTitle: "Adjust Hourly Rate & Assigned Artisan",
      minRateNotice: "Austrian standard compliance threshold: min. €15.00/h",
      leadArtisanLabel: "Assigned Lead Artisan Team",
      saveButton: "Save Rate",
      cancelButton: "Cancel",
      emptyState: "No service categories available."
    },
    RU: {
      title: "Виды услуг и тарифная сетка",
      subtitle: "Классификация согласно австрийскому закону GewO 1994",
      rateBaseline: "База: от €15/час",
      legalTagFree: "Свободное ремесло",
      legalTagMeister: "Партнер-мастер",
      leadsTag: "заявок",
      viewInquiries: "Фильтр",
      editTitle: "Редактировать базовую ставку и мастера",
      minRateNotice: "Базовый тариф для Вены: не менее €15,00/час",
      leadArtisanLabel: "Назначенная бригада мастеров",
      saveButton: "Сохранить",
      cancelButton: "Отмена",
      emptyState: "Категории услуг отсутствуют."
    }
  };
  const t = panelTitles[currentLang] || panelTitles.EN;
  const handleOpenEdit = (cat: ServiceCategoryItem) => {
    setEditingCategory(cat);
    setInputRate(cat.baselineHourlyRate);
    setInputArtisan(cat.leadArtisan || "");
    setRateError(null);
  };
  const handleSave = () => {
    if (!editingCategory) return;
    if (inputRate < 15) {
      setRateError("Rate must be at least €15.00/h to comply with statutory baseline.");
      return;
    }
    if (onUpdateCategoryRate) {
      onUpdateCategoryRate(editingCategory.id, inputRate, inputArtisan);
    }
    setEditingCategory(null);
  };
  return <div data-controller-name="Service Category Directory Panel" className="flex min-w-0 flex-col rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='categorystatuspanel-r6381691ed9237319-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-1 pb-3 border-b border-border" data-api-unique-id='categorystatuspanel-rdde5547a6baf7404-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
        <div className="flex items-start justify-between gap-2" data-api-unique-id='categorystatuspanel-rcf99035e53dce9b3-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
          <div className="min-w-0 flex-1" data-api-unique-id='categorystatuspanel-ra48a7639bcfa9979-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
            <h3 className="font-display text-sm font-bold text-foreground sm:text-base truncate" data-api-unique-id='categorystatuspanel-raa02f2b0c9be1edd-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
              {t.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate" data-api-unique-id='categorystatuspanel-r0d3aeb5818cf8ae6-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>{t.subtitle}</p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded bg-primary px-2 py-0.5 font-mono text-xs font-bold text-primary-foreground" data-api-unique-id='categorystatuspanel-r81516889241a0e5d-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
            €15/h Ref
          </span>
        </div>
      </div>

      {/* Category list items */}
      <div className="mt-2 flex min-w-0 flex-col divide-y divide-border" data-api-unique-id='categorystatuspanel-rd0e5549a13463e4a-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
        {categories.length === 0 ? <div className="py-6 text-center text-xs text-muted-foreground" data-api-unique-id='categorystatuspanel-r26f8f51d8fc0b566-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
            {t.emptyState}
          </div> : categories.map((cat, index) => {
        const name = currentLang === "DE" ? cat.titleDe : currentLang === "RU" ? cat.titleRu : cat.titleEn;
        const isMeister = cat.craftClassification === "MEISTER_KOOPERATION";
        return <div key={cat.id} className="flex min-w-0 flex-col gap-2 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='categorystatuspanel-rb496e7d01d7098eb-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                <div className="min-w-0 flex-1" data-api-unique-id='categorystatuspanel-rbb0c1a36451ecd0b-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                  <div className="flex flex-wrap items-center gap-1.5" data-api-unique-id='categorystatuspanel-r642ade7852e4d912-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                    <span className="font-medium text-xs text-foreground truncate max-w-[190px]" data-api-unique-id='categorystatuspanel-r9150a50f3e348989-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                      {name}
                    </span>
                    {/* Austrian Craft Legal Badge */}
                    {isMeister ? <span className="inline-flex shrink-0 items-center rounded-sm bg-accent px-1.5 py-0.5 text-[9px] font-semibold text-accent-foreground" data-api-unique-id='categorystatuspanel-rd494847dd832be09-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                        <Shield className="mr-0.5 h-2.5 w-2.5" data-api-unique-id='categorystatuspanel-r8b50fe6ee2978856-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1' />
                        {t.legalTagMeister}
                      </span> : <span className="inline-flex shrink-0 items-center rounded-sm border border-border bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground" data-api-unique-id='categorystatuspanel-r06e597d266b55054-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                        <Check className="mr-0.5 h-2.5 w-2.5 text-success" data-api-unique-id='categorystatuspanel-r7092f9540640db3b-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1' />
                        {t.legalTagFree}
                      </span>}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground font-mono" data-api-unique-id='categorystatuspanel-r24a3f484583a9cc3-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                    <span className="font-semibold text-primary" data-api-unique-id='categorystatuspanel-r451a33857db247f3-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1' data-api-bind-info={`categories-${index}-baselineHourlyRate`} data-api-map-var-name='cat'>
                      €{cat.baselineHourlyRate}/h ({cat.typicalRangeEur})
                    </span>
                    <span data-api-unique-id='categorystatuspanel-r7b2657d8fbb98887-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>•</span>
                    <span className="truncate max-w-[130px]" data-api-unique-id='categorystatuspanel-r5647018ce3078788-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>Team: {cat.leadArtisan || "—"}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex shrink-0 items-center gap-1.5" data-api-unique-id='categorystatuspanel-rb1b5bfd726b24fa2-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                  <span className="font-mono text-xs font-semibold text-foreground" data-api-unique-id='categorystatuspanel-r76a78c5fd6b35d96-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1' data-api-bind-info={`categories-${index}-activeLeadsCount`} data-api-map-var-name='cat'>
                    {cat.activeLeadsCount} {t.leadsTag}
                  </span>

                  {/* Inline Rate Edit Trigger */}
                  <button type="button" onClick={() => handleOpenEdit(cat)} className="inline-flex h-6 w-6 items-center justify-center rounded border border-border bg-muted text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title="Adjust rate & artisan" data-api-unique-id='categorystatuspanel-r0d45e81f14ec6e93-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                    <Edit2 className="h-3 w-3" data-api-unique-id='categorystatuspanel-r8418dbee9e738795-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1' />
                  </button>

                  {onFilterByCategory && <button type="button" onClick={() => onFilterByCategory(cat.key)} className="inline-flex h-6 items-center gap-0.5 rounded border border-border bg-secondary px-2 text-[10px] font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title={`Filter by ${name}`} data-api-unique-id='categorystatuspanel-r8b2c8d3367d08a2b-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>
                      <span data-api-unique-id='categorystatuspanel-r029ef16f09817829-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1'>{t.viewInquiries}</span>
                      <ArrowUpRight className="h-3 w-3" data-api-unique-id='categorystatuspanel-r4fcc7c37b08ed86f-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' data-api-in-loop='1' />
                    </button>}
                </div>
              </div>;
      })}
      </div>

      {/* Austrian Trade legal footnote */}
      <div className="mt-3 border-t border-border pt-2.5 text-[11px] text-muted-foreground" data-api-unique-id='categorystatuspanel-rcf81ae91683184fb-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
        <div className="flex items-start gap-1.5" data-api-unique-id='categorystatuspanel-rf4898722c785b70e-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
          <Info className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" data-api-unique-id='categorystatuspanel-rb0b2dc08e4e7b256-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' />
          <p data-api-unique-id='categorystatuspanel-r493498a0bf81ba4e-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
            Stundensätze verstehen sich als Basiskalkulation zzgl. Material &
            Anfahrt im Wiener Stadtgebiet gem. WKO-Fachgruppenrichtlinie.
          </p>
        </div>
      </div>

      {/* Edit Category Rate Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={open => !open && setEditingCategory(null)} data-api-unique-id='categorystatuspanel-r51a41247a68ce16b-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md p-6 bg-card text-card-foreground border-border" data-api-unique-id='categorystatuspanel-r8b213129551d1499-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
          <DialogHeader data-api-unique-id='categorystatuspanel-r308e0dbbcd4098e7-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
            <DialogTitle className="text-base font-bold font-display text-foreground" data-api-unique-id='categorystatuspanel-r42d103a7d85f43d5-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
              {t.editTitle}
            </DialogTitle>
          </DialogHeader>

          {editingCategory && <div className="flex flex-col gap-4 py-2" data-api-unique-id='categorystatuspanel-r83053bdd4df89037-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
              <div data-api-unique-id='categorystatuspanel-rb08037a7c72df1fb-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                <label className="text-xs font-medium text-foreground block" data-api-unique-id='categorystatuspanel-r493fb81e77ca04e0-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                  Category:{" "}
                  <span className="font-bold" data-api-unique-id='categorystatuspanel-rb2b2665036a5470b-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                    {currentLang === "DE" ? editingCategory.titleDe : currentLang === "RU" ? editingCategory.titleRu : editingCategory.titleEn}
                  </span>
                </label>
                <p className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='categorystatuspanel-rf6f4da6465da6f9a-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                  Classification: {editingCategory.craftClassification}
                </p>
              </div>

              <div data-api-unique-id='categorystatuspanel-r15792a35c533dd2f-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                <label className="text-xs font-semibold text-foreground block mb-1" data-api-unique-id='categorystatuspanel-r5548043fdfbe4e7d-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                  Baseline Hourly Rate (€/h)
                </label>
                <input type="number" min={15} step={1} value={inputRate} onChange={e => {
              setInputRate(Number(e.target.value));
              setRateError(null);
            }} className="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categorystatuspanel-r6c6903ba5caf6167-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' />
                <p className="mt-1 text-[11px] text-muted-foreground" data-api-unique-id='categorystatuspanel-ra814ca47ecbf726e-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                  {t.minRateNotice}
                </p>
                {rateError && <p className="mt-1 text-xs font-medium text-destructive" data-api-unique-id='categorystatuspanel-r2fc57b51ddeab1a8-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>{rateError}</p>}
              </div>

              <div data-api-unique-id='categorystatuspanel-rbef6d61cc29d8cc8-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                <label className="text-xs font-semibold text-foreground block mb-1" data-api-unique-id='categorystatuspanel-rb105431288a226af-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
                  {t.leadArtisanLabel}
                </label>
                <input type="text" value={inputArtisan} onChange={e => setInputArtisan(e.target.value)} placeholder="e.g. Marko (Team 2) or Partner Meisterbetrieb" className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categorystatuspanel-rf85c251b00345814-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel' />
              </div>
            </div>}

          <DialogFooter className="flex items-center justify-end gap-2 pt-2 border-t border-border" data-api-unique-id='categorystatuspanel-re9024d8ed585992d-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
            <button type="button" onClick={() => setEditingCategory(null)} className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted" data-api-unique-id='categorystatuspanel-raaf669f5512bbc6c-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
              {t.cancelButton}
            </button>
            <button type="button" onClick={handleSave} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categorystatuspanel-rff4b9e341fd6592f-s1238484112' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/CategoryStatusPanel'>
              {t.saveButton}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}