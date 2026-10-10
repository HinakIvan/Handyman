export type CraftClassification = "FREIES_HANDWERK" | "MEISTER_KOOPERATION";

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

export type LogisticsZone =
  | "INNER_CITY"
  | "CENTRAL"
  | "OUTER_RING"
  | "GREATER_SUBURB";

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
  isFeatured: boolean; // data-from: ServiceCategory-isFeatured
  descriptionDe?: string | null; // data-from: ServiceCategory-descriptionDe
  descriptionEn?: string | null; // data-from: ServiceCategory-descriptionEn
  descriptionRu?: string | null; // data-from: ServiceCategory-descriptionRu
  imageUrl?: string | null; // data-from: ServiceCategory-imageUrl data-role: image_url
  iconName?: string | null; // data-from: ServiceCategory-iconName
  displayOrder?: number | null; // data-from: ServiceCategory-displayOrder
  permittedTasksUnderGewO?: string[];
  restrictedMeisterTasks?: string[];
  standardTools?: string[];
}

export interface ViennaDistrictCoverage {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
}

export interface ServicesCatalogDataOutput {
  categories: ServiceCategoryItem[];
  districts: ViennaDistrictCoverage[];
}

export type ClassificationFilter = "ALL" | CraftClassification;