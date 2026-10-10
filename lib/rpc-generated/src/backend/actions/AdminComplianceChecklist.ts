/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/backend/types/AdminComplianceChecklist';
export type * from '../../../../../src/backend/types/AdminComplianceChecklist';

type Actions = typeof import('../../../../../src/backend/actions/AdminComplianceChecklist');
export const getComplianceChecklist = (...args: Parameters<Actions["getComplianceChecklist"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getComplianceChecklist"]>>>("src.backend.actions.AdminComplianceChecklist.getComplianceChecklist", ...args);
export const updateComplianceItem = (...args: Parameters<Actions["updateComplianceItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateComplianceItem"]>>>("src.backend.actions.AdminComplianceChecklist.updateComplianceItem", ...args);
