"use client";

import React, { useState } from "react";
import { ViennaDistrictCoverage, LogisticsZone } from "@/frontend/types/ServicesCatalog";
import { ShieldCheck, CheckCircle2, AlertTriangle, MapPin, Scale, HelpCircle } from "lucide-react";
interface GewoLegalDistrictsSectionProps {
  districts?: ViennaDistrictCoverage[];
}
export default function GewoLegalDistrictsSection({
  districts = []
}: GewoLegalDistrictsSectionProps) {
  const [selectedZone, setSelectedZone] = useState<LogisticsZone | "ALL">("ALL");
  const filteredDistricts = selectedZone === "ALL" ? districts : districts.filter(d => d.zone === selectedZone);
  return <section data-controller-name="Gewo Legal and Districts Section" className="w-full bg-[#1c3545] text-white py-14 sm:py-16 border-b border-border" data-api-unique-id='gewolegaldistrictssection-ree5e21a46440422a-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12" data-api-unique-id='gewolegaldistrictssection-r8bf5bf7d498c81ff-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/20 pb-4" data-api-unique-id='gewolegaldistrictssection-r4386065e77f049c2-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
          <div className="space-y-2 max-w-2xl" data-api-unique-id='gewolegaldistrictssection-rb82d008efb90036e-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white/10 text-white text-xs font-mono font-semibold uppercase tracking-wider" data-api-unique-id='gewolegaldistrictssection-r0cccd5ad5faa20cf-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              <Scale className="h-3.5 w-3.5 text-primary" data-api-unique-id='gewolegaldistrictssection-r9d56237cbb0ac249-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
              <span data-api-unique-id='gewolegaldistrictssection-r146dbf3e75d3d59d-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>Austrian Gewerbeordnung (GewO 1994) & Logistik</span>
            </div>
            <h2 className="font-header text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white" data-api-unique-id='gewolegaldistrictssection-r283402b10bd9a6c7-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              Rechtliche Transparenz & 23 Wiener Bezirke
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-body" data-api-unique-id='gewolegaldistrictssection-r3a6605d6f6b8faa9-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              Präzise Trennung zwischen reglementierungsfreiem Handwerk und konzessioniertem Meisterverbund. Vollständige Einsatzbereitschaft von 1010 Innere Stadt bis 1230 Liesing.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3" data-api-unique-id='gewolegaldistrictssection-r59268a1634be4db5-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
            <span className="text-xs text-white/70 font-mono" data-api-unique-id='gewolegaldistrictssection-r6ad2aa3f6fdc340e-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>STANDORT WIEN</span>
            <span className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold uppercase" data-api-unique-id='gewolegaldistrictssection-r0469d3ac4b2eda62-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              100% WKO Konform
            </span>
          </div>
        </div>

        {/* Two-Column Layout: Left = GewO 1994 Legal Boundaries, Right = Vienna 23 Districts Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-api-unique-id='gewolegaldistrictssection-r73b06b97d8166450-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
          {/* Left Column (lg:col-span-6): GewO 1994 Task Boundary Matrix */}
          <div className="lg:col-span-6 space-y-6 bg-white/5 border border-white/15 rounded-lg p-6 sm:p-8" data-api-unique-id='gewolegaldistrictssection-r5d431e5959bfb12b-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
            <div className="flex items-center gap-2 border-b border-white/15 pb-4" data-api-unique-id='gewolegaldistrictssection-ra80078e8d0a4f05d-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              <ShieldCheck className="h-5 w-5 text-success" data-api-unique-id='gewolegaldistrictssection-r2fbf914e0eb79f0f-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
              <h3 className="font-header text-lg sm:text-xl font-bold text-white" data-api-unique-id='gewolegaldistrictssection-r02beb7088a97d34a-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Gewerberechtliche Aufteilung (GewO 1994)
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body" data-api-unique-id='gewolegaldistrictssection-r3930ae4ad6c026fe-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              In Österreich unterliegen handwerkliche Tätigkeiten dem Gewerberecht. Wir schützen Sie vor rechtlichen und versicherungstechnischen Risiken durch klare Schnittstellentrennung:
            </p>

            <div className="space-y-4" data-api-unique-id='gewolegaldistrictssection-r7b78d4673d12d136-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              {/* Category A: Freies Handwerk */}
              <div className="bg-white/10 border border-white/20 rounded-md p-4 space-y-2" data-api-unique-id='gewolegaldistrictssection-r8de403a7e8f267e0-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                <div className="flex items-center justify-between" data-api-unique-id='gewolegaldistrictssection-rd46f2cf62087886a-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white" data-api-unique-id='gewolegaldistrictssection-raa5d7c17e3ce8750-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                    <CheckCircle2 className="h-4 w-4 text-success" data-api-unique-id='gewolegaldistrictssection-rcbf16b591cae6cbb-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
                    Freies Handwerk (Direktverrechnung)
                  </span>
                  <span className="text-xs font-mono text-white/70" data-api-unique-id='gewolegaldistrictssection-r32396080263d4bbc-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>Ab 15 €/h</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed" data-api-unique-id='gewolegaldistrictssection-rd4693538d51a2e60-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                  Umfasst Möbelmontagen aller Art, Vorhangschienen, Ausbesserung von Spachtelstellen, Verlegung von Klick-Laminat/Parkett, Silikon-Verfugungen und Tragehilfen. Keine Meisterprüfung gesetzlich vorgeschrieben.
                </p>
              </div>

              {/* Category B: Meister-Kooperation */}
              <div className="bg-white/10 border border-white/20 rounded-md p-4 space-y-2" data-api-unique-id='gewolegaldistrictssection-ra8136fee8cfee429-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                <div className="flex items-center justify-between" data-api-unique-id='gewolegaldistrictssection-r436aa7b9156e8d10-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white" data-api-unique-id='gewolegaldistrictssection-rcb31e504bd404510-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                    <ShieldCheck className="h-4 w-4 text-warning" data-api-unique-id='gewolegaldistrictssection-rff32deafa25d61a9-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
                    Konzessionierter Meister-Verbund
                  </span>
                  <span className="text-xs font-mono text-white/70" data-api-unique-id='gewolegaldistrictssection-rb6d89afa18551ce9-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>Ab 35 €/h</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed" data-api-unique-id='gewolegaldistrictssection-radf9bad46e1a6a5b-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                  Tragende Mauerwerksdurchbrüche, Starkstromanschlüsse ab Zählerkasten, Gasthermen-Wartung und Steigleitungsverlegung erfolgen ausnahmslos durch unsere akkreditierten Wiener Meisterpartnerbetriebe mit Haftungsnachweis.
                </p>
              </div>
            </div>

            <div className="p-3 rounded bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-white/75" data-api-unique-id='gewolegaldistrictssection-rc027ac59a10fec97-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" data-api-unique-id='gewolegaldistrictssection-rb968e6b510f393c6-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
              <span data-api-unique-id='gewolegaldistrictssection-rc8d304bd849b8be8-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                <strong data-api-unique-id='gewolegaldistrictssection-r2087c74646fb4655-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>Versicherungsschutz:</strong> Alle Arbeiten sind über unsere Betriebshaftpflichtversicherung bis 3.000.000 € Sachschadenssumme in Österreich voll gedeckt.
              </span>
            </div>
          </div>

          {/* Right Column (lg:col-span-6): Vienna 23 Districts Matrix */}
          <div className="lg:col-span-6 space-y-6 bg-white/5 border border-white/15 rounded-lg p-6 sm:p-8" data-api-unique-id='gewolegaldistrictssection-rabc992819b146228-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4" data-api-unique-id='gewolegaldistrictssection-rf188086b1dd40c62-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              <div className="flex items-center gap-2" data-api-unique-id='gewolegaldistrictssection-r76caf4f0d3db124a-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                <MapPin className="h-5 w-5 text-primary" data-api-unique-id='gewolegaldistrictssection-r302309fda8855d97-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
                <h3 className="font-header text-lg sm:text-xl font-bold text-white" data-api-unique-id='gewolegaldistrictssection-r012e2fc38fa787bd-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                  23 Wiener Bezirke Dispositions-Netz
                </h3>
              </div>
              <span className="text-xs font-mono text-white/70" data-api-unique-id='gewolegaldistrictssection-r502fa54756ee5a3e-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Wien 1010 – 1230 & Umland
              </span>
            </div>

            {/* Zone Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 text-xs" data-api-unique-id='gewolegaldistrictssection-rb8a568416f64ecd2-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              <button type="button" onClick={() => setSelectedZone("ALL")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${selectedZone === "ALL" ? "bg-primary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-api-unique-id='gewolegaldistrictssection-r7b3f0e08094375f2-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Alle Bezirke ({districts.length > 0 ? districts.length : 23})
              </button>
              <button type="button" onClick={() => setSelectedZone("INNER_CITY")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${selectedZone === "INNER_CITY" ? "bg-primary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-api-unique-id='gewolegaldistrictssection-r6e348738f8c3a5e5-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Innere Bezirke (1–9)
              </button>
              <button type="button" onClick={() => setSelectedZone("CENTRAL")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${selectedZone === "CENTRAL" ? "bg-primary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-api-unique-id='gewolegaldistrictssection-r1617a5cd949f6c59-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Gürtel & Zentral
              </button>
              <button type="button" onClick={() => setSelectedZone("OUTER_RING")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${selectedZone === "OUTER_RING" ? "bg-primary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-api-unique-id='gewolegaldistrictssection-r287bab7e44242f63-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Außenbezirke
              </button>
              <button type="button" onClick={() => setSelectedZone("GREATER_SUBURB")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${selectedZone === "GREATER_SUBURB" ? "bg-primary text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-api-unique-id='gewolegaldistrictssection-r5dbddace8a64778e-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                Transdanubien & Liesing
              </button>
            </div>

            {/* Districts Grid (Compact Badges) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1" data-api-unique-id='gewolegaldistrictssection-r53a53a99201471cf-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              {filteredDistricts.length === 0 ? <div className="col-span-full py-8 text-center text-xs text-white/50" data-api-unique-id='gewolegaldistrictssection-rd823bd52d10d36cc-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                  Keine Bezirke für diese Auswahl verfügbar.
                </div> : filteredDistricts.map((d, index) => <div key={d.districtCode || d.id} className="bg-white/10 hover:bg-white/15 border border-white/10 rounded p-2 flex flex-col justify-between transition-colors" data-api-unique-id='gewolegaldistrictssection-r28bb2f5a8ba1caf4-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' data-api-in-loop='1'>
                    <div className="flex items-center justify-between" data-api-unique-id='gewolegaldistrictssection-rfe4908f1aad904e9-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' data-api-in-loop='1'>
                      <span className="font-mono text-xs font-bold text-primary" data-api-unique-id='gewolegaldistrictssection-r3625e66bec046305-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' data-api-in-loop='1' data-api-bind-info={`filteredDistricts-${index}-districtCode`} data-api-map-var-name='d'>
                        {d.districtCode}
                      </span>
                      <span className="text-[10px] text-white/60" data-api-unique-id='gewolegaldistrictssection-rd504866fb1a96825-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' data-api-in-loop='1' data-api-bind-info={`filteredDistricts-${index}-leadTimeHours`} data-api-map-var-name='d'>
                        ~{d.leadTimeHours}h Vorlauf
                      </span>
                    </div>
                    <span className="text-xs font-medium text-white truncate mt-1" data-api-unique-id='gewolegaldistrictssection-rf4d9f57618658e5a-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' data-api-in-loop='1' data-api-bind-info={`filteredDistricts-${index}-districtNumber`} data-api-map-var-name='d'>
                      {d.districtNumber}. {d.districtName}
                    </span>
                  </div>)}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/15 text-xs text-white/80" data-api-unique-id='gewolegaldistrictssection-rce479802e0776852-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
              <span className="inline-flex items-center gap-1.5" data-api-unique-id='gewolegaldistrictssection-ra1184e6e0b1eac6f-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>
                <HelpCircle className="h-4 w-4 text-white/60" data-api-unique-id='gewolegaldistrictssection-rf9215bfa94820a90-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection' />
                Keine Anfahrtszuschläge innerhalb der 23 Bezirke
              </span>
              <span className="font-mono text-white/70" data-api-unique-id='gewolegaldistrictssection-rc8b24465d16a6019-s3595217900' data-api-unique-page-name='src/frontend/components/ServicesCatalog/GewoLegalDistrictsSection'>Wien-Pauschale: Inbegriffen</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}