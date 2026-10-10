# Known Risks
> Derived guidance - verify against code.

本文档面向负责安全修改代码的维护工程师，梳理系统在状态机流转、权限边界、跨页参数传递、数据完整性及合规约束层面的关键隐患与耦合风险。

---

## 1. 报价工单生命周期与终态锁定风险 (Quote Request Lifecycle & Immutability)

| 风险项 | 涉及实体与字段 | 关联页面 / 路由 | 关键规则与证据 |
| :--- | :--- | :--- | :--- |
| **终态数据防篡改与不可逆性** | `model:QuoteRequest`, `field:QuoteRequest.status` | `page:B01`, `page:B02` (`route:AdminQuoteDetail`) | `evidence:rule.007`, `evidence:state.001.F01.HomeFrontend` |
| **状态机严格单向推进** | `model:QuoteRequest`, `field:QuoteRequest.status` | `page:F01`, `page:F06`, `page:B01` | `evidence:state.001.F01.HomeFrontend` |

### 风险分析与修改指引
1. **COMPLETED 终态锁定约束**：
   - 依据 `evidence:rule.007`，当 `field:QuoteRequest.status` 达到 `COMPLETED` 状态时，工单及施工开票记录即刻锁定，禁止任何后续修改。
   - **修改隐患**：在修改 `page:B02` 的工单保存逻辑或后台更新 API 时，必须在服务端底层添加强校验拦截；若仅在前端禁用表单，直接调用接口可能意外篡改已完工结算的历史工单数据。
2. **状态单向线性跃迁**：
   - 工单生命周期严格遵循单向链条：`NEW` $\rightarrow$ `CONTACTED` $\rightarrow$ `ESTIMATE_SENT` $\rightarrow$ `QUOTED` $\rightarrow$ `SCHEDULED` $\rightarrow$ `COMPLETED`（`evidence:state.001.F01.HomeFrontend`）。
   - **修改隐患**：系统当前未定义逆向回退（如驳回、重新估价）与作废取消状态。如果开发人员在 `page:B01` 或 `page:B02` 引入跳步或状态回滚操作，可能导致下游排程和工匠派工数据不一致。

---

## 2. 跨角色访问控制与多租户数据隔离风险 (RBAC & Data Isolation)

| 风险项 | 涉及实体与字段 | 关联页面 / 路由 | 关键规则与证据 |
| :--- | :--- | :--- | :--- |
| **客户工单越权查询 (IDOR)** | `model:QuoteRequest`, `field:QuoteRequest.customerId`, `field:AccountUser.role` | `page:F07` (`route:CustomerInquiryTracker`) | `evidence:rule.002`, `evidence:rule.007` |
| **合规与费率修改权限外溢** | `model:ServiceCategory`, `model:SetupChecklistItem` | `page:B03`, `page:B04` | `evidence:rule.003`, `evidence:rule.005` |

### 风险分析与修改指引
1. **客户专属工单隔离**：
   - 普通客户仅允许在 `page:F07` 查看关联至自身 `field:AccountUser.id` 的 `model:QuoteRequest` 记录（`evidence:rule.002`, `evidence:rule.007`）。
   - **修改隐患**：工单详情或列表接口若未在服务端严格校验 Session 中的用户身份与 `field:QuoteRequest.customerId` 的一致性，可能造成客户联系方式、家庭详细住址（`address_snippet`）等敏感隐私跨租户泄露。
2. **管理员专属资源保护**：
   - `model:ServiceCategory` 的费率配置与 `model:SetupChecklistItem` 的奥地利商业合规状态仅限具备 `ADMIN` 角色的账户修改（`evidence:rule.003`, `evidence:rule.005`）。
   - **修改隐患**：前端路由守卫虽对 `page:B03` 和 `page:B04` 进行了限制，但若对应的后端接口未核验 `field:AccountUser.role`，可能导致未授权用户篡改全平台起步工时单价。

---

## 3. 行业法规与基准费率硬性约束风险 (Austrian Trade Law & Pricing Constraints)

