"use client";

import React from "react";
import { ShieldCheck, Clock, FileCheck2, Percent } from "lucide-react";
import { ComplianceStats } from "@/backend/types/AdminComplianceChecklist";
interface ComplianceOverviewCardsProps {
  stats: ComplianceStats;
}
export default function ComplianceOverviewCards({
  stats
}: ComplianceOverviewCardsProps) {
  const total = stats?.total ?? 0;
  const completed = stats?.completed ?? 0;
  const inReview = stats?.inReview ?? 0;
  const pending = stats?.pending ?? 0;
  const readinessScore = stats?.readinessScore ?? 0;
  return <div data-controller-name="Compliance Overview Metrics" className="grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4" data-api-unique-id='complianceoverviewcards-r2adc6946a7141d63-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
      {/* Total Requirements */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-soft" data-api-unique-id='complianceoverviewcards-r1589a74a5e15f192-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
        <div className="flex items-start justify-between gap-2" data-api-unique-id='complianceoverviewcards-re8783ba6d9f69e24-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='complianceoverviewcards-r81f68861cd122512-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='complianceoverviewcards-re198751bbfbe2b23-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Statutory Mandates</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='complianceoverviewcards-r30ec6a9ba7be2ccb-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='complianceoverviewcards-r1a01655740df85d6-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                {total}
              </span>
              <span className="text-xs text-muted-foreground" data-api-unique-id='complianceoverviewcards-rd6646499d694859c-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Austria GewO/UStG</span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground" data-api-unique-id='complianceoverviewcards-r2bf82add82ae10e6-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <FileCheck2 className="h-5 w-5 text-primary" data-api-unique-id='complianceoverviewcards-rb497bcf538c4afa3-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground" data-api-unique-id='complianceoverviewcards-r03f8177cad369a63-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <span data-api-unique-id='complianceoverviewcards-r30858b66ca3ca462-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Scope: Federal Registry</span>
          <span className="font-mono font-medium text-foreground" data-api-unique-id='complianceoverviewcards-rde54160a3728c494-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>4 Active Keys</span>
        </div>
      </div>

      {/* Completed Verification */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-soft" data-api-unique-id='complianceoverviewcards-r2de6e4f8d095c243-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
        <div className="flex items-start justify-between gap-2" data-api-unique-id='complianceoverviewcards-r55f66affb41a3fe9-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='complianceoverviewcards-rb7bf4dcedb528581-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='complianceoverviewcards-re0d2ae404635d36a-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Verified & Completed</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='complianceoverviewcards-r9b7bcb5ffc86b1ac-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='complianceoverviewcards-rdb842c1ef11fee51-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                {completed}
              </span>
              <span className="inline-flex shrink-0 items-center rounded-full bg-success px-2 py-0.5 text-[11px] font-semibold text-success-foreground whitespace-nowrap" data-api-unique-id='complianceoverviewcards-r0ac79ded706d863b-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                COMPLETED
              </span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-success/10 text-success" data-api-unique-id='complianceoverviewcards-r1c4098f1420dc33f-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <ShieldCheck className="h-5 w-5" data-api-unique-id='complianceoverviewcards-ra32b94f34a62a91b-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground" data-api-unique-id='complianceoverviewcards-rae88a9290db528f1-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <span data-api-unique-id='complianceoverviewcards-r6d6239fd193f22a4-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Certified Items</span>
          <span className="font-mono font-medium text-foreground" data-api-unique-id='complianceoverviewcards-r26db0e747b956b30-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            {completed} of {total}
          </span>
        </div>
      </div>

      {/* In Review & Pending */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-soft" data-api-unique-id='complianceoverviewcards-r2283efd0c04be5b2-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
        <div className="flex items-start justify-between gap-2" data-api-unique-id='complianceoverviewcards-r215ad255869739c5-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='complianceoverviewcards-rc2f6e2ae03624697-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='complianceoverviewcards-r94b18d73fe2e6de2-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Action Required</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='complianceoverviewcards-r14ba3795bda3e6b1-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='complianceoverviewcards-rdd05629ec2f599c9-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                {inReview + pending}
              </span>
              <div className="flex flex-wrap gap-1" data-api-unique-id='complianceoverviewcards-r71648bab366d4ed0-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                <span className="inline-flex shrink-0 items-center rounded-full bg-warning px-2 py-0.5 text-[11px] font-semibold text-warning-foreground whitespace-nowrap" data-api-unique-id='complianceoverviewcards-r155210824aa4b4d5-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                  {inReview} REVIEW
                </span>
                <span className="inline-flex shrink-0 items-center rounded-full bg-destructive px-2 py-0.5 text-[11px] font-semibold text-destructive-foreground whitespace-nowrap" data-api-unique-id='complianceoverviewcards-r6df59ef2444530fa-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                  {pending} PENDING
                </span>
              </div>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-warning/10 text-warning" data-api-unique-id='complianceoverviewcards-r7854370911ef23a3-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <Clock className="h-5 w-5" data-api-unique-id='complianceoverviewcards-r4bbcc6b1dbb77f24-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground" data-api-unique-id='complianceoverviewcards-r318e8db16dbfb94d-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <span data-api-unique-id='complianceoverviewcards-r212754d41fa1cf17-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Audit Priority</span>
          <span className="font-mono font-medium text-destructive" data-api-unique-id='complianceoverviewcards-r3f4cd45c1ff76f7f-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Requires Verification</span>
        </div>
      </div>

      {/* Statutory Readiness Score */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-soft" data-api-unique-id='complianceoverviewcards-ra35da2e9413ab949-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
        <div className="flex items-start justify-between gap-2" data-api-unique-id='complianceoverviewcards-ra39c96618d97c448-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='complianceoverviewcards-r1de29cde3b93be96-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='complianceoverviewcards-r9e52645481b1e765-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Statutory Readiness</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='complianceoverviewcards-r21aed9faac589fa2-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='complianceoverviewcards-r9066dd1cada27c98-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
                {readinessScore}%
              </span>
              <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='complianceoverviewcards-rcc79aa0e86bbee81-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Austrian Standards</span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground" data-api-unique-id='complianceoverviewcards-r12645dbd76a86390-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <Percent className="h-5 w-5" data-api-unique-id='complianceoverviewcards-r73a34c0e6c61bc78-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards' />
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="mt-3 flex min-w-0 flex-col gap-1.5 border-t border-border pt-2" data-api-unique-id='complianceoverviewcards-r81b9aac054031b1b-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted" data-api-unique-id='complianceoverviewcards-r644e7d9f2387e17a-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <div className={`h-full transition-all duration-300 ${readinessScore === 100 ? "bg-success" : readinessScore >= 50 ? "bg-primary" : "bg-warning"}`} style={{
            width: `${readinessScore}%`
          }} data-api-unique-id='complianceoverviewcards-r1a7fba688232010b-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards' />
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground" data-api-unique-id='complianceoverviewcards-r60089272c376d3fd-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
            <span data-api-unique-id='complianceoverviewcards-r83e36a3cc3280917-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>Vienna Commercial Court</span>
            <span className="font-mono font-semibold text-foreground" data-api-unique-id='complianceoverviewcards-r060c0cab3ab3bf10-s1581701933' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceOverviewCards'>
              {readinessScore === 100 ? "FULLY COMPLIANT" : "AUDIT IN PROGRESS"}
            </span>
          </div>
        </div>
      </div>
    </div>;
}