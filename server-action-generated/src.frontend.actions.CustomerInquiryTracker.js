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

// src/frontend/actions/CustomerInquiryTracker.ts
var CustomerInquiryTracker_exports = {};
__export(CustomerInquiryTracker_exports, {
  getCustomerInquiries: () => getCustomerInquiries
});
module.exports = __toCommonJS(CustomerInquiryTracker_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getCustomerInquiries() {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (auth.role !== import_action_utils.UserRole.CUSTOMER) {
      throw new import_action_utils.ForbiddenError();
    }
    const customerFilter = {
      OR: [
        { customerId: auth.userId },
        { clientEmail: auth.email }
      ]
    };
    const records = await import_prisma.default.quoteRequest.findMany({
      where: customerFilter,
      include: {
        serviceCategory: true,
        district: true
      },
      orderBy: { createdAt: "desc" }
    });
    const mappedInquiries = records.map((record) => {
      return {
        id: record.id,
        // data-from: QuoteRequest-id
        trackingCode: record.trackingCode,
        // data-from: QuoteRequest-trackingCode
        customerId: record.customerId,
        // data-from: QuoteRequest-customerId
        clientName: record.clientName,
        // data-from: QuoteRequest-clientName
        clientPhone: record.clientPhone,
        // data-from: QuoteRequest-clientPhone
        clientEmail: record.clientEmail,
        // data-from: QuoteRequest-clientEmail
        serviceCategoryId: record.serviceCategoryId,
        // data-from: QuoteRequest-serviceCategoryId
        districtId: record.districtId,
        // data-from: QuoteRequest-districtId
        addressSnippet: record.addressSnippet,
        // data-from: QuoteRequest-addressSnippet
        taskTitle: record.taskTitle,
        // data-from: QuoteRequest-taskTitle
        taskDescription: record.taskDescription,
        // data-from: QuoteRequest-taskDescription
        estimatedHours: record.estimatedHours,
        // data-from: QuoteRequest-estimatedHours
        estimatedBudgetEur: record.estimatedBudgetEur ? record.estimatedBudgetEur.toNumber() : 0,
        // data-from: QuoteRequest-estimatedBudgetEur
        preferredDate: record.preferredDate,
        // data-from: QuoteRequest-preferredDate
        preferredTimeSlot: record.preferredTimeSlot,
        // data-from: QuoteRequest-preferredTimeSlot
        hasMaterials: record.hasMaterials,
        // data-from: QuoteRequest-hasMaterials
        agreedToTerms: record.agreedToTerms,
        // data-from: QuoteRequest-agreedToTerms
        submissionLang: record.submissionLang,
        // data-from: QuoteRequest-submissionLang
        isUrgent: record.isUrgent,
        // data-from: QuoteRequest-isUrgent
        status: record.status,
        // data-from: QuoteRequest-status
        createdAtFormatted: record.createdAtFormatted,
        // data-from: QuoteRequest-createdAtFormatted
        scopeNotes: record.scopeNotes,
        // data-from: QuoteRequest-scopeNotes
        createdAt: record.createdAt,
        // data-from: QuoteRequest-createdAt
        updatedAt: record.updatedAt,
        // data-from: QuoteRequest-updatedAt
        serviceCategory: {
          id: record.serviceCategory.id,
          // data-from: ServiceCategory-id
          key: record.serviceCategory.key,
          // data-from: ServiceCategory-key
          titleDe: record.serviceCategory.titleDe,
          // data-from: ServiceCategory-titleDe
          titleEn: record.serviceCategory.titleEn,
          // data-from: ServiceCategory-titleEn
          titleRu: record.serviceCategory.titleRu,
          // data-from: ServiceCategory-titleRu
          baselineHourlyRate: record.serviceCategory.baselineHourlyRate ? record.serviceCategory.baselineHourlyRate.toNumber() : 0,
          // data-from: ServiceCategory-baselineHourlyRate
          typicalRangeEur: record.serviceCategory.typicalRangeEur,
          // data-from: ServiceCategory-typicalRangeEur
          craftClassification: record.serviceCategory.craftClassification,
          // data-from: ServiceCategory-craftClassification
          leadArtisan: record.serviceCategory.leadArtisan,
          // data-from: ServiceCategory-leadArtisan
          imageUrl: record.serviceCategory.imageUrl
          // data-from: ServiceCategory-imageUrl data-role: image_url
        },
        district: {
          id: record.district.id,
          // data-from: ViennaDistrict-id
          districtCode: record.district.districtCode,
          // data-from: ViennaDistrict-districtCode
          districtName: record.district.districtName,
          // data-from: ViennaDistrict-districtName
          districtNumber: record.district.districtNumber,
          // data-from: ViennaDistrict-districtNumber
          zone: record.district.zone,
          // data-from: ViennaDistrict-zone
          leadTimeHours: record.district.leadTimeHours
          // data-from: ViennaDistrict-leadTimeHours
        }
      };
    });
    let total = mappedInquiries.length;
    let review = 0;
    let progress = 0;
    let completed = 0;
    for (const item of mappedInquiries) {
      if (item.status === "NEW" || item.status === "CONTACTED" || item.status === "ESTIMATE_SENT") {
        review++;
      } else if (item.status === "QUOTED" || item.status === "SCHEDULED") {
        progress++;
      } else if (item.status === "COMPLETED") {
        completed++;
      }
    }
    const metrics = {
      totalSubmitted: total,
      activeReview: review,
      inProgress: progress,
      completed
    };
    return {
      inquiries: mappedInquiries,
      metrics
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomerInquiries
});
