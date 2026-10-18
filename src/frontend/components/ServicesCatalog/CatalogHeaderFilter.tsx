"use client";

import React from "react";
import { useHandymanLocale, catalogText } from "@/lib/use-handyman-locale";
import { ClassificationFilter } from "@/frontend/types/ServicesCatalog";
import { Search, SlidersHorizontal, CheckCircle2, ShieldCheck, FileCheck2 } from "lucide-react";
interface CatalogHeaderFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedClassification: ClassificationFilter;
  onClassificationChange: (classification: ClassificationFilter) => void;
  totalCount: number;
  filteredCount: number;
}
export default function CatalogHeaderFilter({
  searchQuery,
  onSearchChange,
  selectedClassification,
  onClassificationChange,
  totalCount,
  filteredCount
}: CatalogHeaderFilterProps) {
  const locale = useHandymanLocale();
  return <div data-controller-name="Catalog Header Filter" className="w-full bg-background border-b border-border py-10 sm:py-12" data-api-unique-id='catalogheaderfilter-rfe7eed515675a8d1-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8" data-api-unique-id='catalogheaderfilter-rec9a87a02fdbe4b9-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
        {/* Top Title and Blueprint Stamp Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2" data-api-unique-id='catalogheaderfilter-rbde062b11d8b9e31-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
          <div className="space-y-3 max-w-3xl" data-api-unique-id='catalogheaderfilter-r6d387d12b5c0b185-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground" data-api-unique-id='catalogheaderfilter-r5d5cc565a7e0b066-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              Wien Handwerkskatalog: Klare Gewerke, ehrliche Stundensätze
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-body" data-api-unique-id='catalogheaderfilter-re37f819cfc2c558a-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              Ausgewiesene Stundensätze ab 15 €/h gemäß GewO 1994. Trilingual inspection across German, English, and Russian for all 23 Vienna districts.
            </p>
          </div>

          {/* Blueprint Spec Stamp Anchor */}
          <div className="shrink-0 self-start lg:self-auto" data-api-unique-id='catalogheaderfilter-r4e5fe24462b13541-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
            <div className="inline-flex items-center gap-2.5 rounded-sm bg-accent text-accent-foreground px-4 py-2.5 shadow-soft border border-accent" data-api-unique-id='catalogheaderfilter-rec88d3603a19f3e3-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              <FileCheck2 className="h-5 w-5 text-accent-foreground shrink-0" data-api-unique-id='catalogheaderfilter-ree170d014f72dec9-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter' />
              <div className="flex flex-col" data-api-unique-id='catalogheaderfilter-rdf2572b988bfd38b-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                <span className="text-[11px] font-semibold tracking-wider uppercase font-display text-accent-foreground" data-api-unique-id='catalogheaderfilter-r7f022502508c25c1-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                  GewO 1994 Compliance
                </span>
                <span className="text-xs font-mono font-medium text-accent-foreground" data-api-unique-id='catalogheaderfilter-r2699c226750b63bc-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                  Österreichisches Gewerberecht
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trilingual Search Bar and Classification Pills */}
        <div className="space-y-4 pt-2" data-api-unique-id='catalogheaderfilter-r646816e4dee074b7-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center" data-api-unique-id='catalogheaderfilter-r8394229b85ba43a9-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
            {/* Search Input Box */}
            <div className="lg:col-span-7 relative" data-api-unique-id='catalogheaderfilter-rf3a91dc5dc602669-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground" data-api-unique-id='catalogheaderfilter-rba01c736c813a209-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                <Search className="h-5 w-5" data-api-unique-id='catalogheaderfilter-r59592c9616d397fd-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter' />
              </div>
              <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder={catalogText("searchPlaceholder", locale)} aria-label="Search trade categories in German, English, and Russian" className="w-full bg-card text-card-foreground border border-input rounded-md pl-11 pr-4 py-3 text-sm sm:text-base font-body placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='catalogheaderfilter-r5ab335f1c7271f93-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter' />
              {searchQuery && <button type="button" onClick={() => onSearchChange("")} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-muted-foreground hover:text-foreground" data-api-unique-id='catalogheaderfilter-rf654f05b53a02fce-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                  {catalogText("clear", locale)}
                </button>}
            </div>

            {/* Live Count Badge */}
            <div className="lg:col-span-5 flex items-center justify-between lg:justify-end gap-3 text-sm font-body" data-api-unique-id='catalogheaderfilter-r475f481d8b02bdf5-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              <span className="text-muted-foreground" data-api-unique-id='catalogheaderfilter-r353e99fa36e1cfcd-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                {catalogText("showing", locale)} <strong className="font-semibold text-foreground font-display" data-api-unique-id='catalogheaderfilter-r3a488548f7927ba7-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>{filteredCount}</strong> {catalogText("of", locale)}{" "}
                <strong className="font-semibold text-foreground font-display" data-api-unique-id='catalogheaderfilter-r17bab0ae6d71129b-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>{totalCount}</strong> {catalogText("services", locale)}
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary text-secondary-foreground text-xs font-mono" data-api-unique-id='catalogheaderfilter-r1851c9d939aaa310-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
                <SlidersHorizontal className="h-3.5 w-3.5" data-api-unique-id='catalogheaderfilter-r6f3f7c4796f4df22-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter' />
                <span data-api-unique-id='catalogheaderfilter-rc8f1fac649c3a0b5-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>{catalogText("filterActive", locale)}</span>
              </div>
            </div>
          </div>

          {/* Classification Pills (3 distinct choices: ALL, FREIES_HANDWERK, MEISTER_KOOPERATION) */}
          <div className="flex flex-wrap items-center gap-2 pt-1" data-api-unique-id='catalogheaderfilter-r4ab701342fb410ae-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mr-1" data-api-unique-id='catalogheaderfilter-rc878a81c2c182c09-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              {catalogText("classification", locale)}
            </span>

            <button type="button" onClick={() => onClassificationChange("ALL")} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-semibold font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedClassification === "ALL" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='catalogheaderfilter-r8a2e44673142d58f-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              <span data-api-unique-id='catalogheaderfilter-r9ab07983476ecbd6-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>{catalogText("allCrafts", locale)} ({totalCount})</span>
            </button>

            <button type="button" onClick={() => onClassificationChange("FREIES_HANDWERK")} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-semibold font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedClassification === "FREIES_HANDWERK" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='catalogheaderfilter-re8c031996ff6e6d5-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='catalogheaderfilter-r63173f0b6810668d-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter' />
              <span data-api-unique-id='catalogheaderfilter-r7fdd56587cf80e49-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>{catalogText("freeTrade", locale)}</span>
            </button>

            <button type="button" onClick={() => onClassificationChange("MEISTER_KOOPERATION")} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-semibold font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedClassification === "MEISTER_KOOPERATION" ? "bg-accent text-accent-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='catalogheaderfilter-r076ca7762878ba3b-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>
              <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='catalogheaderfilter-r75965a779f3fdfe9-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter' />
              <span data-api-unique-id='catalogheaderfilter-r12ec683ca6710d9e-s3835293303' data-api-unique-page-name='src/frontend/components/ServicesCatalog/CatalogHeaderFilter'>{catalogText("masterCoop", locale)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
}