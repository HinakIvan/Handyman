/**
 * 枚举中心 — 从 prisma/schema.prisma 自动生成
 * 运行: npx tsx scripts/generate-schema-meta.ts
 * ⚠️ 请勿手动修改，schema 变更后重新生成
 */

export const AccountUserRole = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
} as const
export type AccountUserRoleType = typeof AccountUserRole[keyof typeof AccountUserRole]

export const ServiceCategoryKey = {
  ASSEMBLY: 'ASSEMBLY',
  DEMOLITION: 'DEMOLITION',
  FLOORING: 'FLOORING',
  PAINTING: 'PAINTING',
  DRYWALL: 'DRYWALL',
  PLUMBING_MINOR: 'PLUMBING_MINOR',
  BATHROOM_KITCHEN: 'BATHROOM_KITCHEN',
  DOORS_WINDOWS: 'DOORS_WINDOWS',
  OUTDOOR: 'OUTDOOR',
  MOVING: 'MOVING',
  COMMERCIAL: 'COMMERCIAL',
} as const
export type ServiceCategoryKeyType = typeof ServiceCategoryKey[keyof typeof ServiceCategoryKey]

export const CraftClassification = {
  FREIES_HANDWERK: 'FREIES_HANDWERK',
  MEISTER_KOOPERATION: 'MEISTER_KOOPERATION',
} as const
export type CraftClassificationType = typeof CraftClassification[keyof typeof CraftClassification]

export const LogisticsZone = {
  INNER_CITY: 'INNER_CITY',
  CENTRAL: 'CENTRAL',
  OUTER_RING: 'OUTER_RING',
  GREATER_SUBURB: 'GREATER_SUBURB',
} as const
export type LogisticsZoneType = typeof LogisticsZone[keyof typeof LogisticsZone]

export const ChecklistItemKey = {
  VAT_UID: 'VAT_UID',
  OFFICIAL_CONTACT: 'OFFICIAL_CONTACT',
  REGISTERED_ADDRESS: 'REGISTERED_ADDRESS',
  OPERATING_HOURS: 'OPERATING_HOURS',
} as const
export type ChecklistItemKeyType = typeof ChecklistItemKey[keyof typeof ChecklistItemKey]

export const ChecklistStatus = {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  COMPLETED: 'COMPLETED',
} as const
export type ChecklistStatusType = typeof ChecklistStatus[keyof typeof ChecklistStatus]

export const FaqCategory = {
  PRICING: 'PRICING',
  SCOPE: 'SCOPE',
  SCHEDULING: 'SCHEDULING',
  MATERIALS: 'MATERIALS',
} as const
export type FaqCategoryType = typeof FaqCategory[keyof typeof FaqCategory]

export const PreferredTimeSlot = {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  FLEXIBLE: 'FLEXIBLE',
} as const
export type PreferredTimeSlotType = typeof PreferredTimeSlot[keyof typeof PreferredTimeSlot]

export const SubmissionLanguage = {
  DE: 'DE',
  EN: 'EN',
  RU: 'RU',
} as const
export type SubmissionLanguageType = typeof SubmissionLanguage[keyof typeof SubmissionLanguage]

export const QuoteStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  ESTIMATE_SENT: 'ESTIMATE_SENT',
  QUOTED: 'QUOTED',
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
} as const
export type QuoteStatusType = typeof QuoteStatus[keyof typeof QuoteStatus]

/** 所有枚举名称列表 */
export const ALL_ENUMS = ['AccountUserRole', 'ServiceCategoryKey', 'CraftClassification', 'LogisticsZone', 'ChecklistItemKey', 'ChecklistStatus', 'FaqCategory', 'PreferredTimeSlot', 'SubmissionLanguage', 'QuoteStatus'] as const
