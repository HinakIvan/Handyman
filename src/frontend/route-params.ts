/**
 * Frontend Route Parameters and Navigation Utilities
 * Vienna Handyman Portal Client Platform
 */

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ParamMeta {
  source_table: string;
  source_column: string;
  description: string;
}

function buildUrl(path: string, params: Record<string, string>): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) sp.set(k, v); });
  const query = sp.toString();
  return query ? `${path}?${query}` : path;
}

// ================================================================
// F01 Handyman Portal — 无入参
// ================================================================
export const HomeFrontend = {
  id: 'F01',
  path: '/',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(HomeFrontend.path),
};

// ================================================================
// F02 All Services Catalog — 无入参
// ================================================================
export const ServicesCatalog = {
  id: 'F02',
  path: '/servicescatalog',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(ServicesCatalog.path),
};

// ================================================================
// F03 Service Category Detail — 入参: categoryKey
// ================================================================
export const ServiceCategoryDetail = {
  id: 'F03',
  path: '/servicecategorydetail',
  paramsMeta: {
    categoryKey: {
      source_table: 'ServiceCategory',
      source_column: 'key',
      description: '来自 ServiceCategory 表的唯一标识 key (ServiceCategoryKey)，非主键 uuid，用于分类识别',
    },
  },
  getParams: (() => {
    const cache = new WeakMap<URLSearchParams, { categoryKey: string }>();
    return (sp: URLSearchParams) => {
      if (cache.has(sp)) return cache.get(sp)!;
      const result = { categoryKey: sp.get('categoryKey') || '' };
      cache.set(sp, result);
      return result;
    };
  })(),
  navigateTo: (router: AppRouterInstance, params: { categoryKey: string }) =>
    router.push(buildUrl(ServiceCategoryDetail.path, params)),
  navigateToCategory: (router: AppRouterInstance, params: { categoryKey: string }) =>
    router.push(buildUrl(ServiceCategoryDetail.path, params)),
};

// ================================================================
// F04 Pricing and Legal Scope — 无入参
// ================================================================
export const PricingScope = {
  id: 'F04',
  path: '/pricingscope',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(PricingScope.path),
};

// ================================================================
// F05 Vienna Service Areas — 无入参
// ================================================================
export const ServiceAreas = {
  id: 'F05',
  path: '/serviceareas',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(ServiceAreas.path),
};

// ================================================================
// F06 Dedicated Quote Request — 入参: categoryKey
// ================================================================
export const QuoteRequestForm = {
  id: 'F06',
  path: '/quoterequestform',
  paramsMeta: {
    categoryKey: {
      source_table: 'ServiceCategory',
      source_column: 'key',
      description: '来自 ServiceCategory 表的唯一标识 key (ServiceCategoryKey)，非主键 uuid，用于表单预选分类',
    },
  },
  getParams: (() => {
    const cache = new WeakMap<URLSearchParams, { categoryKey: string }>();
    return (sp: URLSearchParams) => {
      if (cache.has(sp)) return cache.get(sp)!;
      const result = { categoryKey: sp.get('categoryKey') || '' };
      cache.set(sp, result);
      return result;
    };
  })(),
  navigateTo: (router: AppRouterInstance) => router.push(QuoteRequestForm.path),
  navigateToWithCategory: (router: AppRouterInstance, params: { categoryKey: string }) =>
    router.push(buildUrl(QuoteRequestForm.path, params)),
};

// ================================================================
// F07 Customer Quotes Tracking — 无入参
// ================================================================
export const CustomerInquiryTracker = {
  id: 'F07',
  path: '/customerinquirytracker',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(CustomerInquiryTracker.path),
};

// ================================================================
// F08 Customer Login — 无入参
// ================================================================
export const CustomerLogin = {
  id: 'F08',
  path: '/customerlogin',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(CustomerLogin.path),
};

// ================================================================
// F09 Customer Registration — 无入参
// ================================================================
export const CustomerRegister = {
  id: 'F09',
  path: '/customerregister',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(CustomerRegister.path),
};

// ================================================================
// end
// ================================================================

export const FrontendRoutes = {
  HomeFrontend,
  ServicesCatalog,
  ServiceCategoryDetail,
  PricingScope,
  ServiceAreas,
  QuoteRequestForm,
  CustomerInquiryTracker,
  CustomerLogin,
  CustomerRegister,
};

export const NAVIGATION_MAP: Record<string, string[]> = {
  F01: ['F02', 'F03', 'F06'],
  F02: ['F03'],
  F03: ['F06'],
  F04: [],
  F05: [],
  F06: [],
  F07: [],
  F08: ['F01', 'F09'],
  F09: ['F01', 'F08'],
};

export const PAGE_ID_MAP: Record<string, string> = {
  F01: 'HomeFrontend',
  F02: 'ServicesCatalog',
  F03: 'ServiceCategoryDetail',
  F04: 'PricingScope',
  F05: 'ServiceAreas',
  F06: 'QuoteRequestForm',
  F07: 'CustomerInquiryTracker',
  F08: 'CustomerLogin',
  F09: 'CustomerRegister',
};

/**
 * 传入页面 ID 或名称，从本文件源码中提取：当前页面 + 其所有跳转目标的 export const 代码块。
 * 支持 ID（F10）或名称（PaperCompose / papercompose），大小写不敏感。
 */
export function getRouteContextText(
  pageIdOrName: string,
  fileContent: string
): string {
  let pageId = pageIdOrName
  let currentName = PAGE_ID_MAP[pageId]

  if (!currentName) {
    const lowerInput = pageIdOrName.toLowerCase()
    const entry = Object.entries(PAGE_ID_MAP).find(
      ([, name]) => name.toLowerCase() === lowerInput
    )
    if (entry) {
      pageId = entry[0]
      currentName = entry[1]
    }
  }

  if (!currentName) return `// 错误：未找到页面 ${pageIdOrName}`

  const targetIds = NAVIGATION_MAP[pageId] || []
  const targetNames = targetIds.map((id) => PAGE_ID_MAP[id]).filter(Boolean)

  const lines = fileContent.split('\n')
  const blocks: Record<string, string> = {}
  let currentBlock: string[] = []
  let currentBlockName = ''

  for (const line of lines) {
    if (line.startsWith('// ====')) {
      if (currentBlockName && currentBlock.length > 0) {
        blocks[currentBlockName] = currentBlock.join('\n').trim()
      }
      currentBlock = [line]
      currentBlockName = ''
      continue
    }
    const exportMatch = line.match(/^export const (\w+)\s*=/)
    if (exportMatch && !currentBlockName) {
      currentBlockName = exportMatch[1]
    }
    currentBlock.push(line)
  }
  if (currentBlockName && currentBlock.length > 0) {
    blocks[currentBlockName] = currentBlock.join('\n').trim()
  }

  function getBlock(name: string): string {
    return blocks[name] || `// 未找到 ${name} 的定义`
  }

  const parts: string[] = []
  parts.push('// ★★★ 当前页面 ★★★')
  parts.push(getBlock(currentName))
  if (targetNames.length > 0) {
    parts.push('// ★★★ 跳转目标页面（当前页面会 navigateTo 以下页面）★★★')
    for (const name of targetNames) {
      parts.push(getBlock(name))
    }
  }
  return parts.join('\n\n')
}
