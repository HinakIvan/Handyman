"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderControls from "@/backend/components/AdminOperationsDashboard/HeaderControls";
import MetricsRail from "@/backend/components/AdminOperationsDashboard/MetricsRail";
import QuoteRequestsTable from "@/backend/components/AdminOperationsDashboard/QuoteRequestsTable";
import CategoryStatusPanel from "@/backend/components/AdminOperationsDashboard/CategoryStatusPanel";
import SetupChecklistPanel from "@/backend/components/AdminOperationsDashboard/SetupChecklistPanel";
import { AdminQuoteDetail } from "@/backend/route-params";
import { getDashboardOverview, updateQuoteStatus, updateServiceCategoryRate, updateSetupChecklistItem } from "@/backend/actions/AdminOperationsDashboard";
import type { QuoteRequestItem, ServiceCategoryItem, SetupChecklistItemData, DashboardMetrics, LanguageCode, FilterState, QuoteStatus, ServiceCategoryKey, ChecklistStatus } from "@/backend/types/AdminOperationsDashboard";
const DEFAULT_METRICS: DashboardMetrics = {
  totalInquiries: 0,
  totalInquiriesTrend: "+0%",
  pendingEstimates: 0,
  pendingEstimatesUrgent: 0,
  activeCategories: 0,
  totalCategories: 0,
  responseSlaMinutes: 0,
  slaTargetMinutes: 45,
  slaPercentMet: 0
};
export default function AdminOperationsDashboard() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<LanguageCode>("DE");
  const [timeRange, setTimeRange] = useState<"TODAY" | "WEEK" | "MONTH">("TODAY");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("");
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequestItem[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryItem[]>([]);
  const [setupChecklistItems, setSetupChecklistItems] = useState<SetupChecklistItemData[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>(DEFAULT_METRICS);
  const [filters, setFilters] = useState<FilterState>({
    status: "ALL",
    category: "ALL",
    district: "ALL",
    searchQuery: "",
    timeRange: "TODAY",
    urgencyOnly: false
  });
  const fetchOverview = useCallback(async (showSuccessToast = false) => {
    setIsRefreshing(true);
    try {
      const data = await getDashboardOverview({
        timeRange
      });
      if (data) {
        setQuoteRequests(data.quoteRequests || []);
        setServiceCategories(data.serviceCategories || []);
        setSetupChecklistItems(data.setupChecklistItems || []);
        if (data.metrics) {
          setMetrics(data.metrics);
        }
        if (data.lastSyncTime) {
          setLastSyncTime(data.lastSyncTime);
        }
        if (showSuccessToast) {
          toast.success(`Operations dispatch desk synchronized (${data.lastSyncTime})`);
        }
      }
    } catch {
      toast.error("Failed to load dashboard overview data");
    } finally {
      setIsRefreshing(false);
    }
  }, [timeRange]);
  useEffect(() => {
    fetchOverview(false);
  }, [fetchOverview]);
  const handleRefresh = () => {
    fetchOverview(true);
  };
  const handleTimeRangeChange = (val: "TODAY" | "WEEK" | "MONTH") => {
    setTimeRange(val);
    setFilters(prev => ({
      ...prev,
      timeRange: val
    }));
  };
  const handleStatusUpdate = async (id: string, newStatus: QuoteStatus) => {
    try {
      const updated = await updateQuoteStatus({
        id,
        status: newStatus
      });
      if (updated) {
        setQuoteRequests(prev => prev.map((r, index) => r.id === id ? {
          ...r,
          status: updated.status
        } : r));
        toast.success(`Request ${id} transitioned to status: ${updated.status}`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update quote request status");
    }
  };
  const handleSelectRequestForDetail = (req: QuoteRequestItem) => {
    AdminQuoteDetail.navigateToDetail(router, {
      quoteRequestId: req.id
    });
  };
  const handleUpdateCategoryRate = async (id: string, newRate: number, newArtisan: string) => {
    try {
      const updated = await updateServiceCategoryRate({
        id,
        baselineHourlyRate: newRate,
        leadArtisan: newArtisan
      });
      if (updated) {
        setServiceCategories(prev => prev.map((cat, index) => cat.id === id ? {
          ...cat,
          baselineHourlyRate: updated.baselineHourlyRate,
          leadArtisan: updated.leadArtisan,
          typicalRangeEur: updated.typicalRangeEur
        } : cat));
        toast.success("Service category rate and artisan team updated.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update category rate");
    }
  };
  const handleUpdateChecklistStatus = async (id: string, newStatus: ChecklistStatus, newFieldValue: string) => {
    try {
      const updated = await updateSetupChecklistItem({
        id,
        status: newStatus,
        fieldValue: newFieldValue
      });
      if (updated) {
        setSetupChecklistItems(prev => prev.map((item, index) => item.id === id ? {
          ...item,
          status: updated.status,
          fieldValue: updated.fieldValue,
          lastUpdated: updated.lastUpdated
        } : item));
        toast.success("Austrian statutory checklist entry updated.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update checklist item");
    }
  };
  const handleFilterByCategory = (categoryKey: ServiceCategoryKey) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryKey ? "ALL" : categoryKey
    }));
  };
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 bg-background text-foreground">
      <div className="container mx-auto flex min-w-0 flex-col gap-4">
        <HeaderControls currentLang={currentLang} onLanguageChange={setCurrentLang} timeRange={timeRange} onTimeRangeChange={handleTimeRangeChange} urgencyOnly={filters.urgencyOnly} onUrgencyToggle={val => setFilters(prev => ({
        ...prev,
        urgencyOnly: val
      }))} onRefresh={handleRefresh} isRefreshing={isRefreshing} lastSyncTime={lastSyncTime} />

        <MetricsRail metrics={metrics} currentLang={currentLang} />

        <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-12">
          <section className="min-w-0 xl:col-span-8 flex flex-col gap-4">
            <QuoteRequestsTable requests={quoteRequests} currentLang={currentLang} filters={filters} onFilterChange={setFilters} onStatusUpdate={handleStatusUpdate} onSelectRequestForDetail={handleSelectRequestForDetail} />
          </section>

          <aside className="min-w-0 xl:col-span-4 flex flex-col gap-4">
            <CategoryStatusPanel categories={serviceCategories} currentLang={currentLang} onFilterByCategory={handleFilterByCategory} onUpdateCategoryRate={handleUpdateCategoryRate} />

            <SetupChecklistPanel checklist={setupChecklistItems} currentLang={currentLang} onUpdateChecklistStatus={handleUpdateChecklistStatus} />
          </aside>
        </div>
      </div>
    </div>;
}
