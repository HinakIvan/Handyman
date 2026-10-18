"use client";

import React from "react";
import { useHandymanLocale } from "@/lib/use-handyman-locale";
import EditableImg from "@/@base/EditableImg";
import { ServiceCategoryItem } from "@/frontend/types/ServicesCatalog";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, User, Wrench } from "lucide-react";
interface FeaturedTradesShowcaseProps {
  categories: ServiceCategoryItem[];
  onSelectCategory: (category: ServiceCategoryItem) => void;
}
export default function FeaturedTradesShowcase({
  categories,
  onSelectCategory
}: FeaturedTradesShowcaseProps) {
  const locale = useHandymanLocale();
  const titleFor = (c: ServiceCategoryItem) => locale === "de" ? c.titleDe : locale === "ru" ? c.titleRu : c.titleEn;
  const descriptionFor = (c: ServiceCategoryItem) => (locale === "de" ? c.descriptionDe : locale === "ru" ? c.descriptionRu : c.descriptionEn) || c.descriptionEn || c.descriptionDe || c.descriptionRu || "";
  // Find the primary Altbau Flooring trade as main feature (60% width), and two secondary trades
  const mainFeature = categories.find(c => c.key === "FLOORING") || categories[0];
  const sideFeatures = mainFeature ? categories.filter(c => c.id !== mainFeature.id && c.isFeatured).slice(0, 2) : [];
  if (!mainFeature) return null;
  return <section data-controller-name="Featured Trades Showcase" className="w-full bg-background border-b border-border py-12 sm:py-16" data-api-unique-id='featuredtradesshowcase-r4c3583a4aec10cbc-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6" data-api-unique-id='featuredtradesshowcase-rbe5f36c3b9c94560-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-3" data-api-unique-id='featuredtradesshowcase-rce0481bfd0500304-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
          <h2 className="font-header text-xl sm:text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='featuredtradesshowcase-r786a91ba891bf0f7-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
            Flagship Trade Spotlight (Altbau & Precision Installations)
          </h2>
          <span className="text-xs font-mono text-muted-foreground" data-api-unique-id='featuredtradesshowcase-rd9bb95cb69ee6ad0-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
            FOCAL POINT · HANDWERKER-GÜTE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" data-api-unique-id='featuredtradesshowcase-r154d94f722ea373b-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
          {/* Left Column (60% width on desktop: lg:col-span-7) -> Lead Featured Card */}
          <article className="lg:col-span-7 bg-card text-card-foreground border border-border rounded-lg shadow-soft overflow-hidden flex flex-col justify-between" data-api-unique-id='featuredtradesshowcase-r5666f103f2049f8e-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
            {/* Visual Header with Trade Image */}
            <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden" data-api-unique-id='featuredtradesshowcase-r66933b33260da177-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
              <EditableImg propKey={`featured-lead-${mainFeature.id}`} src={mainFeature.imageUrl || undefined} needLargeImage className="w-full h-full object-cover" alt={titleFor(mainFeature)} data-api-unique-id='featuredtradesshowcase-rd1b66d652d0a6c5d-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2" data-api-unique-id='featuredtradesshowcase-rd7b2f88ce2737d84-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase font-display shadow-soft" data-api-unique-id='featuredtradesshowcase-rc9198286c559f48b-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                  <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='featuredtradesshowcase-rc51e58a1a26e8a5a-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' />
                  {mainFeature.craftClassification === "MEISTER_KOOPERATION" ? "GewO: Meister-Verbund" : "GewO: Freies Handwerk"}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-semibold shadow-soft" data-api-unique-id='featuredtradesshowcase-rbe4ced328719d181-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                  ★ Flagship Specialty
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between" data-api-unique-id='featuredtradesshowcase-r245d6033fe551c86-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
              <div className="space-y-4" data-api-unique-id='featuredtradesshowcase-rbf9c996a5b7c2149-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border pb-4" data-api-unique-id='featuredtradesshowcase-ra5b884d5c706d83a-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                  <div data-api-unique-id='featuredtradesshowcase-r9a58a9f53d7a2b9d-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                    <h3 className="font-header text-2xl sm:text-3xl font-bold text-card-foreground" data-api-unique-id='featuredtradesshowcase-r54421fde66b300f0-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                      {titleFor(mainFeature)}
                    </h3>

                  </div>
                  <div className="shrink-0 text-left sm:text-right" data-api-unique-id='featuredtradesshowcase-r0547576f1c2dea4d-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                    <span className="text-xs uppercase font-mono text-muted-foreground block" data-api-unique-id='featuredtradesshowcase-r0d1072157fdb91f4-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                      Starting Hourly Rate
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-primary" data-api-unique-id='featuredtradesshowcase-r2675bc495c534aa8-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                      Ab {mainFeature.baselineHourlyRate} €/h
                    </span>
                    <span className="text-xs text-muted-foreground block" data-api-unique-id='featuredtradesshowcase-r5cab721c4529dd50-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                      Typical range: {mainFeature.typicalRangeEur}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-body" data-api-unique-id='featuredtradesshowcase-rfbafe0568e90f298-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                  {descriptionFor(mainFeature)}
                </p>

                {/* Permitted Task Step Checklist */}
                {mainFeature.permittedTasksUnderGewO && mainFeature.permittedTasksUnderGewO.length > 0 && <div className="space-y-2.5 bg-background p-4 rounded-md border border-border" data-api-unique-id='featuredtradesshowcase-r5ddc91957a3cab33-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground block" data-api-unique-id='featuredtradesshowcase-r41d9ac7f6f7cb4a8-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                      Permitted Trade Scope (GewO 1994 Standards):
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground" data-api-unique-id='featuredtradesshowcase-r96e026ec554eb4b4-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                      {mainFeature.permittedTasksUnderGewO.slice(0, 4).map((task, index) => <li key={index} className="flex items-start gap-2" data-api-unique-id='featuredtradesshowcase-rbc5401c6575d04f7-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                          <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" data-api-unique-id='featuredtradesshowcase-r84e89fb89cea8509-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' />
                          <span data-api-unique-id='featuredtradesshowcase-r83084628c0d8d3e4-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' data-api-bind-info={`mainFeature.permittedTasksUnderGewO-${index}-$item`} data-api-map-var-name='task'>{task}</span>
                        </li>)}
                    </ul>
                  </div>}
              </div>

              {/* Action Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border mt-auto" data-api-unique-id='featuredtradesshowcase-r26075a039913212c-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                <div className="flex items-center gap-2 text-xs text-muted-foreground" data-api-unique-id='featuredtradesshowcase-rac5c26319ee3ed45-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                  <User className="h-4 w-4 text-primary" data-api-unique-id='featuredtradesshowcase-rc4aa8ef0cf14f427-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' />
                  <span data-api-unique-id='featuredtradesshowcase-r83ef5f817f813e18-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                    Lead: <strong className="text-foreground" data-api-unique-id='featuredtradesshowcase-r69100b4c2387125c-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>{mainFeature.leadArtisan || "Vienna Team"}</strong>
                  </span>
                </div>

                <button type="button" onClick={() => onSelectCategory(mainFeature)} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md shadow-primary hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm" data-api-unique-id='featuredtradesshowcase-re83457c03dcf99ce-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
                  <span data-api-unique-id='featuredtradesshowcase-r9e01b5d6efd38588-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>Inspect Trade Scope & Price Estimate</span>
                  <ArrowRight className="h-4 w-4" data-api-unique-id='featuredtradesshowcase-r7926c10364272a10-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' />
                </button>
              </div>
            </div>
          </article>

          {/* Right Column (40% width: lg:col-span-5) -> Stacked Featured Spotlight Windows */}
          <div className="lg:col-span-5 flex flex-col gap-6" data-api-unique-id='featuredtradesshowcase-r5bc2decf2320c85e-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase'>
            {sideFeatures.map((item, index) => <article key={item.id} className="bg-card text-card-foreground border border-border rounded-lg shadow-soft p-5 sm:p-6 flex-1 flex flex-col justify-between" data-api-unique-id='featuredtradesshowcase-r90a9f732e6a75bb4-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                <div className="space-y-4" data-api-unique-id='featuredtradesshowcase-r3dffda835c6cadbc-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                  <div className="flex items-start justify-between gap-3" data-api-unique-id='featuredtradesshowcase-r852fd552d6b4fa45-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                    <div className="space-y-1" data-api-unique-id='featuredtradesshowcase-r9245bc812344b6d8-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                      <div className="flex items-center gap-2" data-api-unique-id='featuredtradesshowcase-rf3dc43efe198f7f4-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                        {item.craftClassification === "MEISTER_KOOPERATION" ? <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-accent text-accent-foreground text-[11px] font-semibold uppercase font-display" data-api-unique-id='featuredtradesshowcase-re7e4ee1f9385f031-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                            <ShieldCheck className="h-3 w-3" data-api-unique-id='featuredtradesshowcase-r7b0fe53d85ffc8ed-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' />
                            Meister-Verbund
                          </span> : <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-[11px] font-semibold uppercase font-display" data-api-unique-id='featuredtradesshowcase-r135efec86e86f2fa-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                            <CheckCircle2 className="h-3 w-3" data-api-unique-id='featuredtradesshowcase-r2935be3da556d2a3-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' />
                            Freies Handwerk
                          </span>}
                        <span className="text-xs font-mono text-muted-foreground" data-api-unique-id='featuredtradesshowcase-rc84c60449dc5dc9e-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' data-api-bind-info={`sideFeatures-${index}-key`} data-api-map-var-name='item'>
                          {item.key}
                        </span>
                      </div>
                      <h4 className="font-header text-lg sm:text-xl font-bold text-card-foreground" data-api-unique-id='featuredtradesshowcase-r51cd1edc4419d307-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' data-api-bind-info={`sideFeatures-${index}-titleEn`} data-api-map-var-name='item'>
                        {titleFor(item)}
                      </h4>
                    </div>

                    <div className="shrink-0 text-right" data-api-unique-id='featuredtradesshowcase-ra962727f31eadf74-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                      <span className="font-display text-xl font-bold text-primary block" data-api-unique-id='featuredtradesshowcase-r725ff7b7e68cafd2-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' data-api-bind-info={`sideFeatures-${index}-baselineHourlyRate`} data-api-map-var-name='item'>
                        Ab {item.baselineHourlyRate} €/h
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground block" data-api-unique-id='featuredtradesshowcase-rfde28008cf6eef27-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' data-api-bind-info={`sideFeatures-${index}-typicalRangeEur`} data-api-map-var-name='item'>
                        {item.typicalRangeEur}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2" data-api-unique-id='featuredtradesshowcase-r8331ff7610bfb5ec-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' data-api-bind-info={`sideFeatures-${index}-descriptionEn`} data-api-map-var-name='item'>
                    {descriptionFor(item)}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1" data-api-unique-id='featuredtradesshowcase-r098b6b7ad80aa726-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                    <span className="inline-flex items-center gap-1" data-api-unique-id='featuredtradesshowcase-rc6c284a70baac8b6-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                      <Clock className="h-3.5 w-3.5 text-primary" data-api-unique-id='featuredtradesshowcase-r6fde0dfb1ba9db75-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' />
                      Immediate booking
                    </span>
                    <span className="inline-flex items-center gap-1" data-api-unique-id='featuredtradesshowcase-ra6c545b71ccdcfaf-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                      <Wrench className="h-3.5 w-3.5 text-primary" data-api-unique-id='featuredtradesshowcase-re773d79c8d6031d2-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' />
                      Vienna Standard
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4 flex items-center justify-between" data-api-unique-id='featuredtradesshowcase-r75d4da4d6d9ebd7d-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                  <span className="text-xs text-muted-foreground" data-api-unique-id='featuredtradesshowcase-r414831abef826661-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                    Artisan: <strong className="text-foreground" data-api-unique-id='featuredtradesshowcase-re8728df5be73c4d8-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>{item.leadArtisan || "Vienna Team"}</strong>
                  </span>
                  <button type="button" onClick={() => onSelectCategory(item)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors" data-api-unique-id='featuredtradesshowcase-r602ca47939f5c20a-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>
                    <span data-api-unique-id='featuredtradesshowcase-r9b838f09ee95d685-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1'>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5" data-api-unique-id='featuredtradesshowcase-r4bdf4e9914d71c3a-s3780957282' data-api-unique-page-name='src/frontend/components/ServicesCatalog/FeaturedTradesShowcase' data-api-in-loop='1' />
                  </button>
                </div>
              </article>)}
          </div>
        </div>
      </div>
    </section>;
}