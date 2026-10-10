"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Calculator, CalendarClock, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import type { ClientBenefit } from "@/frontend/types/CustomerRegister";
import { CustomerLogin } from "@/frontend/route-params";
interface ClientBenefitsProps {
  benefits: ClientBenefit[];
}
export default function ClientBenefits({
  benefits
}: ClientBenefitsProps) {
  const router = useRouter();
  const renderIcon = (name: ClientBenefit["iconName"]) => {
    switch (name) {
      case "ClipboardList":
        return <ClipboardList className="h-5 w-5 text-accent" data-api-unique-id='clientbenefits-r25922608269aff94-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' />;
      case "Calculator":
        return <Calculator className="h-5 w-5 text-primary" data-api-unique-id='clientbenefits-rb41c341e621caca0-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' />;
      case "CalendarClock":
        return <CalendarClock className="h-5 w-5 text-accent" data-api-unique-id='clientbenefits-r1bd66584b69d5516-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-primary" data-api-unique-id='clientbenefits-r4bf1de715ae04e77-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' />;
    }
  };
  /* Extracted array: _items */
  const _items = ["1010–1090 Inner", "1100–1190 Central", "1200–1230 Outer"];
  return <div data-controller-name="Customer Benefits Overview" className="flex flex-col space-y-6" data-api-unique-id='clientbenefits-rc44e1523b9d89ca0-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
      {/* Title block */}
      <div className="space-y-2" data-api-unique-id='clientbenefits-r26e90c3db73be0f8-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
        <h2 className="font-header text-xl font-bold tracking-tight text-foreground sm:text-2xl" data-api-unique-id='clientbenefits-r338692c98682e7ac-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
          Client Account Onboarding Dossier
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground" data-api-unique-id='clientbenefits-r4354cb719265735e-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
          Establishing your dedicated client dossier unlocks real-time transparency for Viennese apartment renovations, Altbau restorations, and trade assignments.
        </p>
      </div>

      {/* 3 Core Client Benefits */}
      <div className="space-y-4" data-api-unique-id='clientbenefits-rf13dd0ad123f60d5-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
        {(benefits ?? []).map((benefit, index) => <div key={benefit.id} className="flex items-start gap-3.5 rounded-md border border-border bg-card p-4 text-card-foreground shadow-soft transition-colors" data-api-unique-id='clientbenefits-r0007ce2918c25b1f-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1'>
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background" data-api-unique-id='clientbenefits-r2a9a51401f7fb632-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1'>
              {renderIcon(benefit.iconName)}
            </div>
            <div className="min-w-0 flex-1 space-y-1" data-api-unique-id='clientbenefits-r1ff24e4e9fd20d39-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1'>
              <div className="flex flex-wrap items-center gap-2" data-api-unique-id='clientbenefits-r026890c16f9efd58-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1'>
                <h3 className="font-header text-sm font-semibold text-card-foreground" data-api-unique-id='clientbenefits-r982c239d5ce2ded4-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1' data-api-bind-info={`list-${index}-title`} data-api-map-var-name='benefit'>
                  {benefit.title}
                </h3>
                <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground" data-api-unique-id='clientbenefits-ra39a7113a6556123-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1' data-api-bind-info={`list-${index}-germanTag`} data-api-map-var-name='benefit'>
                  {benefit.germanTag}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground" data-api-unique-id='clientbenefits-r557c099dc00c1a1a-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1' data-api-bind-info={`list-${index}-description`} data-api-map-var-name='benefit'>
                {benefit.description}
              </p>
              <div className="pt-1" data-api-unique-id='clientbenefits-rfdc2d0f3ecb11a51-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1'>
                <span className="text-[11px] font-medium text-accent" data-api-unique-id='clientbenefits-r8542e63970e9e13c-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1' data-api-bind-info={`list-${index}-metricLabel`} data-api-map-var-name='benefit'>
                  {benefit.metricLabel}
                </span>
              </div>
            </div>
          </div>)}
      </div>

      {/* Vienna 23 Districts Coverage Badge */}
      <div className="rounded-md border border-border bg-card p-4 text-card-foreground shadow-soft" data-api-unique-id='clientbenefits-r5292b8b47c85c8b0-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
        <div className="flex items-start gap-3" data-api-unique-id='clientbenefits-r344d24b0d539f404-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground" data-api-unique-id='clientbenefits-rdb7528a1e1e22c48-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
            <MapPin className="h-4 w-4 text-accent" data-api-unique-id='clientbenefits-rc19957061720c32f-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5" data-api-unique-id='clientbenefits-ra5b1410dd33ca037-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
            <div className="flex flex-wrap items-center justify-between gap-2" data-api-unique-id='clientbenefits-rc562366001e3f9ec-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
              <span className="text-xs font-semibold text-card-foreground" data-api-unique-id='clientbenefits-r5d090c3a220a1a42-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
                Bezirk 1–23 Coverage Network
              </span>
              <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground" data-api-unique-id='clientbenefits-r8c4adc737c94bb23-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
                Vienna & Surrounds
              </span>
            </div>
            <p className="text-xs text-muted-foreground" data-api-unique-id='clientbenefits-rf2859a21d086c434-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
              Direct dispatch coverage from Innere Stadt (1010) through Liesing (1230), including historical Altbau high-ceiling specifications.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1" data-api-unique-id='clientbenefits-r24fd9bbd0cb3095c-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
              {_items.map((districtTag, index) => <span key={districtTag} className="rounded-sm border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground" data-api-unique-id='clientbenefits-r7015045ac72d22ab-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' data-api-in-loop='1' data-api-bind-info={`_items-${index}-$item`} data-api-map-var-name='districtTag'>
                  {districtTag}
                </span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation link to F08 Customer Login */}
      <div className="rounded-md border border-border bg-secondary/50 p-4 text-secondary-foreground" data-api-unique-id='clientbenefits-r8aa43f1e3121b6c6-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='clientbenefits-r02cdc319db9b87a3-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
          <div className="space-y-0.5" data-api-unique-id='clientbenefits-rc344986c4de6a953-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
            <p className="text-xs font-medium text-foreground" data-api-unique-id='clientbenefits-r7c798227fb89fbea-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
              Already possess a client account?
            </p>
            <p className="text-xs text-muted-foreground" data-api-unique-id='clientbenefits-rb2679a38338b7ff0-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
              Sign in directly to access pending quotes and scheduling ledger.
            </p>
          </div>
          <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-xs font-semibold text-card-foreground shadow-soft transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='clientbenefits-r56a9566457c6eff0-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>
            <span data-api-unique-id='clientbenefits-ra25730331f738813-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits'>Customer Login</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary" data-api-unique-id='clientbenefits-rfbf703617d844767-s1239332095' data-api-unique-page-name='src/frontend/components/CustomerRegister/ClientBenefits' />
          </button>
        </div>
      </div>
    </div>;
}