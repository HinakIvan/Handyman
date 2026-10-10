"use client";

import React, { useState, useEffect, useMemo } from "react";
import ComplianceHeader from "@/backend/components/AdminComplianceChecklist/ComplianceHeader";
import ComplianceOverviewCards from "@/backend/components/AdminComplianceChecklist/ComplianceOverviewCards";
import ComplianceTable from "@/backend/components/AdminComplianceChecklist/ComplianceTable";
import AuditConfigForm from "@/backend/components/AdminComplianceChecklist/AuditConfigForm";
import ViennaLegalGuidelines from "@/backend/components/AdminComplianceChecklist/ViennaLegalGuidelines";
import { getComplianceChecklist, updateComplianceItem } from "@/backend/actions/AdminComplianceChecklist";
import { SetupChecklistItem, ComplianceStats, ComplianceStatus } from "@/backend/types/AdminComplianceChecklist";
const INITIAL_STATS: ComplianceStats = {
  total: 0,
  completed: 0,
  inReview: 0,
  pending: 0,
  readinessScore: 0
};
export default function AdminComplianceChecklistPage() {
  const [items, setItems] = useState<SetupChecklistItem[]>([]);
  const [stats, setStats] = useState<ComplianceStats>(INITIAL_STATS);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(true);

  // Load statutory compliance checklist items and overview stats
  useEffect(() => {
    let isMounted = true;
    async function loadChecklistData() {
      setLoading(true);
      try {
        const data = await getComplianceChecklist();
        if (isMounted && data) {
          setItems(data.items || []);
          setStats(data.stats || INITIAL_STATS);
          if (data.items && data.items.length > 0) {
            setSelectedItemId(prev => prev || data.items[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load compliance checklist:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadChecklistData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derive active selected item; fallback to first item
  const selectedItem = useMemo(() => {
    if (!items.length) return null;
    return items.find(item => item.id === selectedItemId) || items[0] || null;
  }, [items, selectedItemId]);

  // Update item handler persisted via updateComplianceItem action
  const handleUpdateItem = async (id: string, fieldValue: string, status: ComplianceStatus) => {
    try {
      const res = await updateComplianceItem({
        id,
        fieldValue,
        status
      });
      if (res && res.item) {
        setItems(prevItems => prevItems.map((item, index) => item.id === id ? res.item : item));
        if (res.stats) {
          setStats(res.stats);
        }
      }
    } catch (err) {
      console.error("Failed to update compliance item:", err);
    }
  };
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 flex flex-col gap-5">
      {/* 1. Header & Breadcrumb Navigation */}
      <ComplianceHeader />

      {/* 2. Overview Metrics Band (4 tiles & readiness progress bar) */}
      <ComplianceOverviewCards stats={stats} />

      {/* 3. Main Workspace Grid: Master Checklist Ledger (Left) + Audit Workspace (Right) */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-12 items-start">
        {/* Left Column: Statutory Requirements Table Ledger (xl:col-span-7) */}
        <div className="min-w-0 xl:col-span-7 flex flex-col gap-4">
          <ComplianceTable items={items} selectedItem={selectedItem} onSelectItem={item => setSelectedItemId(item.id)} statusFilter={statusFilter} onFilterChange={setStatusFilter} />

          {/* Vienna Legal Guidelines & Information Box */}
          <ViennaLegalGuidelines />
        </div>

        {/* Right Column: Audit Configuration & Adjudication Form (xl:col-span-5) */}
        <div className="min-w-0 xl:col-span-5 flex flex-col gap-4">
          <AuditConfigForm selectedItem={selectedItem} onUpdateItem={handleUpdateItem} />
        </div>
      </div>
    </div>;
}
