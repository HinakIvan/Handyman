"use client";

import React from "react";
import { ServiceCategoryItem } from "@/frontend/types/QuoteRequestForm";
import { Wrench, Hammer, Paintbrush, Sparkles, Layers, ShieldCheck, Check, Info } from "lucide-react";
interface CategorySelectorProps {
  categories: ServiceCategoryItem[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}
const getCategoryIcon = (key: string) => {
  switch (key) {
    case "DEMOLITION":
      return <Hammer className="w-5 h-5" data-api-unique-id='categoryselector-ref79c5979d05d580-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />;
    case "FLOORING":
      return <Layers className="w-5 h-5" data-api-unique-id='categoryselector-rfaf740f8dcda931e-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />;
    case "PAINTING":
      return <Paintbrush className="w-5 h-5" data-api-unique-id='categoryselector-r6b65d6b2cd0c2540-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />;
    case "DRYWALL":
      return <Sparkles className="w-5 h-5" data-api-unique-id='categoryselector-rf6b85ee011454d33-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />;
    case "BATHROOM_KITCHEN":
    case "PLUMBING_MINOR":
      return <Wrench className="w-5 h-5" data-api-unique-id='categoryselector-ra8257524c51c9d0d-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />;
    default:
      return <Wrench className="w-5 h-5" data-api-unique-id='categoryselector-r13e2e83f15f40678-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />;
  }
};
export default function CategorySelector({
  categories = [],
  selectedCategoryId,
  onSelectCategory
}: CategorySelectorProps) {
  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];
  return <div data-controller-name="Craft Discipline Selector" className="bg-card text-card-foreground border border-border rounded-lg p-6 sm:p-8 space-y-6 shadow-soft" data-api-unique-id='categoryselector-r56fa0ccb00d117af-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4" data-api-unique-id='categoryselector-rab4f01782526cc5f-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
        <div data-api-unique-id='categoryselector-rf1bad75ef8ce9b18-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
          <h2 className="text-xl sm:text-2xl font-bold font-header tracking-tight" data-api-unique-id='categoryselector-r9e0127f9db4b2314-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            1. Select Trade Discipline
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5" data-api-unique-id='categoryselector-r2d56ffb0811d36ee-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            WKO Gewerbeordnung regulatory taxonomy: Free handyman crafts or licensed master trades.
          </p>
        </div>
        <div className="flex items-center gap-2" data-api-unique-id='categoryselector-rf2593a1722eb2782-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
          <span className="text-xs px-2.5 py-1 rounded-sm bg-secondary text-secondary-foreground font-mono" data-api-unique-id='categoryselector-re43bd34614a32323-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            GewO § 94 Division
          </span>
        </div>
      </div>

