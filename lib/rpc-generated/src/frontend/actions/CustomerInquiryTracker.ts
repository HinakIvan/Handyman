/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/CustomerInquiryTracker');

export const getCustomerInquiries = (...args: Parameters<Actions["getCustomerInquiries"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCustomerInquiries"]>>>("src.frontend.actions.CustomerInquiryTracker.getCustomerInquiries", ...args);
