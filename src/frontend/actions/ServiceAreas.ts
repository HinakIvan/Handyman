'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/frontend/action_utils';
import {
  ServiceAreasPageData,
  ViennaDistrictDto,
  ZoneSpecificationDto,
  LogisticsPolicyRuleDto,
  LogisticsZone,
} from '@/frontend/types/ServiceAreas';

/**
 * Architectural metadata and district enrichment matching Austrian municipal reality
 */
const DISTRICT_ENRICHMENTS: Record<
  string,
  {
    boroughSubtitle: string;
    isHistoricAltbauCore: boolean;
    parkingCategory: string;
    coverageCoverageRate: string;
  }
> = {
  '1010': {
    boroughSubtitle: 'UNESCO Historic Core & Hofburg Imperial Quarter',
    isHistoricAltbauCore: true,
    parkingCategory: 'Strict Kurzparkzone & Pedestrian Delivery Window',
    coverageCoverageRate: '100% On-Foot & Electric Van Fleet',
  },
  '1020': {
    boroughSubtitle: 'Prater, Augarten & Danube Canal Creative Quarter',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1030': {
    boroughSubtitle: 'Belvedere Diplomatic Quarter & Rochusmarkt Hub',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1040': {
    boroughSubtitle: 'Karlsplatz Academic & Classical Embassy District',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1050': {
    boroughSubtitle: 'Schlossquadrat Architectural & Artisan Neighborhood',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1060': {
    boroughSubtitle: 'Mariahilfer Straße & Naschmarkt Culinary Belt',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1070': {
    boroughSubtitle: 'MuseumsQuartier & Modern Creative Loft Belt',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1080': {
    boroughSubtitle: 'Piaristenplatz & High-Altbau Jurists Quarter',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1090': {
    boroughSubtitle: 'Medical University & Freud Memorial Boulevard',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Full Residential & Commercial Dispatch',
  },
  '1100': {
    boroughSubtitle: 'Vienna Central Station & Sonnwendviertel Modern Urban Hub',
    isHistoricAltbauCore: false,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1110': {
    boroughSubtitle: 'Gasometer Industrial Heritage & South-East Logistics corridor',
    isHistoricAltbauCore: false,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1120': {
    boroughSubtitle: 'Theresienbad Park & Southern Railway Junction',
    isHistoricAltbauCore: false,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1130': {
    boroughSubtitle: 'Schönbrunn Palace Grounds & Historic Villa Architecture',
    isHistoricAltbauCore: true,
    parkingCategory: 'Residential Mixed Zone',
    coverageCoverageRate: 'Dedicated Exterior & Villa Specialist Van',
  },
  '1140': {
    boroughSubtitle: 'Otto Wagner Church & Vienna Woods Western Foothills',
    isHistoricAltbauCore: false,
    parkingCategory: 'Residential Mixed Zone',
    coverageCoverageRate: 'Dedicated Exterior & Villa Specialist Van',
  },
  '1150': {
    boroughSubtitle: 'Westbahnhof Interchange & Schmelz Recreation Grounds',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1160': {
    boroughSubtitle: 'Brunnenmarkt Bazaar & Wilhelminenberg Vineyard Ridge',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1170': {
    boroughSubtitle: 'Alszeile Forest Way & Traditional Suburban Crafts',
    isHistoricAltbauCore: false,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1180': {
    boroughSubtitle: 'Cottage Quarter Mansions & Türkenschanzpark Groves',
    isHistoricAltbauCore: true,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1190': {
    boroughSubtitle: 'Grinzing Traditional Heuriger Wine Belt & Kahlenberg Foothills',
    isHistoricAltbauCore: false,
    parkingCategory: 'Residential Mixed Zone',
    coverageCoverageRate: 'Dedicated Exterior & Villa Specialist Van',
  },
  '1200': {
    boroughSubtitle: 'Millennium Tower Waterfront & Nordwestbahnhof Redevelopment',
    isHistoricAltbauCore: false,
    parkingCategory: 'Standard Kurzparkzone (09:00–22:00)',
    coverageCoverageRate: 'Mobile Equipment Team with Heavy Haul',
  },
  '1210': {
    boroughSubtitle: 'Alte Donau Waterfront & Northern Industrial Manufacturing Core',
    isHistoricAltbauCore: false,
    parkingCategory: 'Residential Mixed Zone',
    coverageCoverageRate: 'Dedicated Exterior & Villa Specialist Van',
  },
  '1220': {
    boroughSubtitle: 'UNO-City Vienna International Centre & Seestadt Aspern Smart City',
    isHistoricAltbauCore: false,
    parkingCategory: 'Residential Mixed Zone',
    coverageCoverageRate: 'Dedicated Exterior & Villa Specialist Van',
  },
  '1230': {
    boroughSubtitle: 'Wotrubakirche, Inzersdorf Wholesale Hub & Southern Commercial Belt',
    isHistoricAltbauCore: false,
    parkingCategory: 'Residential Mixed Zone',
    coverageCoverageRate: 'Dedicated Exterior & Villa Specialist Van',
  },
};

