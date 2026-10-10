"use client";

import React, { useState } from "react";
import { Euro, Clock, MapPin, Receipt, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { ServiceCategoryDetailDTO, ViennaDistrictDTO } from "@/frontend/types/ServiceCategoryDetail";
interface PricingScheduleProps {
  category: ServiceCategoryDetailDTO;
  districts: ViennaDistrictDTO[];
}
export default function PricingSchedule({
  category,
  districts
}: PricingScheduleProps) {
  const [showDistrictSchedule, setShowDistrictSchedule] = useState(false);
  const baselineRate = category?.baselineHourlyRate != null ? category.baselineHourlyRate.toFixed(2) : "0.00";
  const travelFee = category?.travelFeeInnerVienna != null ? category.travelFeeInnerVienna.toFixed(2) : "19.50";
  return <section data-controller-name="Hourly Pricing Schedule" className="w-full border-b border-border bg-card text-card-foreground" data-api-unique-id='pricingschedule-rb779d98d1fb9ae03-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" data-api-unique-id='pricingschedule-r378f7ee7b4dcaedc-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
        {/* Section Header */}
        <div className="space-y-2 mb-10" data-api-unique-id='pricingschedule-r8f2a7e74039835e5-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground font-display" data-api-unique-id='pricingschedule-r91efa30c04b96142-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
            Transparent Hourly Pricing Schedule
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground" data-api-unique-id='pricingschedule-r88fcea85c675582a-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
            Clear labor billing principles according to Austrian trade standards. No hidden surcharges.
          </p>
        </div>

        {/* Pricing Anchor Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8" data-api-unique-id='pricingschedule-rd8ea442574a241fc-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
          {/* Main Rate Feature Anchor */}
          <div className="lg:col-span-5 rounded-lg border-2 border-primary bg-background text-foreground p-6 sm:p-8 shadow-soft flex flex-col justify-between" data-api-unique-id='pricingschedule-r2dcc0fd6aa024cbd-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
            <div className="space-y-4" data-api-unique-id='pricingschedule-r98d79a52be7680a8-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <div className="inline-flex items-center gap-1.5 rounded-sm bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider" data-api-unique-id='pricingschedule-r8cf8b2d53bb5d39a-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <Euro className="w-3.5 h-3.5 text-accent-foreground" data-api-unique-id='pricingschedule-r09648fee1a00206b-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />
                Guaranteed Baseline Rate
              </div>
              <div data-api-unique-id='pricingschedule-rba5ffe22ae4da1e0-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <div className="flex items-baseline gap-2" data-api-unique-id='pricingschedule-rf3e2d30298f1644b-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <span className="text-4xl sm:text-6xl font-extrabold text-primary font-display" data-api-unique-id='pricingschedule-r0830fc0ea86f9ffb-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                    €{baselineRate}
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground font-medium" data-api-unique-id='pricingschedule-r35032a34ab02e9ce-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>/ hour</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1" data-api-unique-id='pricingschedule-r1d9ae4af31840e9e-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  Excluding 20% Austrian VAT (USt.) for commercial or including for consumer inquiries
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-2" data-api-unique-id='pricingschedule-ra04b385a4fe4a933-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <div className="flex justify-between items-center text-sm" data-api-unique-id='pricingschedule-r934dfdbf2b5a47ed-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <span className="text-muted-foreground" data-api-unique-id='pricingschedule-rbcab16ac1416a422-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Typical Task Range:</span>
                  <span className="font-semibold text-foreground" data-api-unique-id='pricingschedule-r87fb9da2a4e7f8cf-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>{category?.typicalRangeEur || "€45 - €180"}</span>
                </div>
                <div className="flex justify-between items-center text-sm" data-api-unique-id='pricingschedule-rc0f0fc7011b14a15-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <span className="text-muted-foreground" data-api-unique-id='pricingschedule-r700838d2db91070e-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Minimum Booking:</span>
                  <span className="font-semibold text-foreground" data-api-unique-id='pricingschedule-rbe9f34cda123a8ed-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>{category?.minBookingHours ?? 2} Hours</span>
                </div>
                <div className="flex justify-between items-center text-sm" data-api-unique-id='pricingschedule-ra342d55b140d4e22-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <span className="text-muted-foreground" data-api-unique-id='pricingschedule-r3f49e4548eb23310-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Billing Increment:</span>
                  <span className="font-semibold text-foreground" data-api-unique-id='pricingschedule-r97eab86a4b7e03d3-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>30-Minute Units</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-2" data-api-unique-id='pricingschedule-rf415c13ed020a9be-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='pricingschedule-rc8685ae65d268726-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />
              <span data-api-unique-id='pricingschedule-r1d085902731c2f7e-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Full compliance with Austrian Chamber of Commerce (WKO) pricing disclosures.</span>
            </div>
          </div>

          {/* Billing Pillars Grid (3 sub-cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4" data-api-unique-id='pricingschedule-r12a6c9eccda901ed-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
            <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingschedule-recf34f8edf000233-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <div className="space-y-3" data-api-unique-id='pricingschedule-r53908fd63536f59e-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <div className="w-9 h-9 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center" data-api-unique-id='pricingschedule-r88a5c57b1cd11a40-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <Clock className="w-5 h-5 text-secondary-foreground" data-api-unique-id='pricingschedule-rf9e298eef1bfdae8-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />
                </div>
                <h3 className="font-bold text-base text-foreground" data-api-unique-id='pricingschedule-rf074930df9b1227b-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Time Increment Protocol</h3>
                <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='pricingschedule-re10fb6d7ae613e1e-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  First interval billed at a {category?.minBookingHours ?? 2}-hour minimum. Subsequent labor is tracked transparently in precise 30-minute blocks via signed digital work ledger.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-xs font-semibold text-primary" data-api-unique-id='pricingschedule-r5ebb73c631bda9a0-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                Digital Timecard Signed on Site
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingschedule-r5ab51d3340df1aa1-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <div className="space-y-3" data-api-unique-id='pricingschedule-r889869b78b4f12f8-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <div className="w-9 h-9 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center" data-api-unique-id='pricingschedule-rca43a0d9fbe322c4-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <MapPin className="w-5 h-5 text-secondary-foreground" data-api-unique-id='pricingschedule-r41cac9c5a84f85b0-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />
                </div>
                <h3 className="font-bold text-base text-foreground" data-api-unique-id='pricingschedule-r8c60aae507169535-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Vienna Logistics Pass</h3>
                <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='pricingschedule-r305d61b5c39b83c1-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  Fixed travel contribution of €{travelFee} covering all 23 districts (1010–1230 Wien) including commercial parking permits and tool haulage.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-xs font-semibold text-primary" data-api-unique-id='pricingschedule-r954d7c6fbbba70e2-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                Flat Surcharge Across Vienna
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between" data-api-unique-id='pricingschedule-r7ceaf855cafe06e0-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <div className="space-y-3" data-api-unique-id='pricingschedule-rf58ca9015f0f4767-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <div className="w-9 h-9 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center" data-api-unique-id='pricingschedule-r364dd22861146ca5-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <Receipt className="w-5 h-5 text-secondary-foreground" data-api-unique-id='pricingschedule-r6b651774d1563089-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />
                </div>
                <h3 className="font-bold text-base text-foreground" data-api-unique-id='pricingschedule-raeb6591023b972dd-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Materials at Cost</h3>
                <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='pricingschedule-r4632480ab82e6df5-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  Bauhaus / OBI / Hornbach replacement supplies passed through 1:1 with authentic merchant invoice receipts. Zero undisclosed procurement markups.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-xs font-semibold text-primary" data-api-unique-id='pricingschedule-r5cb905866a7b5482-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                100% Verifiable Receipts
              </div>
            </div>
          </div>
        </div>

        {/* Vienna 23 Districts Logistics Accordion Toggle */}
        <div className="rounded-lg border border-border bg-background text-foreground overflow-hidden" data-api-unique-id='pricingschedule-r083527187f7f8cad-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
          <button type="button" onClick={() => setShowDistrictSchedule(!showDistrictSchedule)} className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pricingschedule-rb41e951abccc86c5-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
            <div className="flex items-center gap-3" data-api-unique-id='pricingschedule-rc911ba718e720902-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <MapPin className="w-5 h-5 text-primary" data-api-unique-id='pricingschedule-rafb807d099ad4b95-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />
              <div data-api-unique-id='pricingschedule-r1adf03b6303ad76e-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <span className="font-bold text-sm sm:text-base text-foreground block" data-api-unique-id='pricingschedule-r53008b5551da6381-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  Vienna 23 Districts Logistics Radius & Travel Schedule
                </span>
                <span className="text-xs text-muted-foreground" data-api-unique-id='pricingschedule-r71d4aefdff06ef87-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  District codes 1010 through 1230, average artisan lead times, and dispatch surcharges.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary" data-api-unique-id='pricingschedule-r39e2562934868487-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <span data-api-unique-id='pricingschedule-r5c9be27942e47c1c-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>{showDistrictSchedule ? "Collapse" : "Expand District Table"}</span>
              {showDistrictSchedule ? <ChevronUp className="w-4 h-4 text-primary" data-api-unique-id='pricingschedule-r8aa5185bd0cc0e00-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' /> : <ChevronDown className="w-4 h-4 text-primary" data-api-unique-id='pricingschedule-r05b545acff9e2692-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' />}
            </div>
          </button>

          {showDistrictSchedule && <div className="border-t border-border p-4 sm:p-6 bg-card text-card-foreground" data-api-unique-id='pricingschedule-rc6b5e5fdf0e5772c-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
              <div className="overflow-x-auto" data-api-unique-id='pricingschedule-r19e11c899c1c45fa-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                <table className="w-full text-left text-xs sm:text-sm" data-api-unique-id='pricingschedule-rb0f7e6cae4583baa-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                  <thead data-api-unique-id='pricingschedule-r93c6e754855b1eee-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                    <tr className="border-b border-border text-muted-foreground font-semibold" data-api-unique-id='pricingschedule-r6285e5a97132098f-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                      <th className="py-2.5 pr-4 whitespace-nowrap" data-api-unique-id='pricingschedule-r42af8d54dd3f3e3f-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>District Code</th>
                      <th className="py-2.5 px-4 whitespace-nowrap" data-api-unique-id='pricingschedule-re8763751a50f66c0-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>District Name</th>
                      <th className="py-2.5 px-4 whitespace-nowrap" data-api-unique-id='pricingschedule-rba5227afb4b333f9-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Zone Classification</th>
                      <th className="py-2.5 px-4 whitespace-nowrap" data-api-unique-id='pricingschedule-rf81f2acf1c6edb8a-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Standard Lead Time</th>
                      <th className="py-2.5 pl-4 whitespace-nowrap text-right" data-api-unique-id='pricingschedule-ra26f3f8aad98e231-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>Travel Surcharge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border" data-api-unique-id='pricingschedule-rb669bcf1b3c47052-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule'>
                    {(districts || []).map((d, index) => <tr key={d.districtCode} className="hover:bg-muted/50 transition-colors" data-api-unique-id='pricingschedule-rbabc6e331679591d-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1'>
                        <td className="py-2.5 pr-4 font-mono font-semibold text-foreground" data-api-unique-id='pricingschedule-r60956ae00b27d840-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1' data-api-bind-info={`list-${index}-districtCode`} data-api-map-var-name='d'>
                          {d.districtCode}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-foreground" data-api-unique-id='pricingschedule-r8034fc3cff50256b-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1' data-api-bind-info={`list-${index}-districtName`} data-api-map-var-name='d'>
                          {d.districtName} ({d.districtNumber}. Bezirk)
                        </td>
                        <td className="py-2.5 px-4" data-api-unique-id='pricingschedule-r47ba9236342fc4aa-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1'>
                          <span className="inline-flex rounded-sm bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-medium" data-api-unique-id='pricingschedule-r961a215f38571235-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1'>
                            {d.zone ? d.zone.replace(/_/g, " ") : ""}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-muted-foreground" data-api-unique-id='pricingschedule-rfa17a552311d2933-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1' data-api-bind-info={`list-${index}-leadTimeHours`} data-api-map-var-name='d'>
                          Within {d.leadTimeHours} Hours
                        </td>
                        <td className="py-2.5 pl-4 text-right font-semibold text-foreground" data-api-unique-id='pricingschedule-r861379017a858e10-s3341911802' data-api-unique-page-name='src/frontend/components/ServiceCategoryDetail/PricingSchedule' data-api-in-loop='1'>
                          €{d.travelSurchargeEur.toFixed(2)} Flat
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}
        </div>
      </div>
    </section>;
}