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

// src/frontend/actions/HomeFrontend.ts
var HomeFrontend_exports = {};
__export(HomeFrontend_exports, {
  createQuoteRequest: () => createQuoteRequest,
  getHomeData: () => getHomeData
});
module.exports = __toCommonJS(HomeFrontend_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getHomeData() {
  return (0, import_action_utils.withResult)(async () => {
    const dbServices = await import_prisma.default.serviceCategory.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }]
    });
    const dbDistricts = await import_prisma.default.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });
    const dbFaqs = await import_prisma.default.faqItem.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }]
    });
    const services = dbServices.map((s) => ({
      id: s.id,
      // data-from: ServiceCategory-id
      key: s.key,
      // data-from: ServiceCategory-key
      titleDe: s.titleDe,
      // data-from: ServiceCategory-titleDe
      titleEn: s.titleEn,
      // data-from: ServiceCategory-titleEn
      titleRu: s.titleRu,
      // data-from: ServiceCategory-titleRu
      baselineHourlyRate: s.baselineHourlyRate.toNumber(),
      // data-from: ServiceCategory-baselineHourlyRate
      typicalRangeEur: s.typicalRangeEur,
      // data-from: ServiceCategory-typicalRangeEur
      craftClassification: s.craftClassification,
      // data-from: ServiceCategory-craftClassification
      leadArtisan: s.leadArtisan,
      // data-from: ServiceCategory-leadArtisan
      isFeatured: s.isFeatured,
      // data-from: ServiceCategory-isFeatured
      descriptionDe: s.descriptionDe,
      // data-from: ServiceCategory-descriptionDe
      descriptionEn: s.descriptionEn,
      // data-from: ServiceCategory-descriptionEn
      descriptionRu: s.descriptionRu,
      // data-from: ServiceCategory-descriptionRu
      imageUrl: s.imageUrl,
      // data-from: ServiceCategory-imageUrl data-role: image_url
      iconName: s.iconName,
      // data-from: ServiceCategory-iconName
      displayOrder: s.displayOrder
      // data-from: ServiceCategory-displayOrder
    }));
    const districts = dbDistricts.map((d) => ({
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
      leadTimeHours: d.leadTimeHours
      // data-from: ViennaDistrict-leadTimeHours
    }));
    const faqs = dbFaqs.map((f) => ({
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
      displayOrder: f.displayOrder
      // data-from: FaqItem-displayOrder
    }));
    return {
      services,
      districts,
      faqs
    };
  })();
}
async function createQuoteRequest(input) {
  return (0, import_action_utils.withResult)(async () => {
    const service = await import_prisma.default.serviceCategory.findUnique({
      where: { key: input.serviceCategoryKey }
    });
    if (!service) {
      throw new Error(`Invalid service category: ${input.serviceCategoryKey}`);
    }
    const district = await import_prisma.default.viennaDistrict.findUnique({
      where: { districtCode: input.districtCode }
    });
    if (!district) {
      throw new Error(`Invalid Vienna district code: ${input.districtCode}`);
    }
    const hourlyRate = service.baselineHourlyRate.toNumber();
    const travelFlat = 20;
    const expressSurcharge = input.isUrgent ? 35 : 0;
    const hours = Math.max(1, Math.min(8, input.estimatedHours || 3));
    const totalBudget = hourlyRate * hours + travelFlat + expressSurcharge;
    const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
    const trackingCode = `VIE-${input.districtCode}-${randomSuffix}`;
    const authContext = (0, import_action_utils.tryGetAuthContext)();
    const customerId = authContext ? authContext.userId : null;
    const formattedDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const quote = await import_prisma.default.quoteRequest.create({
      data: {
        trackingCode,
        customerId,
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientEmail: input.clientEmail,
        serviceCategoryId: service.id,
        districtId: district.id,
        addressSnippet: input.addressSnippet || `${district.districtName}, Vienna`,
        taskTitle: input.taskTitle,
        taskDescription: input.taskDescription,
        estimatedHours: hours,
        estimatedBudgetEur: totalBudget,
        preferredDate: input.preferredDate,
        preferredTimeSlot: input.preferredTimeSlot,
        hasMaterials: input.hasMaterials,
        agreedToTerms: input.agreedToTerms,
        submissionLang: input.submissionLang,
        isUrgent: input.isUrgent,
        status: "NEW",
        createdAtFormatted: formattedDate
      },
      include: {
        serviceCategory: true,
        district: true
      }
    });
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const notificationEmail = process.env.CONTACT_EMAIL;
      const fromEmail = process.env.EMAIL_FROM || "Handyman Website <onboarding@resend.dev>";
      if (!apiKey || !notificationEmail) {
        console.warn("Email notification skipped: RESEND_API_KEY or CONTACT_EMAIL is not configured.");
      } else {
        const emailText = [
          "A new Handyman quote request was submitted.",
          "",
          `Tracking code: ${quote.trackingCode}`,
          `Name: ${quote.clientName}`,
          `Phone: ${quote.clientPhone}`,
          `Email: ${quote.clientEmail || "Not provided"}`,
          `Service: ${service.titleEn}`,
          `District: ${district.districtCode} - ${district.districtName}`,
          `Address: ${quote.addressSnippet || "Not provided"}`,
          `Task: ${quote.taskTitle}`,
          `Description: ${quote.taskDescription || "Not provided"}`,
          `Estimated hours: ${quote.estimatedHours}`,
          `Estimated budget: €${quote.estimatedBudgetEur.toNumber().toFixed(2)}`,
          `Preferred date: ${quote.preferredDate}`,
          `Preferred time: ${quote.preferredTimeSlot}`,
          `Urgent: ${quote.isUrgent ? "Yes" : "No"}`,
          `Materials provided: ${quote.hasMaterials ? "Yes" : "No"}`,
          `Submitted: ${quote.createdAtFormatted}`
        ].join("\n");
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notificationEmail],
            subject: `New Handyman request: ${quote.trackingCode}`,
            text: emailText,
            reply_to: quote.clientEmail || void 0
          })
        });
        if (!emailResponse.ok) {
          console.error("Resend email notification failed:", await emailResponse.text());
        } else {
          console.info(`Resend email notification sent for ${quote.trackingCode}.`);
        }
      }
    } catch (emailError) {
      console.error("Failed to send quote request notification email:", emailError);
    }
    return {
      id: quote.id,
      // data-from: QuoteRequest-id
      trackingCode: quote.trackingCode,
      // data-from: QuoteRequest-trackingCode
      estimatedBudgetEur: quote.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      status: quote.status,
      // data-from: QuoteRequest-status
      clientName: quote.clientName,
      // data-from: QuoteRequest-clientName
      clientPhone: quote.clientPhone,
      // data-from: QuoteRequest-clientPhone
      clientEmail: quote.clientEmail,
      // data-from: QuoteRequest-clientEmail
      districtCode: quote.district.districtCode,
      // data-from: ViennaDistrict-districtCode
      serviceTitle: quote.serviceCategory.titleEn
      // data-from: ServiceCategory-titleEn
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createQuoteRequest,
  getHomeData
});
