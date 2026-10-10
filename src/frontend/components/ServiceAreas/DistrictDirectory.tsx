"use client";

import React from "react";
import { ViennaDistrictRecord, UrbanLogisticsZone } from "@/frontend/types/ServiceAreas";
import { Search, Clock, AlertCircle, X, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";
interface DistrictDirectoryProps {
  districts: ViennaDistrictRecord[];
  allDistrictsCount: number;
  selectedZone: UrbanLogisticsZone;
  searchQuery: string;
  onSelectZone: (zone: UrbanLogisticsZone) => void;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
}
const ZONE_BADGE_STYLE: Record<ViennaDistrictRecord["zone"], {
  label: string;
  badgeClass: string;
}> = {
  INNER_CITY: {
    label: "Inner City",
    badgeClass: "bg-accent text-accent-foreground"
  },
  CENTRAL: {
    label: "Central",
    badgeClass: "bg-primary text-primary-foreground"
  },
  OUTER_RING: {
    label: "Outer Ring",
    badgeClass: "bg-secondary text-secondary-foreground"
  },
  GREATER_SUBURB: {
    label: "Greater Suburb",
    badgeClass: "bg-muted text-muted-foreground"
  }
};
export default function DistrictDirectory({
  districts,
  allDistrictsCount,
  selectedZone,
  searchQuery,
  onSelectZone,
  onSearchChange,
  onResetFilters
}: DistrictDirectoryProps) {
  return <section data-controller-name="Vienna District Directory" className="w-full bg-background border-b border-border py-12 md:py-16" data-api-unique-id='districtdirectory-r70e9170412a77f4c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8" data-api-unique-id='districtdirectory-r90b252c1fdf5f415-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
        {/* Section Header & Integrated Controls Bar */}
        <div className="space-y-4" data-api-unique-id='districtdirectory-r74c3446333b9a172-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" data-api-unique-id='districtdirectory-r65b0c2ba2d100b07-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
            <div data-api-unique-id='districtdirectory-rc76acb1f3d265237-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display" data-api-unique-id='districtdirectory-rfc296e6f74c9a0ae-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Vienna Municipal District Coverage (1010–1230)
              </h2>
              <p className="text-sm text-muted-foreground mt-1" data-api-unique-id='districtdirectory-r125aba26bfc6c35e-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Official postal registry of all 23 districts with guaranteed artisan lead times and Altbau stairwell readiness.
              </p>
            </div>
            <div className="text-xs font-mono font-semibold text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-md shrink-0" data-api-unique-id='districtdirectory-rf1f61dfc7c6bf937-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              Showing {districts.length} of {allDistrictsCount} Municipal Districts
            </div>
          </div>

          {/* Controls Bar: 4-Zone Filter Tabs + Realtime Search Bar */}
          <div className="p-4 rounded-lg bg-card border border-border shadow-soft flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4" data-api-unique-id='districtdirectory-rb86ed10aef6fd376-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
            {/* 4-Zone Switcher */}
            <div className="flex flex-wrap items-center gap-1.5" data-api-unique-id='districtdirectory-r61781c45a1577a4c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2 hidden sm:inline" data-api-unique-id='districtdirectory-r539d566f6800c002-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Sector:
              </span>
              <button type="button" onClick={() => onSelectZone("ALL")} className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedZone === "ALL" ? "bg-accent text-accent-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='districtdirectory-r53ecb58007fc3edc-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                All 23 Districts
              </button>
              <button type="button" onClick={() => onSelectZone("INNER_CITY")} className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedZone === "INNER_CITY" ? "bg-accent text-accent-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='districtdirectory-ra2e3dc164f296c32-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Inner City (1010)
              </button>
              <button type="button" onClick={() => onSelectZone("CENTRAL")} className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedZone === "CENTRAL" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='districtdirectory-rf9c7b923c0ba5ce6-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Central (1020–1090)
              </button>
              <button type="button" onClick={() => onSelectZone("OUTER_RING")} className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedZone === "OUTER_RING" ? "bg-secondary text-secondary-foreground ring-1 ring-border shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='districtdirectory-rf1427d2d79905e2d-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Outer Ring (1100–1200)
              </button>
              <button type="button" onClick={() => onSelectZone("GREATER_SUBURB")} className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedZone === "GREATER_SUBURB" ? "bg-foreground text-background shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='districtdirectory-rba046e35ebe049f2-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                Greater Suburb (1130–1230)
              </button>
            </div>

            {/* Instant Postal / Name Search */}
            <div className="relative flex-1 max-w-full lg:max-w-xs" data-api-unique-id='districtdirectory-raee94c60c763d70a-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" data-api-unique-id='districtdirectory-rfb18649219310562-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' />
              <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search postal code (e.g. 1070) or name..." className="w-full pl-9 pr-8 py-2 rounded-md bg-background text-foreground border border-input text-xs sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='districtdirectory-radfd5691f17de17c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' />
              {searchQuery && <button type="button" onClick={() => onSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search" data-api-unique-id='districtdirectory-rc504af9ea77153fd-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
                  <X className="w-4 h-4" data-api-unique-id='districtdirectory-rd0bf0d0b2d26fdd6-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' />
                </button>}
            </div>
          </div>
        </div>

        {/* District Cards Grid */}
        {districts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-api-unique-id='districtdirectory-r77272ab59239e8d3-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
            {districts.map((item, index) => {
          const zoneStyle = ZONE_BADGE_STYLE[item.zone] ?? {
            label: item.zone,
            badgeClass: "bg-muted text-muted-foreground"
          };
          const isHistoricHighlight = item.districtNumber <= 9;
          return <article key={item.id} className={`min-w-0 rounded-md border p-4 flex flex-col justify-between transition-all ${isHistoricHighlight ? "bg-card text-card-foreground border-border shadow-soft hover:border-primary" : "bg-card text-card-foreground border-border/80 hover:border-border hover:shadow-soft"}`} data-api-unique-id='districtdirectory-r20d9d4f9c2ff94a5-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                  {/* Top row: Postal Code & Municipal Index Stamp */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border/70" data-api-unique-id='districtdirectory-rd96d5755a2e2f590-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                    <div className="flex items-center gap-2" data-api-unique-id='districtdirectory-ra902134e316bb04c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                      <span className="font-mono text-lg font-extrabold tracking-tight text-foreground font-display" data-api-unique-id='districtdirectory-r1ae8196783be92e3-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtCode`} data-api-map-var-name='item'>
                        {item.districtCode}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground px-1.5 py-0.5 rounded bg-muted" data-api-unique-id='districtdirectory-r17cadaf137f6b2da-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtNumber`} data-api-map-var-name='item'>
                        District {item.districtNumber}
                      </span>
                    </div>

                    {/* Official Municipal Stamp (Bezirksnummer) */}
                    <span title={`Official Vienna Municipal District #${item.districtNumber}`} className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-background" data-api-unique-id='districtdirectory-rb463bb787771ccb0-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtNumber`} data-api-map-var-name='item'>
                      Wien {item.districtNumber}.
                    </span>
                  </div>

                  {/* Middle row: Official District Name + Architectural Note */}
                  <div className="py-3 space-y-1.5 flex-1 min-w-0" data-api-unique-id='districtdirectory-rebe37dfb7c936449-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                    <h3 className="font-bold text-base text-foreground font-display leading-tight truncate" data-api-unique-id='districtdirectory-r4d121d2ff73536ea-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtName`} data-api-map-var-name='item'>
                      {item.districtName}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" data-api-unique-id='districtdirectory-rfad8e1ef637cd4e6-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-boroughSubtitle`} data-api-map-var-name='item'>
                      {item.boroughSubtitle}
                    </p>

                    {/* Special Altbau narrow stairwell freight advisory for historic core */}
                    {item.isHistoricAltbauCore && <div className="pt-1 flex items-center gap-1.5 text-[11px] text-primary font-medium" data-api-unique-id='districtdirectory-rb5921d279236da7a-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" data-api-unique-id='districtdirectory-rb78a910b9f67d63f-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' />
                        <span className="truncate" data-api-unique-id='districtdirectory-r31b8c2f4b22543d0-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>Altbau stairwell & floor-runner equipped</span>
                      </div>}
                  </div>

                  {/* Bottom row: Zone Badge & Guaranteed Response Lead Time */}
                  <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-2" data-api-unique-id='districtdirectory-r33c580f0aaac1e8c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                    <span className={`inline-flex shrink-0 items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${zoneStyle.badgeClass}`} data-api-unique-id='districtdirectory-rd707fd9b5338265c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                      {zoneStyle.label}
                    </span>

                    <div className="flex items-center gap-1 font-mono text-xs font-bold text-foreground" data-api-unique-id='districtdirectory-r77b59fd8333d348c-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='districtdirectory-r6b813112e275d2b1-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' />
                      <span data-api-unique-id='districtdirectory-r3baaa54b3ef34c70-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-leadTimeHours`} data-api-map-var-name='item'>{item.leadTimeHours}h arrival</span>
                    </div>
                  </div>

                  {/* Direct conversion entry for this specific district */}
                  <div className="mt-3 pt-2" data-api-unique-id='districtdirectory-r9fb7e5f0611c8f13-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                    <Link href={`/quoterequest?district=${item.districtCode}`} className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors" data-api-unique-id='districtdirectory-r78840a277dba359e-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1'>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" data-api-unique-id='districtdirectory-rc793b75f7e0c4bb4-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' />
                      <span data-api-unique-id='districtdirectory-rfee6b98e6e42af81-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtCode`} data-api-map-var-name='item'>Request in {item.districtCode}</span>
                    </Link>
                  </div>
                </article>;
        })}
          </div> : (/* Empty state if search yields no results */
      <div className="p-8 rounded-lg border border-dashed border-border bg-card text-center space-y-3" data-api-unique-id='districtdirectory-rcc956418cc82adaf-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
            <ShieldAlert className="w-8 h-8 text-muted-foreground mx-auto" data-api-unique-id='districtdirectory-r4cb1236b786e872f-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory' />
            <h3 className="text-base font-bold text-foreground font-display" data-api-unique-id='districtdirectory-r38a7b01d80bb4cb6-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              No matching municipal district found
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto" data-api-unique-id='districtdirectory-r46e8a0bc8a32c9f8-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              No record found matching &quot;{searchQuery}&quot; in the current sector filter. Try searching by 4-digit code (e.g. 1010) or official name.
            </p>
            <button type="button" onClick={onResetFilters} className="px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" data-api-unique-id='districtdirectory-ra8cc0c3c15fc66f3-s1251637158' data-api-unique-page-name='src/frontend/components/ServiceAreas/DistrictDirectory'>
              Reset Filters & Show All 23 Districts
            </button>
          </div>)}
      </div>
    </section>;
}