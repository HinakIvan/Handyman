"use client";

import React, { useState, useMemo } from "react";
import { LanguageCode, ServiceCategoryItem } from "@/frontend/types/PricingScope";
import { Wrench, Hammer, Layers, Paintbrush, Box, Droplets, Bath, DoorOpen, Trees, Truck, Building2, Clock, Receipt, FileCheck, ArrowUpRight, Filter, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ServicePricingCatalogProps {
  currentLang: LanguageCode;
  categories: ServiceCategoryItem[];
  selectedTradeFilter: string;
  selectedCraftFilter: string;
  onTradeFilterChange: (trade: string) => void;
  onCraftFilterChange: (craft: string) => void;
}
export default function ServicePricingCatalog({
  currentLang,
  categories = [],
  selectedTradeFilter,
  selectedCraftFilter,
  onTradeFilterChange,
  onCraftFilterChange
}: ServicePricingCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const t = {
    en: {
      sectionTitle: "Official Trade Disciplines & Baseline Rates",
      sectionSubtitle: "Transparent rates across all basic assembly and regulated Meister-Kooperation trades. Filter by Austrian craft status or keyword to evaluate scope and hourly baselines.",
      searchPlaceholder: "Search trade or task...",
      allTrades: "All Trade Categories",
      allCrafts: "All Craft Classifications",
      craftFreies: "Freies Handwerk (Direct In-House)",
      craftMeister: "Meister-Kooperation (Certified Partner)",
      ratePrefix: "Baseline:",
      typicalPrefix: "Typical Range:",
      minBooking: "Min. Duration:",
      vatIncluded: "Excl. 20% Austrian VAT for B2B / Net pass-through materials",
      bookTradeCta: "Inquire This Trade",
      viewDetails: "Compliance Scope",
      emptyState: "No service categories match your filter criteria.",
      freiesBadge: "Freies Gewerbe",
      meisterBadge: "Meisterbetrieb"
    },
    de: {
      sectionTitle: "Offizieller Leistungskatalog & Stundensätze",
      sectionSubtitle: "Transparente Kostensätze für freie Montagearbeiten und zulassungspflichtige Meisterkooperationen. Filtern Sie nach Gewerbestatus oder Begriff für klare Planungssicherheit.",
      searchPlaceholder: "Gewerbe oder Aufgabe suchen...",
      allTrades: "Alle Gewerbekategorien",
      allCrafts: "Alle Einstufungen",
      craftFreies: "Freies Handwerk (Direktbetrieb)",
      craftMeister: "Meister-Kooperation (Zertifizierter Partner)",
      ratePrefix: "Basis ab:",
      typicalPrefix: "Typischer Rahmen:",
      minBooking: "Mindestdauer:",
      vatIncluded: "Zzgl. 20% österr. USt. / Materialbelege zum Nettopreis",
      bookTradeCta: "Gewerbe anfragen",
      viewDetails: "GewO-Umfang",
      emptyState: "Keine Leistungskategorien entsprechen Ihren Filterkriterien.",
      freiesBadge: "Freies Gewerbe",
      meisterBadge: "Meisterbetrieb"
    },
    ru: {
      sectionTitle: "Официальный каталог услуг и почасовые ставки",
      sectionSubtitle: "Прозрачные расценки на свободные монтажные работы и регулируемые партнерские услуги Meisterbetrieb. Фильтруйте по квалификации или ключевым словам.",
      searchPlaceholder: "Поиск услуги или задачи...",
      allTrades: "Все категории работ",
      allCrafts: "Все квалификации",
      craftFreies: "Свободное ремесло (Штатные мастера)",
      craftMeister: "Meister-Kooperation (Сертифицированные мастера)",
      ratePrefix: "Базовый тариф:",
      typicalPrefix: "Типичный диапазон:",
      minBooking: "Мин. заказ:",
      vatIncluded: "Без учета 20% австрийского НДС / Материалы по себестоимости",
      bookTradeCta: "Запросить услугу",
      viewDetails: "Нормативы GewO",
      emptyState: "Нет категорий услуг, соответствующих вашим критериям.",
      freiesBadge: "Свободное ремесло",
      meisterBadge: "Meisterbetrieb"
    }
  }[currentLang];

  // Helper for Trade Icons
  const getTradeIcon = (iconName: string | null | undefined) => {
    switch (iconName) {
      case "Hammer":
        return <Hammer className="w-5 h-5 text-primary" data-api-unique-id='servicepricingcatalog-r8b86742108bf63d3-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Layers":
        return <Layers className="w-5 h-5 text-accent" data-api-unique-id='servicepricingcatalog-rab97f92049ba9dec-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Paintbrush":
        return <Paintbrush className="w-5 h-5 text-primary" data-api-unique-id='servicepricingcatalog-r072bb0c609dba6c6-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Box":
        return <Box className="w-5 h-5 text-accent" data-api-unique-id='servicepricingcatalog-rb10acce934370eb8-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Droplets":
        return <Droplets className="w-5 h-5 text-primary" data-api-unique-id='servicepricingcatalog-r88ffed88e4dc184a-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Bath":
        return <Bath className="w-5 h-5 text-accent" data-api-unique-id='servicepricingcatalog-r84c215a10a36193b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "DoorOpen":
        return <DoorOpen className="w-5 h-5 text-primary" data-api-unique-id='servicepricingcatalog-r643f74de3d343440-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Trees":
        return <Trees className="w-5 h-5 text-accent" data-api-unique-id='servicepricingcatalog-r36f1156fc5aa356b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Truck":
        return <Truck className="w-5 h-5 text-primary" data-api-unique-id='servicepricingcatalog-r0483e01bd815a622-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-accent" data-api-unique-id='servicepricingcatalog-ra8c7333bb60497f5-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
      default:
        return <Wrench className="w-5 h-5 text-primary" data-api-unique-id='servicepricingcatalog-r1f33c196f3ed3767-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />;
    }
  };

  // Filter items
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      // Craft classification filter
      if (selectedCraftFilter !== "ALL" && cat.craftClassification !== selectedCraftFilter) {
        return false;
      }
      // Trade key filter
      if (selectedTradeFilter !== "ALL" && cat.key !== selectedTradeFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const title = (currentLang === "de" ? cat.titleDe : currentLang === "ru" ? cat.titleRu : cat.titleEn) || "";
        const desc = (currentLang === "de" ? cat.descriptionDe : currentLang === "ru" ? cat.descriptionRu : cat.descriptionEn) || "";
        if (!title.toLowerCase().includes(query) && !desc.toLowerCase().includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [categories, selectedCraftFilter, selectedTradeFilter, searchQuery, currentLang]);
  return <section data-controller-name="Service Pricing Matrix Catalog" className="w-full bg-card border-b border-border py-16" data-api-unique-id='servicepricingcatalog-r318e9b28beb8a933-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='servicepricingcatalog-reebb32230c7e2a4b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10" data-api-unique-id='servicepricingcatalog-r3d30f71ebd14bf23-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-3" data-api-unique-id='servicepricingcatalog-r467632fdcbe49ec3-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            <Receipt className="w-3.5 h-3.5 text-primary" data-api-unique-id='servicepricingcatalog-r922140ed375d3a41-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
            Tarifverzeichnis & Gewerbeordnung 1994
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-card-foreground tracking-tight" data-api-unique-id='servicepricingcatalog-r093941ccc8bc7c95-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground font-body leading-relaxed" data-api-unique-id='servicepricingcatalog-r9ab9a2e3a49e5f2e-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Multi-Dimensional Control & Filter Bar */}
        <div className="bg-background text-foreground border border-border rounded-lg p-4 mb-8 shadow-soft" data-api-unique-id='servicepricingcatalog-r3630c399d2ee48b1-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center" data-api-unique-id='servicepricingcatalog-r62aac48579e4b083-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            
            {/* Search Input */}
            <div className="sm:col-span-4 relative min-w-0" data-api-unique-id='servicepricingcatalog-re6521a5c34d56bab-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" data-api-unique-id='servicepricingcatalog-r179729a8158b4a7b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='servicepricingcatalog-re31b9925bb912af9-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
            </div>

            {/* Trade Category Key Filter */}
            <div className="sm:col-span-4 min-w-0" data-api-unique-id='servicepricingcatalog-r0a21de2f933480a7-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
              <Select value={selectedTradeFilter} onValueChange={onTradeFilterChange} data-api-unique-id='servicepricingcatalog-r4b2575b345322f6d-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                <SelectTrigger className="w-full min-w-0 text-sm bg-background text-foreground" data-api-unique-id='servicepricingcatalog-rfe3b30170cbbbc0c-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                  <SelectValue placeholder={t.allTrades} data-api-unique-id='servicepricingcatalog-rec96e15b058d1a5e-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground" data-api-unique-id='servicepricingcatalog-r065b1c427f31ba1b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                  <SelectItem value="ALL" data-api-unique-id='servicepricingcatalog-r2668af99fdd30c26-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>{t.allTrades}</SelectItem>
                  <SelectItem value="ASSEMBLY" data-api-unique-id='servicepricingcatalog-rb5a2395ddb285199-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Furniture & Fixture Assembly</SelectItem>
                  <SelectItem value="DEMOLITION" data-api-unique-id='servicepricingcatalog-rb3b4b59533ccdf50-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Surface Demolition & Stripping</SelectItem>
                  <SelectItem value="FLOORING" data-api-unique-id='servicepricingcatalog-r1c18ffe1ce274c13-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Laminate & Parquet Flooring</SelectItem>
                  <SelectItem value="PAINTING" data-api-unique-id='servicepricingcatalog-r85284708a37d0ed7-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Interior Painting & Priming</SelectItem>
                  <SelectItem value="DRYWALL" data-api-unique-id='servicepricingcatalog-r0cac08995c8ec53b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Drywall & Partitioning</SelectItem>
                  <SelectItem value="PLUMBING_MINOR" data-api-unique-id='servicepricingcatalog-r796502910b62b466-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Minor Sanitary & Silicone Sealing</SelectItem>
                  <SelectItem value="BATHROOM_KITCHEN" data-api-unique-id='servicepricingcatalog-r8b0aaf14e4414b3a-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Kitchen Unit & Appliance Fitting</SelectItem>
                  <SelectItem value="DOORS_WINDOWS" data-api-unique-id='servicepricingcatalog-rfd7f8533eba2c322-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Door Hinges & Window Adjustments</SelectItem>
                  <SelectItem value="OUTDOOR" data-api-unique-id='servicepricingcatalog-rddd13481725adf6c-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Garden & Balcony Woodwork</SelectItem>
                  <SelectItem value="MOVING" data-api-unique-id='servicepricingcatalog-rf85eedf0b81c2ef2-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Transport & Heavy Lifting</SelectItem>
                  <SelectItem value="COMMERCIAL" data-api-unique-id='servicepricingcatalog-r912f4af7cbc2a353-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>Office & Retail Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Craft Legal Status Filter */}
            <div className="sm:col-span-4 min-w-0" data-api-unique-id='servicepricingcatalog-r1013249d7cd1c035-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
              <Select value={selectedCraftFilter} onValueChange={onCraftFilterChange} data-api-unique-id='servicepricingcatalog-ree0fb62b5d132231-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                <SelectTrigger className="w-full min-w-0 text-sm bg-background text-foreground" data-api-unique-id='servicepricingcatalog-rc6c298f8360b88bc-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                  <SelectValue placeholder={t.allCrafts} data-api-unique-id='servicepricingcatalog-r57066b878509b91e-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground" data-api-unique-id='servicepricingcatalog-r6d08c6092cef3a0e-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                  <SelectItem value="ALL" data-api-unique-id='servicepricingcatalog-rfe8b34ceb44d8566-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>{t.allCrafts}</SelectItem>
                  <SelectItem value="FREIES_HANDWERK" data-api-unique-id='servicepricingcatalog-rea72bfbccc0dfc90-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>{t.craftFreies}</SelectItem>
                  <SelectItem value="MEISTER_KOOPERATION" data-api-unique-id='servicepricingcatalog-ra6be4183b56c6515-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>{t.craftMeister}</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Active Filter Chips / Counter */}
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground" data-api-unique-id='servicepricingcatalog-r7f75d4502b2b0b85-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            <div className="flex items-center gap-2" data-api-unique-id='servicepricingcatalog-rf1b38aab3e14e377-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
              <Filter className="w-3.5 h-3.5 text-primary" data-api-unique-id='servicepricingcatalog-rd76b71eff6c7a1b3-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
              <span data-api-unique-id='servicepricingcatalog-r9aa7f6b7beea6dd7-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                Showing <strong data-api-unique-id='servicepricingcatalog-r5a3da483321a5573-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>{filteredCategories.length}</strong> of {categories.length} trade disciplines
              </span>
            </div>
            {(selectedTradeFilter !== "ALL" || selectedCraftFilter !== "ALL" || searchQuery) && <button type="button" onClick={() => {
            onTradeFilterChange("ALL");
            onCraftFilterChange("ALL");
            setSearchQuery("");
          }} className="text-xs font-medium text-primary hover:underline" data-api-unique-id='servicepricingcatalog-ra063033f50b3dbcb-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
                Reset All Filters
              </button>}
          </div>
        </div>

        {/* Categories Grid - Architectural Tactile Cards */}
        {filteredCategories.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-api-unique-id='servicepricingcatalog-rb200d414bf77887c-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            {filteredCategories.map((cat, index) => {
          const localizedTitle = (currentLang === "de" ? cat.titleDe : currentLang === "ru" ? cat.titleRu : cat.titleEn) || "";
          const localizedDesc = (currentLang === "de" ? cat.descriptionDe : currentLang === "ru" ? cat.descriptionRu : cat.descriptionEn) || "";
          const isFreies = cat.craftClassification === "FREIES_HANDWERK";
          return <article key={cat.id} className="bg-background text-foreground border border-border rounded-md p-5 flex flex-col justify-between shadow-soft hover:shadow-elevated transition-shadow" data-api-unique-id='servicepricingcatalog-rd011b7b11670da59-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                  {/* Card Header: Icon + Title */}
                  <div data-api-unique-id='servicepricingcatalog-r5079ea1b3526a2bd-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                    <div className="flex items-start justify-between gap-3 mb-3" data-api-unique-id='servicepricingcatalog-r467b1c5219e8bbfd-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center shrink-0" data-api-unique-id='servicepricingcatalog-r942457f5a7b228a9-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                        {getTradeIcon(cat.iconName)}
                      </div>
                      
                      {/* Legal Classification Stamp */}
                      <span className={`inline-flex shrink-0 whitespace-nowrap px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wider uppercase ${isFreies ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`} data-api-unique-id='servicepricingcatalog-ree09cad2d7580e2a-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                        {isFreies ? t.freiesBadge : t.meisterBadge}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-foreground leading-snug" data-api-unique-id='servicepricingcatalog-r05a46eab34481d8a-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      {localizedTitle}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground font-body leading-relaxed line-clamp-2" data-api-unique-id='servicepricingcatalog-r07ad2421c338fa43-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      {localizedDesc}
                    </p>
                  </div>

                  {/* Pricing Matrix Breakdown */}
                  <div className="mt-6 pt-4 border-t border-border space-y-3" data-api-unique-id='servicepricingcatalog-r3189e6cdd3d6599b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                    
                    {/* Baseline Rate & Range */}
                    <div className="flex items-baseline justify-between" data-api-unique-id='servicepricingcatalog-r79d1d5e6c9814f6b-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='servicepricingcatalog-r89dfdfc24ef40dc8-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                        {t.ratePrefix}
                      </span>
                      <div className="text-right" data-api-unique-id='servicepricingcatalog-rd95ba3718b67dfff-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                        <span className="text-2xl font-display font-extrabold text-primary" data-api-unique-id='servicepricingcatalog-r5325fee469134b82-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1' data-api-bind-info={`filteredCategories-${index}-baselineHourlyRate`} data-api-map-var-name='cat'>
                          €{cat.baselineHourlyRate}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1" data-api-unique-id='servicepricingcatalog-r9cb9fda802202976-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>/h</span>
                      </div>
                    </div>

                    {/* Typical Real-world Range */}
                    <div className="flex items-center justify-between text-xs py-1 px-2 rounded-sm bg-muted text-muted-foreground" data-api-unique-id='servicepricingcatalog-r23f23d01b51a75a9-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      <span className="font-medium" data-api-unique-id='servicepricingcatalog-r3352e6a8235f4cf8-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>{t.typicalPrefix}</span>
                      <span className="font-semibold text-foreground" data-api-unique-id='servicepricingcatalog-r3e3e0638639b7e07-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1' data-api-bind-info={`filteredCategories-${index}-typicalRangeEur`} data-api-map-var-name='cat'>{cat.typicalRangeEur}</span>
                    </div>

                    {/* Minimum Booking & Materials Notice */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='servicepricingcatalog-r41a86e3d7919bbfa-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      <span className="flex items-center gap-1" data-api-unique-id='servicepricingcatalog-r3ac3b5a7e17ffbee-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1' data-api-bind-info={`filteredCategories-${index}-minimumHours`} data-api-map-var-name='cat'>
                        <Clock className="w-3 h-3 text-accent" data-api-unique-id='servicepricingcatalog-r89697f90b00e5524-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1' />
                        {t.minBooking} {cat.minimumHours}h
                      </span>
                      <span className="flex items-center gap-1 text-accent font-medium" data-api-unique-id='servicepricingcatalog-r57c60f40f7330112-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                        <FileCheck className="w-3 h-3 text-success" data-api-unique-id='servicepricingcatalog-r3d74c416f375f377-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1' />
                        0% Material
                      </span>
                    </div>

                    {/* Trade Action CTA */}
                    <div className="pt-2" data-api-unique-id='servicepricingcatalog-r40c09f77085f5532-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                      <a href="/quote" className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='servicepricingcatalog-r1cee7b60a0c811a3-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1'>
                        {t.bookTradeCta}
                        <ArrowUpRight className="w-3.5 h-3.5" data-api-unique-id='servicepricingcatalog-rabd67ce8c5fc52db-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' data-api-in-loop='1' />
                      </a>
                    </div>

                  </div>
                </article>;
        })}
          </div> : <div className="text-center py-12 bg-background border border-border rounded-lg p-8" data-api-unique-id='servicepricingcatalog-r563a3b7c533a869f-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>
            <Hammer className="w-8 h-8 text-muted-foreground mx-auto mb-3" data-api-unique-id='servicepricingcatalog-re9fdb31d6bec6237-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog' />
            <p className="text-sm text-muted-foreground" data-api-unique-id='servicepricingcatalog-r635f935d15170276-s3322090582' data-api-unique-page-name='src/frontend/components/PricingScope/ServicePricingCatalog'>{t.emptyState}</p>
          </div>}

      </div>
    </section>;
}