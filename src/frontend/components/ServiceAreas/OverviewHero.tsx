"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ZoneSpecification } from "@/frontend/types/ServiceAreas";
import { Clock, ShieldCheck, MapPin, Building2, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
interface OverviewHeroProps {
  zones: ZoneSpecification[];
  selectedZone: string;
  onSelectZone: (zoneKey: "ALL" | "INNER_CITY" | "CENTRAL" | "OUTER_RING" | "GREATER_SUBURB") => void;
}
export default function OverviewHero({
  zones,
  selectedZone,
  onSelectZone
}: OverviewHeroProps) {
  return <section data-controller-name="Vienna Logistics Overview" className="w-full bg-background border-b border-border py-12 md:py-16" data-api-unique-id='overviewhero-re51ed992d3e6a387-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='overviewhero-r7bff5d633f48ccf3-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
        {/* Top headline block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" data-api-unique-id='overviewhero-re3e74da62496bac9-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
          <div className="lg:col-span-7 min-w-0 space-y-6" data-api-unique-id='overviewhero-r2b234aa0f329d472-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
            <div className="space-y-3" data-api-unique-id='overviewhero-r49734c4d6478fb46-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-display leading-tight" data-api-unique-id='overviewhero-r58670a9c0e934d29-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                Vienna 23 Districts, Artisans on Time
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed" data-api-unique-id='overviewhero-rcc10837887ff5e60-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                Covering postal codes 1010 through 1230 with transparent dispatch response times across all municipal sectors.
              </p>
            </div>

            {/* Read-only verification / Role parity note */}
            <div className="inline-flex flex-wrap items-center gap-3 px-3.5 py-2 rounded-md bg-secondary text-secondary-foreground text-xs sm:text-sm border border-border" data-api-unique-id='overviewhero-r750480c2b655254e-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
              <div className="flex items-center gap-1.5 font-semibold text-primary" data-api-unique-id='overviewhero-r149b3623301921dd-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='overviewhero-rb425265d193d139b-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' />
                <span data-api-unique-id='overviewhero-r8b714cc2d71288ac-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>Public Rate Transparency</span>
              </div>
              <span className="text-muted-foreground hidden sm:inline" data-api-unique-id='overviewhero-ra7d0242d0b5832c3-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>|</span>
              <span className="text-muted-foreground" data-api-unique-id='overviewhero-ra6a6e65b48715135-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                Equal visibility and dispatch standards for both guest visitors and registered clients.
              </span>
            </div>

            {/* 4 Urban Logistics Zone Spec Tiles */}
            <div className="space-y-3 pt-2" data-api-unique-id='overviewhero-r3d8207ce19f7a360-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
              <div className="flex items-center justify-between" data-api-unique-id='overviewhero-rb84bfc24a6b15d96-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-display" data-api-unique-id='overviewhero-rd28b819fa9506cbd-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                  Four Urban Logistics Zones
                </h2>
                <span className="text-xs text-muted-foreground" data-api-unique-id='overviewhero-r349c9b448be22d31-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>Click tier to filter directory below</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='overviewhero-r9aff773a1f6415a9-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                {zones.map((zone, index) => {
                const isCurrent = selectedZone === zone.zoneKey;
                return <button type="button" key={zone.zoneKey} onClick={() => onSelectZone(zone.zoneKey)} className={`text-left p-3.5 rounded-md border transition-all ${isCurrent ? "bg-accent text-accent-foreground border-accent shadow-soft ring-2 ring-primary ring-offset-2 ring-offset-background" : "bg-card text-card-foreground border-border hover:border-primary/60 hover:shadow-soft"}`} data-api-unique-id='overviewhero-r1d5a2c5ef2a8e0d8-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1'>
                      <div className="flex items-center justify-between gap-2 mb-1" data-api-unique-id='overviewhero-rcb61d3d324d252f6-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1'>
                        <span className="font-semibold text-sm font-display truncate" data-api-unique-id='overviewhero-r3eab81383162994a-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1' data-api-bind-info={`zones-${index}-zoneName`} data-api-map-var-name='zone'>
                          {zone.zoneName}
                        </span>
                        <span className={`inline-flex shrink-0 items-center gap-1 text-xs px-2 py-0.5 rounded font-mono font-bold whitespace-nowrap ${isCurrent ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"}`} data-api-unique-id='overviewhero-r0d5442235786a035-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1'>
                          <Clock className="w-3 h-3 shrink-0" data-api-unique-id='overviewhero-r75def175ccb1426e-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1' />
                          <span data-api-unique-id='overviewhero-r13de750b84c7ff84-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1' data-api-bind-info={`zones-${index}-guaranteedLeadTime`} data-api-map-var-name='zone'>{zone.guaranteedLeadTime}</span>
                        </span>
                      </div>
                      <p className={`text-xs mb-1.5 font-medium ${isCurrent ? "text-accent-foreground/90" : "text-muted-foreground"}`} data-api-unique-id='overviewhero-r01dfd8c9fd378a2e-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1' data-api-bind-info={`zones-${index}-districtsLabel`} data-api-map-var-name='zone'>
                        {zone.districtsLabel}
                      </p>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${isCurrent ? "text-accent-foreground/80" : "text-muted-foreground"}`} data-api-unique-id='overviewhero-r50f1a2d47b25ee63-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' data-api-in-loop='1' data-api-bind-info={`zones-${index}-description`} data-api-map-var-name='zone'>
                        {zone.description}
                      </p>
                    </button>;
              })}
              </div>
            </div>

            {/* Quick Action row */}
            <div className="pt-2 flex flex-wrap items-center gap-4" data-api-unique-id='overviewhero-r6e1e27689ba8e431-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
              <Link href="/quoterequest" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow-primary hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='overviewhero-r03f99dc127a31c70-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                <span data-api-unique-id='overviewhero-r21d7a4253e252045-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>Book Craftsman for Your District</span>
                <ArrowRight className="w-4 h-4 shrink-0" data-api-unique-id='overviewhero-ra0d4d437acef23be-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' />
              </Link>
              <div className="flex items-center gap-2 text-xs text-muted-foreground" data-api-unique-id='overviewhero-rd848af52e0d4b2f0-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                <Truck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='overviewhero-r16453b9bef848756-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' />
                <span data-api-unique-id='overviewhero-r30be7d50b08959a1-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>Zero hidden travel surcharge within Vienna city boundary</span>
              </div>
            </div>
          </div>

          {/* Right column: Architectural Blueprint & Altbau facade hero photo showcase */}
          <div className="lg:col-span-5 min-w-0 flex flex-col gap-4" data-api-unique-id='overviewhero-rc40b010567431a3c-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
            <div className="relative rounded-lg border border-border bg-card text-card-foreground shadow-elevated overflow-hidden" data-api-unique-id='overviewhero-rd1dcf1805037ee0c-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
              <div className="aspect-[4/3] w-full relative" data-api-unique-id='overviewhero-r3efaaaecb4e371bc-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                <EditableImg propKey="vienna-service-hero-facade" needLargeImage keywords="vienna architecture historic facade renovation handyman precision masonry" description="authentic historic Viennese Altbau facade renovation with craftsmen scaffolding, precision masonry restoration, warm limestone light" className="w-full h-full object-cover" data-api-unique-id='overviewhero-r85ca1512e37d47ac-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' />
              </div>

              {/* Blueprint drafting overlay stamp */}
              <div className="p-4 sm:p-5 bg-card border-t border-border space-y-3" data-api-unique-id='overviewhero-r9f5b2940e983f0f5-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                <div className="flex items-center justify-between gap-2" data-api-unique-id='overviewhero-rbff06e92845976cf-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                  <div className="flex items-center gap-2" data-api-unique-id='overviewhero-rbfb430b76bf45792-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                    <Building2 className="w-4 h-4 text-primary shrink-0" data-api-unique-id='overviewhero-r088d9525a8efab7e-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' />
                    <span className="text-xs font-bold tracking-wider uppercase text-foreground font-display" data-api-unique-id='overviewhero-r1b1f9ee19951d144-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                      Vienna Municipal Logistics Matrix
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground" data-api-unique-id='overviewhero-r3a9e569e302e40ad-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                    PLZ 1010–1230
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-xs" data-api-unique-id='overviewhero-raec2108e396eeddd-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                  <div className="p-2.5 rounded bg-background border border-border" data-api-unique-id='overviewhero-r421f617d085c34d9-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-wide" data-api-unique-id='overviewhero-r282e660fff6a0277-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                      Municipal Coverage
                    </span>
                    <span className="font-bold text-foreground font-display text-sm" data-api-unique-id='overviewhero-ra0f39495dbd97523-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                      23 of 23 Districts
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-background border border-border" data-api-unique-id='overviewhero-r3698b66a8b2002de-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-wide" data-api-unique-id='overviewhero-r1c69dd100800bd63-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                      Standard Max Lead Time
                    </span>
                    <span className="font-bold text-primary font-display text-sm" data-api-unique-id='overviewhero-r13e495982caae6dc-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                      5h (Suburb) / 2h (Center)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 text-xs text-muted-foreground" data-api-unique-id='overviewhero-rd198accfe26f1427-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" data-api-unique-id='overviewhero-r4081c1624b91fa74-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero' />
                  <span className="leading-tight" data-api-unique-id='overviewhero-r8de09403ace7b6bd-s4068893713' data-api-unique-page-name='src/frontend/components/ServiceAreas/OverviewHero'>
                    Central dispatch hubs at Margaretengürtel (5th) and Floridsdorf (21st) ensure simultaneous North-South deployment.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}