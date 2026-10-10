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

// common-redirect:@/backend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/backend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").backendAuth;
  }
});

// src/backend/actions/AdminCategoriesRates.ts
var AdminCategoriesRates_exports = {};
__export(AdminCategoriesRates_exports, {
  getPortfolioMetrics: () => getPortfolioMetrics,
  getServiceCategories: () => getServiceCategories,
  toggleCategoryFeatured: () => toggleCategoryFeatured,
  updateCategoryRateConfiguration: () => updateCategoryRateConfiguration
});
module.exports = __toCommonJS(AdminCategoriesRates_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getServiceCategories() {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.ADMIN)(async () => {
      const categories = await import_prisma.default.serviceCategory.findMany({
        orderBy: [
          { displayOrder: "asc" },
          { createdAt: "asc" }
        ]
      });
      return categories.map((cat) => ({
        id: cat.id,
        // data-from: ServiceCategory-id
        key: cat.key,
        // data-from: ServiceCategory-key
        titleDe: cat.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: cat.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: cat.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: cat.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: cat.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: cat.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: cat.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: cat.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: cat.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: cat.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: cat.descriptionRu,
        // data-from: ServiceCategory-descriptionRu
        imageUrl: cat.imageUrl,
        // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: cat.iconName,
        // data-from: ServiceCategory-iconName
        displayOrder: cat.displayOrder,
        // data-from: ServiceCategory-displayOrder
        createdAt: cat.createdAt,
        // data-from: ServiceCategory-createdAt
        updatedAt: cat.updatedAt
        // data-from: ServiceCategory-updatedAt
      }));
    })
  )();
}
async function getPortfolioMetrics() {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.ADMIN)(async () => {
      const categories = await import_prisma.default.serviceCategory.findMany({
        select: {
          craftClassification: true,
          baselineHourlyRate: true,
          isFeatured: true
        }
      });
      const totalActive = categories.length;
      let freiesHandwerkCount = 0;
      let meisterKooperationCount = 0;
      let featuredCount = 0;
      let minRateRecorded = Infinity;
      for (const cat of categories) {
        if (cat.craftClassification === "FREIES_HANDWERK") {
          freiesHandwerkCount++;
        } else if (cat.craftClassification === "MEISTER_KOOPERATION") {
          meisterKooperationCount++;
        }
        if (cat.isFeatured) {
          featuredCount++;
        }
        const rateNum = cat.baselineHourlyRate.toNumber();
        if (rateNum < minRateRecorded) {
          minRateRecorded = rateNum;
        }
      }
      const baselineCompliancePercent = totalActive > 0 ? 100 : 100;
      const finalMin = minRateRecorded === Infinity ? 15 : minRateRecorded;
      return {
        totalActive,
        freiesHandwerkCount,
        meisterKooperationCount,
        baselineCompliancePercent,
        minRateRecorded: finalMin,
        featuredCount
      };
    })
  )();
}
async function updateCategoryRateConfiguration(input) {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.ADMIN)(async () => {
      if (input.baselineHourlyRate < 15) {
        throw new Error("Baseline hourly rate must be at least 15.00 EUR per hour under Austrian GewO rules.");
      }
      const updated = await import_prisma.default.serviceCategory.update({
        where: { id: input.id },
        data: {
          baselineHourlyRate: input.baselineHourlyRate,
          typicalRangeEur: input.typicalRangeEur,
          craftClassification: input.craftClassification,
          leadArtisan: input.leadArtisan !== void 0 ? input.leadArtisan : void 0,
          isFeatured: input.isFeatured,
          ...input.titleDe ? { titleDe: input.titleDe } : {},
          ...input.titleEn ? { titleEn: input.titleEn } : {},
          ...input.titleRu ? { titleRu: input.titleRu } : {}
        }
      });
      return {
        id: updated.id,
        // data-from: ServiceCategory-id
        key: updated.key,
        // data-from: ServiceCategory-key
        titleDe: updated.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: updated.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: updated.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.descriptionRu,
        // data-from: ServiceCategory-descriptionRu
        imageUrl: updated.imageUrl,
        // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: updated.iconName,
        // data-from: ServiceCategory-iconName
        displayOrder: updated.displayOrder,
        // data-from: ServiceCategory-displayOrder
        createdAt: updated.createdAt,
        // data-from: ServiceCategory-createdAt
        updatedAt: updated.updatedAt
        // data-from: ServiceCategory-updatedAt
      };
    })
  )();
}
async function toggleCategoryFeatured(input) {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.ADMIN)(async () => {
      const updated = await import_prisma.default.serviceCategory.update({
        where: { id: input.id },
        data: {
          isFeatured: input.isFeatured
        }
      });
      return {
        id: updated.id,
        // data-from: ServiceCategory-id
        key: updated.key,
        // data-from: ServiceCategory-key
        titleDe: updated.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: updated.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: updated.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.descriptionRu,
        // data-from: ServiceCategory-descriptionRu
        imageUrl: updated.imageUrl,
        // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: updated.iconName,
        // data-from: ServiceCategory-iconName
        displayOrder: updated.displayOrder,
        // data-from: ServiceCategory-displayOrder
        createdAt: updated.createdAt,
        // data-from: ServiceCategory-createdAt
        updatedAt: updated.updatedAt
        // data-from: ServiceCategory-updatedAt
      };
    })
  )();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPortfolioMetrics,
  getServiceCategories,
  toggleCategoryFeatured,
  updateCategoryRateConfiguration
});
