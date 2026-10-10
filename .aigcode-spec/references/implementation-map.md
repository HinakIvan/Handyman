# Implementation Map
> Fact layer - deterministic engineering extraction. Verify against code before editing.

# IMPLEMENTATION_MAP v1
用途:供 SPEC 生成的代码侧地图。需求/领域事实单独在 REQUIREMENTS_BRIEF 里。
Ref 还原:PAGE_MAP.page=>page:<id>; ACTION_MAP.action=>iface:<name>; MODEL_MAP.model=>model:<name>; ROUTE_PARAM_MAP.route=>route:<name>; model.field=>field:<model>.<field>。
PROJECT id=PROJ_b23df7b6|platforms=backend,frontend|language=zh-CN|chain=
COUNTS pages=15|actions=0|models=6|routes=15|edges=5
读法:每一列都是代码当前**已实现**内容的生成时快照,不是 TODO——判断某能力是否实现请打开文件;本地图给坐标,不给运行时状态。roles/legal_state_changes/reads/writes 是 best-effort 提取、不完整:空单元格表示 'not extracted',绝不表示 'none / public / no state change'。roles 是 call-site label,不是鉴权 source of truth(空 ≠ public;AUTHENTICATED = 需登录,角色未指定)。PAGE_MAP.reads/writes 是该页所有 action 的并集;要反查哪些页面碰某个模型,扫 ACTION_MAP 行,不要只看 PAGE_MAP。带 .N 后缀的 action 名(如 login.2)是同名 action 在不同文件中的去重索引(通常是同一逻辑 action 在不同 platform/页面上),不是 base 的子变体——改跨切面行为时,每个 .N sibling 都要改,不只裸名。
源码坐标:ACTION_MAP 末尾有 file|calls 列;FILE_MAP 列出逐页源文件。calls 是原始调用图符号——把某个符号(如 auth/session/transaction helper)在 ACTION_MAP.calls 里 grep 一下,就能找到所有碰这个跨切面关注点的 action。INFRA_MAP 列出 update agent 要编辑或调用的跨页 auth/session/route-guard/nav 入口,engine 维护的文件带 read_only 标记。上面 roles 列的鉴权事实以 INFRA_MAP 的 auth-guard-* 加源码为准,不以本地图为准。

# MODEL_MAP  model: 仅关键字段(id/fk/enum);完整字段表+类型在 indexes/full_index.json#/models;* id, ? optional, [] list, -> relation, {enum}
AccountUser: id:String*, role:AccountUserRole{CUSTOMER|ADMIN}
FaqItem: id:String*, category:FaqCategory{PRICING|SCOPE|SCHEDULING|MATERIALS}
QuoteRequest: id:String*, customerId:String?->AccountUser, serviceCategoryId:String->ServiceCategory, districtId:String->ViennaDistrict, preferredTimeSlot:PreferredTimeSlot{MORNING|AFTERNOON|FLEXIBLE}, submissionLang:SubmissionLanguage{DE|EN|RU}, status:QuoteStatus{NEW|CONTACTED|ESTIMATE_SENT|QUOTED|SCHEDULED|COMPLETED}
ServiceCategory: id:String*, key:ServiceCategoryKey{ASSEMBLY|DEMOLITION|FLOORING|PAINTING|DRYWALL|PLUMBING_MINOR|BATHROOM_KITCHEN|DOORS_WINDOWS|OUTDOOR|MOVING|COMMERCIAL}, craftClassification:CraftClassification{FREIES_HANDWERK|MEISTER_KOOPERATION}
SetupChecklistItem: id:String*, itemKey:ChecklistItemKey{VAT_UID|OFFICIAL_CONTACT|REGISTERED_ADDRESS|OPERATING_HOURS}, status:ChecklistStatus{PENDING|IN_REVIEW|COMPLETED}
ViennaDistrict: id:String*, zone:LogisticsZone{INNER_CITY|CENTRAL|OUTER_RING|GREATER_SUBURB}

