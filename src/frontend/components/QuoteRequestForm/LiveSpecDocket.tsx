"use client";

import React from "react";
import { ServiceCategoryItem, ViennaDistrictItem, QuoteFormData, SubmittedQuoteReceipt } from "@/frontend/types/QuoteRequestForm";
import { FileText, Clock, MapPin, ShieldCheck, CheckCircle2, Calendar, AlertCircle, ArrowRight } from "lucide-react";
interface LiveSpecDocketProps {
  category: ServiceCategoryItem;
  district: ViennaDistrictItem;
  formData: QuoteFormData;
  submittedReceipt: SubmittedQuoteReceipt | null;
  isSubmitting: boolean;
  onSubmit: () => void;
  onReset: () => void;
}
export default function LiveSpecDocket({
  category,
  district,
  formData,
  submittedReceipt,
  isSubmitting,
  onSubmit,
  onReset
}: LiveSpecDocketProps) {
  const calculatedBudget = formData.estimatedHours * category.baselineHourlyRate;
  const isFormValid = formData.taskTitle.trim().length > 0 && formData.taskDescription.trim().length > 0 && formData.street.trim().length > 0 && formData.buildingNumber.trim().length > 0 && formData.clientName.trim().length > 0 && formData.clientEmail.trim().length > 0 && formData.clientPhone.trim().length > 0 && formData.agreedToTerms;
  if (submittedReceipt) {
    return <div data-controller-name="Quote Confirmation Docket" className="bg-card text-card-foreground border-2 border-primary rounded-lg p-6 sm:p-8 space-y-6 shadow-elevated" data-api-unique-id='livespecdocket-r2335684e10e0c89f-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
        <div className="text-center space-y-2 border-b border-border pb-5" data-api-unique-id='livespecdocket-rfd5c103a8d085187-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <div className="w-12 h-12 rounded-full bg-success text-success-foreground flex items-center justify-center mx-auto mb-2 shadow-soft" data-api-unique-id='livespecdocket-rf1bec89a064f50e3-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <CheckCircle2 className="w-6 h-6" data-api-unique-id='livespecdocket-rc6ac1e9ca87f08d4-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
          </div>
          <span className="inline-block text-xs uppercase tracking-wider font-mono font-semibold px-2.5 py-0.5 rounded bg-secondary text-secondary-foreground" data-api-unique-id='livespecdocket-r89da9a47e03b6e8b-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            Quote Request Registered • Status: {submittedReceipt.status}
          </span>
          <h2 className="text-2xl font-extrabold font-display text-foreground" data-api-unique-id='livespecdocket-r19634e85ace0a951-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            Order Docket Created
          </h2>
          <p className="text-xs text-muted-foreground" data-api-unique-id='livespecdocket-red4c3066602ff47e-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            Official Austrian Craftsman Specification & Labor Estimate
          </p>
        </div>

        {/* Generated Human-Readable Tracking Code */}
        <div className="p-4 rounded-md bg-background border border-primary/40 text-center space-y-1" data-api-unique-id='livespecdocket-red49862c9fd2a662-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground block font-mono" data-api-unique-id='livespecdocket-raaeba2d0b0e7215e-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            Unique Tracking Code
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-primary tracking-wide" data-api-unique-id='livespecdocket-r6709dc22252139be-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            {submittedReceipt.trackingCode}
          </div>
          <p className="text-[11px] text-muted-foreground" data-api-unique-id='livespecdocket-r9be1deef137a6cb4-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            Saved to system. Keep this tracking code to check status on Customer Quotes Tracking (F07).
          </p>
        </div>

        {/* Calculated Breakdown Spec */}
        <div className="space-y-3 text-xs divide-y divide-border/60" data-api-unique-id='livespecdocket-r8241b6422340eeea-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <div className="flex items-center justify-between pt-2" data-api-unique-id='livespecdocket-rf766fa31d51cf105-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-muted-foreground" data-api-unique-id='livespecdocket-r983aad12965e68c5-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Trade Category:</span>
            <span className="font-semibold text-foreground" data-api-unique-id='livespecdocket-rd16bc96645c2525a-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>{submittedReceipt.categoryTitle}</span>
          </div>
          <div className="flex items-center justify-between pt-2" data-api-unique-id='livespecdocket-rc5a371963bb3d40e-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-muted-foreground" data-api-unique-id='livespecdocket-r90217985cfbc6c5b-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Postal District & Zone:</span>
            <span className="font-semibold text-foreground" data-api-unique-id='livespecdocket-rbd908c43e8be5f74-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
              {submittedReceipt.districtCode} Wien ({submittedReceipt.districtName})
            </span>
          </div>
          <div className="flex items-center justify-between pt-2" data-api-unique-id='livespecdocket-rb8ae67e3796ae5f9-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-muted-foreground" data-api-unique-id='livespecdocket-r0fa0413c6d983b60-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Labor Rate:</span>
            <span className="font-mono text-foreground" data-api-unique-id='livespecdocket-r737356a7e8534abc-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
              € {submittedReceipt.baselineHourlyRate.toFixed(2)}/h × {submittedReceipt.estimatedHours} hrs
            </span>
          </div>
          <div className="flex items-center justify-between pt-2" data-api-unique-id='livespecdocket-r7fae08066ab8ff80-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-muted-foreground" data-api-unique-id='livespecdocket-r466000b6069a043a-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Urban Logistics Window:</span>
            <span className="font-mono text-foreground" data-api-unique-id='livespecdocket-r325376bda71637b4-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>{submittedReceipt.leadTimeHours} Hours</span>
          </div>
          <div className="flex items-center justify-between pt-2" data-api-unique-id='livespecdocket-rb322ea7c4a864713-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-muted-foreground" data-api-unique-id='livespecdocket-r86be4eb109c73303-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Target Date & Slot:</span>
            <span className="text-foreground" data-api-unique-id='livespecdocket-r0b0a2c1a01da2753-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
              {submittedReceipt.preferredDate} ({submittedReceipt.preferredTimeSlot})
            </span>
          </div>
          <div className="flex items-center justify-between pt-2" data-api-unique-id='livespecdocket-re2c1e5936119c1b8-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-muted-foreground" data-api-unique-id='livespecdocket-rcb9efd4cb09d7ed0-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Worksite Snippet:</span>
            <span className="text-foreground truncate max-w-[200px] text-right" data-api-unique-id='livespecdocket-rd81c720194bd96e1-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
              {submittedReceipt.addressSummary}
            </span>
          </div>
        </div>

        {/* Total Cost Highlight */}
        <div className="p-4 rounded-md bg-secondary text-secondary-foreground border border-border flex items-center justify-between" data-api-unique-id='livespecdocket-r93c10331393fd16c-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <div data-api-unique-id='livespecdocket-r63da6f6ec89f9b12-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <span className="text-[11px] text-muted-foreground uppercase block font-mono" data-api-unique-id='livespecdocket-rbecdb0294452ecc6-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
              Estimated Total (excl. Mat.)
            </span>
            <span className="text-2xl font-bold font-mono text-primary" data-api-unique-id='livespecdocket-r60e39bd8b0d6612d-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
              € {submittedReceipt.estimatedBudgetEur.toFixed(2)}
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-accent text-accent-foreground font-semibold uppercase" data-api-unique-id='livespecdocket-re10930c1fff44620-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            GewO § 94 Checked
          </span>
        </div>

        {/* Reset / New Quote CTA */}
        <button type="button" onClick={onReset} className="w-full bg-card hover:bg-muted text-foreground border border-border font-semibold py-3 px-4 rounded-md text-sm transition-colors text-center" data-api-unique-id='livespecdocket-r28c87d363ec58d15-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          Submit Another Quote Request
        </button>
      </div>;
  }
  return <div data-controller-name="Live Spec Docket Summary" className="bg-card text-card-foreground border-2 border-primary rounded-lg p-6 sm:p-8 space-y-6 shadow-elevated sticky top-24" data-api-unique-id='livespecdocket-r419bae8c6d87ad58-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
      <div className="flex items-center justify-between border-b border-border pb-4" data-api-unique-id='livespecdocket-r0a2935414848ec83-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
        <div className="flex items-center gap-2" data-api-unique-id='livespecdocket-r2e4f8e28efcd9cf5-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <FileText className="w-5 h-5 text-primary" data-api-unique-id='livespecdocket-r4c3aecf5056f3584-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
          <h3 className="font-bold font-header text-lg text-foreground" data-api-unique-id='livespecdocket-r861f1d1f13940243-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            Live Spec Docket
          </h3>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground" data-api-unique-id='livespecdocket-rf861cc2be6381b62-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          Real-time €/h
        </span>
      </div>

      {/* Terracotta Big Price Callout */}
      <div className="p-5 rounded-md bg-background border border-border space-y-2 text-center" data-api-unique-id='livespecdocket-r9fe175a0e6362b1f-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block" data-api-unique-id='livespecdocket-rfceed7bb08881d7b-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          Calculated Labor Estimate
        </span>
        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight" data-api-unique-id='livespecdocket-r1a999bc7b14ed5b3-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          € {calculatedBudget.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground" data-api-unique-id='livespecdocket-re08a29b0c4ca1aef-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          {formData.estimatedHours} hours × € {category.baselineHourlyRate.toFixed(2)}/h baseline rate
        </p>
      </div>

      {/* Real-time Parameters Review */}
      <div className="space-y-2.5 text-xs" data-api-unique-id='livespecdocket-r4582d5457bf2ee36-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
        <div className="flex items-center justify-between p-2 rounded bg-background border border-border/60" data-api-unique-id='livespecdocket-r02d098cd6f0041d4-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <span className="text-muted-foreground flex items-center gap-1.5" data-api-unique-id='livespecdocket-rfc2c53c4b633b2d4-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='livespecdocket-r54e2df86b3b8925e-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
            Trade Discipline:
          </span>
          <span className="font-semibold text-foreground text-right truncate max-w-[150px]" data-api-unique-id='livespecdocket-r88e202507349e469-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            {category.titleEn}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-background border border-border/60" data-api-unique-id='livespecdocket-r032a9c6669e53157-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <span className="text-muted-foreground flex items-center gap-1.5" data-api-unique-id='livespecdocket-r9781dd111e216b57-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='livespecdocket-r9c38c09db432e6c2-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
            District Logistics:
          </span>
          <span className="font-semibold text-foreground" data-api-unique-id='livespecdocket-ra5fcedabe7d6776c-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            {district.districtCode} ({district.zone.replace("_", " ")})
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-background border border-border/60" data-api-unique-id='livespecdocket-r370a7551cd91a652-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <span className="text-muted-foreground flex items-center gap-1.5" data-api-unique-id='livespecdocket-rd63981b8be4773ef-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='livespecdocket-re7296c9397de37fe-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
            Dispatch Window:
          </span>
          <span className="font-mono font-bold text-foreground" data-api-unique-id='livespecdocket-rb188f57abf08454b-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            ~{district.leadTimeHours} Hours
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-background border border-border/60" data-api-unique-id='livespecdocket-rbaa2982fc1916c3f-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <span className="text-muted-foreground flex items-center gap-1.5" data-api-unique-id='livespecdocket-r412fa6fe32fb20c3-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='livespecdocket-r0e09c25fcfc405a2-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
            Target Date:
          </span>
          <span className="text-foreground" data-api-unique-id='livespecdocket-r2213129238ca6cf1-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            {formData.preferredDate || "Not chosen"} ({formData.preferredTimeSlot})
          </span>
        </div>
      </div>

      {/* Austrian GewO Legal Compliance Notice */}
      <div className="p-3.5 rounded-md bg-secondary text-secondary-foreground border-l-4 border-l-accent space-y-1 text-xs" data-api-unique-id='livespecdocket-r4c6772f398b06d8f-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
        <div className="flex items-center gap-1.5 font-bold text-foreground" data-api-unique-id='livespecdocket-rf96edc0842a241a1-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          <ShieldCheck className="w-3.5 h-3.5 text-accent" data-api-unique-id='livespecdocket-rfc882b3c04914c06-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
          <span data-api-unique-id='livespecdocket-r0d99d92a24f4c4e3-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>GewO § 94 Handwerk Compliance</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed" data-api-unique-id='livespecdocket-r7664ba0d69dca514-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          {category.craftClassification === "FREIES_HANDWERK" ? "Free Handyman Trade: Direct execution under Austrian Gewerbeordnung guidelines." : "Licensed Master Trade: Executed in verified partnership with registered Austrian Meisterbetrieb."}
        </p>
      </div>

      {/* Primary Action Button */}
      <div className="space-y-3 pt-2" data-api-unique-id='livespecdocket-r5159cc0cbea738af-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
        <button type="button" onClick={onSubmit} disabled={!isFormValid || isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-6 rounded-md shadow-primary text-base transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='livespecdocket-r939b04b2758a9899-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
          {isSubmitting ? <span data-api-unique-id='livespecdocket-r304f1bbe3ab153bf-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Generating Tracking Docket...</span> : <>
              <span data-api-unique-id='livespecdocket-r571b588c14270e10-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Submit Binding Quote Request</span>
              <ArrowRight className="w-4 h-4" data-api-unique-id='livespecdocket-r4c0a467756170dd9-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
            </>}
        </button>

        {!isFormValid && <p className="text-[11px] text-destructive text-center flex items-center justify-center gap-1" data-api-unique-id='livespecdocket-r52e97eb266d1255d-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>
            <AlertCircle className="w-3.5 h-3.5 shrink-0" data-api-unique-id='livespecdocket-r9f5501d5c5809d2b-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket' />
            <span data-api-unique-id='livespecdocket-refa5b6cb5ba67d63-s3267669849' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/LiveSpecDocket'>Please complete address, task details, contact and terms.</span>
          </p>}
      </div>
    </div>;
}