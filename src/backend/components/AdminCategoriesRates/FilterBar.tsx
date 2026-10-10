"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { ClassificationFilter, FeaturedFilter, LanguageDisplay } from "@/backend/types/AdminCategoriesRates";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  classificationFilter: ClassificationFilter;
  onClassificationChange: (val: ClassificationFilter) => void;
  featuredFilter: FeaturedFilter;
  onFeaturedChange: (val: FeaturedFilter) => void;
  languageDisplay: LanguageDisplay;
  onLanguageChange: (val: LanguageDisplay) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalCategories: number;
}
export default function FilterBar({
  searchQuery,
  onSearchChange,
  classificationFilter,
  onClassificationChange,
  featuredFilter,
  onFeaturedChange,
  languageDisplay,
  onLanguageChange,
  onResetFilters,
  totalFiltered,
  totalCategories
}: FilterBarProps) {
  const isFiltered = searchQuery.trim() !== "" || classificationFilter !== "ALL" || featuredFilter !== "ALL" || languageDisplay !== "ALL";
  return <div className="flex min-w-0 flex-col gap-3 rounded-t-lg border-b border-border bg-card p-4 text-card-foreground" data-api-unique-id='filterbar-r9fa8aa123c355f95-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
      {/* Search and Core Dropdowns in wrap configuration */}
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='filterbar-r7c146cde4fb2c580-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
        {/* Search input field */}
        <div className="relative min-w-0 flex-1 max-w-md" data-api-unique-id='filterbar-r22d2b21ef68ef038-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" data-api-unique-id='filterbar-r254bf08af05295d8-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar' />
          <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search key, title (DE/EN/RU), or lead artisan..." className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-xs font-normal text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='filterbar-r42030e901a9c0930-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar' />
        </div>

        {/* Filter dropdowns cluster */}
        <div className="flex min-w-0 flex-wrap items-center gap-2" data-api-unique-id='filterbar-r6807f2b959c41c9d-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
          {/* Classification Filter */}
          <div className="min-w-[170px] flex-1 sm:flex-none" data-api-unique-id='filterbar-ra656288ec0da3a44-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
            <Select value={classificationFilter} onValueChange={val => onClassificationChange(val as ClassificationFilter)} data-api-unique-id='filterbar-r37421e874ee8a3f1-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
              <SelectTrigger size="sm" className="w-full text-xs" data-api-unique-id='filterbar-r62f33f37381dd551-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
                <SelectValue placeholder="Austrian GewO 1994" data-api-unique-id='filterbar-r1b994c5c4b925620-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='filterbar-r585ba44e02e45589-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
                <SelectItem value="ALL" data-api-unique-id='filterbar-rd4dd56992c942c2a-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>All Classifications</SelectItem>
                <SelectItem value="FREIES_HANDWERK" data-api-unique-id='filterbar-rbd00d0d889d64950-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Freies Handwerk (Free)</SelectItem>
                <SelectItem value="MEISTER_KOOPERATION" data-api-unique-id='filterbar-r5c15531e89a02cbd-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Meister-Kooperation (Master)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Filter */}
          <div className="min-w-[150px] flex-1 sm:flex-none" data-api-unique-id='filterbar-rdb7deba5a5bc44a3-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
            <Select value={featuredFilter} onValueChange={val => onFeaturedChange(val as FeaturedFilter)} data-api-unique-id='filterbar-rb6d3d9ed1174545d-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
              <SelectTrigger size="sm" className="w-full text-xs" data-api-unique-id='filterbar-ra3bcf8832909df85-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
                <SelectValue placeholder="Showcase Status" data-api-unique-id='filterbar-rf1d7cf3c2930f40e-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='filterbar-r974dc275faead6e7-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
                <SelectItem value="ALL" data-api-unique-id='filterbar-rccee3a09f06c759c-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>All Showcase States</SelectItem>
                <SelectItem value="FEATURED_ONLY" data-api-unique-id='filterbar-r979ff4dd3d6aaa7b-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Featured Only ★</SelectItem>
                <SelectItem value="STANDARD_ONLY" data-api-unique-id='filterbar-rb986ebcd2d9a1352-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Standard Catalog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Multilingual Title Preview Filter */}
          <div className="min-w-[140px] flex-1 sm:flex-none" data-api-unique-id='filterbar-ra257c298263f4ac4-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
            <Select value={languageDisplay} onValueChange={val => onLanguageChange(val as LanguageDisplay)} data-api-unique-id='filterbar-r1afd0490d3a92df1-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
              <SelectTrigger size="sm" className="w-full text-xs" data-api-unique-id='filterbar-r3114921a0f038c2e-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
                <SelectValue placeholder="Display Language" data-api-unique-id='filterbar-r733fc9a34892b131-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='filterbar-r4acf983e75060490-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
                <SelectItem value="ALL" data-api-unique-id='filterbar-r0b4afb60a96fe5ff-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>All Locales (DE/EN/RU)</SelectItem>
                <SelectItem value="DE" data-api-unique-id='filterbar-r58f5d9c2fd6e2f85-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>German (DE) Primary</SelectItem>
                <SelectItem value="EN" data-api-unique-id='filterbar-ra0286d1d84b13ee1-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>English (EN) Primary</SelectItem>
                <SelectItem value="RU" data-api-unique-id='filterbar-re62369637b6a2fe3-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Russian (RU) Primary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset button if filter active */}
          {isFiltered && <button type="button" onClick={onResetFilters} className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title="Reset all search queries and filters" data-api-unique-id='filterbar-rbf935a967bb20339-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
              <RotateCcw className="h-3.5 w-3.5 shrink-0" data-api-unique-id='filterbar-r0eb0faabb6a9b68a-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar' />
              <span data-api-unique-id='filterbar-ra7e155eaac280c9f-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Reset</span>
            </button>}
        </div>
      </div>

      {/* Results counter and current criteria chips */}
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2 text-xs text-muted-foreground" data-api-unique-id='filterbar-r3a4591d4d4848b1f-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
        <div className="flex items-center gap-2" data-api-unique-id='filterbar-radd6e73cc7c657f1-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
          <span data-api-unique-id='filterbar-r34a6be5086a87c06-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
            Showing <strong className="text-foreground" data-api-unique-id='filterbar-r5d44d63b75f864e6-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>{totalFiltered}</strong> of{" "}
            <strong className="text-foreground" data-api-unique-id='filterbar-r79cd2feba60e4462-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>{totalCategories}</strong> configured service trades
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]" data-api-unique-id='filterbar-rc7c083239d735ce9-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>
          <span className="font-mono text-muted-foreground" data-api-unique-id='filterbar-rbefabc663fb69044-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>GewO Filter: {classificationFilter}</span>
          <span className="text-border" data-api-unique-id='filterbar-ra2814e025395a24c-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>•</span>
          <span className="font-mono text-muted-foreground" data-api-unique-id='filterbar-ra3eb6b59f6c30a11-s1771216377' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/FilterBar'>Locale: {languageDisplay}</span>
        </div>
      </div>
    </div>;
}