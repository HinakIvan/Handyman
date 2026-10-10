"use client";

import React, { useState } from "react";
import { Search, Filter, CheckCircle, Clock, Send, CalendarCheck, CheckCheck, MapPin, Phone, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuoteRequestItem, QuoteStatus, ServiceCategoryKey, LanguageCode, FilterState } from "@/backend/types/AdminOperationsDashboard";
export type QuoteRequest = QuoteRequestItem;
export interface QuoteRequestsTableProps {
  requests: QuoteRequestItem[];
  currentLang: LanguageCode;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onStatusUpdate: (id: string, newStatus: QuoteStatus) => void;
  onSelectRequestForDetail: (req: QuoteRequestItem) => void;
}
const CATEGORY_NAMES: Record<ServiceCategoryKey, Record<LanguageCode, string>> = {
  ASSEMBLY: {
    DE: "Möbelmontage",
    EN: "Furniture Assembly",
    RU: "Сборка мебели"
  },
  DEMOLITION: {
    DE: "Abbrucharbeiten",
    EN: "Demolition & Clearing",
    RU: "Демонтаж"
  },
  FLOORING: {
    DE: "Bodenverlegung",
    EN: "Flooring & Skirting",
    RU: "Укладка полов"
  },
  PAINTING: {
    DE: "Malerarbeiten",
    EN: "Painting & Spackle",
    RU: "Малярные работы"
  },
  DRYWALL: {
    DE: "Trockenbau",
    EN: "Drywall & Partition",
    RU: "Гипсокартон"
  },
  PLUMBING_MINOR: {
    DE: "Sanitär-Reparatur",
    EN: "Minor Plumbing",
    RU: "Мелкая сантехника"
  },
  BATHROOM_KITCHEN: {
    DE: "Bad- & Küchenumbau",
    EN: "Kitchen & Bath Renovation",
    RU: "Ванные и кухни"
  },
  DOORS_WINDOWS: {
    DE: "Fenster- & Türenmontage",
    EN: "Doors & Windows",
    RU: "Двери и окна"
  },
  OUTDOOR: {
    DE: "Garten & Außenbereich",
    EN: "Balcony & Outdoor",
    RU: "Балкон и двор"
  },
  MOVING: {
    DE: "Umzugshelfer & Transport",
    EN: "Moving Assistance",
    RU: "Помощь в переезде"
  },
  COMMERCIAL: {
    DE: "Gewerbliche Instandhaltung",
    EN: "Commercial Maintenance",
    RU: "Коммерч. объекты"
  }
};
export default function QuoteRequestsTable({
  requests = [],
  currentLang,
  filters,
  onFilterChange,
  onStatusUpdate,
  onSelectRequestForDetail
}: QuoteRequestsTableProps) {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const statusConfig: Record<QuoteStatus, {
    label: Record<LanguageCode, string>;
    badgeClass: string;
    icon: React.ReactNode;
  }> = {
    NEW: {
      label: {
        DE: "Neu",
        EN: "New Lead",
        RU: "Новый"
      },
      badgeClass: "bg-primary text-primary-foreground",
      icon: <Clock className="h-3 w-3" data-api-unique-id='quoterequeststable-r55818e2ee7421188-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
    },
    CONTACTED: {
      label: {
        DE: "Kontaktiert",
        EN: "Contacted",
        RU: "Связались"
      },
      badgeClass: "bg-accent text-accent-foreground",
      icon: <Phone className="h-3 w-3" data-api-unique-id='quoterequeststable-r07c6d1dfea612872-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
    },
    ESTIMATE_SENT: {
      label: {
        DE: "Angebot versandt",
        EN: "Estimate Sent",
        RU: "Смета отправлена"
      },
      badgeClass: "bg-warning text-warning-foreground",
      icon: <Send className="h-3 w-3" data-api-unique-id='quoterequeststable-r2aeaae54450cb425-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
    },
    QUOTED: {
      label: {
        DE: "Offerte bestätigt",
        EN: "Quoted",
        RU: "Согласовано"
      },
      badgeClass: "bg-info text-info-foreground",
      icon: <CheckCircle className="h-3 w-3" data-api-unique-id='quoterequeststable-r7e5508b79d2c0796-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
    },
    SCHEDULED: {
      label: {
        DE: "Terminiert",
        EN: "Scheduled",
        RU: "В графике"
      },
      badgeClass: "bg-secondary text-secondary-foreground",
      icon: <CalendarCheck className="h-3 w-3" data-api-unique-id='quoterequeststable-rd727ae7d503a7a2e-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
    },
    COMPLETED: {
      label: {
        DE: "Abgeschlossen",
        EN: "Completed",
        RU: "Завершено"
      },
      badgeClass: "bg-success text-success-foreground",
      icon: <CheckCheck className="h-3 w-3" data-api-unique-id='quoterequeststable-r412946b034669d4a-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
    }
  };
  const headers: Record<LanguageCode, {
    title: string;
    desc: string;
    searchPlaceholder: string;
    allStatuses: string;
    allCategories: string;
    reqId: string;
    customer: string;
    service: string;
    district: string;
    schedule: string;
    status: string;
    lang: string;
    action: string;
    emptyState: string;
    drilldownBtn: string;
    urgentFilterLabel: string;
  }> = {
    DE: {
      title: "Aktuelle Offerten-Anfragen & Einsatzsteuerung",
      desc: "Live-Eingang von Kundenanfragen im Wiener Stadtgebiet gem. ABGB § 1170a",
      searchPlaceholder: "Kunde, Auftrags-ID, Bezirk oder Stichwort...",
      allStatuses: "Alle Status",
      allCategories: "Alle Sparten (11 Handwerke)",
      reqId: "Auftrag & Tracking",
      customer: "Kunde / Kontakt",
      service: "Handwerkssparte & Umfang",
      district: "Bezirk / Zone",
      schedule: "Wunschtermin & Zeitfenster",
      status: "Workflow-Status",
      lang: "Sprache",
      action: "Status ändern",
      emptyState: "Keine Anfragen gefunden, die den gewählten Kriterien entsprechen.",
      drilldownBtn: "Details öffnen [B02]",
      urgentFilterLabel: "P1 Dringend"
    },
    EN: {
      title: "Primary Quote Requests Workflow Management",
      desc: "Live incoming client leads, scope inspection & dispatch lifecycle across Vienna",
      searchPlaceholder: "Search client, tracking code, district (1010-1230)...",
      allStatuses: "All Statuses",
      allCategories: "All Trade Categories",
      reqId: "Tracking & Order ID",
      customer: "Client Contact",
      service: "Trade Scope & Hours",
      district: "District / Vienna Zone",
      schedule: "Preferred Schedule",
      status: "Lifecycle Stage",
      lang: "Lang",
      action: "Advance Status",
      emptyState: "No quote inquiries matched the selected filters.",
      drilldownBtn: "Inspect Lead [B02]",
      urgentFilterLabel: "P1 Urgent"
    },
    RU: {
      title: "Поток заявок на расчет смет и координация",
      desc: "Входящие заявки от клиентов по районам Вены согласно ABGB § 1170a",
      searchPlaceholder: "Поиск по клиенту, номеру, району (1010-1230)...",
      allStatuses: "Все статусы",
      allCategories: "Все категории услуг",
      reqId: "Номер и трекинг",
      customer: "Клиент / Связь",
      service: "Вид работ и смета",
      district: "Район / Логистика",
      schedule: "Желаемая дата и время",
      status: "Статус заявки",
      lang: "Язык",
      action: "Сменить статус",
      emptyState: "Заявок по данным критериям не найдено.",
      drilldownBtn: "Открыть в B02",
      urgentFilterLabel: "Срочно P1"
    }
  };
  const t = headers[currentLang] || headers.EN;

  // Filtering requests
  const filteredRequests = (requests || []).filter(req => {
    // Urgency
    if (filters.urgencyOnly && !req.isUrgent) {
      return false;
    }
    // Status
    if (filters.status !== "ALL" && req.status !== filters.status) {
      return false;
    }
    // Category
    if (filters.category !== "ALL" && req.serviceCategoryKey !== filters.category) {
      return false;
    }
    // District
    if (filters.district && filters.district !== "ALL" && req.districtCode !== filters.district && req.districtId !== filters.district) {
      return false;
    }
    // Search query
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const matchName = req.clientName ? req.clientName.toLowerCase().includes(q) : false;
      const matchId = (req.id ? req.id.toLowerCase().includes(q) : false) || (req.trackingCode ? req.trackingCode.toLowerCase().includes(q) : false);
      const matchDistrict = (req.districtCode ? req.districtCode.toLowerCase().includes(q) : false) || (req.districtName ? req.districtName.toLowerCase().includes(q) : false);
      const matchCategory = req.serviceCategoryKey ? req.serviceCategoryKey.toLowerCase().includes(q) : false;
      const matchTask = req.taskTitle ? req.taskTitle.toLowerCase().includes(q) : false;
      const matchPhone = req.clientPhone ? req.clientPhone.toLowerCase().includes(q) : false;
      const matchEmail = req.clientEmail ? req.clientEmail.toLowerCase().includes(q) : false;
      const matchAddress = req.addressSnippet ? req.addressSnippet.toLowerCase().includes(q) : false;
      const matchZone = req.districtZone ? req.districtZone.toLowerCase().includes(q) : false;
      const matchLang = req.submissionLang ? req.submissionLang.toLowerCase().includes(q) : false;
      if (!matchName && !matchId && !matchDistrict && !matchCategory && !matchTask && !matchPhone && !matchEmail && !matchAddress && !matchZone && !matchLang) {
        return false;
      }
    }
    return true;
  });
  return <div data-controller-name="Quote Requests Management Table" className="flex min-w-0 flex-col rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='quoterequeststable-r74914b49734b7703-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
      {/* Table Section Header */}
      <div className="flex min-w-0 flex-col gap-3 pb-3 border-b border-border" data-api-unique-id='quoterequeststable-r26236046b91be98d-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2" data-api-unique-id='quoterequeststable-re8dce4d5e04e1ebf-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
          <div className="min-w-0" data-api-unique-id='quoterequeststable-r5e4b12d7c3d6a4a7-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            <h2 className="font-display text-base font-bold text-foreground sm:text-lg" data-api-unique-id='quoterequeststable-r2699047844c3d74f-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
              {t.title}
            </h2>
            <p className="text-xs text-muted-foreground" data-api-unique-id='quoterequeststable-r3858d320bf9f4c94-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>{t.desc}</p>
          </div>
          <div className="flex items-center gap-2" data-api-unique-id='quoterequeststable-r3fc557957769849b-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-xs font-semibold text-muted-foreground" data-api-unique-id='quoterequeststable-rc65292c74b831a7f-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
              {filteredRequests.length} / {requests.length} inquiries
            </span>
          </div>
        </div>

        {/* Filter controls row */}
        <div className="mt-1 flex min-w-0 flex-col gap-2.5 sm:flex-row sm:items-center" data-api-unique-id='quoterequeststable-rbc8f5cf5b1fc0653-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
          {/* Search Input */}
          <div className="relative min-w-0 flex-1" data-api-unique-id='quoterequeststable-rc0c17986364133f8-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='quoterequeststable-rb30f8439cc6d05e9-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
            <input type="text" value={filters.searchQuery} onChange={e => onFilterChange({
            ...filters,
            searchQuery: e.target.value
          })} placeholder={t.searchPlaceholder} className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequeststable-r96ac5a59292eb7e9-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
          </div>

          {/* Status Select */}
          <div className="w-full sm:w-[170px] shrink-0" data-api-unique-id='quoterequeststable-r231c15b5dec518ff-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            <Select value={filters.status} onValueChange={val => onFilterChange({
            ...filters,
            status: val as QuoteStatus | "ALL"
          })} data-api-unique-id='quoterequeststable-rfbe2b722fa501b82-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
              <SelectTrigger size="sm" className="h-9 w-full border-border bg-background text-xs text-foreground" data-api-unique-id='quoterequeststable-rf166ea4cd99f48f0-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground shrink-0" data-api-unique-id='quoterequeststable-r4be009387e4a19dc-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' />
                <SelectValue placeholder={t.allStatuses} data-api-unique-id='quoterequeststable-r851c7c17836d661b-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                  {filters.status === "ALL" ? t.allStatuses : statusConfig[filters.status]?.label[currentLang] || filters.status}
                </SelectValue>
              </SelectTrigger>
              <SelectContent data-api-unique-id='quoterequeststable-r4ad15a601fd064cb-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                <SelectItem value="ALL" data-api-unique-id='quoterequeststable-r182bd275e0207a40-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>{t.allStatuses}</SelectItem>
                <SelectItem value="NEW" data-api-unique-id='quoterequeststable-r2688a1c4396ed441-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>New Lead (Neu)</SelectItem>
                <SelectItem value="CONTACTED" data-api-unique-id='quoterequeststable-r91cb0b0e33559998-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Contacted (Kontaktiert)</SelectItem>
                <SelectItem value="ESTIMATE_SENT" data-api-unique-id='quoterequeststable-r4669c439a37bafb9-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Estimate Sent (Angebot)</SelectItem>
                <SelectItem value="QUOTED" data-api-unique-id='quoterequeststable-r2616d6ab1787a694-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Quoted (Bestätigt)</SelectItem>
                <SelectItem value="SCHEDULED" data-api-unique-id='quoterequeststable-r846d69c2a4d34953-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Scheduled (Terminiert)</SelectItem>
                <SelectItem value="COMPLETED" data-api-unique-id='quoterequeststable-r5584a95ebbc68ea8-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Completed (Abgeschlossen)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Select */}
          <div className="w-full sm:w-[190px] shrink-0" data-api-unique-id='quoterequeststable-r78e7b03a9a86f4b3-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            <Select value={filters.category} onValueChange={val => onFilterChange({
            ...filters,
            category: val as ServiceCategoryKey | "ALL"
          })} data-api-unique-id='quoterequeststable-r3d16c2a50c6c0a4b-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
              <SelectTrigger size="sm" className="h-9 w-full border-border bg-background text-xs text-foreground" data-api-unique-id='quoterequeststable-r9c0f46c5313ef763-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                <SelectValue placeholder={t.allCategories} data-api-unique-id='quoterequeststable-r05418dd9863b75cc-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                  {filters.category === "ALL" ? t.allCategories : CATEGORY_NAMES[filters.category]?.[currentLang] || filters.category}
                </SelectValue>
              </SelectTrigger>
              <SelectContent data-api-unique-id='quoterequeststable-r1830dc70eb096799-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                <SelectItem value="ALL" data-api-unique-id='quoterequeststable-rebc7288388e73f45-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>{t.allCategories}</SelectItem>
                <SelectItem value="ASSEMBLY" data-api-unique-id='quoterequeststable-r05cc507a23a53505-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Furniture Assembly (Möbel)</SelectItem>
                <SelectItem value="DEMOLITION" data-api-unique-id='quoterequeststable-r96f2de50b61502f2-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Demolition (Abbruch)</SelectItem>
                <SelectItem value="FLOORING" data-api-unique-id='quoterequeststable-r052757490e21f476-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Flooring (Bodenverlegung)</SelectItem>
                <SelectItem value="PAINTING" data-api-unique-id='quoterequeststable-r9e8ccc9291678ff5-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Painting (Malerarbeiten)</SelectItem>
                <SelectItem value="DRYWALL" data-api-unique-id='quoterequeststable-r63805f23189a0a37-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Drywall (Trockenbau)</SelectItem>
                <SelectItem value="PLUMBING_MINOR" data-api-unique-id='quoterequeststable-rac82d4636fd4f311-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Minor Plumbing (Sanitär)</SelectItem>
                <SelectItem value="BATHROOM_KITCHEN" data-api-unique-id='quoterequeststable-re0b0c2ae9989a2b0-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Kitchen & Bath (Bad/Küche)</SelectItem>
                <SelectItem value="DOORS_WINDOWS" data-api-unique-id='quoterequeststable-rcf4f797adc210471-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Doors & Windows (Fenster/Türen)</SelectItem>
                <SelectItem value="OUTDOOR" data-api-unique-id='quoterequeststable-r46173520ffc44964-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Balcony & Outdoor (Garten)</SelectItem>
                <SelectItem value="MOVING" data-api-unique-id='quoterequeststable-r0bd6780ff9c5a140-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Moving Assistance (Umzug)</SelectItem>
                <SelectItem value="COMMERCIAL" data-api-unique-id='quoterequeststable-r629e1d105644beef-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>Commercial Maintenance (Gewerbe)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Data Table Wrapper with localized horizontal scroll */}
      <div className="mt-3 w-full max-w-full min-w-0 overflow-x-auto rounded-md border border-border" data-api-unique-id='quoterequeststable-rd05f0cbee3fb3e8e-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
        <table className="w-full min-w-[960px] text-left text-xs" data-api-unique-id='quoterequeststable-rcffe2a42ba35e064-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
          <thead className="border-b border-border bg-muted/60 text-muted-foreground" data-api-unique-id='quoterequeststable-r1d5cc5dcfd8fc857-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            <tr data-api-unique-id='quoterequeststable-ra0dd9fef2c5dcde6-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
              <th className="whitespace-nowrap px-3 py-2.5 font-mono font-semibold min-w-[130px]" data-api-unique-id='quoterequeststable-r737fc1b067a0fd7c-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.reqId}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 font-semibold min-w-[170px]" data-api-unique-id='quoterequeststable-rd508e1c27dc1fe97-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.customer}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 font-semibold min-w-[170px]" data-api-unique-id='quoterequeststable-r10a1d7b7ba7f6afc-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.service}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 font-semibold min-w-[130px]" data-api-unique-id='quoterequeststable-r4c476942a02153c9-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.district}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 font-semibold min-w-[130px]" data-api-unique-id='quoterequeststable-rcdb0813dfab5e8d4-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.schedule}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 font-semibold min-w-[130px]" data-api-unique-id='quoterequeststable-rc652a4f1d28a7e3a-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.status}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 text-center font-mono font-semibold min-w-[70px]" data-api-unique-id='quoterequeststable-r2c82edf6b04a07d3-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.lang}
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 text-right font-semibold min-w-[170px]" data-api-unique-id='quoterequeststable-rd73a437471f78b6a-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                {t.action}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card" data-api-unique-id='quoterequeststable-r126385825dfc4702-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            {filteredRequests.length === 0 ? <tr data-api-unique-id='quoterequeststable-r30db6631b5643e89-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                <td colSpan={8} className="px-4 py-8 text-center text-xs text-muted-foreground" data-api-unique-id='quoterequeststable-ra7cad8a7da2ab7b8-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
                  {t.emptyState}
                </td>
              </tr> : filteredRequests.map((req, index) => {
            const conf = statusConfig[req.status] || statusConfig.NEW;
            const isSelected = selectedRowId === req.id;
            const dateDisplay = req.createdAtFormatted ? req.createdAtFormatted : req.createdAt ? new Date(req.createdAt).toISOString().slice(0, 10) : "";
            return <tr key={req.id} onClick={() => {
              setSelectedRowId(req.id);
              onSelectRequestForDetail(req);
            }} className={`cursor-pointer transition-colors hover:bg-muted/40 ${isSelected ? "bg-muted/60" : ""}`} data-api-unique-id='quoterequeststable-r8dc6ea268024b878-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                    {/* 1. Request ID + Urgent tag + Tracking code */}
                    <td className="whitespace-nowrap px-3 py-3 font-mono font-medium text-foreground" data-api-unique-id='quoterequeststable-re42e51574c74dfc7-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <div className="flex items-center gap-1.5" data-api-unique-id='quoterequeststable-ra5b80a1029750a20-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                        <span className="font-bold" data-api-unique-id='quoterequeststable-r5574da1083286191-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-id`} data-api-map-var-name='req'>{req.id}</span>
                        {req.isUrgent && <span className="inline-flex shrink-0 items-center rounded-sm bg-destructive px-1 py-0.2 text-[9px] font-bold text-destructive-foreground" data-api-unique-id='quoterequeststable-r31c580967f2d11fe-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                            P1
                          </span>}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono" data-api-unique-id='quoterequeststable-r381d8f0e123ed5c3-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-trackingCode`} data-api-map-var-name='req'>
                        {req.trackingCode} {dateDisplay ? `• ${dateDisplay}` : ""}
                      </div>
                    </td>

                    {/* 2. Customer Info */}
                    <td className="px-3 py-3" data-api-unique-id='quoterequeststable-r0be007824fa2a51e-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <div className="min-w-0 font-medium text-foreground truncate max-w-[170px]" data-api-unique-id='quoterequeststable-rd1abbc09eb1517d2-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-clientName`} data-api-map-var-name='req'>
                        {req.clientName}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono truncate max-w-[170px]" data-api-unique-id='quoterequeststable-r2a5773613048d002-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                        <span data-api-unique-id='quoterequeststable-rdc4e0507c06c106e-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-clientPhone`} data-api-map-var-name='req'>{req.clientPhone}</span>
                        {req.clientEmail && <span className="truncate text-muted-foreground/80" title={req.clientEmail} data-api-unique-id='quoterequeststable-racc046267c333314-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-clientEmail`} data-api-map-var-name='req'>
                            • {req.clientEmail}
                          </span>}
                      </div>
                    </td>

                    {/* 3. Service Category & Budget */}
                    <td className="px-3 py-3" data-api-unique-id='quoterequeststable-r9c00ddc019505e72-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <div className="font-medium text-foreground truncate max-w-[170px]" data-api-unique-id='quoterequeststable-r1ece0206b44fe23c-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                        {CATEGORY_NAMES[req.serviceCategoryKey]?.[currentLang] || req.serviceCategoryKey}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono" data-api-unique-id='quoterequeststable-rf0730efe7753bcfa-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-estimatedHours`} data-api-map-var-name='req'>
                        {req.estimatedHours}h • Est. €{req.estimatedBudgetEur} {req.hasMaterials ? "• Mat. Inc." : ""}
                      </div>
                    </td>

                    {/* 4. Vienna District Badge */}
                    <td className="whitespace-nowrap px-3 py-3" data-api-unique-id='quoterequeststable-r5c42658988f58de0-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <div className="inline-flex items-center gap-1 rounded-sm border border-border bg-muted px-2 py-0.5 text-xs" data-api-unique-id='quoterequeststable-r8caf5bc0bb305981-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                        <MapPin className="h-3 w-3 text-primary shrink-0" data-api-unique-id='quoterequeststable-r6082d4d7ea4d7b22-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' />
                        <span className="font-mono font-bold text-foreground" data-api-unique-id='quoterequeststable-r3d3ac154977032d9-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-districtCode`} data-api-map-var-name='req'>
                          {req.districtCode}
                        </span>
                        <span className="text-muted-foreground text-[11px]" data-api-unique-id='quoterequeststable-rf0423888ec041b92-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-districtName`} data-api-map-var-name='req'>
                          {req.districtName}
                        </span>
                      </div>
                    </td>

                    {/* 5. Preferred Schedule */}
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-foreground" data-api-unique-id='quoterequeststable-r0fd33458e3996375-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <div data-api-unique-id='quoterequeststable-r90315468ce741fda-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-preferredDate`} data-api-map-var-name='req'>{req.preferredDate}</div>
                      <div className="text-[10px] text-muted-foreground" data-api-unique-id='quoterequeststable-rf751f185f019b8bb-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-preferredTimeSlot`} data-api-map-var-name='req'>
                        {req.preferredTimeSlot}
                      </div>
                    </td>

                    {/* 6. Status Badge */}
                    <td className="whitespace-nowrap px-3 py-3" data-api-unique-id='quoterequeststable-r5ded2a61204cc623-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${conf.badgeClass}`} data-api-unique-id='quoterequeststable-r0fb2f7e39f04bc6d-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                        {conf.icon}
                        {conf.label[currentLang] || req.status}
                      </span>
                    </td>

                    {/* 7. Submission Language */}
                    <td className="whitespace-nowrap px-3 py-3 text-center" data-api-unique-id='quoterequeststable-rb0ee9372719f7df0-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <span className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground" data-api-unique-id='quoterequeststable-r5143b5b019628eee-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' data-api-bind-info={`filteredRequests-${index}-submissionLang`} data-api-map-var-name='req'>
                        {req.submissionLang}
                      </span>
                    </td>

                    {/* 8. Quick Status Transition & Drilldown */}
                    <td className="whitespace-nowrap px-3 py-3 text-right" data-api-unique-id='quoterequeststable-ref865e641cf39f7b-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                      <div className="inline-flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()} data-api-unique-id='quoterequeststable-r5d6210599e1ad3e4-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                        {/* Status advance select */}
                        <Select value={req.status} onValueChange={val => onStatusUpdate(req.id, val as QuoteStatus)} disabled={req.status === "COMPLETED"} data-api-unique-id='quoterequeststable-r8cbfe2a561692ec7-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                          <SelectTrigger size="sm" className="h-7 w-[120px] border-border bg-background text-[11px] font-medium text-foreground" data-api-unique-id='quoterequeststable-radfa83962133329f-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                            <SelectValue placeholder="Advance" data-api-unique-id='quoterequeststable-r0f6654a912f51471-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                              {statusConfig[req.status]?.label[currentLang] || req.status}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent align="end" data-api-unique-id='quoterequeststable-r7777dedb1423b4d7-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                            <SelectItem value="NEW" data-api-unique-id='quoterequeststable-rc2f2d6d50765c9c2-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>1. New Lead</SelectItem>
                            <SelectItem value="CONTACTED" data-api-unique-id='quoterequeststable-ra64b1a217c5a6086-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>2. Contacted</SelectItem>
                            <SelectItem value="ESTIMATE_SENT" data-api-unique-id='quoterequeststable-re690c0c2f55f3e5b-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>3. Estimate Sent</SelectItem>
                            <SelectItem value="QUOTED" data-api-unique-id='quoterequeststable-r006490b3edab5113-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>4. Quoted</SelectItem>
                            <SelectItem value="SCHEDULED" data-api-unique-id='quoterequeststable-r84796f351890e985-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>5. Scheduled</SelectItem>
                            <SelectItem value="COMPLETED" data-api-unique-id='quoterequeststable-r84cc0272bf1baafe-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>6. Completed</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Direct Drilldown to B02 */}
                        <button type="button" onClick={e => {
                    e.stopPropagation();
                    onSelectRequestForDetail(req);
                  }} className="inline-flex h-7 w-7 items-center justify-center rounded border border-border bg-secondary text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title={`${t.drilldownBtn}: ${req.id}`} data-api-unique-id='quoterequeststable-r871db8579f23ccaf-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1'>
                          <ChevronRight className="h-4 w-4" data-api-unique-id='quoterequeststable-r90bddc141b5e5b36-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable' data-api-in-loop='1' />
                        </button>
                      </div>
                    </td>
                  </tr>;
          })}
          </tbody>
        </table>
      </div>

      {/* Table footer ledger count & Austrian compliance note */}
      <div className="mt-3 flex min-w-0 flex-col gap-2 pt-2 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='quoterequeststable-rd82b77caec2c30a7-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
        <div data-api-unique-id='quoterequeststable-rb9960c46b8fe1a95-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
          <span data-api-unique-id='quoterequeststable-rcb132884f803d5ad-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
            Wiener Meisterbetrieb Standard: Kostenvoranschläge gem. § 1170a ABGB
            (Detailed estimates legally compliant).
          </span>
        </div>
        <div className="font-mono text-xs font-medium text-foreground" data-api-unique-id='quoterequeststable-r8de4651d08ec76fa-s2943489518' data-api-unique-page-name='src/backend/components/AdminOperationsDashboard/QuoteRequestsTable'>
          Showing {filteredRequests.length} records
        </div>
      </div>
    </div>;
}