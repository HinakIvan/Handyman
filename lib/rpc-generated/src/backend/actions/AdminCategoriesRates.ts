/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/backend/types/AdminCategoriesRates';
export type * from '../../../../../src/backend/types/AdminCategoriesRates';

type Actions = typeof import('../../../../../src/backend/actions/AdminCategoriesRates');
export const getServiceCategories = (...args: Parameters<Actions["getServiceCategories"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getServiceCategories"]>>>("src.backend.actions.AdminCategoriesRates.getServiceCategories", ...args);
export const getPortfolioMetrics = (...args: Parameters<Actions["getPortfolioMetrics"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getPortfolioMetrics"]>>>("src.backend.actions.AdminCategoriesRates.getPortfolioMetrics", ...args);
export const updateCategoryRateConfiguration = (...args: Parameters<Actions["updateCategoryRateConfiguration"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateCategoryRateConfiguration"]>>>("src.backend.actions.AdminCategoriesRates.updateCategoryRateConfiguration", ...args);
export const toggleCategoryFeatured = (...args: Parameters<Actions["toggleCategoryFeatured"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleCategoryFeatured"]>>>("src.backend.actions.AdminCategoriesRates.toggleCategoryFeatured", ...args);
