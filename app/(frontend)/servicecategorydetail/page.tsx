"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getServiceCategoryDetail } from "@/frontend/actions/ServiceCategoryDetail";
import { LanguageCode, ServiceCategoryPageData } from "@/frontend/types/ServiceCategoryDetail";
import { ServiceCategoryDetail as ServiceCategoryDetailRoute, QuoteRequestForm } from "@/frontend/route-params";
import CategoryHeaderHero from "@/frontend/components/ServiceCategoryDetail/CategoryHeaderHero";
import PricingSchedule from "@/frontend/components/ServiceCategoryDetail/PricingSchedule";
import LegalScopeComparison from "@/frontend/components/ServiceCategoryDetail/LegalScopeComparison";
import QuoteInquiryPrompt from "@/frontend/components/ServiceCategoryDetail/QuoteInquiryPrompt";
export default function ServiceCategoryDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<LanguageCode>("DE");
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ServiceCategoryPageData | null>(null);
  const {
    categoryKey
  } = useMemo(() => {
    return ServiceCategoryDetailRoute.getParams(searchParams);
  }, [searchParams]);
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    getServiceCategoryDetail(categoryKey || undefined).then(res => {
      if (!isCancelled) {
        setData(res);
        setLoading(false);
      }
    }).catch(err => {
      console.error("Failed to load service category details:", err);
      if (!isCancelled) {
        setData(null);
        setLoading(false);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [categoryKey]);
  const category = useMemo(() => {
    if (!data?.category) return null;
    const cat = data.category;
    return {
      ...cat,
      leadArtisan: cat.leadArtisan ?? "",
      descriptionDe: cat.descriptionDe ?? "",
      descriptionEn: cat.descriptionEn ?? "",
      descriptionRu: cat.descriptionRu ?? "",
      iconName: cat.iconName ?? "Hammer"
    };
  }, [data?.category]);
  const handleInitiateQuote = () => {
    if (!category) return;
    QuoteRequestForm.navigateToWithCategory(router, {
      categoryKey: category.key
    });
  };
  if (loading) {
    return <main className="w-full min-h-screen bg-background text-foreground flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading service category details...</p>
        </div>
      </main>;
  }
  if (!data || !category) {
    return <main className="w-full min-h-screen bg-background text-foreground flex items-center justify-center py-24">
        <div className="text-center p-8 max-w-md">
          <p className="text-base text-muted-foreground">Service category details not found.</p>
        </div>
      </main>;
  }
  return <main className="w-full min-h-screen bg-background text-foreground">
      {/* 1. Multilingual Trade Header Hero */}
      <CategoryHeaderHero category={category} activeLang={activeLang} onLanguageChange={setActiveLang} onInitiateQuote={handleInitiateQuote} />

      {/* 2. Transparent Hourly Pricing Schedule */}
      <PricingSchedule category={category} districts={data.districts} />

      {/* 3. Dual-Track Legal Operational Scope & GewO 1994 Compliance */}
      <LegalScopeComparison category={category} activeLang={activeLang} />

      {/* 4. Direct Quote Inquiry Prompt (F06 Transition) */}
      <QuoteInquiryPrompt category={category} activeLang={activeLang} onInitiateQuote={handleInitiateQuote} />
    </main>;
}
