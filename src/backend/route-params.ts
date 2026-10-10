/**
 * Backend Route Parameters and Navigation Utilities
 * Handyman Portal Administrative Operations Platform
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
// B01 Admin Operations Dashboard — 无入参
// ================================================================
export const AdminOperationsDashboard = {
  id: 'B01',
  path: '/adminoperationsdashboard',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminOperationsDashboard.path),
};

// ================================================================
// B02 Admin Quote Request Detail — 入参: quoteRequestId
// ================================================================
export const AdminQuoteDetail = {
  id: 'B02',
  path: '/adminquotedetail',
  paramsMeta: {
    quoteRequestId: {
      source_table: 'QuoteRequest',
      source_column: 'id',
      description: '来自 QuoteRequest 表的主键 id，非 trackingCode 或 customerId',
    },
  },
  getParams: (() => {
    const cache = new WeakMap<URLSearchParams, { quoteRequestId: string }>();
    return (sp: URLSearchParams) => {
      if (cache.has(sp)) return cache.get(sp)!;
      const result = { quoteRequestId: sp.get('quoteRequestId') || '' };
      cache.set(sp, result);
      return result;
    };
  })(),
  navigateTo: (router: AppRouterInstance, params: { quoteRequestId: string }) =>
    router.push(buildUrl(AdminQuoteDetail.path, params)),
  navigateToDetail: (router: AppRouterInstance, params: { quoteRequestId: string }) =>
    router.push(buildUrl(AdminQuoteDetail.path, params)),
};

// ================================================================
// B03 Admin Categories and Rates — 无入参
// ================================================================
export const AdminCategoriesRates = {
  id: 'B03',
  path: '/admincategoriesrates',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminCategoriesRates.path),
};

// ================================================================
// B04 Admin Compliance Checklist — 无入参
// ================================================================
export const AdminComplianceChecklist = {
  id: 'B04',
  path: '/admincompliancechecklist',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminComplianceChecklist.path),
};

// ================================================================
// B05 Admin Login — 无入参
// ================================================================
export const AdminLogin = {
  id: 'B05',
  path: '/adminlogin',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminLogin.path),
};

// ================================================================
// B06 Admin Registration — 无入参
// ================================================================
export const AdminRegister = {
  id: 'B06',
  path: '/adminregister',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminRegister.path),
};

// ================================================================
// end
// ================================================================

export const BackendRoutes = {
  AdminOperationsDashboard,
  AdminQuoteDetail,
  AdminCategoriesRates,
  AdminComplianceChecklist,
  AdminLogin,
  AdminRegister,
};

export const NAVIGATION_MAP: Record<string, string[]> = {
  B01: ['B02'],
  B02: [],
  B03: ['B01'],
  B04: ['B01'],
  B05: ['B01', 'B06'],
  B06: ['B01', 'B05'],
};

export const PAGE_ID_MAP: Record<string, string> = {
  B01: 'AdminOperationsDashboard',
  B02: 'AdminQuoteDetail',
  B03: 'AdminCategoriesRates',
  B04: 'AdminComplianceChecklist',
  B05: 'AdminLogin',
  B06: 'AdminRegister',
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
