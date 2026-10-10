"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ServiceCategoryItem, ViennaDistrictCoverage, ClassificationFilter } from "@/frontend/types/ServicesCatalog";
import { getServicesCatalogData } from "@/frontend/actions/ServicesCatalog";
import { ServiceCategoryDetail } from "@/frontend/route-params";
import CatalogHeaderFilter from "@/frontend/components/ServicesCatalog/CatalogHeaderFilter";
import FeaturedTradesShowcase from "@/frontend/components/ServicesCatalog/FeaturedTradesShowcase";
import TradesCatalogGrid from "@/frontend/components/ServicesCatalog/TradesCatalogGrid";
import GewoLegalDistrictsSection from "@/frontend/components/ServicesCatalog/GewoLegalDistrictsSection";
import TradeDetailModal from "@/frontend/components/ServicesCatalog/TradeDetailModal";
export default function ServicesCatalogPage() {
  const router = useRouter();

  // Data states fetched from server action
  const [categories, setCategories] = useState<ServiceCategoryItem[]>([]);
  const [districts, setDistricts] = useState<ViennaDistrictCoverage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State for search query and classification filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClassification, setSelectedClassification] = useState<ClassificationFilter>("ALL");

  // State for inspecting a selected trade category
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<ServiceCategoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getServicesCatalogData().then(data => {
      if (!isMounted) return;
      if (data) {
        setCategories(data.categories || []);
        setDistricts(data.districts || []);
      } else {
        setCategories([]);
        setDistricts([]);
      }
    }).catch(() => {
      if (!isMounted) return;
      setCategories([]);
      setDistricts([]);
    }).finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter service categories in place by German, English, and Russian titles + classification
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      // Classification filter
      if (selectedClassification !== "ALL" && cat.craftClassification !== selectedClassification) {
        return false;
      }

      // Trilingual search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchEn = cat.titleEn?.toLowerCase().includes(q) || false;
        const matchDe = cat.titleDe?.toLowerCase().includes(q) || false;
        const matchRu = cat.titleRu?.toLowerCase().includes(q) || false;
        const matchKey = cat.key?.toLowerCase().includes(q) || false;
        const matchDescEn = cat.descriptionEn?.toLowerCase().includes(q) || false;
        const matchDescDe = cat.descriptionDe?.toLowerCase().includes(q) || false;
        return matchEn || matchDe || matchRu || matchKey || matchDescEn || matchDescDe;
      }
      return true;
    });
  }, [categories, searchQuery, selectedClassification]);
  const handleSelectCategory = (category: ServiceCategoryItem) => {
    setSelectedCategoryForModal(category);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleNavigateDetail = (categoryKey: string) => {
    setIsModalOpen(false);
    ServiceCategoryDetail.navigateTo(router, {
      categoryKey
    });
  };
  const handleRequestQuote = (category: ServiceCategoryItem) => {
    setIsModalOpen(false);
    ServiceCategoryDetail.navigateTo(router, {
      categoryKey: category.key
    });
  };
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedClassification("ALL");
  };
  return <main className="w-full min-h-screen bg-background text-foreground">
      {/* Segment 1: Catalog Header & Trilingual Filter Bar */}
      <CatalogHeaderFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedClassification={selectedClassification} onClassificationChange={setSelectedClassification} totalCount={categories.length} filteredCount={filteredCategories.length} />

      {isLoading ? <div className="w-full py-20 flex flex-col items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading services catalog...</p>
        </div> : <>
          {/* Segment 2: Flagship Trades Spotlight (Only shown when not heavily filtered or if search is empty) */}
          {!searchQuery && selectedClassification === "ALL" && categories.length > 0 && <FeaturedTradesShowcase categories={categories} onSelectCategory={handleSelectCategory} />}

          {/* Segment 3: All Trades Modular Architecture Matrix */}
          <TradesCatalogGrid categories={filteredCategories} onSelectCategory={handleSelectCategory} onResetFilters={handleResetFilters} />
        </>}

      {/* Segment 4: GewO 1994 Legal Boundaries & Vienna 23 Districts Logistics */}
      <GewoLegalDistrictsSection districts={districts} />

      {/* Interactive Modal: Inspect Trade Scope & Direct Price Estimation */}
      <TradeDetailModal category={selectedCategoryForModal} isOpen={isModalOpen} onClose={handleCloseModal} onNavigateDetail={handleNavigateDetail} onRequestQuote={handleRequestQuote} />
    </main>;
}