| 风险项 | 涉及实体与字段 | 关联页面 / 路由 | 关键规则与证据 |
| :--- | :--- | :--- | :--- |
| **最低工时费率下限违规** | `model:ServiceCategory` | `page:B03` (`route:AdminCategoriesRates`) | `evidence:rule.003` |
| **奥地利手工业资质分类混淆** | `model:ServiceCategory`, `field:ServiceCategory.craftClassification` | `page:F04`, `page:B03` | `evidence:rule.003` |

### 风险分析与修改指引
1. **基准工时单价底线校验**：
   - 依据奥地利行业规范，`baseline_hourly_rate` 必须至少为 15 EUR/h（`evidence:rule.003`）。
   - **修改隐患**：在 `page:B03` 调整费率逻辑时，如果移除了最低单价校验或未在服务端设置 $\ge 15$ 的模型校验，可能引发合规性风险与平台定价倒挂。
2. **法律资质分类声明**：
   - 工种必须清晰归类为自由手工业（`FREIES_HANDWERK`）或大师合作资质（`MEISTER_KOOPERATION`）（`evidence:rule.003`）。
   - **修改隐患**：该分类在前台 `page:F04` 用于明确法律责任边界，若变更枚举或映射错误，将导致特许资质工种被误标为免许可项目，触犯奥地利 GewO 1994 法规。

---

## 4. 主数据跨页引用与派工物流依赖 (Master Data & Dispatch Dependencies)

| 风险项 | 涉及实体与字段 | 关联页面 / 路由 | 关键规则与证据 |
| :--- | :--- | :--- | :--- |
| **维也纳分区邮编范围约束** | `model:ViennaDistrict`, `field:QuoteRequest.districtId` | `page:F01`, `page:F05`, `page:F06` | `evidence:rule.004`, `evidence:rule.007` |
| **物流圈层时效调度耦合** | `model:ViennaDistrict`, `field:ViennaDistrict.zone` | `page:F05`, `page:B01` | `evidence:rule.004` |

### 风险分析与修改指引
1. **预置邮区有效性**：
   - `model:ViennaDistrict` 维护 1010 至 1230 维也纳官方邮编分区（`evidence:rule.004`）。
   - **修改隐患**：在 `page:F01` 与 `page:F06` 提交工单时，若前端允许用户自由输入非维也纳有效邮编而未与 `model:ViennaDistrict` 校验外键，会导致后台 `page:B01` 派工时无法计算物流圈层与响应时限。
2. **响应时效依赖物流圈层**：
   - `field:ViennaDistrict.zone`（包括 `INNER_CITY`, `CENTRAL`, `OUTER_RING`, `GREATER_SUBURB`）直接绑定派工标准响应时限 `lead_time_hours`。
   - **修改隐患**：在修改物流区域配置时，若破坏了 `field:ViennaDistrict.zone` 枚举与 `lead_time_hours` 的对应关系，将影响管理员在 `page:B01` 的工单紧急度与调度排程判定。

---

## 5. 跨页面参数传递与路由上下文风险 (Cross-Page Lineage Risks)

| 路由参数 | 关联模型与字段 | 来源页面 $\rightarrow$ 目标页面 | 潜在断裂点 |
| :--- | :--- | :--- | :--- |
| `categoryKey` | `field:ServiceCategory.key` | `page:F02` / `page:F03` $\rightarrow$ `page:F06` | 若参数传递丢失或传入非法 Key，表单未做 Fallback 会导致工种分类无法初始化 |
| `quoteRequestId` | `field:QuoteRequest.id` | `page:B01` $\rightarrow$ `page:B02` | 若 ID 参数未校验或对应工单不存在，详情页加载将抛出空指针异常 |

---

## 6. 待确认风险 (Unknowns)

1. **匿名提交与注册账户的回溯关联机制**：
   - 访客在 `page:F01` 或 `page:F06` 提交工单时 `field:QuoteRequest.customerId` 为空。若该客户随后通过 `page:F09` 注册账号，系统是否会基于 `client_email` 自动回溯关联历史工单尚不明确；若不关联，已提交的工单将无法在 `page:F07` 追踪。
2. **工单主动取消与拒绝路径缺失**：
   - 当前状态机（`evidence:state.001.F01.HomeFrontend`）仅包含从新建到完工的正向流转，未定义客户主动取消或管理员评估后拒绝（`CANCELLED` / `REJECTED`）的分支处理逻辑。在修改业务流程时应确认是否需要补充异常终态。
