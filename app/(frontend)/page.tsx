"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Language, ServiceId, ServiceCategoryKey, ServiceCategoryDTO, ViennaDistrictDTO, FaqItemDTO } from "@/frontend/types/HomeFrontend";
import { getHomeData } from "@/frontend/actions/HomeFrontend";
import { ServicesCatalog, ServiceCategoryDetail, QuoteRequestForm as QuoteRequestFormRoute } from "@/frontend/route-params";
import Hero from "@/frontend/components/HomeFrontend/Hero";
import PricingTransparency from "@/frontend/components/HomeFrontend/PricingTransparency";
import ServicesGrid from "@/frontend/components/HomeFrontend/ServicesGrid";
import LegalTradeScope from "@/frontend/components/HomeFrontend/LegalTradeScope";
import HowItWorks from "@/frontend/components/HomeFrontend/HowItWorks";
import QuoteRequestForm from "@/frontend/components/HomeFrontend/QuoteRequestForm";
import ServiceAreaSummary from "@/frontend/components/HomeFrontend/ServiceAreaSummary";
import FaqSection from "@/frontend/components/HomeFrontend/FaqSection";
import { Globe, Phone, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";
const SERVICE_ID_TO_KEY: Record<string, ServiceCategoryKey> = {
  "service-assembly": "ASSEMBLY",
  "service-demolition": "DEMOLITION",
  "service-flooring": "FLOORING",
  "service-painting": "PAINTING",
  "service-drywall": "DRYWALL",
  "service-bathroom-kitchen": "BATHROOM_KITCHEN",
  "service-doors-windows": "DOORS_WINDOWS",
  "service-outdoor": "OUTDOOR",
  "service-moving": "MOVING",
  "service-commercial": "COMMERCIAL",
  "service-plumbing-minor": "PLUMBING_MINOR",
  ASSEMBLY: "ASSEMBLY",
  DEMOLITION: "DEMOLITION",
  FLOORING: "FLOORING",
  PAINTING: "PAINTING",
  DRYWALL: "DRYWALL",
  PLUMBING_MINOR: "PLUMBING_MINOR",
  BATHROOM_KITCHEN: "BATHROOM_KITCHEN",
  DOORS_WINDOWS: "DOORS_WINDOWS",
  OUTDOOR: "OUTDOOR",
  MOVING: "MOVING",
  COMMERCIAL: "COMMERCIAL"
};
export default function HomeFrontendPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("en");
  useEffect(() => {
    const valid = (value: string | null): value is Language => value === "de" || value === "en" || value === "ru";
    try {
      const saved = window.localStorage.getItem("handyman-language");
      if (valid(saved)) setLang(saved);
    } catch { /* localStorage may be unavailable in private contexts */ }
    const onLanguageChange = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (valid(value)) setLang(value);
    };
    window.addEventListener("handyman-language-change", onLanguageChange);
    return () => window.removeEventListener("handyman-language-change", onLanguageChange);
  }, []);
  const changeLanguage = (value: Language) => {
    setLang(value);
    try { window.localStorage.setItem("handyman-language", value); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("handyman-language-change", { detail: value }));
  };
  const [preselectedService, setPreselectedService] = useState<ServiceId | "">("");
  const [_serviceCategoryKey, setServiceCategoryKey] = useState<ServiceCategoryKey | "">("");
  const [services, setServices] = useState<ServiceCategoryDTO[]>([]);
  const [districts, setDistricts] = useState<ViennaDistrictDTO[]>([]);
  const [faqs, setFaqs] = useState<FaqItemDTO[]>([]);
  const [_isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getHomeData().then(data => {
      if (isMounted && data) {
        setServices(data.services ?? []);
        setDistricts(data.districts ?? []);
        setFaqs(data.faqs ?? []);
      }
    }).catch(err => {
      console.error("Failed to load home data:", err);
    }).finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const resolveCategoryKey = (serviceId?: ServiceId | string): ServiceCategoryKey | undefined => {
    if (!serviceId) return undefined;
    if (SERVICE_ID_TO_KEY[serviceId]) return SERVICE_ID_TO_KEY[serviceId];
    const match = services.find(s => s.id === serviceId || s.key === serviceId);
    if (match) return match.key;
    const cleaned = serviceId.replace(/^service-/, "").toUpperCase().replace(/-/g, "_");
    if (SERVICE_ID_TO_KEY[cleaned]) return SERVICE_ID_TO_KEY[cleaned];
    return undefined;
  };
  const scrollToQuote = (serviceId?: ServiceId) => {
    if (serviceId) {
      const mappedKey = resolveCategoryKey(serviceId);
      setPreselectedService(mappedKey || serviceId);
      if (mappedKey) {
        setServiceCategoryKey(mappedKey);
      }
    }
    const target = document.getElementById("quote-section");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      const categoryKey = serviceId ? resolveCategoryKey(serviceId) || "" : "";
      if (categoryKey) {
        QuoteRequestFormRoute.navigateToWithCategory(router, {
          categoryKey
        });
      } else {
        QuoteRequestFormRoute.navigateTo(router);
      }
    }
  };
  const scrollToServices = () => {
    const target = document.getElementById("services-section");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      ServicesCatalog.navigateTo(router);
    }
  };
  const handleInspectServiceDetail = (serviceId: ServiceId) => {
    const categoryKey = resolveCategoryKey(serviceId);
    if (categoryKey) {
      ServiceCategoryDetail.navigateToCategory(router, {
        categoryKey
      });
    } else {
      scrollToQuote(serviceId);
    }
  };
  const handleResetServiceSelection = () => {
    setPreselectedService("");
    setServiceCategoryKey("");
  };
  const baselineRate = services.length > 0 ? Math.min(...services.map((s, index) => s.baselineHourlyRate)) : 15;
  return <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      {/* Functional Header / Language Switcher Bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-card text-card-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Vienna Handyman Services (Gewerbeordnung konform)</span>
            </span>
            <span className="hidden md:inline text-muted-foreground border-l border-border pl-3">
              Baseline Rate: €{baselineRate}/h | Vienna 1st–23rd Districts
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {/* Direct Quick Triggers */}
            <a href="tel:+431234567890" className="hidden sm:inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-3 w-3 text-primary" />
              <span>+43 1 234 567 890</span>
            </a>

            <a href="https://wa.me/431234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded bg-muted text-success px-2 py-1 hover:bg-secondary transition-colors">
              <MessageSquare className="h-3 w-3" />
              <span>WhatsApp</span>
            </a>

            {/* Language Selector (DE / EN / RU) */}
            <div className="flex items-center gap-1 border-l border-border pl-2">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              {(["de", "en", "ru"] as Language[]).map((l, index) => <button key={l} type="button" onClick={() => changeLanguage(l)} className={`rounded px-1.5 py-0.5 text-xs font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  {l}
                </button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Flow Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Banner with Viennese Apartment Craftsmanship Anchor */}
        <Hero lang={lang} onSelectQuoteCta={() => scrollToQuote()} onSelectServicesCta={scrollToServices} />

        {/* 2. Pricing & Cost Transparency Breakdown */}
        <PricingTransparency lang={lang} />

        {/* 3. Service Categories Grid (10 categories matrix) */}
        <div id="services-section">
          <ServicesGrid lang={lang} services={services} onSelectServiceForQuote={id => {
          scrollToQuote(id);
        }} onInspectServiceDetail={id => {
          handleInspectServiceDetail(id);
        }} />
        </div>

        {/* Catalog CTA Strip */}
        <div className="w-full bg-card text-card-foreground border-b border-border py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-card-foreground">
                {lang === "de" ? "Suchen Sie einen speziellen Service oder Großauftrag?" : lang === "ru" ? "Ищете нестандартные работы или комплексный ремонт?" : "Looking for a specialized project or full catalog?"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {lang === "de" ? "Entdecken Sie unseren vollständigen Katalog mit detaillierten Stundensätzen." : lang === "ru" ? "Ознакомьтесь с полным списком услуг и расценками мастеров." : "Explore our complete trade catalog with comprehensive scope guides."}
              </p>
            </div>
            <button type="button" onClick={() => {
            ServicesCatalog.navigateTo(router);
          }} className="inline-flex items-center gap-1.5 rounded-md bg-secondary text-secondary-foreground px-4 py-2.5 text-xs font-semibold hover:brightness-95 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span>
                {lang === "de" ? "Gesamten Handwerkskatalog ansehen" : lang === "ru" ? "Смотреть весь каталог услуг" : "View All Handyman Services"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Legal Trade Scope Notice (Austrian GewO compliance) */}
        <LegalTradeScope lang={lang} />

        {/* 5. How It Works Timeline (5-step process) */}
        <HowItWorks lang={lang} />

        {/* 6. Quote & Service Request Form (Interactive submission & live calculation) */}
        <div id="quote-section">
          <QuoteRequestForm lang={lang} preselectedServiceId={preselectedService} onResetServiceSelection={handleResetServiceSelection} />
        </div>

        {/* 7. Service Area & Location Summary (23 Vienna districts) */}
        <ServiceAreaSummary lang={lang} districts={districts} />

        {/* 8. Frequently Asked Questions (FAQ Accordion) */}
        <FaqSection lang={lang} faqs={faqs} />
      </main>
    </div>;
}
