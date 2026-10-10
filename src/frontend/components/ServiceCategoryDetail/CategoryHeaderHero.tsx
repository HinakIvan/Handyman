"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { BadgeCheck, ShieldAlert, Award, ArrowRight, UserCheck, Sparkles, Languages } from "lucide-react";
import { ServiceCategoryDetailDTO, LanguageCode } from "@/frontend/types/ServiceCategoryDetail";
interface CategoryHeaderHeroProps {
  category: ServiceCategoryDetailDTO;
  activeLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onInitiateQuote: () => void;
}
export default function CategoryHeaderHero({
  category,
  activeLang,
  onLanguageChange,
  onInitiateQuote
}: CategoryHeaderHeroProps) {
  const getLocalizedTitle = () => {
    switch (activeLang) {
      case "DE":
        return category.titleDe;
      case "RU":
        return category.titleRu;
      default:
        return category.titleEn;
    }
  };
  const getLocalizedDesc = () => {
    switch (activeLang) {
      case "DE":
        return category.descriptionDe;
      case "RU":
        return category.descriptionRu;
      default:
        return category.descriptionEn;
    }
  };
  const isMeister = category.craftClassification === "MEISTER_KOOPERATION";
  return <section data-controller-name="Trade Category Header" className="w-full border-b border-border bg-background" data-api-unique-id='categoryheaderhero-rf1344830ab278a41-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" data-api-unique-id='categoryheaderhero-r600662d0fe46e6bb-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
        {/* Top Control Bar: Language Switcher and Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8" data-api-unique-id='categoryheaderhero-r5490b1444bee64ad-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='categoryheaderhero-rd8509d8e735cb7f9-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='categoryheaderhero-rcb4f354682b42b40-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              <Languages className="w-3.5 h-3.5 text-primary" data-api-unique-id='categoryheaderhero-r3650c0420759a52a-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
              Language Preview / Sprachauswahl:
            </span>
            <div className="inline-flex rounded-md bg-muted p-1 border border-border" data-api-unique-id='categoryheaderhero-r89958013fd4e8b0d-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              {(["DE", "EN", "RU"] as LanguageCode[]).map((lang, index) => {
              const isActive = activeLang === lang;
              return <button key={lang} type="button" onClick={() => onLanguageChange(lang)} className={`px-3 py-1 text-xs font-semibold rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='categoryheaderhero-r8903266da66c1caa-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' data-api-in-loop='1'>
                    {lang === "DE" ? "Deutsch (DE)" : lang === "EN" ? "English (EN)" : "Русский (RU)"}
                  </button>;
            })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='categoryheaderhero-red9db94e0af02fae-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
            {category.isFeatured && <span className="inline-flex items-center gap-1 rounded-sm bg-accent text-accent-foreground px-2.5 py-1 text-xs font-semibold tracking-wide uppercase shadow-soft" data-api-unique-id='categoryheaderhero-r2cd791b9dd3153ae-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <Sparkles className="w-3.5 h-3.5 text-accent-foreground" data-api-unique-id='categoryheaderhero-rbc1da9326c2b04f8-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
                Featured Trade
              </span>}
            <span className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${isMeister ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`} data-api-unique-id='categoryheaderhero-r4626d7e74f7f57fb-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              {isMeister ? <>
                  <ShieldAlert className="w-3.5 h-3.5 text-accent-foreground" data-api-unique-id='categoryheaderhero-r89a9bee9bef48705-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
                  Meister Kooperation · GewO § 94
                </> : <>
                  <BadgeCheck className="w-3.5 h-3.5 text-secondary-foreground" data-api-unique-id='categoryheaderhero-reb7747c3462849c9-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
                  Freies Handwerk · GewO § 5
                </>}
            </span>
          </div>
        </div>

        {/* Hero Main Grid: Left Spec Info & Right Tactile Workshop Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center" data-api-unique-id='categoryheaderhero-r9892b570adb9ce82-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
          {/* Left Column: Spec and Trade Title */}
          <div className="lg:col-span-7 min-w-0 space-y-6" data-api-unique-id='categoryheaderhero-r80436fbce77b35c5-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
            <div className="space-y-3" data-api-unique-id='categoryheaderhero-r8630fb24207e6efd-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-display leading-tight" data-api-unique-id='categoryheaderhero-r969b409e73b92430-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                {getLocalizedTitle()}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary" data-api-unique-id='categoryheaderhero-re0df443d074964bc-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                Vienna Altbau Precision & Trade Compliance
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed" data-api-unique-id='categoryheaderhero-r7e6620c90cff1e46-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              {getLocalizedDesc()}
            </p>

            {/* Trilingual Title Transparency Badge Box */}
            <div className="rounded-md border border-border bg-card text-card-foreground p-4 space-y-2" data-api-unique-id='categoryheaderhero-r82372d591a8b055c-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5" data-api-unique-id='categoryheaderhero-r6aec0bbd0f497fbb-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <Award className="w-3.5 h-3.5 text-primary" data-api-unique-id='categoryheaderhero-r425d1b23380acbb6-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
                Official Austrian Trade Taxonomy & Translations
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm pt-1" data-api-unique-id='categoryheaderhero-r9342247fd7b164b8-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <div className="rounded border border-border bg-background text-foreground p-2 min-w-0" data-api-unique-id='categoryheaderhero-r807a8e80196a8db5-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                  <span className="text-xs text-muted-foreground block font-mono" data-api-unique-id='categoryheaderhero-r4ee483b6eb5f712c-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    DE
                  </span>
                  <span className="font-semibold truncate block" data-api-unique-id='categoryheaderhero-r77337b148e8167b1-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    {category.titleDe}
                  </span>
                </div>
                <div className="rounded border border-border bg-background text-foreground p-2 min-w-0" data-api-unique-id='categoryheaderhero-r6ffc40f120f2c6f7-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                  <span className="text-xs text-muted-foreground block font-mono" data-api-unique-id='categoryheaderhero-r3e6cfd7c84cdc874-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    EN
                  </span>
                  <span className="font-semibold truncate block" data-api-unique-id='categoryheaderhero-r9273d10f60eff200-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    {category.titleEn}
                  </span>
                </div>
                <div className="rounded border border-border bg-background text-foreground p-2 min-w-0" data-api-unique-id='categoryheaderhero-rec3910fa0ed51ba3-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                  <span className="text-xs text-muted-foreground block font-mono" data-api-unique-id='categoryheaderhero-r0e3239c740e964f0-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    RU
                  </span>
                  <span className="font-semibold truncate block" data-api-unique-id='categoryheaderhero-rca720a527c990e3c-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    {category.titleRu}
                  </span>
                </div>
              </div>
            </div>

            {/* Lead Artisan Partner & Conversion Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2" data-api-unique-id='categoryheaderhero-r16402ae182025e3c-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              <div className="flex items-center gap-3 bg-secondary text-secondary-foreground px-4 py-3 rounded-md border border-border" data-api-unique-id='categoryheaderhero-ra01e90f775405ceb-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0" data-api-unique-id='categoryheaderhero-r204060fc57e03eee-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                  <UserCheck className="w-5 h-5 text-accent-foreground" data-api-unique-id='categoryheaderhero-rc516ab3f380cbc0b-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
                </div>
                <div className="min-w-0" data-api-unique-id='categoryheaderhero-rcc47bb0d18172f4e-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block" data-api-unique-id='categoryheaderhero-r1c142c57262420f3-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    Designated Lead Artisan
                  </span>
                  <span className="font-bold text-sm truncate block text-secondary-foreground" data-api-unique-id='categoryheaderhero-r2d35db5f0f16349f-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                    {category.leadArtisan || "Meisterbetrieb Verbund Wien"}
                  </span>
                </div>
              </div>

              <button type="button" onClick={onInitiateQuote} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 font-semibold text-base shadow-primary transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0" data-api-unique-id='categoryheaderhero-r6e651238fd1160e6-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <span data-api-unique-id='categoryheaderhero-rac8bcbb1be0fe2dc-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 text-primary-foreground" data-api-unique-id='categoryheaderhero-rf7d1670fee71160f-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
              </button>
            </div>
          </div>

          {/* Right Column: Artisan Photo Frame */}
          <div className="lg:col-span-5 min-w-0" data-api-unique-id='categoryheaderhero-re998e5206c8ab83a-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
            <div className="relative rounded-lg border border-border bg-card text-card-foreground p-2 shadow-elevated overflow-hidden" data-api-unique-id='categoryheaderhero-r701e971688d2ba43-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
              <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-muted" data-api-unique-id='categoryheaderhero-r1bb6bc6b0297dd0b-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <EditableImg propKey={`category-artisan-showcase-${category.key.toLowerCase()}`} src={category.imageUrl ?? undefined} needLargeImage alt={getLocalizedTitle() || "Viennese Craftsman"} className="w-full h-full object-cover" data-api-unique-id='categoryheaderhero-r03fc8ea2026993b0-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero' />
              </div>
              <div className="p-3 text-xs text-muted-foreground flex items-center justify-between" data-api-unique-id='categoryheaderhero-rf56e9a4b62fda6a2-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                <span data-api-unique-id='categoryheaderhero-rd46bc12d88cffb7b-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>Viennese Craftsman Standard</span>
                <span className="font-mono text-primary font-semibold" data-api-unique-id='categoryheaderhero-r80b91694df3b6a2b-s3645652207' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/CategoryHeaderHero'>
                  GewO 1994 Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}