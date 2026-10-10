'use server';

import prisma from '@/tools/prisma';
import { withResult, tryGetAuthContext } from '@/frontend/action_utils';
import {
  QuoteFormInitDataOutput,
  CreateQuoteRequestInput,
  CreateQuoteRequestOutput,
  ServiceCategoryItem,
  ViennaDistrictItem,
  SubmittedQuoteReceipt,
  CraftClassification,
  LogisticsZone,
  ServiceCategoryKey,
  PreferredTimeSlot,
  SubmissionLanguage,
  QuoteStatus,
} from '@/frontend/types/QuoteRequestForm';

/**
 * Retrieves master data for Quote Request Form:
 * - All service categories ordered by displayOrder/title
 * - All Vienna municipal districts (1010 to 1230)
 * - Resolves preselection matching categoryKey (if provided)
 * - Returns active authenticated user contact fields if logged in (for auto-filling)
 */
export async function getQuoteFormInitData(
  categoryKey?: string
): Promise<QuoteFormInitDataOutput> {
  return withResult(async () => {
    // 1. Fetch all Service Categories
    const categoriesDb = await prisma.serviceCategory.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { titleEn: 'asc' },
      ],
    });

    const categories: ServiceCategoryItem[] = categoriesDb.map((c) => ({
      id: c.id, // data-from: ServiceCategory-id
      key: c.key as ServiceCategoryKey, // data-from: ServiceCategory-key
      titleDe: c.titleDe, // data-from: ServiceCategory-titleDe
      titleEn: c.titleEn, // data-from: ServiceCategory-titleEn
      titleRu: c.titleRu, // data-from: ServiceCategory-titleRu
      baselineHourlyRate: c.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
      typicalRangeEur: c.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
      craftClassification: c.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
      leadArtisan: c.leadArtisan, // data-from: ServiceCategory-leadArtisan
      descriptionDe: c.descriptionDe, // data-from: ServiceCategory-descriptionDe
      descriptionEn: c.descriptionEn, // data-from: ServiceCategory-descriptionEn
      descriptionRu: c.descriptionRu, // data-from: ServiceCategory-descriptionRu
      imageUrl: c.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
      iconName: c.iconName, // data-from: ServiceCategory-iconName
      displayOrder: c.displayOrder, // data-from: ServiceCategory-displayOrder
      isFeatured: c.isFeatured, // data-from: ServiceCategory-isFeatured
    }));

    // 2. Fetch all Vienna Districts (1010 - 1230)
    const districtsDb = await prisma.viennaDistrict.findMany({
      orderBy: { districtNumber: 'asc' },
    });

    const districts: ViennaDistrictItem[] = districtsDb.map((d) => ({
      id: d.id, // data-from: ViennaDistrict-id
      districtCode: d.districtCode, // data-from: ViennaDistrict-districtCode
      districtName: d.districtName, // data-from: ViennaDistrict-districtName
      districtNumber: d.districtNumber, // data-from: ViennaDistrict-districtNumber
      zone: d.zone as LogisticsZone, // data-from: ViennaDistrict-zone
      leadTimeHours: d.leadTimeHours, // data-from: ViennaDistrict-leadTimeHours
    }));

    // 3. Resolve preselected category
    let preselectedCategoryId = categories.length > 0 ? categories[0].id : '';
    if (categoryKey) {
      const match = categories.find(
        (c) => c.key.toLowerCase() === categoryKey.toLowerCase()
      );
      if (match) {
        preselectedCategoryId = match.id;
      }
    }

    // 4. Resolve current session (if authenticated Customer)
    let currentUser: QuoteFormInitDataOutput['currentUser'] = null;
    const auth = tryGetAuthContext();
    if (auth && auth.userId) {
      const user = await prisma.accountUser.findUnique({
        where: { id: auth.userId },
        select: {
          fullName: true,
          email: true,
          phone: true,
        },
      });
      if (user) {
        currentUser = {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
        };
      }
    }

    return {
      categories,
      districts,
      preselectedCategoryId,
      currentUser,
    };
  })();
}

