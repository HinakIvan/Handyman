"use client";

import React, { useState } from "react";
import EditableImg from "@/@base/EditableImg";
import { LanguageCode, DistrictTravelRateDTO, PricingScopeStats } from "@/frontend/types/PricingScope";
import { ShieldCheck, Clock, MapPin, Receipt, CheckCircle2, ArrowRight, FileText, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
interface HeroBannerProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  districts?: DistrictTravelRateDTO[];
  stats?: PricingScopeStats;
}
export default function HeroBanner({
  currentLang,
  onLanguageChange,
  districts = [],
  stats
}: HeroBannerProps) {
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const baselineRate = stats?.baselineStartingEur ?? 15;
  const travelRates = districts.map((d, index) => d.flatRateEur);
  const minTravelRate = travelRates.length > 0 ? Math.min(...travelRates) : 19;
  const maxTravelRate = travelRates.length > 0 ? Math.max(...travelRates) : 29;
  const leadLabel = currentLang === "de" ? "Vorlauf" : currentLang === "ru" ? "предзаказ" : "lead time";
  const t = {
    en: {
      headline: "Transparent Hourly Rates & Austrian Trade Scope",
      subline: `Vienna Handwerk operates on an uncompromising zero-hidden-fee baseline. Pure €${baselineRate}/hour base rate, pass-through net materials from verified Austrian suppliers, and standardized district flat travel rates across Bezirke 1-23.`,
      baseBadge: "Austrian GewO 1994 Regulated Framework",
      rateLabel: "Baseline Rate",
      rateValue: `€${baselineRate}`,
      perHour: "/ hour",
      rateDesc: "Standard starting benchmark for basic craftsmanship & assembly",
      card1Title: "Minimum Booking",
      card1Value: "1.5 Hours",
      card1Desc: "Transparent initial window with pro-rata quarter-hour billing thereafter",
      card2Title: "Materials at Net Cost",
      card2Value: "0% Markup",
      card2Desc: "Supplier invoices passed through without surcharge or contractor premiums",
      card3Title: "Vienna Flat Travel",
      card3Value: `€${minTravelRate} – €${maxTravelRate}`,
      card3Desc: "Fixed zone travel flat rates including Kurzparkzone parking permits",
      viewTravelBtn: "View 23 Districts Travel Matrix",
      wkoNotice: "Registered Austrian Handwerk Compliance • WKO Trade Register",
      modalTitle: "Vienna Municipal Districts (Bezirke 1–23) Travel Flat Rates",
      modalDesc: "Standardized travel flat fees include artisan transit time, vehicle wear, and all Vienna Kurzparkzone (short-term parking) mandatory vouchers. No extra parking receipts billed.",
      closeBtn: "Close Ledger",
      emptyDistricts: "No district travel data available.",
      lowerAustriaNote: "Lower Austria (Niederösterreich) Border Commuter Belt: Mödling, Klosterneuburg, Baden, and Korneuburg are served with a standardized commuter flat rate of €39. Travel billing is strictly one-time per booking day; return trips and lunch interruptions are never charged to clients."
    },
    de: {
      headline: "Transparente Stundensätze & Gesetzlicher Gewerbeumfang",
      subline: `Vienna Handwerk steht für kompromisslose Kostentransparenz ohne versteckte Zuschläge. Ab ${baselineRate} €/Stunde Basis, originalgetreue Materialbelege zum Großhandels-Netto-Einkaufspreis und feste Anfahrtspauschalen für alle 23 Wiener Bezirke.`,
      baseBadge: "Gewerbeordnung 1994 (GewO) Konform",
      rateLabel: "Grundstundensatz",
      rateValue: `${baselineRate} €`,
      perHour: "/ Stunde",
      rateDesc: "Klarer Startrichtwert für freie Handwerks- und Montagetätigkeiten",
      card1Title: "Mindestdauer",
      card1Value: "1,5 Stunden",
      card1Desc: "Faire 1,5-Stunden-Erstbuchung, danach genaue 15-Minuten-Taktung",
      card2Title: "Material ohne Aufschlag",
      card2Value: "0% Aufschlag",
      card2Desc: "1:1 Weitergabe der Lieferantenbelege ohne heimliche Margen",
      card3Title: "Wiener Anfahrtspauschale",
      card3Value: `${minTravelRate} € – ${maxTravelRate} €`,
      card3Desc: "Feste Zonensätze inklusive Wiener Kurzparkzonen-Gebühren",
      viewTravelBtn: "Anfahrtstabellen der 23 Bezirke ansehen",
      wkoNotice: "Geprüfter österreichischer Handwerksbetrieb • WKO Gewerberegister",
      modalTitle: "Wiener Gemeindebezirke (1.–23. Bezirk) Anfahrtspauschalen",
      modalDesc: "Pauschale Anfahrtskosten beinhalten Fahrzeit, Fahrzeugabnutzung und Wiener Kurzparkzonen-Pauschalen. Keine gesonderte Verrechnung von Parkgebühren.",
      closeBtn: "Übersicht schließen",
      emptyDistricts: "Keine Bezirksdaten verfügbar.",
      lowerAustriaNote: "Niederösterreichisches Umland: Mödling, Klosterneuburg, Baden und Korneuburg werden mit einer standardisierten Pendlerpauschale von 39 € bedient. Die Verrechnung erfolgt strikt einmalig pro Einsatztag."
    },
    ru: {
      headline: "Прозрачные почасовые тарифы и правовые рамки Австрии",
      subline: `Vienna Handwerk гарантирует полное отсутствие скрытых комиссий. Базовый тариф от ${baselineRate} €/час, передача материалов по себестоимости поставщиков без наценок и фиксированная оплата выезда по всем 23 районам Вены.`,
      baseBadge: "Соответствие закону Gewerbeordnung 1994 (GewO)",
      rateLabel: "Базовая ставка",
      rateValue: `${baselineRate} €`,
      perHour: "/ час",
      rateDesc: "Фиксированная отправная точка для базовых монтажных работ",
      card1Title: "Минимальный заказ",
      card1Value: "1.5 часа",
      card1Desc: "Минимальное первичное бронирование с шагом расчета 15 минут далее",
      card2Title: "Материалы без наценки",
      card2Value: "0% наценки",
      card2Desc: "Оригинальные чеки поставщиков передаются без накруток подрядчика",
      card3Title: "Выезд по Вене",
      card3Value: `${minTravelRate} € – ${maxTravelRate} €`,
      card3Desc: "Фиксированная плата по зонам, включая городские парковочные сборы",
      viewTravelBtn: "Тарифы выезда по 23 районам",
      wkoNotice: "Австрийская квалификация ремесленников • Реестр WKO",
      modalTitle: "Фиксированные тарифы выезда по 23 районам Вены",
      modalDesc: "Стандартизированная фиксированная плата включает время в пути, амортизацию и парковочные талоны в зонах Kurzparkzone Вены. Без скрытых доплат за парковку.",
      closeBtn: "Закрыть реестр",
      emptyDistricts: "Данные по районам недоступны.",
      lowerAustriaNote: "Пригород Нижней Австрии: Мёдлинг, Клостернойбург, Баден и Корнойбург обслуживаются по фиксированному пригородному тарифу 39 €. Оплата строго единовременная за рабочий день."
    }
  }[currentLang];
  return <section data-controller-name="Pricing Ledger Billboard" className="relative w-full border-b border-border bg-background" data-api-unique-id='hero-r9d50a6cef852aa38-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
      {/* Background Editorial Handwerk Image Frame */}
      <div className="relative w-full overflow-hidden border-b border-border" data-api-unique-id='hero-r7defbf6f4c16dcde-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
        <div className="absolute inset-0 z-0 pointer-events-none" data-api-unique-id='hero-r228b7e38739823b6-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
          <EditableImg propKey="pricing-scope-hero-bg" needLargeImage keywords="vienna craftsman workshop architecture tools blueprint" description="Viennese architectural renovation workshop with woodworking tools, blueprint diagrams, measuring tape, and warm limestone craftsman workbench" className="w-full h-full object-cover" data-api-unique-id='hero-r88e5f7406a9e8123-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
        </div>

        {/* Content Box */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" data-api-unique-id='hero-r938eca3deccd9e36-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
          <div className="max-w-4xl bg-card/95 text-card-foreground border border-border rounded-lg p-6 sm:p-8 lg:p-10 shadow-elevated" data-api-unique-id='hero-rba0252b3605fdb7b-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
            
            {/* Top Bar with Language Selector & Legal Blueprint Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border" data-api-unique-id='hero-r96f9bef3799e5c00-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              <div className="flex flex-wrap items-center gap-2" data-api-unique-id='hero-rf5fafc8af23ac412-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase" data-api-unique-id='hero-r4e1a1b787086b36c-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-foreground" data-api-unique-id='hero-r0d9c3cdbac62941e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                  {t.baseBadge}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-muted text-muted-foreground text-xs font-medium" data-api-unique-id='hero-r9560ae9ba7dff5a3-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <MapPin className="w-3 h-3 text-primary" data-api-unique-id='hero-r4e0b5fc97adf4284-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                  Wien 1010–1230 & NÖ
                </span>
              </div>

              {/* Multilingual Selector Bar */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-md self-start sm:self-auto" data-api-unique-id='hero-r587a36c85df3fc22-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                <button type="button" onClick={() => onLanguageChange("de")} className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${currentLang === "de" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='hero-raa3130bffa1be83d-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  DE
                </button>
                <button type="button" onClick={() => onLanguageChange("en")} className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${currentLang === "en" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='hero-rc507e9cdfd313af2-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  EN
                </button>
                <button type="button" onClick={() => onLanguageChange("ru")} className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${currentLang === "ru" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='hero-r177952366615791c-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  RU
                </button>
              </div>
            </div>

            {/* H1 & Value Proposition */}
            <div className="pt-6 space-y-4" data-api-unique-id='hero-r148c18f6439bffab-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-card-foreground tracking-tight leading-tight" data-api-unique-id='hero-r04bf5a08ef9bd884-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                {t.headline}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl font-body leading-relaxed" data-api-unique-id='hero-re9a4c4df4a7b65b6-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                {t.subline}
              </p>
            </div>

            {/* Core Anchor Highlight Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch" data-api-unique-id='hero-r572c9d9c0bd8c3c3-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              
              {/* Primary Anchor Card (Starting Rate from stats) */}
              <div className="md:col-span-5 bg-background text-foreground border-2 border-primary rounded-lg p-6 flex flex-col justify-between shadow-soft" data-api-unique-id='hero-rf84f76bf1cfa86a2-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                <div data-api-unique-id='hero-r8d5a69e1ee518d0e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='hero-r08e6e9bf40e7ffa6-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    <span data-api-unique-id='hero-rfe681fab8a7b5779-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>{t.rateLabel}</span>
                    <span className="text-primary font-bold" data-api-unique-id='hero-rdb699bcd359e9b16-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>Standard GewO</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2" data-api-unique-id='hero-re978237a4e7b958b-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    <span className="text-5xl sm:text-6xl font-display font-extrabold text-primary tracking-tight" data-api-unique-id='hero-rd478da1c20ead4d3-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.rateValue}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground font-display" data-api-unique-id='hero-raedba87b0cac23d9-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.perHour}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground" data-api-unique-id='hero-rbdd32cedc7273912-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    {t.rateDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs" data-api-unique-id='hero-rd585d3f4f01c6a2e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <span className="text-muted-foreground" data-api-unique-id='hero-ra9ce03ed37f808cb-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>Basis: Freies Handwerk</span>
                  <span className="font-semibold text-accent flex items-center gap-1" data-api-unique-id='hero-r17e6ba75000a8d00-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" data-api-unique-id='hero-r9b5cf51cd74629b3-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' /> Netto Transparenz
                  </span>
                </div>
              </div>

              {/* Three Hard Pillars */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4" data-api-unique-id='hero-rd161f9a2203e093e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                
                {/* Pillar 1: Minimum Booking */}
                <div className="bg-background text-foreground border border-border rounded-lg p-4 flex flex-col justify-between" data-api-unique-id='hero-r8d172e9bc1dafe1d-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <div data-api-unique-id='hero-rfda39033e51eae02-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    <div className="w-8 h-8 rounded-sm bg-muted text-muted-foreground flex items-center justify-center mb-3" data-api-unique-id='hero-r6f82394bdb26a686-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      <Clock className="w-4 h-4 text-accent" data-api-unique-id='hero-r0990a9ed017d9c6a-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" data-api-unique-id='hero-r5fe0ef903a1b6ce2-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.card1Title}
                    </div>
                    <div className="mt-1 text-xl font-display font-bold text-foreground" data-api-unique-id='hero-r3f365449cbba5493-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.card1Value}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-normal" data-api-unique-id='hero-r89b14f9fe0ac5b96-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    {t.card1Desc}
                  </p>
                </div>

                {/* Pillar 2: Materials Net Cost */}
                <div className="bg-background text-foreground border border-border rounded-lg p-4 flex flex-col justify-between" data-api-unique-id='hero-r7e67674c1dee47cd-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <div data-api-unique-id='hero-r960c40a372021040-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    <div className="w-8 h-8 rounded-sm bg-muted text-muted-foreground flex items-center justify-center mb-3" data-api-unique-id='hero-rc980ad396ca6692f-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      <Receipt className="w-4 h-4 text-primary" data-api-unique-id='hero-rd9413876a8b9eb83-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" data-api-unique-id='hero-rf73b3e86678a6606-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.card2Title}
                    </div>
                    <div className="mt-1 text-xl font-display font-bold text-primary" data-api-unique-id='hero-r85ac2b8733afd9b9-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.card2Value}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-normal" data-api-unique-id='hero-raea9b05d6530bc19-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    {t.card2Desc}
                  </p>
                </div>

                {/* Pillar 3: Vienna Flat Travel */}
                <div className="bg-background text-foreground border border-border rounded-lg p-4 flex flex-col justify-between" data-api-unique-id='hero-r5eee9733f225e0b3-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                  <div data-api-unique-id='hero-r892cecb9603367b6-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    <div className="w-8 h-8 rounded-sm bg-muted text-muted-foreground flex items-center justify-center mb-3" data-api-unique-id='hero-r73c255e109a9be37-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      <MapPin className="w-4 h-4 text-accent" data-api-unique-id='hero-r1c4e2f1dd3a7b649-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" data-api-unique-id='hero-r2ef1128ba42c9f6e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.card3Title}
                    </div>
                    <div className="mt-1 text-xl font-display font-bold text-foreground" data-api-unique-id='hero-r603113f63ac0293f-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                      {t.card3Value}
                    </div>
                  </div>
                  <button type="button" onClick={() => setIsTravelModalOpen(true)} className="mt-2 inline-flex items-center text-xs font-semibold text-primary hover:underline gap-1 text-left" data-api-unique-id='hero-r6edb07848446deef-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                    {t.viewTravelBtn}
                    <ArrowRight className="w-3 h-3" data-api-unique-id='hero-r158ea2deffd3f75f-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Guarantee Micro-bar */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground" data-api-unique-id='hero-r63a65b8e56cbebe1-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              <div className="flex items-center gap-2" data-api-unique-id='hero-r87fd8bcd1c9e0bd1-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                <FileText className="w-4 h-4 text-accent shrink-0" data-api-unique-id='hero-rf8d3a57346082ba2-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
                <span data-api-unique-id='hero-r942b98995cdb0ea8-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>{t.wkoNotice}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Vienna Municipal Districts Flat Rates Modal */}
      <Dialog open={isTravelModalOpen} onOpenChange={setIsTravelModalOpen} data-api-unique-id='hero-r5a6f1c5416743123-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-3xl bg-card text-card-foreground" data-api-unique-id='hero-rd73f422de1ac8ee8-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
          <DialogHeader data-api-unique-id='hero-r02af7d4f1f902e0e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
            <DialogTitle className="text-xl font-display font-bold flex items-center gap-2" data-api-unique-id='hero-rc0b1cbf5edae9046-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              <MapPin className="w-5 h-5 text-primary" data-api-unique-id='hero-r51d34e405ac2d40e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
              {t.modalTitle}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground" data-api-unique-id='hero-r7586a26e0d5b618e-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              {t.modalDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4" data-api-unique-id='hero-r600ff4e48557634c-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
            {districts.length === 0 ? <div className="p-6 text-center text-sm text-muted-foreground bg-muted/30 rounded-md border border-border" data-api-unique-id='hero-ra174738b4b43667d-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                {t.emptyDistricts}
              </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[55vh] overflow-y-auto pr-1" data-api-unique-id='hero-r16c20defcac21f6c-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
                {districts.map((d, index) => <div key={d.id} className="p-3 rounded-md bg-background border border-border flex flex-col justify-between hover:border-primary/50 transition-colors" data-api-unique-id='hero-r4ac94215de343c63-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                    <div className="flex items-start justify-between gap-2" data-api-unique-id='hero-r2a2519e998dde8de-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                      <div data-api-unique-id='hero-r6e858a5bc9ef3f6b-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                        <div className="flex items-center gap-1.5" data-api-unique-id='hero-r9deb38183529293a-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                          <span className="text-xs font-mono font-bold text-primary" data-api-unique-id='hero-rca45a733c2fceacb-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtCode`} data-api-map-var-name='d'>
                            {d.districtCode}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium" data-api-unique-id='hero-ra535d36f74b81f7b-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtNumber`} data-api-map-var-name='d'>
                            #{d.districtNumber}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground mt-0.5" data-api-unique-id='hero-r7a55bcd225c401cd-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtName`} data-api-map-var-name='d'>
                          {d.districtName}
                        </h4>
                      </div>
                      <div className="text-right" data-api-unique-id='hero-ra1127926f53026f5-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                        <span className="text-base font-bold text-primary font-display" data-api-unique-id='hero-r581de65f3c543d06-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                          {currentLang === "en" ? `€${d.flatRateEur}` : `${d.flatRateEur} €`}
                        </span>
                        <div className="text-[10px] text-muted-foreground" data-api-unique-id='hero-r5b4598509b70f1c8-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>flat</div>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground" data-api-unique-id='hero-ra511fc82bc7bea84-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>
                      <span className="capitalize" data-api-unique-id='hero-rf3e27a90deb9b21d-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1'>{d.zone.toLowerCase().replace(/_/g, " ")}</span>
                      <span data-api-unique-id='hero-r925c07aaaea3ca96-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' data-api-in-loop='1' data-api-bind-info={`districts-${index}-leadTimeHours`} data-api-map-var-name='d'>{d.leadTimeHours}h {leadLabel}</span>
                    </div>
                  </div>)}
              </div>}

            <div className="rounded-md bg-muted text-muted-foreground p-3 text-xs leading-relaxed flex items-start gap-2" data-api-unique-id='hero-r68c8c19bf6ba310d-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" data-api-unique-id='hero-r8aa6294c2234ab98-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero' />
              <div data-api-unique-id='hero-re27e34e619f419a6-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>{t.lowerAustriaNote}</div>
            </div>
          </div>

          <DialogFooter data-api-unique-id='hero-rc21926f1ba7c9aa9-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
            <button type="button" onClick={() => setIsTravelModalOpen(false)} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted" data-api-unique-id='hero-rb632de733be02ee6-s2689796179' data-api-unique-page-name='src/frontend/components/PricingScope/Hero'>
              {t.closeBtn}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>;
}