      {/* Featured Active Category Blueprint Spec Banner */}
      {selectedCategory && <div className="p-5 rounded-md border-2 border-primary bg-background text-foreground space-y-4" data-api-unique-id='categoryselector-ra480ef2199343d88-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" data-api-unique-id='categoryselector-rdd697b8120c911f0-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            <div className="flex items-center gap-3" data-api-unique-id='categoryselector-rac464114841599d2-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
              <div className="p-2.5 rounded-md bg-primary text-primary-foreground" data-api-unique-id='categoryselector-r32461363884b149c-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                {getCategoryIcon(selectedCategory.key)}
              </div>
              <div data-api-unique-id='categoryselector-rf7f77cb840ed25ed-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                <div className="flex flex-wrap items-center gap-2" data-api-unique-id='categoryselector-r7ab7f4d28774ac96-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                  <h3 className="text-lg font-bold font-header" data-api-unique-id='categoryselector-r62405559536550b7-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                    {selectedCategory.titleEn}
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium" data-api-unique-id='categoryselector-r792df5bc44372bc6-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                    ({selectedCategory.titleDe} • {selectedCategory.titleRu})
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5" data-api-unique-id='categoryselector-r5a3470f4c17e617a-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                  {selectedCategory.descriptionEn || "Official licensed Viennese renovation craft."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end" data-api-unique-id='categoryselector-r1986874d713dc718-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider ${selectedCategory.craftClassification === "FREIES_HANDWERK" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`} data-api-unique-id='categoryselector-rd5411828f2008245-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" data-api-unique-id='categoryselector-rf7f9cd3eacffb0d6-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />
                {selectedCategory.craftClassification === "FREIES_HANDWERK" ? "Freies Handwerk (Standard)" : "Meister Kooperation"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border text-xs" data-api-unique-id='categoryselector-rc102beb687a9bb41-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            <div className="p-2.5 rounded bg-card text-card-foreground border border-border" data-api-unique-id='categoryselector-r05f0083c4934d651-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider" data-api-unique-id='categoryselector-r1fee24a2ecce0ccb-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                Baseline Hourly Rate
              </span>
              <span className="text-base font-bold font-mono text-primary" data-api-unique-id='categoryselector-r5d9c404b47a45eab-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                € {Number(selectedCategory.baselineHourlyRate || 0).toFixed(2)} / h
              </span>
            </div>
            <div className="p-2.5 rounded bg-card text-card-foreground border border-border" data-api-unique-id='categoryselector-r179c8aaf0fc1759c-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
              <span className="text-muted-foreground block text-[11px] uppercase tracking-wider" data-api-unique-id='categoryselector-r34ad47072331a965-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                Typical Vienna Project Range
              </span>
              <span className="text-sm font-semibold font-mono text-foreground" data-api-unique-id='categoryselector-r8922c0a6dd98a00e-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                {selectedCategory.typicalRangeEur}
              </span>
            </div>
            <div className="p-2.5 rounded bg-card text-card-foreground border border-border flex items-center justify-between" data-api-unique-id='categoryselector-rd6e1f9d35de7efc2-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
              <div data-api-unique-id='categoryselector-ra15b32eb9f15f9c3-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider" data-api-unique-id='categoryselector-r32aea0959342f9da-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                  Lead Artisan
                </span>
                <span className="text-xs font-medium text-foreground" data-api-unique-id='categoryselector-r1ac035fd1a29802e-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
                  {selectedCategory.leadArtisan || "Vienna Meister Pool"}
                </span>
              </div>
              <Info className="w-4 h-4 text-muted-foreground shrink-0" data-api-unique-id='categoryselector-rdd083767d72e6663-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' />
            </div>
          </div>
        </div>}

      {/* Grid of Other Available Service Categories */}
      <div className="space-y-3" data-api-unique-id='categoryselector-r951284100cd1fee2-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
        <label className="text-xs uppercase font-semibold tracking-wider text-muted-foreground block" data-api-unique-id='categoryselector-ref767b3f52a3a4e5-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
          Available Service Categories (Click to switch)
        </label>
        {categories.length === 0 ? <p className="text-sm text-muted-foreground py-4 text-center" data-api-unique-id='categoryselector-ra149b5cd4cbe662b-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            No service categories available.
          </p> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" data-api-unique-id='categoryselector-rbeabbef573baf1e0-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector'>
            {categories.map((cat, index) => {
          const isSelected = cat.id === selectedCategoryId;
          return <button key={cat.id} type="button" onClick={() => onSelectCategory(cat.id)} className={`text-left p-3.5 rounded-md border transition-all text-sm flex flex-col justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-card hover:bg-secondary/60 text-card-foreground"}`} data-api-unique-id='categoryselector-rcfa0471810d529fd-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                  <div className="flex items-start justify-between gap-2 w-full" data-api-unique-id='categoryselector-r20f0a76bd2dcc73f-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                    <div className="flex items-center gap-2.5 min-w-0" data-api-unique-id='categoryselector-r2e3069a34c4e2ebd-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                      <span className={`p-1.5 rounded ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} data-api-unique-id='categoryselector-raf824e3512c8a723-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                        {getCategoryIcon(cat.key)}
                      </span>
                      <div className="min-w-0" data-api-unique-id='categoryselector-rc35074e6d09da6e7-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                        <p className="font-semibold text-foreground truncate" data-api-unique-id='categoryselector-refe3056b5f7325b8-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleEn`} data-api-map-var-name='cat'>
                          {cat.titleEn}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate" data-api-unique-id='categoryselector-r96c111cfb47ef83e-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleDe`} data-api-map-var-name='cat'>
                          {cat.titleDe} • {cat.titleRu}
                        </p>
                      </div>
                    </div>
                    {isSelected && <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0" data-api-unique-id='categoryselector-r59de1a3a44c93c3b-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                        <Check className="w-3 h-3" data-api-unique-id='categoryselector-r98d0ffc0bbdf59cb-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1' />
                      </span>}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs w-full" data-api-unique-id='categoryselector-r5d1eda137d8510f8-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                    <span className="font-mono font-bold text-primary" data-api-unique-id='categoryselector-r3e174ffeaf470bb5-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                      € {Number(cat.baselineHourlyRate || 0).toFixed(2)}/h
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono" data-api-unique-id='categoryselector-r34f1badc542055bc-s3513783398' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/CategorySelector' data-api-in-loop='1'>
                      {cat.craftClassification === "FREIES_HANDWERK" ? "Frei" : "Meister"}
                    </span>
                  </div>
                </button>;
        })}
          </div>}
      </div>
    </div>;
}