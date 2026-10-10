"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertOctagon, Scale, BookOpen } from "lucide-react";
import { ServiceCategoryDetailDTO, LanguageCode } from "@/frontend/types/ServiceCategoryDetail";
interface LegalScopeComparisonProps {
  category: ServiceCategoryDetailDTO;
  activeLang: LanguageCode;
}
export default function LegalScopeComparison({
  category,
  activeLang
}: LegalScopeComparisonProps) {
  const getPermittedTasks = (): string[] => {
    switch (activeLang) {
      case "DE":
        return category.permittedActivitiesDe || [];
      case "RU":
        return category.permittedActivitiesRu || [];
      case "EN":
      default:
        return category.permittedActivitiesEn || [];
    }
  };
  const getPartnerTasks = (): string[] => {
    switch (activeLang) {
      case "DE":
        return category.licensedPartnerActivitiesDe || [];
      case "RU":
        return category.licensedPartnerActivitiesRu || [];
      case "EN":
      default:
        return category.licensedPartnerActivitiesEn || [];
    }
  };
  const permittedTasks = getPermittedTasks();
  const partnerTasks = getPartnerTasks();
  return <section data-controller-name="Legal Scope Comparison" className="w-full border-b border-border bg-background" data-api-unique-id='legalscopecomparison-r11bdecc8359e3266-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" data-api-unique-id='legalscopecomparison-r807ef915ae6c95f3-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
        {/* Section Title */}
        <div className="space-y-3 mb-10" data-api-unique-id='legalscopecomparison-rc0bc0dabcb820a9f-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
          <div className="inline-flex items-center gap-2 rounded-sm bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider" data-api-unique-id='legalscopecomparison-r787370fe86a319f0-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
            <Scale className="w-3.5 h-3.5 text-accent-foreground" data-api-unique-id='legalscopecomparison-rfb16b77d5af6924f-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' />
            {category.gewoParagraph || "Austrian Trade Licensing Act (GewO 1994)"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display" data-api-unique-id='legalscopecomparison-r946059781ba36528-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
            Dual-Track Trade Compliance & Operational Scope
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-api-unique-id='legalscopecomparison-r6a02c95dc3412e80-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
            In Austria, trade regulations strictly segregate unregulated handyman assembly from regulated master craft disciplines. Vienna Handwerk enforces full legal transparency to protect residential and commercial property owners.
          </p>
        </div>

        {/* Dual Track Two-Tone Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" data-api-unique-id='legalscopecomparison-r8e63e32f813001c2-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
          {/* Left Panel: Permitted Handyman Scope (Warm Limestone Canvas) */}
          <div className="rounded-lg border-2 border-border bg-card text-card-foreground p-6 sm:p-8 shadow-soft space-y-6" data-api-unique-id='legalscopecomparison-r6ff0189fcd93f44f-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4" data-api-unique-id='legalscopecomparison-r09321e30e0496104-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
              <div data-api-unique-id='legalscopecomparison-rfca0ce5f01769c2b-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-success" data-api-unique-id='legalscopecomparison-r9f6f9e1169ff1f21-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                  <CheckCircle2 className="w-4 h-4 text-success" data-api-unique-id='legalscopecomparison-rc71ff5f819afa33b-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' />
                  Direct Handyman Execution (GewO § 5)
                </span>
                <h3 className="text-xl font-bold text-card-foreground mt-1" data-api-unique-id='legalscopecomparison-ree3bf4c29eeb4068-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                  Permitted Handyman Tasks
                </h3>
              </div>
              <span className="rounded-sm bg-secondary text-secondary-foreground px-2.5 py-1 text-xs font-semibold whitespace-nowrap" data-api-unique-id='legalscopecomparison-r5fcc68d786fe355b-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                Freies Gewerbe
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='legalscopecomparison-rc54a1a196428f06a-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
              These tasks are carried out directly by our skilled assembly technicians without requiring a restricted master craftsman certificate.
            </p>

            {/* List of Permitted Tasks */}
            {permittedTasks.length > 0 ? <ul className="space-y-3" data-api-unique-id='legalscopecomparison-rcc9b2d2617dba7cb-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                {permittedTasks.map((task, index) => <li key={index} className="flex items-start gap-3 text-sm" data-api-unique-id='legalscopecomparison-re0ffe2156cd9cf66-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' data-api-in-loop='1'>
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" data-api-unique-id='legalscopecomparison-r3635a13c5dad5ee2-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' data-api-in-loop='1' />
                    <span className="text-card-foreground leading-snug" data-api-unique-id='legalscopecomparison-r2075653484fca5df-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' data-api-in-loop='1' data-api-bind-info={`permittedTasks-${index}-$item`} data-api-map-var-name='task'>{task}</span>
                  </li>)}
              </ul> : <p className="text-xs text-muted-foreground italic" data-api-unique-id='legalscopecomparison-rf91651cf283154a3-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>No permitted tasks listed for this category.</p>}

            <div className="rounded-md border border-border bg-background text-foreground p-4 text-xs space-y-1.5" data-api-unique-id='legalscopecomparison-rc9f634ebb9808347-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
              <span className="font-bold text-foreground block flex items-center gap-1.5" data-api-unique-id='legalscopecomparison-r6edc6ae211c24afb-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                <ShieldCheck className="w-3.5 h-3.5 text-success" data-api-unique-id='legalscopecomparison-rdce46896e9cf67e4-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' />
                Civil Liability & Quality Guarantee
              </span>
              <p className="text-muted-foreground leading-relaxed" data-api-unique-id='legalscopecomparison-rb6526a398569b3e8-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                Covered under Vienna Handwerk’s €3,000,000 commercial business liability insurance (Betriebshaftpflichtversicherung).
              </p>
            </div>
          </div>

          {/* Right Panel: Subcontracted Meister Partner Scope (Danube Slate Steel) */}
          <div className="rounded-lg border-2 border-accent bg-accent text-accent-foreground p-6 sm:p-8 shadow-elevated space-y-6" data-api-unique-id='legalscopecomparison-rba9b7e903123e341-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
            <div className="flex items-start justify-between gap-4 border-b border-accent-foreground/20 pb-4" data-api-unique-id='legalscopecomparison-r7c731074bed35a49-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
              <div data-api-unique-id='legalscopecomparison-rad5ddab3ffcb1771-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-warning" data-api-unique-id='legalscopecomparison-r3354ec878515a6ed-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                  <AlertOctagon className="w-4 h-4 text-warning" data-api-unique-id='legalscopecomparison-r72cd076dcbb216f2-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' />
                  Restricted Trade Protocol (GewO § 94)
                </span>
                <h3 className="text-xl font-bold text-accent-foreground mt-1" data-api-unique-id='legalscopecomparison-r92a6c61cde89684d-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                  Certified Meister Partner Tasks
                </h3>
              </div>
              <span className="rounded-sm bg-accent-foreground/10 text-accent-foreground px-2.5 py-1 text-xs font-semibold whitespace-nowrap border border-accent-foreground/20" data-api-unique-id='legalscopecomparison-rc815a94c8ae72cf1-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                Meisterbetrieb
              </span>
            </div>

            <p className="text-xs sm:text-sm text-accent-foreground/80 leading-relaxed" data-api-unique-id='legalscopecomparison-r50309c15ecebf97a-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
              High-risk structural, electrical, and gas activities that legally mandate certified master technicians. Subcontracted through vetted Austrian Meister partners.
            </p>

            {/* List of Meister Partner Tasks */}
            {partnerTasks.length > 0 ? <ul className="space-y-3" data-api-unique-id='legalscopecomparison-re1f753f78fa4df42-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                {partnerTasks.map((task, index) => <li key={index} className="flex items-start gap-3 text-sm" data-api-unique-id='legalscopecomparison-r7d7c7aec14d21bb6-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' data-api-in-loop='1'>
                    <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" data-api-unique-id='legalscopecomparison-rfc63d1eb348dfdaa-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' data-api-in-loop='1' />
                    <span className="text-accent-foreground leading-snug" data-api-unique-id='legalscopecomparison-r476359540fe70ed1-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' data-api-in-loop='1' data-api-bind-info={`partnerTasks-${index}-$item`} data-api-map-var-name='task'>{task}</span>
                  </li>)}
              </ul> : <p className="text-xs text-accent-foreground/70 italic" data-api-unique-id='legalscopecomparison-r8766094e227de4af-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>No subcontracted master tasks required for this category.</p>}

            <div className="rounded-md border border-accent-foreground/20 bg-accent-foreground/5 p-4 text-xs space-y-1.5" data-api-unique-id='legalscopecomparison-r077ce37ac3a95f8a-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
              <span className="font-bold text-accent-foreground block flex items-center gap-1.5" data-api-unique-id='legalscopecomparison-r1452ec3e0cdcd52f-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                <BookOpen className="w-3.5 h-3.5 text-warning" data-api-unique-id='legalscopecomparison-r7166d899dac7254c-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison' />
                Austrian Meister Certification Protocol
              </span>
              <p className="text-accent-foreground/80 leading-relaxed" data-api-unique-id='legalscopecomparison-r49040155e365db76-s730007907' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/LegalScopeComparison'>
                All statutory safety certificates (Prüfprotokolle, Gasbefunde) are signed exclusively by licensed Austrian Meisterbetrieb guild masters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}