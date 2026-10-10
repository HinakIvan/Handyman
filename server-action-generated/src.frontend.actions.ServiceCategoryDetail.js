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

// src/frontend/actions/ServiceCategoryDetail.ts
var ServiceCategoryDetail_exports = {};
__export(ServiceCategoryDetail_exports, {
  getServiceCategoryDetail: () => getServiceCategoryDetail
});
module.exports = __toCommonJS(ServiceCategoryDetail_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
var CATEGORY_ACTIVITY_REGISTRY = {
  ASSEMBLY: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "Zusammenbau und Aufstellen von serienm\xE4\xDFig hergestellten Fertigm\xF6beln (IKEA, M\xF6max, XXLutz)",
      "Bohren und D\xFCbeln in Mauerwerk, Beton und Gipskarton (Spiegel, Bilder, Regale, Garderoben)",
      "Montage von TV-Wandhalterungen, Vorhangstangen und Deckenleuchten (an bestehende L\xFCsterklemmen)",
      "Anpassung von Sockelleisten, Zierleisten und standardisierten Abdeckplatten"
    ],
    permittedEn: [
      "Assembly and alignment of standardized flat-pack furniture (IKEA, designer sets)",
      "Secure masonry, concrete, and drywall drilling for mirrors, shelving, and heavy artwork",
      "TV wall bracket installations and ceiling fixtures into pre-existing terminal blocks",
      "Skirting board trimming, door stop fittings, and decorative molding alignment"
    ],
    permittedRu: [
      "\u0421\u0431\u043E\u0440\u043A\u0430 \u0438 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u043E\u0432\u043A\u0430 \u043A\u043E\u0440\u043F\u0443\u0441\u043D\u043E\u0439 \u0438 \u043C\u043E\u0434\u0443\u043B\u044C\u043D\u043E\u0439 \u043C\u0435\u0431\u0435\u043B\u0438 \u0444\u0430\u0431\u0440\u0438\u0447\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430",
      "\u0421\u0432\u0435\u0440\u043B\u0435\u043D\u0438\u0435 \u0438 \u0434\u044E\u0431\u0435\u043B\u044C\u043D\u044B\u0439 \u043C\u043E\u043D\u0442\u0430\u0436 \u043F\u043E\u043B\u043E\u043A, \u0437\u0435\u0440\u043A\u0430\u043B, \u043A\u0430\u0440\u043D\u0438\u0437\u043E\u0432 \u0438 \u0442\u044F\u0436\u0435\u043B\u044B\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u0434\u0435\u043A\u043E\u0440\u0430",
      "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043D\u0430\u0441\u0442\u0435\u043D\u043D\u044B\u0445 \u043A\u0440\u043E\u043D\u0448\u0442\u0435\u0439\u043D\u043E\u0432 \u0434\u043B\u044F \u0442\u0435\u043B\u0435\u0432\u0438\u0437\u043E\u0440\u043E\u0432 \u0438 \u043F\u043E\u0434\u0432\u0435\u0441\u043D\u044B\u0445 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u043E\u0432",
      "\u041F\u043E\u0434\u0433\u043E\u043D\u043A\u0430 \u043D\u0430\u043F\u043E\u043B\u044C\u043D\u044B\u0445 \u043F\u043B\u0438\u043D\u0442\u0443\u0441\u043E\u0432 \u0438 \u0434\u0435\u043A\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043D\u0430\u0449\u0435\u043B\u044C\u043D\u0438\u043A\u043E\u0432"
    ],
    partnerDe: [
      "Statischer Eingriff in tragende W\xE4nde oder Betontr\xE4ger (Maurermeister)",
      "Neuverlegung von Starkstrom- oder Elektroleitungen (Elektrotechnik-Meister)",
      "\xC4nderung von Gasanschl\xFCssen bei K\xFCchenmontagen (Installateurmeister)"
    ],
    partnerEn: [
      "Structural modifications to load-bearing walls or reinforced concrete (Master Builder)",
      "Electrical main line re-routing and high-voltage circuit creation (Master Electrician)",
      "Gas line alterations during kitchen appliance installations (Master Gas & Plumber)"
    ],
    partnerRu: [
      "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043D\u0435\u0441\u0443\u0449\u0438\u0445 \u0441\u0442\u0435\u043D \u0438 \u0440\u0435\u0437\u043A\u0430 \u0436\u0435\u043B\u0435\u0437\u043E\u0431\u0435\u0442\u043E\u043D\u043D\u044B\u0445 \u0431\u0430\u043B\u043E\u043A (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C)",
      "\u041F\u0440\u043E\u043A\u043B\u0430\u0434\u043A\u0430 \u0441\u0438\u043B\u043E\u0432\u044B\u0445 \u043A\u0430\u0431\u0435\u043B\u0435\u0439 \u0438 \u043C\u043E\u043D\u0442\u0430\u0436 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u0449\u0438\u0442\u043E\u0432 (\u041C\u0430\u0441\u0442\u0435\u0440-\u044D\u043B\u0435\u043A\u0442\u0440\u0438\u043A)",
      "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438 \u043F\u0435\u0440\u0435\u043D\u043E\u0441 \u0433\u0430\u0437\u043E\u0432\u044B\u0445 \u043F\u043B\u0438\u0442 \u0438 \u043A\u043E\u043B\u043E\u043D\u043E\u043A (\u041C\u0430\u0441\u0442\u0435\u0440-\u0433\u0430\u0437\u043E\u0432\u0449\u0438\u043A)"
    ]
  },
  DEMOLITION: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 3,
    travelFeeInnerVienna: 25,
    travelFeeOuterVienna: 35,
    permittedDe: [
      "Entfernen von Tapeten, Fliesenbel\xE4gen und Altputzen bis auf das Rohmauerwerk",
      "R\xFCckbau von nichttragenden Gipskarton- und Leichtbau-Trennw\xE4nden",
      "Herausrei\xDFen von alten Teppichen, Laminaten und schwimmend verlegten B\xF6den",
      "Bauschutt-Sackabtransport (MA 48 konform) zur beh\xF6rdlichen Wertstoffsammelstelle"
    ],
    permittedEn: [
      "Wallpaper peeling, ceramic tile stripping, and loose plaster scraping",
      "Demolition of non-load-bearing drywall partitions and decorative studs",
      "Removal of old carpeting, laminate layers, and subfloor underlays",
      "Rubble bagging and certified MA 48 waste logistics dispatch"
    ],
    permittedRu: [
      "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043E\u0431\u043E\u0435\u0432, \u043F\u043B\u0438\u0442\u043A\u0438 \u0438 \u0441\u0442\u0430\u0440\u043E\u0439 \u0448\u0442\u0443\u043A\u0430\u0442\u0443\u0440\u043A\u0438 \u0434\u043E \u0431\u0430\u0437\u043E\u0432\u043E\u0433\u043E \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u044F",
      "\u0414\u0435\u043C\u043E\u043D\u0442\u0430\u0436 \u043D\u0435\u043D\u0435\u0441\u0443\u0449\u0438\u0445 \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043E\u043A \u0438\u0437 \u0433\u0438\u043F\u0441\u043E\u043A\u0430\u0440\u0442\u043E\u043D\u0430 \u0438 \u043F\u0435\u043D\u043E\u0431\u043B\u043E\u043A\u043E\u0432",
      "\u0421\u043D\u044F\u0442\u0438\u0435 \u0441\u0442\u0430\u0440\u043E\u0433\u043E \u043A\u043E\u0432\u0440\u043E\u043B\u0438\u043D\u0430, \u043B\u0430\u043C\u0438\u043D\u0430\u0442\u0430 \u0438 \u043F\u043E\u0434\u043B\u043E\u0436\u043A\u0438",
      "\u0423\u043F\u0430\u043A\u043E\u0432\u043A\u0430 \u0438 \u0432\u044B\u0432\u043E\u0437 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043C\u0443\u0441\u043E\u0440\u0430 \u043D\u0430 \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u044B MA 48"
    ],
    partnerDe: [
      "Abbruch tragender Pfeiler, Decken und Kaminz\xFCge (Baumeister)",
      "Entfernung asbesthaltiger Baustoffe nach TRGS 519 (Zertifizierter Fachbetrieb)"
    ],
    partnerEn: [
      "Demolition of load-bearing columns, ceilings, or chimney flues (Certified Master Builder)",
      "Removal of asbestos-containing insulation or specialized hazardous substances"
    ],
    partnerRu: [
      "\u0421\u043D\u043E\u0441 \u043D\u0435\u0441\u0443\u0449\u0438\u0445 \u043A\u043E\u043B\u043E\u043D\u043D, \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0442\u0438\u0439 \u0438 \u0432\u0435\u043D\u0442\u0438\u043B\u044F\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C)",
      "\u0423\u0442\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0430\u0441\u0431\u0435\u0441\u0442\u0430 \u0438 \u0442\u043E\u043A\u0441\u0438\u0447\u043D\u044B\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0441\u043B\u0443\u0436\u0431\u043E\u0439"
    ]
  },
  FLOORING: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "Schwimmende Verlegung von Klick-Laminat, Vinyl- und Fertigparkettb\xF6den",
      "Ausbesserung einzelner schadhafter Parkettst\xE4be im Wiener Fischgr\xE4t-Verband",
      "Schleifen, Versiegeln und \xD6len von Holzdielen mit staubreduzierten Absauganlagen",
      "Montage von passgenauen \xDCbergangs- und Sockelleisten"
    ],
    permittedEn: [
      "Floating installation of click-laminate, LVT, and engineered hardwood flooring",
      "Spot repair of damaged solid wood staves in Viennese herringbone layouts",
      "Surface sanding, sealing, and hardwax-oiling with HEPA-filtered dust extraction",
      "Installation of perimeter skirting boards and matching expansion joint profiles"
    ],
    permittedRu: [
      "\u041F\u043B\u0430\u0432\u0430\u044E\u0449\u0430\u044F \u0443\u043A\u043B\u0430\u0434\u043A\u0430 \u043B\u0430\u043C\u0438\u043D\u0430\u0442\u0430, \u0432\u0438\u043D\u0438\u043B\u043E\u0432\u043E\u0439 \u043F\u043B\u0438\u0442\u043A\u0438 \u0438 \u043F\u0430\u0440\u043A\u0435\u0442\u043D\u043E\u0439 \u0434\u043E\u0441\u043A\u0438",
      "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u043C\u043E\u043D\u0442 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u043F\u043B\u0430\u0448\u0435\u043A \u043F\u0430\u0440\u043A\u0435\u0442\u0430 \xAB\u0432\u0435\u043D\u0441\u043A\u0430\u044F \u0435\u043B\u043E\u0447\u043A\u0430\xBB",
      "\u0428\u043B\u0438\u0444\u043E\u0432\u043A\u0430, \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u043B\u0430\u043A\u043E\u043C \u0438 \u043C\u0430\u0441\u043B\u043E\u043C \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C HEPA-\u043F\u044B\u043B\u0435\u0441\u043E\u0441\u043E\u0432",
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u043F\u043B\u0438\u043D\u0442\u0443\u0441\u043E\u0432 \u0438 \u0441\u0442\u044B\u043A\u043E\u0432\u043E\u0447\u043D\u044B\u0445 \u043F\u043E\u0440\u043E\u0436\u043A\u043E\u0432"
    ],
    partnerDe: [
      "Gussasphalt- und Estrichneukonstruktionen im Nassverfahren (Bodenlegermeister)",
      "Verlegung von Fu\xDFbodenheizungssystemen unter Estrich (Installateurmeister)"
    ],
    partnerEn: [
      "Wet-pour concrete screed and mastic asphalt subfloor restructuring (Master Floor Layer)",
      "Hydronic underfloor heating coil installations beneath screed (Master Heating Engineer)"
    ],
    partnerRu: [
      "\u0417\u0430\u043B\u0438\u0432\u043A\u0430 \u043C\u043E\u043A\u0440\u043E\u0439 \u0441\u0442\u044F\u0436\u043A\u0438 \u0438 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E \u043B\u0438\u0442\u043E\u0433\u043E \u0430\u0441\u0444\u0430\u043B\u044C\u0442\u0430 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u044F\u0436\u0435\u0447\u043D\u0438\u043A)",
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u0432\u043E\u0434\u044F\u043D\u044B\u0445 \u0442\u0435\u043F\u043B\u044B\u0445 \u043F\u043E\u043B\u043E\u0432 \u043F\u043E\u0434 \u0441\u0442\u044F\u0436\u043A\u0443 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0430\u043D\u0442\u0435\u0445\u043D\u0438\u043A)"
    ]
  },
  PAINTING: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "Vollfl\xE4chiges Streichen von W\xE4nden und Decken mit Dispersion- und Silikatfarben",
      "Spachteln von Rissen, Setzfugen und D\xFCbell\xF6chern bis Oberfl\xE4cheng\xFCte Q3",
      "Abkleben von Fenstern, T\xFCren und hochwertigen B\xF6den mit Schutzvlies",
      "Lokale Schimmelbehandlung und vorbeugende Grundierung im Wohnbereich"
    ],
    permittedEn: [
      "Full surface wall and ceiling roller painting with premium breathable emulsion",
      "Crack filling, joint skimming, and drill hole patching up to Q3 level",
      "Professional masking of heritage windows, ornate doors, and hardwood floors",
      "Targeted mold spot disinfection and breathable antimicrobial priming"
    ],
    permittedRu: [
      "\u041F\u043E\u043A\u0440\u0430\u0441\u043A\u0430 \u0441\u0442\u0435\u043D \u0438 \u043F\u043E\u0442\u043E\u043B\u043A\u043E\u0432 \u0434\u044B\u0448\u0430\u0449\u0438\u043C\u0438 \u0432\u043E\u0434\u043E\u044D\u043C\u0443\u043B\u044C\u0441\u0438\u043E\u043D\u043D\u044B\u043C\u0438 \u0438 \u0441\u0438\u043B\u0438\u043A\u0430\u0442\u043D\u044B\u043C\u0438 \u043A\u0440\u0430\u0441\u043A\u0430\u043C\u0438",
      "\u0428\u043F\u0430\u043A\u043B\u0435\u0432\u043A\u0430 \u0442\u0440\u0435\u0449\u0438\u043D, \u0441\u0442\u044B\u043A\u043E\u0432 \u0438 \u043E\u0442\u0432\u0435\u0440\u0441\u0442\u0438\u0439 \u0434\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 Q3",
      "\u0423\u043A\u0440\u044B\u0442\u0438\u0435 \u043E\u043A\u043E\u043D, \u0434\u0432\u0435\u0440\u0435\u0439 \u0438 \u043F\u0430\u0440\u043A\u0435\u0442\u0430 \u0437\u0430\u0449\u0438\u0442\u043D\u043E\u0439 \u043F\u043B\u0435\u043D\u043A\u043E\u0439 \u0438 \u0444\u043B\u0438\u0437\u0435\u043B\u0438\u043D\u043E\u043C",
      "\u0410\u043D\u0442\u0438\u0441\u0435\u043F\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043E\u0442 \u043F\u043B\u0435\u0441\u0435\u043D\u0438 \u0438 \u0443\u043A\u0440\u0435\u043F\u043B\u044F\u044E\u0449\u0430\u044F \u0433\u0440\u0443\u043D\u0442\u043E\u0432\u043A\u0430"
    ],
    partnerDe: [
      "Fassadenarbeiten im Au\xDFenbereich mit Ger\xFCststellung (Malermeister)",
      "Denkmalgesch\xFCtzte Stuckrestaurierung an historischen Decken (Stuckateurmeister)"
    ],
    partnerEn: [
      "Exterior building facade scaffolding and weatherproofing (Master Painter)",
      "Heritage-protected stucco and historic plaster relief restoration (Master Stuccoworker)"
    ],
    partnerRu: [
      "\u0424\u0430\u0441\u0430\u0434\u043D\u044B\u0435 \u0432\u044B\u0441\u043E\u0442\u043D\u044B\u0435 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439 \u043B\u0435\u0441\u043E\u0432 (\u041C\u0430\u0441\u0442\u0435\u0440-\u043C\u0430\u043B\u044F\u0440)",
      "\u0420\u0435\u0441\u0442\u0430\u0432\u0440\u0430\u0446\u0438\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0433\u0438\u043F\u0441\u043E\u0432\u043E\u0439 \u043B\u0435\u043F\u043D\u0438\u043D\u044B \u043F\u043E\u0434 \u043E\u0445\u0440\u0430\u043D\u043E\u0439 \u043F\u0430\u043C\u044F\u0442\u043D\u0438\u043A\u043E\u0432 (\u041C\u0430\u0441\u0442\u0435\u0440-\u043B\u0435\u043F\u0449\u0438\u043A)"
    ]
  },
  DRYWALL: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "St\xE4nderwerk-Montage (CW/UW-Profile) f\xFCr nichttragende Raumteiler",
      "Beplankung mit Standard-, Feuchtraum- (Gr\xFCn) oder Schallschutzplatten",
      "Einbringen von Mineralwoll-D\xE4mmstoffen zur thermischen und akustischen Isolation",
      "Verkleidung von Rohrleitungen und Sp\xFClk\xE4sten im Trockenbauverfahren"
    ],
    permittedEn: [
      "Metal stud framework assembly (CW/UW metal profiles) for interior room dividers",
      "Single and double-layer boarding with standard, moisture-resistant, or acoustic drywall",
      "Installation of mineral wool insulation batts for thermal and sound baffling",
      "Concealment boxing around plumbing risers and recessed cistern units"
    ],
    permittedRu: [
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u043C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043A\u0430\u0440\u043A\u0430\u0441\u0430 (\u043F\u0440\u043E\u0444\u0438\u043B\u0438 CW/UW) \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043E\u043A",
      "\u041E\u0431\u0448\u0438\u0432\u043A\u0430 \u0432\u043B\u0430\u0433\u043E\u0441\u0442\u043E\u0439\u043A\u0438\u043C, \u0437\u0432\u0443\u043A\u043E\u0438\u0437\u043E\u043B\u044F\u0446\u0438\u043E\u043D\u043D\u044B\u043C \u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u043C \u0433\u0438\u043F\u0441\u043E\u043A\u0430\u0440\u0442\u043E\u043D\u043E\u043C",
      "\u0423\u043A\u043B\u0430\u0434\u043A\u0430 \u043C\u0438\u043D\u0435\u0440\u0430\u043B\u044C\u043D\u043E\u0439 \u0432\u0430\u0442\u044B \u0434\u043B\u044F \u0442\u0435\u043F\u043B\u043E- \u0438 \u0448\u0443\u043C\u043E\u0438\u0437\u043E\u043B\u044F\u0446\u0438\u0438",
      "\u0423\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E \u043A\u043E\u0440\u043E\u0431\u043E\u0432 \u0434\u043B\u044F \u0441\u0442\u043E\u044F\u043A\u043E\u0432 \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0439 \u0438 \u0438\u043D\u0441\u0442\u0430\u043B\u043B\u044F\u0446\u0438\u0439"
    ],
    partnerDe: [
      "Brandabschnittsw\xE4nde mit beh\xF6rdlichem Pr\xFCfzeugnis F90/EI90 (Trockenbaumeister)",
      "Statische Deckenert\xFCchtigungen in Holzbalkendecken (Zimmermeister)"
    ],
    partnerEn: [
      "Fire-rated compartmentalization walls certified F90/EI90 (Master Drywall Contractor)",
      "Structural timber ceiling reinforcement and joist Sistering (Master Carpenter)"
    ],
    partnerRu: [
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u043E\u0436\u0430\u0440\u043D\u044B\u0445 \u0441\u0442\u0435\u043D F90/EI90 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C)",
      "\u0423\u0441\u0438\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0441\u0443\u0449\u0438\u0445 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0445 \u0431\u0430\u043B\u043E\u043A \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0442\u0438\u0439 (\u041C\u0430\u0441\u0442\u0435\u0440-\u043F\u043B\u043E\u0442\u043D\u0438\u043A)"
    ]
  },
  PLUMBING_MINOR: {
    gewoParagraph: "GewO 1994 \xA7 94 (Reguliertes Gewerbe / Meisterpartner)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "Austausch von Aufputz-Armaturen an bestehenden Eckventilen (ohne Leitungsumbau)",
      "Erneuerung elastischer Silikonfugen an Badewannen, Duschtassen und Waschbecken",
      "Reinigung und mechanischer Tausch von Standard-Geruchsverschl\xFCssen (Siphons)",
      "Anschluss von Waschmaschinen und Geschirrsp\xFClern an vorbereitete Anschl\xFCsse"
    ],
    permittedEn: [
      "Surface-mounted mixer tap replacement connecting to existing angle stop valves",
      "Re-caulking sanitary silicone joints around bathtubs, shower trays, and vanities",
      "Mechanical cleaning and replacement of standard P-traps / drain siphons",
      "Connecting washing machines and dishwashers to ready-made supply/drain valves"
    ],
    permittedRu: [
      "\u0417\u0430\u043C\u0435\u043D\u0430 \u043D\u0430\u043A\u043B\u0430\u0434\u043D\u044B\u0445 \u0441\u043C\u0435\u0441\u0438\u0442\u0435\u043B\u0435\u0439 \u043F\u0440\u0438 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 \u0438\u0441\u043F\u0440\u0430\u0432\u043D\u044B\u0445 \u0443\u0433\u043B\u043E\u0432\u044B\u0445 \u043A\u0440\u0430\u043D\u043E\u0432",
      "\u0417\u0430\u043C\u0435\u043D\u0430 \u0441\u0438\u043B\u0438\u043A\u043E\u043D\u043E\u0432\u043E\u0433\u043E \u0433\u0435\u0440\u043C\u0435\u0442\u0438\u043A\u0430 \u0432\u043E\u043A\u0440\u0443\u0433 \u0432\u0430\u043D\u043D, \u0434\u0443\u0448\u0435\u0432\u044B\u0445 \u043F\u043E\u0434\u0434\u043E\u043D\u043E\u0432 \u0438 \u0443\u043C\u044B\u0432\u0430\u043B\u044C\u043D\u0438\u043A\u043E\u0432",
      "\u041C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0447\u0438\u0441\u0442\u043A\u0430 \u0438 \u0437\u0430\u043C\u0435\u043D\u0430 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u043F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0445 \u0441\u0438\u0444\u043E\u043D\u043E\u0432",
      "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0441\u0442\u0438\u0440\u0430\u043B\u044C\u043D\u044B\u0445 \u0438 \u043F\u043E\u0441\u0443\u0434\u043E\u043C\u043E\u0435\u0447\u043D\u044B\u0445 \u043C\u0430\u0448\u0438\u043D \u043A \u0433\u043E\u0442\u043E\u0432\u044B\u043C \u0432\u044B\u0432\u043E\u0434\u0430\u043C"
    ],
    partnerDe: [
      "Verlegung von Trinkwasser- und Steigleitungen im Mauerwerk (Installateurmeister)",
      "Reparaturen und Wartungen an Gasthermen und Heizkesseln (Gas- und Sanit\xE4rtechnikmeister)",
      "Befundung von Abwasserkan\xE4len mit Dichtheitspr\xFCfung (Konzessionierter Betrieb)"
    ],
    partnerEn: [
      "Concealed in-wall potable water pipe rerouting and main riser work (Master Plumber)",
      "Gas boiler, combi-heater servicing, and gas pipe pressure testing (Licensed Gas Meister)",
      "Drainage pipe pressure testing and official municipal certifications (Certified Firm)"
    ],
    partnerRu: [
      "\u0421\u043A\u0440\u044B\u0442\u0430\u044F \u0440\u0430\u0437\u0432\u043E\u0434\u043A\u0430 \u0432\u043E\u0434\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u043D\u044B\u0445 \u0442\u0440\u0443\u0431 \u0438 \u0441\u0442\u043E\u044F\u043A\u043E\u0432 \u0432 \u0441\u0442\u0435\u043D\u0430\u0445 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0430\u043D\u0442\u0435\u0445\u043D\u0438\u043A)",
      "\u041E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0438 \u0440\u0435\u043C\u043E\u043D\u0442 \u0433\u0430\u0437\u043E\u0432\u044B\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \u0438 \u043A\u043E\u0442\u043B\u043E\u0432 (\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043C\u0430\u0441\u0442\u0435\u0440-\u0433\u0430\u0437\u043E\u0432\u0449\u0438\u043A)",
      "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u0440\u0435\u0441\u0441\u043E\u0432\u043A\u0430 \u0438 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430 \u043A\u0430\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C"
    ]
  },
  BATHROOM_KITCHEN: {
    gewoParagraph: "GewO 1994 \xA7 94 (Reguliertes Gewerbe / Meisterpartner)",
    minBookingHours: 3,
    travelFeeInnerVienna: 25,
    travelFeeOuterVienna: 35,
    permittedDe: [
      "Zuschnitt und Montage von K\xFCchenarbeitsplatten aus Holzwerkstoff (inkl. Beckenausschnitt)",
      "Verlegung von Wand- und Bodenfliesen im D\xFCnnbettverfahren",
      "Montage von Badm\xF6beln, Spiegelschr\xE4nken und Duschabtrennungen aus Glas",
      "Erneuerung von Verbundabdichtungen unter Fliesenbel\xE4gen"
    ],
    permittedEn: [
      "Precision kitchen worktop cutting and sink basin routering for laminate/timber",
      "Wall and floor ceramic tile installation with thin-bed waterproof adhesives",
      "Mounting of vanity units, illuminated mirror cabinets, and glass shower enclosures",
      "Application of liquid waterproof membranes under tiled surfaces"
    ],
    permittedRu: [
      "\u0420\u0430\u0441\u043F\u0438\u043B \u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043A\u0443\u0445\u043E\u043D\u043D\u044B\u0445 \u0441\u0442\u043E\u043B\u0435\u0448\u043D\u0438\u0446 \u0441 \u0432\u044B\u0440\u0435\u0437\u0430\u043C\u0438 \u043F\u043E\u0434 \u043C\u043E\u0439\u043A\u0443 \u0438 \u0432\u0430\u0440\u043E\u0447\u043D\u0443\u044E \u043F\u0430\u043D\u0435\u043B\u044C",
      "\u0423\u043A\u043B\u0430\u0434\u043A\u0430 \u043D\u0430\u0441\u0442\u0435\u043D\u043D\u043E\u0439 \u0438 \u043D\u0430\u043F\u043E\u043B\u044C\u043D\u043E\u0439 \u043F\u043B\u0438\u0442\u043A\u0438 \u043D\u0430 \u0442\u043E\u043D\u043A\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0439 \u043A\u043B\u0435\u0439",
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u043C\u0435\u0431\u0435\u043B\u0438 \u0434\u043B\u044F \u0432\u0430\u043D\u043D\u044B\u0445 \u043A\u043E\u043C\u043D\u0430\u0442, \u0437\u0435\u0440\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0448\u043A\u0430\u0444\u043E\u0432 \u0438 \u0434\u0443\u0448\u0435\u0432\u044B\u0445 \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043E\u043A",
      "\u041D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435 \u0433\u0438\u0434\u0440\u043E\u0438\u0437\u043E\u043B\u044F\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u043C\u0430\u0441\u0442\u0438\u043A\u0438 \u043F\u043E\u0434 \u043F\u043B\u0438\u0442\u043A\u0443"
    ],
    partnerDe: [
      "Elektrischer Starkstromanschluss f\xFCr Induktions- und Elektroherde (Elektromeister)",
      "Gasleitungsanschluss f\xFCr Kochfelder mit Abnahmeprotokoll (Installateurmeister)"
    ],
    partnerEn: [
      "High-voltage electrical circuit commissioning for induction cooktops (Master Electrician)",
      "Certified gas cooktop connection and official Austrian pressure report (Master Gas Fitter)"
    ],
    partnerRu: [
      "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0432\u0430\u0440\u043E\u0447\u043D\u044B\u0445 \u043F\u0430\u043D\u0435\u043B\u0435\u0439 \u043A \u0442\u0440\u0435\u0445\u0444\u0430\u0437\u043D\u043E\u0439 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u0441\u0435\u0442\u0438 (\u041C\u0430\u0441\u0442\u0435\u0440-\u044D\u043B\u0435\u043A\u0442\u0440\u0438\u043A)",
      "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0433\u0430\u0437\u043E\u0432\u044B\u0445 \u043F\u0430\u043D\u0435\u043B\u0435\u0439 \u0441 \u0432\u044B\u0434\u0430\u0447\u0435\u0439 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0430\u043A\u0442\u0430 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0433\u0430\u0437\u043E\u0432\u0449\u0438\u043A)"
    ]
  },
  DOORS_WINDOWS: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "Hobeln und Einstellen von schleifenden T\xFCrbl\xE4ttern und Kastenfensterfl\xFCgeln",
      "Einfr\xE4sen oder Aufkleben von Silikon-Hohldichtungen zur thermischen Isolierung",
      "Tausch von Einsteckschl\xF6ssern, T\xFCrdr\xFCckern und historischen Messingbeschl\xE4gen",
      "Montage von standardisierten Innent\xFCrzargen und Blendrahmen"
    ],
    permittedEn: [
      "Planing and rebating sticking timber doors and heritage box casement sashes",
      "Installation of silicone draft-excluder gaskets for enhanced thermal insulation",
      "Replacement of mortise locks, door handles, and authentic brass latch fittings",
      "Installation of standard interior door frame casing kits"
    ],
    permittedRu: [
      "\u041F\u043E\u0434\u0441\u0442\u0440\u043E\u0436\u043A\u0430 \u0438 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u0440\u043E\u0441\u0435\u0432\u0448\u0438\u0445 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u0438 \u0441\u0442\u0432\u043E\u0440\u043E\u043A \u043E\u043A\u043E\u043D",
      "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0441\u0438\u043B\u0438\u043A\u043E\u043D\u043E\u0432\u044B\u0445 \u0443\u043F\u043B\u043E\u0442\u043D\u0438\u0442\u0435\u043B\u0435\u0439 \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0434\u0443\u0432\u0430\u043D\u0438\u044F",
      "\u0417\u0430\u043C\u0435\u043D\u0430 \u0432\u0440\u0435\u0437\u043D\u044B\u0445 \u0437\u0430\u043C\u043A\u043E\u0432, \u0434\u0432\u0435\u0440\u043D\u044B\u0445 \u0440\u0443\u0447\u0435\u043A \u0438 \u043B\u0430\u0442\u0443\u043D\u043D\u043E\u0439 \u0444\u0443\u0440\u043D\u0438\u0442\u0443\u0440\u044B",
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u043C\u0435\u0436\u043A\u043E\u043C\u043D\u0430\u0442\u043D\u044B\u0445 \u0434\u0432\u0435\u0440\u043D\u044B\u0445 \u043A\u043E\u0440\u043E\u0431\u043E\u043A \u0438 \u043D\u0430\u043B\u0438\u0447\u043D\u0438\u043A\u043E\u0432"
    ],
    partnerDe: [
      "Ma\xDFanfertigung kompletter Au\xDFent\xFCren und Brandschutzt\xFCren (Tischlermeister)",
      "Austausch von Isolierglasscheiben in Gro\xDFformaten (Glaser- und Fenstermeister)"
    ],
    partnerEn: [
      "Bespoke fabrication of certified external security and fire doors (Master Joiner)",
      "Large-format double-glazed thermal insulated pane glazing (Master Glazier)"
    ],
    partnerRu: [
      "\u0418\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u0437\u0430\u043A\u0430\u0437 \u0432\u0445\u043E\u0434\u043D\u044B\u0445 \u0438 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u043E\u0436\u0430\u0440\u043D\u044B\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u043E\u043B\u044F\u0440)",
      "\u0417\u0430\u043C\u0435\u043D\u0430 \u043A\u0440\u0443\u043F\u043D\u043E\u0433\u0430\u0431\u0430\u0440\u0438\u0442\u043D\u044B\u0445 \u0441\u0442\u0435\u043A\u043B\u043E\u043F\u0430\u043A\u0435\u0442\u043E\u0432 \u0438 \u0444\u0430\u0441\u0430\u0434\u043D\u043E\u0433\u043E \u043E\u0441\u0442\u0435\u043A\u043B\u0435\u043D\u0438\u044F (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u0435\u043A\u043E\u043B\u044C\u0449\u0438\u043A)"
    ]
  },
  OUTDOOR: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "K\xE4rcher-Hochdruckreinigung von Stein-, Waschbeton- und Holzb\xF6den",
      "Abschleifen und Ein\xF6len von WPC- und Hartholz-Terrassendielen",
      "Aufbau und Verankerung von Gartenh\xE4usern, Ger\xE4teschuppen und Hochbeeten",
      "Montage von Sichtschutz- und Sonnensegelverankerungen"
    ],
    permittedEn: [
      "Pressure washing of patio stone tiles, exposed aggregate concrete, and wood decks",
      "Surface sanding and protective weather-oiling of composite and hardwood decking",
      "Assembly and anchoring of prefabricated garden sheds and raised planter beds",
      "Mounting privacy fabric screens and tensioned shade sail brackets"
    ],
    permittedRu: [
      "\u041C\u043E\u0439\u043A\u0430 \u0432\u044B\u0441\u043E\u043A\u043E\u0433\u043E \u0434\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043A\u0430\u043C\u0435\u043D\u043D\u044B\u0445 \u0438 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0445 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0439 \u0442\u0435\u0440\u0440\u0430\u0441",
      "\u0428\u043B\u0438\u0444\u043E\u0432\u043A\u0430 \u0438 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435 \u0437\u0430\u0449\u0438\u0442\u043D\u043E\u0433\u043E \u043C\u0430\u0441\u043B\u0430 \u043D\u0430 \u0442\u0435\u0440\u0440\u0430\u0441\u043D\u0443\u044E \u0434\u043E\u0441\u043A\u0443 \u0438\u0437 \u0414\u041F\u041A \u0438 \u0434\u0435\u0440\u0435\u0432\u0430",
      "\u0421\u0431\u043E\u0440\u043A\u0430 \u0438 \u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F \u0441\u0431\u043E\u0440\u043D\u044B\u0445 \u0441\u0430\u0434\u043E\u0432\u044B\u0445 \u0434\u043E\u043C\u0438\u043A\u043E\u0432, \u0441\u0430\u0440\u0430\u0435\u0432 \u0438 \u043A\u043B\u0443\u043C\u0431",
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u0441\u043E\u043B\u043D\u0446\u0435\u0437\u0430\u0449\u0438\u0442\u043D\u044B\u0445 \u043F\u0430\u0440\u0443\u0441\u043E\u0432 \u0438 \u0432\u0435\u0442\u0440\u043E\u0437\u0430\u0449\u0438\u0442\u043D\u044B\u0445 \u044D\u043A\u0440\u0430\u043D\u043E\u0432"
    ],
    partnerDe: [
      "F\xE4llung von Gro\xDFb\xE4umen mit Seilklettertechnik (Garten- und Landschaftsbaumeister)",
      "Errichtung tragender St\xFCtzmauern im Hangbereich (Baumeister)"
    ],
    partnerEn: [
      "Large tree felling with arboricultural climbing certification (Master Arborist)",
      "Structural retaining wall construction on inclined terrain (Master Mason)"
    ],
    partnerRu: [
      "\u0412\u0430\u043B\u043A\u0430 \u043A\u0440\u0443\u043F\u043D\u043E\u043C\u0435\u0440\u043D\u044B\u0445 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432 \u043C\u0435\u0442\u043E\u0434\u043E\u043C \u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0430\u043B\u044C\u043F\u0438\u043D\u0438\u0437\u043C\u0430 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0430\u0440\u0431\u043E\u0440\u0438\u0441\u0442)",
      "\u0412\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u043E\u0434\u043F\u043E\u0440\u043D\u044B\u0445 \u0441\u0442\u0435\u043D \u043D\u0430 \u0441\u043A\u043B\u043E\u043D\u0430\u0445 (\u041C\u0430\u0441\u0442\u0435\u0440-\u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C)"
    ]
  },
  MOVING: {
    gewoParagraph: "GewO 1994 \xA7 5 (Freies Gewerbe)",
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      "Tragen von Mobiliar und Kartons \xFCber Treppenh\xE4user ohne Aufzug",
      "Einwickeln empfindlicher M\xF6belst\xFCcke mit Decken, Stretchfolie und Kantenschutz",
      "Demontage sperriger Betten und Tische vor dem Transport",
      "Beladen und Ladungssicherung im kundeneigenen oder angemieteten Transporter"
    ],
    permittedEn: [
      "Staircase porting of heavy furniture and boxes in walk-up Altbau buildings",
      "Protective wrapping with moving blankets, stretch film, and corner guards",
      "Disassembly of oversized bed frames, dining tables, and sectional sofas",
      "Vehicle loading and ratchet-strap cargo securing in client vans"
    ],
    permittedRu: [
      "\u041F\u043E\u0434\u044A\u0435\u043C \u0438 \u0441\u043F\u0443\u0441\u043A \u043C\u0435\u0431\u0435\u043B\u0438 \u0438 \u043A\u043E\u0440\u043E\u0431\u043E\u043A \u043F\u043E \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0430\u043C \u0432 \u0434\u043E\u043C\u0430\u0445 \u0431\u0435\u0437 \u043B\u0438\u0444\u0442\u0430",
      "\u0423\u043F\u0430\u043A\u043E\u0432\u043A\u0430 \u043C\u0435\u0431\u0435\u043B\u0438 \u0432 \u0437\u0430\u0449\u0438\u0442\u043D\u044B\u0435 \u043E\u0434\u0435\u044F\u043B\u0430, \u0441\u0442\u0440\u0435\u0439\u0447-\u043F\u043B\u0435\u043D\u043A\u0443 \u0438 \u0437\u0430\u0449\u0438\u0442\u043D\u044B\u0435 \u0443\u0433\u043E\u043B\u043A\u0438",
      "\u0420\u0430\u0437\u0431\u043E\u0440\u043A\u0430 \u043A\u0440\u0443\u043F\u043D\u043E\u0433\u0430\u0431\u0430\u0440\u0438\u0442\u043D\u044B\u0445 \u043A\u0440\u043E\u0432\u0430\u0442\u0435\u0439 \u0438 \u0441\u0442\u043E\u043B\u043E\u0432 \u043F\u0435\u0440\u0435\u0434 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u043E\u0439",
      "\u041F\u043E\u0433\u0440\u0443\u0437\u043A\u0430 \u0438 \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0435 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0433\u0440\u0443\u0437\u0430 \u0440\u0435\u043C\u043D\u044F\u043C\u0438 \u0432 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0435"
    ],
    partnerDe: [
      "Gewerblicher G\xFCterkraftverkehr \xFCber 3,5t Gesamtgewicht (Konzessionierter Fr\xE4chter)",
      "Klavier- und Safe-Spezialtransporte mit Treppenraupe (Spezialtransporteur)"
    ],
    partnerEn: [
      "Commercial heavy transport exceeding 3.5 tons vehicle gross weight (Licensed Freight Carrier)",
      "Specialized grand piano and vault relocation utilizing motorized stair-climbers"
    ],
    partnerRu: [
      "\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u0433\u0440\u0443\u0437\u043E\u043F\u0435\u0440\u0435\u0432\u043E\u0437\u043A\u0438 \u043D\u0430 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0435 \u0441\u0432\u044B\u0448\u0435 3,5 \u0442\u043E\u043D\u043D (\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u0435\u0440\u0435\u0432\u043E\u0437\u0447\u0438\u043A)",
      "\u0422\u0430\u043A\u0435\u043B\u0430\u0436\u043D\u0430\u044F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 \u0440\u043E\u044F\u043B\u0435\u0439 \u0438 \u0441\u0435\u0439\u0444\u043E\u0432 \u0441 \u0433\u0443\u0441\u0435\u043D\u0438\u0447\u043D\u044B\u043C\u0438 \u043F\u043E\u0434\u044A\u0435\u043C\u043D\u0438\u043A\u0430\u043C\u0438"
    ]
  },
  COMMERCIAL: {
    gewoParagraph: "GewO 1994 \xA7 94 (Koordiniertes Gewerbe)",
    minBookingHours: 3,
    travelFeeInnerVienna: 25,
    travelFeeOuterVienna: 35,
    permittedDe: [
      "Montage von Ladeneinrichtungen, Gondelregalen und Warentr\xE4gern",
      "Anbringung von Werbebannern, Acrylschildern und Beschilderungen",
      "Austausch von Leuchtmitteln und standardisierten LED-Panels",
      "Laufende Kleinreparaturen an T\xFCren, Griffen und Personalr\xE4umen"
    ],
    permittedEn: [
      "Installation of retail fixtures, modular gondola shelving, and product displays",
      "Mounting acrylic corporate signage, window graphics, and directional boards",
      "Standard LED panel and ceiling spotlight bulb replacements",
      "Routine repair of staff locker room doors, latches, and office cabinetry"
    ],
    permittedRu: [
      "\u041C\u043E\u043D\u0442\u0430\u0436 \u0442\u043E\u0440\u0433\u043E\u0432\u043E\u0433\u043E \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u044F, \u043C\u043E\u0434\u0443\u043B\u044C\u043D\u044B\u0445 \u0441\u0442\u0435\u043B\u043B\u0430\u0436\u0435\u0439 \u0438 \u0432\u0438\u0442\u0440\u0438\u043D",
      "\u041A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0445 \u0432\u044B\u0432\u0435\u0441\u043E\u043A, \u0430\u043A\u0440\u0438\u043B\u043E\u0432\u044B\u0445 \u0442\u0430\u0431\u043B\u0438\u0447\u0435\u043A \u0438 \u0431\u0430\u043D\u043D\u0435\u0440\u043E\u0432",
      "\u0417\u0430\u043C\u0435\u043D\u0430 \u043B\u0430\u043C\u043F \u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u0441\u0432\u0435\u0442\u043E\u0434\u0438\u043E\u0434\u043D\u044B\u0445 \u043F\u0430\u043D\u0435\u043B\u0435\u0439",
      "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0440\u0435\u043C\u043E\u043D\u0442 \u043E\u0444\u0438\u0441\u043D\u043E\u0439 \u043C\u0435\u0431\u0435\u043B\u0438, \u0437\u0430\u043C\u043A\u043E\u0432 \u0438 \u0444\u0443\u0440\u043D\u0438\u0442\u0443\u0440\u044B"
    ],
    partnerDe: [
      "Pr\xFCfung elektrischer Betriebsmittel nach \xD6VE/\xD6NORM E 8701 (Elektromeister)",
      "Wartung von gewerblichen Dunstabzugsanlagen und Fettabscheidern (L\xFCftungsmeister)"
    ],
    partnerEn: [
      "Statutory electrical appliance safety audits conforming to \xD6VE/\xD6NORM E 8701",
      "Commercial kitchen extraction hood and grease separator certification"
    ],
    partnerRu: [
      "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0432\u0435\u0440\u043A\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0430\u043C \xD6VE/\xD6NORM E 8701",
      "\u041E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0438 \u0447\u0438\u0441\u0442\u043A\u0430 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u0432\u044B\u0442\u044F\u0436\u0435\u043A \u0438 \u0436\u0438\u0440\u043E\u0443\u043B\u043E\u0432\u0438\u0442\u0435\u043B\u0435\u0439 \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u043E\u0432"
    ]
  }
};
async function getServiceCategoryDetail(categoryKey) {
  return (0, import_action_utils.withResult)(async () => {
    const validKey = categoryKey && Object.prototype.hasOwnProperty.call(CATEGORY_ACTIVITY_REGISTRY, categoryKey.toUpperCase()) ? categoryKey.toUpperCase() : null;
    let categoryRecord = validKey ? await import_prisma.default.serviceCategory.findFirst({
      where: { key: validKey }
    }) : null;
    if (!categoryRecord) {
      categoryRecord = await import_prisma.default.serviceCategory.findFirst({
        orderBy: { displayOrder: "asc" }
      });
    }
    if (!categoryRecord) {
      throw new Error("Service category not found");
    }
    const effectiveKey = categoryRecord.key;
    const registrySpec = CATEGORY_ACTIVITY_REGISTRY[effectiveKey] || CATEGORY_ACTIVITY_REGISTRY.ASSEMBLY;
    const categoryDTO = {
      id: categoryRecord.id,
      // data-from: ServiceCategory-id
      key: effectiveKey,
      // data-from: ServiceCategory-key
      titleDe: categoryRecord.titleDe,
      // data-from: ServiceCategory-titleDe
      titleEn: categoryRecord.titleEn,
      // data-from: ServiceCategory-titleEn
      titleRu: categoryRecord.titleRu,
      // data-from: ServiceCategory-titleRu
      baselineHourlyRate: categoryRecord.baselineHourlyRate.toNumber(),
      // data-from: ServiceCategory-baselineHourlyRate
      typicalRangeEur: categoryRecord.typicalRangeEur,
      // data-from: ServiceCategory-typicalRangeEur
      craftClassification: categoryRecord.craftClassification,
      // data-from: ServiceCategory-craftClassification
      leadArtisan: categoryRecord.leadArtisan,
      // data-from: ServiceCategory-leadArtisan
      isFeatured: categoryRecord.isFeatured,
      // data-from: ServiceCategory-isFeatured
      descriptionDe: categoryRecord.descriptionDe,
      // data-from: ServiceCategory-descriptionDe
      descriptionEn: categoryRecord.descriptionEn,
      // data-from: ServiceCategory-descriptionEn
      descriptionRu: categoryRecord.descriptionRu,
      // data-from: ServiceCategory-descriptionRu
      imageUrl: categoryRecord.imageUrl,
      // data-from: ServiceCategory-imageUrl data-role: image_url
      iconName: categoryRecord.iconName,
      // data-from: ServiceCategory-iconName
      displayOrder: categoryRecord.displayOrder,
      // data-from: ServiceCategory-displayOrder
      gewoParagraph: registrySpec.gewoParagraph,
      minBookingHours: registrySpec.minBookingHours,
      travelFeeInnerVienna: registrySpec.travelFeeInnerVienna,
      travelFeeOuterVienna: registrySpec.travelFeeOuterVienna,
      permittedActivitiesDe: registrySpec.permittedDe,
      permittedActivitiesEn: registrySpec.permittedEn,
      permittedActivitiesRu: registrySpec.permittedRu,
      licensedPartnerActivitiesDe: registrySpec.partnerDe,
      licensedPartnerActivitiesEn: registrySpec.partnerEn,
      licensedPartnerActivitiesRu: registrySpec.partnerRu
    };
    const districtRecords = await import_prisma.default.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });
    const districtsDTO = districtRecords.map((d) => {
      let surcharge = 19.5;
      if (d.zone === "OUTER_RING") surcharge = 24.5;
      if (d.zone === "GREATER_SUBURB") surcharge = 29.5;
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
        travelSurchargeEur: surcharge
      };
    });
    const allCategories = await import_prisma.default.serviceCategory.findMany({
      select: {
        key: true,
        titleEn: true,
        titleDe: true,
        titleRu: true
      },
      orderBy: { displayOrder: "asc" }
    });
    return {
      category: categoryDTO,
      districts: districtsDTO,
      availableCategories: allCategories.map((c) => ({
        key: c.key,
        // data-from: ServiceCategory-key
        titleEn: c.titleEn,
        // data-from: ServiceCategory-titleEn
        titleDe: c.titleDe,
        // data-from: ServiceCategory-titleDe
        titleRu: c.titleRu
        // data-from: ServiceCategory-titleRu
      }))
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getServiceCategoryDetail
});
