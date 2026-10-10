# Flows Reference
> Fact layer - grounded expansion. Verify against code before editing.

## Main Flows

### 1. 客户报价咨询与线索提交流程 (Quote Inquiry Submission Flow)
涵盖访客或注册客户在平台浏览服务项目、查看工艺范围，并发起上门工时报价咨询的完整过程。

- **业务目标与前置条件**：访客（GUEST）或注册客户（CUSTOMER）在前端门户浏览维也纳区域支持的手工装配与翻新服务，选择特定工种并提交工时估算咨询需求。
- **涉及页面与路由**：
  - `page:F01` (`route:HomeFrontend`): 平台主页，提供维也纳手工艺服务概览、初始工时计算器以及快速提交入口。
  - `page:F02` (`route:ServicesCatalog`): 服务目录大厅，展示各类工种（如组装、拆除、涂装、水暖辅助等）的基础费率与任务范畴。
  - `page:F03` (`route:ServiceCategoryDetail`): 单一工种详情页，通过路由参数 `categoryKey` (`field:ServiceCategory.key`) 获取指定手工艺分类的技术范围与法规准入任务。
  - `page:F06` (`route:QuoteRequestForm`): 独立报价申请表单页，接收可选的 `categoryKey` (`field:ServiceCategory.key`) 预选参数。
- **状态流转与数据写入**：
  - 在 `page:F01` 或 `page:F06` 提交表单时，系统创建 `model:QuoteRequest` 记录，初始状态变更规则为 `__create__` $\rightarrow$ `NEW`（引用 `evidence:state.001.F01.HomeFrontend`）。
  - 创建时写入字段包括：联系人基础信息（`client_name`、`client_phone`、`client_email`）、服务类别关联 `field:QuoteRequest.serviceCategoryId`、目标行政区 `field:QuoteRequest.districtId`、预估工时与费用、预约时间段 `field:QuoteRequest.preferredTimeSlot`（枚举值包括 MORNING、AFTERNOON、FLEXIBLE）、提交语种 `field:QuoteRequest.submissionLang`（枚举值包括 DE、EN、RU），以及建筑条件与材料准备标记（`has_materials`）。
  - 若提交者已处于登录态，`field:QuoteRequest.customerId` 关联当前客户的 `field:AccountUser.id`（引用 `evidence:rule.007`）。
- **业务约束与不变量**：
  - 报价申请必须包含有效的客户联系信息、选定的服务分类、合规的维也纳邮编分区（1010 至 1230）以及具体施工任务描述（引用 `evidence:rule.004`、`evidence:rule.007`）。
  - 提交必须包含隐私政策与商业条款的勾选确认。

---

### 2. 客户身份认证与工单追踪流程 (Customer Authentication & Tracking Flow)
处理客户注册、凭据鉴权以及对自己名下维修咨询工单进度的全流程追踪。

- **业务目标与前置条件**：客户通过注册获得系统账号，登录后查阅与自己关联的历史工单处理阶段。
- **涉及页面与路由**：
  - `page:F09` (`route:CustomerRegister`): 客户自主注册页面，录入姓名、邮箱、电话并生成密码哈希，角色分配为 CUSTOMER（`field:AccountUser.role`）。
  - `page:F08` (`route:CustomerLogin`): 客户登录页面，验证邮箱与密码，建立用户凭据会话。
  - `page:F07` (`route:CustomerInquiryTracker`): 客户工单追踪面板，仅允许具备 CUSTOMER 角色的已鉴权用户访问。
- **数据流与权限不变量**：
  - 注册写入 `model:AccountUser`，系统中电子邮箱必须全表唯一（引用 `evidence:rule.002`）。
  - 客户仅能检索与查看自身关联（即 `field:QuoteRequest.customerId` 等于当前登录会话 `field:AccountUser.id`）的 `model:QuoteRequest` 列表及状态（引用 `evidence:rule.002`、`evidence:rule.007`）。
  - `page:F07` 展示工单的当前流转阶段，客户无法直接修改工单状态，仅可实时查看管理员推进的状态及反馈。

---

### 3. 管理员运维控制台与报价生命周期推进流程 (Admin Operations & Quote Processing Flow)
管理员对客户提交的工单进行审查、电话回访、正式报价核定、工期排程直到最终完工归档。

- **业务目标与前置条件**：具备 ADMIN 角色的运维人员登录后台，集中管理维也纳各区维修线索并推进生命周期。
- **涉及页面与路由**：
  - `page:B05` (`route:AdminLogin`) 与 `page:B06` (`route:AdminRegister`): 管理员鉴权与注册入口。
  - `page:B01` (`route:AdminOperationsDashboard`): 运维主控面板，提供线索看板、待处理工单筛选、24小时流入量及响应 SLA 监控。
  - `page:B02` (`route:AdminQuoteDetail`): 工单详情与处理页，通过路由参数 `quoteRequestId` (`field:QuoteRequest.id`) 载入单个工单完整上下文。
