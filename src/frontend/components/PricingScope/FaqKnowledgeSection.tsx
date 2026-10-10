"use client";

import React, { useState } from "react";
import { LanguageCode, FaqCategory, FaqItem } from "@/frontend/types/PricingScope";
import { HelpCircle, ChevronDown, ChevronUp, BadgeEuro, Scale, CalendarClock, Boxes, ShieldCheck } from "lucide-react";
interface FaqKnowledgeSectionProps {
  currentLang: LanguageCode;
  faqItems: FaqItem[];
  selectedCategory: FaqCategory;
  onCategoryChange: (cat: FaqCategory) => void;
}
export default function FaqKnowledgeSection({
  currentLang,
  faqItems,
  selectedCategory,
  onCategoryChange
}: FaqKnowledgeSectionProps) {
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({});
  const toggleFaq = (id: string, defaultOpen: boolean) => {
    setOpenFaqIds(prev => {
      const current = prev[id] !== undefined ? prev[id] : defaultOpen;
      return {
        ...prev,
        [id]: !current
      };
    });
  };
  const t = {
    en: {
      sectionBadge: "Operational Transparency & Vienna Specifics",
      sectionTitle: "Frequently Asked Questions & Practice Guides",
      sectionSubtitle: "Clear answers on VAT compliance, parking in Vienna short-term parking zones (Kurzparkzonen), weekend emergency policies, and material procurement.",
      catPricing: "Pricing & Invoicing",
      catScope: "GewO Scope & Safety",
      catScheduling: "Scheduling & Travel",
      catMaterials: "Materials & Parts",
      legalNoticeTag: "Austrian Statutory Reference:",
      noFaqs: "No frequently asked questions available in this category."
    },
    de: {
      sectionBadge: "Betriebliche Transparenz & Wiener Praxis",
      sectionTitle: "Häufig gestellte Fragen & Praxisleitfaden",
      sectionSubtitle: "Klare Antworten zu USt-Rechnungslegung, Parken in Wiener Kurzparkzonen, Notdiensteinsätzen und Materialbeschaffung ohne Aufschläge.",
      catPricing: "Preise & Abrechnung",
      catScope: "Gewerberecht & Haftung",
      catScheduling: "Termine & Anfahrt",
      catMaterials: "Material & Beschaffung",
      legalNoticeTag: "Österreichische Rechtsgrundlage:",
      noFaqs: "Keine häufig gestellten Fragen in dieser Kategorie vorhanden."
    },
    ru: {
      sectionBadge: "Прозрачность условий и практика в Вене",
      sectionTitle: "Часто задаваемые вопросы и практические правила",
      sectionSubtitle: "Исчерпывающие ответы о счетах с НДС, парковке в зонах Kurzparkzone, экстренных выездах и закупке материалов без наценок.",
      catPricing: "Цены и расчеты",
      catScope: "Правовые рамки GewO",
      catScheduling: "График и выезд",
      catMaterials: "Материалы и чеки",
      legalNoticeTag: "Нормативно-правовая база Австрии:",
      noFaqs: "В данной категории пока нет вопросов."
    }
  }[currentLang];
  const categories: {
    key: FaqCategory;
    label: string;
    icon: React.ReactNode;
  }[] = [{
    key: "PRICING",
    label: t.catPricing,
    icon: <BadgeEuro className="w-4 h-4" data-api-unique-id='faqknowledgesection-rb167bf005944dd2d-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' />
  }, {
    key: "SCOPE",
    label: t.catScope,
    icon: <Scale className="w-4 h-4" data-api-unique-id='faqknowledgesection-r6cc0480487944e14-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' />
  }, {
    key: "SCHEDULING",
    label: t.catScheduling,
    icon: <CalendarClock className="w-4 h-4" data-api-unique-id='faqknowledgesection-r0d83484c10d2c2eb-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' />
  }, {
    key: "MATERIALS",
    label: t.catMaterials,
    icon: <Boxes className="w-4 h-4" data-api-unique-id='faqknowledgesection-r0a7a1cd2627e2bad-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' />
  }];
  const filteredFaqs = (faqItems || []).filter(f => f.category === selectedCategory).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  return <section data-controller-name="Vienna Practical FAQ Accordion" className="w-full bg-card border-b border-border py-16" data-api-unique-id='faqknowledgesection-r4725c7418fceb117-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='faqknowledgesection-rec428fadf0d532c5-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10" data-api-unique-id='faqknowledgesection-r58fa086a0086fcfd-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-3" data-api-unique-id='faqknowledgesection-r7f992d6e06e07f12-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
            <HelpCircle className="w-3.5 h-3.5 text-primary" data-api-unique-id='faqknowledgesection-r64c2b24b1e48d1c9-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' />
            {t.sectionBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-card-foreground tracking-tight" data-api-unique-id='faqknowledgesection-r5dc25fce51a55451-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground font-body leading-relaxed" data-api-unique-id='faqknowledgesection-r46f102527fe0b161-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4" data-api-unique-id='faqknowledgesection-r7ebe36d76c7e387c-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
          {categories.map((cat, index) => {
          const isActive = selectedCategory === cat.key;
          return <button key={cat.key} type="button" onClick={() => onCategoryChange(cat.key)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "bg-primary text-primary-foreground shadow-primary" : "bg-background text-foreground border border-border hover:bg-muted"}`} data-api-unique-id='faqknowledgesection-r09a3819c9dcd702f-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1' data-api-bind-info={`categories-${index}-icon`} data-api-map-var-name='cat'>
                {cat.icon}
                {cat.label}
              </button>;
        })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl" data-api-unique-id='faqknowledgesection-reae956bceb8465df-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
          {filteredFaqs.length === 0 ? <div className="p-8 text-center border border-dashed border-border rounded-md text-muted-foreground text-sm" data-api-unique-id='faqknowledgesection-r0a56eb91139e93ee-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection'>
              {t.noFaqs}
            </div> : filteredFaqs.map((faq, index) => {
          const defaultOpen = index === 0;
          const isOpen = openFaqIds[faq.id] !== undefined ? openFaqIds[faq.id] : defaultOpen;
          const localizedQ = currentLang === "de" ? faq.questionDe || faq.questionEn : currentLang === "ru" ? faq.questionRu || faq.questionEn : faq.questionEn || faq.questionDe;
          const localizedA = currentLang === "de" ? faq.answerDe || faq.answerEn : currentLang === "ru" ? faq.answerRu || faq.answerEn : faq.answerEn || faq.answerDe;
          return <div key={faq.id} className="bg-background text-foreground border border-border rounded-md shadow-soft overflow-hidden transition-all" data-api-unique-id='faqknowledgesection-rda13809850f57665-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                  <button type="button" onClick={() => toggleFaq(faq.id, defaultOpen)} className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-expanded={isOpen} data-api-unique-id='faqknowledgesection-re71f7fbb384526c0-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                    <span className="font-display font-bold text-base sm:text-lg text-foreground leading-snug" data-api-unique-id='faqknowledgesection-r27fd28267cb14af1-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                      {localizedQ}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground" data-api-unique-id='faqknowledgesection-raaa57a942ae2d7ec-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-primary" data-api-unique-id='faqknowledgesection-r26e1c03f632414f2-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1' /> : <ChevronDown className="w-4 h-4" data-api-unique-id='faqknowledgesection-r3cb3a795eedb0453-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1' />}
                    </div>
                  </button>

                  {isOpen && <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-sm text-muted-foreground font-body leading-relaxed border-t border-border" data-api-unique-id='faqknowledgesection-rea8e2a4f937ed4db-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                      <p className="whitespace-pre-line text-foreground/90" data-api-unique-id='faqknowledgesection-r71b7a8954a35c8d7-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>{localizedA}</p>
                      
                      {faq.legalNoticeSnippet && <div className="mt-4 p-3 rounded-md bg-muted text-muted-foreground text-xs flex items-start gap-2" data-api-unique-id='faqknowledgesection-r1c807ce1e92d3385-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" data-api-unique-id='faqknowledgesection-r62234417a2a7f38f-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1' />
                          <div data-api-unique-id='faqknowledgesection-r34c203a368d90dfd-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1' data-api-bind-info={`filteredFaqs-${index}-legalNoticeSnippet`} data-api-map-var-name='faq'>
                            <span className="font-semibold text-foreground" data-api-unique-id='faqknowledgesection-r8e3b5430584f445a-s1853572078' data-api-unique-page-name='src/frontend/components/PricingScope/FaqKnowledgeSection' data-api-in-loop='1'>
                              {t.legalNoticeTag}{" "}
                            </span>
                            {faq.legalNoticeSnippet}
                          </div>
                        </div>}
                    </div>}
                </div>;
        })}
        </div>

      </div>
    </section>;
}