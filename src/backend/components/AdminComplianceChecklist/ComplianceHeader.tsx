"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Scale } from "lucide-react";
import { AdminOperationsDashboard } from "@/backend/route-params";
export default function ComplianceHeader() {
  const router = useRouter();
  return <div className="flex min-w-0 flex-col gap-3" data-api-unique-id='complianceheader-re5a2dba7331f4766-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
      {/* Breadcrumb return navigation to B01 Admin Operations Dashboard */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground" data-api-unique-id='complianceheader-ra1aad73fd34dfae2-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
        <button type="button" onClick={() => AdminOperationsDashboard.navigateTo(router)} className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Navigate back to main Admin Operations Dashboard [B01]" data-api-unique-id='complianceheader-r6e8598a7d299503d-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
          <ArrowLeft className="h-3.5 w-3.5" data-api-unique-id='complianceheader-r0181d125fef41baf-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader' />
          <span data-api-unique-id='complianceheader-r0fcf8624c6a3e7bf-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>Dashboard & Leads Pipeline [B01]</span>
        </button>
        <span data-api-unique-id='complianceheader-r2f5ed4f137c285e5-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>/</span>
        <span className="font-semibold text-foreground" data-api-unique-id='complianceheader-r665fb849882d407f-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>Compliance Checklist</span>
      </div>

      {/* Title and Authority Banner */}
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='complianceheader-r033a41aa967940f9-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
        <div className="min-w-0" data-api-unique-id='complianceheader-rd8b2c3991b950775-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
          <div className="flex flex-wrap items-center gap-2.5" data-api-unique-id='complianceheader-rbf53180ca0e26b41-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground" data-api-unique-id='complianceheader-rec1b22ee2ebb00a3-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
              <Scale className="h-4.5 w-4.5" data-api-unique-id='complianceheader-r0e685bd81d32f86e-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader' />
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl" data-api-unique-id='complianceheader-rf6d39077b1f38f4f-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
              Austrian Commercial Compliance Ledger
            </h1>
            <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground whitespace-nowrap" data-api-unique-id='complianceheader-rb7c7276d03a44ff2-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
              GewO 1994 / UStG Audit
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='complianceheader-rf179ea622df4e087-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
            Statutory commercial prerequisite verification and official registry telemetry under Austrian Gewerbeordnung 1994 and UStG § 27 standards.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2" data-api-unique-id='complianceheader-r00f4410fbacb92f0-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
          <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground" data-api-unique-id='complianceheader-r60382f2b9d55c9bd-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>
            <ShieldCheck className="h-4 w-4 text-success" data-api-unique-id='complianceheader-red4d1d839c945f83-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader' />
            <span data-api-unique-id='complianceheader-r2cc054742cf70bf0-s3576555533' data-api-unique-page-name='src/backend/components/AdminComplianceChecklist/ComplianceHeader'>Operations Administrator Access</span>
          </div>
        </div>
      </div>
    </div>;
}