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

// src/backend/actions/AdminComplianceChecklist.ts
var AdminComplianceChecklist_exports = {};
__export(AdminComplianceChecklist_exports, {
  getComplianceChecklist: () => getComplianceChecklist,
  updateComplianceItem: () => updateComplianceItem
});
module.exports = __toCommonJS(AdminComplianceChecklist_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
function calculateStats(items) {
  const total = items.length;
  const completed = items.filter((i) => i.status === "COMPLETED").length;
  const inReview = items.filter((i) => i.status === "IN_REVIEW").length;
  const pending = items.filter((i) => i.status === "PENDING").length;
  const readinessScore = total > 0 ? Math.round(completed / total * 100) : 0;
  return {
    total,
    completed,
    inReview,
    pending,
    readinessScore
  };
}
async function getComplianceChecklist() {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireAuth)(
      (0, import_action_utils.requireRole)(import_action_utils.UserRole.ADMIN)(async () => {
        const records = await import_prisma.default.setupChecklistItem.findMany({
          orderBy: { createdAt: "asc" }
        });
        const items = records.map((r) => ({
          id: r.id,
          // data-from: SetupChecklistItem-id
          itemKey: r.itemKey,
          // data-from: SetupChecklistItem-itemKey
          title: r.title,
          // data-from: SetupChecklistItem-title
          subtitle: r.subtitle,
          // data-from: SetupChecklistItem-subtitle
          status: r.status,
          // data-from: SetupChecklistItem-status
          fieldValue: r.fieldValue,
          // data-from: SetupChecklistItem-fieldValue
          legalRef: r.legalRef,
          // data-from: SetupChecklistItem-legalRef
          lastUpdated: r.lastUpdated,
          // data-from: SetupChecklistItem-lastUpdated
          createdAt: r.createdAt,
          // data-from: SetupChecklistItem-createdAt
          updatedAt: r.updatedAt
          // data-from: SetupChecklistItem-updatedAt
        }));
        const stats = calculateStats(items);
        return {
          items,
          stats
        };
      })
    )
  )();
}
async function updateComplianceItem(input) {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireAuth)(
      (0, import_action_utils.requireRole)(import_action_utils.UserRole.ADMIN)(async () => {
        const now = /* @__PURE__ */ new Date();
        const formattedTimestamp = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)} CET`;
        const updatedRecord = await import_prisma.default.setupChecklistItem.update({
          where: { id: input.id },
          data: {
            fieldValue: input.fieldValue,
            status: input.status,
            lastUpdated: formattedTimestamp
          }
        });
        const allRecords = await import_prisma.default.setupChecklistItem.findMany({
          orderBy: { createdAt: "asc" }
        });
        const stats = calculateStats(allRecords.map((r) => ({ status: r.status })));
        const item = {
          id: updatedRecord.id,
          // data-from: SetupChecklistItem-id
          itemKey: updatedRecord.itemKey,
          // data-from: SetupChecklistItem-itemKey
          title: updatedRecord.title,
          // data-from: SetupChecklistItem-title
          subtitle: updatedRecord.subtitle,
          // data-from: SetupChecklistItem-subtitle
          status: updatedRecord.status,
          // data-from: SetupChecklistItem-status
          fieldValue: updatedRecord.fieldValue,
          // data-from: SetupChecklistItem-fieldValue
          legalRef: updatedRecord.legalRef,
          // data-from: SetupChecklistItem-legalRef
          lastUpdated: updatedRecord.lastUpdated,
          // data-from: SetupChecklistItem-lastUpdated
          createdAt: updatedRecord.createdAt,
          // data-from: SetupChecklistItem-createdAt
          updatedAt: updatedRecord.updatedAt
          // data-from: SetupChecklistItem-updatedAt
        };
        return {
          item,
          stats
        };
      })
    )
  )();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getComplianceChecklist,
  updateComplianceItem
});
