'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/frontend/action_utils';
import { 
  PricingScopePageData, 
  ServiceCategoryItem, 
  FaqItemDTO, 
  DistrictTravelRateDTO, 
  TradeCategoryKey, 
  CraftClassification, 
  FaqCategory, 
  LogisticsZone 
} from '@/frontend/types/PricingScope';

/**
 * Server Action: getPricingScopeData
 * 
 * Fetches all service categories, master FAQ entries, and Vienna municipal district logistics
 * with Austrian GewO trade compliance classification.
 * 
 * Domain rules:
 * - Both Guest Visitors and Registered Customers have identical visibility to pricing and regulatory scopes.
 * - Baseline hourly rate for basic craftsmanship is anchored at min 15 EUR/hour.
 * - Minimum initial booking duration is standard 1.5h for basic trades, up to 2.5h for Meister cooperation.
 * - Travel flat fees are strictly calculated based on Vienna LogisticsZone (Inner: €19, Central: €24, Outer: €29).
 */
export async function getPricingScopeData(): Promise<PricingScopePageData> {
  return withResult(async (): Promise<PricingScopePageData> => {
    // 1. Fetch all active service categories ordered by displayOrder
    const dbCategories = await prisma.serviceCategory.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { titleEn: 'asc' }
      ]
    });

    // Map categories into ServiceCategoryItem
    const categories: ServiceCategoryItem[] = dbCategories.map((c) => {
      // Minimum duration according to trade classification
      const minHours = c.craftClassification === 'MEISTER_KOOPERATION' ? 2.5 : 1.5;

      return {
        id: c.id, // data-from: ServiceCategory-id
        key: c.key as TradeCategoryKey, // data-from: ServiceCategory-key
        titleDe: c.titleDe, // data-from: ServiceCategory-titleDe
        titleEn: c.titleEn, // data-from: ServiceCategory-titleEn
        titleRu: c.titleRu, // data-from: ServiceCategory-titleRu
        baselineHourlyRate: c.baselineHourlyRate ? c.baselineHourlyRate.toNumber() : 15, // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: c.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
        craftClassification: c.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
        leadArtisan: c.leadArtisan, // data-from: ServiceCategory-leadArtisan
        isFeatured: c.isFeatured, // data-from: ServiceCategory-isFeatured
        descriptionDe: c.descriptionDe, // data-from: ServiceCategory-descriptionDe
        descriptionEn: c.descriptionEn, // data-from: ServiceCategory-descriptionEn
        descriptionRu: c.descriptionRu, // data-from: ServiceCategory-descriptionRu
        imageUrl: c.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: c.iconName, // data-from: ServiceCategory-iconName
        displayOrder: c.displayOrder, // data-from: ServiceCategory-displayOrder
        minimumHours: minHours,
      };
    });

    // 2. Fetch master pre-seeded FAQ items
    const dbFaqs = await prisma.faqItem.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    const faqs: FaqItemDTO[] = dbFaqs.map((f) => {
      let snippet: string | undefined = undefined;
      if (f.category === 'PRICING') {
        snippet = 'GewO 1994 § 5 & Austrian Consumer Protection Act (KSchG).';
      } else if (f.category === 'SCOPE') {
        snippet = 'Gewerbeordnung 1994 (GewO) § 94 Reglementierte Gewerbe.';
      } else if (f.category === 'SCHEDULING') {
        snippet = 'Wiener Parkraumüberwachungsverordnung & Wiener Kurzparkzonen-Regelung.';
      } else if (f.category === 'MATERIALS') {
        snippet = 'Zero-markup pass-through transparent trade billing guarantee.';
      }

      return {
        id: f.id, // data-from: FaqItem-id
        category: f.category as FaqCategory, // data-from: FaqItem-category
        questionDe: f.questionDe, // data-from: FaqItem-questionDe
        questionEn: f.questionEn, // data-from: FaqItem-questionEn
        questionRu: f.questionRu, // data-from: FaqItem-questionRu
        answerDe: f.answerDe, // data-from: FaqItem-answerDe
        answerEn: f.answerEn, // data-from: FaqItem-answerEn
        answerRu: f.answerRu, // data-from: FaqItem-answerRu
        displayOrder: f.displayOrder, // data-from: FaqItem-displayOrder
        legalNoticeSnippet: snippet,
      };
    });

    // 3. Fetch Vienna districts (1010-1230)
    const dbDistricts = await prisma.viennaDistrict.findMany({
      orderBy: { districtNumber: 'asc' }
    });

    const districts: DistrictTravelRateDTO[] = dbDistricts.map((d) => {
      // Travel flat rate derived strictly by zone
      let flatRate = 19;
      if (d.zone === 'CENTRAL') {
        flatRate = 24;
      } else if (d.zone === 'OUTER_RING' || d.zone === 'GREATER_SUBURB') {
        flatRate = 29;
      }

      return {
        id: d.id, // data-from: ViennaDistrict-id
        districtCode: d.districtCode, // data-from: ViennaDistrict-districtCode
        districtName: d.districtName, // data-from: ViennaDistrict-districtName
        districtNumber: d.districtNumber, // data-from: ViennaDistrict-districtNumber
        zone: d.zone as LogisticsZone, // data-from: ViennaDistrict-zone
        leadTimeHours: d.leadTimeHours, // data-from: ViennaDistrict-leadTimeHours
        flatRateEur: flatRate,
      };
    });

    // 4. Calculate actual real-world stats
    const baselineStartingEur = categories.length > 0
      ? Math.min(...categories.map((c) => c.baselineHourlyRate))
      : 15;
    
    const freiesCount = categories.filter((c) => c.craftClassification === 'FREIES_HANDWERK').length;
    const meisterCount = categories.filter((c) => c.craftClassification === 'MEISTER_KOOPERATION').length;

    return {
      categories,
      faqs,
      districts,
      stats: {
        baselineStartingEur,
        totalTradesCount: categories.length,
        freiesCount,
        meisterCount,
      }
    };
  })();
}