/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/backend/types/AdminRegister';
export type * from '../../../../../src/backend/types/AdminRegister';

type Actions = typeof import('../../../../../src/backend/actions/AdminRegister');
export const registerAdmin = (...args: Parameters<Actions["registerAdmin"]>) => 
  rpcCall<Awaited<ReturnType<Actions["registerAdmin"]>>>("src.backend.actions.AdminRegister.registerAdmin", ...args);