# PAGE_MAP  page|name|route|role/auth|reads|writes
F01|HomeFrontend|/|GUEST,CUSTOMER||
F02|ServicesCatalog|/servicescatalog|GUEST,CUSTOMER||
F03|ServiceCategoryDetail|/servicecategorydetail|GUEST,CUSTOMER||
F04|PricingScope|/pricingscope|GUEST,CUSTOMER||
F05|ServiceAreas|/serviceareas|GUEST,CUSTOMER||
F06|QuoteRequestForm|/quoterequestform|GUEST,CUSTOMER||
F07|CustomerInquiryTracker|/customerinquirytracker|CUSTOMER||
F08|CustomerLogin|/customerlogin|||
F09|CustomerRegister|/customerregister|||
B01|AdminOperationsDashboard|/|ADMIN||
B02|AdminQuoteDetail|/adminquotedetail|ADMIN||
B03|AdminCategoriesRates|/admincategoriesrates|ADMIN||
B04|AdminComplianceChecklist|/admincompliancechecklist|ADMIN||
B05|AdminLogin|/adminlogin|||
B06|AdminRegister|/adminregister|||

# ACTION_MAP  action|page|roles|reads|writes|legal_state_changes|returns|file|calls

# ROUTE_PARAM_MAP  route|path|params(name=token)  token: field:<model>.<f> 绑定到模型字段, param:<name> 自由参数, 裸名未消歧
AdminCategoriesRates|/admincategoriesrates|
AdminComplianceChecklist|/admincompliancechecklist|
AdminLogin|/adminlogin|
AdminOperationsDashboard|/adminoperationsdashboard|
AdminQuoteDetail|/adminquotedetail|quoteRequestId=field:QuoteRequest.id
AdminRegister|/adminregister|
CustomerInquiryTracker|/customerinquirytracker|
CustomerLogin|/customerlogin|
CustomerRegister|/customerregister|
HomeFrontend|/|
PricingScope|/pricingscope|
QuoteRequestForm|/quoterequestform|categoryKey=field:ServiceCategory.key
ServiceAreas|/serviceareas|
ServiceCategoryDetail|/servicecategorydetail|categoryKey=field:ServiceCategory.key
ServicesCatalog|/servicescatalog|

# NAVIGATION_MAP  engine_ref|from>to|carries  (仅显式跨页 L2;L1/自环/declared 边留在 engine_edges.json;carries 为空 = 未提取到参数,不保证没有传参)

