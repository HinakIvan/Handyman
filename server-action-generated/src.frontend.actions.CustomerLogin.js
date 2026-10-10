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

// src/frontend/actions/CustomerLogin.ts
var CustomerLogin_exports = {};
__export(CustomerLogin_exports, {
  getCustomerPortalMeta: () => getCustomerPortalMeta,
  loginCustomer: () => loginCustomer
});
module.exports = __toCommonJS(CustomerLogin_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function loginCustomer(input) {
  return (0, import_action_utils.withResult)(async () => {
    const trimmedEmail = input.email.trim().toLowerCase();
    const user = await import_prisma.default.accountUser.findUnique({
      where: { email: trimmedEmail }
    });
    if (!user) {
      throw new import_action_utils.UnauthorizedError("Invalid email address or password.");
    }
    if (user.role !== "CUSTOMER") {
      throw new import_action_utils.UnauthorizedError("Access restricted. Only registered customer accounts may log in here.");
    }
    const inputHash = (0, import_action_utils.hashPassword)(input.password);
    if (inputHash !== user.passwordHash) {
      throw new import_action_utils.UnauthorizedError("Invalid email address or password.");
    }
    const token = await (0, import_action_utils.signToken)(user.id, user.role);
    return {
      token,
      userId: user.id,
      // data-from: AccountUser-id
      email: user.email,
      // data-from: AccountUser-email
      fullName: user.fullName,
      // data-from: AccountUser-fullName
      role: user.role
      // data-from: AccountUser-role
    };
  })();
}
async function getCustomerPortalMeta() {
  return (0, import_action_utils.withResult)(async () => {
    const districtCount = await import_prisma.default.viennaDistrict.count();
    const categories = await import_prisma.default.serviceCategory.findMany({
      select: { baselineHourlyRate: true }
    });
    let minRate = 15;
    if (categories.length > 0) {
      const rates = categories.map((c) => Number(c.baselineHourlyRate));
      minRate = Math.min(...rates);
    }
    return {
      totalDistricts: districtCount || 23,
      minHourlyRateEur: minRate,
      totalCategories: categories.length || 11
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomerPortalMeta,
  loginCustomer
});
