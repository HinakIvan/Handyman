'use server';

import prisma from '@/tools/prisma';
import {
  hashPassword,
  signToken,
  withResult,
} from '@/frontend/action_utils';
import type { RegisterCustomerInput, RegisterCustomerOutput, RegistrationOverviewOutput } from '@/frontend/types/CustomerRegister';

/**
 * Register a new customer client account in Vienna Handwerk portal.
 * Business rules:
 * - Email must be unique across all registered accounts.
 * - Role is exclusively and automatically assigned as CUSTOMER (never accepts client role override).
 * - Password credential is securely hashed before storage.
 * - Creates account_user record with email, password_hash, fullName, and optional phone.
 * - Signs a valid session token tied to the user's primary ID and returns authenticated payload.
 */
export async function registerCustomer(
  input: RegisterCustomerInput
): Promise<RegisterCustomerOutput> {
  return withResult(async () => {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedFullName = input.fullName.trim();
    const trimmedPhone = input.phone?.trim() ? input.phone.trim() : null;

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      throw new Error('A valid email address is required for client account creation.');
    }

    if (!trimmedFullName || trimmedFullName.length < 2) {
      throw new Error('Full name or representative title must be at least 2 characters.');
    }

    if (!input.password || input.password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    // Check email uniqueness rule across AccountUser
    const existingUser = await prisma.accountUser.findUnique({
      where: { email: trimmedEmail },
      select: { id: true },
    });

    if (existingUser) {
      throw new Error('This email address is already registered. Please sign in instead.');
    }

    // Hash password with platform utility
    const hashedPassword = hashPassword(input.password);

    // Create AccountUser with guaranteed CUSTOMER role
    const newUser = await prisma.accountUser.create({
      data: {
        email: trimmedEmail,
        passwordHash: hashedPassword,
        fullName: trimmedFullName,
        phone: trimmedPhone,
        role: 'CUSTOMER',
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        createdAt: true,
      },
    });

    // Sign session token using the actual persisted user ID and role
    const token = await signToken(newUser.id, newUser.role);

    return {
      token,
      userId: newUser.id, // data-from: AccountUser-id
      email: newUser.email, // data-from: AccountUser-email
      fullName: newUser.fullName, // data-from: AccountUser-fullName
      role: newUser.role as 'CUSTOMER' | 'ADMIN', // data-from: AccountUser-role
      phone: newUser.phone, // data-from: AccountUser-phone
      createdAt: newUser.createdAt, // data-from: AccountUser-createdAt
    };
  })();
}

/**
 * Fetch overview master data to power real-time trust metrics in registration dossier.
 * Queries Vienna district count and featured service category pricing baselines.
 */
export async function getRegistrationOverview(): Promise<RegistrationOverviewOutput> {
  return withResult(async () => {
    const [districtCount, featuredCategories] = await Promise.all([
      prisma.viennaDistrict.count(),
      prisma.serviceCategory.findMany({
        where: { isFeatured: true },
        take: 3,
        select: {
          id: true,
          key: true,
          titleEn: true,
          typicalRangeEur: true,
          baselineHourlyRate: true,
        },
        orderBy: { displayOrder: 'asc' },
      }),
    ]);

    // Minimum baseline rate calculation from categories, defaulting to 15 per Austrian trade rule
    let minRate = 15;
    if (featuredCategories.length > 0) {
      const minDecimalRate = Math.min(
        ...featuredCategories.map((c) => c.baselineHourlyRate.toNumber())
      );
      if (!Number.isNaN(minDecimalRate) && minDecimalRate > 0) {
        minRate = minDecimalRate;
      }
    }

    return {
      districtCount: districtCount || 23,
      baselineHourlyRateEur: minRate,
      featuredCategories: featuredCategories.map((c) => ({
        id: c.id, // data-from: ServiceCategory-id
        key: c.key, // data-from: ServiceCategory-key
        titleEn: c.titleEn, // data-from: ServiceCategory-titleEn
        typicalRangeEur: c.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
      })),
    };
  })();
}