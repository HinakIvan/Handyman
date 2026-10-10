# Change Recipes
> Derived guidance - project-specific coordinates. Use skills for HOW. Verify against code.

本文件只给当前项目的结构变更影响面。通用执行流程仍读取 `major-update` / `code-modification` / `thirdparty-integration` 等 Skill。
本文件由确定性工程抽取生成；空列表只表示抽取层未发现证据，不等于能力不存在或无需回源码验证。

## Schema Change Impact
- 改表/字段前先用本节确定影响面，再按需加载 `code-modification` 或 `major-update` 获取 HOW。
- 读法: pages_* 是源码侧页面读写; req_* 是需求清单 page_data_from/page_data_write; actions_* 是 action 读写; status_writes 是确定性状态写入; routes 是该 model 字段作为 route param 的入口。

### Table Impact Cards
- model:AccountUser: pages_read=-; pages_write=-; req_from=page:F01,page:F06,page:F08,page:F09,page:B02,page:B05,page:B06; req_write=-; actions_read=-; actions_write=-; status_writes=-; routes=-; domain=-; linked_fields=field:AccountUser.quoteRequests(QuoteRequest),model:QuoteRequest
- model:FaqItem: pages_read=-; pages_write=-; req_from=page:F01,page:F04; req_write=-; actions_read=-; actions_write=-; status_writes=-; routes=-; domain=-; linked_fields=-
- model:QuoteRequest: pages_read=-; pages_write=-; req_from=page:F01,page:F06,page:F07,page:B01,page:B02; req_write=-; actions_read=-; actions_write=-; status_writes=-; routes=route:AdminQuoteDetail; domain=-; linked_fields=field:QuoteRequest.customerId(AccountUser),field:QuoteRequest.customer(AccountUser),field:QuoteRequest.serviceCategoryId(ServiceCategory),field:QuoteRequest.serviceCategory(ServiceCategory),field:QuoteRequest.districtId(ViennaDistrict),field:QuoteRequest.district(ViennaDistrict),model:AccountUser,model:ServiceCategory,+1
- model:ServiceCategory: pages_read=-; pages_write=-; req_from=page:F01,page:F02,page:F03,page:F04,page:F06,page:F07,page:B01,page:B02,+1; req_write=-; actions_read=-; actions_write=-; status_writes=-; routes=route:QuoteRequestForm,route:ServiceCategoryDetail; domain=-; linked_fields=field:ServiceCategory.quoteRequests(QuoteRequest),model:QuoteRequest
- model:SetupChecklistItem: pages_read=-; pages_write=-; req_from=page:B01,page:B04; req_write=-; actions_read=-; actions_write=-; status_writes=-; routes=-; domain=-; linked_fields=-
- model:ViennaDistrict: pages_read=-; pages_write=-; req_from=page:F01,page:F05,page:F06,page:F07,page:B01,page:B02; req_write=-; actions_read=-; actions_write=-; status_writes=-; routes=-; domain=-; linked_fields=field:ViennaDistrict.quoteRequests(QuoteRequest),model:QuoteRequest

## Global Write Targets
- 本节只列容易 last-write-wins 的全局/共享写目标，供 Architect 设置 depends_on 或 concurrency_key；不是执行 HOW。
- canonical keys: requirement_list / route_params_<platform> / nav_<platform> / shared_file:<path>。

### Canonical Locks
- requirement_list: target=WebArthitectureInfo/page registry/meta/style/layout; tools=modify_requirement_pages,update_requirement_meta,batch_update_page_prisma_needs,restyle_generate; concurrency_key=requirement_list
- route_params_backend: target=src/backend/route-params.ts; capability=route-registry; concurrency_key=route_params_backend
- route_params_frontend: target=src/frontend/route-params.ts; capability=route-registry; concurrency_key=route_params_frontend
- nav_backend: target=src/components/layout/backend/Sidebar.tsx; capability=navigation-shell; concurrency_key=nav_backend
- nav_frontend: target=src/components/layout/frontend/Footer.tsx; capability=navigation-shell; concurrency_key=nav_frontend
- nav_frontend: target=src/components/layout/frontend/Navigation.tsx; capability=navigation-shell; concurrency_key=nav_frontend

