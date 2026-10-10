export type LanguageCode = "en" | "de" | "ru";

export type CraftClassification = "FREIES_HANDWERK" | "MEISTER_KOOPERATION";

export type TradeCategoryKey =
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

export type FaqCategory = "PRICING" | "SCOPE" | "SCHEDULING" | "MATERIALS";

export type LogisticsZone = "INNER_CITY" | "CENTRAL" | "OUTER_RING" | "GREATER_SUBURB";

export interface ServiceCategoryItem {
  id: string; // data-from: ServiceCategory-id
  key: TradeCategoryKey; // data-from: ServiceCategory-key
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
  minimumHours: number;
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
  legalNoticeSnippet?: string;
}

// For compatibility with UI component prop naming
export type FaqItem = FaqItemDTO;

export interface DistrictTravelRateDTO {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
  flatRateEur: number;
}

export interface PricingScopeStats {
  baselineStartingEur: number;
  totalTradesCount: number;
  freiesCount: number;
  meisterCount: number;
}

export interface PricingScopePageData {
  categories: ServiceCategoryItem[];
  faqs: FaqItemDTO[];
  districts: DistrictTravelRateDTO[];
  stats: PricingScopeStats;
}