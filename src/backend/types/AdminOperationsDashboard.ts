export type LanguageCode = "DE" | "EN" | "RU";

export type SubmissionLanguage = "DE" | "EN" | "RU";

export type QuoteStatus =
  | "NEW"
  | "CONTACTED"
  | "ESTIMATE_SENT"
  | "QUOTED"
  | "SCHEDULED"
  | "COMPLETED";

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

export type CraftClassification = "FREIES_HANDWERK" | "MEISTER_KOOPERATION";

export type PreferredTimeSlot = "MORNING" | "AFTERNOON" | "FLEXIBLE";

export type LogisticsZone = "INNER_CITY" | "CENTRAL" | "OUTER_RING" | "GREATER_SUBURB";

export type ChecklistItemKey =
  | "VAT_UID"
  | "OFFICIAL_CONTACT"
  | "REGISTERED_ADDRESS"
  | "OPERATING_HOURS";

export type ChecklistStatus = "PENDING" | "IN_REVIEW" | "COMPLETED";

export interface ServiceCategoryItem {
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
  activeLeadsCount: number;
  descriptionDe?: string | null; // data-from: ServiceCategory-descriptionDe
  descriptionEn?: string | null; // data-from: ServiceCategory-descriptionEn
  descriptionRu?: string | null; // data-from: ServiceCategory-descriptionRu
  imageUrl?: string | null; // data-from: ServiceCategory-imageUrl data-role: image_url
  iconName?: string | null; // data-from: ServiceCategory-iconName
  displayOrder?: number | null; // data-from: ServiceCategory-displayOrder
}

export interface ViennaDistrictItem {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
}

export interface SetupChecklistItemData {
  id: string; // data-from: SetupChecklistItem-id
  itemKey: ChecklistItemKey; // data-from: SetupChecklistItem-itemKey
  title: string; // data-from: SetupChecklistItem-title
  subtitle: string; // data-from: SetupChecklistItem-subtitle
  status: ChecklistStatus; // data-from: SetupChecklistItem-status
  fieldValue: string; // data-from: SetupChecklistItem-fieldValue
  legalRef: string; // data-from: SetupChecklistItem-legalRef
  lastUpdated: string; // data-from: SetupChecklistItem-lastUpdated
}

export interface QuoteRequestItem {
  id: string; // data-from: QuoteRequest-id
  trackingCode: string; // data-from: QuoteRequest-trackingCode
  customerId: string | null; // data-from: QuoteRequest-customerId
  clientName: string; // data-from: QuoteRequest-clientName
  clientPhone: string; // data-from: QuoteRequest-clientPhone
  clientEmail: string; // data-from: QuoteRequest-clientEmail
  serviceCategoryId: string; // data-from: QuoteRequest-serviceCategoryId
  serviceCategoryKey: ServiceCategoryKey; // data-from: ServiceCategory-key
  districtId: string; // data-from: QuoteRequest-districtId
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtZone: LogisticsZone; // data-from: ViennaDistrict-zone
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
  createdAt: Date; // data-from: QuoteRequest-createdAt
  updatedAt: Date; // data-from: QuoteRequest-updatedAt
}

export interface DashboardMetrics {
  totalInquiries: number;
  totalInquiriesTrend: string;
  pendingEstimates: number;
  pendingEstimatesUrgent: number;
  activeCategories: number;
  totalCategories: number;
  responseSlaMinutes: number;
  slaTargetMinutes: number;
  slaPercentMet: number;
}

export interface DashboardOverviewOutput {
  quoteRequests: QuoteRequestItem[];
  serviceCategories: ServiceCategoryItem[];
  setupChecklistItems: SetupChecklistItemData[];
  metrics: DashboardMetrics;
  lastSyncTime: string;
}

export interface UpdateQuoteStatusInput {
  id: string;
  status: QuoteStatus;
}

export interface UpdateQuoteStatusOutput {
  id: string; // data-from: QuoteRequest-id
  status: QuoteStatus; // data-from: QuoteRequest-status
  updatedAt: Date; // data-from: QuoteRequest-updatedAt
}

export interface UpdateCategoryRateInput {
  id: string;
  baselineHourlyRate: number;
  leadArtisan: string;
  typicalRangeEur?: string;
}

export interface UpdateCategoryRateOutput {
  id: string; // data-from: ServiceCategory-id
  baselineHourlyRate: number; // data-from: ServiceCategory-baselineHourlyRate
  leadArtisan: string | null; // data-from: ServiceCategory-leadArtisan
  typicalRangeEur: string; // data-from: ServiceCategory-typicalRangeEur
}

export interface UpdateChecklistItemInput {
  id: string;
  status: ChecklistStatus;
  fieldValue: string;
}

export interface UpdateChecklistItemOutput {
  id: string; // data-from: SetupChecklistItem-id
  status: ChecklistStatus; // data-from: SetupChecklistItem-status
  fieldValue: string; // data-from: SetupChecklistItem-fieldValue
  lastUpdated: string; // data-from: SetupChecklistItem-lastUpdated
}

export interface FilterState {
  status: QuoteStatus | "ALL";
  category: ServiceCategoryKey | "ALL";
  district: string | "ALL";
  searchQuery: string;
  timeRange: "TODAY" | "WEEK" | "MONTH";
  urgencyOnly: boolean;
}