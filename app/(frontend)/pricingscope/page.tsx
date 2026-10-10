"use client";

import React, { useState, useEffect } from "react";
import HeroBanner from "@/frontend/components/PricingScope/Hero";
import ServicePricingCatalog from "@/frontend/components/PricingScope/ServicePricingCatalog";
import GewoComplianceScope from "@/frontend/components/PricingScope/GewoComplianceScope";
import FaqKnowledgeSection from "@/frontend/components/PricingScope/FaqKnowledgeSection";
import TrustConversionBand from "@/frontend/components/PricingScope/TrustConversionBand";
import { getPricingScopeData } from "@/frontend/actions/PricingScope";
import { LanguageCode, FaqCategory, PricingScopePageData } from "@/frontend/types/PricingScope";
export default function PricingScopePage() {
  // Global interactive states
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [selectedTradeFilter, setSelectedTradeFilter] = useState<string>("ALL");
  const [selectedCraftFilter, setSelectedCraftFilter] = useState<string>("ALL");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<FaqCategory>("PRICING");

  // Server Action data states
  const [data, setData] = useState<PricingScopePageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const result = await getPricingScopeData();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  if (isLoading && !data) {
    return <main className="w-full min-h-screen bg-background text-foreground font-body flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading pricing & legal scope...</p>
        </div>
      </main>;
  }
  const categories = data?.categories || [];
  const faqs = data?.faqs || [];
  const districts = data?.districts || [];
  const stats = data?.stats;
  return <main className="w-full min-h-screen bg-background text-foreground font-body">
      
      {/* 1. Transparent Hourly Rates & Vienna Municipal Districts Hero Billboard */}
      <HeroBanner currentLang={currentLang} onLanguageChange={setCurrentLang} districts={districts} stats={stats} />

      {/* 2. Dual-Track Trade Categories & Hourly Rate Matrix Catalog */}
      <ServicePricingCatalog currentLang={currentLang} categories={categories} selectedTradeFilter={selectedTradeFilter} selectedCraftFilter={selectedCraftFilter} onTradeFilterChange={setSelectedTradeFilter} onCraftFilterChange={setSelectedCraftFilter} />

      {/* 3. Statutory Compliance Demarcation under Austrian GewO 1994 */}
      <GewoComplianceScope currentLang={currentLang} />

      {/* 4. Vienna Practical FAQ Accordion Knowledge Base */}
      <FaqKnowledgeSection currentLang={currentLang} faqItems={faqs} selectedCategory={selectedFaqCategory} onCategoryChange={setSelectedFaqCategory} />

      {/* 5. Statutory Trust Notice & Direct Quote Conversion Anchor */}
      <TrustConversionBand currentLang={currentLang} />

    </main>;
}