# FILE_MAP  page|role=path;role=path  (逐页源文件;生成时快照——co_located_* 是按约定推断的路径,不一定都存在;rpc_stub 是 GENERATED,改 source_action 而不是 stub;编辑前先核对)
F01|source_action=src/frontend/actions/HomeFrontend.ts;hook=src/frontend/hooks/useHomeFrontend.ts;view=src/frontend/components/HomeFrontendView.tsx;types=src/frontend/types/HomeFrontend.ts;rpc_stub=lib/rpc-generated/src/frontend/actions/HomeFrontend.ts (generated)
F02|source_action=src/frontend/actions/ServicesCatalog.ts;hook=src/frontend/hooks/useServicesCatalog.ts;view=src/frontend/components/ServicesCatalogView.tsx;types=src/frontend/types/ServicesCatalog.ts;page_entry=app/(frontend)/servicescatalog/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/ServicesCatalog.ts (generated)
F03|source_action=src/frontend/actions/ServiceCategoryDetail.ts;hook=src/frontend/hooks/useServiceCategoryDetail.ts;view=src/frontend/components/ServiceCategoryDetailView.tsx;types=src/frontend/types/ServiceCategoryDetail.ts;page_entry=app/(frontend)/servicecategorydetail/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/ServiceCategoryDetail.ts (generated)
F04|source_action=src/frontend/actions/PricingScope.ts;hook=src/frontend/hooks/usePricingScope.ts;view=src/frontend/components/PricingScopeView.tsx;types=src/frontend/types/PricingScope.ts;page_entry=app/(frontend)/pricingscope/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/PricingScope.ts (generated)
F05|source_action=src/frontend/actions/ServiceAreas.ts;hook=src/frontend/hooks/useServiceAreas.ts;view=src/frontend/components/ServiceAreasView.tsx;types=src/frontend/types/ServiceAreas.ts;page_entry=app/(frontend)/serviceareas/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/ServiceAreas.ts (generated)
F06|source_action=src/frontend/actions/QuoteRequestForm.ts;hook=src/frontend/hooks/useQuoteRequestForm.ts;view=src/frontend/components/QuoteRequestFormView.tsx;types=src/frontend/types/QuoteRequestForm.ts;page_entry=app/(frontend)/quoterequestform/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/QuoteRequestForm.ts (generated)
F07|source_action=src/frontend/actions/CustomerInquiryTracker.ts;hook=src/frontend/hooks/useCustomerInquiryTracker.ts;view=src/frontend/components/CustomerInquiryTrackerView.tsx;types=src/frontend/types/CustomerInquiryTracker.ts;page_entry=app/(frontend)/customerinquirytracker/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/CustomerInquiryTracker.ts (generated)
F08|source_action=src/frontend/actions/CustomerLogin.ts;hook=src/frontend/hooks/useCustomerLogin.ts;view=src/frontend/components/CustomerLoginView.tsx;types=src/frontend/types/CustomerLogin.ts;page_entry=app/(frontend)/customerlogin/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/CustomerLogin.ts (generated)
F09|source_action=src/frontend/actions/CustomerRegister.ts;hook=src/frontend/hooks/useCustomerRegister.ts;view=src/frontend/components/CustomerRegisterView.tsx;types=src/frontend/types/CustomerRegister.ts;page_entry=app/(frontend)/customerregister/page.tsx;rpc_stub=lib/rpc-generated/src/frontend/actions/CustomerRegister.ts (generated)
B01|source_action=src/backend/actions/AdminOperationsDashboard.ts;hook=src/backend/hooks/useAdminOperationsDashboard.ts;view=src/backend/components/AdminOperationsDashboardView.tsx;types=src/backend/types/AdminOperationsDashboard.ts;page_entry=app/(backend)/adminoperationsdashboard/page.tsx;rpc_stub=lib/rpc-generated/src/backend/actions/AdminOperationsDashboard.ts (generated)
B02|source_action=src/backend/actions/AdminQuoteDetail.ts;hook=src/backend/hooks/useAdminQuoteDetail.ts;view=src/backend/components/AdminQuoteDetailView.tsx;types=src/backend/types/AdminQuoteDetail.ts;page_entry=app/(backend)/adminquotedetail/page.tsx;rpc_stub=lib/rpc-generated/src/backend/actions/AdminQuoteDetail.ts (generated)
B03|source_action=src/backend/actions/AdminCategoriesRates.ts;hook=src/backend/hooks/useAdminCategoriesRates.ts;view=src/backend/components/AdminCategoriesRatesView.tsx;types=src/backend/types/AdminCategoriesRates.ts;page_entry=app/(backend)/admincategoriesrates/page.tsx;rpc_stub=lib/rpc-generated/src/backend/actions/AdminCategoriesRates.ts (generated)
B04|source_action=src/backend/actions/AdminComplianceChecklist.ts;hook=src/backend/hooks/useAdminComplianceChecklist.ts;view=src/backend/components/AdminComplianceChecklistView.tsx;types=src/backend/types/AdminComplianceChecklist.ts;page_entry=app/(backend)/admincompliancechecklist/page.tsx;rpc_stub=lib/rpc-generated/src/backend/actions/AdminComplianceChecklist.ts (generated)
B05|source_action=src/backend/actions/AdminLogin.ts;hook=src/backend/hooks/useAdminLogin.ts;view=src/backend/components/AdminLoginView.tsx;types=src/backend/types/AdminLogin.ts;page_entry=app/(backend)/adminlogin/page.tsx;rpc_stub=lib/rpc-generated/src/backend/actions/AdminLogin.ts (generated)
B06|source_action=src/backend/actions/AdminRegister.ts;hook=src/backend/hooks/useAdminRegister.ts;view=src/backend/components/AdminRegisterView.tsx;types=src/backend/types/AdminRegister.ts;page_entry=app/(backend)/adminregister/page.tsx;rpc_stub=lib/rpc-generated/src/backend/actions/AdminRegister.ts (generated)

