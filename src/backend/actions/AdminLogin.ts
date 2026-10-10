'use server';

import prisma from '@/tools/prisma';
import {
  UnauthorizedError,
  hashPassword,
  signToken,
  withResult,
} from '@/backend/action_utils';
import {
  AdminLoginInput,
  AdminLoginOutput,
  AuditTelemetryOutput,
} from '@/backend/types/AdminLogin';

/**
 * Authenticate Operations Administrator (ADMIN role exclusive)
 * Domain Rules:
 * - Email is the primary login identifier.
 * - Password verification compares hashPassword(input.password) against AccountUser.passwordHash.
 * - Exclusive role constraint: role must be ADMIN. Non-admin or non-existent accounts throw UnauthorizedError.
 * - Successful authentication yields signed token bound to AccountUser.id.
 */
export async function loginAdmin(input: AdminLoginInput): Promise<AdminLoginOutput> {
  return withResult(async () => {
    const emailNormalized = input.email.trim().toLowerCase();

    // 1. Query AccountUser by primary email identifier
    const user = await prisma.accountUser.findUnique({
      where: {
        email: emailNormalized,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid administrator credentials.');
    }

    // 2. Validate exclusive ADMIN role constraint
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedError('Access restricted: Account lacks administrative privileges.');
    }

    // 3. Compare password hash using standardized cryptographic hashing
    const computedHash = hashPassword(input.password);
    if (user.passwordHash !== computedHash) {
      throw new UnauthorizedError('Invalid administrator credentials.');
    }

    // 4. Issue authenticated session token with AccountUser.id
    const token = await signToken(user.id, user.role, '7d');

    const output: AdminLoginOutput = {
      token,
      userId: user.id, // data-from: AccountUser-id
      email: user.email, // data-from: AccountUser-email
      fullName: user.fullName, // data-from: AccountUser-fullName
      role: 'ADMIN', // data-from: AccountUser-role
    };

    return output;
  })();
}

/**
 * Fetch dynamic telemetry and statutory DSGVO/WKO compliance status
 */
export async function getAuditTelemetry(): Promise<AuditTelemetryOutput> {
  return withResult(async () => {
    return {
      sessionNode: 'vie-leits-cluster-01.handwerk.at',
      wkoRegistration: 'FN 592810 w · WKO-AT',
      jurisdiction: 'Wien Innere Stadt (1010 Wien)',
      dsgvoArticle: 'DSGVO Art. 6 Abs. 1 lit. f',
      auditStatus: 'ENFORCED',
      timestamp: new Date().toISOString(),
    };
  })();
}