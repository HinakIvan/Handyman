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
export type UrbanZone = LogisticsZone;

export type PreferredTimeSlot = "MORNING" | "AFTERNOON" | "FLEXIBLE";
export type TimeSlot = PreferredTimeSlot;

export type SubmissionLanguage = "DE" | "EN" | "RU";
export type SubmissionLang = SubmissionLanguage;

export type QuoteStatus =
  | "NEW"
  | "CONTACTED"
  | "ESTIMATE_SENT"
  | "QUOTED"
  | "SCHEDULED"
  | "COMPLETED";
export type QuoteRequestStatus = QuoteStatus;

export interface ServiceCategoryItem {
  id: string; // data-from: ServiceCategory-id
  key: ServiceCategoryKey; // data-from: ServiceCategory-key
  titleDe: string; // data-from: ServiceCategory-titleDe
  titleEn: string; // data-from: ServiceCategory-titleEn
  titleRu: string; // data-from: ServiceCategory-titleRu
  baselineHourlyRate: number; // data-from: ServiceCategory-baselineHourlyRate
  typicalRangeEur: string; // data-from: ServiceCategory-typicalRangeEur
  craftClassification: CraftClassification; // data-from: ServiceCategory-craftClassification
  leadArtisan?: string | null; // data-from: ServiceCategory-leadArtisan
  descriptionDe?: string | null; // data-from: ServiceCategory-descriptionDe
  descriptionEn?: string | null; // data-from: ServiceCategory-descriptionEn
  descriptionRu?: string | null; // data-from: ServiceCategory-descriptionRu
  imageUrl?: string | null; // data-from: ServiceCategory-imageUrl data-role: image_url
  iconName?: string | null; // data-from: ServiceCategory-iconName
  displayOrder?: number | null; // data-from: ServiceCategory-displayOrder
  isFeatured?: boolean; // data-from: ServiceCategory-isFeatured
}

export interface ViennaDistrictItem {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
}

export interface AltbauCondition {
  masonryType: "BRICK_ALTBAU" | "REINFORCED_CONCRETE" | "MIXED_HISTORIC";
  ceilingHeight: "STANDARD_250" | "ALTBAU_HIGH_320" | "MONUMENTAL_380";
  surfaceQuality: "GOOD_PLASTER" | "POROUS_SANDY" | "DAMAGED_CRACKED";
}

export interface QuoteFormData {
  serviceCategoryId: string;
  districtId: string;
  street: string;
  buildingNumber: string;
  stair: string;
  door: string;
  taskTitle: string;
  taskDescription: string;
  altbauCondition: AltbauCondition;
  estimatedHours: number;
  hasMaterials: boolean;
  isUrgent: boolean;
  preferredDate: string;
  preferredTimeSlot: PreferredTimeSlot;
  submissionLang: SubmissionLanguage;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  agreedToTerms: boolean;
}

export interface SubmittedQuoteReceipt {
  id?: string; // data-from: QuoteRequest-id
  trackingCode: string; // data-from: QuoteRequest-trackingCode
  createdAt: string;
  estimatedBudgetEur: number; // data-from: QuoteRequest-estimatedBudgetEur
  estimatedHours: number; // data-from: QuoteRequest-estimatedHours
  baselineHourlyRate: number;
  categoryTitle: string;
  craftClassification: CraftClassification;
  districtCode: string;
  districtName: string;
  zone: LogisticsZone;
  leadTimeHours: number;
  addressSummary: string;
  taskTitle: string; // data-from: QuoteRequest-taskTitle
  clientName: string; // data-from: QuoteRequest-clientName
  clientEmail: string; // data-from: QuoteRequest-clientEmail
  preferredDate: string; // data-from: QuoteRequest-preferredDate
  preferredTimeSlot: PreferredTimeSlot; // data-from: QuoteRequest-preferredTimeSlot
  hasMaterials: boolean; // data-from: QuoteRequest-hasMaterials
  isUrgent: boolean; // data-from: QuoteRequest-isUrgent
  submissionLang: SubmissionLanguage; // data-from: QuoteRequest-submissionLang
  status: QuoteStatus; // data-from: QuoteRequest-status
}

export interface QuoteFormInitDataOutput {
  categories: ServiceCategoryItem[];
  districts: ViennaDistrictItem[];
  preselectedCategoryId: string;
  currentUser: {
    fullName: string;
    email: string;
    phone: string | null;
  } | null;
}

export interface CreateQuoteRequestInput {
  serviceCategoryId: string;
  districtId: string;
  addressSnippet: string;
  taskTitle: string;
  taskDescription: string;
  estimatedHours: number;
  preferredDate: string;
  preferredTimeSlot: PreferredTimeSlot;
  hasMaterials: boolean;
  agreedToTerms: boolean;
  submissionLang: SubmissionLanguage;
  isUrgent: boolean;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

export interface CreateQuoteRequestOutput {
  receipt: SubmittedQuoteReceipt;
}