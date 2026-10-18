"use client";

import React, { useState } from "react";
import { useHandymanLocale } from "@/lib/use-handyman-locale";
import EditableImg from "@/@base/EditableImg";
import { ServiceCategoryItem } from "@/frontend/types/ServicesCatalog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ShieldCheck, CheckCircle2, Calculator, ArrowRight, AlertOctagon, FileText } from "lucide-react";
interface TradeDetailModalProps {
  category: ServiceCategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateDetail: (categoryKey: string) => void;
  onRequestQuote: (category: ServiceCategoryItem) => void;
}
export default function TradeDetailModal({
  category,
  isOpen,
  onClose,
  onNavigateDetail,
  onRequestQuote
}: TradeDetailModalProps) {
  const locale = useHandymanLocale();
  const title = category ? (locale === "de" ? category.titleDe : locale === "ru" ? category.titleRu : category.titleEn) : "";
  const description = category ? ((locale === "de" ? category.descriptionDe : locale === "ru" ? category.descriptionRu : category.descriptionEn) || category.descriptionEn || category.descriptionDe || category.descriptionRu || "") : "";
  const [estimatedHours, setEstimatedHours] = useState<number>(3);
  if (!category) return null;
  const isMeister = category.craftClassification === "MEISTER_KOOPERATION";
  const estimatedCost = estimatedHours * category.baselineHourlyRate;
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='tradedetailmodal-r6a43bb456a61cbc2-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-2xl p-6 bg-card text-card-foreground border border-border" data-api-unique-id='tradedetailmodal-r269bd322f227d3bb-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
        <DialogHeader className="space-y-2 border-b border-border pb-4" data-api-unique-id='tradedetailmodal-rbfb1bd6e9147f667-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
          <div className="flex items-center justify-between" data-api-unique-id='tradedetailmodal-rb708f77c08c9ce5b-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-semibold uppercase tracking-wider font-display ${isMeister ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`} data-api-unique-id='tradedetailmodal-r3435d4b37fd35176-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              {isMeister ? <>
                  <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='tradedetailmodal-r805b0b709d8d41c4-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
                  Meister-Kooperation
                </> : <>
                  <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='tradedetailmodal-rae16f3ef1d4f1577-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
                  Freies Handwerk (GewO 1994)
                </>}
            </span>
            <span className="font-mono text-xs text-muted-foreground" data-api-unique-id='tradedetailmodal-r5a641f62bed92b71-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              {category.key}
            </span>
          </div>

          <DialogTitle className="font-header text-2xl font-bold text-card-foreground" data-api-unique-id='tradedetailmodal-r2245541238d5b92b-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            {title}
          </DialogTitle>


        </DialogHeader>

        {/* Modal Body */}
        <div className="space-y-6 py-2" data-api-unique-id='tradedetailmodal-r0e79a6ec272b13ad-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
          {/* Cover & Rates Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center" data-api-unique-id='tradedetailmodal-r1fde7b99a0d47bbd-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <div className="sm:col-span-5 aspect-[4/3] rounded-md overflow-hidden bg-muted" data-api-unique-id='tradedetailmodal-raeeee2989c856165-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              <EditableImg propKey={`modal-cat-${category.id}`} src={category.imageUrl || undefined} className="w-full h-full object-cover" alt={title} data-api-unique-id='tradedetailmodal-r5192d69caaf2cc59-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
            </div>

            <div className="sm:col-span-7 space-y-3 bg-background p-4 rounded-md border border-border" data-api-unique-id='tradedetailmodal-r570ae8ba1b8a0536-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              <div className="flex items-baseline justify-between border-b border-border pb-2" data-api-unique-id='tradedetailmodal-r6314274f99a6463b-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <span className="text-xs font-mono uppercase text-muted-foreground" data-api-unique-id='tradedetailmodal-rd9e15f48fcc6abb5-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  Baseline Hourly Rate:
                </span>
                <span className="font-display text-2xl font-bold text-primary" data-api-unique-id='tradedetailmodal-r199b2d4c1eab168f-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  Ab {category.baselineHourlyRate} €/h
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs" data-api-unique-id='tradedetailmodal-rd51bbf21f27afc81-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <span className="text-muted-foreground" data-api-unique-id='tradedetailmodal-r8c9e023c2354f0be-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Typical Rate Range:</span>
                <span className="font-mono font-semibold text-foreground" data-api-unique-id='tradedetailmodal-r3eaca9f44556ba51-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  {category.typicalRangeEur}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs" data-api-unique-id='tradedetailmodal-rce0b24a624d0f749-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <span className="text-muted-foreground" data-api-unique-id='tradedetailmodal-r29fa6e8eaf2d73ac-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Lead Artisan Assigned:</span>
                <span className="font-medium text-foreground" data-api-unique-id='tradedetailmodal-r21d3378d2613aae0-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  {category.leadArtisan || "Vienna Certified Artisan"}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs" data-api-unique-id='tradedetailmodal-r89281700bdbcea09-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <span className="text-muted-foreground" data-api-unique-id='tradedetailmodal-rd79d663ef2f0c15a-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>VAT / USt:</span>
                <span className="text-muted-foreground" data-api-unique-id='tradedetailmodal-rebdeb6f9b3ff0f77-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Inkl. 20% MwSt. (ausweisbar)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2" data-api-unique-id='tradedetailmodal-rf4c08aa0415df916-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='tradedetailmodal-r13c98baa5136fa2b-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              Trade Overview & Specifications
            </h4>
            <p className="text-sm leading-relaxed text-card-foreground font-body" data-api-unique-id='tradedetailmodal-re96cbbd6266938dc-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              {description}
            </p>
          </div>

          {/* Permitted vs Restricted GewO Tasks Matrix */}
          <div className="space-y-4 bg-background p-4 rounded-md border border-border" data-api-unique-id='tradedetailmodal-rd858764cd50bfb95-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <div className="space-y-2" data-api-unique-id='tradedetailmodal-re64065d41a0c6ff6-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-success uppercase tracking-wider" data-api-unique-id='tradedetailmodal-rfc0626cba059a385-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <CheckCircle2 className="h-4 w-4 shrink-0" data-api-unique-id='tradedetailmodal-r62b4db8d8730b31f-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
                <span data-api-unique-id='tradedetailmodal-rcb9b474160901c4a-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Gesetzlich zulässige Arbeiten (GewO 1994)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground pl-5 list-disc" data-api-unique-id='tradedetailmodal-ra7669cf416f518ff-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                {category.permittedTasksUnderGewO?.map((task, i) => <li key={i} data-api-unique-id='tradedetailmodal-rec8d8e2066767a04-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>{task}</li>) || <li data-api-unique-id='tradedetailmodal-r7a9144d9853c8b37-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Ausführung aller reglementierungsfreien Montage- und Instandhaltungsleistungen.</li>}
              </ul>
            </div>

            {category.restrictedMeisterTasks && category.restrictedMeisterTasks.length > 0 && <div className="space-y-2 pt-2 border-t border-border" data-api-unique-id='tradedetailmodal-r61419e55ca6da26f-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-destructive uppercase tracking-wider" data-api-unique-id='tradedetailmodal-r0281407dd9a9ba09-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  <AlertOctagon className="h-4 w-4 shrink-0" data-api-unique-id='tradedetailmodal-rf587315cf0a4be23-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
                  <span data-api-unique-id='tradedetailmodal-r29f88a7f11e7c1dc-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Konzessionspflichtige Meister-Vorbehaltsbereiche</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground pl-5 list-disc" data-api-unique-id='tradedetailmodal-r5543531f1309fba9-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  {category.restrictedMeisterTasks.map((task, index) => <li key={index} data-api-unique-id='tradedetailmodal-r1bb3c8b80f389b41-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' data-api-in-loop='1' data-api-bind-info={`category.restrictedMeisterTasks-${index}-$item`} data-api-map-var-name='task'>{task}</li>)}
                </ul>
              </div>}
          </div>

          {/* Direct Interactive Price Estimator */}
          <div className="bg-secondary/40 border border-border rounded-md p-4 space-y-3" data-api-unique-id='tradedetailmodal-r89a9ddf18e1af2ea-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <div className="flex items-center justify-between" data-api-unique-id='tradedetailmodal-r764f6b5a159b6cb9-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              <div className="flex items-center gap-2" data-api-unique-id='tradedetailmodal-rddc53ec3ddd141d9-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                <Calculator className="h-4 w-4 text-primary" data-api-unique-id='tradedetailmodal-rec4c72620414cb02-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground" data-api-unique-id='tradedetailmodal-r2d29a79eb7ebaded-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                  Instant Cost Calculation (Richtwert)
                </span>
              </div>
              <span className="font-display text-lg font-bold text-primary" data-api-unique-id='tradedetailmodal-r619a5eea57938668-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                ≈ {estimatedCost} €
              </span>
            </div>

            <div className="flex items-center gap-3" data-api-unique-id='tradedetailmodal-r31c94bb48c31e187-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              <label htmlFor="hour-range" className="text-xs text-muted-foreground shrink-0" data-api-unique-id='tradedetailmodal-rf8e4bd384ee4184d-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
                Estimated Hours: <strong className="text-foreground" data-api-unique-id='tradedetailmodal-r6dd1d9482abd6635-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>{estimatedHours} h</strong>
              </label>
              <input id="hour-range" type="range" min="1" max="12" step="1" value={estimatedHours} onChange={e => setEstimatedHours(parseInt(e.target.value, 10))} className="w-full accent-primary" data-api-unique-id='tradedetailmodal-r73542b718358acbb-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
            </div>
            <p className="text-[11px] text-muted-foreground italic" data-api-unique-id='tradedetailmodal-r393acc57d55dcf33-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
              * Indicative net calculation based on {category.baselineHourlyRate} €/h baseline rate. Final fixed quotes require brief site inspection or photo upload.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-4" data-api-unique-id='tradedetailmodal-r2a7940f8dd1db5b3-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
          <button type="button" onClick={() => onNavigateDetail(category.key)} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-card text-foreground border border-border font-semibold px-4 py-2.5 rounded-md hover:bg-muted text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='tradedetailmodal-ree0800ba5b242bcf-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <FileText className="h-4 w-4 text-muted-foreground" data-api-unique-id='tradedetailmodal-rd57bce376db8139f-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
            <span data-api-unique-id='tradedetailmodal-raf2d174289009184-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Open Dedicated Detail Page</span>
          </button>

          <button type="button" onClick={() => onRequestQuote(category)} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-md shadow-primary hover:bg-primary/90 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='tradedetailmodal-r7f1497eba738fcb6-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>
            <span data-api-unique-id='tradedetailmodal-r1ddcf57b66cc181f-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal'>Request Quote for this Craft</span>
            <ArrowRight className="h-4 w-4" data-api-unique-id='tradedetailmodal-r4c1f7ccc0111803f-s1297085974' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradeDetailModal' />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}