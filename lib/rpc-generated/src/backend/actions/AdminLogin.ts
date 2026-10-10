/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminLogin');

export const loginAdmin = (...args: Parameters<Actions["loginAdmin"]>) => 
  rpcCall<Awaited<ReturnType<Actions["loginAdmin"]>>>("src.backend.actions.AdminLogin.loginAdmin", ...args);
export const getAuditTelemetry = (...args: Parameters<Actions["getAuditTelemetry"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getAuditTelemetry"]>>>("src.backend.actions.AdminLogin.getAuditTelemetry", ...args);
