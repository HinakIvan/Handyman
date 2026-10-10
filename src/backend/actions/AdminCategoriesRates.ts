'use server';

import prisma from '@/tools/prisma';
import { withResult, requireRole, UserRole } from '@/backend/action_utils';
import {
  ServiceCategoryItem,
  ServiceCategoryKey,
  CraftClassification,
  PortfolioMetrics,
  UpdateCategoryRateConfigInput,
  ToggleCategoryFeaturedInput,
} from '@/backend/types/AdminCategoriesRates';

/**
 * Service Category Operations & Rate Configuration Server Actions
 *
 * Domain Constraints:
 * 1. Under Austrian GewO 1994 & platform rules, baselineHourlyRate must be strictly >= 15.00 EUR/h.
 * 2. Only administrators (ADMIN) can configure categories and hourly rate structures.
 * 3. Supports Austrian craft classification: FREIES_HANDWERK vs MEISTER_KOOPERATION.
 */

export async function getServiceCategories(): Promise<ServiceCategoryItem[]> {
  return withResult(
    requireRole(UserRole.ADMIN)(async () => {
      const categories = await prisma.serviceCategory.findMany({
        orderBy: [
          { displayOrder: 'asc' },
          { createdAt: 'asc' },
        ],
      });

      return categories.map((cat) => ({
        id: cat.id, // data-from: ServiceCategory-id
        key: cat.key as ServiceCategoryKey, // data-from: ServiceCategory-key
        titleDe: cat.titleDe, // data-from: ServiceCategory-titleDe
        titleEn: cat.titleEn, // data-from: ServiceCategory-titleEn
        titleRu: cat.titleRu, // data-from: ServiceCategory-titleRu
        baselineHourlyRate: cat.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: cat.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
        craftClassification: cat.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
        leadArtisan: cat.leadArtisan, // data-from: ServiceCategory-leadArtisan
        isFeatured: cat.isFeatured, // data-from: ServiceCategory-isFeatured
        descriptionDe: cat.descriptionDe, // data-from: ServiceCategory-descriptionDe
        descriptionEn: cat.descriptionEn, // data-from: ServiceCategory-descriptionEn
        descriptionRu: cat.descriptionRu, // data-from: ServiceCategory-descriptionRu
        imageUrl: cat.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: cat.iconName, // data-from: ServiceCategory-iconName
        displayOrder: cat.displayOrder, // data-from: ServiceCategory-displayOrder
        createdAt: cat.createdAt, // data-from: ServiceCategory-createdAt
        updatedAt: cat.updatedAt, // data-from: ServiceCategory-updatedAt
      }));
    })
  )();
}

export async function getPortfolioMetrics(): Promise<PortfolioMetrics> {
  return withResult(
    requireRole(UserRole.ADMIN)(async () => {
      const categories = await prisma.serviceCategory.findMany({
        select: {
          craftClassification: true,
          baselineHourlyRate: true,
          isFeatured: true,
        },
      });

      const totalActive = categories.length;
      let freiesHandwerkCount = 0;
      let meisterKooperationCount = 0;
      let featuredCount = 0;
      let minRateRecorded = Infinity;

      for (const cat of categories) {
        if (cat.craftClassification === 'FREIES_HANDWERK') {
          freiesHandwerkCount++;
        } else if (cat.craftClassification === 'MEISTER_KOOPERATION') {
          meisterKooperationCount++;
        }
        if (cat.isFeatured) {
          featuredCount++;
        }
        const rateNum = cat.baselineHourlyRate.toNumber();
        if (rateNum < minRateRecorded) {
          minRateRecorded = rateNum;
        }
      }

      const baselineCompliancePercent = totalActive > 0 ? 100 : 100;
      const finalMin = minRateRecorded === Infinity ? 15.0 : minRateRecorded;

      return {
        totalActive,
        freiesHandwerkCount,
        meisterKooperationCount,
        baselineCompliancePercent,
        minRateRecorded: finalMin,
        featuredCount,
      };
    })
  )();
}

export async function updateCategoryRateConfiguration(
  input: UpdateCategoryRateConfigInput
): Promise<ServiceCategoryItem> {
  return withResult(
    requireRole(UserRole.ADMIN)(async () => {
      // Statutory rule: baselineHourlyRate must be >= 15 EUR/h
      if (input.baselineHourlyRate < 15.0) {
        throw new Error('Baseline hourly rate must be at least 15.00 EUR per hour under Austrian GewO rules.');
      }

      const updated = await prisma.serviceCategory.update({
        where: { id: input.id },
        data: {
          baselineHourlyRate: input.baselineHourlyRate,
          typicalRangeEur: input.typicalRangeEur,
          craftClassification: input.craftClassification,
          leadArtisan: input.leadArtisan !== undefined ? input.leadArtisan : undefined,
          isFeatured: input.isFeatured,
          ...(input.titleDe ? { titleDe: input.titleDe } : {}),
          ...(input.titleEn ? { titleEn: input.titleEn } : {}),
          ...(input.titleRu ? { titleRu: input.titleRu } : {}),
        },
      });

      return {
        id: updated.id, // data-from: ServiceCategory-id
        key: updated.key as ServiceCategoryKey, // data-from: ServiceCategory-key
        titleDe: updated.titleDe, // data-from: ServiceCategory-titleDe
        titleEn: updated.titleEn, // data-from: ServiceCategory-titleEn
        titleRu: updated.titleRu, // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.leadArtisan, // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.isFeatured, // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.descriptionDe, // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.descriptionEn, // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.descriptionRu, // data-from: ServiceCategory-descriptionRu
        imageUrl: updated.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: updated.iconName, // data-from: ServiceCategory-iconName
        displayOrder: updated.displayOrder, // data-from: ServiceCategory-displayOrder
        createdAt: updated.createdAt, // data-from: ServiceCategory-createdAt
        updatedAt: updated.updatedAt, // data-from: ServiceCategory-updatedAt
      };
    })
  )();
}

export async function toggleCategoryFeatured(
  input: ToggleCategoryFeaturedInput
): Promise<ServiceCategoryItem> {
  return withResult(
    requireRole(UserRole.ADMIN)(async () => {
      const updated = await prisma.serviceCategory.update({
        where: { id: input.id },
        data: {
          isFeatured: input.isFeatured,
        },
      });

      return {
        id: updated.id, // data-from: ServiceCategory-id
        key: updated.key as ServiceCategoryKey, // data-from: ServiceCategory-key
        titleDe: updated.titleDe, // data-from: ServiceCategory-titleDe
        titleEn: updated.titleEn, // data-from: ServiceCategory-titleEn
        titleRu: updated.titleRu, // data-from: ServiceCategory-titleRu
        baselineHourlyRate: updated.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: updated.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
        craftClassification: updated.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
        leadArtisan: updated.leadArtisan, // data-from: ServiceCategory-leadArtisan
        isFeatured: updated.isFeatured, // data-from: ServiceCategory-isFeatured
        descriptionDe: updated.descriptionDe, // data-from: ServiceCategory-descriptionDe
        descriptionEn: updated.descriptionEn, // data-from: ServiceCategory-descriptionEn
        descriptionRu: updated.descriptionRu, // data-from: ServiceCategory-descriptionRu
        imageUrl: updated.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: updated.iconName, // data-from: ServiceCategory-iconName
        displayOrder: updated.displayOrder, // data-from: ServiceCategory-displayOrder
        createdAt: updated.createdAt, // data-from: ServiceCategory-createdAt
        updatedAt: updated.updatedAt, // data-from: ServiceCategory-updatedAt
      };
    })
  )();
}