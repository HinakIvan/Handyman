"use client";

import React from "react";
import { Globe2, Calendar, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LanguageCode } from "@/backend/types/AdminOperationsDashboard";
interface HeaderControlsProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  timeRange: "TODAY" | "WEEK" | "MONTH";
  onTimeRangeChange: (val: "TODAY" | "WEEK" | "MONTH") => void;
  urgencyOnly: boolean;
  onUrgencyToggle: (val: boolean) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  lastSyncTime?: string;
}
export default function HeaderControls({
  currentLang,
  onLanguageChange,
  timeRange,
  onTimeRangeChange,
  urgencyOnly,
  onUrgencyToggle,
  onRefresh,
  isRefreshing = false,
  lastSyncTime = "10:42:15 CET"
}: HeaderControlsProps) {
  const titles: Record<LanguageCode, {
    title: string;
    subtitle: string;
    liveLedger: string;
    allLeads: string;
    urgentOnly: string;
    todayLabel: string;
    weekLabel: string;
    monthLabel: string;
    syncButton: string;
  }> = {
    DE: {
      title: "Wiener Meisterbetrieb Leitstand",
      subtitle: "Tagesaktuelle Einsatzkoordination & Offerteneingang Wien (GewO 1994)",
      liveLedger: "Echtzeit-Synchronisierung aktiv",
      allLeads: "Alle Anfragen",
      urgentOnly: "Nur P1 Dringend",
      todayLabel: "Heute (24h)",
      weekLabel: "Diese Woche",
      monthLabel: "Dieser Monat",
      syncButton: "Aktualisieren"
    },
    EN: {
      title: "Vienna Handwerk Operations Control Desk",
      subtitle: "Live artisan dispatch, quote triage & Vienna municipal logistics coordination",
      liveLedger: "Live Operations Synchronized",
      allLeads: "All Inquiries",
      urgentOnly: "P1 Urgent Only",
      todayLabel: "Today (24h)",
      weekLabel: "This Week",
      monthLabel: "This Month",
      syncButton: "Sync Data"
    },
    RU: {
      title: "Диспетчерский центр операций в Вене",
      subtitle: "Координация мастеров, прием заявок и расчет смет по районам Вены",
      liveLedger: "Синхронизация в реальном времени",
      allLeads: "Все заявки",
      urgentOnly: "Только срочные P1",
      todayLabel: "Сегодня (24ч)",
      weekLabel: "Эта неделя",
      monthLabel: "Этот месяц",
      syncButton: "Синхронизация"
    }
  };
  const t = titles[currentLang] || titles.EN;
  return <div data-controller-name="Header Control Bar" className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='headercontrols-rb1722eef78ed2563-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='headercontrols-raa23d77353c48fd9-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
        <div className="min-w-0 flex-1" data-api-unique-id='headercontrols-rad78b07fe717ad51-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='headercontrols-re541d79a7f491b51-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
            <h1 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl" data-api-unique-id='headercontrols-r516738eba04db062-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
              {t.title}
            </h1>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground" data-api-unique-id='headercontrols-rc81fc5ad2fc4158c-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" data-api-unique-id='headercontrols-r7f22622e2d06dd28-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' />
              {t.liveLedger}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='headercontrols-rcf34f0fe404062a4-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
            {t.subtitle}
          </p>
        </div>

        {/* Right side controls row */}
        <div className="flex min-w-0 flex-wrap items-center gap-2.5" data-api-unique-id='headercontrols-r4a6da42747ba3168-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
          {/* Urgency quick toggle */}
          <div className="inline-flex items-center rounded-md border border-border bg-muted p-0.5 text-xs" data-api-unique-id='headercontrols-r97445f9e52ff1961-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
            <button type="button" onClick={() => onUrgencyToggle(false)} className={`rounded px-2.5 py-1 font-medium text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${!urgencyOnly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='headercontrols-r0c5de2e640cc3c65-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
              {t.allLeads}
            </button>
            <button type="button" onClick={() => onUrgencyToggle(true)} className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${urgencyOnly ? "bg-destructive text-destructive-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='headercontrols-r3f655ee00ec53d19-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
              <AlertTriangle className="h-3 w-3" data-api-unique-id='headercontrols-r3158eabfd7086524-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' />
              <span data-api-unique-id='headercontrols-r953eeba71f9f0099-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>{t.urgentOnly}</span>
            </button>
          </div>

          {/* Multilingual View Selector */}
          <div className="inline-flex items-center rounded-md border border-border bg-muted p-0.5 text-xs" data-api-unique-id='headercontrols-rd06caff552a07553-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
            <Globe2 className="ml-1.5 mr-1 h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='headercontrols-r3521897efa124fcf-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' />
            {(["DE", "EN", "RU"] as LanguageCode[]).map((lang, index) => <button key={lang} type="button" onClick={() => onLanguageChange(lang)} className={`rounded px-2 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${currentLang === lang ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} title={`Switch language: ${lang}`} data-api-unique-id='headercontrols-r04e40e017b57d218-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' data-api-in-loop='1' data-api-bind-info={`list-${index}-$item`} data-api-map-var-name='lang'>
                {lang}
              </button>)}
          </div>

          {/* Time range selector */}
          <div className="w-[140px]" data-api-unique-id='headercontrols-r38912be008a1c69b-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
            <Select value={timeRange} onValueChange={val => onTimeRangeChange(val as "TODAY" | "WEEK" | "MONTH")} data-api-unique-id='headercontrols-r758b006e61c773a9-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
              <SelectTrigger size="sm" className="h-8 w-full border-border bg-card text-xs text-card-foreground" data-api-unique-id='headercontrols-r8b39013f17e01139-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
                <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground shrink-0" data-api-unique-id='headercontrols-r8d8fe88ac294c364-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' />
                <SelectValue placeholder="Time range" data-api-unique-id='headercontrols-r323935f18c3fdef9-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
                  {timeRange === "TODAY" ? t.todayLabel : timeRange === "WEEK" ? t.weekLabel : t.monthLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent data-api-unique-id='headercontrols-rf17589bdded88069-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
                <SelectItem value="TODAY" data-api-unique-id='headercontrols-r3fc217fab65878fe-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>{t.todayLabel}</SelectItem>
                <SelectItem value="WEEK" data-api-unique-id='headercontrols-raacc320c2912ff2e-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>{t.weekLabel}</SelectItem>
                <SelectItem value="MONTH" data-api-unique-id='headercontrols-r0bf6325aaf12ebd6-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>{t.monthLabel}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Refresh Action */}
          <button type="button" onClick={onRefresh} disabled={isRefreshing} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 text-xs font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none" title="Refresh Operations Feed" data-api-unique-id='headercontrols-reedbdd3aef8d3afa-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
            <RefreshCw className={`h-3.5 w-3.5 text-muted-foreground ${isRefreshing ? "animate-spin text-primary" : ""}`} data-api-unique-id='headercontrols-rde72003b61f0786f-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' />
            <span className="hidden sm:inline" data-api-unique-id='headercontrols-r007d2c1bdf6a2cbb-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>{t.syncButton}</span>
          </button>
        </div>
      </div>

      {/* Meta subline for sync audit */}
      <div className="flex min-w-0 flex-wrap items-center justify-between border-t border-border pt-2 text-[11px] text-muted-foreground" data-api-unique-id='headercontrols-rce6419bdecc56bdc-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
        <div className="flex items-center gap-2" data-api-unique-id='headercontrols-r2cefb7465f40d2e0-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
          <ShieldCheck className="h-3.5 w-3.5 text-primary" data-api-unique-id='headercontrols-r36c82169b81ace70-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls' />
          <span data-api-unique-id='headercontrols-r7e633b5a2efb91d9-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>Austrian Gewerbe Dispatching Desk • Vienna Municipal Code 90001</span>
        </div>
        <div className="font-mono text-xs" data-api-unique-id='headercontrols-rb621c0c6439d0cac-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>
          Last Synced: <span className="font-semibold text-foreground" data-api-unique-id='headercontrols-r2fd49e971c0dae38-s3665696959' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/HeaderControls'>{lastSyncTime}</span>
        </div>
      </div>
    </div>;
}