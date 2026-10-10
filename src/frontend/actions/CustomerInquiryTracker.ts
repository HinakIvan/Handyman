'use server';

import prisma from '@/tools/prisma';
import { withResult, getAuthContext, UserRole, ForbiddenError } from '@/frontend/action_utils';
import { Prisma } from '../../../prisma-generated/client';
import type {
  GetCustomerInquiriesOutput,
  QuoteRequestData,
  InquiryMetrics,
  InquiryStatus,
  CraftClassification,
  LogisticsZone,
  PreferredTimeSlot,
  SubmissionLanguage
} from '@/frontend/types/CustomerInquiryTracker';

/**
 * Retrieves quote requests and fulfillment metrics for the authenticated customer.
 * - Filters strictly by customerId = auth.userId or clientEmail = auth.email.
 * Domain rules:
 * - Customers can inspect quote requests linked to their user account.
 * - Active review: status in (NEW, CONTACTED, ESTIMATE_SENT)
 * - In progress: status in (QUOTED, SCHEDULED)
 * - Completed: status in (COMPLETED)
 */
export async function getCustomerInquiries(): Promise<GetCustomerInquiriesOutput> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (auth.role !== UserRole.CUSTOMER) {
      throw new ForbiddenError();
    }

    const customerFilter: Prisma.QuoteRequestWhereInput = {
      OR: [
        { customerId: auth.userId },
        { clientEmail: auth.email },
      ],
    };

    const records = await prisma.quoteRequest.findMany({
      where: customerFilter,
      include: {
        serviceCategory: true,
        district: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const mappedInquiries: QuoteRequestData[] = records.map((record) => {
      return {
        id: record.id, // data-from: QuoteRequest-id
        trackingCode: record.trackingCode, // data-from: QuoteRequest-trackingCode
        customerId: record.customerId, // data-from: QuoteRequest-customerId
        clientName: record.clientName, // data-from: QuoteRequest-clientName
        clientPhone: record.clientPhone, // data-from: QuoteRequest-clientPhone
        clientEmail: record.clientEmail, // data-from: QuoteRequest-clientEmail
        serviceCategoryId: record.serviceCategoryId, // data-from: QuoteRequest-serviceCategoryId
        districtId: record.districtId, // data-from: QuoteRequest-districtId
        addressSnippet: record.addressSnippet, // data-from: QuoteRequest-addressSnippet
        taskTitle: record.taskTitle, // data-from: QuoteRequest-taskTitle
        taskDescription: record.taskDescription, // data-from: QuoteRequest-taskDescription
        estimatedHours: record.estimatedHours, // data-from: QuoteRequest-estimatedHours
        estimatedBudgetEur: record.estimatedBudgetEur ? record.estimatedBudgetEur.toNumber() : 0, // data-from: QuoteRequest-estimatedBudgetEur
        preferredDate: record.preferredDate, // data-from: QuoteRequest-preferredDate
        preferredTimeSlot: record.preferredTimeSlot as PreferredTimeSlot, // data-from: QuoteRequest-preferredTimeSlot
        hasMaterials: record.hasMaterials, // data-from: QuoteRequest-hasMaterials
        agreedToTerms: record.agreedToTerms, // data-from: QuoteRequest-agreedToTerms
        submissionLang: record.submissionLang as SubmissionLanguage, // data-from: QuoteRequest-submissionLang
        isUrgent: record.isUrgent, // data-from: QuoteRequest-isUrgent
        status: record.status as InquiryStatus, // data-from: QuoteRequest-status
        createdAtFormatted: record.createdAtFormatted, // data-from: QuoteRequest-createdAtFormatted
        scopeNotes: record.scopeNotes, // data-from: QuoteRequest-scopeNotes
        createdAt: record.createdAt, // data-from: QuoteRequest-createdAt
        updatedAt: record.updatedAt, // data-from: QuoteRequest-updatedAt
        serviceCategory: {
          id: record.serviceCategory.id, // data-from: ServiceCategory-id
          key: record.serviceCategory.key, // data-from: ServiceCategory-key
          titleDe: record.serviceCategory.titleDe, // data-from: ServiceCategory-titleDe
          titleEn: record.serviceCategory.titleEn, // data-from: ServiceCategory-titleEn
          titleRu: record.serviceCategory.titleRu, // data-from: ServiceCategory-titleRu
          baselineHourlyRate: record.serviceCategory.baselineHourlyRate ? record.serviceCategory.baselineHourlyRate.toNumber() : 0, // data-from: ServiceCategory-baselineHourlyRate
          typicalRangeEur: record.serviceCategory.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
          craftClassification: record.serviceCategory.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
          leadArtisan: record.serviceCategory.leadArtisan, // data-from: ServiceCategory-leadArtisan
          imageUrl: record.serviceCategory.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
        },
        district: {
          id: record.district.id, // data-from: ViennaDistrict-id
          districtCode: record.district.districtCode, // data-from: ViennaDistrict-districtCode
          districtName: record.district.districtName, // data-from: ViennaDistrict-districtName
          districtNumber: record.district.districtNumber, // data-from: ViennaDistrict-districtNumber
          zone: record.district.zone as LogisticsZone, // data-from: ViennaDistrict-zone
          leadTimeHours: record.district.leadTimeHours, // data-from: ViennaDistrict-leadTimeHours
        },
      };
    });

    // Compute live metrics
    let total = mappedInquiries.length;
    let review = 0;
    let progress = 0;
    let completed = 0;

    for (const item of mappedInquiries) {
      if (
        item.status === 'NEW' ||
        item.status === 'CONTACTED' ||
        item.status === 'ESTIMATE_SENT'
      ) {
        review++;
      } else if (item.status === 'QUOTED' || item.status === 'SCHEDULED') {
        progress++;
      } else if (item.status === 'COMPLETED') {
        completed++;
      }
    }

    const metrics: InquiryMetrics = {
      totalSubmitted: total,
      activeReview: review,
      inProgress: progress,
      completed,
    };

    return {
      inquiries: mappedInquiries,
      metrics,
    };
  })();
}