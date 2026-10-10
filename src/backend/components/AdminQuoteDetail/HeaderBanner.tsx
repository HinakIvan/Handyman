"use client";

import React from "react";
import { QuoteRequestDetail, QuoteStatus, SubmissionLang } from "@/backend/types/AdminQuoteDetail";
import { Lock, Flame, Globe2, FileCheck, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
interface HeaderBannerProps {
  quote: QuoteRequestDetail;
  onRefresh?: () => void;
  onToggleUrgent?: (urgent: boolean) => void;
}
const STATUS_BADGES: Record<QuoteStatus, {
  label: string;
  className: string;
  desc: string;
}> = {
  NEW: {
    label: "NEW INFLOW",
    className: "bg-info text-info-foreground",
    desc: "Unprocessed lead"
  },
  CONTACTED: {
    label: "CONTACTED",
    className: "bg-warning text-warning-foreground",
    desc: "Initial consultation logged"
  },
  ESTIMATE_SENT: {
    label: "ESTIMATE SENT",
    className: "bg-accent text-accent-foreground",
    desc: "Provisional quote dispatched"
  },
  QUOTED: {
    label: "CLIENT ACCEPTED",
    className: "bg-accent text-accent-foreground",
    desc: "Scope & rate approved"
  },
  SCHEDULED: {
    label: "SCHEDULED",
    className: "bg-chart-5 text-card-foreground",
    desc: "Artisans assigned to job"
  },
  COMPLETED: {
    label: "COMPLETED (LOCKED)",
    className: "bg-success text-success-foreground",
    desc: "Settled & archived record"
  }
};
const LANG_CONFIG: Record<SubmissionLang, {
  label: string;
  name: string;
  tag: string;
}> = {
  DE: {
    label: "DE",
    name: "Deutsch (Wien)",
    tag: "Österreichischer Standard"
  },
  EN: {
    label: "EN",
    name: "English (International)",
    tag: "Expat Inflow"
  },
  RU: {
    label: "RU",
    name: "Русский (Locale)",
    tag: "Multilingual Ticket"
  }
};
const STEPS: {
  key: QuoteStatus;
  label: string;
}[] = [{
  key: "NEW",
  label: "Inflow"
}, {
  key: "CONTACTED",
  label: "Phone Consult"
}, {
  key: "ESTIMATE_SENT",
  label: "Estimate Transmitted"
}, {
  key: "QUOTED",
  label: "Client Approved"
}, {
  key: "SCHEDULED",
  label: "Artisan Assigned"
}, {
  key: "COMPLETED",
  label: "Finalized & Locked"
}];
function getStepIndex(status: QuoteStatus): number {
  switch (status) {
    case "NEW":
      return 1;
    case "CONTACTED":
      return 2;
    case "ESTIMATE_SENT":
      return 3;
    case "QUOTED":
      return 4;
    case "SCHEDULED":
      return 5;
    case "COMPLETED":
      return 6;
    default:
      return 1;
  }
}
export default function HeaderBanner({
  quote,
  onRefresh,
  onToggleUrgent
}: HeaderBannerProps) {
  const isCompleted = quote.status === "COMPLETED";
  const badge = STATUS_BADGES[quote.status] || STATUS_BADGES.NEW;
  const lang = LANG_CONFIG[quote.submissionLang] || LANG_CONFIG.DE;
  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(quote.trackingCode);
      toast.success(`Tracking code copied: ${quote.trackingCode}`);
    }
  };
  const createdDisplay = quote.createdAtFormatted || (typeof quote.createdAt === "string" ? quote.createdAt : new Date(quote.createdAt).toLocaleDateString("de-AT"));
  return <div data-controller-name="Quote Request Overview Header" className="flex w-full min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-6" data-api-unique-id='headerbanner-r93735ea6b3fbc94a-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
      {/* Read-Only Notice Bar when completed */}
      {isCompleted && <div className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border bg-muted p-3 text-muted-foreground" data-api-unique-id='headerbanner-r195bffdbbb87ee27-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
          <div className="flex min-w-0 items-center gap-2 text-sm font-medium" data-api-unique-id='headerbanner-rc58e3a609c986504-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            <Lock className="h-4 w-4 shrink-0 text-success" data-api-unique-id='headerbanner-r0157f223c004a76b-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' />
            <span className="min-w-0 truncate" data-api-unique-id='headerbanner-r4ff3b9e1eceee9f8-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              Archived Record Lock: Job #{quote.trackingCode} is finalized under Austrian GewO 1994 compliance rules. All administrative parameters are read-only.
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-success px-2.5 py-0.5 text-xs font-semibold text-success-foreground" data-api-unique-id='headerbanner-r11f5efe8fba5d8a2-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            COMPLETED LEDGER
          </span>
        </div>}

      {/* Main Bar Top Section */}
      <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between" data-api-unique-id='headerbanner-r861c6dc6196e74ce-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
        {/* Left: Code, Category, Creation Time */}
        <div className="flex min-w-0 flex-col gap-1.5" data-api-unique-id='headerbanner-r464961896c836560-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
          <div className="flex min-w-0 flex-wrap items-center gap-2" data-api-unique-id='headerbanner-r37f9c496fda5037e-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase" data-api-unique-id='headerbanner-r2c2cb5905bbf0d97-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              Vienna Handwerk Case ID
            </span>
            <button type="button" onClick={handleCopyCode} className="inline-flex cursor-pointer items-center gap-1.5 rounded bg-muted px-2 py-0.5 font-mono text-sm font-bold text-foreground transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" title="Click to copy tracking code" data-api-unique-id='headerbanner-rf265ec5ccf295a8c-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              <span data-api-unique-id='headerbanner-rce95c7306e4f5155-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>{quote.trackingCode}</span>
              <FileCheck className="h-3.5 w-3.5 text-primary" data-api-unique-id='headerbanner-r3a9f18837cbc6d99-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' />
            </button>
            <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${badge.className}`} data-api-unique-id='headerbanner-r009a53c3e1a9929c-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              {badge.label}
            </span>
            {quote.isUrgent && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground" data-api-unique-id='headerbanner-re15241ac21e3417e-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
                <Flame className="h-3 w-3" data-api-unique-id='headerbanner-re2a789c988d22aaf-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' />
                URGENT DISPATCH (24H)
              </span>}
          </div>
          <h1 className="min-w-0 truncate font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl" data-api-unique-id='headerbanner-r1d9dd97193d14a5a-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            {quote.taskTitle}
          </h1>
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground" data-api-unique-id='headerbanner-rd03f51b0d9026d6d-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            <span data-api-unique-id='headerbanner-r042e339c2d7a6408-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              Category:{" "}
              <strong className="text-foreground" data-api-unique-id='headerbanner-r9955e98431807df1-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
                {quote.serviceCategory?.titleEn}
              </strong>
            </span>
            <span data-api-unique-id='headerbanner-r2043df6f1a7a54ca-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>•</span>
            <span data-api-unique-id='headerbanner-r9a2306377b3cbdf4-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              District:{" "}
              <strong className="font-mono text-foreground" data-api-unique-id='headerbanner-r995fb3f8f047f981-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
                {quote.district?.districtCode} Wien ({quote.district?.districtName})
              </strong>
            </span>
            <span data-api-unique-id='headerbanner-r1813ac08f948802f-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>•</span>
            <span data-api-unique-id='headerbanner-rc6067764e03b317c-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              Created:{" "}
              <strong className="font-mono text-foreground" data-api-unique-id='headerbanner-r2f9a471676852f8e-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
                {createdDisplay}
              </strong>
            </span>
          </div>
        </div>

        {/* Right: Submission Language Pill + Quick Actions */}
        <div className="flex min-w-0 flex-wrap items-center gap-2.5 xl:justify-end" data-api-unique-id='headerbanner-r2a86d730e010aa90-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
          {/* Submission Language Pill */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground" data-api-unique-id='headerbanner-rf3a34c4158dc996c-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            <Globe2 className="h-4 w-4 text-accent" data-api-unique-id='headerbanner-r26d6a613d137c2f6-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' />
            <div className="flex flex-col" data-api-unique-id='headerbanner-rf25309a4bde5da65-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              <span className="font-semibold text-foreground" data-api-unique-id='headerbanner-r9afdc030f9c0049b-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
                Origin Lang: {lang.label}
              </span>
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='headerbanner-rcb82177442cf8504-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>{lang.name}</span>
            </div>
          </div>

          {/* Quick Refresh Button */}
          {onRefresh && <button type="button" onClick={onRefresh} className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-card-foreground transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='headerbanner-r8d1ebcaaf37ae078-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              <RotateCcw className="h-3.5 w-3.5" data-api-unique-id='headerbanner-rfb7f6c250ded1ad0-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' />
              <span data-api-unique-id='headerbanner-r0e516c0f8640e92a-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>Reload Inflow</span>
            </button>}

          {/* Urgency Quick Toggle */}
          {!isCompleted && onToggleUrgent && <button type="button" onClick={() => onToggleUrgent(!quote.isUrgent)} className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${quote.isUrgent ? "bg-secondary text-secondary-foreground hover:bg-muted" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"}`} data-api-unique-id='headerbanner-rc33f979d54b6bf00-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
              <Flame className="h-3.5 w-3.5" data-api-unique-id='headerbanner-refe90acdb9cb5ba6-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' />
              <span data-api-unique-id='headerbanner-ra88d4dac1ffcb3ec-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
                {quote.isUrgent ? "Demote from Urgent" : "Mark 24h Urgent"}
              </span>
            </button>}
        </div>
      </div>

      {/* Sequential Mini Pipeline Bar */}
      <div className="flex min-w-0 flex-col gap-2 border-t border-border pt-3 text-xs" data-api-unique-id='headerbanner-r52a4382bbdcd5444-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
        <div className="flex items-center justify-between gap-2 text-muted-foreground" data-api-unique-id='headerbanner-rc08ca8ed159cd399-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
          <span className="font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='headerbanner-rae1db5aab66386f7-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            Austrian GewO Operational Lifecycle Flow
          </span>
          <span className="font-mono text-xs" data-api-unique-id='headerbanner-red92e899a1121938-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
            Step {getStepIndex(quote.status)} of 6
          </span>
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-6" data-api-unique-id='headerbanner-r81864baa5265815d-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner'>
          {STEPS.map((s, index) => {
          const currentIdx = getStepIndex(quote.status);
          const isDone = index + 1 < currentIdx;
          const isCurrent = index + 1 === currentIdx;
          return <div key={s.key} className={`flex min-w-0 flex-col gap-0.5 rounded-md border p-2 transition ${isCurrent ? "border-primary bg-primary text-primary-foreground font-semibold shadow-sm" : isDone ? "border-border bg-muted text-muted-foreground" : "border-border bg-card text-muted-foreground opacity-60"}`} data-api-unique-id='headerbanner-r6a4f1ee191427e17-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' data-api-in-loop='1'>
                <div className="flex items-center justify-between text-[10px]" data-api-unique-id='headerbanner-r8443183215e637fb-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' data-api-in-loop='1'>
                  <span data-api-unique-id='headerbanner-r7dccb62ab7489649-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' data-api-in-loop='1'>0{index + 1}</span>
                  {isCurrent && <Sparkles className="h-3 w-3 animate-pulse text-primary-foreground" data-api-unique-id='headerbanner-r3d328ffc9c09042f-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' data-api-in-loop='1' />}
                </div>
                <div className="truncate text-xs font-medium uppercase tracking-tight" data-api-unique-id='headerbanner-r85d2e7b6ded7500b-s387089175' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/HeaderBanner' data-api-in-loop='1' data-api-bind-info={`STEPS-${index}-label`} data-api-map-var-name='s'>
                  {s.label}
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
}