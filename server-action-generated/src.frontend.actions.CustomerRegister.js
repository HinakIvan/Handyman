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

// src/frontend/actions/CustomerRegister.ts
var CustomerRegister_exports = {};
__export(CustomerRegister_exports, {
  getRegistrationOverview: () => getRegistrationOverview,
  registerCustomer: () => registerCustomer
});
module.exports = __toCommonJS(CustomerRegister_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function registerCustomer(input) {
  return (0, import_action_utils.withResult)(async () => {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedFullName = input.fullName.trim();
    const trimmedPhone = input.phone?.trim() ? input.phone.trim() : null;
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      throw new Error("A valid email address is required for client account creation.");
    }
    if (!trimmedFullName || trimmedFullName.length < 2) {
      throw new Error("Full name or representative title must be at least 2 characters.");
    }
    if (!input.password || input.password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }
    const existingUser = await import_prisma.default.accountUser.findUnique({
      where: { email: trimmedEmail },
      select: { id: true }
    });
    if (existingUser) {
      throw new Error("This email address is already registered. Please sign in instead.");
    }
    const hashedPassword = (0, import_action_utils.hashPassword)(input.password);
    const newUser = await import_prisma.default.accountUser.create({
      data: {
        email: trimmedEmail,
        passwordHash: hashedPassword,
        fullName: trimmedFullName,
        phone: trimmedPhone,
        role: "CUSTOMER"
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        createdAt: true
      }
    });
    const token = await (0, import_action_utils.signToken)(newUser.id, newUser.role);
    return {
      token,
      userId: newUser.id,
      // data-from: AccountUser-id
      email: newUser.email,
      // data-from: AccountUser-email
      fullName: newUser.fullName,
      // data-from: AccountUser-fullName
      role: newUser.role,
      // data-from: AccountUser-role
      phone: newUser.phone,
      // data-from: AccountUser-phone
      createdAt: newUser.createdAt
      // data-from: AccountUser-createdAt
    };
  })();
}
async function getRegistrationOverview() {
  return (0, import_action_utils.withResult)(async () => {
    const [districtCount, featuredCategories] = await Promise.all([
      import_prisma.default.viennaDistrict.count(),
      import_prisma.default.serviceCategory.findMany({
        where: { isFeatured: true },
        take: 3,
        select: {
          id: true,
          key: true,
          titleEn: true,
          typicalRangeEur: true,
          baselineHourlyRate: true
        },
        orderBy: { displayOrder: "asc" }
      })
    ]);
    let minRate = 15;
    if (featuredCategories.length > 0) {
      const minDecimalRate = Math.min(
        ...featuredCategories.map((c) => c.baselineHourlyRate.toNumber())
      );
      if (!Number.isNaN(minDecimalRate) && minDecimalRate > 0) {
        minRate = minDecimalRate;
      }
    }
    return {
      districtCount: districtCount || 23,
      baselineHourlyRateEur: minRate,
      featuredCategories: featuredCategories.map((c) => ({
        id: c.id,
        // data-from: ServiceCategory-id
        key: c.key,
        // data-from: ServiceCategory-key
        titleEn: c.titleEn,
        // data-from: ServiceCategory-titleEn
        typicalRangeEur: c.typicalRangeEur
        // data-from: ServiceCategory-typicalRangeEur
      }))
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRegistrationOverview,
  registerCustomer
});
