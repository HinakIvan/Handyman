"use server";

import prisma from "@/tools/prisma";
import {
  hashPassword,
  signToken,
  withResult,
  UnauthorizedError,
} from "@/frontend/action_utils";
import {
  LoginCustomerInput,
  LoginCustomerOutput,
  CustomerPortalMetaOutput,
  AccountUserRole,
} from "@/frontend/types/CustomerLogin";

/**
 * Authenticates a customer against AccountUser entity.
 * Allowed login roles: strictly ["CUSTOMER"].
 * Operations / Admin users must authenticate via backoffice.
 */
export async function loginCustomer(
  input: LoginCustomerInput
): Promise<LoginCustomerOutput> {
  return withResult(async () => {
    const trimmedEmail = input.email.trim().toLowerCase();

    // 1. Query user by unique email
    const user = await prisma.accountUser.findUnique({
      where: { email: trimmedEmail },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email address or password.");
    }

    // 2. Strict Role Verification: Frontend portal exclusively serves CUSTOMER
    if (user.role !== "CUSTOMER") {
      throw new UnauthorizedError("Access restricted. Only registered customer accounts may log in here.");
    }

    // 3. Verify password hash
    const inputHash = hashPassword(input.password);
    if (inputHash !== user.passwordHash) {
      throw new UnauthorizedError("Invalid email address or password.");
    }

    // 4. Issue stateless JWT token with authentic user ID and role
    const token = await signToken(user.id, user.role);

    return {
      token,
      userId: user.id, // data-from: AccountUser-id
      email: user.email, // data-from: AccountUser-email
      fullName: user.fullName, // data-from: AccountUser-fullName
      role: user.role as AccountUserRole, // data-from: AccountUser-role
    };
  })();
}

/**
 * Fetches lightweight metadata from ViennaDistrict and ServiceCategory to display genuine platform stats.
 */
export async function getCustomerPortalMeta(): Promise<CustomerPortalMetaOutput> {
  return withResult(async () => {
    const districtCount = await prisma.viennaDistrict.count();
    const categories = await prisma.serviceCategory.findMany({
      select: { baselineHourlyRate: true },
    });

    let minRate = 15;
    if (categories.length > 0) {
      const rates = categories.map((c) => Number(c.baselineHourlyRate));
      minRate = Math.min(...rates);
    }

    return {
      totalDistricts: districtCount || 23,
      minHourlyRateEur: minRate,
      totalCategories: categories.length || 11,
    };
  })();
}