"use client";

import React from "react";
import type { Language } from "@/frontend/types/HomeFrontend";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
interface LegalTradeScopeProps {
  lang: Language;
}
const legalCopy = {
  en: {
    title: "Legal Trade Scope & Austrian GewO Compliance",
    subtitle: "Strict distinction between permitted handyman tasks and specialized work requiring licensed Meister trades.",
    leftColTitle: "Permitted Handyman Tasks (Freies Handwerk)",
    leftColDesc: "Covered legally by standard Austrian trade registration without special concession restrictions.",
    rightColTitle: "Specialized Works Requiring Licensed Meister",
    rightColDesc: "Austrian law mandates licensed Elektrotechniker or Gas-/Wasser-Installateur trade cards. We can coordinate with certified partners.",
    permitted: ["Assembly of flat-pack furniture (IKEA, Mömax, XXXLutz) & kitchen units", "Floating floor installation (laminate, vinyl, click parquet) & baseboards", "Interior painting, ceiling coatings, minor drywall partition repairs", "Mounting curtain rods, mirrors, shelves, wall brackets, and fixtures", "Sanitary assistance: silicone renewal, shower curtain mounting, mixer tap replacement without pipe alterations", "Light non-structural demolition, tile stripping, and proper rubble removal"],
    restricted: ["Main fuse box wiring, new electrical circuit laying (Elektrotechniker duty)", "Gas connection alterations or gas boiler servicing (Installateur Meisterpflicht)", "Under-floor central plumbing restructuring or main water shut-off rebuilds", "Structural load-bearing wall removals or building envelope masonry", "Chimney or roof alterations requiring municipal building notices"],
    note: "All tasks performed adhere to the Austrian Gewerbeordnung (GewO 1994). If your project requires a licensed Meister, we provide verified Austrian partner coordination."
  },
  de: {
    title: "Rechtliche Gewerbegrenzen & GewO-Konformität",
    subtitle: "Eindeutige Abgrenzung zwischen freiem Handwerk und konzessionspflichtigen Meisterbetrieben in Österreich.",
    leftColTitle: "Zulässige Leistungen (Freies Handwerk)",
    leftColDesc: "Vollständig gedeckt durch den Gewerbeschein für freie Gewerbe nach österreichischer Gewerbeordnung.",
    rightColTitle: "Konzessionspflichtige Arbeiten (Meisterbetrieb)",
    rightColDesc: "Vorbehalten für behördlich konzessionierte Elektrotechniker & Gas-/Wasser-Installateure.",
    permitted: ["Aufbau von Fertigmöbeln (IKEA, XXXLutz etc.) und Hängeschränken", "Verlegung von Klick-Laminat, Vinylböden und Sockelleisten", "Malerarbeiten im Innenbereich, Ausspachteln von Bohrlöchern und Rissen", "Wandmontagen: Bilder, Spiegel, Gardinenleisten, TV-Halterungen", "Silikonfugen-Erneuerung, Duschabtrennungen, Armaturentausch ohne Leitungseingriff", "Leichte Abbrucharbeiten, Teppichentfernung & Abtransport zum Mistplatz (MA48)"],
    restricted: ["Elektroinstallationen am Hauptverteiler & Neuverlegung von Stromkreisen", "Eingriffe in Gasleitungen und Thermenwartung (strikte Meisterpflicht)", "Umbau der Hauptwasserleitungen vor dem Absperrventil", "Eingriffe in tragende Mauern oder statische Bauteile", "Dach- und Kaminarbeiten mit baubehördlicher Anzeigepflicht"],
    note: "Wir arbeiten streng nach der österreichischen Gewerbeordnung (GewO 1994). Für meisterpflichtige Teilbereiche vermitteln wir gerne geprüfte Wiener Partnerbetriebe."
  },
  ru: {
    title: "Правовые границы и австрийский регламент GewO",
    subtitle: "Чёткое разделение между разрешёнными работами мастера и лицензируемыми профессиями (Meisterbetrieb).",
    leftColTitle: "Разрешённые работы (Freies Handwerk)",
    leftColDesc: "Полностью покрываются стандартным австрийским патентом на ремонтные услуги без лицензии Meister.",
    rightColTitle: "Специализированные работы (Только Meister)",
    rightColDesc: "По австрийскому закону требуют лицензии электрика (Elektrotechniker) или сантехника (Installateur).",
    permitted: ["Сборка корпусной мебели (IKEA, Lutz), кухонных шкафов и полок", "Укладка замкового ламината, винила и плинтусов", "Покраска стен и потолков, шпаклевка отверстий и трещин", "Монтаж карнизов, зеркал, полок и настенных ТВ-кронштейнов", "Замена силикона в ванной, монтаж шторок, замена смесителей без врезки в трубы", "Демонтаж плитки, старых покрытий и вывоз мусора в пункты MA48"],
    restricted: ["Работы в электрощите и прокладка новых силовых линий", "Любые работы с газовыми трубами и котлами (строгий Meister)", "Перенос центральных стояков водоснабжения", "Снос несущих стен и изменения в несущих конструкциях", "Кровельные и фасадные работы, требующие разрешения магистрата"],
    note: "Мы строго соблюдаем законодательство Австрии (GewO 1994). При необходимости мы координируем работы с сертифицированными мастерами Вены."
  }
};
export default function LegalTradeScope({
  lang
}: LegalTradeScopeProps) {
  const t = legalCopy[lang];
  return <section data-controller-name="Legal Trade Scope Notice" className="w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16" data-api-unique-id='legaltradescope-rdad0a6f00fe59c82-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='legaltradescope-r6550e0f038af48ef-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
        <div className="max-w-3xl mb-8" data-api-unique-id='legaltradescope-rbf7378d4d9a01bbf-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
          {/* Temporarily hidden: WKO & GewO badge */}
          {/*           <div className="inline-flex items-center gap-1.5 rounded-sm bg-muted text-muted-foreground px-2.5 py-1 text-xs font-semibold border border-border mb-2" data-api-unique-id='legaltradescope-r25d0617d4b063565-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
            <ShieldCheck className="h-4 w-4 text-primary" data-api-unique-id='legaltradescope-r791a49d45c6ad628-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' />
            <span data-api-unique-id='legaltradescope-r2f076be1a2db02ba-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>WKO &amp; GewO 1994 Compliance</span>
          </div>
*/}
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground" data-api-unique-id='legaltradescope-r1929e1815f273355-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
            {t.title}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='legaltradescope-r197b21c153dcc514-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
            {t.subtitle}
          </p>
        </div>

        {/* Dual Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-api-unique-id='legaltradescope-r9b5c4be76216cd34-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
          {/* Left Column: Allowed */}
          <div className="rounded-xl border border-border bg-background text-foreground p-6 flex flex-col justify-between" data-api-unique-id='legaltradescope-rf486cb897fc831bc-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
            <div data-api-unique-id='legaltradescope-r489f5edd1fc969d4-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
              <div className="flex items-center gap-2 mb-2" data-api-unique-id='legaltradescope-ra093568a7e36daf2-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-success text-success-foreground" data-api-unique-id='legaltradescope-rada0e89d0ab1c8a5-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                  <CheckCircle2 className="h-4 w-4" data-api-unique-id='legaltradescope-r28057b8ff9b7423f-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' />
                </span>
                <h3 className="font-display text-lg font-bold text-foreground" data-api-unique-id='legaltradescope-rc111a3eecdaf7e9e-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                  {t.leftColTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4" data-api-unique-id='legaltradescope-rf7466b3ff07c97b2-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                {t.leftColDesc}
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-foreground" data-api-unique-id='legaltradescope-rc8815609541e6399-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                {t.permitted.map((item, index) => <li key={index} className="flex items-start gap-2.5" data-api-unique-id='legaltradescope-ref5e6d3364ce1414-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' data-api-in-loop='1'>
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-success shrink-0" data-api-unique-id='legaltradescope-r284b0dead9065689-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' data-api-in-loop='1' />
                    <span data-api-unique-id='legaltradescope-r3263d53cbae0c51e-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' data-api-in-loop='1' data-api-bind-info={`t.permitted-${index}-$item`} data-api-map-var-name='item'>{item}</span>
                  </li>)}
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='legaltradescope-r11630d5855ef7ab1-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
              <span data-api-unique-id='legaltradescope-rc718c6d2e64d2929-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>Status: Freies Gewerbe</span>
              <span className="text-success font-medium" data-api-unique-id='legaltradescope-re72c33cc7385d1a6-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>100% In-House Direct</span>
            </div>
          </div>

          {/* Right Column: Regulated */}
          <div className="rounded-xl border border-border bg-background text-foreground p-6 flex flex-col justify-between" data-api-unique-id='legaltradescope-rda22514224f00158-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
            <div data-api-unique-id='legaltradescope-rd932a46cfb85d390-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
              <div className="flex items-center gap-2 mb-2" data-api-unique-id='legaltradescope-r672daef2ead336d2-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-warning text-warning-foreground" data-api-unique-id='legaltradescope-rd4d095b4d09a0393-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                  <AlertTriangle className="h-4 w-4" data-api-unique-id='legaltradescope-rb10b07b809bd6c87-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' />
                </span>
                <h3 className="font-display text-lg font-bold text-foreground" data-api-unique-id='legaltradescope-rcdf965fd05d3466f-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                  {t.rightColTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4" data-api-unique-id='legaltradescope-r8cf9d86be457108a-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                {t.rightColDesc}
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground" data-api-unique-id='legaltradescope-re52044a43a2f1bec-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
                {t.restricted.map((item, index) => <li key={index} className="flex items-start gap-2.5" data-api-unique-id='legaltradescope-r35bdfde17d524015-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' data-api-in-loop='1'>
                    <XCircle className="mt-0.5 h-3.5 w-3.5 text-destructive shrink-0" data-api-unique-id='legaltradescope-r5976f7a2600535ff-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' data-api-in-loop='1' />
                    <span data-api-unique-id='legaltradescope-re30936184f1c8a79-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope' data-api-in-loop='1' data-api-bind-info={`t.restricted-${index}-$item`} data-api-map-var-name='item'>{item}</span>
                  </li>)}
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='legaltradescope-r127b113b91a9aaba-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
              <span data-api-unique-id='legaltradescope-ra9d49b36c879eeaf-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>Status: Reglementiertes Gewerbe</span>
              <span className="text-warning font-medium" data-api-unique-id='legaltradescope-r1b2216224e4653c3-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>Partner Coordination</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-6 rounded-lg bg-muted text-muted-foreground p-4 text-xs border border-border" data-api-unique-id='legaltradescope-r071def7cc2f438b2-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>
          <p className="leading-relaxed" data-api-unique-id='legaltradescope-r872cbba306b5ce36-s2900554314' data-api-unique-page-name='src/frontend/components/HomeFrontend/LegalTradeScope'>{t.note}</p>
        </div>
      </div>
    </section>;
}