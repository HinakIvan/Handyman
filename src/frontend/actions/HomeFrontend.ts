'use server';

import prisma from '@/tools/prisma';
import { withResult, tryGetAuthContext } from '@/frontend/action_utils';
import type {
  HomeDataOutput,
  CreateQuoteInput,
  CreateQuoteOutput,
  ServiceCategoryDTO,
  ViennaDistrictDTO,
  FaqItemDTO,
  ServiceCategoryKey,
  CraftClassification,
  LogisticsZone,
  FaqCategory,
  QuoteStatus
} from '@/frontend/types/HomeFrontend';

/**
 * Get homepage catalog, coverage districts, and FAQ items
 */
export async function getHomeData(): Promise<HomeDataOutput> {
  return withResult(async () => {
    // 1. Fetch active service categories ordered by displayOrder or createdAt
    const dbServices = await prisma.serviceCategory.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    // 2. Fetch all Vienna postal districts
    const dbDistricts = await prisma.viennaDistrict.findMany({
      orderBy: { districtNumber: 'asc' },
    });

    // 3. Fetch pre-seeded FAQ items
    const dbFaqs = await prisma.faqItem.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    const services: ServiceCategoryDTO[] = dbServices.map((s) => ({
      id: s.id, // data-from: ServiceCategory-id
      key: s.key as ServiceCategoryKey, // data-from: ServiceCategory-key
      titleDe: s.titleDe, // data-from: ServiceCategory-titleDe
      titleEn: s.titleEn, // data-from: ServiceCategory-titleEn
      titleRu: s.titleRu, // data-from: ServiceCategory-titleRu
      baselineHourlyRate: s.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
      typicalRangeEur: s.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
      craftClassification: s.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
      leadArtisan: s.leadArtisan, // data-from: ServiceCategory-leadArtisan
      isFeatured: s.isFeatured, // data-from: ServiceCategory-isFeatured
      descriptionDe: s.descriptionDe, // data-from: ServiceCategory-descriptionDe
      descriptionEn: s.descriptionEn, // data-from: ServiceCategory-descriptionEn
      descriptionRu: s.descriptionRu, // data-from: ServiceCategory-descriptionRu
      imageUrl: s.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
      iconName: s.iconName, // data-from: ServiceCategory-iconName
      displayOrder: s.displayOrder, // data-from: ServiceCategory-displayOrder
    }));

    const districts: ViennaDistrictDTO[] = dbDistricts.map((d) => ({
      id: d.id, // data-from: ViennaDistrict-id
      districtCode: d.districtCode, // data-from: ViennaDistrict-districtCode
      districtName: d.districtName, // data-from: ViennaDistrict-districtName
      districtNumber: d.districtNumber, // data-from: ViennaDistrict-districtNumber
      zone: d.zone as LogisticsZone, // data-from: ViennaDistrict-zone
      leadTimeHours: d.leadTimeHours, // data-from: ViennaDistrict-leadTimeHours
    }));

    const faqs: FaqItemDTO[] = dbFaqs.map((f) => ({
      id: f.id, // data-from: FaqItem-id
      category: f.category as FaqCategory, // data-from: FaqItem-category
      questionDe: f.questionDe, // data-from: FaqItem-questionDe
      questionEn: f.questionEn, // data-from: FaqItem-questionEn
      questionRu: f.questionRu, // data-from: FaqItem-questionRu
      answerDe: f.answerDe, // data-from: FaqItem-answerDe
      answerEn: f.answerEn, // data-from: FaqItem-answerEn
      answerRu: f.answerRu, // data-from: FaqItem-answerRu
      displayOrder: f.displayOrder, // data-from: FaqItem-displayOrder
    }));

    return {
      services,
      districts,
      faqs,
    };
  })();
}

/**
 * Submit inquiry form creating a new quote_request record with status NEW
 */