const ZONE_METAS: Record<
  LogisticsZone,
  {
    name: string;
    label: string;
    desc: string;
    tier: string;
    parking: string;
  }
> = {
  INNER_CITY: {
    name: 'Inner City Core',
    label: 'District 1 (1010)',
    desc: 'Pedestrian zones, UNESCO heritage building regulations, restricted delivery windows.',
    tier: 'Altbau Master Specialist',
    parking: 'Strict pedestrian zone authorization & loading bay permits required',
  },
  CENTRAL: {
    name: 'Central Boroughs',
    label: 'Districts 2–9 (1020–1090)',
    desc: 'High-density Gründerzeit historic apartments, classic high ceilings, courtyard stairwells.',
    tier: 'Senior Trade Handymen',
    parking: 'Short-term parking zone (Kurzparkzone) Mon–Fri 09:00–22:00',
  },
  OUTER_RING: {
    name: 'Outer Ring Sectors',
    label: 'Districts 10–12, 15–18, 20 (1100–1200)',
    desc: 'Mix of modern residential complexes, classic suburban roads, commercial avenues.',
    tier: 'Mobile Service Units',
    parking: 'City-wide standard Kurzparkzone with designated workshop vehicle badges',
  },
  GREATER_SUBURB: {
    name: 'Greater Suburb & Perimeter',
    label: 'Districts 13–14, 19, 21–23 (1130–1230)',
    desc: 'Single-family houses, villas, hillsides, and expansive eastern municipal belts.',
    tier: 'Heavy Equipment Fleet',
    parking: 'Suburban on-street parking & private driveway access arrangements',
  },
};

const LOGISTICS_POLICIES: LogisticsPolicyRuleDto[] = [
  {
    id: 'kurzparkzone-policy',
    title: 'Vienna Kurzparkzone & Loading Permits',
    ruleCategory: 'Municipal Parking & Access',
    badgeDe: 'Parkraumbewirtschaftung Wien',
    summary:
      'Every company vehicle carries active Vienna Craftsman Parking Authorization (Wiener Handwerker-Parkkleber), exempting customers from parking ticket liability during scheduled appointments.',
    guidelines: [
      'In Inner City (1010) pedestrian zones, our logistics team secures early-morning (06:00–10:30) municipal loading permits or operates electric hand-truck delivery direct to Altbau stairwells.',
      'Districts 1020 through 1230: Standard Kurzparkzone parking meter vouchers are fully absorbed by our service rate with zero add-on charges to the client.',
      'For extensive drywall, floor restoration, or demolition skips (Bauschuttmulde), we file official MA 46 municipal street occupancy notices 5 business days in advance.',
    ],
  },
  {
    id: 'altbau-logistics-policy',
    title: 'Historic Altbau Freight & Narrow Stairwell Handling',
    ruleCategory: 'Structural Handling Protocol',
    badgeDe: 'Denkmalschutz & Gründerzeit',
    summary:
      'Viennese Gründerzeit buildings typically feature high-ceilinged flights (up to 4.2m) without heavy-load elevators. We deploy specialized compact material transporters and protective floor padding.',
    guidelines: [
      'Mandatory neoprene runner floor protection is laid across common historic parquet corridors and building vestibules prior to tool ingress.',
      'Stairway freight protocols enforce maximum 35 kg ergonomic carrying loads per craftsman to guarantee zero impact damage to turn-of-the-century wrought-iron balustrades.',
      'For oversized kitchen worktops and dry-construction panels unable to negotiate narrow historic spiral stairwells, mechanical window-hoists are coordinated via municipal permits.',
    ],
  },
  {
    id: 'lower-austria-policy',
    title: 'Perimeter Commuter Belt & Niederösterreich Transparency',
    ruleCategory: 'Commuter Belt & Regional Transit',
    badgeDe: 'Umland Wien & Pendlerzone',
    summary:
      'Transparent flat-rate travel calculations for addresses bordering Vienna (Mödling, Schwechat, Klosterneuburg, Purkersdorf) with clear departure point tracking.',
    guidelines: [
      'Addresses directly on the municipal border boundary line (e.g., Perchtoldsdorf, Gerasdorf) enjoy identical standard Greater Suburb (Zone 4) dispatch lead times.',
      'Zero hidden mileage surcharges: Flat journey allowance of €25 applies for Lower Austria border zones beyond 1230/1210 limits, communicated strictly in advance.',
      'Strict GewO § 94 & § 159 Austrian Trade Act compliance: Handyman tasks adhere strictly to authorized trade boundaries with certified master partner handovers where legally mandated.',
    ],
  },
];

