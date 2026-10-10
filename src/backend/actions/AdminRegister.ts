"use server";

import prisma from "@/tools/prisma";
import {
  hashPassword,
  signToken,
  withResult,
} from "@/backend/action_utils";
import { RegisterAdminInput, RegisterAdminOutput } from "@/backend/types/AdminRegister";

/**
 * Register a new staff administrator account.
 * Domain rules:
 * - Email must be unique across all registered accounts.
 * - Password must be securely hashed before persistence.
 * - The created account strictly receives role ADMIN. Role cannot be chosen by client.
 * - Signs a valid JWT token associated with the created AccountUser ID and role ADMIN.
 */
export async function registerAdmin(input: RegisterAdminInput): Promise<RegisterAdminOutput> {
  return withResult(async () => {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedName = input.fullName.trim();

    if (!trimmedEmail) {
      throw new Error("Email address is required.");
    }
    if (!trimmedName) {
      throw new Error("Administrator full name is required.");
    }
    if (!input.password || input.password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    // Check email uniqueness
    const existing = await prisma.accountUser.findUnique({
      where: { email: trimmedEmail },
    });
    if (existing) {
      throw new Error("An account with this email address already exists.");
    }

    // Hash password
    const passwordHash = hashPassword(input.password);

    // Create AccountUser with ADMIN role
    const newUser = await prisma.accountUser.create({
      data: {
        email: trimmedEmail,
        fullName: trimmedName,
        passwordHash,
        role: "ADMIN",
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    // Sign session token with real user ID and ADMIN role
    const token = await signToken(newUser.id, newUser.role);

    return {
      token,
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role as "ADMIN",
    };
  })();
}