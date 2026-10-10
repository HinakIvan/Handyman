export type LogisticsZone = "INNER_CITY" | "CENTRAL" | "OUTER_RING" | "GREATER_SUBURB";
export type UrbanLogisticsZone = "ALL" | LogisticsZone;

export interface ViennaDistrictDto {
  id: string; // data-from: ViennaDistrict-id
  districtCode: string; // data-from: ViennaDistrict-districtCode
  districtName: string; // data-from: ViennaDistrict-districtName
  districtNumber: number; // data-from: ViennaDistrict-districtNumber
  zone: LogisticsZone; // data-from: ViennaDistrict-zone
  leadTimeHours: number; // data-from: ViennaDistrict-leadTimeHours
  createdAt: Date; // data-from: ViennaDistrict-createdAt
  updatedAt: Date; // data-from: ViennaDistrict-updatedAt
  boroughSubtitle: string;
  isHistoricAltbauCore: boolean;
  parkingCategory: string;
  coverageCoverageRate: string;
}

export type ViennaDistrictRecord = ViennaDistrictDto;

export interface ZoneSpecificationDto {
  zoneKey: LogisticsZone;
  zoneName: string;
  districtsLabel: string;
  guaranteedLeadTime: string;
  description: string;
  artisanTier: string;
  parkingRule: string;
  districtCount: number;
}

export type ZoneSpecification = ZoneSpecificationDto;

export interface LogisticsPolicyRuleDto {
  id: string;
  title: string;
  ruleCategory: string;
  badgeDe: string;
  summary: string;
  guidelines: string[];
}

export type LogisticsPolicyRule = LogisticsPolicyRuleDto;

export interface ServiceAreasPageData {
  districts: ViennaDistrictDto[];
  zones: ZoneSpecificationDto[];
  policies: LogisticsPolicyRuleDto[];
  totalDistrictsCount: number;
  minLeadTimeHours: number;
  maxLeadTimeHours: number;
}