## Shared/Component Impact
- 改公共组件/shared/layout 前先看 used_by_pages；这里来自源码 import 图，不来自命名约定。
- 读法: file 是被 import 的共享文件；used_by_pages 是直接或经 barrel 展开的页面引用；source_files 是页面内触发 import 的源码文件；本节隐藏 shadcn/ui、@base、session/tools 等 no-touch 底座文件。

### Shared/Component Impact Cards
- 只抽取到 shadcn/ui、@base、session/tools 等底座 import；本节不列这些 no-touch 文件。

## Page Lifecycle Changes
- 项目已有 platforms=backend,frontend；新增页面只能落在已有 platform，通用流程仍看 `major-update`。
- next_page_id_candidates=backend:B07;frontend:F10
- route/nav shared coords=src/components/layout/backend/Sidebar.tsx;src/components/layout/frontend/Footer.tsx;src/components/layout/frontend/Navigation.tsx;src/backend/route-params.ts;src/frontend/route-params.ts

### Add Page Preflight
- 新增页面前先确认 platform、page id、相似页面格式、数据表复用/新建、route/nav/shared layout 坐标；具体 FC 顺序仍看 `major-update` / `requirement-list-modification`。
- 数据型页面不要只加 view；先确认 page_data_from/page_data_write 与 schema/action 影响面。纯静态页面也要确认 route/nav/entry 是否需要挂载。
- similar_page_candidates=backend:page:B01(AdminOperationsDashboard),backend:page:B02(AdminQuoteDetail),backend:page:B06(AdminRegister),frontend:page:F01(HomeFrontend),frontend:page:F06(QuoteRequestForm),frontend:page:F07(CustomerInquiryTracker)

### Delete Or Restore Preflight
- 删除/恢复页面先看 upstream/downstream、route/nav shared coords、entry/layout 引用和页面文件；删除通常是清 reachability，不默认物理删除页面代码或 route 定义。
- 恢复页面优先确认旧页面文件是否仍存在，再恢复 requirement/flowchart/layout/navigation 引用；不要把恢复误当全新页面生成。

### Cross-Page Hotspots
- cross_page_pages=page:F01(HomeFrontend;up=0;down=0;rules=6),page:B01(AdminOperationsDashboard;up=0;down=0;rules=5),page:F03(ServiceCategoryDetail;up=0;down=0;rules=2),page:F04(PricingScope;up=0;down=0;rules=2),page:F06(QuoteRequestForm;up=0;down=0;rules=2),page:B02(AdminQuoteDetail;up=0;down=0;rules=1),page:B03(AdminCategoriesRates;up=0;down=0;rules=1),page:B04(AdminComplianceChecklist;up=0;down=0;rules=1),page:B05(AdminLogin;up=0;down=0;rules=1),page:B06(AdminRegister;up=0;down=0;rules=1),page:F02(ServicesCatalog;up=0;down=0;rules=1),page:F05(ServiceAreas;up=0;down=0;rules=1)

