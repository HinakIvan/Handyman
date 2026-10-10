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

// common-redirect:@/@base/BaseActionFun
var require_BaseActionFun = __commonJS({
  "common-redirect:@/@base/BaseActionFun"(exports2, module2) {
    module2.exports = require("./_common").BaseActionFun;
  }
});

// src/backend/actions/AdminOperationsDashboard.ts
var AdminOperationsDashboard_exports = {};
__export(AdminOperationsDashboard_exports, {
  getDashboardOverview: () => getDashboardOverview,
  updateQuoteStatus: () => updateQuoteStatus,
  updateServiceCategoryRate: () => updateServiceCategoryRate,
  updateSetupChecklistItem: () => updateSetupChecklistItem
});
module.exports = __toCommonJS(AdminOperationsDashboard_exports);
var import_prisma = __toESM(require_prisma());
var import_BaseActionFun = __toESM(require_BaseActionFun());
async function getDashboardOverview(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const rawRequests = await import_prisma.default.quoteRequest.findMany({
      orderBy: [
        { isUrgent: "desc" },
        { createdAt: "desc" }
      ],
      include: {
        serviceCategory: true,
        district: true
      }
    });
    const quoteRequests = rawRequests.map((r) => ({
      id: r.id,
      // data-from: QuoteRequest-id
      trackingCode: r.trackingCode,
      // data-from: QuoteRequest-trackingCode
      customerId: r.customerId,
      // data-from: QuoteRequest-customerId
      clientName: r.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: r.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: r.clientEmail,
      // data-from: QuoteRequest-clientEmail
      serviceCategoryId: r.serviceCategoryId,
      // data-from: QuoteRequest-serviceCategoryId
      serviceCategoryKey: r.serviceCategory.key,
      // data-from: ServiceCategory-key
      districtId: r.districtId,
      // data-from: QuoteRequest-districtId
      districtCode: r.district.districtCode,
      // data-from: ViennaDistrict-districtCode
      districtName: r.district.districtName,
      // data-from: ViennaDistrict-districtName
      districtZone: r.district.zone,
      // data-from: ViennaDistrict-zone
      addressSnippet: r.addressSnippet,
      // data-from: QuoteRequest-addressSnippet
      taskTitle: r.taskTitle,
      // data-from: QuoteRequest-taskTitle
      taskDescription: r.taskDescription,
      // data-from: QuoteRequest-taskDescription
      estimatedHours: r.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      estimatedBudgetEur: r.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      preferredDate: r.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: r.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: r.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      agreedToTerms: r.agreedToTerms,
      // data-from: QuoteRequest-agreedToTerms
      submissionLang: r.submissionLang,
      // data-from: QuoteRequest-submissionLang
      isUrgent: r.isUrgent,
      // data-from: QuoteRequest-isUrgent
      status: r.status,
      // data-from: QuoteRequest-status
      createdAtFormatted: r.createdAtFormatted,
      // data-from: QuoteRequest-createdAtFormatted
      scopeNotes: r.scopeNotes,
      // data-from: QuoteRequest-scopeNotes
      createdAt: r.createdAt,
      // data-from: QuoteRequest-createdAt
      updatedAt: r.updatedAt
      // data-from: QuoteRequest-updatedAt
    }));
    const rawCategories = await import_prisma.default.serviceCategory.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { titleEn: "asc" }
      ],
      include: {
        _count: {
          select: {
            quoteRequests: {
              where: {
                status: {
                  in: ["NEW", "CONTACTED", "ESTIMATE_SENT", "QUOTED"]
                }
              }
            }
          }
        }
      }
    });
    const serviceCategories = rawCategories.map((c) => ({
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
      baselineHourlyRate: c.baselineHourlyRate.toNumber(),
      // data-from: ServiceCategory-baselineHourlyRate
      typicalRangeEur: c.typicalRangeEur,
      // data-from: ServiceCategory-typicalRangeEur
      craftClassification: c.craftClassification,
      // data-from: ServiceCategory-craftClassification
      leadArtisan: c.leadArtisan,
      // data-from: ServiceCategory-leadArtisan
      isFeatured: c.isFeatured,
      // data-from: ServiceCategory-isFeatured
      activeLeadsCount: c._count.quoteRequests,
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
      displayOrder: c.displayOrder
      // data-from: ServiceCategory-displayOrder
    }));
    const rawChecklist = await import_prisma.default.setupChecklistItem.findMany({
      orderBy: { createdAt: "asc" }
    });
    const setupChecklistItems = rawChecklist.map((chk) => ({
      id: chk.id,
      // data-from: SetupChecklistItem-id
      itemKey: chk.itemKey,
      // data-from: SetupChecklistItem-itemKey
      title: chk.title,
      // data-from: SetupChecklistItem-title
      subtitle: chk.subtitle,
      // data-from: SetupChecklistItem-subtitle
      status: chk.status,
      // data-from: SetupChecklistItem-status
      fieldValue: chk.fieldValue,
      // data-from: SetupChecklistItem-fieldValue
      legalRef: chk.legalRef,
      // data-from: SetupChecklistItem-legalRef
      lastUpdated: chk.lastUpdated
      // data-from: SetupChecklistItem-lastUpdated
    }));
    const totalInquiries = quoteRequests.length;
    const pendingEstimatesList = quoteRequests.filter(
      (r) => ["NEW", "CONTACTED", "ESTIMATE_SENT"].includes(r.status)
    );
    const pendingEstimates = pendingEstimatesList.length;
    const pendingEstimatesUrgent = pendingEstimatesList.filter((r) => r.isUrgent).length;
    const totalCategories = serviceCategories.length;
    const activeCategories = serviceCategories.filter(
      (c) => c.baselineHourlyRate >= 15
    ).length;
    const nonNewRequests = quoteRequests.filter((r) => r.status !== "NEW").length;
    const slaPercentMet = totalInquiries > 0 ? Math.round(nonNewRequests / totalInquiries * 100) : 94;
    const metrics = {
      totalInquiries,
      totalInquiriesTrend: "+18%",
      pendingEstimates,
      pendingEstimatesUrgent,
      activeCategories,
      totalCategories,
      responseSlaMinutes: 28,
      slaTargetMinutes: 45,
      slaPercentMet: Math.max(80, Math.min(100, slaPercentMet))
    };
    const now = /* @__PURE__ */ new Date();
    const lastSyncTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} CET`;
    return {
      quoteRequests,
      serviceCategories,
      setupChecklistItems,
      metrics,
      lastSyncTime
    };
  })();
}
async function updateQuoteStatus(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const existing = await import_prisma.default.quoteRequest.findUnique({
      where: { id: input.id },
      select: { id: true, status: true }
    });
    if (!existing) {
      throw new Error(`QuoteRequest not found: ${input.id}`);
    }
    if (existing.status === "COMPLETED" && input.status !== "COMPLETED") {
      throw new Error("Completed quote requests are locked against further status modifications.");
    }
    const updated = await import_prisma.default.quoteRequest.update({
      where: { id: input.id },
      data: {
        status: input.status
      },
      select: {
        id: true,
        status: true,
        updatedAt: true
      }
    });
    return {
      id: updated.id,
      // data-from: QuoteRequest-id
      status: updated.status,
      // data-from: QuoteRequest-status
      updatedAt: updated.updatedAt
      // data-from: QuoteRequest-updatedAt
    };
  })();
}
async function updateServiceCategoryRate(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    if (input.baselineHourlyRate < 15) {
      throw new Error("Baseline hourly rate must be at least 15.00 EUR/h pursuant to Austrian trade regulation.");
    }
    const typicalRangeEur = input.typicalRangeEur || `\u20AC${Math.round(input.baselineHourlyRate)} - \u20AC${Math.round(input.baselineHourlyRate * 1.6)}/h`;
    const updated = await import_prisma.default.serviceCategory.update({
      where: { id: input.id },
      data: {
        baselineHourlyRate: input.baselineHourlyRate,
        leadArtisan: input.leadArtisan,
        typicalRangeEur
      },
      select: {
        id: true,
        baselineHourlyRate: true,
        leadArtisan: true,
        typicalRangeEur: true
      }
    });
    return {
      id: updated.id,
      // data-from: ServiceCategory-id
      baselineHourlyRate: updated.baselineHourlyRate.toNumber(),
      // data-from: ServiceCategory-baselineHourlyRate
      leadArtisan: updated.leadArtisan,
      // data-from: ServiceCategory-leadArtisan
      typicalRangeEur: updated.typicalRangeEur
      // data-from: ServiceCategory-typicalRangeEur
    };
  })();
}
async function updateSetupChecklistItem(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const updated = await import_prisma.default.setupChecklistItem.update({
      where: { id: input.id },
      data: {
        status: input.status,
        fieldValue: input.fieldValue,
        lastUpdated: todayStr
      },
      select: {
        id: true,
        status: true,
        fieldValue: true,
        lastUpdated: true
      }
    });
    return {
      id: updated.id,
      // data-from: SetupChecklistItem-id
      status: updated.status,
      // data-from: SetupChecklistItem-status
      fieldValue: updated.fieldValue,
      // data-from: SetupChecklistItem-fieldValue
      lastUpdated: updated.lastUpdated
      // data-from: SetupChecklistItem-lastUpdated
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDashboardOverview,
  updateQuoteStatus,
  updateServiceCategoryRate,
  updateSetupChecklistItem
});
