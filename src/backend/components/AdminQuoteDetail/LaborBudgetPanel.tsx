"use client";

import React, { useState, useEffect } from "react";
import { QuoteRequestDetailDTO } from "@/backend/types/AdminQuoteDetail";
import { Calculator, Lock, Plus, Minus, Sparkles, Info, Scale, Save, Euro } from "lucide-react";
import { toast } from "sonner";
interface LaborBudgetPanelProps {
  quote: QuoteRequestDetailDTO;
  onUpdateQuote: (updates: Partial<QuoteRequestDetailDTO>) => void;
}
export default function LaborBudgetPanel({
  quote,
  onUpdateQuote
}: LaborBudgetPanelProps) {
  const isCompleted = quote.status === "COMPLETED";
  const baselineRate = Number(quote.serviceCategory.baselineHourlyRate) || 15;

  // Controlled form state
  const [hours, setHours] = useState<number>(quote.estimatedHours || 3);
  const [customHourlyRate, setCustomHourlyRate] = useState<number>(baselineRate);
  const [materialsSurcharge, setMaterialsSurcharge] = useState<number>(quote.hasMaterials ? 0 : 35);
  const [travelSurcharge, setTravelSurcharge] = useState<number>(quote.district.zone === "INNER_CITY" ? 25 : 35);
  const [discountEur, setDiscountEur] = useState<number>(0);
  const [notes, setNotes] = useState<string>(quote.scopeNotes || "");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Synchronize when quote changes
  useEffect(() => {
    setHours(quote.estimatedHours || 3);
    setCustomHourlyRate(baselineRate);
    setMaterialsSurcharge(quote.hasMaterials ? 0 : 35);
    setNotes(quote.scopeNotes || "");
    setIsDirty(false);
  }, [quote.id, quote.estimatedHours, baselineRate, quote.hasMaterials, quote.scopeNotes]);

  // Derived budget calculation
  const laborSubtotal = Math.max(1, hours) * customHourlyRate;
  const grossCalculatedBudget = Math.max(0, laborSubtotal + materialsSurcharge + travelSurcharge - discountEur);
  const handleHourStep = (delta: number) => {
    if (isCompleted) return;
    const newHours = Math.max(1, Math.min(120, hours + delta));
    setHours(newHours);
    setIsDirty(true);
  };
  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;
    onUpdateQuote({
      estimatedHours: hours,
      estimatedBudgetEur: grossCalculatedBudget,
      scopeNotes: notes
    });
    setIsDirty(false);
    toast.success(`Labor & budget updated: ${hours}h @ €${customHourlyRate}/h -> €${grossCalculatedBudget.toFixed(2)} total`);
  };
  const handleResetToBaseline = () => {
    if (isCompleted) return;
    setCustomHourlyRate(baselineRate);
    setMaterialsSurcharge(quote.hasMaterials ? 0 : 35);
    setTravelSurcharge(quote.district.zone === "INNER_CITY" ? 25 : 35);
    setDiscountEur(0);
    setIsDirty(true);
    toast.info("Rates reset to Austrian Trade Service standard defaults");
  };
  /* Extracted array: _items */
  const _items = [2, 4, 6, 8, 12];
  return <div data-controller-name="Labor Hours and Budget Management Panel" className="flex w-full min-w-0 flex-col gap-5 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-6" data-api-unique-id='laborbudgetpanel-r0b0bbaeca304f06a-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
      {/* Panel Header */}
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-3" data-api-unique-id='laborbudgetpanel-r30c836b604392273-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
        <div className="flex min-w-0 items-center gap-2.5" data-api-unique-id='laborbudgetpanel-r7355815ac3521e45-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground" data-api-unique-id='laborbudgetpanel-re3b4265f60899ae9-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            <Calculator className="h-5 w-5" data-api-unique-id='laborbudgetpanel-r1fbf508ffb2b1968-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
          </div>
          <div className="flex min-w-0 flex-col" data-api-unique-id='laborbudgetpanel-r5a7dc074911cfc4c-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            <h2 className="font-header text-base font-bold tracking-tight text-foreground lg:text-lg" data-api-unique-id='laborbudgetpanel-rf70325477ea6ee17-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              Labor Hours & Budget Estimation
            </h2>
            <p className="text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-r23585d80ac0c4d69-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              Official Viennese Master Craft (GewO) rate comparison & gross calculation
            </p>
          </div>
        </div>

        {isCompleted ? <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground" data-api-unique-id='laborbudgetpanel-rf2106a06fe3d448c-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            <Lock className="h-3.5 w-3.5 text-success" data-api-unique-id='laborbudgetpanel-rdfd6ca5707c2f133-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
            <span data-api-unique-id='laborbudgetpanel-r8fec1bc0483c1445-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Audit-Locked (Read Only)</span>
          </div> : <div className="flex shrink-0 items-center gap-2" data-api-unique-id='laborbudgetpanel-rafd7efea4ea07417-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            <button type="button" onClick={handleResetToBaseline} className="inline-flex cursor-pointer items-center gap-1 rounded border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='laborbudgetpanel-r487244898ee1110f-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              <Scale className="h-3 w-3" data-api-unique-id='laborbudgetpanel-r43353031dd8ceaba-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
              <span data-api-unique-id='laborbudgetpanel-r1a48054000cbc840-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Reset Standards</span>
            </button>
          </div>}
      </div>

      {/* Trade Baseline Comparison Banner */}
      <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='laborbudgetpanel-rc0c2fd7d67856f05-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
        <div className="flex min-w-0 items-center gap-2" data-api-unique-id='laborbudgetpanel-r239d2770862daa82-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
          <Info className="h-4 w-4 shrink-0 text-accent" data-api-unique-id='laborbudgetpanel-r4eec10296f403c9f-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
          <span className="min-w-0" data-api-unique-id='laborbudgetpanel-r702a160a7fa12ed7-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            Vienna Chamber Baseline Rate for{" "}
            <strong className="text-foreground" data-api-unique-id='laborbudgetpanel-r034c083caf462b36-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              {quote.serviceCategory.titleEn}
            </strong>
            : minimum <strong className="font-mono text-foreground" data-api-unique-id='laborbudgetpanel-rbf962994b8ca80cd-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>€15.00/h</strong>.
            Category typical bracket:{" "}
            <strong className="font-mono text-foreground" data-api-unique-id='laborbudgetpanel-r51ceacee04d96457-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              {quote.serviceCategory.typicalRangeEur}
            </strong>
            .
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center rounded bg-card px-2 py-0.5 font-mono text-xs font-bold text-card-foreground border border-border" data-api-unique-id='laborbudgetpanel-rede032d20196eeda-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
          Standard: €{baselineRate.toFixed(2)}/h
        </span>
      </div>

      {/* Interactive Calculator Grid */}
      <form onSubmit={handleSaveCalculation} className="flex min-w-0 flex-col gap-5" data-api-unique-id='laborbudgetpanel-r73ca0cfe8576f2ba-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-12" data-api-unique-id='laborbudgetpanel-rbec4c5671d9d0e9d-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
          {/* Left: Input Steppers and Controls (7 cols) */}
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-7" data-api-unique-id='laborbudgetpanel-rf0942e0c03841465-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            {/* 1. Estimated Hours Stepper */}
            <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-card p-3.5" data-api-unique-id='laborbudgetpanel-r03349927de4a3e28-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              <div className="flex items-center justify-between" data-api-unique-id='laborbudgetpanel-r64468d7a90f1e6df-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='laborbudgetpanel-r3a6111a5c43c1768-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Planned Craft Labor Hours (Stundenaufwand)
                </label>
                <span className="font-mono text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-r98991b26c6eb4df7-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  {hours} Hours × €{customHourlyRate.toFixed(2)} = €
                  {(hours * customHourlyRate).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-3" data-api-unique-id='laborbudgetpanel-refd786f8557018b7-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <button type="button" disabled={isCompleted || hours <= 1} onClick={() => handleHourStep(-1)} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" title="Subtract 1 hour" data-api-unique-id='laborbudgetpanel-r91a09b76ad9a3c13-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <Minus className="h-4 w-4" data-api-unique-id='laborbudgetpanel-r721bad5ce06ef5a9-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                </button>

                <div className="relative flex-1" data-api-unique-id='laborbudgetpanel-r0ea92efa5fad34a0-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <input type="number" min={1} max={120} step={1} disabled={isCompleted} value={hours} onChange={e => {
                  setHours(Math.max(1, parseInt(e.target.value, 10) || 1));
                  setIsDirty(true);
                }} className="w-full rounded-lg border border-border bg-background px-4 py-2 text-center font-mono text-xl font-bold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:bg-muted disabled:text-muted-foreground" data-api-unique-id='laborbudgetpanel-r48090b7f8a5dcc8c-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground" data-api-unique-id='laborbudgetpanel-r4522910488a6e8a8-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    Hours
                  </span>
                </div>

                <button type="button" disabled={isCompleted || hours >= 120} onClick={() => handleHourStep(1)} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" title="Add 1 hour" data-api-unique-id='laborbudgetpanel-r4048f7b41cdd519c-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <Plus className="h-4 w-4" data-api-unique-id='laborbudgetpanel-raa39b614a68752c4-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs" data-api-unique-id='laborbudgetpanel-r97ea7dee87132618-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <span className="text-muted-foreground" data-api-unique-id='laborbudgetpanel-r9724b91d84e0ae21-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Quick Presets:</span>
                {_items.map((preset, index) => <button key={preset} type="button" disabled={isCompleted} onClick={() => {
                setHours(preset);
                setIsDirty(true);
              }} className={`rounded px-2 py-0.5 font-mono text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${hours === preset ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-secondary"}`} data-api-unique-id='laborbudgetpanel-rdec705e0d5663675-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' data-api-in-loop='1' data-api-bind-info={`_items-${index}-$item`} data-api-map-var-name='preset'>
                    {preset}h
                  </button>)}
              </div>
            </div>

            {/* 2. Rate & Surcharges Adjustments */}
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2" data-api-unique-id='laborbudgetpanel-r2d5e58ec18759853-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              {/* Applied Hourly Rate */}
              <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-3" data-api-unique-id='laborbudgetpanel-r73d8bb05257733c3-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='laborbudgetpanel-rdc05c4595cbb08c1-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Hourly Rate (€/h)
                </label>
                <div className="relative" data-api-unique-id='laborbudgetpanel-r1b31c8ebf6f0c7ac-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-raf513531ee3c7cb5-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    €
                  </span>
                  <input type="number" min={15} step={1} disabled={isCompleted} value={customHourlyRate} onChange={e => {
                  setCustomHourlyRate(Math.max(15, parseFloat(e.target.value) || 15));
                  setIsDirty(true);
                }} className="w-full rounded-md border border-border bg-background py-1.5 pl-7 pr-3 font-mono text-sm font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:bg-muted" data-api-unique-id='laborbudgetpanel-rfb8048dcf1df4f01-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                </div>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='laborbudgetpanel-rd3d8dbb182234f91-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Min Legal: €15.00/h
                </span>
              </div>

              {/* Materials Provision Status & Surcharge */}
              <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-3" data-api-unique-id='laborbudgetpanel-r64b13ed670ee97f9-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='laborbudgetpanel-rc4640b30466878c1-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Materials Surcharge (€)
                </label>
                <div className="relative" data-api-unique-id='laborbudgetpanel-rd65206e47b325396-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-rbd995d034bf01772-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    €
                  </span>
                  <input type="number" min={0} step={5} disabled={isCompleted} value={materialsSurcharge} onChange={e => {
                  setMaterialsSurcharge(Math.max(0, parseFloat(e.target.value) || 0));
                  setIsDirty(true);
                }} className="w-full rounded-md border border-border bg-background py-1.5 pl-7 pr-3 font-mono text-sm font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:bg-muted" data-api-unique-id='laborbudgetpanel-re05bbfe2b5f5e9bb-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                </div>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='laborbudgetpanel-rd2db8ae17dc08f45-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  {quote.hasMaterials ? "Client supplies materials (€0 base)" : "Company sourcing required"}
                </span>
              </div>

              {/* District Travel Fee */}
              <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-3" data-api-unique-id='laborbudgetpanel-rbc273dc5c6aeadc6-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='laborbudgetpanel-r3facd2b2fb6e38a3-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Vienna Travel Flat Surcharge
                </label>
                <div className="relative" data-api-unique-id='laborbudgetpanel-re849069205e7e874-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-r13e2af23e685b33f-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    €
                  </span>
                  <input type="number" min={0} step={5} disabled={isCompleted} value={travelSurcharge} onChange={e => {
                  setTravelSurcharge(Math.max(0, parseFloat(e.target.value) || 0));
                  setIsDirty(true);
                }} className="w-full rounded-md border border-border bg-background py-1.5 pl-7 pr-3 font-mono text-sm font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:bg-muted" data-api-unique-id='laborbudgetpanel-rcf87bf1dfc3f04cd-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                </div>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='laborbudgetpanel-rd4fef9a90076850f-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Zone: {quote.district.zone} ({quote.district.districtCode})
                </span>
              </div>

              {/* Goodwill / Promo Discount */}
              <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-3" data-api-unique-id='laborbudgetpanel-rd91af99c8bd8681b-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='laborbudgetpanel-r9b2d7a7f3ac41d34-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Special Discount (€)
                </label>
                <div className="relative" data-api-unique-id='laborbudgetpanel-r5c9eb81739d409fb-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-r164fe9ec417e29a2-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    -€
                  </span>
                  <input type="number" min={0} step={5} disabled={isCompleted} value={discountEur} onChange={e => {
                  setDiscountEur(Math.max(0, parseFloat(e.target.value) || 0));
                  setIsDirty(true);
                }} className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 font-mono text-sm font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:bg-muted" data-api-unique-id='laborbudgetpanel-rba0ed2cc97502e1d-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                </div>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='laborbudgetpanel-rd570344ce5769f16-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  First-time client / loyalty concession
                </span>
              </div>
            </div>

            {/* Scope Notes / Costing Rationale */}
            <div className="flex min-w-0 flex-col gap-1.5" data-api-unique-id='laborbudgetpanel-rab346342fd745413-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" data-api-unique-id='laborbudgetpanel-ra8202ea256c8b663-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                Internal Scope & Pricing Breakdown Notes
              </label>
              <textarea rows={2} disabled={isCompleted} value={notes} onChange={e => {
              setNotes(e.target.value);
              setIsDirty(true);
            }} placeholder="E.g., Altbau high ceiling scaffolding fee included, 2 Master craftsmen assigned for 3h block..." className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:bg-muted" data-api-unique-id='laborbudgetpanel-rb05574cc1fa098d8-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
            </div>
          </div>

          {/* Right: Live Calculation Totals Ledger Card (5 cols) */}
          <div className="flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-primary/40 bg-secondary p-4 text-secondary-foreground lg:col-span-5" data-api-unique-id='laborbudgetpanel-rbf98781017160ce0-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
            <div className="flex min-w-0 flex-col gap-3" data-api-unique-id='laborbudgetpanel-r4d7fea6e0ba9cefa-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              <div className="flex items-center justify-between border-b border-border pb-2" data-api-unique-id='laborbudgetpanel-rcc60443973a2ea01-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='laborbudgetpanel-r558d6cbe6476d99c-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Live Cost Breakdown
                </span>
                <span className="font-mono text-xs text-primary font-semibold" data-api-unique-id='laborbudgetpanel-r67b331e9c7551aa5-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Net + Flat Vienna Surcharges
                </span>
              </div>

              {/* Line items */}
              <div className="flex flex-col gap-2 text-xs" data-api-unique-id='laborbudgetpanel-r3ae018d04a07da3f-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='laborbudgetpanel-r460404d6255748b2-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span data-api-unique-id='laborbudgetpanel-r4fd6e5bd9d67fa04-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    Labor: {hours}h × €{customHourlyRate.toFixed(2)}
                  </span>
                  <span className="font-mono font-medium text-foreground" data-api-unique-id='laborbudgetpanel-r1083616a2b6c7d6a-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    €{laborSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='laborbudgetpanel-r3d51e97b1cdf5149-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span data-api-unique-id='laborbudgetpanel-rc089fe5d407fd222-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Materials & Consumables:</span>
                  <span className="font-mono font-medium text-foreground" data-api-unique-id='laborbudgetpanel-r7f64f782dde3f939-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    €{materialsSurcharge.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='laborbudgetpanel-rb406d1d91a4e0ca7-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <span data-api-unique-id='laborbudgetpanel-raf07b9c345735b5a-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Vienna Travel & Tool Dispatch:</span>
                  <span className="font-mono font-medium text-foreground" data-api-unique-id='laborbudgetpanel-rf8ce4d2824e3ff74-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    €{travelSurcharge.toFixed(2)}
                  </span>
                </div>
                {discountEur > 0 && <div className="flex items-center justify-between text-destructive" data-api-unique-id='laborbudgetpanel-r51c8075e2225b23f-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    <span data-api-unique-id='laborbudgetpanel-r140d1d30a577f6c6-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Admin Concession:</span>
                    <span className="font-mono font-medium" data-api-unique-id='laborbudgetpanel-r3872388d7ef90458-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                      -€{discountEur.toFixed(2)}
                    </span>
                  </div>}
              </div>

              {/* Big Total Box */}
              <div className="mt-2 flex flex-col rounded-lg border border-border bg-card p-3.5 text-card-foreground" data-api-unique-id='laborbudgetpanel-r94cd7ce7b131121b-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='laborbudgetpanel-r8a64e8a4c1a1ef1d-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  Total Estimated Budget (Calculated EUR)
                </span>
                <div className="mt-1 flex items-baseline justify-between" data-api-unique-id='laborbudgetpanel-rfbbfab121c68bee2-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <div className="flex items-center gap-1 font-mono text-3xl font-extrabold tracking-tight text-foreground" data-api-unique-id='laborbudgetpanel-r96a22a16a61ee4eb-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    <Euro className="h-7 w-7 text-primary" data-api-unique-id='laborbudgetpanel-ra790fcaf82acc408-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                    <span data-api-unique-id='laborbudgetpanel-r0e02b8644875a2cb-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>{grossCalculatedBudget.toFixed(2)}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground" data-api-unique-id='laborbudgetpanel-rc4d91573a02d92a3-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    incl. Austrian standard
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground" data-api-unique-id='laborbudgetpanel-r074d8f8006902e63-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <Sparkles className="h-3 w-3 text-primary shrink-0" data-api-unique-id='laborbudgetpanel-r6a2b6622d3728364-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                  <span data-api-unique-id='laborbudgetpanel-rb7d6cca8f08d4401-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    Current record total: €
                    {Number(quote.estimatedBudgetEur).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions / Save */}
            <div className="flex flex-col gap-2 pt-2" data-api-unique-id='laborbudgetpanel-re04d3a1f995bce92-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
              {!isCompleted ? <button type="submit" disabled={!isDirty} className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${isDirty ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"}`} data-api-unique-id='laborbudgetpanel-rbb841c2cb8f70aae-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <Save className="h-4 w-4" data-api-unique-id='laborbudgetpanel-re219de93ad9d0e9e-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                  <span data-api-unique-id='laborbudgetpanel-rb7b8fd8f399839eb-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                    {isDirty ? "Commit & Save Recalculation" : "Pricing in Sync"}
                  </span>
                </button> : <div className="flex items-center justify-center gap-2 rounded-lg bg-muted p-2.5 text-center text-xs font-semibold text-muted-foreground" data-api-unique-id='laborbudgetpanel-r1c7f6d4491530f90-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>
                  <Lock className="h-4 w-4 text-success" data-api-unique-id='laborbudgetpanel-r764c225931b3ec13-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel' />
                  <span data-api-unique-id='laborbudgetpanel-rb8777a5bc2d10d6a-s3725913525' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/LaborBudgetPanel'>Finalized Order Budget Locked</span>
                </div>}
            </div>
          </div>
        </div>
      </form>
    </div>;
}