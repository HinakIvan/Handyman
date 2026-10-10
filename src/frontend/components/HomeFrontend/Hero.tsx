"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import type { Language } from "@/frontend/types/HomeFrontend";
import { Phone, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
interface HeroProps {
  lang: Language;
  onSelectQuoteCta: () => void;
  onSelectServicesCta: () => void;
}
const copy = {
  en: {
    title: "Wiener Handwerk mit Präzision",
    subtitle: "Reliable apartment repairs, assembly, and renovation assistance across Vienna.",
    badgeRate: "From €15/hour baseline",
    disclaimer: "Materials, VAT, and travel surcharge calculated transparently.",
    btnQuote: "Request Free Quote",
    btnServices: "Explore Services",
    btnCall: "Call Now",
    feature1: "Fully compliant Freies Handwerk trade scope",
    feature2: "Vienna 1st–23rd districts & Lower Austria"
  },
  de: {
    title: "Wiener Handwerk mit Präzision",
    subtitle: "Zuverlässige Altbausanierung, Montage & Reparaturen in ganz Wien ab €15/Std.",
    badgeRate: "Ab €15/Std. Grundtarif",
    disclaimer: "Material, MwSt. und Anfahrt transparent und fair aufgeschlüsselt.",
    btnQuote: "Kostenloses Angebot",
    btnServices: "Leistungen ansehen",
    btnCall: "Direkt anrufen",
    feature1: "Konform nach österr. Gewerbeordnung (Freies Handwerk)",
    feature2: "1.–23. Bezirk & Umland Niederösterreich"
  },
  ru: {
    title: "Wiener Handwerk mit Präzision",
    subtitle: "Надёжный ремонт квартир, сборка и отделочные работы в Вене от €15/час.",
    badgeRate: "От €15/час базовая ставка",
    disclaimer: "Материалы, НДС и выезд рассчитываются прозрачно без скрытых комиссий.",
    btnQuote: "Рассчитать смету",
    btnServices: "Все услуги",
    btnCall: "Позвонить",
    feature1: "Соответствие австрийскому регламенту Freies Handwerk",
    feature2: "1–23 районы Вены и Нижняя Австрия"
  }
};
export default function Hero({
  lang,
  onSelectQuoteCta,
  onSelectServicesCta
}: HeroProps) {
  const t = copy[lang];
  return <section data-controller-name="Hero Banner" className="relative w-full overflow-hidden border-b border-border bg-card text-card-foreground" data-api-unique-id='hero-rf979cb12d570dcac-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
      {/* Background Photography (Full view Altbau restoration in Vienna) */}
      <div className="absolute inset-0 z-0 h-full w-full" data-api-unique-id='hero-r98dad1e9f58769eb-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
        <EditableImg propKey="hero-main-bg" needLargeImage src="https://www.autocoder.cc/background/zaki_prod/generated/cf64aaad68cb46d0a22f8fe5d1781acd.png" alt="Vienna Altbau apartment renovation carpentry tools" keywords="vienna altbau apartment renovation carpentry craftsmanship warm limestone" description="Vienna Altbau apartment renovation with historic wooden parquet, carpentry tools, warm natural light and limestone walls" className="h-full w-full object-cover object-center" data-api-unique-id='hero-re6c72a6d03b105ba-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
        {/* Subtle 5% tint for baseline readability */}
        <div className="absolute inset-0 bg-background/5" data-api-unique-id='hero-r58e2ac33fc268a8b-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
      </div>

      {/* Foreground Content Panel */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28" data-api-unique-id='hero-rfc6c96cde790fb54-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
        <div className="max-w-2xl rounded-xl border border-border bg-card text-card-foreground p-6 sm:p-8 md:p-10 shadow-elevated" data-api-unique-id='hero-r894f92694eb44907-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
          {/* Baseline Rate Anchor Tag */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-muted text-muted-foreground px-3 py-1.5 text-xs sm:text-sm font-medium" data-api-unique-id='hero-r507c8f2ea6703e5b-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
            <span className="inline-block h-2 w-2 rounded-full bg-primary" data-api-unique-id='hero-rb725d4028ea46c9a-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
            <span className="font-semibold text-foreground" data-api-unique-id='hero-rc40a5d8d7c58fce5-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>{t.badgeRate}</span>
            <span className="text-border" data-api-unique-id='hero-r9b03e57d2a58834e-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>|</span>
            <span data-api-unique-id='hero-r6a5524286b1ba6be-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>Vienna &amp; Surroundings</span>
          </div>

          {/* Slogan H1 */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-card-foreground" data-api-unique-id='hero-rcbc524a27ba6e4f3-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
            {t.title}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed" data-api-unique-id='hero-r15dbb21bb7d60383-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
            {t.subtitle}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground border-l-2 border-primary pl-3" data-api-unique-id='hero-r3585f592a4fe23a2-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
            {t.disclaimer}
          </p>

          {/* Core CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" data-api-unique-id='hero-rca91170eb577b661-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
            <button type="button" onClick={onSelectQuoteCta} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='hero-r690f06255838bd22-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
              <span data-api-unique-id='hero-r46a805329c0a5651-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>{t.btnQuote}</span>
              <ArrowRight className="h-4 w-4" data-api-unique-id='hero-rd548a79e6b1356be-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
            </button>

            <button type="button" onClick={onSelectServicesCta} className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='hero-r3b7708da88a4f358-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
              <span data-api-unique-id='hero-r2e06e1283d423e65-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>{t.btnServices}</span>
            </button>

            <a href="tel:+431234567890" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='hero-r6db51e9560e8281d-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
              <Phone className="h-4 w-4 text-primary" data-api-unique-id='hero-r59449f1f4c920108-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
              <span data-api-unique-id='hero-r0c98a559958665f9-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>{t.btnCall}</span>
            </a>
          </div>

          {/* Vienna Compliance Indicators */}
          <div className="mt-6 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground" data-api-unique-id='hero-r38541ea076e03096-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
            <div className="flex items-center gap-2" data-api-unique-id='hero-r76157555465ff538-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" data-api-unique-id='hero-rc4dc4498d06abc9d-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
              <span data-api-unique-id='hero-r64b1f37e15d1628b-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>{t.feature1}</span>
            </div>
            <div className="flex items-center gap-2" data-api-unique-id='hero-rdc892df9afc9aa25-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" data-api-unique-id='hero-rf1e87b91a643f44e-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero' />
              <span data-api-unique-id='hero-rf617c750deb5cced-s955500324' data-api-unique-page-name='src/frontend/components/HomeFrontend/Hero'>{t.feature2}</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}