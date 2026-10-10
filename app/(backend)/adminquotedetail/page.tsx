"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AdminQuoteDetail } from "@/backend/route-params";
import { getQuoteRequestDetail, updateLaborAndBudget, updateJobScope, updateLifecycle, addConsultationLog } from "@/backend/actions/AdminQuoteDetail";
import { QuoteRequestDetailDTO, ConsultationNote } from "@/backend/types/AdminQuoteDetail";
import HeaderBanner from "@/backend/components/AdminQuoteDetail/HeaderBanner";
import LaborBudgetPanel from "@/backend/components/AdminQuoteDetail/LaborBudgetPanel";
import JobScopeCompliance from "@/backend/components/AdminQuoteDetail/JobScopeCompliance";
import ClientDispatchDossier from "@/backend/components/AdminQuoteDetail/ClientDispatchDossier";
import StageTransitionPanel from "@/backend/components/AdminQuoteDetail/StageTransitionPanel";
import ConsultationHistoryLog from "@/backend/components/AdminQuoteDetail/ConsultationHistoryLog";
import { ChevronRight, Printer, Share2, AlertCircle, Building2 } from "lucide-react";
import { toast } from "sonner";
function mapDTOToQuote(dto: QuoteRequestDetailDTO) {
  return {
    ...dto,
    createdAt: dto.createdAt instanceof Date ? dto.createdAt.toISOString() : String(dto.createdAt),
    updatedAt: dto.updatedAt instanceof Date ? dto.updatedAt.toISOString() : String(dto.updatedAt),
    customer: dto.customer ? {
      ...dto.customer,
      createdAt: dto.customer.createdAt instanceof Date ? dto.customer.createdAt.toISOString() : String(dto.customer.createdAt)
    } : null
  };
}
export default function AdminQuoteDetailPage() {
  const searchParams = useSearchParams();
  const {
    quoteRequestId
  } = AdminQuoteDetail.getParams(searchParams);
  const [quote, setQuote] = useState<ReturnType<typeof mapDTOToQuote> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const data = await getQuoteRequestDetail(quoteRequestId);
      if (data) {
        setQuote(mapDTOToQuote(data));
      } else {
        setQuote(null);
      }
    } catch {
      setQuote(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchQuote();
  }, [quoteRequestId]);
  const handleUpdateQuote = async (updates: Record<string, unknown>) => {
    if (!quote) return;
    try {
      let updatedDTO: QuoteRequestDetailDTO | null = null;
      if (updates.estimatedHours !== undefined || updates.estimatedBudgetEur !== undefined) {
        updatedDTO = await updateLaborAndBudget({
          id: quote.id,
          estimatedHours: typeof updates.estimatedHours === "number" ? updates.estimatedHours : quote.estimatedHours,
          estimatedBudgetEur: typeof updates.estimatedBudgetEur === "number" ? updates.estimatedBudgetEur : quote.estimatedBudgetEur,
          scopeNotes: typeof updates.scopeNotes === "string" ? updates.scopeNotes : quote.scopeNotes
        });
      } else if (updates.taskTitle !== undefined || updates.taskDescription !== undefined || updates.addressSnippet !== undefined || updates.hasMaterials !== undefined) {
        updatedDTO = await updateJobScope({
          id: quote.id,
          taskTitle: typeof updates.taskTitle === "string" ? updates.taskTitle : quote.taskTitle,
          taskDescription: typeof updates.taskDescription === "string" ? updates.taskDescription : quote.taskDescription,
          addressSnippet: typeof updates.addressSnippet === "string" ? updates.addressSnippet : quote.addressSnippet,
          hasMaterials: typeof updates.hasMaterials === "boolean" ? updates.hasMaterials : quote.hasMaterials
        });
      } else if (updates.status !== undefined || updates.isUrgent !== undefined || updates.archivalNote !== undefined) {
        updatedDTO = await updateLifecycle({
          id: quote.id,
          status: updates.status as QuoteRequestDetailDTO["status"],
          isUrgent: typeof updates.isUrgent === "boolean" ? updates.isUrgent : quote.isUrgent,
          archivalNote: typeof updates.archivalNote === "string" ? updates.archivalNote : undefined
        });
      }
      if (updatedDTO) {
        setQuote(mapDTOToQuote(updatedDTO));
        toast.success("Quote updated successfully");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update quote";
      toast.error(message);
    }
  };
  const handleAddConsultationNote = async (note: ConsultationNote | {
    actionTaken: string;
    note: string;
    adminName?: string;
  }) => {
    if (!quote) return;
    try {
      const updatedDTO = await addConsultationLog({
        id: quote.id,
        actionTaken: note.actionTaken,
        note: note.note,
        adminName: note.adminName
      });
      if (updatedDTO) {
        setQuote(mapDTOToQuote(updatedDTO));
        toast.success("Consultation note added");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add consultation note";
      toast.error(message);
    }
  };
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await getQuoteRequestDetail(quoteRequestId);
      if (data) {
        setQuote(mapDTOToQuote(data));
        toast.info("Inflow telemetry re-synced with Vienna dispatch server");
      }
    } catch {
      toast.error("Failed to re-sync data");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePrintDossier = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
  const handleShareTicket = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && quote) {
      navigator.clipboard.writeText(`Quote Lead #${quote.trackingCode} - ${quote.clientName} (${quote.district?.districtName || "Wien"})`);
      toast.success("Quote summary copied to clipboard for dispatcher dispatch");
    }
  };
  if (isLoading && !quote) {
    return <div className="w-full max-w-full min-w-0 p-6 flex flex-col items-center justify-center min-h-[400px] text-muted-foreground gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm font-medium">Loading quote request dossier...</p>
      </div>;
  }
  if (!quote) {
    return <div className="w-full max-w-full min-w-0 p-6 flex flex-col items-center justify-center min-h-[400px] gap-3 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Quote Lead Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          The requested quote dossier could not be located in the Vienna dispatch system.
        </p>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 flex flex-col gap-5">
      {/* Top Breadcrumb & Administrative Toolbar */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-3">
        {/* Left: Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-medium text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            <span>Dashboard & Leads Pipeline</span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-foreground truncate max-w-[200px]">
            Quote Lead #{quote.trackingCode}
          </span>
        </div>

        {/* Right: Administrative Print & Export Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={handlePrintDossier} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-card-foreground transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" title="Print Official Austrian Craft Quote Dossier">
            <Printer className="h-3.5 w-3.5 text-primary" />
            <span>Print Dossier</span>
          </button>

          <button type="button" onClick={handleShareTicket} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-card-foreground transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
            <Share2 className="h-3.5 w-3.5 text-accent" />
            <span>Share Ticket</span>
          </button>
        </div>
      </div>

      {/* Segment 1: Header Banner with Case ID, Lifecycle, and Origin Lang */}
      <HeaderBanner quote={quote} onRefresh={handleRefresh} onToggleUrgent={urgent => handleUpdateQuote({
      isUrgent: urgent
    })} />

      {/* Segment 2: Main Dual-Column Operational Workspace */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Left Column -> Labor Budget & Job Scope */}
        <div className="flex min-w-0 flex-col gap-5 xl:col-span-7">
          {/* Labor & Budget Dynamic Calculator */}
          <LaborBudgetPanel quote={quote} onUpdateQuote={handleUpdateQuote} />

          {/* Job Scope & Trade Compliance Specification */}
          <JobScopeCompliance quote={quote} onUpdateQuote={handleUpdateQuote} />

          {/* Audit Trail & Consultation History Log */}
          <ConsultationHistoryLog quote={quote} onAddNote={handleAddConsultationNote} />
        </div>

        {/* Right Column -> Sticky Action Panel & Dispatch Dossier */}
        <div className="flex min-w-0 flex-col gap-5 xl:col-span-5">
          {/* Vienna Dispatch & Customer Contact Dossier */}
          <ClientDispatchDossier quote={quote} onUpdateQuote={handleUpdateQuote} />

          {/* Workflow Stage Transition & Lifecycle Controls */}
          <StageTransitionPanel quote={quote} onUpdateQuote={handleUpdateQuote} />
        </div>
      </div>
    </div>;
}
