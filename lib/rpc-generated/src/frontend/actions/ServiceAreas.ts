/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/ServiceAreas');

export const getServiceAreasPageData = (...args: Parameters<Actions["getServiceAreasPageData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getServiceAreasPageData"]>>>("src.frontend.actions.ServiceAreas.getServiceAreasPageData", ...args);
