"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { CheckCircle2, ShieldCheck, MapPin, FileText } from "lucide-react";
import { ClientDossierPrivilege, CustomerPortalMetaOutput } from "@/frontend/types/CustomerLogin";
export interface GuidancePanelProps {
  meta?: CustomerPortalMetaOutput;
}
export default function GuidancePanel({
  meta
}: GuidancePanelProps = {}) {
  const minRate = meta?.minHourlyRateEur ?? 15;
  const districtCount = meta?.totalDistricts ?? 23;
  const privileges: ClientDossierPrivilege[] = [{
    id: "quote-inspection",
    specCode: "KV-PRÜFUNG",
    title: "Granular Estimate Verification",
    description: `Inspect detailed cost breakdowns (Kostenvoranschlag) with baseline hourly rates from €${minRate}/hr and material surcharge auditing.`
  }, {
    id: "site-dispatch",
    specCode: "HANDWERKER-TERMIN",
    title: "Artisan Dispatch & Schedule Tracking",
    description: `Monitor scheduled handyman arrivals, technician assignments, and lead times across all ${districtCount} central and outer Vienna districts.`
  }, {
    id: "dossier-history",
    specCode: "GEWÖ-ARCHIV",
    title: "Consolidated Repair Inquiries Archive",
    description: "Access unified maintenance ledgers for multiple residential or commercial units under Austrian trade regulations."
  }];
  return <div data-controller-name="Customer Guidance Section" className="flex flex-col justify-between space-y-8" data-api-unique-id='guidancepanel-racbd38b047ece614-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
      {/* Top Narrative and Seal */}
      <div className="space-y-6" data-api-unique-id='guidancepanel-ree3455088d842e55-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
        {/* District Stamp & Compliance Tag */}
        <div className="flex flex-wrap items-center gap-2.5" data-api-unique-id='guidancepanel-rd5c254391c4f354f-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground" data-api-unique-id='guidancepanel-r0582876ecd10159e-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
            <MapPin className="h-3.5 w-3.5" data-api-unique-id='guidancepanel-r07f5279565bb6ccf-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' />
            Districts 1010–1230 Vienna Coverage{meta?.totalDistricts ? ` (${meta.totalDistricts} Districts)` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1 text-xs font-medium text-card-foreground" data-api-unique-id='guidancepanel-rb8f719fcfe3581ca-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
            <ShieldCheck className="h-3.5 w-3.5 text-primary" data-api-unique-id='guidancepanel-rb7d2ead31f512db3-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' />
            GewO Compliant Handwerk
          </span>
        </div>

        {/* H1 Headline */}
        <div data-api-unique-id='guidancepanel-rb257aff26fd819c2-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-display" data-api-unique-id='guidancepanel-r660a07b8271b62f8-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
            Ihr Wiener Handwerker-Dossier
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg" data-api-unique-id='guidancepanel-re01541a34fb2e92c-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
            Dedicated customer portal for registered homeowners, tenants, and property
            managers across Vienna. Sign in to review your active quote inquiries, inspect
            incoming estimates, and verify scheduled handyman site visits.
          </p>
        </div>

        {/* Privilege Items */}
        <div className="space-y-4 pt-2" data-api-unique-id='guidancepanel-rd177696da2a1c0bd-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
          {privileges.map((item, index) => <div key={item.id} className="flex items-start gap-3.5 rounded-md border border-border bg-card/60 p-4 transition-colors hover:border-primary/40" data-api-unique-id='guidancepanel-r3d9d058f1785093e-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1'>
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary" data-api-unique-id='guidancepanel-r56693a92e2733b47-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1'>
                <CheckCircle2 className="h-4 w-4" data-api-unique-id='guidancepanel-r626d352f4c5dbdf0-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1' />
              </div>
              <div className="min-w-0 flex-1" data-api-unique-id='guidancepanel-rc09d05ebed1b5f4f-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1'>
                <div className="flex items-center justify-between gap-2" data-api-unique-id='guidancepanel-r5fe3491ca803f94a-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1'>
                  <h3 className="font-semibold text-foreground text-sm" data-api-unique-id='guidancepanel-r74b7d6489274e804-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1' data-api-bind-info={`privileges-${index}-title`} data-api-map-var-name='item'>
                    {item.title}
                  </h3>
                  <span className="shrink-0 rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground" data-api-unique-id='guidancepanel-r5f32d793d27bfe72-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1' data-api-bind-info={`privileges-${index}-specCode`} data-api-map-var-name='item'>
                    {item.specCode}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground" data-api-unique-id='guidancepanel-r4c37f2bb67c61988-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' data-api-in-loop='1' data-api-bind-info={`privileges-${index}-description`} data-api-map-var-name='item'>
                  {item.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>

      {/* Craftsmanship Visual Anchor Card */}
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-soft" data-api-unique-id='guidancepanel-r2bd0f89d926da071-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
        <div className="relative aspect-[16/9] w-full bg-muted" data-api-unique-id='guidancepanel-re3e8240fe471360b-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
          <EditableImg propKey="customer-login-craftsmanship-visual" keywords="vienna altbau interior renovation craftsmanship blueprint" description="Tactile Austrian Altbau renovation craftsmanship blueprint, restored parquet and artisan tools, natural sunlight, architectural precision photography" className="h-full w-full object-cover" data-api-unique-id='guidancepanel-r8d63060a2c10f843-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" data-api-unique-id='guidancepanel-rc8d0a014dd6d3560-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-sm bg-card/90 px-3 py-1.5 backdrop-blur-sm" data-api-unique-id='guidancepanel-rafa5fe41936ddd1b-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
            <div className="flex items-center gap-2" data-api-unique-id='guidancepanel-r112746c4ba56f168-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
              <FileText className="h-3.5 w-3.5 text-primary" data-api-unique-id='guidancepanel-r1ecafdb5b53f3ce9-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel' />
              <span className="text-xs font-semibold text-card-foreground" data-api-unique-id='guidancepanel-rc0a8eb8842fa1055-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
                Vienna Altbau Refurbishment Standard
              </span>
            </div>
            <span className="text-[11px] font-mono font-medium text-muted-foreground" data-api-unique-id='guidancepanel-ra0bc867dcd4717c0-s1648181523' data-api-unique-page-name='src/frontend/components/CustomerLogin/GuidancePanel'>
              Wien 1010-1230
            </span>
          </div>
        </div>
      </div>
    </div>;
}