/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/PricingScope');

export const getPricingScopeData = (...args: Parameters<Actions["getPricingScopeData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getPricingScopeData"]>>>("src.frontend.actions.PricingScope.getPricingScopeData", ...args);
