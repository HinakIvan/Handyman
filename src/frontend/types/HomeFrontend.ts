export type Language = "en" | "de" | "ru";

export type AccountUserRole = "CUSTOMER" | "ADMIN";

export type ServiceId =
  | "service-assembly"
  | "service-demolition"
  | "service-flooring"
  | "service-painting"
  | "service-drywall"
  | "service-plumbing-minor"
  | "service-bathroom-kitchen"
  | "service-doors-windows"
  | "service-outdoor"
  | "service-moving"
  | "service-commercial"
  | ServiceCategoryKey
  | string;

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

export type LogisticsZone = "INNER_CITY" | "CENTRAL" | "OUTER_RING" | "GREATER_SUBURB";

export type FaqCategory = "PRICING" | "SCOPE" | "SCHEDULING" | "MATERIALS";

export type PreferredTimeSlot = "MORNING" | "AFTERNOON" | "FLEXIBLE";

export type SubmissionLanguage = "DE" | "EN" | "RU";

export type QuoteStatus =
  | "NEW"
  | "CONTACTED"
  | "ESTIMATE_SENT"
  | "QUOTED"
  | "SCHEDULED"
  | "COMPLETED";

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
  imageUrl: string | null; // data-from: ServiceCategory-imageUrl data-role: image_url
  iconName: string | null; // data-from: ServiceCategory-iconName
  displayOrder: number | null; // data-from: ServiceCategory-displayOrder
}

export interface ViennaDistrictDTO {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
}

export interface FaqItemDTO {
  id: string; // data-from: FaqItem-id
  category: FaqCategory; // data-from: FaqItem-category
  questionDe: string; // data-from: FaqItem-questionDe
  questionEn: string; // data-from: FaqItem-questionEn
  questionRu: string; // data-from: FaqItem-questionRu
  answerDe: string; // data-from: FaqItem-answerDe
  answerEn: string; // data-from: FaqItem-answerEn
  answerRu: string; // data-from: FaqItem-answerRu
  displayOrder: number; // data-from: FaqItem-displayOrder
}

export interface HomeDataOutput {
  services: ServiceCategoryDTO[];
  districts: ViennaDistrictDTO[];
  faqs: FaqItemDTO[];
}

export interface CreateQuoteInput {
  serviceCategoryKey: ServiceCategoryKey;
  districtCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  addressSnippet: string;
  taskTitle: string;
  taskDescription: string;
  estimatedHours: number;
  preferredDate: string;
  preferredTimeSlot: PreferredTimeSlot;
  hasMaterials: boolean;
  isUrgent: boolean;
  agreedToTerms: boolean;
  submissionLang: SubmissionLanguage;
}

export interface CreateQuoteOutput {
  id: string; // data-from: QuoteRequest-id
  trackingCode: string; // data-from: QuoteRequest-trackingCode
  estimatedBudgetEur: number; // data-from: QuoteRequest-estimatedBudgetEur
  status: QuoteStatus; // data-from: QuoteRequest-status
  clientName: string; // data-from: QuoteRequest-clientName
  clientPhone: string; // data-from: QuoteRequest-clientPhone
  clientEmail: string; // data-from: QuoteRequest-clientEmail
  districtCode: string; // data-from: ViennaDistrict-districtCode
  serviceTitle: string; // data-from: ServiceCategory-titleEn
}