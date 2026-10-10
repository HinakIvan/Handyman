"use client";

import React, { useState } from "react";
import type { Language, FaqCategory, FaqItemDTO } from "@/frontend/types/HomeFrontend";
import { ChevronDown, HelpCircle } from "lucide-react";
interface FaqSectionProps {
  lang: Language;
  faqs?: FaqItemDTO[];
}
export default function FaqSection({
  lang,
  faqs = []
}: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | "ALL">("ALL");
  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };
  const getQuestion = (item: FaqItemDTO, l: Language) => {
    if (l === "de") return item.questionDe;
    if (l === "ru") return item.questionRu;
    return item.questionEn;
  };
  const getAnswer = (item: FaqItemDTO, l: Language) => {
    if (l === "de") return item.answerDe;
    if (l === "ru") return item.answerRu;
    return item.answerEn;
  };
  const sortedFaqs = [...faqs].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  const filteredFaqs = sortedFaqs.filter(item => selectedCategory === "ALL" || item.category === selectedCategory);
  return <section data-controller-name="Frequently Asked Questions" className="w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16" data-api-unique-id='faqsection-r22c5978ab70df289-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='faqsection-rd7cbc991228d741e-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
        <div className="max-w-2xl mx-auto text-center mb-8" data-api-unique-id='faqsection-rae02d9c3e1c10786-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
          <div className="inline-flex items-center gap-1.5 rounded-sm bg-muted text-muted-foreground px-2.5 py-1 text-xs font-semibold border border-border mb-2" data-api-unique-id='faqsection-rf6d3a61f9fb12247-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
            <HelpCircle className="h-3.5 w-3.5 text-primary" data-api-unique-id='faqsection-rca428871dd49e372-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' />
            <span data-api-unique-id='faqsection-rd7a633025e71ec95-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>Clear Answers</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground" data-api-unique-id='faqsection-r1aadf0d6bec2c917-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
            {lang === "de" ? "Häufig gestellte Fragen (FAQ)" : lang === "ru" ? "Часто задаваемые вопросы (FAQ)" : "Frequently Asked Questions (FAQ)"}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='faqsection-r133e33797312f3c3-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
            {lang === "de" ? "Wissenswertes zu Tarifen, Werkzeugen, Versicherung und rechtlichen Rahmenbedingungen." : lang === "ru" ? "Всё о тарифах, инструменте, страховке и юридических гарантиях." : "Essential details regarding pricing, materials, insurance, and compliance."}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8" data-api-unique-id='faqsection-raad4774b14b82ada-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
          {([{
          id: "ALL",
          label: {
            en: "All Topics",
            de: "Alle Themen",
            ru: "Все темы"
          }
        }, {
          id: "PRICING",
          label: {
            en: "Pricing & Invoicing",
            de: "Preise & Rechnung",
            ru: "Цены и оплата"
          }
        }, {
          id: "SCOPE",
          label: {
            en: "Trade Scope & Legal",
            de: "Gewerberecht & Umfang",
            ru: "Правовые границы"
          }
        }, {
          id: "MATERIALS",
          label: {
            en: "Materials & Tools",
            de: "Materialien & Werkzeug",
            ru: "Материалы"
          }
        }, {
          id: "SCHEDULING",
          label: {
            en: "Scheduling & Arrival",
            de: "Termine & Anfahrt",
            ru: "Сроки и выезд"
          }
        }] as const).map((cat, index) => {
          const isSelected = selectedCategory === cat.id;
          return <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='faqsection-re0cacc346ea07ff2-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' data-api-in-loop='1' data-api-bind-info={`list-${index}-label.lang`} data-api-map-var-name='cat'>
                {cat.label[lang]}
              </button>;
        })}
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3" data-api-unique-id='faqsection-re64e14c37ceff589-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
          {filteredFaqs.length === 0 ? <div className="text-center py-8 text-sm text-muted-foreground" data-api-unique-id='faqsection-r2c9fddecf625b489-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection'>
              {lang === "de" ? "Keine Fragen in dieser Kategorie vorhanden." : lang === "ru" ? "В этой категории нет вопросов." : "No questions available in this category."}
            </div> : filteredFaqs.map((item, index) => {
          const isOpen = openId === item.id;
          return <div key={item.id} className="rounded-lg border border-border bg-background text-foreground transition-colors overflow-hidden" data-api-unique-id='faqsection-r6dcfac4d6ca1a464-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' data-api-in-loop='1'>
                  <button type="button" onClick={() => toggle(item.id)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='faqsection-rf868380e3fb9b5a9-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' data-api-in-loop='1'>
                    <span className="pr-4" data-api-unique-id='faqsection-ra247ba5c1b9f832b-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' data-api-in-loop='1'>{getQuestion(item, lang)}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} data-api-unique-id='faqsection-r7c847e04087889ff-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' data-api-in-loop='1' />
                  </button>

                  {isOpen && <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-3" data-api-unique-id='faqsection-r98e86cef716dd5b0-s847762619' data-api-unique-page-name='src/frontend/components/HomeFrontend/FaqSection' data-api-in-loop='1'>
                      {getAnswer(item, lang)}
                    </div>}
                </div>;
        })}
        </div>
      </div>
    </section>;
}