### Page Coordinates And Rules
- page:F01 frontend/HomeFrontend: auth=GUEST,CUSTOMER; models=AccountUser,FaqItem,QuoteRequest,ServiceCategory,ViennaDistrict; rules=evidence:flow.002.F01.HomeFrontend,evidence:flow.003.F01.HomeFrontend,evidence:flow.004.F01.HomeFrontend,evidence:flow.005.F01.HomeFrontend,evidence:flow.008.F01.HomeFrontend,evidence:state.001.F01.HomeFrontend; route=route:HomeFrontend; upstream=-; downstream=-; files=source_action=src/frontend/actions/HomeFrontend.ts;hook=src/frontend/hooks/useHomeFrontend.ts;view=src/frontend/components/HomeFrontendView.tsx;types=src/frontend/types/HomeFrontend.ts
- page:F02 frontend/ServicesCatalog: auth=GUEST,CUSTOMER; models=ServiceCategory; rules=evidence:flow.002.F01.HomeFrontend; route=route:ServicesCatalog; upstream=-; downstream=-; files=source_action=src/frontend/actions/ServicesCatalog.ts;hook=src/frontend/hooks/useServicesCatalog.ts;view=src/frontend/components/ServicesCatalogView.tsx;page_entry=app/(frontend)/servicescatalog/page.tsx;types=src/frontend/types/ServicesCatalog.ts
- page:F03 frontend/ServiceCategoryDetail: auth=GUEST,CUSTOMER; models=ServiceCategory; rules=evidence:flow.002.F01.HomeFrontend,evidence:flow.008.F01.HomeFrontend; route=route:ServiceCategoryDetail; upstream=-; downstream=-; files=source_action=src/frontend/actions/ServiceCategoryDetail.ts;hook=src/frontend/hooks/useServiceCategoryDetail.ts;view=src/frontend/components/ServiceCategoryDetailView.tsx;page_entry=app/(frontend)/servicecategorydetail/page.tsx;types=src/frontend/types/ServiceCategoryDetail.ts
- page:F04 frontend/PricingScope: auth=GUEST,CUSTOMER; models=FaqItem,ServiceCategory; rules=evidence:flow.003.F01.HomeFrontend,evidence:flow.005.F01.HomeFrontend; route=route:PricingScope; upstream=-; downstream=-; files=source_action=src/frontend/actions/PricingScope.ts;hook=src/frontend/hooks/usePricingScope.ts;view=src/frontend/components/PricingScopeView.tsx;page_entry=app/(frontend)/pricingscope/page.tsx;types=src/frontend/types/PricingScope.ts
- page:F05 frontend/ServiceAreas: auth=GUEST,CUSTOMER; models=ViennaDistrict; rules=evidence:flow.004.F01.HomeFrontend; route=route:ServiceAreas; upstream=-; downstream=-; files=source_action=src/frontend/actions/ServiceAreas.ts;hook=src/frontend/hooks/useServiceAreas.ts;view=src/frontend/components/ServiceAreasView.tsx;page_entry=app/(frontend)/serviceareas/page.tsx;types=src/frontend/types/ServiceAreas.ts
- page:F06 frontend/QuoteRequestForm: auth=GUEST,CUSTOMER; models=AccountUser,QuoteRequest,ServiceCategory,ViennaDistrict; rules=evidence:flow.008.F01.HomeFrontend,evidence:state.001.F01.HomeFrontend; route=route:QuoteRequestForm; upstream=-; downstream=-; files=source_action=src/frontend/actions/QuoteRequestForm.ts;hook=src/frontend/hooks/useQuoteRequestForm.ts;view=src/frontend/components/QuoteRequestFormView.tsx;page_entry=app/(frontend)/quoterequestform/page.tsx;types=src/frontend/types/QuoteRequestForm.ts
- page:F07 frontend/CustomerInquiryTracker: auth=CUSTOMER; models=QuoteRequest,ServiceCategory,ViennaDistrict; rules=evidence:flow.009.F07.CustomerInquiryTracker; route=route:CustomerInquiryTracker; upstream=-; downstream=-; files=source_action=src/frontend/actions/CustomerInquiryTracker.ts;hook=src/frontend/hooks/useCustomerInquiryTracker.ts;view=src/frontend/components/CustomerInquiryTrackerView.tsx;page_entry=app/(frontend)/customerinquirytracker/page.tsx;types=src/frontend/types/CustomerInquiryTracker.ts
- page:F08 frontend/CustomerLogin: auth=-; models=AccountUser; rules=evidence:flow.006.F08.CustomerLogin; route=route:CustomerLogin; upstream=-; downstream=-; files=source_action=src/frontend/actions/CustomerLogin.ts;hook=src/frontend/hooks/useCustomerLogin.ts;view=src/frontend/components/CustomerLoginView.tsx;page_entry=app/(frontend)/customerlogin/page.tsx;types=src/frontend/types/CustomerLogin.ts
- page:F09 frontend/CustomerRegister: auth=-; models=AccountUser; rules=evidence:flow.006.F08.CustomerLogin; route=route:CustomerRegister; upstream=-; downstream=-; files=source_action=src/frontend/actions/CustomerRegister.ts;hook=src/frontend/hooks/useCustomerRegister.ts;view=src/frontend/components/CustomerRegisterView.tsx;page_entry=app/(frontend)/customerregister/page.tsx;types=src/frontend/types/CustomerRegister.ts
- page:B01 backend/AdminOperationsDashboard: auth=ADMIN; models=QuoteRequest,ServiceCategory,SetupChecklistItem,ViennaDistrict; rules=evidence:flow.010.B01.AdminOperationsDashboard,evidence:flow.011.B01.AdminOperationsDashboard,evidence:flow.012.B01.AdminOperationsDashboard,evidence:flow.013.B01.AdminOperationsDashboard,evidence:state.001.F01.HomeFrontend; route=route:AdminOperationsDashboard; upstream=-; downstream=-; files=source_action=src/backend/actions/AdminOperationsDashboard.ts;hook=src/backend/hooks/useAdminOperationsDashboard.ts;view=src/backend/components/AdminOperationsDashboardView.tsx;page_entry=app/(backend)/adminoperationsdashboard/page.tsx;types=src/backend/types/AdminOperationsDashboard.ts
- page:B02 backend/AdminQuoteDetail: auth=ADMIN; models=AccountUser,QuoteRequest,ServiceCategory,ViennaDistrict; rules=evidence:flow.010.B01.AdminOperationsDashboard; route=route:AdminQuoteDetail; upstream=-; downstream=-; files=source_action=src/backend/actions/AdminQuoteDetail.ts;hook=src/backend/hooks/useAdminQuoteDetail.ts;view=src/backend/components/AdminQuoteDetailView.tsx;page_entry=app/(backend)/adminquotedetail/page.tsx;types=src/backend/types/AdminQuoteDetail.ts
- page:B03 backend/AdminCategoriesRates: auth=ADMIN; models=ServiceCategory; rules=evidence:flow.011.B01.AdminOperationsDashboard; route=route:AdminCategoriesRates; upstream=-; downstream=-; files=source_action=src/backend/actions/AdminCategoriesRates.ts;hook=src/backend/hooks/useAdminCategoriesRates.ts;view=src/backend/components/AdminCategoriesRatesView.tsx;page_entry=app/(backend)/admincategoriesrates/page.tsx;types=src/backend/types/AdminCategoriesRates.ts
- page:B04 backend/AdminComplianceChecklist: auth=ADMIN; models=SetupChecklistItem; rules=evidence:flow.012.B01.AdminOperationsDashboard; route=route:AdminComplianceChecklist; upstream=-; downstream=-; files=source_action=src/backend/actions/AdminComplianceChecklist.ts;hook=src/backend/hooks/useAdminComplianceChecklist.ts;view=src/backend/components/AdminComplianceChecklistView.tsx;page_entry=app/(backend)/admincompliancechecklist/page.tsx;types=src/backend/types/AdminComplianceChecklist.ts
- page:B05 backend/AdminLogin: auth=-; models=AccountUser; rules=evidence:flow.007.B05.AdminLogin; route=route:AdminLogin; upstream=-; downstream=-; files=source_action=src/backend/actions/AdminLogin.ts;hook=src/backend/hooks/useAdminLogin.ts;view=src/backend/components/AdminLoginView.tsx;page_entry=app/(backend)/adminlogin/page.tsx;types=src/backend/types/AdminLogin.ts
- page:B06 backend/AdminRegister: auth=-; models=AccountUser; rules=evidence:flow.007.B05.AdminLogin; route=route:AdminRegister; upstream=-; downstream=-; files=source_action=src/backend/actions/AdminRegister.ts;hook=src/backend/hooks/useAdminRegister.ts;view=src/backend/components/AdminRegisterView.tsx;page_entry=app/(backend)/adminregister/page.tsx;types=src/backend/types/AdminRegister.ts

