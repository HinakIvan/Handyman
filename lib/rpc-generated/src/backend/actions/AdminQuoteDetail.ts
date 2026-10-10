/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminQuoteDetail');

export const getQuoteRequestDetail = (...args: Parameters<Actions["getQuoteRequestDetail"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getQuoteRequestDetail"]>>>("src.backend.actions.AdminQuoteDetail.getQuoteRequestDetail", ...args);
export const updateLaborAndBudget = (...args: Parameters<Actions["updateLaborAndBudget"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateLaborAndBudget"]>>>("src.backend.actions.AdminQuoteDetail.updateLaborAndBudget", ...args);
export const updateJobScope = (...args: Parameters<Actions["updateJobScope"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateJobScope"]>>>("src.backend.actions.AdminQuoteDetail.updateJobScope", ...args);
export const updateLifecycle = (...args: Parameters<Actions["updateLifecycle"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateLifecycle"]>>>("src.backend.actions.AdminQuoteDetail.updateLifecycle", ...args);
export const addConsultationLog = (...args: Parameters<Actions["addConsultationLog"]>) => 
  rpcCall<Awaited<ReturnType<Actions["addConsultationLog"]>>>("src.backend.actions.AdminQuoteDetail.addConsultationLog", ...args);
