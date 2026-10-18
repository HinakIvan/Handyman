"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ServiceCategoryItem } from "@/frontend/types/ServicesCatalog";
import { ArrowRight, CheckCircle2, ShieldCheck, User, SearchX } from "lucide-react";
interface TradesCatalogGridProps {
  categories: ServiceCategoryItem[];
  onSelectCategory: (category: ServiceCategoryItem) => void;
  onResetFilters: () => void;
}
export default function TradesCatalogGrid({
  categories,
  onSelectCategory,
  onResetFilters
}: TradesCatalogGridProps) {
  if (categories.length === 0) {
    return <section data-controller-name="Trades Catalog Grid" className="w-full bg-card border-b border-border py-16" data-api-unique-id='tradescataloggrid-rcf60cd0509f3ac5b-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4" data-api-unique-id='tradescataloggrid-r37bc61a7faa60cf9-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted text-muted-foreground mx-auto" data-api-unique-id='tradescataloggrid-r9efb395846429dcf-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
            <SearchX className="h-6 w-6" data-api-unique-id='tradescataloggrid-r36f14bf504df080e-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' />
          </div>
          <h3 className="font-header text-xl font-bold text-card-foreground" data-api-unique-id='tradescataloggrid-r035bbb4777fdf1ad-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
            No matching craft categories found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto" data-api-unique-id='tradescataloggrid-re6a4f94b6d125da0-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
            We could not find any handyman trade matching your keyword or Austrian craft classification filter.
          </p>
          <button type="button" onClick={onResetFilters} className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-md shadow-sm hover:bg-primary/90 transition-colors" data-api-unique-id='tradescataloggrid-r28f16101f5299c4c-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
            Reset All Filters
          </button>
        </div>
      </section>;
  }
  return <section data-controller-name="Trades Catalog Grid" className="w-full bg-card border-b border-border py-12 sm:py-16" data-api-unique-id='tradescataloggrid-rc76cb872e1e4b6c3-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8" data-api-unique-id='tradescataloggrid-rd607d0120bebd1a7-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-3" data-api-unique-id='tradescataloggrid-rc33dfe5ae67def51-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
          <div data-api-unique-id='tradescataloggrid-r75a72584ba1087ad-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
            <h2 className="font-header text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground" data-api-unique-id='tradescataloggrid-re6000f1e45f46ca7-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
              All Trade Categories (Austrian GewO 1994 Standards)
            </h2>
            <p className="text-sm text-muted-foreground mt-1" data-api-unique-id='tradescataloggrid-r2b661030255758ad-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
              Transparent baseline hourly wages starting from €15/h with assigned master and certified craftsmen.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground" data-api-unique-id='tradescataloggrid-r7c0739758eda54c3-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
            CATALOGUE MATRIX · 11 DISCIPLINES
          </span>
        </div>

        {/* Modular Architectural 2x4 (and responsive) Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-api-unique-id='tradescataloggrid-r9ad8b5e6176cdb62-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid'>
          {categories.map((category, index) => {
          const isMeister = category.craftClassification === "MEISTER_KOOPERATION";
          return <article key={category.id} onClick={() => onSelectCategory(category)} className="bg-background text-foreground border border-border rounded-lg shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-shadow cursor-pointer" data-api-unique-id='tradescataloggrid-rf82f3be28ecb6b1d-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                {/* Visual Cover / Spec Header */}
                <div className="relative aspect-[4/3] w-full bg-muted overflow-hidden" data-api-unique-id='tradescataloggrid-r036c7d39f9dbe48d-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                  <EditableImg propKey={`cat-card-${category.id}`} src={category.imageUrl || undefined} className="w-full h-full object-cover" alt={category.titleEn} data-api-unique-id='tradescataloggrid-r5a5d45b0561f13e2-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' />

                  {/* Corner Spec Stamp Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2" data-api-unique-id='tradescataloggrid-r5077abde51edd161-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wider uppercase font-display shadow-soft ${isMeister ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`} data-api-unique-id='tradescataloggrid-r1545c70dd5f4ac38-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                      {isMeister ? <>
                          <ShieldCheck className="h-3 w-3 shrink-0" data-api-unique-id='tradescataloggrid-r476bc4a9859b4525-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' />
                          Meister-Kooperation
                        </> : <>
                          <CheckCircle2 className="h-3 w-3 shrink-0" data-api-unique-id='tradescataloggrid-r537acfcff04db720-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' />
                          Freies Handwerk
                        </>}
                    </span>

                    {category.isFeatured && <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-primary text-primary-foreground text-[10px] font-bold uppercase shadow-soft" data-api-unique-id='tradescataloggrid-r217d526414c40204-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                        Featured
                      </span>}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between" data-api-unique-id='tradescataloggrid-r14d4c87e13dcf146-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                  <div className="space-y-3" data-api-unique-id='tradescataloggrid-r76015af9b90968a6-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                    {/* Trilingual Title Block */}
                    <div data-api-unique-id='tradescataloggrid-rfc650b70662bb1ff-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                      <h3 className="font-header text-lg font-bold leading-tight text-foreground line-clamp-1" data-api-unique-id='tradescataloggrid-ra5704dd446d21abe-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleEn`} data-api-map-var-name='category'>
                        {category.titleEn}
                      </h3>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5 line-clamp-1" data-api-unique-id='tradescataloggrid-rc48793c6dd8a3389-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleDe`} data-api-map-var-name='category'>
                        DE: {category.titleDe}
                      </p>
                      <p className="text-[11px] text-muted-foreground/80 line-clamp-1" data-api-unique-id='tradescataloggrid-rebfc2c430ff192f1-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleRu`} data-api-map-var-name='category'>
                        RU: {category.titleRu}
                      </p>
                    </div>

                    {/* Hourly Pricing Bar */}
                    <div className="bg-card p-3 rounded border border-border flex items-baseline justify-between" data-api-unique-id='tradescataloggrid-r72dd1d0cc87c88e9-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                      <div data-api-unique-id='tradescataloggrid-r537884aedaa1e132-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block" data-api-unique-id='tradescataloggrid-r234691dfe3907b9e-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                          Starting Base Rate
                        </span>
                        <span className="font-display text-xl font-bold text-primary" data-api-unique-id='tradescataloggrid-rceb8cb6749764be6-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' data-api-bind-info={`categories-${index}-baselineHourlyRate`} data-api-map-var-name='category'>
                          Ab {category.baselineHourlyRate} €/h
                        </span>
                      </div>
                      <div className="text-right" data-api-unique-id='tradescataloggrid-r5a93832daf45fa83-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block" data-api-unique-id='tradescataloggrid-rfa101285b4e05f0e-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                          Typical Range
                        </span>
                        <span className="text-xs font-semibold text-foreground font-mono" data-api-unique-id='tradescataloggrid-r5aba118910f2e0dd-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' data-api-bind-info={`categories-${index}-typicalRangeEur`} data-api-map-var-name='category'>
                          {category.typicalRangeEur}
                        </span>
                      </div>
                    </div>

                    {/* Brief Excerpt */}
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" data-api-unique-id='tradescataloggrid-r3ffd2a2d6019d09c-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' data-api-bind-info={`categories-${index}-descriptionEn`} data-api-map-var-name='category'>
                      {category.descriptionEn}
                    </p>
                  </div>

                  {/* Footer Meta & Inspect Link */}
                  <div className="pt-3 border-t border-border mt-3 flex flex-col gap-3" data-api-unique-id='tradescataloggrid-rdbc3b4aa7d3a00dc-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                    <div className="flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='tradescataloggrid-rbe9b9f57dcc18f49-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                      <span className="inline-flex items-center gap-1 truncate max-w-[70%]" data-api-unique-id='tradescataloggrid-rdcb03d6f82e43486-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                        <User className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='tradescataloggrid-r7c1e9588663d5911-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' />
                        <span className="truncate" data-api-unique-id='tradescataloggrid-rfb2aeb048d74858d-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>{category.leadArtisan || "Vienna Team"}</span>
                      </span>
                      <span className="font-mono text-[11px] uppercase text-muted-foreground shrink-0" data-api-unique-id='tradescataloggrid-r945ca42ff6d78bb3-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                        GewO §5
                      </span>
                    </div>

                    <button type="button" onClick={e => {
                  e.stopPropagation();
                  onSelectCategory(category);
                }} className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-md text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='tradescataloggrid-r48dc804e8aa96423-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>
                      <span data-api-unique-id='tradescataloggrid-r492c21d1406212c0-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1'>View Scope & Estimate</span>
                      <ArrowRight className="h-3.5 w-3.5" data-api-unique-id='tradescataloggrid-r040b3d72222cf653-s3688347444' data-api-unique-page-name='src/frontend/components/ServicesCatalog/TradesCatalogGrid' data-api-in-loop='1' />
                    </button>
                  </div>
                </div>
              </article>;
        })}
        </div>
      </div>
    </section>;
}