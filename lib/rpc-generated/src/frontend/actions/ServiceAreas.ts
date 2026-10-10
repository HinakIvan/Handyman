/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/ServiceAreas';
export type * from '../../../../../src/frontend/types/ServiceAreas';

type Actions = typeof import('../../../../../src/frontend/actions/ServiceAreas');
export const getServiceAreasPageData = (...args: Parameters<Actions["getServiceAreasPageData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getServiceAreasPageData"]>>>("src.frontend.actions.ServiceAreas.getServiceAreasPageData", ...args);
