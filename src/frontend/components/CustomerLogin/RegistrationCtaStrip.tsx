"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowRight, Building2, BellRing, Hammer } from "lucide-react";
import { CustomerRegister } from "@/frontend/route-params";
import { RegistrationBenefit } from "@/frontend/types/CustomerLogin";
export interface RegistrationCtaStripProps {
  minHourlyRateEur?: number;
}
const REGISTRATION_BENEFITS: RegistrationBenefit[] = [{
  id: "portfolio-management",
  title: "Consolidated Multi-Property Maintenance",
  description: "Manage repairs for multiple Vienna apartments, rental units, or business premises under a single client master ID."
}, {
  id: "instant-notifications",
  title: "Direct Estimate & Dispatch Notifications",
  description: "Receive automated SMS and email alerts when craftsmen issue cost proposals or confirm appointment arrival windows."
}];
export default function RegistrationCtaStrip({
  minHourlyRateEur = 15
}: RegistrationCtaStripProps = {}) {
  const router = useRouter();
  const effectiveMinRate = minHourlyRateEur > 0 ? minHourlyRateEur : 15;
  return <section data-controller-name="Customer Registration CTA Strip" className="w-full border-t border-border bg-accent text-accent-foreground py-12 sm:py-16" data-api-unique-id='registrationctastrip-rd43aa3a45d71d87a-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='registrationctastrip-r3eaf3040fc409901-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
        <div className="relative overflow-hidden rounded-xl border border-border/20 bg-accent p-6 sm:p-10" data-api-unique-id='registrationctastrip-r9b14ae2ecd0169c8-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
          {/* Subtle Blueprint grid effect */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" data-api-unique-id='registrationctastrip-rfc8cfa1754fdd7d8-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center" data-api-unique-id='registrationctastrip-rac3322adad6f194a-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
            {/* Left Narrative */}
            <div className="space-y-4 lg:col-span-8" data-api-unique-id='registrationctastrip-r85e2ba2a03a30c2a-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
              <div className="inline-flex items-center gap-2 rounded-sm bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground border border-primary/30" data-api-unique-id='registrationctastrip-ra695dfa489585bae-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
                <UserPlus className="h-3.5 w-3.5 text-primary-foreground" data-api-unique-id='registrationctastrip-rdd998e897b06932a-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' />
                First-Time Vienna Clients
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-accent-foreground sm:text-3xl font-header" data-api-unique-id='registrationctastrip-rd772c5f48f54fbdf-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
                Ready to Commission Your First Home Repair?
              </h2>
              <p className="text-sm leading-relaxed text-accent-foreground/80 sm:text-base" data-api-unique-id='registrationctastrip-rc79cc5c3430c0271-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
                Create a registered customer account to submit structured trade inquiries, receive binding written estimates within 24 hours, and track verified Viennese craftsmen on-site.
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2" data-api-unique-id='registrationctastrip-r252541c5e2796e60-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
                {REGISTRATION_BENEFITS.map((benefit, index) => <div key={benefit.id} className="flex items-start gap-3 rounded-md bg-white/5 p-3.5 border border-white/10" data-api-unique-id='registrationctastrip-rd14b13ef4c92e8c7-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1'>
                    <div className="mt-0.5 rounded-sm bg-primary p-1 text-primary-foreground" data-api-unique-id='registrationctastrip-r898a5f0b0130670d-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1'>
                      {benefit.id === "portfolio-management" ? <Building2 className="h-3.5 w-3.5" data-api-unique-id='registrationctastrip-rb195b0f70b576c71-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1' /> : <BellRing className="h-3.5 w-3.5" data-api-unique-id='registrationctastrip-r1a773492aaf34057-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1' />}
                    </div>
                    <div className="min-w-0 flex-1" data-api-unique-id='registrationctastrip-r561dbedf2d4ee8fa-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1'>
                      <h4 className="text-xs font-semibold text-accent-foreground" data-api-unique-id='registrationctastrip-rcc68a6ecc812a95f-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1' data-api-bind-info={`REGISTRATION_BENEFITS-${index}-title`} data-api-map-var-name='benefit'>
                        {benefit.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] leading-normal text-accent-foreground/70" data-api-unique-id='registrationctastrip-rfa1de6c727ce4196-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' data-api-in-loop='1' data-api-bind-info={`REGISTRATION_BENEFITS-${index}-description`} data-api-map-var-name='benefit'>
                        {benefit.description}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Right Action Stack */}
            <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end" data-api-unique-id='registrationctastrip-r7cd70be367474241-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
              <button type="button" onClick={() => CustomerRegister.navigateTo(router)} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto" data-api-unique-id='registrationctastrip-r107012989df9891f-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
                <span data-api-unique-id='registrationctastrip-ra211bac624969898-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>Register New Customer Account</span>
                <ArrowRight className="h-4 w-4" data-api-unique-id='registrationctastrip-r01d9caed51058f4d-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' />
              </button>
              <div className="flex items-center gap-2 text-xs text-accent-foreground/70" data-api-unique-id='registrationctastrip-rd6c56d9ce1f91c90-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>
                <Hammer className="h-3.5 w-3.5" data-api-unique-id='registrationctastrip-r586ab1407b1aec3b-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip' />
                <span data-api-unique-id='registrationctastrip-re754fb9fa1e49629-s1267203191' data-api-unique-page-name='src/frontend/components/CustomerLogin/RegistrationCtaStrip'>Immediate access to baseline rates from €{effectiveMinRate}/hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}