"use client";

import React from "react";
import { LanguageCode } from "@/frontend/types/PricingScope";
import { Scale, ShieldCheck, AlertTriangle, CheckCircle2, ExternalLink, Check, Building, Hammer } from "lucide-react";
interface GewoComplianceScopeProps {
  currentLang: LanguageCode;
}
export default function GewoComplianceScope({
  currentLang
}: GewoComplianceScopeProps) {
  const t = {
    en: {
      sectionBadge: "Statutory Austrian Trade Licensing Act",
      sectionTitle: "Gewerbeordnung 1994 (GewO) Legal Scope Demarcation",
      sectionSubtitle: "Austrian trade law strictly regulates domestic craftsmanship. To ensure full legal safety and insurance validity for our clients, Vienna Handwerk strictly bifurcates tasks performed directly by in-house craftsmen versus licensed partner Meisterbetrieb firms.",
      col1Title: "Freies Gewerbe (Unrestricted Trades)",
      col1Badge: "Executed Direct by In-House Team",
      col1Desc: "Permitted under Austrian GewO without mandatory Meisterprüfung examination. Full liability coverage under Vienna Handwerk's commercial artisan policy.",
      col1Items: [{
        title: "Assembly & Fitting",
        detail: "IKEA & custom furniture assembly, kitchen cabinet hanging, curtain rods, shelving & artwork mounting."
      }, {
        title: "Surface Stripping & Demolition",
        detail: "Non-structural plaster removal, wallpaper stripping, laminate & vinyl floor removal, tile debonding."
      }, {
        title: "Interior Painting & Coating",
        detail: "Wall & ceiling emulsion priming, dispersion coatings, minor putty repair, window frame refreshing."
      }, {
        title: "Minor Sanitary Maintenance",
        detail: "Cold & hot fixture faucet replacement, silicone sealant renewal, unpressurized siphon cleaning."
      }],
      col2Title: "Reglementiertes Gewerbe (Regulated Trades)",
      col2Badge: "Executed via Meisterbetrieb Partner",
      col2Desc: "Strict statutory requirement under GewO § 94. Executed exclusively by verified Austrian master concessionaires with mandatory certification filing.",
      col2Items: [{
        title: "Electrical High-Voltage Mains",
        detail: "Distribution board modifications, fuse box upgrades, structural cable runs, mandatory ÖVE testing protocols."
      }, {
        title: "Gas & Heating Grid Connections",
        detail: "Gas boiler servicing, pressurized gas piping modifications, heating circuit radiator balancing."
      }, {
        title: "Structural Masonry & Wall Breaches",
        detail: "Load-bearing lintel insertions, structural static calculations, core drilling >120mm in Altbau masonry."
      }, {
        title: "Pressurized Plumbing Mains",
        detail: "Main supply riser replacements, backflow preventer installations, municipal meter connections."
      }],
      disclaimerTitle: "Client Legal Protection Guarantee",
      disclaimerText: "Every invoice itemizes the executing craft status and tax registration number. Homeowners in Vienna (Wien) Altbau and Neubau apartments retain full insurance compliance without risk of municipal building authority fines.",
      wkoRefLink: "Official WKO Trade Act Directory (Gewerbeinformationssystem Austria)"
    },
    de: {
      sectionBadge: "Gesetzliche Gewerbeordnung Österreich",
      sectionTitle: "GewO 1994 Gesetzliche Zuständigkeitsabgrenzung",
      sectionSubtitle: "Das österreichische Gewerberecht regelt handwerkliche Tätigkeiten präzise. Zur vollen Rechtssicherheit und Versicherungsdeckung trennt Vienna Handwerk strikt zwischen Tätigkeiten des freien Gewerbes und konzessionierten Meisterbetrieben.",
      col1Title: "Freies Gewerbe (Unbeschränkter Umfang)",
      col1Badge: "Direkt durch Vienna Handwerk Team",
      col1Desc: "Zulässig nach GewO ohne Befähigungsnachweis (Meisterprüfung). Volle Betriebshaftpflichtversicherung über die Handwerkerpolice von Vienna Handwerk.",
      col1Items: [{
        title: "Montage & Zusammenbau",
        detail: "Möbelaufbau (IKEA & Maßmöbel), Küchenschrank-Montage, Vorhangschienen, Regalsysteme & Bilderaufhängung."
      }, {
        title: "Abbrucharbeiten & Entkernung",
        detail: "Nicht-tragende Wandbeläge entfernen, Tapeten ablösen, Laminat- und Teppichausbau, Fliesenabschlagen."
      }, {
        title: "Maler- & Anstricharbeiten",
        detail: "Innenwand- und Deckenanstriche, Dispersionsfarben, Ausbesserungsspachtelung, Holzfenster-Nachstreichen."
      }, {
        title: "Einfache Sanitärinstandhaltung",
        detail: "Austausch von Aufputz-Armaturen, Erneuerung von Silikonfugen, Reinigung und Tausch druckloser Siphons."
      }],
      col2Title: "Reglementiertes Gewerbe (Meisterpflicht)",
      col2Badge: "Ausschließlich via Meisterbetrieb-Partner",
      col2Desc: "Zwingende gesetzliche Vorgabe nach GewO § 94. Durchführung ausschließlich durch konzessionierte österreichische Meisterbetriebe mit Prüfprotokoll.",
      col2Items: [{
        title: "Starkstrom- & Elektroinstallation",
        detail: "Sicherungskasten-Umbau, Hauptleitungsverlegung, E-Befund nach ÖVE/ÖNORM, Herdanschluss am Zähler."
      }, {
        title: "Gas- & Heizungsleitungen",
        detail: "Thermenwartung, Gasleitungsanpassungen, Heizkörper-Neuanbindung und hydraulischer Abgleich."
      }, {
        title: "Tragende Bauteile & Mauerdurchbrüche",
        detail: "Sturz-Einbau in tragenden Altbauwänden, statische Berechnungen, Kernbohrungen über 120 mm."
      }, {
        title: "Druckwasser-Steigleitungen",
        detail: "Hauptstrang-Sanierung, Einbau von Rückstauklappen, Neuverrohrung vor dem Hauptwasserzähler."
      }],
      disclaimerTitle: "Rechtssicherheit & Versicherungsschutz",
      disclaimerText: "Jede Rechnung weist den ausführenden Gewerbestatus und die UID-Nummer transparent aus. Eigentümer und Mieter von Wiener Altbau- und Neubauwohnungen bleiben gegenüber Hausverwaltung und Gebäudeversicherung voll abgesichert.",
      wkoRefLink: "Offizielles WKO Gewerbeinformationssystem (GISA)"
    },
    ru: {
      sectionBadge: "Закон о ремесленной деятельности Австрии",
      sectionTitle: "Разграничение правовых полномочий по GewO 1994",
      sectionSubtitle: "Австрийское законодательство строго регулирует строительные и ремесленные работы. Для обеспечения полной юридической чистоты и страховой защиты мы четко разделяем прямые свободные работы и сертифицированные услуги мастеров Meisterbetrieb.",
      col1Title: "Свободное ремесло (Freies Gewerbe)",
      col1Badge: "Выполняется штатными мастерами",
      col1Desc: "Разрешено законом GewO без обязательного экзамена мастера. Полное страхование коммерческой ответственности компании Vienna Handwerk.",
      col1Items: [{
        title: "Сборка мебели и фурнитуры",
        detail: "Сборка корпусной мебели (IKEA и др.), навешивание кухонных шкафов, карнизов, полок и зеркал."
      }, {
        title: "Демонтажные работы поверхностей",
        detail: "Снятие обоев, демонтаж ненесущих обшивок, снятие старого ламината, плитки и ковролина."
      }, {
        title: "Малярные и шпаклевочные работы",
        detail: "Покраска стен и потолков водоэмульсионными составами, мелкая шпаклевка трещин, освежение рам."
      }, {
        title: "Базовая сантехника",
        detail: "Замена смесителей на готовых выводах, обновление силиконовых швов, чистка сифонов без давления."
      }],
      col2Title: "Регулируемое ремесло (Reglementiert)",
      col2Badge: "Только сертифицированные Meisterbetrieb",
      col2Desc: "Строгие требования статьи GewO § 94. Выполняется исключительно лицензированными австрийскими фирмами с выдачей протоколов.",
      col2Items: [{
        title: "Электромонтаж высокого напряжения",
        detail: "Модификация электрощитов, замена автоматов, прокладка силовых кабелей, протоколы ÖVE."
      }, {
        title: "Газовые и отопительные магистрали",
        detail: "Обслуживание газовых колонок, перенос газовых труб, балансировка контуров отопления."
      }, {
        title: "Несущие стены и проемы",
        detail: "Установка перемычек в несущих стенах венских домов Altbau, статические расчеты, алмазное бурение."
      }, {
        title: "Магистральное водоснабжение под давлением",
        detail: "Замена стояков водопровода, установка клапанов обратного подпора, вводные счетчики."
      }],
      disclaimerTitle: "Гарантия правовой защиты заказчика",
      disclaimerText: "В каждом счете-фактуре указываются статус квалификации и номер UID исполнителя. Владельцы жилья в Вене защищены от штрафов строительного надзора и претензий страховых компаний.",
      wkoRefLink: "Официальный реестр GISA палаты экономики Австрии (WKO)"
    }
  }[currentLang];
  return <section data-controller-name="Austrian GewO Statutory Scope" className="w-full bg-background border-b border-border py-16" data-api-unique-id='gewocompliancescope-ree51226b26bc4386-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='gewocompliancescope-r19572325bc9c4948-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12" data-api-unique-id='gewocompliancescope-r9de55545ddabf7ad-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-3" data-api-unique-id='gewocompliancescope-r2eb3a065e04808c4-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            <Scale className="w-3.5 h-3.5" data-api-unique-id='gewocompliancescope-rdcbb3b5cf19dd7ab-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' />
            {t.sectionBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight" data-api-unique-id='gewocompliancescope-r5655308a8a1979a3-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground font-body leading-relaxed" data-api-unique-id='gewocompliancescope-r14b9ab986350acfd-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            {t.sectionSubtitle}
          </p>
        </div>

        {/* High-Contrast Double Track Bifurcation Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch" data-api-unique-id='gewocompliancescope-r7238c2a3e4ee4062-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
          
          {/* Left Column: Freies Gewerbe (Danube Deep Slate styling) */}
          <div className="bg-card text-card-foreground border-2 border-accent rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-soft" data-api-unique-id='gewocompliancescope-rf5a94a235c2e77d5-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            <div data-api-unique-id='gewocompliancescope-r2d3dac066c8892e2-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border" data-api-unique-id='gewocompliancescope-r8f775cc43271084b-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                <div className="flex items-center gap-2" data-api-unique-id='gewocompliancescope-rafb3181569aa70b2-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                  <Hammer className="w-5 h-5 text-accent" data-api-unique-id='gewocompliancescope-rd0e6555ade1ab874-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' />
                  <h3 className="text-xl font-display font-bold text-card-foreground" data-api-unique-id='gewocompliancescope-r3f3d38fb4a9191ca-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                    {t.col1Title}
                  </h3>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded-sm bg-accent text-accent-foreground text-xs font-semibold" data-api-unique-id='gewocompliancescope-r8b0df42484f22274-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                  {t.col1Badge}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='gewocompliancescope-r36c6732c08e1d757-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                {t.col1Desc}
              </p>

              <div className="mt-6 space-y-4" data-api-unique-id='gewocompliancescope-ra871b64ba9dadf5e-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                {t.col1Items.map((item, index) => <div key={index} className="p-3.5 rounded-md bg-background border border-border" data-api-unique-id='gewocompliancescope-re349df65505e91c1-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1'>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground" data-api-unique-id='gewocompliancescope-r6ff2a5e4fa72e46b-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1'>
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" data-api-unique-id='gewocompliancescope-r456e557c86347ce2-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1' />
                      <span data-api-unique-id='gewocompliancescope-r5c2705991aca4be8-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1' data-api-bind-info={`t.col1Items-${index}-title`} data-api-map-var-name='item'>{item.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground pl-6 leading-relaxed" data-api-unique-id='gewocompliancescope-r9af248219918bdc8-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1' data-api-bind-info={`t.col1Items-${index}-detail`} data-api-map-var-name='item'>
                      {item.detail}
                    </p>
                  </div>)}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='gewocompliancescope-r2aed1e8d009bb69d-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
              <span data-api-unique-id='gewocompliancescope-r68413c646a3bd4f9-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>Haftpflicht: €2.000.000 Deckung</span>
              <span className="font-semibold text-accent flex items-center gap-1" data-api-unique-id='gewocompliancescope-ra943d291f8a6497f-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                <Check className="w-3.5 h-3.5 text-success" data-api-unique-id='gewocompliancescope-rb6c82fe9441af3ae-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' /> GewO § 5 Konform
              </span>
            </div>
          </div>

          {/* Right Column: Reglementiertes Gewerbe (Terracotta Outline styling) */}
          <div className="bg-card text-card-foreground border-2 border-primary rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-soft" data-api-unique-id='gewocompliancescope-rd65c2e426b710319-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            <div data-api-unique-id='gewocompliancescope-ra8217a1fde9c3a60-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border" data-api-unique-id='gewocompliancescope-r4ff00a5815a95dd8-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                <div className="flex items-center gap-2" data-api-unique-id='gewocompliancescope-r8f0b01314fd17321-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                  <Building className="w-5 h-5 text-primary" data-api-unique-id='gewocompliancescope-r03aa30db5cd4403c-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' />
                  <h3 className="text-xl font-display font-bold text-card-foreground" data-api-unique-id='gewocompliancescope-r6081afb2a4bde514-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                    {t.col2Title}
                  </h3>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-semibold" data-api-unique-id='gewocompliancescope-rc85dd28f93efcc4f-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                  {t.col2Badge}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='gewocompliancescope-re83164ec4efb82a4-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                {t.col2Desc}
              </p>

              <div className="mt-6 space-y-4" data-api-unique-id='gewocompliancescope-r5fb42c2d88f57659-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                {t.col2Items.map((item, index) => <div key={index} className="p-3.5 rounded-md bg-background border border-border" data-api-unique-id='gewocompliancescope-r44cb9030fa0c2801-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1'>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground" data-api-unique-id='gewocompliancescope-r64c36b8f9aa2c2e1-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1'>
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='gewocompliancescope-ra324c5985553fbc4-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1' />
                      <span data-api-unique-id='gewocompliancescope-r28b499f3327e49e1-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1' data-api-bind-info={`t.col2Items-${index}-title`} data-api-map-var-name='item'>{item.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground pl-6 leading-relaxed" data-api-unique-id='gewocompliancescope-r2146b014eb42d73c-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' data-api-in-loop='1' data-api-bind-info={`t.col2Items-${index}-detail`} data-api-map-var-name='item'>
                      {item.detail}
                    </p>
                  </div>)}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='gewocompliancescope-r600c7e7fcfb4755f-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
              <span data-api-unique-id='gewocompliancescope-r19691285dd68ea85-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>Prüfprotokoll & ÖVE-Befund</span>
              <span className="font-semibold text-primary flex items-center gap-1" data-api-unique-id='gewocompliancescope-rada149c2c82c3b1e-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                <ShieldCheck className="w-3.5 h-3.5 text-primary" data-api-unique-id='gewocompliancescope-r4541f63878f208b6-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' /> GewO § 94 Meisterpflicht
              </span>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 rounded-lg bg-muted text-muted-foreground p-5 border-l-4 border-l-warning flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-api-unique-id='gewocompliancescope-rcbabec2814362340-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
          <div className="flex items-start gap-3" data-api-unique-id='gewocompliancescope-rdf31245288f1a392-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" data-api-unique-id='gewocompliancescope-r0c6e09b970255d09-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' />
            <div data-api-unique-id='gewocompliancescope-r2fcfdecfc616367a-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
              <div className="text-sm font-semibold text-foreground" data-api-unique-id='gewocompliancescope-rf62e2b4f6536300e-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>{t.disclaimerTitle}</div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed" data-api-unique-id='gewocompliancescope-rd1cc166e773e8ff0-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
                {t.disclaimerText}
              </p>
            </div>
          </div>

          <a href="https://www.gisa.gv.at" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary hover:underline" data-api-unique-id='gewocompliancescope-rce8d54d5ad1e3a5b-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope'>
            {t.wkoRefLink}
            <ExternalLink className="w-3.5 h-3.5" data-api-unique-id='gewocompliancescope-r4a3601984c9bda52-s914955548' data-api-unique-page-name='src/frontend/components/PricingScope/GewoComplianceScope' />
          </a>
        </div>

      </div>
    </section>;
}