"use client";

import React, { useState } from "react";
import type { Language, LogisticsZone, ViennaDistrictDTO } from "@/frontend/types/HomeFrontend";
import { MapPin, CheckCircle, Clock } from "lucide-react";
interface ServiceAreaSummaryProps {
  lang: Language;
  districts?: ViennaDistrictDTO[];
}
const zoneLabels: Record<LogisticsZone, Record<Language, string>> = {
  INNER_CITY: {
    en: "Inner City Zone",
    de: "Innere Bezirke",
    ru: "Центральные районы"
  },
  CENTRAL: {
    en: "Central Urban Zone",
    de: "Erweiterte Bezirke",
    ru: "Городские районы"
  },
  OUTER_RING: {
    en: "Outer Ring Zone",
    de: "Äußere Bezirke",
    ru: "Внешнее кольцо"
  },
  GREATER_SUBURB: {
    en: "Greater Suburb & Lower Austria",
    de: "Randbezirke & Umland",
    ru: "Пригороды и Нижняя Австрия"
  }
};
export default function ServiceAreaSummary({
  lang,
  districts = []
}: ServiceAreaSummaryProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("1010");
  const currentDist = districts.find(d => d.districtCode === selectedDistrict) || districts[0];
  return <section data-controller-name="Service Area & Location Summary" className="w-full border-b border-border bg-background text-foreground py-14 sm:py-16" data-api-unique-id='serviceareasummary-rfaa768f7967345c3-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='serviceareasummary-r9eb726db94686dbf-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" data-api-unique-id='serviceareasummary-r3853df85cf5bab27-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
          <div data-api-unique-id='serviceareasummary-r1520af6ae07f5c0c-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
            <div className="inline-flex items-center gap-1.5 rounded-sm bg-muted text-muted-foreground px-2.5 py-1 text-xs font-semibold border border-border mb-2" data-api-unique-id='serviceareasummary-r2bc5dba1352df319-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
              <MapPin className="h-3.5 w-3.5 text-primary" data-api-unique-id='serviceareasummary-re4fb279f8f51dd49-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' />
              <span data-api-unique-id='serviceareasummary-r5b34be46434c8574-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>Vienna 1010–1230 &amp; Lower Austria</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-api-unique-id='serviceareasummary-raaeabe11d6ce752c-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
              {lang === "de" ? "Einsatzgebiete in Wien & Umland" : lang === "ru" ? "Зона обслуживания: 1–23 районы Вены" : "Coverage Area: Vienna Districts 1–23"}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='serviceareasummary-r25899865f6d0c3d3-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
              {lang === "de" ? "Kurze Anfahrtswege und garantierte Termintreue in allen Wiener Gemeindebezirken." : lang === "ru" ? "Быстрый выезд и пунктуальность во всех районах Вены и пригородах." : "Fast dispatch, low flat travel allowances, and punctual appointments."}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted p-2 rounded-md border border-border" data-api-unique-id='serviceareasummary-r55708f3e53264a6c-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
            <Clock className="h-4 w-4 text-primary" data-api-unique-id='serviceareasummary-r0a6cf3b782db79f2-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' />
            <span data-api-unique-id='serviceareasummary-r86530d1687abc3df-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>Standard arrival window: 24–48 hours</span>
          </div>
        </div>

        {/* 23 Districts Mini-Capsules Grid */}
        <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-soft" data-api-unique-id='serviceareasummary-rce238f8dd2755147-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3" data-api-unique-id='serviceareasummary-r67fd311a27c95646-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
            Click district to view response details:
          </div>

          <div className="flex flex-wrap gap-2" data-api-unique-id='serviceareasummary-rba2b41d4db5a9e68-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
            {districts.map((dist, index) => {
            const isSelected = (currentDist?.districtCode || selectedDistrict) === dist.districtCode;
            const displayName = dist.districtName.includes(" ") ? dist.districtName.split(" ").slice(1).join(" ") : dist.districtName;
            return <button key={dist.id || dist.districtCode} type="button" onClick={() => setSelectedDistrict(dist.districtCode)} className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "bg-primary text-primary-foreground shadow-sm scale-105" : "bg-background text-foreground border border-border hover:bg-muted"}`} data-api-unique-id='serviceareasummary-r755bba3345cfe30b-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' data-api-in-loop='1'>
                  <span className="font-bold mr-1" data-api-unique-id='serviceareasummary-re74f82f311d317a3-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtCode`} data-api-map-var-name='dist'>{dist.districtCode}</span>
                  <span className="opacity-90" data-api-unique-id='serviceareasummary-r71c65fc148354591-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' data-api-in-loop='1'>{displayName || dist.districtName}</span>
                </button>;
          })}
          </div>

          {/* District Status Card */}
          {currentDist && <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background text-foreground p-4 rounded-lg border border-border" data-api-unique-id='serviceareasummary-rdb513417ecd558c0-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
              <div data-api-unique-id='serviceareasummary-rde808dcb06b4b1c3-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                <div className="flex items-center gap-2" data-api-unique-id='serviceareasummary-r807ea5429d4ab420-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                  <span className="h-2 w-2 rounded-full bg-success" data-api-unique-id='serviceareasummary-r3ebb42df4994aab5-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' />
                  <h4 className="font-display font-bold text-sm text-foreground" data-api-unique-id='serviceareasummary-r7d5b46dac0b07a50-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                    {currentDist.districtCode} — {currentDist.districtName}
                  </h4>
                  <span className="rounded-sm bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-semibold" data-api-unique-id='serviceareasummary-rb6369e8f4377f1d6-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                    {zoneLabels[currentDist.zone]?.[lang] || currentDist.zone}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground" data-api-unique-id='serviceareasummary-rfc9210ab7dbefce9-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                  Standard dispatch: ~{currentDist.leadTimeHours}h window | Flat travel allowance: €15.00 – €25.00 | Same-day express slot possible upon capacity.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs" data-api-unique-id='serviceareasummary-rad29789cf9aa1a4f-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                <div className="flex items-center gap-1 text-success" data-api-unique-id='serviceareasummary-r58e28689a1dddd73-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                  <CheckCircle className="h-4 w-4" data-api-unique-id='serviceareasummary-rdf20f0e3bbf4238a-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary' />
                  <span data-api-unique-id='serviceareasummary-rf5932569b49aa648-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>Full Coverage</span>
                </div>
                <a href="#quote-section" className="rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground hover:brightness-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='serviceareasummary-r49edc74b9d467817-s1437568007' data-api-unique-page-name='src/frontend/components/HomeFrontend/ServiceAreaSummary'>
                  Select in Form
                </a>
              </div>
            </div>}
        </div>
      </div>
    </section>;
}