- **严格状态机流转**（依据 `evidence:state.001.F01.HomeFrontend`）：
  1. `NEW` $\rightarrow$ `CONTACTED`: 运维人员在后台完成客户初次电话沟通与现场情况核实。
  2. `CONTACTED` $\rightarrow$ `ESTIMATE_SENT`: 运维人员完成工时与材料核算，向客户发送正式约束性估算邮件。
  3. `ESTIMATE_SENT` $\rightarrow$ `QUOTED`: 客户确认接受该约束性工时费率与工期方案。
  4. `QUOTED` $\rightarrow$ `SCHEDULED`: 运维人员在工程排期日历中指派工匠团队并确定上门时间。
  5. `SCHEDULED` $\rightarrow$ `COMPLETED`: 现场装配/施工完毕并完成最终验收开票。
- **不可变规则与生命周期锁定**：
  - 当 `field:QuoteRequest.status` 流转至 COMPLETED 后，工单与施工记录即刻进入锁定状态，禁止任何后续修改与状态回滚（引用 `evidence:rule.007`）。
  - 仅管理员角色拥有推进生命周期各状态的权限。

---

### 4. 服务品类与工时基准费率管理流程 (Admin Service Categories & Rates Configuration Flow)
平台工种分类维护、工时计费基准调整及奥地利行业资质归类管理。

- **业务目标与前置条件**：平台运维人员根据奥地利工商业法规（GewO 1994）要求，调整各项服务的起步小时单价及合作工匠团队。
- **涉及页面与路由**：
  - `page:B01` (`route:AdminOperationsDashboard`): 运维汇总页面，展示当前激活工种分类及费率概览。
  - `page:B03` (`route:AdminCategoriesRates`): 工种与费率专向管理页，执行具体的费率配置与资质绑定。
- **实体约束与业务规则**：
  - 修改与维护 `model:ServiceCategory`，仅限 ADMIN 权限操作（引用 `evidence:rule.003`）。
  - 起步基准工时单价 `baseline_hourly_rate` 存在硬性底线约束：依据奥地利行业指导标准，单价不得低于 15 EUR/h（引用 `evidence:rule.003`、`evidence:flow.003.F01.HomeFrontend`）。
  - 工种必须在 `field:ServiceCategory.craftClassification` 中明确标识法律资质边界：区分自由手工业 `FREIES_HANDWERK` 与需持牌师傅执照或大师合作资质的 `MEISTER_KOOPERATION`（引用 `evidence:rule.003`、`evidence:flow.010.B01.AdminOperationsDashboard`）。

---

### 5. 商业合规清单审查与法定资质追踪流程 (Business Compliance Checklist Management Flow)
奥地利当地企业设立合规项（税号、法定地址、营业时间等）的审计与更新。

- **业务目标与前置条件**：管理员持续监控企业合规要件的审核进度，确保平台展示信息符合奥地利法定商业登记要求。
- **涉及页面与路由**：
  - `page:B01` (`route:AdminOperationsDashboard`): 监控合规清单未完成项预警。
  - `page:B04` (`route:AdminComplianceChecklist`): 合规清单专向管理页。
- **实体数据与状态变更**：
  - 管理模型 `model:SetupChecklistItem`。
  - 条目键名 `field:SetupChecklistItem.itemKey` 涵盖法定核心要素：增值税号 `VAT_UID`、官方联络方式 `OFFICIAL_CONTACT`、商业注册地址 `REGISTERED_ADDRESS` 以及法定营业时间 `OPERATING_HOURS`。
  - 合规审查状态 `field:SetupChecklistItem.status` 支持在 PENDING、IN_REVIEW、COMPLETED 三种枚举状态间流转，并记录审查时间戳与奥地利法规出处引用（如 UStG 第27条）（引用 `evidence:rule.005`）。

---

### 6. 前台公共信息与维也纳配送区域查阅流程 (Public Services, Legal Scope & District Areas Flow)
公众访客查阅工种范围、维也纳各区物流覆盖与常见问答。

- **涉及页面与路由**：
  - `page:F04` (`route:PricingScope`): 展示透明计费规则、材料垫付说明以及奥地利 GewO 法规下自由手工业与特许大师工种的法律边界；集成 `model:FaqItem`（涵盖 PRICING、SCOPE、SCHEDULING、MATERIALS 类别，引用 `evidence:rule.006`）。
  - `page:F05` (`route:ServiceAreas`): 维也纳 1010 至 1230 共 23 个行政区及下奥地利周边覆盖图，展示由 `model:ViennaDistrict` 维护的物流区域划分（`field:ViennaDistrict.zone` 包括 INNER_CITY、CENTRAL、OUTER_RING、GREATER_SUBURB）及标准响应响应时长（`lead_time_hours`，引用 `evidence:rule.004`）。
