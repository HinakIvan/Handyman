/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/CustomerInquiryTracker';
export type * from '../../../../../src/frontend/types/CustomerInquiryTracker';

type Actions = typeof import('../../../../../src/frontend/actions/CustomerInquiryTracker');
export const getCustomerInquiries = (...args: Parameters<Actions["getCustomerInquiries"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCustomerInquiries"]>>>("src.frontend.actions.CustomerInquiryTracker.getCustomerInquiries", ...args);