export async function createQuoteRequest(input: CreateQuoteInput): Promise<CreateQuoteOutput> {
  return withResult(async () => {
    // 1. Resolve Service Category
    const service = await prisma.serviceCategory.findUnique({
      where: { key: input.serviceCategoryKey },
    });
    if (!service) {
      throw new Error(`Invalid service category: ${input.serviceCategoryKey}`);
    }

    // 2. Resolve Vienna District
    const district = await prisma.viennaDistrict.findUnique({
      where: { districtCode: input.districtCode },
    });
    if (!district) {
      throw new Error(`Invalid Vienna district code: ${input.districtCode}`);
    }

    // 3. Calculate estimated total budget
    // baseline hourly rate * estimated hours + 20 flat travel + optional 35 express fee
    const hourlyRate = service.baselineHourlyRate.toNumber();
    const travelFlat = 20.0;
    const expressSurcharge = input.isUrgent ? 35.0 : 0.0;
    const hours = Math.max(1, Math.min(8, input.estimatedHours || 3));
    const totalBudget = hourlyRate * hours + travelFlat + expressSurcharge;

    // 4. Generate unique tracking code e.g. VIE-2025-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `VIE-${input.districtCode}-${randomSuffix}`;

    // 5. Check if user is logged in
    const authContext = tryGetAuthContext();
    const customerId = authContext ? authContext.userId : null;

    const formattedDate = new Date().toISOString().split('T')[0];

    // 6. Create quote request
    const quote = await prisma.quoteRequest.create({
      data: {
        trackingCode,
        customerId,
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientEmail: input.clientEmail,
        serviceCategoryId: service.id,
        districtId: district.id,
        addressSnippet: input.addressSnippet || `${district.districtName}, Vienna`,
        taskTitle: input.taskTitle,
        taskDescription: input.taskDescription,
        estimatedHours: hours,
        estimatedBudgetEur: totalBudget,
        preferredDate: input.preferredDate,
        preferredTimeSlot: input.preferredTimeSlot,
        hasMaterials: input.hasMaterials,
        agreedToTerms: input.agreedToTerms,
        submissionLang: input.submissionLang,
        isUrgent: input.isUrgent,
        status: 'NEW',
        createdAtFormatted: formattedDate,
      },
      include: {
        serviceCategory: true,
        district: true,
      },
    });

    // Notify the site owner after the quote request has been saved.
    // Email failure must not prevent the customer from receiving a confirmation.
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const notificationEmail = process.env.CONTACT_EMAIL;
      const fromEmail = process.env.EMAIL_FROM || 'Handyman Website <onboarding@resend.dev>';

      if (!apiKey || !notificationEmail) {
        console.warn('Email notification skipped: RESEND_API_KEY or CONTACT_EMAIL is not configured.');
      } else {
        const emailText = [
          'A new Handyman quote request was submitted.',
          '',
          `Tracking code: ${quote.trackingCode}`,
          `Name: ${quote.clientName}`,
          `Phone: ${quote.clientPhone}`,
          `Email: ${quote.clientEmail || 'Not provided'}`,
          `Service: ${service.titleEn}`,
          `District: ${district.districtCode} - ${district.districtName}`,
          `Address: ${quote.addressSnippet || 'Not provided'}`,
          `Task: ${quote.taskTitle}`,
          `Description: ${quote.taskDescription || 'Not provided'}`,
          `Estimated hours: ${quote.estimatedHours}`,
          `Estimated budget: €${quote.estimatedBudgetEur.toNumber().toFixed(2)}`,
          `Preferred date: ${quote.preferredDate}`,
          `Preferred time: ${quote.preferredTimeSlot}`,
          `Urgent: ${quote.isUrgent ? 'Yes' : 'No'}`,
          `Materials provided: ${quote.hasMaterials ? 'Yes' : 'No'}`,
          `Submitted: ${quote.createdAtFormatted}`,
        ].join('\n');

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notificationEmail],
            subject: `New Handyman request: ${quote.trackingCode}`,
            text: emailText,
            reply_to: quote.clientEmail || undefined,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Resend email notification failed:', await emailResponse.text());
        } else {
          console.info(`Resend email notification sent for ${quote.trackingCode}.`);
        }
      }
    } catch (emailError) {
      console.error('Failed to send quote request notification email:', emailError);
    }

    return {
      id: quote.id, // data-from: QuoteRequest-id
      trackingCode: quote.trackingCode, // data-from: QuoteRequest-trackingCode
      estimatedBudgetEur: quote.estimatedBudgetEur.toNumber(), // data-from: QuoteRequest-estimatedBudgetEur
      status: quote.status as QuoteStatus, // data-from: QuoteRequest-status
      clientName: quote.clientName, // data-from: QuoteRequest-clientName
      clientPhone: quote.clientPhone, // data-from: QuoteRequest-clientPhone
      clientEmail: quote.clientEmail, // data-from: QuoteRequest-clientEmail
      districtCode: quote.district.districtCode, // data-from: ViennaDistrict-districtCode
      serviceTitle: quote.serviceCategory.titleEn, // data-from: ServiceCategory-titleEn
    };
  })();
}