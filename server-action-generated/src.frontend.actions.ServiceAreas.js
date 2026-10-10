"use server";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common-redirect:@/tools/prisma
var require_prisma = __commonJS({
  "common-redirect:@/tools/prisma"(exports2, module2) {
    var prisma2 = require("./_common").prisma;
    module2.exports = {
      __esModule: true,
      default: prisma2,
      prisma: prisma2
    };
  }
});

// common-redirect:@/frontend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/frontend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").frontendAuth;
  }
});

// src/frontend/actions/ServiceAreas.ts
var ServiceAreas_exports = {};
__export(ServiceAreas_exports, {
  getServiceAreasPageData: () => getServiceAreasPageData
});
module.exports = __toCommonJS(ServiceAreas_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
var DISTRICT_ENRICHMENTS = {
  "1010": {
    boroughSubtitle: "UNESCO Historic Core & Hofburg Imperial Quarter",
    isHistoricAltbauCore: true,
    parkingCategory: "Strict Kurzparkzone & Pedestrian Delivery Window",
    coverageCoverageRate: "100% On-Foot & Electric Van Fleet"
  },
  "1020": {
    boroughSubtitle: "Prater, Augarten & Danube Canal Creative Quarter",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1030": {
    boroughSubtitle: "Belvedere Diplomatic Quarter & Rochusmarkt Hub",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1040": {
    boroughSubtitle: "Karlsplatz Academic & Classical Embassy District",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1050": {
    boroughSubtitle: "Schlossquadrat Architectural & Artisan Neighborhood",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1060": {
    boroughSubtitle: "Mariahilfer Stra\xDFe & Naschmarkt Culinary Belt",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1070": {
    boroughSubtitle: "MuseumsQuartier & Modern Creative Loft Belt",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1080": {
    boroughSubtitle: "Piaristenplatz & High-Altbau Jurists Quarter",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1090": {
    boroughSubtitle: "Medical University & Freud Memorial Boulevard",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Full Residential & Commercial Dispatch"
  },
  "1100": {
    boroughSubtitle: "Vienna Central Station & Sonnwendviertel Modern Urban Hub",
    isHistoricAltbauCore: false,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1110": {
    boroughSubtitle: "Gasometer Industrial Heritage & South-East Logistics corridor",
    isHistoricAltbauCore: false,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1120": {
    boroughSubtitle: "Theresienbad Park & Southern Railway Junction",
    isHistoricAltbauCore: false,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1130": {
    boroughSubtitle: "Sch\xF6nbrunn Palace Grounds & Historic Villa Architecture",
    isHistoricAltbauCore: true,
    parkingCategory: "Residential Mixed Zone",
    coverageCoverageRate: "Dedicated Exterior & Villa Specialist Van"
  },
  "1140": {
    boroughSubtitle: "Otto Wagner Church & Vienna Woods Western Foothills",
    isHistoricAltbauCore: false,
    parkingCategory: "Residential Mixed Zone",
    coverageCoverageRate: "Dedicated Exterior & Villa Specialist Van"
  },
  "1150": {
    boroughSubtitle: "Westbahnhof Interchange & Schmelz Recreation Grounds",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1160": {
    boroughSubtitle: "Brunnenmarkt Bazaar & Wilhelminenberg Vineyard Ridge",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1170": {
    boroughSubtitle: "Alszeile Forest Way & Traditional Suburban Crafts",
    isHistoricAltbauCore: false,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1180": {
    boroughSubtitle: "Cottage Quarter Mansions & T\xFCrkenschanzpark Groves",
    isHistoricAltbauCore: true,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1190": {
    boroughSubtitle: "Grinzing Traditional Heuriger Wine Belt & Kahlenberg Foothills",
    isHistoricAltbauCore: false,
    parkingCategory: "Residential Mixed Zone",
    coverageCoverageRate: "Dedicated Exterior & Villa Specialist Van"
  },
  "1200": {
    boroughSubtitle: "Millennium Tower Waterfront & Nordwestbahnhof Redevelopment",
    isHistoricAltbauCore: false,
    parkingCategory: "Standard Kurzparkzone (09:00\u201322:00)",
    coverageCoverageRate: "Mobile Equipment Team with Heavy Haul"
  },
  "1210": {
    boroughSubtitle: "Alte Donau Waterfront & Northern Industrial Manufacturing Core",
    isHistoricAltbauCore: false,
    parkingCategory: "Residential Mixed Zone",
    coverageCoverageRate: "Dedicated Exterior & Villa Specialist Van"
  },
  "1220": {
    boroughSubtitle: "UNO-City Vienna International Centre & Seestadt Aspern Smart City",
    isHistoricAltbauCore: false,
    parkingCategory: "Residential Mixed Zone",
    coverageCoverageRate: "Dedicated Exterior & Villa Specialist Van"
  },
  "1230": {
    boroughSubtitle: "Wotrubakirche, Inzersdorf Wholesale Hub & Southern Commercial Belt",
    isHistoricAltbauCore: false,
    parkingCategory: "Residential Mixed Zone",
    coverageCoverageRate: "Dedicated Exterior & Villa Specialist Van"
  }
};
var ZONE_METAS = {
  INNER_CITY: {
    name: "Inner City Core",
    label: "District 1 (1010)",
    desc: "Pedestrian zones, UNESCO heritage building regulations, restricted delivery windows.",
    tier: "Altbau Master Specialist",
    parking: "Strict pedestrian zone authorization & loading bay permits required"
  },
  CENTRAL: {
    name: "Central Boroughs",
    label: "Districts 2\u20139 (1020\u20131090)",
    desc: "High-density Gr\xFCnderzeit historic apartments, classic high ceilings, courtyard stairwells.",
    tier: "Senior Trade Handymen",
    parking: "Short-term parking zone (Kurzparkzone) Mon\u2013Fri 09:00\u201322:00"
  },
  OUTER_RING: {
    name: "Outer Ring Sectors",
    label: "Districts 10\u201312, 15\u201318, 20 (1100\u20131200)",
    desc: "Mix of modern residential complexes, classic suburban roads, commercial avenues.",
    tier: "Mobile Service Units",
    parking: "City-wide standard Kurzparkzone with designated workshop vehicle badges"
  },
  GREATER_SUBURB: {
    name: "Greater Suburb & Perimeter",
    label: "Districts 13\u201314, 19, 21\u201323 (1130\u20131230)",
    desc: "Single-family houses, villas, hillsides, and expansive eastern municipal belts.",
    tier: "Heavy Equipment Fleet",
    parking: "Suburban on-street parking & private driveway access arrangements"
  }
};
var LOGISTICS_POLICIES = [
  {
    id: "kurzparkzone-policy",
    title: "Vienna Kurzparkzone & Loading Permits",
    ruleCategory: "Municipal Parking & Access",
    badgeDe: "Parkraumbewirtschaftung Wien",
    summary: "Every company vehicle carries active Vienna Craftsman Parking Authorization (Wiener Handwerker-Parkkleber), exempting customers from parking ticket liability during scheduled appointments.",
    guidelines: [
      "In Inner City (1010) pedestrian zones, our logistics team secures early-morning (06:00\u201310:30) municipal loading permits or operates electric hand-truck delivery direct to Altbau stairwells.",
      "Districts 1020 through 1230: Standard Kurzparkzone parking meter vouchers are fully absorbed by our service rate with zero add-on charges to the client.",
      "For extensive drywall, floor restoration, or demolition skips (Bauschuttmulde), we file official MA 46 municipal street occupancy notices 5 business days in advance."
    ]
  },
  {
    id: "altbau-logistics-policy",
    title: "Historic Altbau Freight & Narrow Stairwell Handling",
    ruleCategory: "Structural Handling Protocol",
    badgeDe: "Denkmalschutz & Gr\xFCnderzeit",
    summary: "Viennese Gr\xFCnderzeit buildings typically feature high-ceilinged flights (up to 4.2m) without heavy-load elevators. We deploy specialized compact material transporters and protective floor padding.",
    guidelines: [
      "Mandatory neoprene runner floor protection is laid across common historic parquet corridors and building vestibules prior to tool ingress.",
      "Stairway freight protocols enforce maximum 35 kg ergonomic carrying loads per craftsman to guarantee zero impact damage to turn-of-the-century wrought-iron balustrades.",
      "For oversized kitchen worktops and dry-construction panels unable to negotiate narrow historic spiral stairwells, mechanical window-hoists are coordinated via municipal permits."
    ]
  },
  {
    id: "lower-austria-policy",
    title: "Perimeter Commuter Belt & Nieder\xF6sterreich Transparency",
    ruleCategory: "Commuter Belt & Regional Transit",
    badgeDe: "Umland Wien & Pendlerzone",
    summary: "Transparent flat-rate travel calculations for addresses bordering Vienna (M\xF6dling, Schwechat, Klosterneuburg, Purkersdorf) with clear departure point tracking.",
    guidelines: [
      "Addresses directly on the municipal border boundary line (e.g., Perchtoldsdorf, Gerasdorf) enjoy identical standard Greater Suburb (Zone 4) dispatch lead times.",
      "Zero hidden mileage surcharges: Flat journey allowance of \u20AC25 applies for Lower Austria border zones beyond 1230/1210 limits, communicated strictly in advance.",
      "Strict GewO \xA7 94 & \xA7 159 Austrian Trade Act compliance: Handyman tasks adhere strictly to authorized trade boundaries with certified master partner handovers where legally mandated."
    ]
  }
];
async function getServiceAreasPageData() {
  return (0, import_action_utils.withResult)(async () => {
    const rawDistricts = await import_prisma.default.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });
    const districts = rawDistricts.map((d) => {
      const enrichment = DISTRICT_ENRICHMENTS[d.districtCode] ?? {
        boroughSubtitle: `Vienna Municipal District ${d.districtNumber}`,
        isHistoricAltbauCore: d.districtNumber <= 9,
        parkingCategory: "Standard Kurzparkzone",
        coverageCoverageRate: "Full Dispatch Coverage"
      };
      return {
        id: d.id,
        // data-from: ViennaDistrict-id
        districtCode: d.districtCode,
        // data-from: ViennaDistrict-districtCode
        districtName: d.districtName,
        // data-from: ViennaDistrict-districtName
        districtNumber: d.districtNumber,
        // data-from: ViennaDistrict-districtNumber
        zone: d.zone,
        // data-from: ViennaDistrict-zone
        leadTimeHours: d.leadTimeHours,
        // data-from: ViennaDistrict-leadTimeHours
        createdAt: d.createdAt,
        // data-from: ViennaDistrict-createdAt
        updatedAt: d.updatedAt,
        // data-from: ViennaDistrict-updatedAt
        boroughSubtitle: enrichment.boroughSubtitle,
        isHistoricAltbauCore: enrichment.isHistoricAltbauCore,
        parkingCategory: enrichment.parkingCategory,
        coverageCoverageRate: enrichment.coverageCoverageRate
      };
    });
    const zoneKeys = ["INNER_CITY", "CENTRAL", "OUTER_RING", "GREATER_SUBURB"];
    const zones = zoneKeys.map((key) => {
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
        districtCount: matchingDistricts.length
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
      maxLeadTimeHours
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getServiceAreasPageData
});
