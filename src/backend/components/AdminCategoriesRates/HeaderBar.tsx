"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Scale, Award } from "lucide-react";
import { AdminOperationsDashboard } from "@/backend/route-params";
interface HeaderBarProps {
  onBackToDashboard?: () => void;
}
export default function HeaderBar({
  onBackToDashboard
}: HeaderBarProps) {
  const router = useRouter();
  const handleBack = () => {
    if (onBackToDashboard) {
      onBackToDashboard();
    } else {
      AdminOperationsDashboard.navigateTo(router);
    }
  };
  return <header className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs" data-api-unique-id='headerbar-r6b8f69ffc4209500-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
      <div className="flex min-w-0 flex-col gap-2" data-api-unique-id='headerbar-r9f1ad8bd93e7ebb1-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground" data-api-unique-id='headerbar-r78529f323418ccb2-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
          <button type="button" onClick={handleBack} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" title="Navigate to B01 Admin Operations Dashboard" data-api-unique-id='headerbar-rbc31c6cb90360fe8-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" data-api-unique-id='headerbar-r86c922f134d7d15b-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar' />
            <span data-api-unique-id='headerbar-r1abb8e23ed55b5cf-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>Zurück zum Dashboard [B01]</span>
          </button>
          <span className="text-border" data-api-unique-id='headerbar-r84cc27811781e010-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>/</span>
          <span className="font-mono text-[11px] text-muted-foreground" data-api-unique-id='headerbar-r7512c13931bce09c-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>VIENNA-OPERATIONS-B03</span>
        </div>

        <div className="min-w-0" data-api-unique-id='headerbar-r2372b9ac24b91342-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
          <h1 className="font-header text-xl font-bold tracking-tight text-foreground sm:text-2xl" data-api-unique-id='headerbar-r53e135b4e89ea94b-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
            Trade Categories & Hourly Rates Ledger
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='headerbar-rd9aebdb4bccb3f2d-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
            Vienna trade guild (GewO 1994) category catalog, statutory wage floor enforcement (min. €15.00/h), and master craft partnership allocations.
          </p>
        </div>
      </div>

      {/* Compliance Status and Regulation Tags */}
      <div className="flex min-w-0 flex-wrap items-center gap-2 border-t border-border pt-3" data-api-unique-id='headerbar-r51a6ec9f5eb95d6f-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground whitespace-nowrap" data-api-unique-id='headerbar-ra49d31b413ee40d3-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" data-api-unique-id='headerbar-r91e2c462339b548c-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar' />
          <span data-api-unique-id='headerbar-r38b28a5fd3c81d54-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>Austrian GewO 1994 Active</span>
        </span>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success px-2.5 py-0.5 text-xs font-medium text-success-foreground whitespace-nowrap" data-api-unique-id='headerbar-r096580898998c51d-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
          <Scale className="h-3.5 w-3.5 shrink-0" data-api-unique-id='headerbar-rad2a5500f0975b1c-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar' />
          <span data-api-unique-id='headerbar-r56bacc08b8182ca2-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>Statutory Floor: ≥ €15.00/h Enforced</span>
        </span>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground whitespace-nowrap border border-border" data-api-unique-id='headerbar-r912e0df17e5a57f9-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>
          <Award className="h-3.5 w-3.5 shrink-0" data-api-unique-id='headerbar-r3290176e19c15284-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar' />
          <span data-api-unique-id='headerbar-ra6aabba7c49dae2b-s3377485891' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/HeaderBar'>WKO Vienna Guild Roster v4.2</span>
        </span>
      </div>
    </header>;
}