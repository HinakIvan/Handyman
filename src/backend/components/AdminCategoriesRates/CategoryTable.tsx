"use client";

import React from "react";
import { ServiceCategoryItem, SortField, SortDirection, LanguageDisplay } from "@/backend/types/AdminCategoriesRates";
import { ArrowUpDown, ArrowUp, ArrowDown, Edit, Star, Users, Shield, Briefcase, AlertCircle } from "lucide-react";
interface CategoryTableProps {
  categories: ServiceCategoryItem[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField) => void;
  languageDisplay: LanguageDisplay;
  onEditCategory: (category: ServiceCategoryItem) => void;
  onToggleFeatured: (category: ServiceCategoryItem) => void;
}
export default function CategoryTable({
  categories,
  sortField,
  sortDirection,
  onSortChange,
  languageDisplay,
  onEditCategory,
  onToggleFeatured
}: CategoryTableProps) {
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" data-api-unique-id='categorytable-radb7b881c3ac833b-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' />;
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3 text-primary" data-api-unique-id='categorytable-rf89d8c3878cd84b7-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' /> : <ArrowDown className="ml-1 h-3 w-3 text-primary" data-api-unique-id='categorytable-r0554707f557b604d-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' />;
  };
  return <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='categorytable-r79442077c36ebd55-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
      <table className="w-full min-w-[960px] border-collapse text-left text-xs text-foreground" data-api-unique-id='categorytable-r5ab0583dfc4c08ea-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
        <thead data-api-unique-id='categorytable-rd5380372ca231936-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
          <tr className="border-b border-border bg-muted/60 text-muted-foreground font-medium" data-api-unique-id='categorytable-r489a8d4117cd4e24-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
            <th scope="col" className="py-3 px-4 min-w-[130px] whitespace-nowrap cursor-pointer select-none" onClick={() => onSortChange("key")} data-api-unique-id='categorytable-r6080544f2a66fb83-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <div className="flex items-center" data-api-unique-id='categorytable-r8af2a73d42a6c96c-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
                <span data-api-unique-id='categorytable-rb5d5747753780bd5-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Category Key</span>
                {renderSortIndicator("key")}
              </div>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[220px] cursor-pointer select-none" onClick={() => onSortChange("titleEn")} data-api-unique-id='categorytable-r56e485f18456cfff-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <div className="flex items-center" data-api-unique-id='categorytable-r3349d2a2e837ab57-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
                <span data-api-unique-id='categorytable-r02301dc3b2e529d5-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Multilingual Titles (DE / EN / RU)</span>
                {renderSortIndicator("titleEn")}
              </div>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[170px] whitespace-nowrap" data-api-unique-id='categorytable-r5ae9fb7b2aa15f60-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <span data-api-unique-id='categorytable-r9fc1732ed4277943-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Austrian GewO 1994 Classification</span>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[130px] text-right whitespace-nowrap cursor-pointer select-none" onClick={() => onSortChange("baselineHourlyRate")} data-api-unique-id='categorytable-r9e90cd365750ccab-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <div className="flex items-center justify-end" data-api-unique-id='categorytable-rfc22e14c120499a4-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
                <span data-api-unique-id='categorytable-r4e7a3fd3982c7cd8-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Baseline Rate</span>
                {renderSortIndicator("baselineHourlyRate")}
              </div>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[130px] text-right whitespace-nowrap" data-api-unique-id='categorytable-re699f6223e6fd711-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <span data-api-unique-id='categorytable-rfb921d6d855cc5bf-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Typical Range</span>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[180px]" data-api-unique-id='categorytable-r524f21174316f15a-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <span data-api-unique-id='categorytable-r53608dcd1f9b894a-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Assigned Lead Artisan</span>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[100px] text-center whitespace-nowrap" data-api-unique-id='categorytable-rb39153dffb1a7a07-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <span data-api-unique-id='categorytable-r8400c74f83d3f716-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Showcase</span>
            </th>
            <th scope="col" className="py-3 px-4 min-w-[90px] text-right whitespace-nowrap" data-api-unique-id='categorytable-r2d7e0e0884d2e8a0-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <span data-api-unique-id='categorytable-r4c13a5df63960f38-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card" data-api-unique-id='categorytable-rde20ac5e6683fdda-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
          {categories.length === 0 ? <tr data-api-unique-id='categorytable-r83ff49c707528554-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
              <td colSpan={8} className="py-10 text-center text-muted-foreground" data-api-unique-id='categorytable-r503f741eda7ba9ab-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
                <div className="flex flex-col items-center justify-center gap-2" data-api-unique-id='categorytable-r6160b10096825aec-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>
                  <AlertCircle className="h-6 w-6 text-muted-foreground" data-api-unique-id='categorytable-rc54ae520f9efea17-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' />
                  <p className="text-sm font-medium" data-api-unique-id='categorytable-r6ae5a63b42653a0a-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>No service categories matching criteria.</p>
                  <p className="text-xs" data-api-unique-id='categorytable-r3e3ba56ed983af32-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable'>Adjust your search keyword or classification filters above.</p>
                </div>
              </td>
            </tr> : categories.map((cat, index) => {
          const isFreies = cat.craftClassification === "FREIES_HANDWERK";
          return <tr key={cat.id} className="transition-colors hover:bg-muted/40 group" data-api-unique-id='categorytable-reb0d55cfc78adfc7-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                  {/* Column 1: Category Key */}
                  <td className="py-3 px-4 font-mono font-medium text-foreground whitespace-nowrap" data-api-unique-id='categorytable-r63ba54cd749df1f6-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <div className="flex items-center gap-1.5" data-api-unique-id='categorytable-r9806ee826212426e-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" data-api-unique-id='categorytable-rde319211a7c576d4-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' />
                      <span className="font-semibold" data-api-unique-id='categorytable-r36eb3994b5bcdf13-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-key`} data-api-map-var-name='cat'>{cat.key}</span>
                    </div>
                  </td>

                  {/* Column 2: Multilingual Titles */}
                  <td className="py-3 px-4" data-api-unique-id='categorytable-recf2262438587fe0-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <div className="flex flex-col gap-1 min-w-0" data-api-unique-id='categorytable-rea4d5accbf5bcd38-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                      {languageDisplay === "ALL" ? <>
                          <div className="flex items-center gap-1.5" data-api-unique-id='categorytable-r097abd7175050204-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                            <span className="inline-flex shrink-0 items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground border border-border" data-api-unique-id='categorytable-r11c29418362953d1-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                              DE
                            </span>
                            <span className="font-semibold text-foreground truncate" data-api-unique-id='categorytable-r8ae47be8612a7776-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleDe`} data-api-map-var-name='cat'>
                              {cat.titleDe}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5" data-api-unique-id='categorytable-r9e8aec8cf10abf73-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                            <span className="inline-flex shrink-0 items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground border border-border" data-api-unique-id='categorytable-re1b48430f7cbf73b-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                              EN
                            </span>
                            <span className="text-muted-foreground truncate" data-api-unique-id='categorytable-r2691af5a5f17cebc-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleEn`} data-api-map-var-name='cat'>{cat.titleEn}</span>
                          </div>
                          <div className="flex items-center gap-1.5" data-api-unique-id='categorytable-r6fea99a754083411-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                            <span className="inline-flex shrink-0 items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground border border-border" data-api-unique-id='categorytable-r03a2506341b0bda1-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                              RU
                            </span>
                            <span className="text-muted-foreground truncate" data-api-unique-id='categorytable-r0c7d603ef8a06b3d-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleRu`} data-api-map-var-name='cat'>{cat.titleRu}</span>
                          </div>
                        </> : languageDisplay === "DE" ? <div data-api-unique-id='categorytable-rfdda902e43eaad5d-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                          <span className="font-semibold text-foreground" data-api-unique-id='categorytable-rf502f6e9bc1301e8-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleDe`} data-api-map-var-name='cat'>{cat.titleDe}</span>
                          <span className="block text-[11px] text-muted-foreground" data-api-unique-id='categorytable-r2d320ee238d932c7-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleEn`} data-api-map-var-name='cat'>
                            EN: {cat.titleEn}
                          </span>
                        </div> : languageDisplay === "EN" ? <div data-api-unique-id='categorytable-r68dba4d57dc86019-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                          <span className="font-semibold text-foreground" data-api-unique-id='categorytable-rade34e2af3ee5e53-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleEn`} data-api-map-var-name='cat'>{cat.titleEn}</span>
                          <span className="block text-[11px] text-muted-foreground" data-api-unique-id='categorytable-r1647ff4a84bd2489-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleDe`} data-api-map-var-name='cat'>
                            DE: {cat.titleDe}
                          </span>
                        </div> : <div data-api-unique-id='categorytable-rfaf0e73dc8124ea3-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                          <span className="font-semibold text-foreground" data-api-unique-id='categorytable-rf3fd5b833a13cf3e-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleRu`} data-api-map-var-name='cat'>{cat.titleRu}</span>
                          <span className="block text-[11px] text-muted-foreground" data-api-unique-id='categorytable-r9b311b93dc7c9a00-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-titleDe`} data-api-map-var-name='cat'>
                            DE: {cat.titleDe}
                          </span>
                        </div>}
                    </div>
                  </td>

                  {/* Column 3: Austrian Craft Classification Badge */}
                  <td className="py-3 px-4 whitespace-nowrap" data-api-unique-id='categorytable-r70b2f63e273d3340-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    {isFreies ? <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground border border-transparent" data-api-unique-id='categorytable-r0b5fb2f83522730a-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                        <Shield className="h-3 w-3 shrink-0" data-api-unique-id='categorytable-rc96a4371158548a9-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' />
                        <span data-api-unique-id='categorytable-ra534f675cf44ffdb-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>Freies Handwerk</span>
                      </span> : <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground border border-border" data-api-unique-id='categorytable-r43e676776fe34a0a-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                        <Shield className="h-3 w-3 shrink-0" data-api-unique-id='categorytable-rae3f36d4d5af4ded-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' />
                        <span data-api-unique-id='categorytable-rd072be8e476f1295-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>Meister-Kooperation</span>
                      </span>}
                  </td>

                  {/* Column 4: Baseline Hourly Rate (min. 15 EUR/h) */}
                  <td className="py-3 px-4 text-right whitespace-nowrap" data-api-unique-id='categorytable-r4b37962646cb7447-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <div className="inline-flex flex-col items-end" data-api-unique-id='categorytable-r7ee15f36ad3ac2af-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                      <span className="font-mono text-sm font-bold text-foreground" data-api-unique-id='categorytable-r52cb9edee2031a49-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                        €{cat.baselineHourlyRate.toFixed(2)}
                        <span className="text-xs font-normal text-muted-foreground" data-api-unique-id='categorytable-r62c9b0ffe235fb7c-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>/h</span>
                      </span>
                      {cat.baselineHourlyRate < 15 ? <span className="text-[10px] font-medium text-destructive" data-api-unique-id='categorytable-rfd2120273445b251-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                          Violates GewO
                        </span> : <span className="text-[10px] font-medium text-success" data-api-unique-id='categorytable-r17d24a0abb93e203-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                          Floor Verified
                        </span>}
                    </div>
                  </td>

                  {/* Column 5: Typical Range */}
                  <td className="py-3 px-4 text-right font-mono text-xs text-muted-foreground whitespace-nowrap" data-api-unique-id='categorytable-r9008baf745d4bde6-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <span data-api-unique-id='categorytable-r0c2eec15c99ef9fd-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' data-api-bind-info={`categories-${index}-typicalRangeEur`} data-api-map-var-name='cat'>{cat.typicalRangeEur}</span>
                  </td>

                  {/* Column 6: Assigned Lead Artisan */}
                  <td className="py-3 px-4" data-api-unique-id='categorytable-rf9c690f7cb44935b-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <div className="flex items-center gap-1.5 min-w-0" data-api-unique-id='categorytable-r3f0de5475d361089-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                      <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" data-api-unique-id='categorytable-r1beaf324eec199c0-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' />
                      <span className="font-medium text-foreground truncate" title={cat.leadArtisan ?? undefined} data-api-unique-id='categorytable-racd4abc2aa875b9e-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                        {cat.leadArtisan || "—"}
                      </span>
                    </div>
                  </td>

                  {/* Column 7: Featured Showcase Status Toggle */}
                  <td className="py-3 px-4 text-center whitespace-nowrap" data-api-unique-id='categorytable-ra73d1e9d2e9c75a5-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <button type="button" onClick={() => onToggleFeatured(cat)} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cat.isFeatured ? "bg-warning text-warning-foreground hover:brightness-95" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} title={cat.isFeatured ? "Click to remove from featured showcase" : "Click to enable showcase spotlight"} data-api-unique-id='categorytable-rfaae18eeabc16be7-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                      <Star className={`h-3 w-3 shrink-0 ${cat.isFeatured ? "fill-warning-foreground" : ""}`} data-api-unique-id='categorytable-r982fda33ca0983f3-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' />
                      <span data-api-unique-id='categorytable-re9b46fbe30fe64fc-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>{cat.isFeatured ? "Featured" : "Standard"}</span>
                    </button>
                  </td>

                  {/* Column 8: Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap" data-api-unique-id='categorytable-r2e486c60a3824cd8-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                    <button type="button" onClick={() => onEditCategory(cat)} className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title={`Configure rates & artisan partner for ${cat.key}`} data-api-unique-id='categorytable-r9a4d3b06d2c5d138-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>
                      <Edit className="h-3 w-3 shrink-0" data-api-unique-id='categorytable-rbfc0d29c0e5005dd-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1' />
                      <span data-api-unique-id='categorytable-r2d7597ed7770af5a-s3572888182' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/CategoryTable' data-api-in-loop='1'>Edit</span>
                    </button>
                  </td>
                </tr>;
        })}
        </tbody>
      </table>
    </div>;
}