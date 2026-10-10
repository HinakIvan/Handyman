"use client";

import React from "react";
import type { Language } from "@/frontend/types/HomeFrontend";
import { Euro, Clock, Truck, FileText, Check } from "lucide-react";
interface PricingTransparencyProps {
  lang: Language;
}
const pricingCopy = {
  en: {
    sectionTitle: "Pricing & Cost Transparency",
    sectionSubtitle: "Honest benchmark rates with zero hidden fees under Austrian trade standards.",
    col1Title: "Baseline Rate",
    col1Value: "From €15 / hr",
    col1Desc: "Starting baseline for general assembly, assistance, and standard handyman tasks.",
    col2Title: "Materials & Supplies",
    col2Value: "Transparent Invoicing",
    col2Desc: "You can supply materials yourself or we source at actual receipt cost + handling.",
    col3Title: "Travel & Anfahrt",
    col3Value: "District Tier Flat Rate",
    col3Desc: "Tiered flat travel allowance across Vienna 1st–23rd districts (€15–€25 flat).",
    col4Title: "Austrian Invoicing",
    col4Value: "Official Business Invoice",
    col4Desc: "Proper invoice issued with legal tax breakdown suitable for landlord or insurance records.",
    guaranteeText: "Binding estimates provided before work commences. No surprise final bills."
  },
  de: {
    sectionTitle: "Preistransparenz & Kostenstruktur",
    sectionSubtitle: "Verbindliche Richtwerte ohne versteckte Kosten nach österreichischem Handwerksstandard.",
    col1Title: "Grundtarif",
    col1Value: "Ab €15 / Std.",
    col1Desc: "Einstiegs-Stundensatz für Montage-, Vorbereitungs- und allgemeine Hilfsarbeiten.",
    col2Title: "Materialien & Baubedarf",
    col2Value: "Transparente Abrechnung",
    col2Desc: "Eigenes Material stellen oder transparente Weiterberechnung mit Originalbeleg.",
    col3Title: "Anfahrtspauschale",
    col3Value: "Bezirksstaffel",
    col3Desc: "Faire Anfahrtspauschalen für alle 23 Wiener Bezirke (€15 bis €25 pauschal).",
    col4Title: "Rechnungswesen",
    col4Value: "Ordnungsgemäße Rechnung",
    col4Desc: "Offizielle Rechnung mit MwSt.-Ausweis für Hausverwaltung, Vermieter oder Versicherung.",
    guaranteeText: "Verbindliche Kostenschätzung vor Beginn. Keine überraschenden Nachforderungen."
  },
  ru: {
    sectionTitle: "Прозрачность цен и тарифы",
    sectionSubtitle: "Честные ориентировочные ставки без скрытых переплат по австрийским стандартам.",
    col1Title: "Базовый тариф",
    col1Value: "От €15 / час",
    col1Desc: "Начальная ставка на базовую сборку мебели, мелкий ремонт и вспомогательные работы.",
    col2Title: "Материалы",
    col2Value: "По чекам без наценки",
    col2Desc: "Вы можете предоставить свои материалы или мы закупим всё по магазинным чекам.",
    col3Title: "Выезд мастера",
    col3Value: "Фиксированная ставка",
    col3Desc: "Фиксированная стоимость выезда по 1–23 районам Вены (€15–€25).",
    col4Title: "Австрийский счёт",
    col4Value: "Официальный инвойс",
    col4Desc: "Официальная фактура с НДС для арендодателя, управляющей компании или страховой.",
    guaranteeText: "Окончательная смета утверждается до начала работ. Никаких непредвиденных доплат."
  }
};
export default function PricingTransparency({
  lang
}: PricingTransparencyProps) {
  const t = pricingCopy[lang] || pricingCopy.en;
  return <section data-controller-name="Pricing Transparency" className="w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16" data-api-unique-id='pricingtransparency-rf9b4be8d5ebd0537-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='pricingtransparency-ra2ba9580c18f24f2-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
        <div className="mb-8" data-api-unique-id='pricingtransparency-r7d61fd3dfe2c0c60-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground" data-api-unique-id='pricingtransparency-r5ebc8c67ce97fbfd-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            {t.sectionTitle}
          </h2>
          {/* Temporarily hidden: pricing subtitle */}
          {/*           <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='pricingtransparency-rdda633638fd13e9d-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            {t.sectionSubtitle}
          </p> */}
        </div>

        {/* 4 Pillars of Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-api-unique-id='pricingtransparency-r8c9578edafa72521-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
          {/* Pillar 1 */}
          <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingtransparency-r7ea30a5d1c252f42-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            <div data-api-unique-id='pricingtransparency-rcb04e02b251958d1-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <div className="flex items-center gap-2 text-primary mb-3" data-api-unique-id='pricingtransparency-r0c6f7928079d1b77-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                <Euro className="h-5 w-5" data-api-unique-id='pricingtransparency-r31241cc97eb75ad8-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='pricingtransparency-r1b6d92295e35786c-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                  {t.col1Title}
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground" data-api-unique-id='pricingtransparency-r0d14ee6266c5b768-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col1Value}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='pricingtransparency-rffa6348f9a0c208c-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col1Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='pricingtransparency-r9d19bf7c6f106ba0-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='pricingtransparency-rd087ee6374ab7eae-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
              <span data-api-unique-id='pricingtransparency-rff5d6bbee94d0e4c-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>Standard tool set included</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingtransparency-r0436afd16e6d1de2-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            <div data-api-unique-id='pricingtransparency-r21fba434518c1835-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <div className="flex items-center gap-2 text-primary mb-3" data-api-unique-id='pricingtransparency-r9650d18c2b08c5bc-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                <FileText className="h-5 w-5" data-api-unique-id='pricingtransparency-r9d92b21b44130a9b-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='pricingtransparency-r84662db33779d251-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                  {t.col2Title}
                </span>
              </div>
              <div className="font-display text-xl font-bold text-foreground" data-api-unique-id='pricingtransparency-r7ced2dec495109a7-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col2Value}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='pricingtransparency-r0c4bf41af35df182-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col2Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='pricingtransparency-r6d70a2e68a28de31-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='pricingtransparency-r64958a89c79c80be-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
              <span data-api-unique-id='pricingtransparency-r5bdc76c704e00d44-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>Obi / Hornbach original receipts</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingtransparency-r3d5e24e69da02f0c-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            <div data-api-unique-id='pricingtransparency-r84e4785e0a7662bf-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <div className="flex items-center gap-2 text-primary mb-3" data-api-unique-id='pricingtransparency-r9fa7a202ba09d809-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                <Truck className="h-5 w-5" data-api-unique-id='pricingtransparency-r6e124d837ba4e91a-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='pricingtransparency-r1153604dc810e3fb-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                  {t.col3Title}
                </span>
              </div>
              <div className="font-display text-xl font-bold text-foreground" data-api-unique-id='pricingtransparency-reb9f04fa00ddea2e-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col3Value}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='pricingtransparency-re8e0db4e42b7af63-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col3Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='pricingtransparency-r57a81a05041b2c63-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='pricingtransparency-r40ed3740d73a0384-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
              <span data-api-unique-id='pricingtransparency-r3d7b617095c74b70-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>No charge if cancelled 24h prior</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingtransparency-r2e83107e0c674b3a-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            <div data-api-unique-id='pricingtransparency-r509361a31418c674-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <div className="flex items-center gap-2 text-primary mb-3" data-api-unique-id='pricingtransparency-r9acee159b217f6ce-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                <Clock className="h-5 w-5" data-api-unique-id='pricingtransparency-r6b451c5394269687-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='pricingtransparency-rd3649f2020c33842-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                  {t.col4Title}
                </span>
              </div>
              <div className="font-display text-xl font-bold text-foreground" data-api-unique-id='pricingtransparency-r1f90f4b2995a6bd9-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col4Value}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='pricingtransparency-r6f2c1b984c318637-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
                {t.col4Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='pricingtransparency-r1883ede9b2d870ed-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
              <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='pricingtransparency-rdc8496b1872ce59e-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
              <span data-api-unique-id='pricingtransparency-r3906e5c621c624ef-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>UST &amp; GewO compliant</span>
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        {/* Temporarily hidden: pricing transparency footer note */}
        {false && (
        <div className="mt-6 rounded-md bg-muted text-muted-foreground p-4 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-border" data-api-unique-id='pricingtransparency-r69bd605ec576c278-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
          <div className="flex items-center gap-2" data-api-unique-id='pricingtransparency-r919df3dcd2bdacd1-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            <span className="h-2 w-2 rounded-full bg-success shrink-0" data-api-unique-id='pricingtransparency-red999381ab9f1d27-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency' />
            <span className="font-medium text-foreground" data-api-unique-id='pricingtransparency-r7a5d3545d7b5a00d-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>{t.guaranteeText}</span>
          </div>
          <span className="text-xs text-muted-foreground" data-api-unique-id='pricingtransparency-ra08bfbe47969fb9c-s3425617876' data-api-unique-page-name='src/frontend/components/HomeFrontend/PricingTransparency'>
            Vienna Handelsgericht &amp; WKO registered
          </span>
        </div>
        )}

      </div>
    </section>;
}