/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminOperationsDashboard');

export const getDashboardOverview = (...args: Parameters<Actions["getDashboardOverview"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getDashboardOverview"]>>>("src.backend.actions.AdminOperationsDashboard.getDashboardOverview", ...args);
export const updateQuoteStatus = (...args: Parameters<Actions["updateQuoteStatus"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateQuoteStatus"]>>>("src.backend.actions.AdminOperationsDashboard.updateQuoteStatus", ...args);
export const updateServiceCategoryRate = (...args: Parameters<Actions["updateServiceCategoryRate"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateServiceCategoryRate"]>>>("src.backend.actions.AdminOperationsDashboard.updateServiceCategoryRate", ...args);
export const updateSetupChecklistItem = (...args: Parameters<Actions["updateSetupChecklistItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateSetupChecklistItem"]>>>("src.backend.actions.AdminOperationsDashboard.updateSetupChecklistItem", ...args);
