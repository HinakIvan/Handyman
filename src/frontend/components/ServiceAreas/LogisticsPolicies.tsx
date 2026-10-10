"use client";

import React from "react";
import { LogisticsPolicyRule } from "@/frontend/types/ServiceAreas";
import { ShieldCheck, FileText, CheckCircle2, PhoneCall } from "lucide-react";
interface LogisticsPoliciesProps {
  policies: LogisticsPolicyRule[];
}
export default function LogisticsPolicies({
  policies
}: LogisticsPoliciesProps) {
  return <section data-controller-name="Vienna Logistics Policies" className="w-full bg-accent text-accent-foreground py-14 md:py-20 border-b border-border" data-api-unique-id='logisticspolicies-r2d57210772ab80cb-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-api-unique-id='logisticspolicies-r1003e9cb8939ac2a-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
        {/* Section Header */}
        <div className="max-w-3xl space-y-3" data-api-unique-id='logisticspolicies-r86b2c45f43738240-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider" data-api-unique-id='logisticspolicies-r475fecf0239e1c2b-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" data-api-unique-id='logisticspolicies-r9a4543ed22325a18-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' />
            <span data-api-unique-id='logisticspolicies-r5a575b297dd72da4-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>Danube Municipal Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-accent-foreground font-display" data-api-unique-id='logisticspolicies-r720b29269bca3d3c-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
            Parking, Altbau Freight & Regional Logistics Policies
          </h2>
          <p className="text-sm sm:text-base text-accent-foreground/80 leading-relaxed" data-api-unique-id='logisticspolicies-r5add3b73c17cf721-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
            Strict Austrian GewO compliance, official Viennese craftsman parking exemptions, and transparent transit terms without hidden surcharges.
          </p>
        </div>

        {/* 3 Boxed Rule Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-api-unique-id='logisticspolicies-r005a1fcf7d8b1c3a-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
          {policies && policies.length > 0 ? policies.map((rule, index) => <div key={rule.id} className="rounded-lg bg-card text-card-foreground border border-border p-6 shadow-soft flex flex-col justify-between" data-api-unique-id='logisticspolicies-r031420fb04695a68-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                <div className="space-y-4" data-api-unique-id='logisticspolicies-r33f4b9c6ae812dd5-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                  {/* Header Tag and Title */}
                  <div data-api-unique-id='logisticspolicies-rafc07991a04beabd-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                    <div className="flex items-center justify-between gap-2 mb-2" data-api-unique-id='logisticspolicies-r97cac44f77ab334c-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary" data-api-unique-id='logisticspolicies-ra575581c1b01a5e0-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' data-api-bind-info={`policies-${index}-ruleCategory`} data-api-map-var-name='rule'>
                        {rule.ruleCategory}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground" data-api-unique-id='logisticspolicies-r082d7bd8e70978a9-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' data-api-bind-info={`policies-${index}-badgeDe`} data-api-map-var-name='rule'>
                        {rule.badgeDe}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground font-display leading-snug" data-api-unique-id='logisticspolicies-r89714db982c6892f-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' data-api-bind-info={`policies-${index}-title`} data-api-map-var-name='rule'>
                      {rule.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='logisticspolicies-ra7b0173517d69385-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' data-api-bind-info={`policies-${index}-summary`} data-api-map-var-name='rule'>
                    {rule.summary}
                  </p>

                  {/* Specific Guidelines Checkpoints */}
                  {rule.guidelines && rule.guidelines.length > 0 && <ul className="space-y-2.5 pt-2 border-t border-border" data-api-unique-id='logisticspolicies-r657f96ea3ce9e374-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                      {rule.guidelines.map((guide, index1) => <li key={index1} className="flex items-start gap-2 text-xs text-foreground" data-api-unique-id='logisticspolicies-r595f18ac35602bfc-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" data-api-unique-id='logisticspolicies-r0b4438bc290c6d6b-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' />
                          <span className="leading-normal" data-api-unique-id='logisticspolicies-rd782fbccb6fec0e0-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' data-api-bind-info={`policies-${index}-rule.guidelines-${index1}-$item`} data-api-map-var-name='guide'>{guide}</span>
                        </li>)}
                    </ul>}
                </div>

                {/* Verified policy badge */}
                <div className="pt-4 mt-4 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground" data-api-unique-id='logisticspolicies-r3eeff7ae4b2a48ee-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                  <span className="flex items-center gap-1 font-medium" data-api-unique-id='logisticspolicies-r800e2274c375f1c4-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>
                    <FileText className="w-3.5 h-3.5 text-primary" data-api-unique-id='logisticspolicies-r0519e2b71a0fb75d-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1' />
                    <span data-api-unique-id='logisticspolicies-r9a608c52781fc228-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>WKO & MA 46 Aligned</span>
                  </span>
                  <span className="font-mono" data-api-unique-id='logisticspolicies-r752e93b62530de51-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' data-api-in-loop='1'>Valid 2025</span>
                </div>
              </div>) : <div className="col-span-full py-8 text-center text-sm text-accent-foreground/70" data-api-unique-id='logisticspolicies-r15bc8f451d360a22-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
              No logistics policies available.
            </div>}
        </div>

        {/* Dispatch Footnote & Direct Inquiry Strip */}
        <div className="rounded-lg bg-secondary text-secondary-foreground border border-border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-api-unique-id='logisticspolicies-r79d73bba91080d72-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
          <div className="space-y-1 max-w-2xl" data-api-unique-id='logisticspolicies-r44f905cbf2a44034-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
            <h3 className="font-bold text-sm sm:text-base text-foreground font-display" data-api-unique-id='logisticspolicies-rd2cc53b1b26f3cb1-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
              Have an appointment in a restricted pedestrian zone or outlying border district?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='logisticspolicies-rba115f82c2eae7a6-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
              Our Vienna logistics dispatch team coordinates street permits, elevator reservations, and Altbau material hoists directly with your Hausverwaltung.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0" data-api-unique-id='logisticspolicies-r604b6c0d0eb86eac-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
            <a href="tel:+4312345678" className="px-4 py-2.5 rounded-md bg-card text-foreground border border-border text-xs sm:text-sm font-semibold hover:bg-muted transition-colors inline-flex items-center gap-2" data-api-unique-id='logisticspolicies-r9bfb5f87f6257407-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>
              <PhoneCall className="w-3.5 h-3.5 text-primary" data-api-unique-id='logisticspolicies-r8a69941bb0dabbf9-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies' />
              <span data-api-unique-id='logisticspolicies-r935595ed10b64e63-s2424469064' data-api-unique-page-name='src/frontend/components/ServiceAreas/LogisticsPolicies'>Direct Dispatch Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>;
}