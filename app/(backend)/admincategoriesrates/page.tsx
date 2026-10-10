"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ServiceCategoryItem, PortfolioMetrics, ClassificationFilter, FeaturedFilter, LanguageDisplay, SortField, SortDirection } from "@/backend/types/AdminCategoriesRates";
import { getServiceCategories, getPortfolioMetrics, updateCategoryRateConfiguration, toggleCategoryFeatured } from "@/backend/actions/AdminCategoriesRates";
import { AdminOperationsDashboard } from "@/backend/route-params";
import HeaderBar from "@/backend/components/AdminCategoriesRates/HeaderBar";
import MetricsStrip from "@/backend/components/AdminCategoriesRates/MetricsStrip";
import FilterBar from "@/backend/components/AdminCategoriesRates/FilterBar";
import CategoryTable from "@/backend/components/AdminCategoriesRates/CategoryTable";
import CategoryEditDrawer from "@/backend/components/AdminCategoriesRates/CategoryEditDrawer";
const DEFAULT_METRICS: PortfolioMetrics = {
  totalActive: 0,
  freiesHandwerkCount: 0,
  meisterKooperationCount: 0,
  baselineCompliancePercent: 100,
  minRateRecorded: 15.0,
  featuredCount: 0
};
export default function AdminCategoriesRatesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ServiceCategoryItem[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics>(DEFAULT_METRICS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [classificationFilter, setClassificationFilter] = useState<ClassificationFilter>("ALL");
  const [featuredFilter, setFeaturedFilter] = useState<FeaturedFilter>("ALL");
  const [languageDisplay, setLanguageDisplay] = useState<LanguageDisplay>("ALL");
  const [sortField, setSortField] = useState<SortField>("displayOrder");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Drawer Edit state
  const [editingCategory, setEditingCategory] = useState<ServiceCategoryItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Initial data loading from server actions
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setIsLoading(true);
        const [categoriesData, metricsData] = await Promise.all([getServiceCategories(), getPortfolioMetrics()]);
        if (isMounted) {
          setCategories(categoriesData || []);
          if (metricsData) {
            setMetrics(metricsData);
          }
        }
      } catch (err) {
        console.error("Failed to load service categories or metrics:", err);
        toast.error("Failed to load category rate data.");
        if (isMounted) {
          setCategories([]);
          setMetrics(DEFAULT_METRICS);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      // Classification filter
      if (classificationFilter !== "ALL" && cat.craftClassification !== classificationFilter) {
        return false;
      }

      // Featured filter
      if (featuredFilter === "FEATURED_ONLY" && !cat.isFeatured) {
        return false;
      }
      if (featuredFilter === "STANDARD_ONLY" && cat.isFeatured) {
        return false;
      }

      // Search text filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchKey = cat.key ? cat.key.toLowerCase().includes(query) : false;
        const matchDe = cat.titleDe ? cat.titleDe.toLowerCase().includes(query) : false;
        const matchEn = cat.titleEn ? cat.titleEn.toLowerCase().includes(query) : false;
        const matchRu = cat.titleRu ? cat.titleRu.toLowerCase().includes(query) : false;
        const matchLead = cat.leadArtisan ? cat.leadArtisan.toLowerCase().includes(query) : false;
        if (!matchKey && !matchDe && !matchEn && !matchRu && !matchLead) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      let valA: unknown = a[sortField];
      let valB: unknown = b[sortField];
      if (typeof valA === "string" && typeof valB === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [categories, classificationFilter, featuredFilter, searchQuery, sortField, sortDirection]);

  // Handle sort column click
  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Open Edit drawer
  const handleOpenEdit = (category: ServiceCategoryItem) => {
    setEditingCategory(category);
    setIsDrawerOpen(true);
  };

  // Close Edit drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCategory(null);
  };

  // Save updated category via server action
  const handleSaveCategory = async (updated: ServiceCategoryItem) => {
    if (updated.baselineHourlyRate < 15.0) {
      toast.error("Validation error: Baseline rate must be at least €15.00/h under Austrian GewO rules.");
      return;
    }
    try {
      const persistedCategory = await updateCategoryRateConfiguration({
        id: updated.id,
        baselineHourlyRate: updated.baselineHourlyRate,
        typicalRangeEur: updated.typicalRangeEur,
        craftClassification: updated.craftClassification,
        leadArtisan: updated.leadArtisan,
        isFeatured: updated.isFeatured,
        titleDe: updated.titleDe,
        titleEn: updated.titleEn,
        titleRu: updated.titleRu
      });
      setCategories(prev => prev.map((item, index) => item.id === persistedCategory.id ? persistedCategory : item));
      const updatedMetrics = await getPortfolioMetrics();
      if (updatedMetrics) {
        setMetrics(updatedMetrics);
      }
      setIsDrawerOpen(false);
      setEditingCategory(null);
      toast.success(`Category "${persistedCategory.titleEn}" rates & GewO settings updated successfully.`);
    } catch (err) {
      console.error("Failed to update category rate configuration:", err);
      toast.error("Failed to update category rate configuration.");
    }
  };

  // Toggle featured status directly in the table
  const handleToggleFeatured = async (category: ServiceCategoryItem) => {
    const nextFeatured = !category.isFeatured;
    try {
      const updated = await toggleCategoryFeatured({
        id: category.id,
        isFeatured: nextFeatured
      });
      setCategories(prev => prev.map((item, index) => item.id === updated.id ? updated : item));
      const updatedMetrics = await getPortfolioMetrics();
      if (updatedMetrics) {
        setMetrics(updatedMetrics);
      }
      if (nextFeatured) {
        toast.info(`"${category.titleEn}" promoted to Featured Showcase.`);
      } else {
        toast.info(`"${category.titleEn}" moved to standard catalog.`);
      }
    } catch (err) {
      console.error("Failed to toggle category featured status:", err);
      toast.error("Failed to toggle featured showcase status.");
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setClassificationFilter("ALL");
    setFeaturedFilter("ALL");
    setLanguageDisplay("ALL");
  };
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 flex flex-col gap-5">
      {/* 0. Top Operational Header & Dashboard Navigation Bar */}
      <HeaderBar onBackToDashboard={() => {
      AdminOperationsDashboard.navigateTo(router);
    }} />

      {/* 1. Craft Trade Portfolio Metrics Strip (3 Cards) */}
      <MetricsStrip metrics={metrics} />

      {/* 2. Operations Management Master Data Table Section */}
      <section data-controller-name="Trade Categories Management Ledger" className="flex min-w-0 flex-col rounded-lg border border-border bg-card shadow-xs overflow-hidden">
        {/* Table Filters and Controls */}
        <FilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} classificationFilter={classificationFilter} onClassificationChange={setClassificationFilter} featuredFilter={featuredFilter} onFeaturedChange={setFeaturedFilter} languageDisplay={languageDisplay} onLanguageChange={setLanguageDisplay} onResetFilters={handleResetFilters} totalFiltered={filteredCategories.length} totalCategories={categories.length} />

        {/* Dense Operations Table with Monospace Currency & Austrian GewO Badges */}
        {isLoading ? <div className="flex h-64 items-center justify-center p-8 text-sm text-muted-foreground">
            Loading craft categories and rate structures...
          </div> : <CategoryTable categories={filteredCategories} sortField={sortField} sortDirection={sortDirection} onSortChange={handleSortChange} languageDisplay={languageDisplay} onEditCategory={handleOpenEdit} onToggleFeatured={handleToggleFeatured} />}
      </section>

      {/* 3. Detailed Rate & GewO Configuration Drawer (Modal Slide-out) */}
      <CategoryEditDrawer category={editingCategory} isOpen={isDrawerOpen} onClose={handleCloseDrawer} onSave={handleSaveCategory} />
    </div>;
}
