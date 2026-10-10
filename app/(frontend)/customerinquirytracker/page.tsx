"use client";

import React, { useState, useEffect, useMemo } from "react";
import TrackerHeroHeader from "@/frontend/components/CustomerInquiryTracker/TrackerHeroHeader";
import MetricsOverview from "@/frontend/components/CustomerInquiryTracker/MetricsOverview";
import InquiryToolbar from "@/frontend/components/CustomerInquiryTracker/InquiryToolbar";
import InquiryList from "@/frontend/components/CustomerInquiryTracker/InquiryList";
import InspectionPanel from "@/frontend/components/CustomerInquiryTracker/InspectionPanel";
import { getCustomerInquiries } from "@/frontend/actions/CustomerInquiryTracker";
import type { QuoteRequest, InquiryStatus, SortOption, InquiryMetrics } from "@/frontend/types/CustomerInquiryTracker";
export default function CustomerInquiryTrackerPage() {
  const [inquiries, setInquiries] = useState<QuoteRequest[]>([]);
  const [metrics, setMetrics] = useState<InquiryMetrics>({
    totalSubmitted: 0,
    activeReview: 0,
    inProgress: 0,
    completed: 0
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusTab, setStatusTab] = useState<"ALL" | InquiryStatus>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const result = await getCustomerInquiries();
        if (isMounted && result) {
          const records = result.inquiries || [];
          setInquiries(records);
          if (result.metrics) {
            setMetrics(result.metrics);
          }
          if (records.length > 0) {
            setSelectedId(prev => prev ?? records[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch customer inquiries:", err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Tab counts
  const statusCounts = useMemo(() => {
    const counts: Record<"ALL" | InquiryStatus, number> = {
      ALL: inquiries.length,
      NEW: 0,
      CONTACTED: 0,
      ESTIMATE_SENT: 0,
      QUOTED: 0,
      SCHEDULED: 0,
      COMPLETED: 0
    };
    for (const item of inquiries) {
      if (counts[item.status] !== undefined) {
        counts[item.status] = (counts[item.status] || 0) + 1;
      }
    }
    return counts;
  }, [inquiries]);

  // Filter & Sort
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(item => {
      // Status filter
      if (statusTab !== "ALL" && item.status !== statusTab) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCode = item.trackingCode?.toLowerCase().includes(q);
        const matchTitle = item.taskTitle?.toLowerCase().includes(q);
        const matchDesc = item.taskDescription?.toLowerCase().includes(q);
        const matchDist = item.district?.districtName?.toLowerCase().includes(q);
        if (!matchCode && !matchTitle && !matchDesc && !matchDist) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "date-asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "urgency") {
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "budget-desc") {
        return Number(b.estimatedBudgetEur) - Number(a.estimatedBudgetEur);
      }
      return 0;
    });
  }, [inquiries, statusTab, searchQuery, sortBy]);

  // Currently inspected quote
  const selectedInquiry = useMemo(() => {
    if (!selectedId) return filteredInquiries[0] || null;
    return inquiries.find(item => item.id === selectedId) || filteredInquiries[0] || null;
  }, [selectedId, inquiries, filteredInquiries]);
  const handleSelectInquiry = (inquiry: QuoteRequest) => {
    setSelectedId(inquiry.id);
    setIsMobileDrawerOpen(true);
  };
  const handleMetricClick = (group: "ALL" | "REVIEW" | "IN_PROGRESS" | "COMPLETED") => {
    if (group === "ALL") {
      setStatusTab("ALL");
    } else if (group === "REVIEW") {
      setStatusTab("NEW");
    } else if (group === "IN_PROGRESS") {
      setStatusTab("SCHEDULED");
    } else if (group === "COMPLETED") {
      setStatusTab("COMPLETED");
    }
  };
  return <div className="w-full bg-background text-foreground min-h-screen py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* SECTION 1: Page Hero & Header */}
        <TrackerHeroHeader />

        {/* SECTION 2: Stone Metric Reading Bar (4 Cards) */}
        <MetricsOverview metrics={metrics} activeFilterTab={statusTab} onMetricClick={handleMetricClick} />

        {/* SECTION 3: Workspace Area (Combined Toolbar & Two-Column Workspace) */}
        <section data-controller-name="Inquiries Workspace" className="space-y-4">
          {/* Integrated search and lifecycle status tabs */}
          <InquiryToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} statusTab={statusTab} onStatusTabChange={setStatusTab} sortBy={sortBy} onSortByChange={setSortBy} statusCounts={statusCounts} />

          {/* 7:5 Primary Work Surface (Left: Ledger List, Right: Blueprint Dossier) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Ledger: 7 Cols */}
            <div className="lg:col-span-7 min-w-0">
              <InquiryList inquiries={filteredInquiries} selectedId={selectedInquiry?.id ?? null} onSelectInquiry={handleSelectInquiry} />
            </div>

            {/* Right Dossier Panel: 5 Cols (Sticky on Desktop) */}
            <div className="hidden lg:block lg:col-span-5 min-w-0">
              <InspectionPanel inquiry={selectedInquiry} />
            </div>
          </div>
        </section>

        {/* Mobile Slide-over Drawer / Sheet for Blueprint Dossier on screens < 1024px */}
        {isMobileDrawerOpen && selectedInquiry && <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-background/80 backdrop-blur-sm">
            <div className="w-full max-h-[90vh] overflow-y-auto bg-card text-card-foreground border-t border-border rounded-t-xl shadow-elevated p-2">
              <InspectionPanel inquiry={selectedInquiry} onCloseMobile={() => setIsMobileDrawerOpen(false)} />
            </div>
          </div>}
      </div>
    </div>;
}
