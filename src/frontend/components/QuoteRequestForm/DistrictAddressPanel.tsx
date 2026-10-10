"use client";

import React from "react";
import { ViennaDistrictItem, UrbanZone } from "@/frontend/types/QuoteRequestForm";
import { MapPin, Clock, Compass } from "lucide-react";
interface DistrictAddressPanelProps {
  districts: ViennaDistrictItem[];
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  street: string;
  buildingNumber: string;
  stair: string;
  door: string;
  onChangeAddress: (field: "street" | "buildingNumber" | "stair" | "door", val: string) => void;
}
const getZoneLabel = (zone: UrbanZone): string => {
  switch (zone) {
    case "INNER_CITY":
      return "Inner City (1010)";
    case "CENTRAL":
      return "Central Ring (1020–1090)";
    case "OUTER_RING":
      return "Outer Ring (1100–1200)";
    case "GREATER_SUBURB":
      return "Greater Suburbs (1210–1230)";
    default:
      return zone;
  }
};
const getZoneColor = (zone: UrbanZone): string => {
  switch (zone) {
    case "INNER_CITY":
      return "bg-accent text-accent-foreground";
    case "CENTRAL":
      return "bg-primary text-primary-foreground";
    case "OUTER_RING":
      return "bg-secondary text-secondary-foreground";
    case "GREATER_SUBURB":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};
export default function DistrictAddressPanel({
  districts = [],
  selectedDistrictId,
  onSelectDistrict,
  street,
  buildingNumber,
  stair,
  door,
  onChangeAddress
}: DistrictAddressPanelProps) {
  const selectedDistrict = districts.find(d => d.id === selectedDistrictId) || districts[0];
  return <div data-controller-name="Vienna Logistics and Address Panel" className="bg-card text-card-foreground border border-border rounded-lg p-6 sm:p-8 space-y-6 shadow-soft" data-api-unique-id='districtaddresspanel-ra76081f3ddf9046c-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4" data-api-unique-id='districtaddresspanel-r7a85ad66fc9cb09a-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
        <div data-api-unique-id='districtaddresspanel-rffe52c8075c2ae0d-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
          <h2 className="text-xl sm:text-2xl font-bold font-header tracking-tight" data-api-unique-id='districtaddresspanel-rf5195593e660c55d-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            2. Vienna Municipal Postal District & Location
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5" data-api-unique-id='districtaddresspanel-rce038d539c6f894f-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            Logistics dispatch zone and Austrian address spec (Strasse, Hausnummer, Stiege, Tür).
          </p>
        </div>
        {selectedDistrict && <div className="flex items-center gap-2" data-api-unique-id='districtaddresspanel-re80aa62f9e7da497-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-accent text-accent-foreground font-mono" data-api-unique-id='districtaddresspanel-r9568c40d4d9e9676-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <Clock className="w-3.5 h-3.5" data-api-unique-id='districtaddresspanel-rca75c2595baf153a-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
              Lead: {selectedDistrict.leadTimeHours}h window
            </span>
          </div>}
      </div>

      {/* District Matrix - 23 Municipal Postal Districts (1010 - 1230) */}
      <div className="space-y-3" data-api-unique-id='districtaddresspanel-r5e54ddc5507e7985-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
        <div className="flex items-center justify-between text-xs" data-api-unique-id='districtaddresspanel-rc354b686b0e46cbe-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
          <label className="uppercase font-semibold tracking-wider text-muted-foreground block" data-api-unique-id='districtaddresspanel-r2f1e7bf73734fe93-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            Select Postal District (1010 - 1230)
          </label>
          <span className="text-muted-foreground flex items-center gap-1" data-api-unique-id='districtaddresspanel-re58fe152673c769f-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            <Compass className="w-3.5 h-3.5 text-primary" data-api-unique-id='districtaddresspanel-rda08778ef4cc442d-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
            23 Official Vienna Bezierke
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2" data-api-unique-id='districtaddresspanel-r4c13f63f1d5757c8-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
          {districts.map((district, index) => {
          const isSelected = district.id === selectedDistrictId;
          return <button key={district.id} type="button" onClick={() => onSelectDistrict(district.id)} className={`p-2 rounded border text-center transition-all flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary bg-primary text-primary-foreground font-bold shadow-soft scale-[1.02]" : "border-border bg-background hover:bg-secondary text-foreground"}`} title={`${district.districtCode} Wien - ${district.districtName}`} data-api-unique-id='districtaddresspanel-r4d87bbdffef0db8d-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' data-api-in-loop='1'>
                <span className="text-xs font-mono font-bold leading-none" data-api-unique-id='districtaddresspanel-r8dfaa22c102305cd-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtCode`} data-api-map-var-name='district'>
                  {district.districtCode}
                </span>
                <span className="text-[10px] mt-1 opacity-80 truncate max-w-full" data-api-unique-id='districtaddresspanel-r8c56666a56807cc5-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' data-api-in-loop='1'>
                  {district.districtName.split(" ")[0]}
                </span>
              </button>;
        })}
        </div>
      </div>

      {/* Logistics Zone & Austrian Address Specification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2" data-api-unique-id='districtaddresspanel-ra2ed011e26c182a9-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
        {/* District Detail Chip */}
        {selectedDistrict && <div className="lg:col-span-4 p-4 rounded-md border border-border bg-background text-foreground space-y-3" data-api-unique-id='districtaddresspanel-r4e1e4466a5851cfb-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            <div className="flex items-center gap-2" data-api-unique-id='districtaddresspanel-ra94ce6fe7625a0de-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <MapPin className="w-4 h-4 text-primary shrink-0" data-api-unique-id='districtaddresspanel-r15172bf091400138-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
              <span className="font-bold text-sm" data-api-unique-id='districtaddresspanel-r9459c1d827101325-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                {selectedDistrict.districtCode} Wien - {selectedDistrict.districtName}
              </span>
            </div>
            <div className="space-y-1.5 text-xs" data-api-unique-id='districtaddresspanel-r5e5b7e3d4d911fa3-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='districtaddresspanel-r090eb76c4c1cdfb6-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                <span data-api-unique-id='districtaddresspanel-r2aa7c83bd8950eb4-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>Urban Logistics Zone:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${getZoneColor(selectedDistrict.zone)}`} data-api-unique-id='districtaddresspanel-r8b04891c32cbfda3-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                  {getZoneLabel(selectedDistrict.zone)}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='districtaddresspanel-ra21ef2a33306bdcc-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                <span data-api-unique-id='districtaddresspanel-rcf1d158bbfa75bfc-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>Dispatch Response Time:</span>
                <span className="font-mono font-bold text-foreground" data-api-unique-id='districtaddresspanel-rd09f99520f75f5d1-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                  ~{selectedDistrict.leadTimeHours} Hours
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='districtaddresspanel-r2b2b155796e8289b-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                <span data-api-unique-id='districtaddresspanel-r816b4a4640bd0565-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>Parking / Kurzparkzone:</span>
                <span className="text-foreground" data-api-unique-id='districtaddresspanel-rd904d8951d0636ea-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>Standard Handwerker Ticket</span>
              </div>
            </div>
          </div>}

        {/* Address Input Grid */}
        <div className="lg:col-span-8 space-y-3" data-api-unique-id='districtaddresspanel-rc56a402dc7eae798-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
          <label className="text-xs uppercase font-semibold tracking-wider text-muted-foreground block" data-api-unique-id='districtaddresspanel-r2ba5b965c04abd16-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            Austrian Worksite Address Snippet
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3" data-api-unique-id='districtaddresspanel-rf0b67ac241e97da6-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
            <div className="sm:col-span-7" data-api-unique-id='districtaddresspanel-r29f80f6691df1689-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <label htmlFor="street-input" className="block text-xs font-medium text-muted-foreground mb-1" data-api-unique-id='districtaddresspanel-ra003cd9080b8e167-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                Street / Strasse *
              </label>
              <input id="street-input" type="text" value={street} onChange={e => onChangeAddress("street", e.target.value)} placeholder="e.g. Mariahilfer Strasse" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='districtaddresspanel-r0cce63696ff12565-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
            </div>
            <div className="sm:col-span-5" data-api-unique-id='districtaddresspanel-r8cc061e788a0232a-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <label htmlFor="building-input" className="block text-xs font-medium text-muted-foreground mb-1" data-api-unique-id='districtaddresspanel-r9be6d600ae64db04-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                House No. / Hausnummer *
              </label>
              <input id="building-input" type="text" value={buildingNumber} onChange={e => onChangeAddress("buildingNumber", e.target.value)} placeholder="e.g. 104A" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='districtaddresspanel-rd1bf71cc4bab3a9c-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
            </div>
            <div className="sm:col-span-6" data-api-unique-id='districtaddresspanel-rf6db0a63a7532968-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <label htmlFor="stair-input" className="block text-xs font-medium text-muted-foreground mb-1" data-api-unique-id='districtaddresspanel-rbdb58c9deee104f6-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                Stiege (Staircase)
              </label>
              <input id="stair-input" type="text" value={stair} onChange={e => onChangeAddress("stair", e.target.value)} placeholder="e.g. Stiege 2" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='districtaddresspanel-r481182c2588d2dc3-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
            </div>
            <div className="sm:col-span-6" data-api-unique-id='districtaddresspanel-r053c40c859ed08b3-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
              <label htmlFor="door-input" className="block text-xs font-medium text-muted-foreground mb-1" data-api-unique-id='districtaddresspanel-reb5008442326fce8-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel'>
                Tür / Top (Apt No.)
              </label>
              <input id="door-input" type="text" value={door} onChange={e => onChangeAddress("door", e.target.value)} placeholder="e.g. Top 14" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='districtaddresspanel-r9c6376c147d5d8fd-s644601303' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/DistrictAddressPanel' />
            </div>
          </div>
        </div>
      </div>
    </div>;
}