"use client";

import React, { useState, useEffect } from "react";
import { QuoteRequestDetailDTO, LogisticsZone } from "@/backend/types/AdminQuoteDetail";
import { MapPin, User, Phone, Mail, Navigation, ShieldCheck, Building, Clock, ExternalLink, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
interface ClientDispatchDossierProps {
  quote: QuoteRequestDetailDTO;
  onUpdateQuote: (updates: Partial<QuoteRequestDetailDTO>) => void;
}
const ZONE_LABELS: Record<LogisticsZone, {
  label: string;
  desc: string;
  badge: string;
}> = {
  INNER_CITY: {
    label: "Zone 1 (Innere Stadt)",
    desc: "1010 Wien - Pedestrianized / Parking Permits",
    badge: "bg-accent text-accent-foreground"
  },
  CENTRAL: {
    label: "Zone 2 (Inner Ring Districts)",
    desc: "1020 - 1090 Wien - High Altbau Density",
    badge: "bg-primary text-primary-foreground"
  },
  OUTER_RING: {
    label: "Zone 3 (Outer Suburbs)",
    desc: "1100 - 1200 Wien - Standard Van Dispatch",
    badge: "bg-secondary text-secondary-foreground"
  },
  GREATER_SUBURB: {
    label: "Zone 4 (Vienna Perimeter / NÖ)",
    desc: "1210 - 1230 Wien - Perimeter Transit",
    badge: "bg-muted text-muted-foreground"
  }
};
export default function ClientDispatchDossier({
  quote,
  onUpdateQuote
}: ClientDispatchDossierProps) {
  const isCompleted = quote.status === "COMPLETED";
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [addressSnippet, setAddressSnippet] = useState<string>(quote.addressSnippet || "");
  useEffect(() => {
    if (!isEditingAddress) {
      setAddressSnippet(quote.addressSnippet || "");
    }
  }, [quote.addressSnippet, isEditingAddress]);
  const zoneInfo = quote.district && ZONE_LABELS[quote.district.zone] || ZONE_LABELS.CENTRAL;
  const handleSaveAddress = () => {
    if (isCompleted) return;
    onUpdateQuote({
      addressSnippet: addressSnippet.trim()
    });
    setIsEditingAddress(false);
    toast.success("Dispatch address snippet updated");
  };
  return <div data-controller-name="Client Contact Profile and Urban Dispatch Dossier" className="flex w-full min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-5" data-api-unique-id='clientdispatchdossier-rdafb7e1ec4a31c7e-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3" data-api-unique-id='clientdispatchdossier-r0e52f2e68107d029-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
        <div className="flex items-center gap-2" data-api-unique-id='clientdispatchdossier-r17ac98eeed6d3ebe-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground" data-api-unique-id='clientdispatchdossier-rcb684b4344c488c0-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <User className="h-4 w-4" data-api-unique-id='clientdispatchdossier-r0e08c59cef6202e3-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
          </div>
          <div className="flex flex-col" data-api-unique-id='clientdispatchdossier-rae2e0e5d69b27939-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <h3 className="font-header text-sm font-bold tracking-tight text-foreground" data-api-unique-id='clientdispatchdossier-rd5bccd677ad57794-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              Client & Dispatch Dossier
            </h3>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='clientdispatchdossier-rdea5e318e9207c99-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              Vienna Municipal Sector & Contact Channels
            </span>
          </div>
        </div>

        {quote.agreedToTerms && <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground border border-border" data-api-unique-id='clientdispatchdossier-r30006388fb6b67e5-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <ShieldCheck className="h-3 w-3 text-success" data-api-unique-id='clientdispatchdossier-r85825d939a8b7793-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
            GDPR Consent
          </span>}
      </div>

      {/* Customer Contact Details */}
      <div className="flex min-w-0 flex-col gap-2.5 rounded-lg border border-border bg-card p-3.5" data-api-unique-id='clientdispatchdossier-r1739ebfef789f9a7-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
        <div className="flex items-center justify-between" data-api-unique-id='clientdispatchdossier-r362a34841a43f959-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          <span className="font-display text-base font-bold text-foreground" data-api-unique-id='clientdispatchdossier-r4bedd502aa178fd5-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            {quote.clientName}
          </span>
          {quote.customer ? <span className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary" data-api-unique-id='clientdispatchdossier-r775a5f98c31c20e0-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              Registered Account #{quote.customer.id.slice(-6)}
            </span> : <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground" data-api-unique-id='clientdispatchdossier-r55e1b754a89d9fb4-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              Guest Inflow
            </span>}
        </div>

        <div className="flex flex-col gap-1.5 text-xs" data-api-unique-id='clientdispatchdossier-r1f7360c3c4be58da-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          {/* Direct Phone */}
          <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='clientdispatchdossier-r09f7f169df5895ef-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <span className="flex items-center gap-1.5" data-api-unique-id='clientdispatchdossier-r80fd474c82420955-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              <Phone className="h-3.5 w-3.5 text-primary" data-api-unique-id='clientdispatchdossier-r8f0ac2f6466d51a2-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              <span data-api-unique-id='clientdispatchdossier-rba70da1ce040f38b-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>Direct Phone:</span>
            </span>
            <a href={`tel:${quote.clientPhone}`} className="font-mono font-bold text-foreground transition hover:text-primary hover:underline" data-api-unique-id='clientdispatchdossier-rc55e64cc998b6383-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              {quote.clientPhone}
            </a>
          </div>

          {/* Email Address */}
          <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='clientdispatchdossier-r119011e3ef7d1ec5-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <span className="flex items-center gap-1.5" data-api-unique-id='clientdispatchdossier-rcafa42317cdd5d34-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              <Mail className="h-3.5 w-3.5 text-accent" data-api-unique-id='clientdispatchdossier-r64037b0b019c55aa-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              <span data-api-unique-id='clientdispatchdossier-rd95a1a8127e85b00-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>Email Address:</span>
            </span>
            <a href={`mailto:${quote.clientEmail}`} className="truncate font-mono font-semibold text-foreground transition hover:text-primary hover:underline max-w-[180px]" title={quote.clientEmail} data-api-unique-id='clientdispatchdossier-r19b1fab5fe163130-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              {quote.clientEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Vienna Postal District & Dispatch Zone */}
      <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-muted p-3.5 text-xs" data-api-unique-id='clientdispatchdossier-rdce0b8f2a6fed0f8-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
        <div className="flex items-center justify-between" data-api-unique-id='clientdispatchdossier-reeec1c87581e9770-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          <div className="flex items-center gap-1.5 text-foreground font-semibold" data-api-unique-id='clientdispatchdossier-raf24115d26047cf1-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <Building className="h-4 w-4 text-primary" data-api-unique-id='clientdispatchdossier-r22b34b732dd83cca-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
            <span data-api-unique-id='clientdispatchdossier-ra9a8fd47ded713f3-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              District {quote.district.districtNumber} ({quote.district.districtName})
            </span>
          </div>
          <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${zoneInfo.badge}`} data-api-unique-id='clientdispatchdossier-r54d673ab0f0c8122-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            {quote.district.zone.replace("_", " ")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]" data-api-unique-id='clientdispatchdossier-r8f7aeff1308697c0-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          <div className="flex flex-col rounded bg-card p-2 border border-border" data-api-unique-id='clientdispatchdossier-rb06ddd445645b0a1-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <span className="text-muted-foreground" data-api-unique-id='clientdispatchdossier-r19e4828fd3ff45e5-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>Vienna Postal Code</span>
            <span className="font-mono text-sm font-bold text-foreground" data-api-unique-id='clientdispatchdossier-r812e3f6ae69169eb-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              {quote.district.districtCode} Wien
            </span>
          </div>
          <div className="flex flex-col rounded bg-card p-2 border border-border" data-api-unique-id='clientdispatchdossier-r2fd2a446927fd548-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <span className="text-muted-foreground" data-api-unique-id='clientdispatchdossier-rd99864129dda0a8c-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>Standard Lead Time</span>
            <span className="flex items-center gap-1 font-mono text-sm font-bold text-foreground" data-api-unique-id='clientdispatchdossier-rc0d01987a3aa6939-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              <Clock className="h-3.5 w-3.5 text-primary" data-api-unique-id='clientdispatchdossier-re0dcbc6bec565597-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              {quote.district.leadTimeHours} Hours
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground leading-tight" data-api-unique-id='clientdispatchdossier-rb0386742e7631c5e-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          {zoneInfo.desc}
        </p>
      </div>

      {/* Address Snippet (Editable) */}
      <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-card p-3.5 text-xs" data-api-unique-id='clientdispatchdossier-r34b4a53b409732c6-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
        <div className="flex items-center justify-between" data-api-unique-id='clientdispatchdossier-rdd7a4888418bc9e8-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
          <div className="flex items-center gap-1.5 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]" data-api-unique-id='clientdispatchdossier-r05a28d953a8c4b53-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <MapPin className="h-3.5 w-3.5 text-primary" data-api-unique-id='clientdispatchdossier-rb0c0986289fe869d-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
            <span data-api-unique-id='clientdispatchdossier-r97df10facb310077-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>On-Site Address / Intercom</span>
          </div>

          {!isCompleted && !isEditingAddress && <button type="button" onClick={() => setIsEditingAddress(true)} className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-primary hover:underline focus-visible:outline-none" data-api-unique-id='clientdispatchdossier-r9916346bf94a32ce-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              <Edit2 className="h-3 w-3" data-api-unique-id='clientdispatchdossier-rb98f65761309001e-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              <span data-api-unique-id='clientdispatchdossier-r2e1116470612510e-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>Edit</span>
            </button>}
        </div>

        {isEditingAddress ? <div className="flex flex-col gap-2" data-api-unique-id='clientdispatchdossier-re32b92841118fa04-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <input type="text" value={addressSnippet} onChange={e => setAddressSnippet(e.target.value)} placeholder="e.g. Neubaugasse 45/Tür 12, 1070 Wien" className="rounded border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" data-api-unique-id='clientdispatchdossier-r417406c5900c9c19-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
            <div className="flex items-center justify-end gap-1.5" data-api-unique-id='clientdispatchdossier-reb6c23a84ec8e162-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              <button type="button" onClick={() => {
            setAddressSnippet(quote.addressSnippet || "");
            setIsEditingAddress(false);
          }} className="rounded border border-border bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground hover:bg-secondary" data-api-unique-id='clientdispatchdossier-rfe5bb2a18ac454de-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
                <X className="h-3 w-3" data-api-unique-id='clientdispatchdossier-rc7dcb1df0662c9b6-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              </button>
              <button type="button" onClick={handleSaveAddress} className="rounded bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground hover:bg-primary/90" data-api-unique-id='clientdispatchdossier-r20ed27c08044114a-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
                <Check className="h-3 w-3" data-api-unique-id='clientdispatchdossier-rf15f2e451f2684e5-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              </button>
            </div>
          </div> : <div className="flex items-start justify-between gap-2" data-api-unique-id='clientdispatchdossier-rc9dd38efd1588462-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
            <p className="font-mono text-xs font-semibold text-foreground" data-api-unique-id='clientdispatchdossier-r9c0bd3780ef2de80-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              {quote.addressSnippet || "Address details given via phone consultation"}
            </p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(`${quote.addressSnippet || ""}, ${quote.district.districtCode} Wien, Austria`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded bg-muted px-2 py-1 text-[10px] font-medium text-foreground hover:bg-secondary transition" title="Open in Google Maps" data-api-unique-id='clientdispatchdossier-rb6f4f3268c5e6dad-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>
              <Navigation className="h-3 w-3 text-primary" data-api-unique-id='clientdispatchdossier-r78b7faa312584104-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
              <span data-api-unique-id='clientdispatchdossier-r16cd3d473d2368a1-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier'>Route</span>
              <ExternalLink className="h-2.5 w-2.5" data-api-unique-id='clientdispatchdossier-r33fe9acc7496c7a2-s3385004518' data-api-unique-page-name='src/backend/components/AdminQuoteDetail/ClientDispatchDossier' />
            </a>
          </div>}
      </div>
    </div>;
}