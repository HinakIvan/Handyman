export type AccountUserRole = 'CUSTOMER' | 'ADMIN';

export type ServiceCategoryKey = 'ASSEMBLY' | 'DEMOLITION' | 'FLOORING' | 'PAINTING' | 'DRYWALL' | 'PLUMBING_MINOR' | 'BATHROOM_KITCHEN' | 'DOORS_WINDOWS' | 'OUTDOOR' | 'MOVING' | 'COMMERCIAL';

export type CraftClassification = 'FREIES_HANDWERK' | 'MEISTER_KOOPERATION';

export type LogisticsZone = 'INNER_CITY' | 'CENTRAL' | 'OUTER_RING' | 'GREATER_SUBURB';

export type ChecklistItemKey = 'VAT_UID' | 'OFFICIAL_CONTACT' | 'REGISTERED_ADDRESS' | 'OPERATING_HOURS';

export type ChecklistStatus = 'PENDING' | 'IN_REVIEW' | 'COMPLETED';

export type FaqCategory = 'PRICING' | 'SCOPE' | 'SCHEDULING' | 'MATERIALS';

export type PreferredTimeSlot = 'MORNING' | 'AFTERNOON' | 'FLEXIBLE';

export type SubmissionLanguage = 'DE' | 'EN' | 'RU';

export type QuoteStatus = 'NEW' | 'CONTACTED' | 'ESTIMATE_SENT' | 'QUOTED' | 'SCHEDULED' | 'COMPLETED';

export type AccountUser_uniqueKey = {
  id: string; // Unique Key
};