# INFRA_MAP  capability|platform|path|flags  (跨页基础设施,不属于任何单页;列出某路径只表示文件存在,不表示它已挂载/生效——请在 layout/源码里核对)
auth-guard-action|backend|src/backend/action_utils.ts|
auth-guard-action|frontend|src/frontend/action_utils.ts|
auth-guard-route|app|src/tools/AppAuthGuard.tsx|
auth-guard-route|backend|src/tools/BackendAuthGuard.tsx|
auth-guard-route|frontend|src/tools/FrontendAuthGuard.tsx|
auth-ui|app|src/app/auth/rpc-auth.tsx|
auth-ui|backend|src/backend/auth/rpc-auth.tsx|
auth-ui|frontend|src/frontend/auth/rpc-auth.tsx|
navigation-shell|backend|src/components/layout/backend/Sidebar.tsx|
navigation-shell|frontend|src/components/layout/frontend/Footer.tsx|
navigation-shell|frontend|src/components/layout/frontend/Navigation.tsx|
route-registry|backend|src/backend/route-params.ts|
route-registry|frontend|src/frontend/route-params.ts|
session|app|src/tools/AppSession.tsx|
session|backend|src/tools/BackendSession.tsx|
session|frontend|src/tools/FrontendSession.tsx|
thirdparty-infra|*|server/thirdparty/ai-definitions.ts|
thirdparty-infra|*|server/thirdparty/ai/openai-compat.ts|
thirdparty-infra|*|server/thirdparty/auth-definitions.ts|
thirdparty-infra|*|server/thirdparty/auth/AuthState.ts|
thirdparty-infra|*|server/thirdparty/auth/google.route.ts|
thirdparty-infra|*|server/thirdparty/auth/google.ts|
thirdparty-infra|*|server/thirdparty/auth/index.ts|
thirdparty-infra|*|server/thirdparty/common.ts|
thirdparty-infra|*|server/thirdparty/context.ts|
thirdparty-infra|*|server/thirdparty/index.ts|
thirdparty-infra|*|server/thirdparty/payment-definitions.ts|
thirdparty-infra|*|server/thirdparty/payment/alipay.ts|
thirdparty-infra|*|server/thirdparty/payment/amount.ts|
thirdparty-infra|*|server/thirdparty/payment/clink.ts|
thirdparty-infra|*|server/thirdparty/payment/nowpayments.ts|
thirdparty-infra|*|server/thirdparty/payment/stripe.ts|
thirdparty-infra|*|server/thirdparty/secret-resolver.ts|
thirdparty-types|*|src/types/thirdparty.d.ts|

# GENERATED_LAYER  path|regenerated_from  (禁止手改:会被重新生成或仅用于构建,不是 source of truth;@/{platform}/actions/* 解析到这里——请改 src/{platform}/actions/* 而不是这里)
lib/rpc-generated/|gen_rpc, from src/{platform}/actions/*
server-action-generated/|build/migration artifact
prisma-generated/|prisma generate
src/shared-enums.ts|scripts/generate-schema-meta.ts, from prisma/schema.prisma
rsbuild-migration-files/|build/migration artifact
# NOTE  README.md / AGENTS.md 可能残留当前构建已不再使用的过时引用(例如 src/App.generated.tsx、scripts/gen-rpc-fast.mjs)——以源码为准,不要轻信文档。
