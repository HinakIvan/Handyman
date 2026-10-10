/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/QuoteRequestForm';
export type * from '../../../../../src/frontend/types/QuoteRequestForm';

type Actions = typeof import('../../../../../src/frontend/actions/QuoteRequestForm');
export const getQuoteFormInitData = (...args: Parameters<Actions["getQuoteFormInitData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getQuoteFormInitData"]>>>("src.frontend.actions.QuoteRequestForm.getQuoteFormInitData", ...args);
export const createQuoteRequest = (...args: Parameters<Actions["createQuoteRequest"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createQuoteRequest"]>>>("src.frontend.actions.QuoteRequestForm.createQuoteRequest", ...args);
