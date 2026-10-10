"use client";

import React from "react";
import { LanguageCode } from "@/frontend/types/PricingScope";
import { Building2, PhoneCall, ShieldCheck, Clock, Sparkles } from "lucide-react";
interface TrustConversionBandProps {
  currentLang: LanguageCode;
}
export default function TrustConversionBand({
  currentLang
}: TrustConversionBandProps) {
  const t = {
    en: {
      wkoTitle: "WKO Registered Artisan Self-Regulation",
      wkoRegisterNumber: "GISA Registration: 34910284 / UID: ATU79482103",
      wkoText: "Full compliance with the Vienna Chamber of Commerce (Wirtschaftskammer Wien - Fachgruppe Gewerbe und Handwerk). General liability coverage up to €2,000,000 via Wiener Städtische Versicherung.",
      ctaHeadline: "Get a Fixed Cost Estimate in 2 Minutes",
      ctaSubline: "No credit card required. Upload your task photos, choose your Vienna district, and receive a pro-forma transparent quote calculation.",
      callUs: "Direct Dispatch Line:",
      callNumber: "+43 1 928 44 11",
      emergencyBadge: "Vienna Emergency Handwerk Desk (Mon–Sat 07:00–20:00)"
    },
    de: {
      wkoTitle: "WKO Gewerberegister & Selbstverpflichtung",
      wkoRegisterNumber: "GISA-Zahl: 34910284 / UID: ATU79482103",
      wkoText: "Vollständige Einhaltung aller Standesregeln der Wirtschaftskammer Wien (Fachgruppe Gewerbe und Handwerk). Betriebshaftpflichtversicherung bis 2.000.000 € über die Wiener Städtische Versicherung.",
      ctaHeadline: "Verbindlichen Kostenvoranschlag in 2 Minuten anfordern",
      ctaSubline: "Keine Kreditkarte erforderlich. Fotos hochladen, Wiener Bezirk wählen und transparente Vorab-Kalkulation erhalten.",
      callUs: "Direkte Meister-Hotline:",
      callNumber: "+43 1 928 44 11",
      emergencyBadge: "Wiener Handwerker-Leitstelle (Mo–Sa 07:00–20:00)"
    },
    ru: {
      wkoTitle: "Реестр Палаты экономики Вены (WKO)",
      wkoRegisterNumber: "Регистрация GISA: 34910284 / UID: ATU79482103",
      wkoText: "Полное соблюдение регламентов Экономической палаты Вены (Wirtschaftskammer Wien). Страхование коммерческой ответственности до 2 000 000 € через Wiener Städtische Versicherung.",
      ctaHeadline: "Получите прозрачную смету за 2 минуты",
      ctaSubline: "Без банковской карты. Прикрепите фото работ, укажите район Вены и получите точный расчет стоимости.",
      callUs: "Диспетчерская служба:",
      callNumber: "+43 1 928 44 11",
      emergencyBadge: "Диспетчерская служба в Вене (Пн–Сб 07:00–20:00)"
    }
  }[currentLang];
  return <section data-controller-name="Legal Trust and Direct Quote Conversion Anchor" className="w-full bg-accent text-accent-foreground py-16" data-api-unique-id='trustconversionband-r463d4fe83ac9f263-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='trustconversionband-r006a5bb4dd29ffc8-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" data-api-unique-id='trustconversionband-rb95575a9504251aa-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
          
          {/* Left Column: Austrian WKO Compliance Proof */}
          <div className="lg:col-span-6 space-y-4" data-api-unique-id='trustconversionband-rf2adaad4aebd2d75-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider" data-api-unique-id='trustconversionband-rf5fe6af5019d9117-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
              <Building2 className="w-3.5 h-3.5" data-api-unique-id='trustconversionband-r1cc73cf6690177ca-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand' />
              {t.wkoTitle}
            </div>
            
            <h3 className="text-xl sm:text-2xl font-display font-bold text-accent-foreground tracking-tight" data-api-unique-id='trustconversionband-r7e20a9f5a25edf99-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
              {t.wkoRegisterNumber}
            </h3>

            <p className="text-sm text-accent-foreground/85 font-body leading-relaxed max-w-xl" data-api-unique-id='trustconversionband-r8c91e679e739eec3-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
              {t.wkoText}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-accent-foreground/80" data-api-unique-id='trustconversionband-r8e2243800fc2b766-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
              <div className="flex items-center gap-1.5" data-api-unique-id='trustconversionband-r95ddabc754b89732-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                <ShieldCheck className="w-4 h-4 text-primary" data-api-unique-id='trustconversionband-rb82c479c1eddfaaa-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand' />
                <span data-api-unique-id='trustconversionband-rf5a3d51d3615aa65-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>Wiener Städtische Deckung</span>
              </div>
              <div className="flex items-center gap-1.5" data-api-unique-id='trustconversionband-r580bc510a1723d77-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                <Clock className="w-4 h-4 text-primary" data-api-unique-id='trustconversionband-r812c0433dbd73239-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand' />
                <span data-api-unique-id='trustconversionband-rab328a398280ef55-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>{t.emergencyBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Conversion Anchor Box */}
          <div className="lg:col-span-6 bg-card text-card-foreground border border-border rounded-lg p-6 sm:p-8 shadow-elevated" data-api-unique-id='trustconversionband-r3d97fe19bbf3e8fd-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
            <div className="space-y-3" data-api-unique-id='trustconversionband-rb35036a7356bfa9e-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider" data-api-unique-id='trustconversionband-r1320e55b03e57b2e-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                <Sparkles className="w-3.5 h-3.5" data-api-unique-id='trustconversionband-r16b39b9eb17aba67-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand' />
                Vienna Handwerk Online Portal
              </div>
              
              <h4 className="text-xl sm:text-2xl font-display font-bold text-card-foreground leading-snug" data-api-unique-id='trustconversionband-r549fdf02b70254fa-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                {t.ctaHeadline}
              </h4>

              <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed" data-api-unique-id='trustconversionband-r68f13a0bd25cc09d-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                {t.ctaSubline}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-4" data-api-unique-id='trustconversionband-rd811d52a49d75e3d-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted text-muted-foreground" data-api-unique-id='trustconversionband-r0b71d84a0b8592a9-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                <PhoneCall className="w-4 h-4 text-accent shrink-0" data-api-unique-id='trustconversionband-r70ec7e256a60a811-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand' />
                <div className="text-left" data-api-unique-id='trustconversionband-r29528a6c962a0908-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                  <div className="text-[11px] font-medium uppercase tracking-wider" data-api-unique-id='trustconversionband-rd837711b51b55b8d-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                    {t.callUs}
                  </div>
                  <a href="tel:+4319284411" className="text-sm font-bold text-foreground hover:text-primary transition-colors" data-api-unique-id='trustconversionband-r9e1ea54924257103-s4280169619' data-api-unique-page-name='src/frontend/components/PricingScope/TrustConversionBand'>
                    {t.callNumber}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>;
}