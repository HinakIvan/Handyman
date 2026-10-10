export type QuoteStatus =
  | "NEW"
  | "CONTACTED"
  | "ESTIMATE_SENT"
  | "QUOTED"
  | "SCHEDULED"
  | "COMPLETED";

export type SubmissionLanguage = "DE" | "EN" | "RU";

export type PreferredTimeSlot = "MORNING" | "AFTERNOON" | "FLEXIBLE";

export type CraftClassification = "FREIES_HANDWERK" | "MEISTER_KOOPERATION";

export type LogisticsZone =
  | "INNER_CITY"
  | "CENTRAL"
  | "OUTER_RING"
  | "GREATER_SUBURB";

export type ServiceCategoryKey =
  | "ASSEMBLY"
  | "DEMOLITION"
  | "FLOORING"
  | "PAINTING"
  | "DRYWALL"
  | "PLUMBING_MINOR"
  | "BATHROOM_KITCHEN"
  | "DOORS_WINDOWS"
  | "OUTDOOR"
  | "MOVING"
  | "COMMERCIAL";

export interface AccountUserDTO {
  id: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  role: "CUSTOMER" | "ADMIN"; // data-from: AccountUser-role
  fullName: string; // data-from: AccountUser-fullName
  phone: string | null; // data-from: AccountUser-phone
  createdAt: Date | string; // data-from: AccountUser-createdAt
}

export interface ServiceCategoryDTO {
  id: string; // data-from: ServiceCategory-id
  key: ServiceCategoryKey; // data-from: ServiceCategory-key
  titleDe: string; // data-from: ServiceCategory-titleDe
  titleEn: string; // data-from: ServiceCategory-titleEn
  titleRu: string; // data-from: ServiceCategory-titleRu
  baselineHourlyRate: number; // data-from: ServiceCategory-baselineHourlyRate
  typicalRangeEur: string; // data-from: ServiceCategory-typicalRangeEur
  craftClassification: CraftClassification; // data-from: ServiceCategory-craftClassification
  leadArtisan: string | null; // data-from: ServiceCategory-leadArtisan
  isFeatured: boolean; // data-from: ServiceCategory-isFeatured
  descriptionDe: string | null; // data-from: ServiceCategory-descriptionDe
  descriptionEn: string | null; // data-from: ServiceCategory-descriptionEn
  descriptionRu: string | null; // data-from: ServiceCategory-descriptionRu
}

export interface ViennaDistrictDTO {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
}

export interface ConsultationNote {
  id: string;
  adminName: string;
  timestamp: string;
  note: string;
  actionTaken: string;
}

export interface QuoteRequestDetailDTO {
  id: string; // data-from: QuoteRequest-id
  trackingCode: string; // data-from: QuoteRequest-trackingCode
  customerId: string | null; // data-from: QuoteRequest-customerId
  customer: AccountUserDTO | null;
  clientName: string; // data-from: QuoteRequest-clientName
  clientPhone: string; // data-from: QuoteRequest-clientPhone
  clientEmail: string; // data-from: QuoteRequest-clientEmail
  serviceCategoryId: string; // data-from: QuoteRequest-serviceCategoryId
  serviceCategory: ServiceCategoryDTO;
  districtId: string; // data-from: QuoteRequest-districtId
  district: ViennaDistrictDTO;
  addressSnippet: string; // data-from: QuoteRequest-addressSnippet
  taskTitle: string; // data-from: QuoteRequest-taskTitle
  taskDescription: string; // data-from: QuoteRequest-taskDescription
  estimatedHours: number; // data-from: QuoteRequest-estimatedHours
  estimatedBudgetEur: number; // data-from: QuoteRequest-estimatedBudgetEur
  preferredDate: string; // data-from: QuoteRequest-preferredDate
  preferredTimeSlot: PreferredTimeSlot; // data-from: QuoteRequest-preferredTimeSlot
  hasMaterials: boolean; // data-from: QuoteRequest-hasMaterials
  agreedToTerms: boolean; // data-from: QuoteRequest-agreedToTerms
  submissionLang: SubmissionLanguage; // data-from: QuoteRequest-submissionLang
  isUrgent: boolean; // data-from: QuoteRequest-isUrgent
  status: QuoteStatus; // data-from: QuoteRequest-status
  createdAtFormatted: string | null; // data-from: QuoteRequest-createdAtFormatted
  scopeNotes: string | null; // data-from: QuoteRequest-scopeNotes
  createdAt: Date | string; // data-from: QuoteRequest-createdAt
  updatedAt: Date | string; // data-from: QuoteRequest-updatedAt
  consultationHistory: ConsultationNote[];
}

export interface UpdateLaborAndBudgetInput {
  id: string;
  estimatedHours: number;
  estimatedBudgetEur: number;
  scopeNotes?: string | null;
}

export interface UpdateJobScopeInput {
  id: string;
  taskTitle?: string;
  taskDescription?: string;
  addressSnippet?: string;
  hasMaterials?: boolean;
}

export interface UpdateLifecycleInput {
  id: string;
  status?: QuoteStatus;
  isUrgent?: boolean;
  archivalNote?: string;
}

export interface AddConsultationLogInput {
  id: string;
  actionTaken: string;
  note: string;
  adminName?: string;
}

export type QuoteRequestDetail = QuoteRequestDetailDTO;
export type SubmissionLang = SubmissionLanguage;