export type AccountUser_without_PKs = {
  email: string;
  passwordHash: string;
  role: AccountUserRole;
  fullName: string;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountUser = AccountUser_uniqueKey & AccountUser_without_PKs;



export type ServiceCategory_uniqueKey = {
  id: string; // Unique Key
};

export type ServiceCategory_without_PKs = {
  key: ServiceCategoryKey;
  titleDe: string;
  titleEn: string;
  titleRu: string;
  baselineHourlyRate: number;
  typicalRangeEur: string;
  craftClassification: CraftClassification;
  leadArtisan?: string | null;
  isFeatured: boolean;
  descriptionDe?: string | null;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  imageUrl?: string | null;
  iconName?: string | null;
  displayOrder?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceCategory = ServiceCategory_uniqueKey & ServiceCategory_without_PKs;



export type ViennaDistrict_uniqueKey = {
  id: string; // Unique Key
};

export type ViennaDistrict_without_PKs = {
  districtCode: string;
  districtName: string;
  districtNumber: number;
  zone: LogisticsZone;
  leadTimeHours: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ViennaDistrict = ViennaDistrict_uniqueKey & ViennaDistrict_without_PKs;



export type SetupChecklistItem_uniqueKey = {
  id: string; // Unique Key
};

export type SetupChecklistItem_without_PKs = {
  itemKey: ChecklistItemKey;
  title: string;
  subtitle: string;
  status: ChecklistStatus;
  fieldValue: string;
  legalRef: string;
  lastUpdated: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SetupChecklistItem = SetupChecklistItem_uniqueKey & SetupChecklistItem_without_PKs;



export type FaqItem_uniqueKey = {
  id: string; // Unique Key
};

export type FaqItem_without_PKs = {
  category: FaqCategory;
  questionDe: string;
  questionEn: string;
  questionRu: string;
  answerDe: string;
  answerEn: string;
  answerRu: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FaqItem = FaqItem_uniqueKey & FaqItem_without_PKs;



export type QuoteRequest_uniqueKey = {
  id: string; // Unique Key
};

export type QuoteRequest_without_PKs = {
  trackingCode: string;
  customerId?: string | null; //FK → AccountUser.id
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceCategoryId: string; //FK → ServiceCategory.id
  districtId: string; //FK → ViennaDistrict.id
  addressSnippet: string;
  taskTitle: string;
  taskDescription: string;
  estimatedHours: number;
  estimatedBudgetEur: number;
  preferredDate: string;
  preferredTimeSlot: PreferredTimeSlot;
  hasMaterials: boolean;
  agreedToTerms: boolean;
  submissionLang: SubmissionLanguage;
  isUrgent: boolean;
  status: QuoteStatus;
  createdAtFormatted?: string | null;
  scopeNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type QuoteRequest = QuoteRequest_uniqueKey & QuoteRequest_without_PKs;




export type StringFilter = {
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  equals?: string;
  in?: string[];
  notIn?: string[];
  not?: string | StringFilter;
};

export type NumberFilter = {
  equals?: number;
  in?: number[];
  notIn?: number[];
  not?: number | NumberFilter;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type DateFilter = {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  not?: Date | DateFilter;
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
};

export type AccountUserRoleFilter = {
  equals?: AccountUserRole;
  in?: AccountUserRole[];
  notIn?: AccountUserRole[];
  not?: AccountUserRole | AccountUserRoleFilter;
};

export type ServiceCategoryKeyFilter = {
  equals?: ServiceCategoryKey;
  in?: ServiceCategoryKey[];
  notIn?: ServiceCategoryKey[];
  not?: ServiceCategoryKey | ServiceCategoryKeyFilter;
};

export type CraftClassificationFilter = {
  equals?: CraftClassification;
  in?: CraftClassification[];
  notIn?: CraftClassification[];
  not?: CraftClassification | CraftClassificationFilter;
};

export type LogisticsZoneFilter = {
  equals?: LogisticsZone;
  in?: LogisticsZone[];
  notIn?: LogisticsZone[];
  not?: LogisticsZone | LogisticsZoneFilter;
};

export type ChecklistItemKeyFilter = {
  equals?: ChecklistItemKey;
  in?: ChecklistItemKey[];
  notIn?: ChecklistItemKey[];
  not?: ChecklistItemKey | ChecklistItemKeyFilter;
};

export type ChecklistStatusFilter = {
  equals?: ChecklistStatus;
  in?: ChecklistStatus[];
  notIn?: ChecklistStatus[];
  not?: ChecklistStatus | ChecklistStatusFilter;
};

export type FaqCategoryFilter = {
  equals?: FaqCategory;
  in?: FaqCategory[];
  notIn?: FaqCategory[];
  not?: FaqCategory | FaqCategoryFilter;
};

export type PreferredTimeSlotFilter = {
  equals?: PreferredTimeSlot;
  in?: PreferredTimeSlot[];
  notIn?: PreferredTimeSlot[];
  not?: PreferredTimeSlot | PreferredTimeSlotFilter;
};

export type SubmissionLanguageFilter = {
  equals?: SubmissionLanguage;
  in?: SubmissionLanguage[];
  notIn?: SubmissionLanguage[];
  not?: SubmissionLanguage | SubmissionLanguageFilter;
};

export type QuoteStatusFilter = {
  equals?: QuoteStatus;
  in?: QuoteStatus[];
  notIn?: QuoteStatus[];
  not?: QuoteStatus | QuoteStatusFilter;
};

export type filtered_AccountUser = {
  id?: string | StringFilter | null;
  email?: string | StringFilter | null;
  passwordHash?: string | StringFilter | null;
  role?: AccountUserRole | AccountUserRoleFilter | null;
  fullName?: string | StringFilter | null;
  phone?: string | StringFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_ServiceCategory = {
  id?: string | StringFilter | null;
  key?: ServiceCategoryKey | ServiceCategoryKeyFilter | null;
  titleDe?: string | StringFilter | null;
  titleEn?: string | StringFilter | null;
  titleRu?: string | StringFilter | null;
  baselineHourlyRate?: number | NumberFilter | null;
  typicalRangeEur?: string | StringFilter | null;
  craftClassification?: CraftClassification | CraftClassificationFilter | null;
  leadArtisan?: string | StringFilter | null;
  isFeatured?: boolean | null;
  descriptionDe?: string | StringFilter | null;
  descriptionEn?: string | StringFilter | null;
  descriptionRu?: string | StringFilter | null;
  imageUrl?: string | StringFilter | null;
  iconName?: string | StringFilter | null;
  displayOrder?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_ViennaDistrict = {
  id?: string | StringFilter | null;
  districtCode?: string | StringFilter | null;
  districtName?: string | StringFilter | null;
  districtNumber?: number | NumberFilter | null;
  zone?: LogisticsZone | LogisticsZoneFilter | null;
  leadTimeHours?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_SetupChecklistItem = {
  id?: string | StringFilter | null;
  itemKey?: ChecklistItemKey | ChecklistItemKeyFilter | null;
  title?: string | StringFilter | null;
  subtitle?: string | StringFilter | null;
  status?: ChecklistStatus | ChecklistStatusFilter | null;
  fieldValue?: string | StringFilter | null;
  legalRef?: string | StringFilter | null;
  lastUpdated?: string | StringFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_FaqItem = {
  id?: string | StringFilter | null;
  category?: FaqCategory | FaqCategoryFilter | null;
  questionDe?: string | StringFilter | null;
  questionEn?: string | StringFilter | null;
  questionRu?: string | StringFilter | null;
  answerDe?: string | StringFilter | null;
  answerEn?: string | StringFilter | null;
  answerRu?: string | StringFilter | null;
  displayOrder?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_QuoteRequest = {
  id?: string | StringFilter | null;
  trackingCode?: string | StringFilter | null;
  customerId?: string | StringFilter | null; //FK → AccountUser.id
  clientName?: string | StringFilter | null;
  clientPhone?: string | StringFilter | null;
  clientEmail?: string | StringFilter | null;
  serviceCategoryId?: string | StringFilter | null; //FK → ServiceCategory.id
  districtId?: string | StringFilter | null; //FK → ViennaDistrict.id
  addressSnippet?: string | StringFilter | null;
  taskTitle?: string | StringFilter | null;
  taskDescription?: string | StringFilter | null;
  estimatedHours?: number | NumberFilter | null;
  estimatedBudgetEur?: number | NumberFilter | null;
  preferredDate?: string | StringFilter | null;
  preferredTimeSlot?: PreferredTimeSlot | PreferredTimeSlotFilter | null;
  hasMaterials?: boolean | null;
  agreedToTerms?: boolean | null;
  submissionLang?: SubmissionLanguage | SubmissionLanguageFilter | null;
  isUrgent?: boolean | null;
  status?: QuoteStatus | QuoteStatusFilter | null;
  createdAtFormatted?: string | StringFilter | null;
  scopeNotes?: string | StringFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type Entities = {
  accountuser: {
    Create(data: AccountUser): Promise<AccountUser | null>;
    Get(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
    GetAll(args?: filtered_AccountUser): Promise<AccountUser[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_AccountUser): Promise<AccountUser[]>;
    Count(args?: filtered_AccountUser): Promise<number>;
    Update(args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null>;
    Delete(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
  };
  servicecategory: {
    Create(data: ServiceCategory): Promise<ServiceCategory | null>;
    Get(args: ServiceCategory_uniqueKey): Promise<ServiceCategory | null>;
    GetAll(args?: filtered_ServiceCategory): Promise<ServiceCategory[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_ServiceCategory): Promise<ServiceCategory[]>;
    Count(args?: filtered_ServiceCategory): Promise<number>;
    Update(args: { where: ServiceCategory_uniqueKey; data: ServiceCategory_without_PKs }): Promise<ServiceCategory | null>;
    Delete(args: ServiceCategory_uniqueKey): Promise<ServiceCategory | null>;
  };
  viennadistrict: {
    Create(data: ViennaDistrict): Promise<ViennaDistrict | null>;
    Get(args: ViennaDistrict_uniqueKey): Promise<ViennaDistrict | null>;
    GetAll(args?: filtered_ViennaDistrict): Promise<ViennaDistrict[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_ViennaDistrict): Promise<ViennaDistrict[]>;
    Count(args?: filtered_ViennaDistrict): Promise<number>;
    Update(args: { where: ViennaDistrict_uniqueKey; data: ViennaDistrict_without_PKs }): Promise<ViennaDistrict | null>;
    Delete(args: ViennaDistrict_uniqueKey): Promise<ViennaDistrict | null>;
  };
  setupchecklistitem: {
    Create(data: SetupChecklistItem): Promise<SetupChecklistItem | null>;
    Get(args: SetupChecklistItem_uniqueKey): Promise<SetupChecklistItem | null>;
    GetAll(args?: filtered_SetupChecklistItem): Promise<SetupChecklistItem[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_SetupChecklistItem): Promise<SetupChecklistItem[]>;
    Count(args?: filtered_SetupChecklistItem): Promise<number>;
    Update(args: { where: SetupChecklistItem_uniqueKey; data: SetupChecklistItem_without_PKs }): Promise<SetupChecklistItem | null>;
    Delete(args: SetupChecklistItem_uniqueKey): Promise<SetupChecklistItem | null>;
  };
  faqitem: {
    Create(data: FaqItem): Promise<FaqItem | null>;
    Get(args: FaqItem_uniqueKey): Promise<FaqItem | null>;
    GetAll(args?: filtered_FaqItem): Promise<FaqItem[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_FaqItem): Promise<FaqItem[]>;
    Count(args?: filtered_FaqItem): Promise<number>;
    Update(args: { where: FaqItem_uniqueKey; data: FaqItem_without_PKs }): Promise<FaqItem | null>;
    Delete(args: FaqItem_uniqueKey): Promise<FaqItem | null>;
  };
  quoterequest: {
    Create(data: QuoteRequest): Promise<QuoteRequest | null>;
    Get(args: QuoteRequest_uniqueKey): Promise<QuoteRequest | null>;
    GetAll(args?: filtered_QuoteRequest): Promise<QuoteRequest[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_QuoteRequest): Promise<QuoteRequest[]>;
    Count(args?: filtered_QuoteRequest): Promise<number>;
    Update(args: { where: QuoteRequest_uniqueKey; data: QuoteRequest_without_PKs }): Promise<QuoteRequest | null>;
    Delete(args: QuoteRequest_uniqueKey): Promise<QuoteRequest | null>;
  };
};

