export type ServiceCategoryKey =
  | 'ASSEMBLY'
  | 'DEMOLITION'
  | 'FLOORING'
  | 'PAINTING'
  | 'DRYWALL'
  | 'PLUMBING_MINOR'
  | 'BATHROOM_KITCHEN'
  | 'DOORS_WINDOWS'
  | 'OUTDOOR'
  | 'MOVING'
  | 'COMMERCIAL';

export type CraftClassification = 'FREIES_HANDWERK' | 'MEISTER_KOOPERATION';

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
  descriptionDe: string | null; // data-from: ServiceCategory-descriptionDe
  descriptionEn: string | null; // data-from: ServiceCategory-descriptionEn
  descriptionRu: string | null; // data-from: ServiceCategory-descriptionRu
  imageUrl: string | null; // data-from: ServiceCategory-imageUrl data-role: image_url
  iconName: string | null; // data-from: ServiceCategory-iconName
  displayOrder: number | null; // data-from: ServiceCategory-displayOrder
  createdAt: Date; // data-from: ServiceCategory-createdAt
  updatedAt: Date; // data-from: ServiceCategory-updatedAt
}

export interface PortfolioMetrics {
  totalActive: number;
  freiesHandwerkCount: number;
  meisterKooperationCount: number;
  baselineCompliancePercent: number;
  minRateRecorded: number;
  featuredCount: number;
}

export interface UpdateCategoryRateConfigInput {
  id: string;
  baselineHourlyRate: number;
  typicalRangeEur: string;
  craftClassification: CraftClassification;
  leadArtisan?: string | null;
  isFeatured: boolean;
  titleDe?: string;
  titleEn?: string;
  titleRu?: string;
}

export interface ToggleCategoryFeaturedInput {
  id: string;
  isFeatured: boolean;
}

export type ClassificationFilter = 'ALL' | 'FREIES_HANDWERK' | 'MEISTER_KOOPERATION';
export type FeaturedFilter = 'ALL' | 'FEATURED_ONLY' | 'STANDARD_ONLY';
export type LanguageDisplay = 'ALL' | 'EN' | 'DE' | 'RU';
export type SortField = 'displayOrder' | 'baselineHourlyRate' | 'titleEn' | 'key';
export type SortDirection = 'asc' | 'desc';

export interface CategoryEditFormState {
  baselineHourlyRate: number;
  typicalRangeEur: string;
  craftClassification: CraftClassification;
  leadArtisan: string;
  isFeatured: boolean;
  titleDe: string;
  titleEn: string;
  titleRu: string;
}