## Role And Auth Changes
- 新增/修改角色时，本节只给项目坐标；enum 追加、Session、默认账号等 HOW 仍看 `major-update` / `auth-initialization`。
- role_fields=field:AccountUser.role=CUSTOMER,ADMIN
- auth_pages=page:F01(GUEST,CUSTOMER),page:F02(GUEST,CUSTOMER),page:F03(GUEST,CUSTOMER),page:F04(GUEST,CUSTOMER),page:F05(GUEST,CUSTOMER),page:F06(GUEST,CUSTOMER),page:F07(CUSTOMER),page:B01(ADMIN),page:B02(ADMIN),page:B03(ADMIN),page:B04(ADMIN)
- auth_infra=auth-guard-action=src/backend/action_utils.ts;auth-guard-action=src/frontend/action_utils.ts;auth-guard-route=src/tools/AppAuthGuard.tsx;auth-guard-route=src/tools/BackendAuthGuard.tsx;auth-guard-route=src/tools/FrontendAuthGuard.tsx;auth-ui=src/app/auth/rpc-auth.tsx;auth-ui=src/backend/auth/rpc-auth.tsx;auth-ui=src/frontend/auth/rpc-auth.tsx;session=src/tools/AppSession.tsx;session=src/tools/BackendSession.tsx;session=src/tools/FrontendSession.tsx
- role actions: 未从 action wrapper 中抽取到角色约束；空不等于 public，需读源码确认。

