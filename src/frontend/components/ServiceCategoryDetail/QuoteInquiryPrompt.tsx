"use client";

import React from "react";
import { ArrowRight, Clock, ShieldCheck, FileText, CheckCircle } from "lucide-react";
import { ServiceCategoryDetailDTO, LanguageCode } from "@/frontend/types/ServiceCategoryDetail";
type ServiceCategoryEntity = ServiceCategoryDetailDTO;
interface QuoteInquiryPromptProps {
  category: ServiceCategoryEntity;
  activeLang: LanguageCode;
  onInitiateQuote: () => void;
}
export default function QuoteInquiryPrompt({
  category,
  activeLang,
  onInitiateQuote
}: QuoteInquiryPromptProps) {
  const getLocalizedTitle = () => {
    switch (activeLang) {
      case "DE":
        return category.titleDe || category.titleEn;
      case "RU":
        return category.titleRu || category.titleEn;
      default:
        return category.titleEn;
    }
  };
  const formattedHourlyRate = typeof category.baselineHourlyRate === "number" ? category.baselineHourlyRate.toFixed(2) : Number(category.baselineHourlyRate || 15).toFixed(2);
  return <section data-controller-name="Direct Quote Inquiry Prompt" className="w-full bg-card text-card-foreground border-b border-border" data-api-unique-id='quoteinquiryprompt-raa224c238bb72ed2-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" data-api-unique-id='quoteinquiryprompt-r61c1749280d8bf19-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
        <div className="rounded-xl border-2 border-primary bg-background text-foreground p-6 sm:p-10 shadow-elevated" data-api-unique-id='quoteinquiryprompt-r9c26a376ba04b5d1-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" data-api-unique-id='quoteinquiryprompt-rf59c6dcc2f0454a7-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
            {/* Left Content Summary */}
            <div className="lg:col-span-8 space-y-6" data-api-unique-id='quoteinquiryprompt-re13601d7378d3fa7-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
              <div className="space-y-2" data-api-unique-id='quoteinquiryprompt-r2d645758178cee08-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent text-accent-foreground px-2.5 py-1 text-xs font-semibold uppercase tracking-wider" data-api-unique-id='quoteinquiryprompt-r03b2ce09da265c4c-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  <Clock className="w-3.5 h-3.5 text-accent-foreground" data-api-unique-id='quoteinquiryprompt-r99b6e2b15630ba7e-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt' />
                  Guaranteed 2-Hour SLA Response
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display leading-snug" data-api-unique-id='quoteinquiryprompt-raf8db794d3b3983c-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  Request a Formal Quote for {getLocalizedTitle()}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-api-unique-id='quoteinquiryprompt-rf2e8b711c2fc25a2-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  Initialize an official quote inquiry pre-filled with this trade discipline. Our master dispatcher will review your specifications and issue a binding estimate within 2 business hours.
                </p>
              </div>

              {/* Trade Summary Pill Row */}
              <div className="flex flex-wrap gap-4 pt-2" data-api-unique-id='quoteinquiryprompt-r5b2a813be32026cd-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                <div className="flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-3.5 py-2 text-xs font-semibold" data-api-unique-id='quoteinquiryprompt-r35abf679e72113e8-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  <FileText className="w-4 h-4 text-primary shrink-0" data-api-unique-id='quoteinquiryprompt-r550d1647b9cd22db-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt' />
                  <span data-api-unique-id='quoteinquiryprompt-rdcc66c2402a07cf4-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>Trade Code: {category.key}</span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-3.5 py-2 text-xs font-semibold" data-api-unique-id='quoteinquiryprompt-rd1571ece0ef94c06-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='quoteinquiryprompt-r1887634ccc9b3f26-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt' />
                  <span data-api-unique-id='quoteinquiryprompt-r4d0e95254d5d8075-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                    Compliance: {category.craftClassification === "MEISTER_KOOPERATION" ? "Meister Partner" : "Freies Handwerk"}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-3.5 py-2 text-xs font-semibold" data-api-unique-id='quoteinquiryprompt-rde3f720ffc854f2f-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" data-api-unique-id='quoteinquiryprompt-r159d3499a7b2284b-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt' />
                  <span data-api-unique-id='quoteinquiryprompt-r7c26ddd0ccf2aa66-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>Baseline: €{formattedHourlyRate}/h</span>
                </div>
              </div>
            </div>

            {/* Right Action Stack */}
            <div className="lg:col-span-4 flex flex-col gap-4" data-api-unique-id='quoteinquiryprompt-rce6f719e8b19b11b-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
              <div className="rounded-lg border border-border bg-card text-card-foreground p-5 space-y-4 text-center" data-api-unique-id='quoteinquiryprompt-re6f03a99d43a2a4f-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                <div className="space-y-1" data-api-unique-id='quoteinquiryprompt-rd1a92e33a0f80c1e-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold" data-api-unique-id='quoteinquiryprompt-r49ba273e33c449dd-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                    No Upfront Commitment
                  </span>
                  <div className="text-lg font-bold text-card-foreground" data-api-unique-id='quoteinquiryprompt-r6cd484c32987b47d-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                    Binding Price Proposal
                  </div>
                </div>

                <button type="button" onClick={onInitiateQuote} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-4 font-semibold text-base shadow-primary transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='quoteinquiryprompt-rd0731da379eddaaf-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  <span data-api-unique-id='quoteinquiryprompt-r8d3a7a58572705d8-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>Start Quote Request (F06)</span>
                  <ArrowRight className="w-5 h-5 text-primary-foreground" data-api-unique-id='quoteinquiryprompt-r87c05a5ffda29b61-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt' />
                </button>

                <p className="text-xs text-muted-foreground" data-api-unique-id='quoteinquiryprompt-r9135001ed6c8ca6a-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>
                  Carries pre-selected parameter: <span className="font-mono text-foreground font-semibold" data-api-unique-id='quoteinquiryprompt-rfee65e22d4d4862f-s2659285954' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt'>categoryKey={category.key}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}