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

// src/backend/actions/AdminQuoteDetail.ts
var AdminQuoteDetail_exports = {};
__export(AdminQuoteDetail_exports, {
  addConsultationLog: () => addConsultationLog,
  getQuoteRequestDetail: () => getQuoteRequestDetail,
  updateJobScope: () => updateJobScope,
  updateLaborAndBudget: () => updateLaborAndBudget,
  updateLifecycle: () => updateLifecycle
});
module.exports = __toCommonJS(AdminQuoteDetail_exports);
var import_prisma = __toESM(require_prisma());
var import_BaseActionFun = __toESM(require_BaseActionFun());
function parseConsultationHistory(scopeNotes, createdAtFormatted, createdAt) {
  const notes = [];
  if (!scopeNotes) {
    notes.push({
      id: "default-inflow",
      adminName: "Vienna Operations Dispatch",
      timestamp: createdAtFormatted || createdAt.toLocaleDateString("de-AT"),
      actionTaken: "Initial Ticket Inflow",
      note: "Customer submitted quote lead via online portal. Triage complete and assigned to district sector."
    });
    return notes;
  }
  const lines = scopeNotes.split("\n");
  let logCount = 1;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("[LOG:")) {
      const match = trimmed.match(/^\[LOG:\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\]:\s*(.*)$/);
      if (match) {
        notes.unshift({
          id: `log-${logCount++}`,
          actionTaken: match[1],
          adminName: match[2],
          timestamp: match[3],
          note: match[4]
        });
      }
    } else if (trimmed.startsWith("[Archival Note]:")) {
      notes.unshift({
        id: `archival-${logCount++}`,
        actionTaken: "Final Archival Sign-off",
        adminName: "Lead Operations Administrator",
        timestamp: "Final Settlement",
        note: trimmed.replace("[Archival Note]:", "").trim()
      });
    }
  }
  if (notes.length === 0) {
    notes.push({
      id: "default-scope-note",
      adminName: "Dispatch Operations",
      timestamp: createdAtFormatted || createdAt.toLocaleDateString("de-AT"),
      actionTaken: "Telephone Consultation & Inflow",
      note: scopeNotes
    });
  }
  return notes;
}
async function getQuoteRequestDetail(quoteRequestId) {
  return (0, import_BaseActionFun.withResult)(async () => {
    if (!quoteRequestId) return null;
    let quote = await import_prisma.default.quoteRequest.findFirst({
      where: {
        OR: [{ id: quoteRequestId }, { trackingCode: quoteRequestId }]
      },
      include: {
        customer: true,
        serviceCategory: true,
        district: true
      }
    });
    if (!quote) {
      quote = await import_prisma.default.quoteRequest.findFirst({
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
          serviceCategory: true,
          district: true
        }
      });
    }
    if (!quote) return null;
    const consultationHistory = parseConsultationHistory(
      quote.scopeNotes,
      quote.createdAtFormatted,
      quote.createdAt
    );
    return {
      id: quote.id,
      // data-from: QuoteRequest-id
      trackingCode: quote.trackingCode,
      // data-from: QuoteRequest-trackingCode
      customerId: quote.customerId,
      // data-from: QuoteRequest-customerId
      customer: quote.customer ? {
        id: quote.customer.id,
        // data-from: AccountUser-id
        email: quote.customer.email,
        // data-from: AccountUser-email
        role: quote.customer.role,
        // data-from: AccountUser-role
        fullName: quote.customer.fullName,
        // data-from: AccountUser-fullName
        phone: quote.customer.phone,
        // data-from: AccountUser-phone
        createdAt: quote.customer.createdAt
        // data-from: AccountUser-createdAt
      } : null,
      clientName: quote.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: quote.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: quote.clientEmail,
      // data-from: QuoteRequest-clientEmail
      serviceCategoryId: quote.serviceCategoryId,
      // data-from: QuoteRequest-serviceCategoryId
      serviceCategory: {
        id: quote.serviceCategory.id,
        // data-from: ServiceCategory-id
        key: quote.serviceCategory.key,
        // data-from: ServiceCategory-key
        titleDe: quote.serviceCategory.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: quote.serviceCategory.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: quote.serviceCategory.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: quote.serviceCategory.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: quote.serviceCategory.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: quote.serviceCategory.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: quote.serviceCategory.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: quote.serviceCategory.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: quote.serviceCategory.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: quote.serviceCategory.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: quote.serviceCategory.descriptionRu
        // data-from: ServiceCategory-descriptionRu
      },
      districtId: quote.districtId,
      // data-from: QuoteRequest-districtId
      district: {
        id: quote.district.id,
        // data-from: ViennaDistrict-id
        districtCode: quote.district.districtCode,
        // data-from: ViennaDistrict-districtCode
        districtName: quote.district.districtName,
        // data-from: ViennaDistrict-districtName
        districtNumber: quote.district.districtNumber,
        // data-from: ViennaDistrict-districtNumber
        zone: quote.district.zone,
        // data-from: ViennaDistrict-zone
        leadTimeHours: quote.district.leadTimeHours
        // data-from: ViennaDistrict-leadTimeHours
      },
      addressSnippet: quote.addressSnippet,
      // data-from: QuoteRequest-addressSnippet
      taskTitle: quote.taskTitle,
      // data-from: QuoteRequest-taskTitle
      taskDescription: quote.taskDescription,
      // data-from: QuoteRequest-taskDescription
      estimatedHours: quote.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      estimatedBudgetEur: quote.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      preferredDate: quote.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: quote.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: quote.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      agreedToTerms: quote.agreedToTerms,
      // data-from: QuoteRequest-agreedToTerms
      submissionLang: quote.submissionLang,
      // data-from: QuoteRequest-submissionLang
      isUrgent: quote.isUrgent,
      // data-from: QuoteRequest-isUrgent
      status: quote.status,
      // data-from: QuoteRequest-status
      createdAtFormatted: quote.createdAtFormatted,
      // data-from: QuoteRequest-createdAtFormatted
      scopeNotes: quote.scopeNotes,
      // data-from: QuoteRequest-scopeNotes
      createdAt: quote.createdAt,
      // data-from: QuoteRequest-createdAt
      updatedAt: quote.updatedAt,
      // data-from: QuoteRequest-updatedAt
      consultationHistory
    };
  })();
}
async function updateLaborAndBudget(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const existing = await import_prisma.default.quoteRequest.findUnique({
      where: { id: input.id }
    });
    if (!existing) {
      throw new Error("Quote request not found");
    }
    if (existing.status === "COMPLETED") {
      throw new Error("Record is locked: COMPLETED quote requests cannot be modified under Austrian GewO rules");
    }
    const updated = await import_prisma.default.quoteRequest.update({
      where: { id: input.id },
      data: {
        estimatedHours: Math.max(1, input.estimatedHours),
        estimatedBudgetEur: input.estimatedBudgetEur,
        scopeNotes: input.scopeNotes !== void 0 ? input.scopeNotes : existing.scopeNotes
      },
      include: {
        customer: true,
        serviceCategory: true,
        district: true
      }
    });
    const consultationHistory = parseConsultationHistory(
      updated.scopeNotes,
      updated.createdAtFormatted,
      updated.createdAt
    );
    return {
      id: updated.id,
      // data-from: QuoteRequest-id
      trackingCode: updated.trackingCode,
      // data-from: QuoteRequest-trackingCode
      customerId: updated.customerId,
      // data-from: QuoteRequest-customerId
      customer: updated.customer ? {
        id: updated.customer.id,
        // data-from: AccountUser-id
        email: updated.customer.email,
        // data-from: AccountUser-email
        role: updated.customer.role,
        // data-from: AccountUser-role
        fullName: updated.customer.fullName,
        // data-from: AccountUser-fullName
        phone: updated.customer.phone,
        // data-from: AccountUser-phone
        createdAt: updated.customer.createdAt
        // data-from: AccountUser-createdAt
      } : null,
      clientName: updated.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: updated.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: updated.clientEmail,
      // data-from: QuoteRequest-clientEmail
      serviceCategoryId: updated.serviceCategoryId,
      // data-from: QuoteRequest-serviceCategoryId
      serviceCategory: {
        id: updated.serviceCategory.id,
        // data-from: ServiceCategory-id
        key: updated.serviceCategory.key,
        // data-from: ServiceCategory-key
        titleDe: updated.serviceCategory.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: updated.serviceCategory.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: updated.serviceCategory.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.serviceCategory.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.serviceCategory.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.serviceCategory.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.serviceCategory.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.serviceCategory.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.serviceCategory.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.serviceCategory.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.serviceCategory.descriptionRu
        // data-from: ServiceCategory-descriptionRu
      },
      districtId: updated.districtId,
      // data-from: QuoteRequest-districtId
      district: {
        id: updated.district.id,
        // data-from: ViennaDistrict-id
        districtCode: updated.district.districtCode,
        // data-from: ViennaDistrict-districtCode
        districtName: updated.district.districtName,
        // data-from: ViennaDistrict-districtName
        districtNumber: updated.district.districtNumber,
        // data-from: ViennaDistrict-districtNumber
        zone: updated.district.zone,
        // data-from: ViennaDistrict-zone
        leadTimeHours: updated.district.leadTimeHours
        // data-from: ViennaDistrict-leadTimeHours
      },
      addressSnippet: updated.addressSnippet,
      // data-from: QuoteRequest-addressSnippet
      taskTitle: updated.taskTitle,
      // data-from: QuoteRequest-taskTitle
      taskDescription: updated.taskDescription,
      // data-from: QuoteRequest-taskDescription
      estimatedHours: updated.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      estimatedBudgetEur: updated.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      preferredDate: updated.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: updated.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: updated.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      agreedToTerms: updated.agreedToTerms,
      // data-from: QuoteRequest-agreedToTerms
      submissionLang: updated.submissionLang,
      // data-from: QuoteRequest-submissionLang
      isUrgent: updated.isUrgent,
      // data-from: QuoteRequest-isUrgent
      status: updated.status,
      // data-from: QuoteRequest-status
      createdAtFormatted: updated.createdAtFormatted,
      // data-from: QuoteRequest-createdAtFormatted
      scopeNotes: updated.scopeNotes,
      // data-from: QuoteRequest-scopeNotes
      createdAt: updated.createdAt,
      // data-from: QuoteRequest-createdAt
      updatedAt: updated.updatedAt,
      // data-from: QuoteRequest-updatedAt
      consultationHistory
    };
  })();
}
async function updateJobScope(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const existing = await import_prisma.default.quoteRequest.findUnique({
      where: { id: input.id }
    });
    if (!existing) {
      throw new Error("Quote request not found");
    }
    if (existing.status === "COMPLETED") {
      throw new Error("Record is locked: COMPLETED quote requests cannot be modified");
    }
    const updated = await import_prisma.default.quoteRequest.update({
      where: { id: input.id },
      data: {
        taskTitle: input.taskTitle !== void 0 ? input.taskTitle : existing.taskTitle,
        taskDescription: input.taskDescription !== void 0 ? input.taskDescription : existing.taskDescription,
        addressSnippet: input.addressSnippet !== void 0 ? input.addressSnippet : existing.addressSnippet,
        hasMaterials: input.hasMaterials !== void 0 ? input.hasMaterials : existing.hasMaterials
      },
      include: {
        customer: true,
        serviceCategory: true,
        district: true
      }
    });
    const consultationHistory = parseConsultationHistory(
      updated.scopeNotes,
      updated.createdAtFormatted,
      updated.createdAt
    );
    return {
      id: updated.id,
      // data-from: QuoteRequest-id
      trackingCode: updated.trackingCode,
      // data-from: QuoteRequest-trackingCode
      customerId: updated.customerId,
      // data-from: QuoteRequest-customerId
      customer: updated.customer ? {
        id: updated.customer.id,
        // data-from: AccountUser-id
        email: updated.customer.email,
        // data-from: AccountUser-email
        role: updated.customer.role,
        // data-from: AccountUser-role
        fullName: updated.customer.fullName,
        // data-from: AccountUser-fullName
        phone: updated.customer.phone,
        // data-from: AccountUser-phone
        createdAt: updated.customer.createdAt
        // data-from: AccountUser-createdAt
      } : null,
      clientName: updated.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: updated.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: updated.clientEmail,
      // data-from: QuoteRequest-clientEmail
      serviceCategoryId: updated.serviceCategoryId,
      // data-from: QuoteRequest-serviceCategoryId
      serviceCategory: {
        id: updated.serviceCategory.id,
        // data-from: ServiceCategory-id
        key: updated.serviceCategory.key,
        // data-from: ServiceCategory-key
        titleDe: updated.serviceCategory.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: updated.serviceCategory.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: updated.serviceCategory.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.serviceCategory.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.serviceCategory.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.serviceCategory.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.serviceCategory.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.serviceCategory.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.serviceCategory.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.serviceCategory.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.serviceCategory.descriptionRu
        // data-from: ServiceCategory-descriptionRu
      },
      districtId: updated.districtId,
      // data-from: QuoteRequest-districtId
      district: {
        id: updated.district.id,
        // data-from: ViennaDistrict-id
        districtCode: updated.district.districtCode,
        // data-from: ViennaDistrict-districtCode
        districtName: updated.district.districtName,
        // data-from: ViennaDistrict-districtName
        districtNumber: updated.district.districtNumber,
        // data-from: ViennaDistrict-districtNumber
        zone: updated.district.zone,
        // data-from: ViennaDistrict-zone
        leadTimeHours: updated.district.leadTimeHours
        // data-from: ViennaDistrict-leadTimeHours
      },
      addressSnippet: updated.addressSnippet,
      // data-from: QuoteRequest-addressSnippet
      taskTitle: updated.taskTitle,
      // data-from: QuoteRequest-taskTitle
      taskDescription: updated.taskDescription,
      // data-from: QuoteRequest-taskDescription
      estimatedHours: updated.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      estimatedBudgetEur: updated.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      preferredDate: updated.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: updated.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: updated.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      agreedToTerms: updated.agreedToTerms,
      // data-from: QuoteRequest-agreedToTerms
      submissionLang: updated.submissionLang,
      // data-from: QuoteRequest-submissionLang
      isUrgent: updated.isUrgent,
      // data-from: QuoteRequest-isUrgent
      status: updated.status,
      // data-from: QuoteRequest-status
      createdAtFormatted: updated.createdAtFormatted,
      // data-from: QuoteRequest-createdAtFormatted
      scopeNotes: updated.scopeNotes,
      // data-from: QuoteRequest-scopeNotes
      createdAt: updated.createdAt,
      // data-from: QuoteRequest-createdAt
      updatedAt: updated.updatedAt,
      // data-from: QuoteRequest-updatedAt
      consultationHistory
    };
  })();
}
async function updateLifecycle(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const existing = await import_prisma.default.quoteRequest.findUnique({
      where: { id: input.id }
    });
    if (!existing) {
      throw new Error("Quote request not found");
    }
    if (existing.status === "COMPLETED" && input.status !== "COMPLETED") {
      throw new Error("Record is already finalized and cannot be reverted");
    }
    let newScopeNotes = existing.scopeNotes;
    if (input.archivalNote) {
      newScopeNotes = existing.scopeNotes ? `${existing.scopeNotes}
[Archival Note]: ${input.archivalNote}` : `[Archival Note]: ${input.archivalNote}`;
    }
    const updated = await import_prisma.default.quoteRequest.update({
      where: { id: input.id },
      data: {
        status: input.status !== void 0 ? input.status : existing.status,
        isUrgent: input.isUrgent !== void 0 ? input.isUrgent : existing.isUrgent,
        scopeNotes: newScopeNotes
      },
      include: {
        customer: true,
        serviceCategory: true,
        district: true
      }
    });
    const consultationHistory = parseConsultationHistory(
      updated.scopeNotes,
      updated.createdAtFormatted,
      updated.createdAt
    );
    return {
      id: updated.id,
      // data-from: QuoteRequest-id
      trackingCode: updated.trackingCode,
      // data-from: QuoteRequest-trackingCode
      customerId: updated.customerId,
      // data-from: QuoteRequest-customerId
      customer: updated.customer ? {
        id: updated.customer.id,
        // data-from: AccountUser-id
        email: updated.customer.email,
        // data-from: AccountUser-email
        role: updated.customer.role,
        // data-from: AccountUser-role
        fullName: updated.customer.fullName,
        // data-from: AccountUser-fullName
        phone: updated.customer.phone,
        // data-from: AccountUser-phone
        createdAt: updated.customer.createdAt
        // data-from: AccountUser-createdAt
      } : null,
      clientName: updated.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: updated.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: updated.clientEmail,
      // data-from: QuoteRequest-clientEmail
      serviceCategoryId: updated.serviceCategoryId,
      // data-from: QuoteRequest-serviceCategoryId
      serviceCategory: {
        id: updated.serviceCategory.id,
        // data-from: ServiceCategory-id
        key: updated.serviceCategory.key,
        // data-from: ServiceCategory-key
        titleDe: updated.serviceCategory.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: updated.serviceCategory.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: updated.serviceCategory.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.serviceCategory.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.serviceCategory.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.serviceCategory.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.serviceCategory.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.serviceCategory.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.serviceCategory.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.serviceCategory.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.serviceCategory.descriptionRu
        // data-from: ServiceCategory-descriptionRu
      },
      districtId: updated.districtId,
      // data-from: QuoteRequest-districtId
      district: {
        id: updated.district.id,
        // data-from: ViennaDistrict-id
        districtCode: updated.district.districtCode,
        // data-from: ViennaDistrict-districtCode
        districtName: updated.district.districtName,
        // data-from: ViennaDistrict-districtName
        districtNumber: updated.district.districtNumber,
        // data-from: ViennaDistrict-districtNumber
        zone: updated.district.zone,
        // data-from: ViennaDistrict-zone
        leadTimeHours: updated.district.leadTimeHours
        // data-from: ViennaDistrict-leadTimeHours
      },
      addressSnippet: updated.addressSnippet,
      // data-from: QuoteRequest-addressSnippet
      taskTitle: updated.taskTitle,
      // data-from: QuoteRequest-taskTitle
      taskDescription: updated.taskDescription,
      // data-from: QuoteRequest-taskDescription
      estimatedHours: updated.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      estimatedBudgetEur: updated.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      preferredDate: updated.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: updated.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: updated.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      agreedToTerms: updated.agreedToTerms,
      // data-from: QuoteRequest-agreedToTerms
      submissionLang: updated.submissionLang,
      // data-from: QuoteRequest-submissionLang
      isUrgent: updated.isUrgent,
      // data-from: QuoteRequest-isUrgent
      status: updated.status,
      // data-from: QuoteRequest-status
      createdAtFormatted: updated.createdAtFormatted,
      // data-from: QuoteRequest-createdAtFormatted
      scopeNotes: updated.scopeNotes,
      // data-from: QuoteRequest-scopeNotes
      createdAt: updated.createdAt,
      // data-from: QuoteRequest-createdAt
      updatedAt: updated.updatedAt,
      // data-from: QuoteRequest-updatedAt
      consultationHistory
    };
  })();
}
async function addConsultationLog(input) {
  return (0, import_BaseActionFun.withResult)(async () => {
    const existing = await import_prisma.default.quoteRequest.findUnique({
      where: { id: input.id }
    });
    if (!existing) {
      throw new Error("Quote request not found");
    }
    const timeStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("de-AT", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const logLine = `[LOG: ${input.actionTaken} | ${input.adminName || "Admin"} | Today at ${timeStr}]: ${input.note}`;
    const newScopeNotes = existing.scopeNotes ? `${existing.scopeNotes}
${logLine}` : logLine;
    const updated = await import_prisma.default.quoteRequest.update({
      where: { id: input.id },
      data: {
        scopeNotes: newScopeNotes
      },
      include: {
        customer: true,
        serviceCategory: true,
        district: true
      }
    });
    const consultationHistory = parseConsultationHistory(
      updated.scopeNotes,
      updated.createdAtFormatted,
      updated.createdAt
    );
    return {
      id: updated.id,
      // data-from: QuoteRequest-id
      trackingCode: updated.trackingCode,
      // data-from: QuoteRequest-trackingCode
      customerId: updated.customerId,
      // data-from: QuoteRequest-customerId
      customer: updated.customer ? {
        id: updated.customer.id,
        // data-from: AccountUser-id
        email: updated.customer.email,
        // data-from: AccountUser-email
        role: updated.customer.role,
        // data-from: AccountUser-role
        fullName: updated.customer.fullName,
        // data-from: AccountUser-fullName
        phone: updated.customer.phone,
        // data-from: AccountUser-phone
        createdAt: updated.customer.createdAt
        // data-from: AccountUser-createdAt
      } : null,
      clientName: updated.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: updated.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: updated.clientEmail,
      // data-from: QuoteRequest-clientEmail
      serviceCategoryId: updated.serviceCategoryId,
      // data-from: QuoteRequest-serviceCategoryId
      serviceCategory: {
        id: updated.serviceCategory.id,
        // data-from: ServiceCategory-id
        key: updated.serviceCategory.key,
        // data-from: ServiceCategory-key
        titleDe: updated.serviceCategory.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: updated.serviceCategory.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: updated.serviceCategory.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.serviceCategory.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.serviceCategory.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.serviceCategory.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.serviceCategory.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.serviceCategory.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.serviceCategory.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.serviceCategory.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.serviceCategory.descriptionRu
        // data-from: ServiceCategory-descriptionRu
      },
      districtId: updated.districtId,
      // data-from: QuoteRequest-districtId
      district: {
        id: updated.district.id,
        // data-from: ViennaDistrict-id
        districtCode: updated.district.districtCode,
        // data-from: ViennaDistrict-districtCode
        districtName: updated.district.districtName,
        // data-from: ViennaDistrict-districtName
        districtNumber: updated.district.districtNumber,
        // data-from: ViennaDistrict-districtNumber
        zone: updated.district.zone,
        // data-from: ViennaDistrict-zone
        leadTimeHours: updated.district.leadTimeHours
        // data-from: ViennaDistrict-leadTimeHours
      },
      addressSnippet: updated.addressSnippet,
      // data-from: QuoteRequest-addressSnippet
      taskTitle: updated.taskTitle,
      // data-from: QuoteRequest-taskTitle
      taskDescription: updated.taskDescription,
      // data-from: QuoteRequest-taskDescription
      estimatedHours: updated.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      estimatedBudgetEur: updated.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      preferredDate: updated.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: updated.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: updated.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      agreedToTerms: updated.agreedToTerms,
      // data-from: QuoteRequest-agreedToTerms
      submissionLang: updated.submissionLang,
      // data-from: QuoteRequest-submissionLang
      isUrgent: updated.isUrgent,
      // data-from: QuoteRequest-isUrgent
      status: updated.status,
      // data-from: QuoteRequest-status
      createdAtFormatted: updated.createdAtFormatted,
      // data-from: QuoteRequest-createdAtFormatted
      scopeNotes: updated.scopeNotes,
      // data-from: QuoteRequest-scopeNotes
      createdAt: updated.createdAt,
      // data-from: QuoteRequest-createdAt
      updatedAt: updated.updatedAt,
      // data-from: QuoteRequest-updatedAt
      consultationHistory
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addConsultationLog,
  getQuoteRequestDetail,
  updateJobScope,
  updateLaborAndBudget,
  updateLifecycle
});
