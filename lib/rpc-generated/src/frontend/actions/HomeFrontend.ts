/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/HomeFrontend');

export const getHomeData = (...args: Parameters<Actions["getHomeData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getHomeData"]>>>("src.frontend.actions.HomeFrontend.getHomeData", ...args);
export const createQuoteRequest = (...args: Parameters<Actions["createQuoteRequest"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createQuoteRequest"]>>>("src.frontend.actions.HomeFrontend.createQuoteRequest", ...args);
