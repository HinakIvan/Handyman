/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/ServiceCategoryDetail');

export const getServiceCategoryDetail = (...args: Parameters<Actions["getServiceCategoryDetail"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getServiceCategoryDetail"]>>>("src.frontend.actions.ServiceCategoryDetail.getServiceCategoryDetail", ...args);
