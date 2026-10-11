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

// src/frontend/actions/QuoteRequestForm.ts
var QuoteRequestForm_exports = {};
__export(QuoteRequestForm_exports, {
  createQuoteRequest: () => createQuoteRequest,
  getQuoteFormInitData: () => getQuoteFormInitData
});
module.exports = __toCommonJS(QuoteRequestForm_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getQuoteFormInitData(categoryKey) {
  return (0, import_action_utils.withResult)(async () => {
    const categoriesDb = await import_prisma.default.serviceCategory.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { titleEn: "asc" }
      ]
    });
    const categories = categoriesDb.map((c) => ({
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
      isFeatured: c.isFeatured
      // data-from: ServiceCategory-isFeatured
    }));
    const districtsDb = await import_prisma.default.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });
    const districts = districtsDb.map((d) => ({
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
    let preselectedCategoryId = categories.length > 0 ? categories[0].id : "";
    if (categoryKey) {
      const match = categories.find(
        (c) => c.key.toLowerCase() === categoryKey.toLowerCase()
      );
      if (match) {
        preselectedCategoryId = match.id;
      }
    }
    let currentUser = null;
    const auth = (0, import_action_utils.tryGetAuthContext)();
    if (auth && auth.userId) {
      const user = await import_prisma.default.accountUser.findUnique({
        where: { id: auth.userId },
        select: {
          fullName: true,
          email: true,
          phone: true
        }
      });
      if (user) {
        currentUser = {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone
        };
      }
    }
    return {
      categories,
      districts,
      preselectedCategoryId,
      currentUser
    };
  })();
}
async function createQuoteRequest(input) {
  return (0, import_action_utils.withResult)(async () => {
    const category = await import_prisma.default.serviceCategory.findUnique({
      where: { id: input.serviceCategoryId }
    });
    if (!category) {
      throw new Error(`Service category ${input.serviceCategoryId} not found.`);
    }
    const district = await import_prisma.default.viennaDistrict.findUnique({
      where: { id: input.districtId }
    });
    if (!district) {
      throw new Error(`Vienna district ${input.districtId} not found.`);
    }
    const hourlyRateNum = category.baselineHourlyRate.toNumber();
    const hours = Math.max(1, input.estimatedHours);
    const calculatedBudget = hourlyRateNum * hours;
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
    const trackingCode = `VIE-${currentYear}-${randomSuffix}`;
    const auth = (0, import_action_utils.tryGetAuthContext)();
    const customerId = auth && auth.userId ? auth.userId : null;
    const now = /* @__PURE__ */ new Date();
    const createdAtFormatted = now.toLocaleDateString("de-AT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    const created = await import_prisma.default.quoteRequest.create({
      data: {
        trackingCode,
        customerId,
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientEmail: input.clientEmail,
        serviceCategoryId: category.id,
        districtId: district.id,
        addressSnippet: input.addressSnippet,
        taskTitle: input.taskTitle,
        taskDescription: input.taskDescription,
        estimatedHours: hours,
        estimatedBudgetEur: calculatedBudget,
        preferredDate: input.preferredDate,
        preferredTimeSlot: input.preferredTimeSlot,
        hasMaterials: input.hasMaterials,
        agreedToTerms: input.agreedToTerms,
        submissionLang: input.submissionLang,
        isUrgent: input.isUrgent,
        status: "NEW",
        createdAtFormatted
      }
    });
    // Notify the site owner after the request has been persisted.
    // A mail delivery failure must not undo the saved quote request.
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const notificationEmail = process.env.CONTACT_EMAIL;
      const fromEmail = process.env.EMAIL_FROM || "Handyman Website <onboarding@resend.dev>";
      if (!apiKey || !notificationEmail) {
        console.warn("Email notification skipped: RESEND_API_KEY or CONTACT_EMAIL is not configured.", {
          hasApiKey: Boolean(apiKey),
          hasContactEmail: Boolean(notificationEmail)
        });
      } else {
        const emailText = [
          "A new Handyman quote request was submitted.",
          "",
          `Tracking code: ${created.trackingCode}`,
          `Name: ${created.clientName}`,
          `Phone: ${created.clientPhone}`,
          `Email: ${created.clientEmail || "Not provided"}`,
          `Service: ${category.titleEn}`,
          `District: ${district.districtCode} - ${district.districtName}`,
          `Address: ${created.addressSnippet || "Not provided"}`,
          `Task: ${created.taskTitle}`,
          `Description: ${created.taskDescription || "Not provided"}`,
          `Estimated hours: ${created.estimatedHours}`,
          `Estimated budget: €${created.estimatedBudgetEur.toNumber().toFixed(2)}`,
          `Preferred date: ${created.preferredDate}`,
          `Preferred time: ${created.preferredTimeSlot}`,
          `Urgent: ${created.isUrgent ? "Yes" : "No"}`,
          `Materials provided: ${created.hasMaterials ? "Yes" : "No"}`,
          `Submitted: ${created.createdAtFormatted}`
        ].join("\\n");
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notificationEmail],
            subject: `New Handyman request: ${created.trackingCode}`,
            text: emailText,
            reply_to: created.clientEmail || void 0
          })
        });
        const responseBody = await emailResponse.text();
        if (!emailResponse.ok) {
          console.error("Resend email notification failed:", emailResponse.status, responseBody);
        } else {
          console.info(`Resend email notification sent for ${created.trackingCode}: ${responseBody}`);
        }
      }
    } catch (emailError) {
      console.error("Failed to send quote request notification email:", emailError);
    }
    const receipt = {
      id: created.id,
      // data-from: QuoteRequest-id
      trackingCode: created.trackingCode,
      // data-from: QuoteRequest-trackingCode
      createdAt: created.createdAt.toISOString(),
      estimatedBudgetEur: created.estimatedBudgetEur.toNumber(),
      // data-from: QuoteRequest-estimatedBudgetEur
      estimatedHours: created.estimatedHours,
      // data-from: QuoteRequest-estimatedHours
      baselineHourlyRate: hourlyRateNum,
      categoryTitle: category.titleEn,
      craftClassification: category.craftClassification,
      districtCode: district.districtCode,
      districtName: district.districtName,
      zone: district.zone,
      leadTimeHours: district.leadTimeHours,
      addressSummary: created.addressSnippet,
      taskTitle: created.taskTitle,
      // data-from: QuoteRequest-taskTitle
      clientName: created.clientName,
      // data-from: QuoteRequest-clientName
      clientEmail: created.clientEmail,
      // data-from: QuoteRequest-clientEmail
      preferredDate: created.preferredDate,
      // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: created.preferredTimeSlot,
      // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: created.hasMaterials,
      // data-from: QuoteRequest-hasMaterials
      isUrgent: created.isUrgent,
      // data-from: QuoteRequest-isUrgent
      submissionLang: created.submissionLang,
      // data-from: QuoteRequest-submissionLang
      status: created.status
      // data-from: QuoteRequest-status
    };
    return {
      receipt
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createQuoteRequest,
  getQuoteFormInitData
});