## Thirdparty Integration Touchpoints
- 第三方真实接入/关闭的 HOW 仍看 `thirdparty-integration` 及 provider 子 Skill；本节只列当前项目触点。

### Provider Capability Boundary
- 本卡是平台官方支持的真实接入白名单；项目里存在 `server/thirdparty` 目录不等于任意 provider 都能真实接入。
- supported.auth: 仅 Google OAuth；其它 OAuth provider 按 unsupported 处理，不要手搓真实接入。
- supported.payment: 仅 Stripe / Clink，且同一项目同一时间只能有 1 个 active payment provider；替换前按 `thirdparty-payment` Skill 做用户确认。
- unsupported.*: 不在白名单的 provider 不能因为 `server/thirdparty` 存在就规划真实接入；非支付类可拆 UI/表单/数据存储并用模拟实现且在交付里标注，支付类按 Skill 追问或等待平台支持决策，禁止默认回退 Stripe/Clink。

### Project Touchpoints
- configured_pages=-
- thirdparty_infra=thirdparty-infra=server/thirdparty/ai-definitions.ts;thirdparty-infra=server/thirdparty/ai/openai-compat.ts;thirdparty-infra=server/thirdparty/auth-definitions.ts;thirdparty-infra=server/thirdparty/auth/AuthState.ts;thirdparty-infra=server/thirdparty/auth/google.route.ts;thirdparty-infra=server/thirdparty/auth/google.ts;thirdparty-infra=server/thirdparty/auth/index.ts;thirdparty-infra=server/thirdparty/common.ts;thirdparty-infra=server/thirdparty/context.ts;thirdparty-infra=server/thirdparty/index.ts;thirdparty-infra=server/thirdparty/payment-definitions.ts;thirdparty-infra=server/thirdparty/payment/alipay.ts;thirdparty-infra=server/thirdparty/payment/amount.ts;thirdparty-infra=server/thirdparty/payment/clink.ts;thirdparty-infra=server/thirdparty/payment/nowpayments.ts;thirdparty-infra=server/thirdparty/payment/stripe.ts;thirdparty-infra=server/thirdparty/secret-resolver.ts;thirdparty-types=src/types/thirdparty.d.ts
- candidate_payment_objects=model:ServiceCategory,page:F01,page:F02,page:F03,page:F04,page:F05,page:F06,page:F07,page:B01,page:B02,page:B03

