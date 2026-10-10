export type InquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "ESTIMATE_SENT"
  | "QUOTED"
  | "SCHEDULED"
  | "COMPLETED";

export type CraftClassification = "FREIES_HANDWERK" | "MEISTER_KOOPERATION";

export type PreferredTimeSlot = "MORNING" | "AFTERNOON" | "FLEXIBLE";

export type SubmissionLanguage = "DE" | "EN" | "RU";
export type SubmissionLang = SubmissionLanguage;

export type LogisticsZone =
  | "INNER_CITY"
  | "CENTRAL"
  | "OUTER_RING"
  | "GREATER_SUBURB";
export type ViennaDistrictZone = LogisticsZone;

export interface ViennaDistrictData {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
}
export type ViennaDistrict = ViennaDistrictData;

export interface ServiceCategoryData {
  id: string; // data-from: ServiceCategory-id
  key: string; // data-from: ServiceCategory-key
  titleDe: string; // data-from: ServiceCategory-titleDe
  titleEn: string; // data-from: ServiceCategory-titleEn
  titleRu: string; // data-from: ServiceCategory-titleRu
  baselineHourlyRate: number; // data-from: ServiceCategory-baselineHourlyRate
  typicalRangeEur: string; // data-from: ServiceCategory-typicalRangeEur
  craftClassification: CraftClassification; // data-from: ServiceCategory-craftClassification
  leadArtisan: string | null; // data-from: ServiceCategory-leadArtisan
  imageUrl: string | null; // data-from: ServiceCategory-imageUrl data-role: image_url
}
export type ServiceCategory = ServiceCategoryData;

export interface QuoteRequestData {
  id: string; // data-from: QuoteRequest-id
  trackingCode: string; // data-from: QuoteRequest-trackingCode
  customerId: string | null; // data-from: QuoteRequest-customerId
  clientName: string; // data-from: QuoteRequest-clientName
  clientPhone: string; // data-from: QuoteRequest-clientPhone
  clientEmail: string; // data-from: QuoteRequest-clientEmail
  serviceCategoryId: string; // data-from: QuoteRequest-serviceCategoryId
  districtId: string; // data-from: QuoteRequest-districtId
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
  status: InquiryStatus; // data-from: QuoteRequest-status
  createdAtFormatted: string | null; // data-from: QuoteRequest-createdAtFormatted
  scopeNotes: string | null; // data-from: QuoteRequest-scopeNotes
  createdAt: Date; // data-from: QuoteRequest-createdAt
  updatedAt: Date; // data-from: QuoteRequest-updatedAt
  serviceCategory: ServiceCategoryData;
  district: ViennaDistrictData;
}
export type QuoteRequest = QuoteRequestData;

export interface InquiryMetrics {
  totalSubmitted: number;
  activeReview: number;
  inProgress: number;
  completed: number;
}

export interface GetCustomerInquiriesOutput {
  inquiries: QuoteRequestData[];
  metrics: InquiryMetrics;
}

export type SortOption = "date-desc" | "date-asc" | "budget-desc" | "urgency";

export interface FilterState {
  searchQuery: string;
  statusTab: "ALL" | InquiryStatus;
  sortBy: SortOption;
  isUrgentOnly: boolean;
}