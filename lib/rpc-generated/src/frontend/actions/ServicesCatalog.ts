/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/ServicesCatalog');

export const getServicesCatalogData = (...args: Parameters<Actions["getServicesCatalogData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getServicesCatalogData"]>>>("src.frontend.actions.ServicesCatalog.getServicesCatalogData", ...args);