## Planning Shortcuts
- 本节给 Architect 拆 DAG 的骨架，具体工具顺序、patch 规范、provider 接入仍读 Skill。

### Common DAG Skeletons
- schema_or_field_change: requirement_list/meta -> schema/action owner -> impacted pages from Schema Change Impact -> seed/mock if needed -> QA.
- add_page_or_restore_page: requirement_list -> route_params/nav target -> page implementation -> source page linkages -> QA.
- role_or_auth_change: role enum/session/default account/auth guard -> gated pages/actions -> login/redirect behavior -> QA.
- thirdparty_change: product/provider decision -> project integration touchpoints -> target page/action wiring -> secrets/runtime verification -> QA.
- shared_or_layout_change: shared/layout file task -> imported pages from Shared/Component Impact -> targeted QA; pages not importing the file stay parallel.

### Project Signals
- platforms=backend;frontend
- models=6; pages=15; actions=0; routes=15
- route_targets=src/backend/route-params.ts;src/frontend/route-params.ts
- nav_targets=src/components/layout/backend/Sidebar.tsx;src/components/layout/frontend/Footer.tsx;src/components/layout/frontend/Navigation.tsx
- thirdparty_targets=server/thirdparty/ai-definitions.ts;server/thirdparty/ai/openai-compat.ts;server/thirdparty/auth-definitions.ts;server/thirdparty/auth/AuthState.ts;server/thirdparty/auth/google.route.ts;server/thirdparty/auth/google.ts;server/thirdparty/auth/index.ts;server/thirdparty/common.ts;server/thirdparty/context.ts;server/thirdparty/index.ts;server/thirdparty/payment-definitions.ts;server/thirdparty/payment/alipay.ts,+6
- shared_file_targets=0

## Freshness And Confidence
- change-recipes / implementation-map / indexes 是确定性工程抽取；flows/domain/playbooks/risks/SPEC 入口含 AI 语义层。
- 空的 pages/actions/routes/infra 列表只表示抽取未发现证据，不是能力不存在的证明；仍需回源码验证。
- extraction_warnings=-

## Unknowns
- active payment/OAuth/AI provider、secret 配置和平台集成状态不在 EvidencePack 内；以 warm context 的项目集成状态和平台记录为准。
- 默认账号、密码哈希策略、登录是否允许新角色不在静态抽取内；新增角色前必须读登录 action 与默认账号工具返回。
- 本文件是生成时快照，结构变更前后都要回源码确认。

### Engineering Risk Shortcuts
- generated_layers=lib/rpc-generated/;server-action-generated/;prisma-generated/;src/shared-enums.ts;rsbuild-migration-files/；这些是生成/构建产物或会被重生成的层，默认不要手改。
- read_only_infra=-
- state_transition_hotspots=-
- page_rule_hotspots=page:F01(HomeFrontend;auth=GUEST,CUSTOMER;rules=6),page:F02(ServicesCatalog;auth=GUEST,CUSTOMER;rules=1),page:F03(ServiceCategoryDetail;auth=GUEST,CUSTOMER;rules=2),page:F04(PricingScope;auth=GUEST,CUSTOMER;rules=2),page:F05(ServiceAreas;auth=GUEST,CUSTOMER;rules=1),page:F06(QuoteRequestForm;auth=GUEST,CUSTOMER;rules=2),page:F07(CustomerInquiryTracker;auth=CUSTOMER;rules=1),page:F08(CustomerLogin;auth=-;rules=1),page:F09(CustomerRegister;auth=-;rules=1),page:B01(AdminOperationsDashboard;auth=ADMIN;rules=5),page:B02(AdminQuoteDetail;auth=ADMIN;rules=1),page:B03(AdminCategoriesRates;auth=ADMIN;rules=1),+3
