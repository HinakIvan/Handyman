"use client";

import React from "react";
import { FileText, Clock, Hammer, ShieldCheck, TrendingUp, AlertCircle, Percent } from "lucide-react";
import type { DashboardMetrics, LanguageCode } from "@/backend/types/AdminOperationsDashboard";
interface MetricsRailProps {
  metrics: DashboardMetrics;
  currentLang: LanguageCode;
}
export default function MetricsRail({
  metrics,
  currentLang
}: MetricsRailProps) {
  const labels: Record<LanguageCode, {
    totalQuotes: string;
    inflowSub: string;
    pendingEstimates: string;
    urgentTag: string;
    oldestInqueue: string;
    activeCategories: string;
    baselineCompliant: string;
    pricingBaseline: string;
    responseSla: string;
    slaSub: string;
    slaStatus: string;
  }> = {
    DE: {
      totalQuotes: "Offerten-Anfragen Gesamt",
      inflowSub: "24h Eingang: 8 Neuzugänge",
      pendingEstimates: "Offene Kostenvoranschläge",
      urgentTag: "P1 Dringend",
      oldestInqueue: "Älteste Anfrage: vor 28 Min.",
      activeCategories: "Aktive Handwerks-Sparten",
      baselineCompliant: "Gewerbe gem. GewO 1994",
      pricingBaseline: "Basis: ab €15,00/Std.",
      responseSla: "SLA Reaktionszeit-Index",
      slaSub: "Ziel: ≤ 45 Min. (Neu → Kontaktiert)",
      slaStatus: "Normkonform"
    },
    EN: {
      totalQuotes: "Total Inquiries (24h Inflow)",
      inflowSub: "24h Inflow: 8 new leads",
      pendingEstimates: "Pending Estimates Dispatch",
      urgentTag: "P1 Urgent",
      oldestInqueue: "Oldest pending: 28m ago",
      activeCategories: "Compliant Trade Categories",
      baselineCompliant: "GewO Verified (>= €15/h)",
      pricingBaseline: "Standard: from €15.00/h",
      responseSla: "SLA Response Fulfillment",
      slaSub: "Target: ≤ 45 min (New → Contacted)",
      slaStatus: "SLA Compliant"
    },
    RU: {
      totalQuotes: "Всего заявок (приток за 24ч)",
      inflowSub: "Приток 24ч: 8 новых заявок",
      pendingEstimates: "Ожидают расчета сметы",
      urgentTag: "Срочно P1",
      oldestInqueue: "Старейшая: 28 мин. назад",
      activeCategories: "Активные категории ремесел",
      baselineCompliant: "Стандарт GewO (>= €15/ч)",
      pricingBaseline: "Тариф: от €15,00/час",
      responseSla: "Индекс реакции по SLA",
      slaSub: "Норматив: ≤ 45 мин (Новая → Связь)",
      slaStatus: "В норме"
    }
  };
  const t = labels[currentLang] || labels.EN;
  return <div data-controller-name="Operational Metrics Band" className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" data-api-unique-id='metricsrail-r5c92f5873b2a441d-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
      {/* 1. Total Inquiries Rail Box */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='metricsrail-r8e5d22aaf3c92b55-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
        <div className="flex items-start justify-between gap-2 min-w-0" data-api-unique-id='metricsrail-r10432d459b2173af-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsrail-r534ad9a02f703043-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <span className="text-xs font-medium text-muted-foreground block truncate" data-api-unique-id='metricsrail-r3ea706cbc469add1-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              {t.totalQuotes}
            </span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='metricsrail-r45c738c235da00f0-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='metricsrail-r3d20790170c401f0-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                {metrics.totalInquiries}
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 font-mono text-xs font-semibold text-success" data-api-unique-id='metricsrail-r9de44bd0de3b41b9-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                <TrendingUp className="h-3 w-3" data-api-unique-id='metricsrail-r726c1b738b5d9436-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
                {metrics.totalInquiriesTrend}
              </span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground" data-api-unique-id='metricsrail-r597bfa66353fc3b1-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <FileText className="h-4 w-4 text-primary" data-api-unique-id='metricsrail-ra03222e48181122a-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground min-w-0" data-api-unique-id='metricsrail-r601275158e8f3954-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <span className="truncate" data-api-unique-id='metricsrail-r99492a9e5c72f2fb-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>{t.inflowSub}</span>
          <span className="font-mono font-medium text-foreground shrink-0" data-api-unique-id='metricsrail-r6a9c96baad42bf12-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>+18% WoW</span>
        </div>
      </div>

      {/* 2. Pending Urgent Estimates Rail Box */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='metricsrail-r17043870d80c3f48-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
        <div className="flex items-start justify-between gap-2 min-w-0" data-api-unique-id='metricsrail-rbc2ba533671be43a-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsrail-r8d6ce1f7e2140099-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <span className="text-xs font-medium text-muted-foreground block truncate" data-api-unique-id='metricsrail-re5758816162671b0-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              {t.pendingEstimates}
            </span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='metricsrail-ra1361e70af03d569-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='metricsrail-r96118cd333078503-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                {metrics.pendingEstimates}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground" data-api-unique-id='metricsrail-ra0e2738977094f8d-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                <AlertCircle className="h-2.5 w-2.5" data-api-unique-id='metricsrail-r3a50a8eec4b6e633-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
                {metrics.pendingEstimatesUrgent} {t.urgentTag}
              </span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground" data-api-unique-id='metricsrail-rbe4298592283a5ed-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <Clock className="h-4 w-4 text-warning" data-api-unique-id='metricsrail-rc7451bc757643431-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground min-w-0" data-api-unique-id='metricsrail-r0710d5714bcdaaed-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <span className="truncate" data-api-unique-id='metricsrail-r8ea343f6a167e4a5-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>{t.oldestInqueue}</span>
          <span className="font-mono font-medium text-destructive shrink-0" data-api-unique-id='metricsrail-r79afd8dd495ef2f4-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>Action Req</span>
        </div>
      </div>

      {/* 3. Active Categories & Baseline Hourly Rate */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='metricsrail-r0dda0b9720943e7d-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
        <div className="flex items-start justify-between gap-2 min-w-0" data-api-unique-id='metricsrail-r6e1b7ad183ae0cc7-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsrail-rb08f862d14ffef8f-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <span className="text-xs font-medium text-muted-foreground block truncate" data-api-unique-id='metricsrail-rbb2a44155508906c-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              {t.activeCategories}
            </span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='metricsrail-r1edb79ea833af9e4-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='metricsrail-rb71753df74faeca8-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                {metrics.activeCategories}
              </span>
              <span className="font-mono text-xs text-muted-foreground" data-api-unique-id='metricsrail-rb856745f82f980ab-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                / {metrics.totalCategories} trades
              </span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground" data-api-unique-id='metricsrail-r2d7b639271932d67-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <Hammer className="h-4 w-4 text-primary" data-api-unique-id='metricsrail-rf38c4cb236442d61-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground min-w-0" data-api-unique-id='metricsrail-rf60282253ac8be71-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <span className="truncate" data-api-unique-id='metricsrail-rb5317ed38f06c8cf-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>{t.pricingBaseline}</span>
          <span className="font-mono font-semibold text-primary shrink-0" data-api-unique-id='metricsrail-rbab48cc8bd1563de-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>100% Rate Met</span>
        </div>
      </div>

      {/* 4. Response SLA Fulfillment % */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='metricsrail-r607e5f9bbf78f528-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
        <div className="flex items-start justify-between gap-2 min-w-0" data-api-unique-id='metricsrail-r81dd1173ac5eabc4-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <div className="min-w-0 flex-1" data-api-unique-id='metricsrail-rf2a15992d04caeba-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <span className="text-xs font-medium text-muted-foreground block truncate" data-api-unique-id='metricsrail-r2ef23ad1b6d1d2cf-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              {t.responseSla}
            </span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='metricsrail-r457106c850ccbce8-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='metricsrail-rb3b82273bed855ea-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                {metrics.responseSlaMinutes}m
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded-sm bg-success px-1.5 py-0.5 text-[10px] font-bold text-success-foreground" data-api-unique-id='metricsrail-rbde45cc12aa11620-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
                <Percent className="h-2.5 w-2.5" data-api-unique-id='metricsrail-r91ddf093d1966ac4-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
                {metrics.slaPercentMet}% Met
              </span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground" data-api-unique-id='metricsrail-r331db28218e6fe20-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
            <ShieldCheck className="h-4 w-4 text-success" data-api-unique-id='metricsrail-r58c32b1dae6e6a41-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail' />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground min-w-0" data-api-unique-id='metricsrail-r52a708398ed19c74-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>
          <span className="truncate" data-api-unique-id='metricsrail-r72c432f1a8967d8d-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>{t.slaSub}</span>
          <span className="font-mono font-medium text-success shrink-0" data-api-unique-id='metricsrail-rc80d936c1bdd4c62-s2472096877' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/MetricsRail'>{t.slaStatus}</span>
        </div>
      </div>
    </div>;
}