/**
 * Fetches all official Vienna municipal districts (1010-1230), computes urban logistics zones,
 * and derives real-time lead time statistics.
 */
export async function getServiceAreasPageData(): Promise<ServiceAreasPageData> {
  return withResult(async () => {
    // 1. Fetch official municipal districts from Prisma master catalog
    // Role visibility statement: Guest visitors and Registered Customers have identical view and permissions
    const rawDistricts = await prisma.viennaDistrict.findMany({
      orderBy: { districtNumber: 'asc' },
    });

    // 2. Map and enrich database records with architectural handling profiles
    const districts: ViennaDistrictDto[] = rawDistricts.map((d) => {
      const enrichment = DISTRICT_ENRICHMENTS[d.districtCode] ?? {
        boroughSubtitle: `Vienna Municipal District ${d.districtNumber}`,
        isHistoricAltbauCore: d.districtNumber <= 9,
        parkingCategory: 'Standard Kurzparkzone',
        coverageCoverageRate: 'Full Dispatch Coverage',
      };

      return {
        id: d.id, // data-from: ViennaDistrict-id
        districtCode: d.districtCode, // data-from: ViennaDistrict-districtCode
        districtName: d.districtName, // data-from: ViennaDistrict-districtName
        districtNumber: d.districtNumber, // data-from: ViennaDistrict-districtNumber
        zone: d.zone as LogisticsZone, // data-from: ViennaDistrict-zone
        leadTimeHours: d.leadTimeHours, // data-from: ViennaDistrict-leadTimeHours
        createdAt: d.createdAt, // data-from: ViennaDistrict-createdAt
        updatedAt: d.updatedAt, // data-from: ViennaDistrict-updatedAt
        boroughSubtitle: enrichment.boroughSubtitle,
        isHistoricAltbauCore: enrichment.isHistoricAltbauCore,
        parkingCategory: enrichment.parkingCategory,
        coverageCoverageRate: enrichment.coverageCoverageRate,
      };
    });

    // 3. Compute real-time zone statistics from database records
    const zoneKeys: LogisticsZone[] = ['INNER_CITY', 'CENTRAL', 'OUTER_RING', 'GREATER_SUBURB'];
    const zones: ZoneSpecificationDto[] = zoneKeys.map((key) => {
      const meta = ZONE_METAS[key];
      const matchingDistricts = districts.filter((d) => d.zone === key);
      const leadTime = matchingDistricts.length > 0 ? matchingDistricts[0].leadTimeHours : 3;

      return {
        zoneKey: key,
        zoneName: meta.name,
        districtsLabel: meta.label,
        guaranteedLeadTime: `${leadTime} Hours`,
        description: meta.desc,
        artisanTier: meta.tier,
        parkingRule: meta.parking,
        districtCount: matchingDistricts.length,
      };
    });

    const leadTimes = districts.map((d) => d.leadTimeHours);
    const minLeadTimeHours = leadTimes.length > 0 ? Math.min(...leadTimes) : 2;
    const maxLeadTimeHours = leadTimes.length > 0 ? Math.max(...leadTimes) : 5;

    return {
      districts,
      zones,
      policies: LOGISTICS_POLICIES,
      totalDistrictsCount: districts.length,
      minLeadTimeHours,
      maxLeadTimeHours,
    };
  })();
}