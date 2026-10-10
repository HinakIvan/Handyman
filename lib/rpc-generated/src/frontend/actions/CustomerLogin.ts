/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/CustomerLogin');

export const loginCustomer = (...args: Parameters<Actions["loginCustomer"]>) => 
  rpcCall<Awaited<ReturnType<Actions["loginCustomer"]>>>("src.frontend.actions.CustomerLogin.loginCustomer", ...args);
export const getCustomerPortalMeta = (...args: Parameters<Actions["getCustomerPortalMeta"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCustomerPortalMeta"]>>>("src.frontend.actions.CustomerLogin.getCustomerPortalMeta", ...args);
