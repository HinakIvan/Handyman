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

// src/frontend/actions/PricingScope.ts
var PricingScope_exports = {};
__export(PricingScope_exports, {
  getPricingScopeData: () => getPricingScopeData
});
module.exports = __toCommonJS(PricingScope_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getPricingScopeData() {
  return (0, import_action_utils.withResult)(async () => {
    const dbCategories = await import_prisma.default.serviceCategory.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { titleEn: "asc" }
      ]
    });
    const categories = dbCategories.map((c) => {
      const minHours = c.craftClassification === "MEISTER_KOOPERATION" ? 2.5 : 1.5;
      return {
        id: c.id,
        // data-from: ServiceCategory-id
        key: c.key,
        // data-from: ServiceCategory-key
        titleDe: c.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: c.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: c.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: c.baselineHourlyRate ? c.baselineHourlyRate.toNumber() : 15,
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: c.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: c.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: c.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: c.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: c.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: c.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: c.descriptionRu,
        // data-from: ServiceCategory-descriptionRu
        imageUrl: c.imageUrl,
        // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: c.iconName,
        // data-from: ServiceCategory-iconName
        displayOrder: c.displayOrder,
        // data-from: ServiceCategory-displayOrder
        minimumHours: minHours
      };
    });
    const dbFaqs = await import_prisma.default.faqItem.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "asc" }
      ]
    });
    const faqs = dbFaqs.map((f) => {
      let snippet = void 0;
      if (f.category === "PRICING") {
        snippet = "GewO 1994 \xA7 5 & Austrian Consumer Protection Act (KSchG).";
      } else if (f.category === "SCOPE") {
        snippet = "Gewerbeordnung 1994 (GewO) \xA7 94 Reglementierte Gewerbe.";
      } else if (f.category === "SCHEDULING") {
        snippet = "Wiener Parkraum\xFCberwachungsverordnung & Wiener Kurzparkzonen-Regelung.";
      } else if (f.category === "MATERIALS") {
        snippet = "Zero-markup pass-through transparent trade billing guarantee.";
      }
      return {
        id: f.id,
        // data-from: FaqItem-id
        category: f.category,
        // data-from: FaqItem-category
        questionDe: f.questionDe,
        // data-from: FaqItem-questionDe
        questionEn: f.questionEn,
        // data-from: FaqItem-questionEn
        questionRu: f.questionRu,
        // data-from: FaqItem-questionRu
        answerDe: f.answerDe,
        // data-from: FaqItem-answerDe
        answerEn: f.answerEn,
        // data-from: FaqItem-answerEn
        answerRu: f.answerRu,
        // data-from: FaqItem-answerRu
        displayOrder: f.displayOrder,
        // data-from: FaqItem-displayOrder
        legalNoticeSnippet: snippet
      };
    });
    const dbDistricts = await import_prisma.default.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });
    const districts = dbDistricts.map((d) => {
      let flatRate = 19;
      if (d.zone === "CENTRAL") {
        flatRate = 24;
      } else if (d.zone === "OUTER_RING" || d.zone === "GREATER_SUBURB") {
        flatRate = 29;
      }
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
        flatRateEur: flatRate
      };
    });
    const baselineStartingEur = categories.length > 0 ? Math.min(...categories.map((c) => c.baselineHourlyRate)) : 15;
    const freiesCount = categories.filter((c) => c.craftClassification === "FREIES_HANDWERK").length;
    const meisterCount = categories.filter((c) => c.craftClassification === "MEISTER_KOOPERATION").length;
    return {
      categories,
      faqs,
      districts,
      stats: {
        baselineStartingEur,
        totalTradesCount: categories.length,
        freiesCount,
        meisterCount
      }
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPricingScopeData
});
