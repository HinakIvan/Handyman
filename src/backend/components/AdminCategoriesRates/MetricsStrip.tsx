"use client";

import React from "react";
import { Wrench, Shield, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { PortfolioMetrics } from "@/backend/types/AdminCategoriesRates";
interface MetricsStripProps {
  metrics: PortfolioMetrics;
}
export default function MetricsStrip({
  metrics
}: MetricsStripProps) {
  const compliance = metrics.baselineCompliancePercent ?? 100;
  const minRate = typeof metrics.minRateRecorded === "number" ? metrics.minRateRecorded : 15;
  const total = metrics.totalActive || 0;
  const freePercent = total > 0 ? Math.round(metrics.freiesHandwerkCount / total * 100) : 0;
  return <section data-controller-name="Craft Trade Portfolio Summary" className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" data-api-unique-id='metricsstrip-rfce4432a887adb70-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
      {/* Metric 1: Total Active Trades */}
      <article className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs" data-api-unique-id='metricsstrip-r66c06d9f8bb5084c-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='metricsstrip-rd8c8d51c022ff295-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsstrip-r0ac329bdd4c5ecaa-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='metricsstrip-r3ff24977d250b8cd-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Portfolio Scope</span>
            <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground" data-api-unique-id='metricsstrip-rc56507dc4c9b2b2d-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
              Active Trade Categories
            </h3>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" data-api-unique-id='metricsstrip-r091851818010c54d-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <Wrench className="h-4 w-4" data-api-unique-id='metricsstrip-rb38c10835de8ea96-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip' />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2" data-api-unique-id='metricsstrip-r11db78d436eced38-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <span className="font-mono text-3xl font-bold tracking-tight text-foreground" data-api-unique-id='metricsstrip-r2194e479e8a18eb2-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            {metrics.totalActive}
          </span>
          <span className="text-xs text-muted-foreground" data-api-unique-id='metricsstrip-rd10ef1523df0fd90-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>in catalog</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-2 text-xs text-muted-foreground" data-api-unique-id='metricsstrip-r479b48d971fccf04-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='metricsstrip-r73341d8b83668a3d-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip' />
          <span className="truncate" data-api-unique-id='metricsstrip-r6227c139bebcc3bc-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <strong className="text-foreground" data-api-unique-id='metricsstrip-rb3c0ef32ed007f0c-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>{metrics.featuredCount}</strong> featured on platform showcase
          </span>
        </div>
      </article>

      {/* Metric 2: Craft Classification Ratio */}
      <article className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs" data-api-unique-id='metricsstrip-r27b6cc2d1dd71059-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='metricsstrip-r2f2dcb61639868c7-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsstrip-rfc4e8f60e55583e5-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='metricsstrip-rd8c1468d55991169-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Austrian GewO 1994</span>
            <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground" data-api-unique-id='metricsstrip-rc0c096d5a254ebbd-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
              Trade Regulatory Split
            </h3>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent" data-api-unique-id='metricsstrip-rd07615b22b331ea1-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <Shield className="h-4 w-4" data-api-unique-id='metricsstrip-reae2d0b849a607cf-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip' />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-3" data-api-unique-id='metricsstrip-r1b733ee2c322d987-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <div className="flex items-baseline gap-1" data-api-unique-id='metricsstrip-r78c92d40caac12ba-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <span className="font-mono text-2xl font-bold text-foreground" data-api-unique-id='metricsstrip-re90120e1aebfb927-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
              {metrics.freiesHandwerkCount}
            </span>
            <span className="text-xs text-muted-foreground" data-api-unique-id='metricsstrip-reb22502759e85a23-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Freies</span>
          </div>
          <span className="text-muted-foreground" data-api-unique-id='metricsstrip-r708745571c87e96c-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>/</span>
          <div className="flex items-baseline gap-1" data-api-unique-id='metricsstrip-rf24f372b900a325b-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <span className="font-mono text-2xl font-bold text-primary" data-api-unique-id='metricsstrip-r46a4e423aa906381-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
              {metrics.meisterKooperationCount}
            </span>
            <span className="text-xs text-muted-foreground" data-api-unique-id='metricsstrip-r354a98533692860d-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Meister</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground" data-api-unique-id='metricsstrip-r257a14333ab65063-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <span className="truncate" data-api-unique-id='metricsstrip-r2693447fb61339eb-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Freies Handwerk vs Meister-Koop.</span>
          <span className="font-mono font-medium text-foreground" data-api-unique-id='metricsstrip-rb859872587ac33d9-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            {freePercent}% free
          </span>
        </div>
      </article>

      {/* Metric 3: Minimum Statutory Baseline Rate */}
      <article className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs sm:col-span-2 xl:col-span-1" data-api-unique-id='metricsstrip-r9ee89808e65f5905-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='metricsstrip-r3c95fd0de7c9b045-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsstrip-reca628fc4ee4af07-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='metricsstrip-r4ecee4be26648124-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Statutory Baseline Compliance</span>
            <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground" data-api-unique-id='metricsstrip-ra1975b0d73b59ec6-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
              Platform Wage Floor (≥ €15/h)
            </h3>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-success/10 text-success" data-api-unique-id='metricsstrip-r722a32e631b37793-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <CheckCircle2 className="h-4 w-4" data-api-unique-id='metricsstrip-r4676c53774733690-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip' />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-2" data-api-unique-id='metricsstrip-r0fbfd4ec4bd7a5d8-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <div className="flex items-baseline gap-1" data-api-unique-id='metricsstrip-r8f6a0c8ab6984b09-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            <span className="font-mono text-3xl font-bold tracking-tight text-foreground" data-api-unique-id='metricsstrip-rb0cda6abb15ed70a-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
              €{minRate.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground" data-api-unique-id='metricsstrip-r38ed6f44330e6ac2-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>/h min</span>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-success px-2 py-0.5 text-xs font-semibold text-success-foreground whitespace-nowrap" data-api-unique-id='metricsstrip-r9ba16e31dc39450b-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
            {compliance}% Compliant
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-2 text-xs text-muted-foreground" data-api-unique-id='metricsstrip-rdedd7321bfb4cf75-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>
          <TrendingUp className="h-3.5 w-3.5 text-success shrink-0" data-api-unique-id='metricsstrip-rc8242c4631642471-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip' />
          <span className="truncate" data-api-unique-id='metricsstrip-r5cde9d9d03181acb-s2092366844' data-api-unique-page-name='src/backend/components/AdminCategoriesRates/MetricsStrip'>Strict threshold intercepting sub-15 €/h submissions</span>
        </div>
      </article>
    </section>;
}