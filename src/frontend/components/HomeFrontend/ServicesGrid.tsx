"use client";

import React, { useState } from "react";
import EditableImg from "@/@base/EditableImg";
import type { Language, ServiceCategoryDTO, CraftClassification } from "@/frontend/types/HomeFrontend";
import { ArrowUpRight, Check, Hammer } from "lucide-react";
export type ServiceId = "service-assembly" | "service-demolition" | "service-flooring" | "service-painting" | "service-drywall" | "service-bathroom-kitchen" | "service-doors-windows" | "service-outdoor" | "service-moving" | "service-commercial" | string;
export interface ServicesGridProps {
  lang: Language;
  services?: ServiceCategoryDTO[];
  onSelectServiceForQuote: (serviceId: ServiceId) => void;
  onInspectServiceDetail?: (serviceId: ServiceId) => void;
}
const INTERIOR_KEYS = new Set(["ASSEMBLY", "FLOORING", "PAINTING", "BATHROOM_KITCHEN", "PLUMBING_MINOR", "service-assembly", "service-flooring", "service-painting", "service-bathroom-kitchen"]);
const STRUCTURAL_KEYS = new Set(["DRYWALL", "DEMOLITION", "DOORS_WINDOWS", "COMMERCIAL", "service-drywall", "service-demolition", "service-doors-windows", "service-commercial"]);
const ASSISTANCE_KEYS = new Set(["OUTDOOR", "MOVING", "service-outdoor", "service-moving"]);
function getLocalizedTitle(item: ServiceCategoryDTO, lang: Language): string {
  if (lang === "de") return item.titleDe || item.titleEn;
  if (lang === "ru") return item.titleRu || item.titleEn;
  return item.titleEn || item.titleDe;
}
function getLocalizedDescription(item: ServiceCategoryDTO, lang: Language): string {
  if (lang === "de") return item.descriptionDe || item.descriptionEn || "";
  if (lang === "ru") return item.descriptionRu || item.descriptionEn || "";
  return item.descriptionEn || item.descriptionDe || "";
}
function getLocalizedCraftBadge(classification: CraftClassification, lang: Language): string {
  if (classification === "MEISTER_KOOPERATION") {
    if (lang === "de") return "Meisterbetrieb";
    if (lang === "ru") return "Мастерская лицензия";
    return "Master Trade";
  }
  if (lang === "de") return "Freies Handwerk";
  if (lang === "ru") return "Свободное ремесло";
  return "Freies Handwerk";
}
export default function ServicesGrid({
  lang,
  services = [],
  onSelectServiceForQuote,
  onInspectServiceDetail
}: ServicesGridProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "interior" | "structural" | "assistance">("all");
  const filteredServices = services.filter(s => {
    if (activeFilter === "all") return true;
    if (activeFilter === "interior") return INTERIOR_KEYS.has(s.key) || INTERIOR_KEYS.has(s.id);
    if (activeFilter === "structural") return STRUCTURAL_KEYS.has(s.key) || STRUCTURAL_KEYS.has(s.id);
    if (activeFilter === "assistance") return ASSISTANCE_KEYS.has(s.key) || ASSISTANCE_KEYS.has(s.id);
    return true;
  });
  const featured = activeFilter === "all" ? filteredServices.filter(s => s.isFeatured) : [];
  const others = activeFilter === "all" ? filteredServices.filter(s => !s.isFeatured) : filteredServices;
  return <section data-controller-name="Service Categories Matrix" className="w-full border-b border-border bg-background text-foreground py-14 sm:py-16" data-api-unique-id='servicesgrid-r2a358220eefb2468-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='servicesgrid-r39eb3d5e0be88a1a-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" data-api-unique-id='servicesgrid-r1393078b90f59b55-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
          <div data-api-unique-id='servicesgrid-r05db5576169dee03-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-api-unique-id='servicesgrid-rdcfbad085535e971-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
              {lang === "de" ? "Leistungsübersicht Handwerk Wien" : lang === "ru" ? "Каталог услуг мастеров в Вене" : "Comprehensive Handyman Services"}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='servicesgrid-rbecf83c12987b808-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
              {lang === "de" ? "Alle Gewerbezweige für Wohnung, Haus und Gewerbe im Überblick." : lang === "ru" ? "Все категории работ для квартир, домов и коммерческих помещений." : "All professional trade categories for homes, apartments, and businesses."}
            </p>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='servicesgrid-rab3d5d6b3b74b615-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
            {[{
            id: "all" as const,
            label: {
              en: `All (${services.length})`,
              de: `Alle (${services.length})`,
              ru: `Все (${services.length})`
            }
          }, {
            id: "interior" as const,
            label: {
              en: "Interior",
              de: "Innenausbau",
              ru: "Интерьер"
            }
          }, {
            id: "structural" as const,
            label: {
              en: "Structure",
              de: "Bau & Montage",
              ru: "Монтаж"
            }
          }, {
            id: "assistance" as const,
            label: {
              en: "Assistance",
              de: "Hilfe & Garten",
              ru: "Помощь"
            }
          }].map((filter, index) => {
            const isSelected = activeFilter === filter.id;
            return <button key={filter.id} type="button" onClick={() => setActiveFilter(filter.id)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='servicesgrid-r2738706d7b26497b-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' data-api-bind-info={`list-${index}-label.lang`} data-api-map-var-name='filter'>
                  {filter.label[lang]}
                </button>;
          })}
          </div>
        </div>

        {/* Featured Big Showcase */}
        {activeFilter === "all" && featured.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8" data-api-unique-id='servicesgrid-r81d67ebf7564ac6b-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
            {featured.map((item, index) => {
          const title = getLocalizedTitle(item, lang);
          const desc = getLocalizedDescription(item, lang);
          const badge = getLocalizedCraftBadge(item.craftClassification, lang);
          return <div key={item.id} className="lg:col-span-6 rounded-xl border border-border bg-card text-card-foreground overflow-hidden flex flex-col shadow-soft transition-all hover:border-primary/50 cursor-pointer" onClick={() => {
            if (onInspectServiceDetail) {
              onInspectServiceDetail(item.id as ServiceId);
            } else {
              onSelectServiceForQuote(item.id as ServiceId);
            }
          }} data-api-unique-id='servicesgrid-rcf81514176e269ab-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted" data-api-unique-id='servicesgrid-r847a04e181569708-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                    <EditableImg propKey={`service-featured-${item.id}`} src={item.imageUrl || undefined} alt={title} className="h-full w-full object-cover" data-api-unique-id='servicesgrid-r13efc065aaf62234-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2" data-api-unique-id='servicesgrid-rd1b0316d667ee654-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                      <span className="inline-flex shrink-0 whitespace-nowrap rounded-sm bg-accent text-accent-foreground px-2 py-0.5 text-xs font-semibold" data-api-unique-id='servicesgrid-r72e1d9f3d0f10e48-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        {badge}
                      </span>
                      {item.typicalRangeEur && <span className="inline-flex shrink-0 whitespace-nowrap rounded-sm bg-muted text-muted-foreground px-2 py-0.5 text-xs font-medium border border-border" data-api-unique-id='servicesgrid-r27319bcd43891d1c-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' data-api-bind-info={`featured-${index}-typicalRangeEur`} data-api-map-var-name='item'>
                          {item.typicalRangeEur}
                        </span>}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between" data-api-unique-id='servicesgrid-r5290ef02c68a47e3-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                    <div data-api-unique-id='servicesgrid-r5a155fba253da64f-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                      <div className="flex items-center justify-between gap-2" data-api-unique-id='servicesgrid-r929d9c5f16bd895c-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        <h3 className="font-display text-xl font-bold text-card-foreground" data-api-unique-id='servicesgrid-rf32c5f81f1c9c626-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          {title}
                        </h3>
                        <div className="flex flex-col items-end" data-api-unique-id='servicesgrid-r77be30ab6f15bd29-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          <span className="font-display font-semibold text-primary text-base whitespace-nowrap" data-api-unique-id='servicesgrid-r027af5b6c7a606c5-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                            {lang === "de" ? `Ab €${item.baselineHourlyRate}/Std.` : lang === "ru" ? `От €${item.baselineHourlyRate}/ч.` : `From €${item.baselineHourlyRate}/hr`}
                          </span>
                        </div>
                      </div>

                      {desc && <p className="mt-2 text-sm text-muted-foreground leading-relaxed" data-api-unique-id='servicesgrid-r283cc2198b77600a-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          {desc}
                        </p>}

                      {item.leadArtisan && <div className="mt-3 flex flex-wrap gap-1.5" data-api-unique-id='servicesgrid-rea0b6b3bd9c0587f-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          <span className="inline-flex items-center rounded-sm bg-muted text-muted-foreground px-2 py-0.5 text-[11px] border border-border" data-api-unique-id='servicesgrid-ra3f05791e8313427-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' data-api-bind-info={`featured-${index}-leadArtisan`} data-api-map-var-name='item'>
                            {lang === "de" ? "Fachkraft: " : lang === "ru" ? "Мастер: " : "Artisan: "}
                            {item.leadArtisan}
                          </span>
                        </div>}
                    </div>

                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-between" data-api-unique-id='servicesgrid-ra2f15e988c3cfb80-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                      <span className="text-xs text-muted-foreground flex items-center gap-1" data-api-unique-id='servicesgrid-r73897b34592d203c-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='servicesgrid-r5b5212fd202f9b8a-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' />
                        Professional tools on-site
                      </span>
                      <button type="button" onClick={e => {
                  e.stopPropagation();
                  onSelectServiceForQuote(item.id as ServiceId);
                }} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='servicesgrid-r375b24e115c3afdf-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        <span data-api-unique-id='servicesgrid-r3858a3063571954b-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          {lang === "de" ? "Angebot anfragen" : lang === "ru" ? "Запросить смету" : "Book This Service"}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5" data-api-unique-id='servicesgrid-r9771b54a9cdafbe7-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' />
                      </button>
                    </div>
                  </div>
                </div>;
        })}
          </div>}

        {/* Regular Service Grid */}
        {filteredServices.length === 0 ? <div className="text-center py-12 text-muted-foreground text-sm" data-api-unique-id='servicesgrid-ree071d77a8b7b32a-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
            {lang === "de" ? "Keine Dienstleistungen in dieser Kategorie vorhanden." : lang === "ru" ? "В этой категории пока нет услуг." : "No services found in this category."}
          </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-api-unique-id='servicesgrid-rdc6a2139c36dd6f3-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid'>
            {others.map((item, index) => {
          const title = getLocalizedTitle(item, lang);
          const desc = getLocalizedDescription(item, lang);
          const badge = getLocalizedCraftBadge(item.craftClassification, lang);
          return <div key={item.id} className="rounded-lg border border-border bg-card text-card-foreground overflow-hidden flex flex-col justify-between shadow-soft transition-all hover:border-primary/40 hover:-translate-y-[1px] cursor-pointer" onClick={() => {
            if (onInspectServiceDetail) {
              onInspectServiceDetail(item.id as ServiceId);
            } else {
              onSelectServiceForQuote(item.id as ServiceId);
            }
          }} data-api-unique-id='servicesgrid-re63b84c7406b2efe-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                  <div data-api-unique-id='servicesgrid-r3f61ffa0ef0db837-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted" data-api-unique-id='servicesgrid-r0eb7609427df7ab6-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                      <EditableImg propKey={`service-grid-${item.id}`} src={item.imageUrl || undefined} alt={title} className="h-full w-full object-cover" data-api-unique-id='servicesgrid-ra5984249c5a7e9dd-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1" data-api-unique-id='servicesgrid-r37bedcfe3e0f745e-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        <span className="rounded-sm bg-accent text-accent-foreground px-1.5 py-0.5 text-[10px] font-semibold" data-api-unique-id='servicesgrid-r2cc053dd8052644b-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          {badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-4" data-api-unique-id='servicesgrid-r840f481de5619003-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                      <div className="flex items-start justify-between gap-1" data-api-unique-id='servicesgrid-rfa0992da0b66af72-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        <h4 className="font-display text-base font-bold text-card-foreground" data-api-unique-id='servicesgrid-ra32b297817ad0eb3-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          {title}
                        </h4>
                        <div className="flex flex-col items-end shrink-0" data-api-unique-id='servicesgrid-r817a6c8d4739bd81-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          <span className="text-xs font-bold text-primary whitespace-nowrap" data-api-unique-id='servicesgrid-r1ff2a7051022bfc8-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' data-api-bind-info={`others-${index}-baselineHourlyRate`} data-api-map-var-name='item'>
                            €{item.baselineHourlyRate}/h
                          </span>
                          {item.typicalRangeEur && <span className="text-[10px] text-muted-foreground whitespace-nowrap" data-api-unique-id='servicesgrid-r97daeb3415523893-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' data-api-bind-info={`others-${index}-typicalRangeEur`} data-api-map-var-name='item'>
                              {item.typicalRangeEur}
                            </span>}
                        </div>
                      </div>

                      {desc && <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed" data-api-unique-id='servicesgrid-r815057b846c3cfd0-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          {desc}
                        </p>}

                      {item.leadArtisan && <div className="mt-2.5 flex flex-wrap gap-1" data-api-unique-id='servicesgrid-rc931cb7b1f92108f-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                          <span className="rounded-sm bg-muted text-muted-foreground px-1.5 py-0.5 text-[10px] border border-border" data-api-unique-id='servicesgrid-r5637b265dbf4f9bd-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' data-api-bind-info={`others-${index}-leadArtisan`} data-api-map-var-name='item'>
                            {item.leadArtisan}
                          </span>
                        </div>}
                    </div>
                  </div>

                  <div className="p-4 pt-0" data-api-unique-id='servicesgrid-r58823a56cd945a2f-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                    <button type="button" onClick={e => {
                e.stopPropagation();
                onSelectServiceForQuote(item.id as ServiceId);
              }} className="w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-secondary py-2 text-xs font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='servicesgrid-rc48183f35308c85c-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                      <Hammer className="h-3 w-3 text-primary" data-api-unique-id='servicesgrid-r3824f84d48627a90-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1' />
                      <span data-api-unique-id='servicesgrid-r27dc993e3c2283bf-s1370428328' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServicesGrid' data-api-in-loop='1'>
                        {lang === "de" ? "Auswählen & kalkulieren" : lang === "ru" ? "Выбрать и рассчитать" : "Select & Estimate"}
                      </span>
                    </button>
                  </div>
                </div>;
        })}
          </div>}
      </div>
    </section>;
}