- **用户行为路径**：
  - 访客在 `page:F04` 或 `page:F05` 确认服务资质与所在区域覆盖后，可直接点击跳转至 `page:F06` 发起工时咨询。

---

## Cross-Page Lineage

下表列出跨页面流转中传递的路由参数、绑定的数据模型字段以及上下文约束：

| 起始页面 | 目标页面 | 传递参数与凭证 | 关联模型与字段 | 语义说明与生命周期不变量 |
| :--- | :--- | :--- | :--- | :--- |
| `page:F02` / `page:F01` | `page:F03` | `categoryKey` | `field:ServiceCategory.key` | 从服务目录进入特定工种详情，指定展示该工种的费率与允许作业范围 |
| `page:F02` / `page:F03` | `page:F06` | `categoryKey` | `field:ServiceCategory.key` | 预选服务分类并带入独立报价申请表单，作为创建 `model:QuoteRequest` 的默认值 |
| `page:F08` / `page:F09` | `page:F07` | 会话凭据 (Session/Token) | `field:AccountUser.id` | 客户成功登录后，追踪页利用当前会话用户 ID 查询关联的 `field:QuoteRequest.customerId` |
| `page:B01` | `page:B02` | `quoteRequestId` | `field:QuoteRequest.id` | 管理员从运维看板列表跳转至具体工单详情，载入工单全量属性并提供状态流转操作 |
| `page:B01` | `page:B03` | 无显式参数 | `model:ServiceCategory` | 从主控制台跳转至工种费率配置面板，全量加载 `model:ServiceCategory` 列表供修改 |
| `page:B01` | `page:B04` | 无显式参数 | `model:SetupChecklistItem` | 从主控制台跳转至企业合规清单，全量加载奥地利合规条目供审核更新 |

### 关键跨页实体数据血缘与状态传递说明

1. **工单线索生成到后台履约链路**：
   - 在 `page:F01` 或 `page:F06` 提交表单后，系统持久化 `model:QuoteRequest`，生成全局唯一 ID 与人类可读的跟踪号（`tracking_code`）。
   - 该记录即时体现在 `page:B01` 的工单流入指标与待处理列表中。
   - 管理员通过点击工单进入 `page:B02`（传递 `quoteRequestId`），在 `page:B02` 或 `page:B01` 执行状态变更，状态机严格按序推进：
     $$\text{NEW} \longrightarrow \text{CONTACTED} \longrightarrow \text{ESTIMATE_SENT} \longrightarrow \text{QUOTED} \longrightarrow \text{SCHEDULED} \longrightarrow \text{COMPLETED}$$
   - 一旦管理员将状态置为 COMPLETED，整条工单记录被锁定，禁止进一步修改。

2. **多语言与行政区分派血缘**：
   - 客户在 `page:F06` 选择的行政区直接解析为 `model:ViennaDistrict` 外键引用 `field:QuoteRequest.districtId`。
   - 该区所属的物流分区 `field:ViennaDistrict.zone`（INNER_CITY 至 GREATER_SUBURB）决定了该工单在后台运维派工时的响应窗口（`lead_time_hours`）优先级。
   - 提交语言 `field:QuoteRequest.submissionLang` 记录用户使用的界面语言（DE、EN 或 RU），并在 `page:B02` 展示，供管理员用相应语言回访与编制正式报价单。

---

## Unknowns

1. **前后端接口动作映射 (Action Mapping)**：
   - 在提供的 `IMPLEMENTATION_MAP` 中，`ACTION_MAP` 当前提取结果为空行（`COUNTS actions=0`）。具体的 API 接口名称、入参验证 schema、HTTP 谓词（RESTful 路径或 RPC 契约）以及具体的 Controller/Service 方法切分无法从静态地图直接断言，修改涉及具体接口调用的代码时需核对服务端路由实现文件。
2. **客户侧在线确认报价的显式交互路径**：
   - 状态流转规则定义了 `ESTIMATE_SENT` $\rightarrow$ `QUOTED` 为“客户接受约束性报价”（Client accepts binding quote rate），但在 `evidence:state.001.F01.HomeFrontend` 中该流转动作记录的执行发生位置标注在 `page:B01`（管理员主控台）。客户是否可在 `page:F07` 在线点击确认报价，抑或仅能通过邮件/电话线下确认后由管理员在后台代录入，需结合前端代码逻辑进一步核验。
3. **支付网关与结算集成状态**：
   - 项目元数据中包含支付基础设施文件定义（Stripe、NowPayments、Alipay 等），但未提取出已实现的支付订单模型或在线结算闭环动作。当前报价流程在完成施工后状态即止于 COMPLETED 并开具发票，线上即时扣款或押金冻结流程尚属未声明状态。
