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

// src/backend/actions/AdminLogin.ts
var AdminLogin_exports = {};
__export(AdminLogin_exports, {
  getAuditTelemetry: () => getAuditTelemetry,
  loginAdmin: () => loginAdmin
});
module.exports = __toCommonJS(AdminLogin_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function loginAdmin(input) {
  return (0, import_action_utils.withResult)(async () => {
    const emailNormalized = input.email.trim().toLowerCase();
    const user = await import_prisma.default.accountUser.findUnique({
      where: {
        email: emailNormalized
      }
    });
    if (!user) {
      throw new import_action_utils.UnauthorizedError("Invalid administrator credentials.");
    }
    if (user.role !== "ADMIN") {
      throw new import_action_utils.UnauthorizedError("Access restricted: Account lacks administrative privileges.");
    }
    const computedHash = (0, import_action_utils.hashPassword)(input.password);
    if (user.passwordHash !== computedHash) {
      throw new import_action_utils.UnauthorizedError("Invalid administrator credentials.");
    }
    const token = await (0, import_action_utils.signToken)(user.id, user.role, "7d");
    const output = {
      token,
      userId: user.id,
      // data-from: AccountUser-id
      email: user.email,
      // data-from: AccountUser-email
      fullName: user.fullName,
      // data-from: AccountUser-fullName
      role: "ADMIN"
      // data-from: AccountUser-role
    };
    return output;
  })();
}
async function getAuditTelemetry() {
  return (0, import_action_utils.withResult)(async () => {
    return {
      sessionNode: "vie-leits-cluster-01.handwerk.at",
      wkoRegistration: "FN 592810 w \xB7 WKO-AT",
      jurisdiction: "Wien Innere Stadt (1010 Wien)",
      dsgvoArticle: "DSGVO Art. 6 Abs. 1 lit. f",
      auditStatus: "ENFORCED",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAuditTelemetry,
  loginAdmin
});
