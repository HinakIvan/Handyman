'use server';

import prisma from '@/tools/prisma';
import {
  withResult,
  requireAuth,
  requireRole,
  UserRole,
} from '@/backend/action_utils';
import {
  ChecklistItemKey,
  ChecklistStatus,
  GetComplianceChecklistOutput,
  UpdateComplianceItemInput,
  UpdateComplianceItemOutput,
  SetupChecklistItem,
  ComplianceStats,
} from '@/backend/types/AdminComplianceChecklist';

function calculateStats(items: Array<{ status: ChecklistStatus }>): ComplianceStats {
  const total = items.length;
  const completed = items.filter((i) => i.status === "COMPLETED").length;
  const inReview = items.filter((i) => i.status === "IN_REVIEW").length;
  const pending = items.filter((i) => i.status === "PENDING").length;
  const readinessScore = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    inReview,
    pending,
    readinessScore,
  };
}

/**
 * Retrieves all statutory Austrian compliance checklist records.
 * Exclusively accessible by Operations Administrators (ADMIN).
 */
export async function getComplianceChecklist(): Promise<GetComplianceChecklistOutput> {
  return withResult(
    requireAuth(
      requireRole(UserRole.ADMIN)(async () => {
        const records = await prisma.setupChecklistItem.findMany({
          orderBy: { createdAt: "asc" },
        });

        const items: SetupChecklistItem[] = records.map((r) => ({
          id: r.id, // data-from: SetupChecklistItem-id
          itemKey: r.itemKey as ChecklistItemKey, // data-from: SetupChecklistItem-itemKey
          title: r.title, // data-from: SetupChecklistItem-title
          subtitle: r.subtitle, // data-from: SetupChecklistItem-subtitle
          status: r.status as ChecklistStatus, // data-from: SetupChecklistItem-status
          fieldValue: r.fieldValue, // data-from: SetupChecklistItem-fieldValue
          legalRef: r.legalRef, // data-from: SetupChecklistItem-legalRef
          lastUpdated: r.lastUpdated, // data-from: SetupChecklistItem-lastUpdated
          createdAt: r.createdAt, // data-from: SetupChecklistItem-createdAt
          updatedAt: r.updatedAt, // data-from: SetupChecklistItem-updatedAt
        }));

        const stats = calculateStats(items);

        return {
          items,
          stats,
        };
      })
    )
  )();
}

/**
 * Updates the verification status, configured official value, and review timestamp
 * for a specific statutory compliance requirement.
 * Recalculates Austrian statutory compliance metrics immediately.
 * Restricted to Operations Administrators (ADMIN).
 */
export async function updateComplianceItem(
  input: UpdateComplianceItemInput
): Promise<UpdateComplianceItemOutput> {
  return withResult(
    requireAuth(
      requireRole(UserRole.ADMIN)(async () => {
        const now = new Date();
        const formattedTimestamp = `${now.toISOString().slice(0, 10)} ${now
          .toTimeString()
          .slice(0, 8)} CET`;

        // Update target statutory compliance item
        const updatedRecord = await prisma.setupChecklistItem.update({
          where: { id: input.id },
          data: {
            fieldValue: input.fieldValue,
            status: input.status,
            lastUpdated: formattedTimestamp,
          },
        });

        // Fetch all items to recalculate system readiness score
        const allRecords = await prisma.setupChecklistItem.findMany({
          orderBy: { createdAt: "asc" },
        });

        const stats = calculateStats(allRecords.map((r) => ({ status: r.status as ChecklistStatus })));

        const item: SetupChecklistItem = {
          id: updatedRecord.id, // data-from: SetupChecklistItem-id
          itemKey: updatedRecord.itemKey as ChecklistItemKey, // data-from: SetupChecklistItem-itemKey
          title: updatedRecord.title, // data-from: SetupChecklistItem-title
          subtitle: updatedRecord.subtitle, // data-from: SetupChecklistItem-subtitle
          status: updatedRecord.status as ChecklistStatus, // data-from: SetupChecklistItem-status
          fieldValue: updatedRecord.fieldValue, // data-from: SetupChecklistItem-fieldValue
          legalRef: updatedRecord.legalRef, // data-from: SetupChecklistItem-legalRef
          lastUpdated: updatedRecord.lastUpdated, // data-from: SetupChecklistItem-lastUpdated
          createdAt: updatedRecord.createdAt, // data-from: SetupChecklistItem-createdAt
          updatedAt: updatedRecord.updatedAt, // data-from: SetupChecklistItem-updatedAt
        };

        return {
          item,
          stats,
        };
      })
    )
  )();
}