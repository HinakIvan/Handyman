/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/ServicesCatalog';
export type * from '../../../../../src/frontend/types/ServicesCatalog';

type Actions = typeof import('../../../../../src/frontend/actions/ServicesCatalog');
export const getServicesCatalogData = (...args: Parameters<Actions["getServicesCatalogData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getServicesCatalogData"]>>>("src.frontend.actions.ServicesCatalog.getServicesCatalogData", ...args);