/**
 * Creates a new QuoteRequest record:
 * - Computes dynamic estimatedBudgetEur = estimatedHours * baselineHourlyRate
 * - Generates unique human-readable tracking_code (e.g. VIE-2025-XXXX)
 * - Links customerId if authenticated, or leaves unassigned if Guest Visitor
 * - Sets status = NEW in compliance with Austrian trade licensing regulations
 */
export async function createQuoteRequest(
  input: CreateQuoteRequestInput
): Promise<CreateQuoteRequestOutput> {
  return withResult(async () => {
    // 1. Validate ServiceCategory and fetch baseline rate
    const category = await prisma.serviceCategory.findUnique({
      where: { id: input.serviceCategoryId },
    });
    if (!category) {
      throw new Error(`Service category ${input.serviceCategoryId} not found.`);
    }

    // 2. Validate ViennaDistrict
    const district = await prisma.viennaDistrict.findUnique({
      where: { id: input.districtId },
    });
    if (!district) {
      throw new Error(`Vienna district ${input.districtId} not found.`);
    }

    // 3. Calculate estimated budget
    const hourlyRateNum = category.baselineHourlyRate.toNumber();
    const hours = Math.max(1, input.estimatedHours);
    const calculatedBudget = hourlyRateNum * hours;

    // 4. Generate unique tracking code e.g. VIE-2025-0841
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `VIE-${currentYear}-${randomSuffix}`;

    // 5. Check if authenticated customer
    const auth = tryGetAuthContext();
    const customerId = auth && auth.userId ? auth.userId : null;

    const now = new Date();
    const createdAtFormatted = now.toLocaleDateString('de-AT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 6. Persist to QuoteRequest table
    const created = await prisma.quoteRequest.create({
      data: {
        trackingCode,
        customerId,
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientEmail: input.clientEmail,
        serviceCategoryId: category.id,
        districtId: district.id,
        addressSnippet: input.addressSnippet,
        taskTitle: input.taskTitle,
        taskDescription: input.taskDescription,
        estimatedHours: hours,
        estimatedBudgetEur: calculatedBudget,
        preferredDate: input.preferredDate,
        preferredTimeSlot: input.preferredTimeSlot,
        hasMaterials: input.hasMaterials,
        agreedToTerms: input.agreedToTerms,
        submissionLang: input.submissionLang,
        isUrgent: input.isUrgent,
        status: 'NEW',
        createdAtFormatted,
      },
    });

    const receipt: SubmittedQuoteReceipt = {
      id: created.id, // data-from: QuoteRequest-id
      trackingCode: created.trackingCode, // data-from: QuoteRequest-trackingCode
      createdAt: created.createdAt.toISOString(),
      estimatedBudgetEur: created.estimatedBudgetEur.toNumber(), // data-from: QuoteRequest-estimatedBudgetEur
      estimatedHours: created.estimatedHours, // data-from: QuoteRequest-estimatedHours
      baselineHourlyRate: hourlyRateNum,
      categoryTitle: category.titleEn,
      craftClassification: category.craftClassification as CraftClassification,
      districtCode: district.districtCode,
      districtName: district.districtName,
      zone: district.zone as LogisticsZone,
      leadTimeHours: district.leadTimeHours,
      addressSummary: created.addressSnippet,
      taskTitle: created.taskTitle, // data-from: QuoteRequest-taskTitle
      clientName: created.clientName, // data-from: QuoteRequest-clientName
      clientEmail: created.clientEmail, // data-from: QuoteRequest-clientEmail
      preferredDate: created.preferredDate, // data-from: QuoteRequest-preferredDate
      preferredTimeSlot: created.preferredTimeSlot as PreferredTimeSlot, // data-from: QuoteRequest-preferredTimeSlot
      hasMaterials: created.hasMaterials, // data-from: QuoteRequest-hasMaterials
      isUrgent: created.isUrgent, // data-from: QuoteRequest-isUrgent
      submissionLang: created.submissionLang as SubmissionLanguage, // data-from: QuoteRequest-submissionLang
      status: created.status as QuoteStatus, // data-from: QuoteRequest-status
    };

    return {
      receipt,
    };
  })();
}