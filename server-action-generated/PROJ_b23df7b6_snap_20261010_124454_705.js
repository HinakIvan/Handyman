// PROJ_b23df7b6_snap_20261010_124454_705.js (generated)
const express = require('express');
const common = require('./_common');
const { UnauthorizedError, ForbiddenError, runWithAuth: baseRunWithAuth } = common.BaseActionFun;
const serializer = common.serializer;

const router = express.Router();
const actions = new Map();

// Dynamic require for each action
const registry = {
  'src.backend.actions.AdminCategoriesRates': require('./src.backend.actions.AdminCategoriesRates'),
  'src.backend.actions.AdminComplianceChecklist': require('./src.backend.actions.AdminComplianceChecklist'),
  'src.backend.actions.AdminLogin': require('./src.backend.actions.AdminLogin'),
  'src.backend.actions.AdminOperationsDashboard': require('./src.backend.actions.AdminOperationsDashboard'),
  'src.backend.actions.AdminQuoteDetail': require('./src.backend.actions.AdminQuoteDetail'),
  'src.backend.actions.AdminRegister': require('./src.backend.actions.AdminRegister'),
  'src.frontend.actions.CustomerInquiryTracker': require('./src.frontend.actions.CustomerInquiryTracker'),
  'src.frontend.actions.CustomerLogin': require('./src.frontend.actions.CustomerLogin'),
  'src.frontend.actions.CustomerRegister': require('./src.frontend.actions.CustomerRegister'),
  'src.frontend.actions.HomeFrontend': require('./src.frontend.actions.HomeFrontend'),
  'src.frontend.actions.PricingScope': require('./src.frontend.actions.PricingScope'),
  'src.frontend.actions.QuoteRequestForm': require('./src.frontend.actions.QuoteRequestForm'),
  'src.frontend.actions.ServiceAreas': require('./src.frontend.actions.ServiceAreas'),
  'src.frontend.actions.ServiceCategoryDetail': require('./src.frontend.actions.ServiceCategoryDetail'),
  'src.frontend.actions.ServicesCatalog': require('./src.frontend.actions.ServicesCatalog'),
};

// Register actions
for (const [moduleName, mod] of Object.entries(registry)) {
  if (typeof mod.registerProjectRoutes === 'function') {
    mod.registerProjectRoutes(router);
  }
  for (const [fnName, fn] of Object.entries(mod)) {
    if (fnName !== 'registerProjectRoutes' && typeof fn === 'function') {
      actions.set(`${moduleName}.${fnName}`, fn);
    }
  }
}

// Auth module selection
// 注意：app/(backend)/ 目录下的 action 生成的 actionName 格式为 "app.backend.xxx"，
// 必须优先匹配 .backend.，否则会被 startsWith('app.') 错误路由到 appAuth
function getAuthModule(actionName) {
  if (actionName.includes('.frontend.') || actionName.startsWith('frontend.')) return common.frontendAuth;
  if (actionName.includes('.backend.') || actionName.startsWith('backend.')) return common.backendAuth;
  if (actionName.includes('.app.') || actionName.startsWith('app.')) return common.appAuth;
  return common.backendAuth;
}

// RPC route (preserving existing bundled-entry.ts logic)
router.post('/', async (req, res) => {
  try {
    const { actionName, args } = req.body;
    const fn = actions.get(actionName);
    if (!fn) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    const authModule = getAuthModule(actionName);
    const { parseToken } = authModule;
    const runWithAuth = authModule.runWithAuth || baseRunWithAuth;

    const token = req.headers.authorization?.replace('Bearer ', '');
    const authContext = token ? await parseToken(token) : null;

    const result = await runWithAuth(authContext, async () => {
      return fn(...(serializer.deserialize(args)));
    });

    if (authContext && authContext.role) {
      const roleValue = Array.isArray(authContext.role)
        ? JSON.stringify(authContext.role)
        : String(authContext.role);
      res.setHeader('X-Auth-Role', roleValue);
    }

    res.json(serializer.serialize(result));
  } catch (e) {
    if (e instanceof UnauthorizedError || e.name === 'UnauthorizedError') {
      res.status(401).json({ error: e.message || '请登录' });
      return;
    }
    if (e instanceof ForbiddenError || e.name === 'ForbiddenError') {
      res.status(403).json({ error: e.message || '权限不足' });
      return;
    }
    console.error('RPC Error:', e);
    res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
});

const PROJECT_ID = 'PROJ_b23df7b6_snap_20261010_124454_705';
module.exports = { path: `/rpc/${PROJECT_ID}`, router };
