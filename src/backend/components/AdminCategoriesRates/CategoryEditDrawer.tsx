"use client";

import React, { useState, useEffect } from "react";
import { ServiceCategoryItem, CraftClassification, CategoryEditFormState } from "@/backend/types/AdminCategoriesRates";
import { X, AlertTriangle, CheckCircle2, Save, Shield, Users, Star, Euro } from "lucide-react";
interface CategoryEditDrawerProps {
  category: ServiceCategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCategory: ServiceCategoryItem) => void;
}
const PRESET_ARTISAN_PARTNERS = ["Meisterbetrieb Huber & Partner GesbR (1010 Wien)", "Wiener Handwerk Team Nord (1210 Wien)", "Sanitärtechnik Josef Kovacs KG (1070 Wien)", "Bau- & Montagegruppe Donaustadt GmbH (1220 Wien)", "Elektro- & Feininstallation Weber GmbH (1030 Wien)", "Wiener Fliesen & Bodenleger Gilde (1150 Wien)", "Innenausbau & Trockenbau Novak e.U. (1100 Wien)", "Objektbetreuung & Transport Team Wien West (1140 Wien)", "Gewerbebetrieb Fenster & Türen Steiner (1090 Wien)"];
export default function CategoryEditDrawer({
  category,
  isOpen,
  onClose,
  onSave
}: CategoryEditDrawerProps) {
  const [formData, setFormData] = useState<CategoryEditFormState>({
    baselineHourlyRate: 15.0,
    typicalRangeEur: "15 to 25 EUR/h",
    craftClassification: "FREIES_HANDWERK",
    leadArtisan: "",
    isFeatured: false,
    titleDe: "",
    titleEn: "",
    titleRu: ""
  });
  const [rateInput, setRateInput] = useState<string>("15.00");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state whenever active category changes
  useEffect(() => {
    if (category) {
      setFormData({
        baselineHourlyRate: category.baselineHourlyRate,
        typicalRangeEur: category.typicalRangeEur,
        craftClassification: category.craftClassification,
        leadArtisan: category.leadArtisan || "",
        isFeatured: category.isFeatured,
        titleDe: category.titleDe,
        titleEn: category.titleEn,
        titleRu: category.titleRu
      });
      setRateInput(category.baselineHourlyRate.toFixed(2));
      setErrorMsg(null);
    }
  }, [category]);
  if (!isOpen || !category) {
    return null;
  }
  const numericRate = parseFloat(rateInput);
  const isRateSubFloor = isNaN(numericRate) || numericRate < 15.0;
  const handleRateChange = (val: string) => {
    setRateInput(val);
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed < 15.0) {
      setErrorMsg("Vienna Handwerk regulations (GewO 1994) mandate a minimum baseline rate of €15.00/h.");
    } else {
      setErrorMsg(null);
      setFormData(prev => ({
        ...prev,
        baselineHourlyRate: parsed
      }));
    }
  };
  const handleQuickRateAdjust = (delta: number) => {
    const current = isNaN(numericRate) ? 15.0 : numericRate;
    const nextRate = Math.max(15.0, Math.round((current + delta) * 10) / 10);
    setRateInput(nextRate.toFixed(2));
    setErrorMsg(null);
    setFormData(prev => ({
      ...prev,
      baselineHourlyRate: nextRate
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRateSubFloor) {
      setErrorMsg("Cannot persist configuration: baseline rate cannot be lower than €15.00/h.");
      return;
    }
    const updated: ServiceCategoryItem = {
      ...category,
      baselineHourlyRate: numericRate,
      typicalRangeEur: formData.typicalRangeEur.trim() || `${numericRate.toFixed(0)} to ${(numericRate + 15).toFixed(0)} EUR/h`,
      craftClassification: formData.craftClassification,
      leadArtisan: formData.leadArtisan.trim() || null,
      isFeatured: formData.isFeatured,
      titleDe: formData.titleDe.trim() || category.titleDe,
      titleEn: formData.titleEn.trim() || category.titleEn,
      titleRu: formData.titleRu.trim() || category.titleRu,
      updatedAt: new Date()
    };
    onSave(updated);
  };
  return <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in" data-api-unique-id='categoryeditdrawer-r64e3b2440fcad1b8-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10" data-api-unique-id='categoryeditdrawer-r458c5c53e4bcd60f-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
        <div className="w-screen max-w-lg bg-card text-card-foreground shadow-xl border-l border-border flex flex-col justify-between" data-api-unique-id='categoryeditdrawer-rbe1cef6f118eaaf6-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4 sm:p-5" data-api-unique-id='categoryeditdrawer-r0a96705377573c1d-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
            <div className="min-w-0 pr-2" data-api-unique-id='categoryeditdrawer-r1b79dd4e3b542d7e-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <div className="flex items-center gap-2" data-api-unique-id='categoryeditdrawer-rfa4efc541277c670-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <span className="font-mono text-xs font-semibold text-primary" data-api-unique-id='categoryeditdrawer-r011f39587f301b96-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  {category.key}
                </span>
                <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-border" data-api-unique-id='categoryeditdrawer-r3b90beba1a9def66-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  ID: {category.id.slice(0, 8)}
                </span>
              </div>
              <h2 className="mt-1 font-header text-lg font-bold tracking-tight text-foreground truncate" data-api-unique-id='categoryeditdrawer-rfb9360b52e6e2845-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                Configure {category.titleEn}
              </h2>
              <p className="text-xs text-muted-foreground" data-api-unique-id='categoryeditdrawer-r04a03f7560bcfa19-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                GewO 1994 compliance parameters & statutory wage floor control
              </p>
            </div>
            <button type="button" onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title="Close drawer" data-api-unique-id='categoryeditdrawer-rdcde608c32aad4df-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <X className="h-5 w-5" data-api-unique-id='categoryeditdrawer-r47e80699993e18fe-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
            </button>
          </div>

          {/* Form Body - Scrollable */}
          <form id="category-edit-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5" data-api-unique-id='categoryeditdrawer-r3f1c0a42c8002d30-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
            {/* 1. Baseline Hourly Rate Interceptor */}
            <div className="rounded-lg border border-border bg-background p-4 space-y-3" data-api-unique-id='categoryeditdrawer-rb3a55301a9a1677d-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <div className="flex items-start justify-between gap-2" data-api-unique-id='categoryeditdrawer-rb9d86c76c85ec4a9-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <div data-api-unique-id='categoryeditdrawer-r8490f9a3054648b8-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <label htmlFor="baseline-rate" className="text-xs font-semibold text-foreground flex items-center gap-1.5" data-api-unique-id='categoryeditdrawer-r7dc0533bf24ac847-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    <Euro className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='categoryeditdrawer-r47fd82120aac3126-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                    <span data-api-unique-id='categoryeditdrawer-r3c516985ab58345a-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Statutory Baseline Hourly Rate (€/h)</span>
                    <span className="text-destructive" data-api-unique-id='categoryeditdrawer-r8bdf166df5ee6a1b-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>*</span>
                  </label>
                  <p className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='categoryeditdrawer-r273a51a568f77739-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    Legally mandated minimum price per craftsman hour (strictly ≥ €15.00/h).
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-primary" data-api-unique-id='categoryeditdrawer-r051153abd46498bc-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Min: €15.00</span>
              </div>

              {/* Number input and increment helpers */}
              <div className="flex items-center gap-2" data-api-unique-id='categoryeditdrawer-r31a2f0c6095252c7-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <div className="relative flex-1" data-api-unique-id='categoryeditdrawer-rebb335d70caa654b-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground" data-api-unique-id='categoryeditdrawer-r083d72a57c07051a-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    €
                  </span>
                  <input id="baseline-rate" type="number" step="0.5" min="15.00" value={rateInput} onChange={e => handleRateChange(e.target.value)} className={`w-full rounded-md border pl-7 pr-12 py-2 text-sm font-mono font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 ${isRateSubFloor ? "border-destructive bg-destructive/10 focus-visible:ring-destructive" : "border-input bg-card focus-visible:ring-ring"}`} placeholder="15.00" required data-api-unique-id='categoryeditdrawer-ra5dcbda092303217-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" data-api-unique-id='categoryeditdrawer-r00a95dc51206b118-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    EUR/h
                  </span>
                </div>

                <div className="flex items-center gap-1" data-api-unique-id='categoryeditdrawer-re4c8dc1fa1c9771c-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <button type="button" onClick={() => handleQuickRateAdjust(-1)} disabled={numericRate <= 15.0} className="rounded-md border border-border bg-muted px-2 py-2 text-xs font-mono font-semibold text-muted-foreground hover:bg-secondary disabled:opacity-40" title="Decrement €1.00" data-api-unique-id='categoryeditdrawer-r413ac4a6aafd7b31-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    -1
                  </button>
                  <button type="button" onClick={() => handleQuickRateAdjust(1)} className="rounded-md border border-border bg-muted px-2 py-2 text-xs font-mono font-semibold text-muted-foreground hover:bg-secondary" title="Increment €1.00" data-api-unique-id='categoryeditdrawer-r0fb01b73aa1aa5a6-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    +1
                  </button>
                  <button type="button" onClick={() => handleQuickRateAdjust(5)} className="rounded-md border border-border bg-muted px-2 py-2 text-xs font-mono font-semibold text-muted-foreground hover:bg-secondary" title="Increment €5.00" data-api-unique-id='categoryeditdrawer-rfc5d99d675cc7279-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    +5
                  </button>
                </div>
              </div>

              {/* Validation Warning Alert */}
              {isRateSubFloor ? <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-2.5 text-xs text-destructive border border-destructive/20" data-api-unique-id='categoryeditdrawer-r811c4324a6ec5a34-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" data-api-unique-id='categoryeditdrawer-r15183ecad56e5b3c-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  <div className="min-w-0" data-api-unique-id='categoryeditdrawer-r296152c63cd1b496-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    <span className="font-semibold" data-api-unique-id='categoryeditdrawer-r30713e7c6f27ffa8-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Sub-floor Violation:</span>{" "}
                    {errorMsg || "Rate cannot be lower than €15.00/h under Vienna Handwerk policy."}
                  </div>
                </div> : <div className="flex items-center gap-2 text-[11px] text-success" data-api-unique-id='categoryeditdrawer-r9e44c44f3a800944-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" data-api-unique-id='categoryeditdrawer-r3e7d9be472988ca5-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  <span data-api-unique-id='categoryeditdrawer-rde1e531061f31bef-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Complies with Austrian Trade Code minimum compensation floor.</span>
                </div>}
            </div>

            {/* 2. Typical Pricing Range String */}
            <div className="space-y-1.5" data-api-unique-id='categoryeditdrawer-rc3e2766fba34e3fe-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <label htmlFor="typical-range" className="text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='categoryeditdrawer-rd0527969e31f6486-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <span data-api-unique-id='categoryeditdrawer-rc974b3c4fedad527-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Typical Pricing Range Description</span>
                <span className="text-[11px] font-normal text-muted-foreground" data-api-unique-id='categoryeditdrawer-r8cb3bc05696da7d7-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>e.g., '15 to 25 EUR/h'</span>
              </label>
              <input id="typical-range" type="text" value={formData.typicalRangeEur} onChange={e => setFormData({
              ...formData,
              typicalRangeEur: e.target.value
            })} placeholder="20 to 35 EUR/h" className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-rcc97b1399b8940e4-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
              <p className="text-[11px] text-muted-foreground" data-api-unique-id='categoryeditdrawer-r22ac983868a3d5f4-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                Display string provided to customers on estimates and standard quotes.
              </p>
            </div>

            {/* 3. Austrian Craft Classification (GewO 1994) Radios */}
            <div className="space-y-2" data-api-unique-id='categoryeditdrawer-r93d51584830130f4-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5" data-api-unique-id='categoryeditdrawer-rbec99309c8a88997-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <Shield className="h-3.5 w-3.5 text-accent shrink-0" data-api-unique-id='categoryeditdrawer-re841c9db162202a1-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                <span data-api-unique-id='categoryeditdrawer-r73aad8c3fdd9114a-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Austrian GewO 1994 Regulatory Classification</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" data-api-unique-id='categoryeditdrawer-r3a2b713166aca7d3-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                {/* Option A: Freies Handwerk */}
                <label className={`flex cursor-pointer flex-col rounded-md border p-3 transition-colors ${formData.craftClassification === "FREIES_HANDWERK" ? "border-accent bg-accent/10" : "border-border bg-background hover:bg-muted"}`} data-api-unique-id='categoryeditdrawer-rb0147359774f675f-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <div className="flex items-center justify-between" data-api-unique-id='categoryeditdrawer-r88691bd8494cb837-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    <span className="text-xs font-semibold text-foreground" data-api-unique-id='categoryeditdrawer-rfebd598726e91906-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Freies Handwerk</span>
                    <input type="radio" name="craftClassification" value="FREIES_HANDWERK" checked={formData.craftClassification === "FREIES_HANDWERK"} onChange={() => setFormData({
                    ...formData,
                    craftClassification: "FREIES_HANDWERK"
                  })} className="accent-accent" data-api-unique-id='categoryeditdrawer-r943eae6c5f88da72-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  </div>
                  <span className="mt-1 text-[11px] text-muted-foreground" data-api-unique-id='categoryeditdrawer-r9cd8db3088eee0f2-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    Unrestricted trade. No mandatory master craftsman (Meisterbrief) license required.
                  </span>
                </label>

                {/* Option B: Meister-Kooperation */}
                <label className={`flex cursor-pointer flex-col rounded-md border p-3 transition-colors ${formData.craftClassification === "MEISTER_KOOPERATION" ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted"}`} data-api-unique-id='categoryeditdrawer-rba78a0783322bd52-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <div className="flex items-center justify-between" data-api-unique-id='categoryeditdrawer-rbd71b3aee64eeb1f-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    <span className="text-xs font-semibold text-foreground" data-api-unique-id='categoryeditdrawer-re9c4fd21dce8f0b9-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Meister-Kooperation</span>
                    <input type="radio" name="craftClassification" value="MEISTER_KOOPERATION" checked={formData.craftClassification === "MEISTER_KOOPERATION"} onChange={() => setFormData({
                    ...formData,
                    craftClassification: "MEISTER_KOOPERATION"
                  })} className="accent-primary" data-api-unique-id='categoryeditdrawer-r228712f705a78d2a-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  </div>
                  <span className="mt-1 text-[11px] text-muted-foreground" data-api-unique-id='categoryeditdrawer-r48819c6346895600-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    Regulated trade. Subcontracted to certified Meisterbetrieb under WKO guild agreements.
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Assigned Lead Artisan Team / Company */}
            <div className="space-y-1.5" data-api-unique-id='categoryeditdrawer-r2a574720c5001d7d-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <label htmlFor="lead-artisan" className="text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='categoryeditdrawer-r95c2a3046eb60584-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <span className="flex items-center gap-1.5" data-api-unique-id='categoryeditdrawer-r0f11a468769b4916-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" data-api-unique-id='categoryeditdrawer-re475ebf59a6c5d41-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  <span data-api-unique-id='categoryeditdrawer-rf57e0fa105541228-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Designated Lead Artisan Partner / Company</span>
                </span>
                <span className="text-[11px] font-normal text-muted-foreground" data-api-unique-id='categoryeditdrawer-r708657869aee3585-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Viennese Partner</span>
              </label>
              <input id="lead-artisan" type="text" list="artisan-presets" value={formData.leadArtisan} onChange={e => setFormData({
              ...formData,
              leadArtisan: e.target.value
            })} placeholder="Select or enter registered artisan company..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-rd33fed3b5e635424-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
              <datalist id="artisan-presets" data-api-unique-id='categoryeditdrawer-r4afce9369011a305-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                {PRESET_ARTISAN_PARTNERS.map((preset, index) => <option key={preset} value={preset} data-api-unique-id='categoryeditdrawer-r73b35e4c71249c07-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' data-api-in-loop='1' />)}
              </datalist>
              <p className="text-[11px] text-muted-foreground" data-api-unique-id='categoryeditdrawer-r7de34cd859f34aac-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                Primary partner guild or lead contractor responsible for dispatch quality control.
              </p>
            </div>

            {/* 5. Multilingual Title Overrides */}
            <div className="rounded-lg border border-border bg-background p-3 space-y-2" data-api-unique-id='categoryeditdrawer-r48b44b4df48bf58a-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <span className="text-xs font-semibold text-foreground block" data-api-unique-id='categoryeditdrawer-rd02f7970fb872384-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                Multilingual Category Titles (DE / EN / RU)
              </span>
              <div className="grid grid-cols-1 gap-2" data-api-unique-id='categoryeditdrawer-r89af47309be7781f-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <div className="flex items-center gap-2" data-api-unique-id='categoryeditdrawer-r70ee5320721edd7c-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <span className="w-8 shrink-0 text-right font-mono text-[11px] font-bold text-muted-foreground" data-api-unique-id='categoryeditdrawer-r025acf3a0cc44434-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    DE:
                  </span>
                  <input type="text" value={formData.titleDe} onChange={e => setFormData({
                  ...formData,
                  titleDe: e.target.value
                })} className="flex-1 rounded-md border border-input bg-card px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-rfeaab3baa31c3cdc-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                </div>
                <div className="flex items-center gap-2" data-api-unique-id='categoryeditdrawer-r3178f4e9e379cd93-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <span className="w-8 shrink-0 text-right font-mono text-[11px] font-bold text-muted-foreground" data-api-unique-id='categoryeditdrawer-r8e44f6010c66cd32-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    EN:
                  </span>
                  <input type="text" value={formData.titleEn} onChange={e => setFormData({
                  ...formData,
                  titleEn: e.target.value
                })} className="flex-1 rounded-md border border-input bg-card px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-r8f744142dd2bae79-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                </div>
                <div className="flex items-center gap-2" data-api-unique-id='categoryeditdrawer-r2a32f332cfd185b9-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <span className="w-8 shrink-0 text-right font-mono text-[11px] font-bold text-muted-foreground" data-api-unique-id='categoryeditdrawer-r42c2d42246e1f7be-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                    RU:
                  </span>
                  <input type="text" value={formData.titleRu} onChange={e => setFormData({
                  ...formData,
                  titleRu: e.target.value
                })} className="flex-1 rounded-md border border-input bg-card px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-rc81cb09759a7ffdd-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                </div>
              </div>
            </div>

            {/* 6. Featured Showcase Status Flag */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3" data-api-unique-id='categoryeditdrawer-r27ebaec92fbdf5bf-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <div className="space-y-0.5 pr-2" data-api-unique-id='categoryeditdrawer-r9d729eb44dc06ec4-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                <label htmlFor="is-featured-switch" className="text-xs font-semibold text-foreground flex items-center gap-1.5 cursor-pointer" data-api-unique-id='categoryeditdrawer-rf97f4087796b9b2e-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  <Star className={`h-3.5 w-3.5 ${formData.isFeatured ? "text-warning fill-warning" : "text-muted-foreground"}`} data-api-unique-id='categoryeditdrawer-r4eb84f091c2d1505-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
                  <span data-api-unique-id='categoryeditdrawer-redd80f05dcef0963-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Featured Showcase Visibility</span>
                </label>
                <p className="text-[11px] text-muted-foreground" data-api-unique-id='categoryeditdrawer-r0c25f9488fd51556-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
                  Highlight this category on customer booking homepage & direct booking bar.
                </p>
              </div>
              <input id="is-featured-switch" type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({
              ...formData,
              isFeatured: e.target.checked
            })} className="h-4 w-4 rounded-sm border-input accent-primary cursor-pointer" data-api-unique-id='categoryeditdrawer-r50dab42b07ed53e8-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
            </div>
          </form>

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-border bg-card p-4 sm:p-5" data-api-unique-id='categoryeditdrawer-rdc0f1dab56074962-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
            <button type="button" onClick={onClose} className="rounded-md border border-border bg-secondary px-3.5 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-r9caf3ff1cb997c76-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              Cancel
            </button>

            <button type="submit" form="category-edit-form" disabled={isRateSubFloor} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='categoryeditdrawer-rdf7e571d8bb912e5-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>
              <Save className="h-4 w-4 shrink-0" data-api-unique-id='categoryeditdrawer-r1526bed9fd01595c-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer' />
              <span data-api-unique-id='categoryeditdrawer-rd7de57136595b3c9-s2694045836' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryEditDrawer'>Persist Category Rates</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
}