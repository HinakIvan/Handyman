# Update Playbooks
> Derived guidance - verify against code.

本指南为维护与演进代码的工程师提供高频业务修改场景的导航入口、关联数据模型与不可变规则核查清单。在执行具体修改前，请结合代码实现确认入口点与依赖影响。

---

## 常见改动场景导航表 (Common Modification Playbooks)

| 改动场景 | 核心前端/后台页面 | 关联模型与字段 | 核心约束与规则引用 |
| :--- | :--- | :--- | :--- |
| **1. 调整报价申请提交逻辑与字段校验** | `page:F01`, `page:F06` | `model:QuoteRequest`, `field:QuoteRequest.serviceCategoryId`, `field:QuoteRequest.districtId`, `field:QuoteRequest.preferredTimeSlot`, `field:QuoteRequest.submissionLang` | 必须校验维也纳邮编（1010 至 1230）与联系方式（`evidence:rule.004`, `evidence:rule.007`）；新建状态必须为 NEW（`evidence:state.001.F01.HomeFrontend`）。 |
| **2. 修改工单生命周期与状态推进流转** | `page:B01`, `page:B02`, `page:F07` | `model:QuoteRequest`, `field:QuoteRequest.status`, `field:QuoteRequest.customerId` | 严格遵循单向状态机：NEW $\rightarrow$ CONTACTED $\rightarrow$ ESTIMATE_SENT $\rightarrow$ QUOTED $\rightarrow$ SCHEDULED $\rightarrow$ COMPLETED（`evidence:state.001.F01.HomeFrontend`）；COMPLETED 为不可逆锁定终态（`evidence:rule.007`）。 |
| **3. 变更工种分类、费率标准与法律资质** | `page:B03`, `page:B01`, `page:F02`, `page:F03` | `model:ServiceCategory`, `field:ServiceCategory.key`, `field:ServiceCategory.craftClassification` | 起步工时单价存在硬性底线（不得低于 15 EUR/h，`evidence:rule.003`, `evidence:flow.003.F01.HomeFrontend`）；资质必须合规标注为 FREIES_HANDWERK 或 MEISTER_KOOPERATION（`evidence:rule.003`, `evidence:flow.010.B01.AdminOperationsDashboard`）。 |
| **4. 调整账户鉴权与客户工单隔离权限** | `page:F07`, `page:F08`, `page:F09`, `page:B05`, `page:B06` | `model:AccountUser`, `field:AccountUser.role`, `field:QuoteRequest.customerId` | 邮箱必须全局唯一（`evidence:rule.002`）；客户（CUSTOMER 角色）仅能查询与自身 `field:AccountUser.id` 绑定的工单（`evidence:rule.002`, `evidence:rule.007`）。 |
| **5. 维也纳行政区分区与派工物流时效维护** | `page:F05`, `page:F01`, `page:F06` | `model:ViennaDistrict`, `field:ViennaDistrict.zone`, `field:QuoteRequest.districtId` | 覆盖维也纳 23 个行政分区（1010-1230）与外围圈层（`evidence:rule.004`）；修改时需同步维护各区域派工响应窗口。 |
| **6. 企业商业合规清单与资质条目审查** | `page:B04`, `page:B01` | `model:SetupChecklistItem`, `field:SetupChecklistItem.itemKey`, `field:SetupChecklistItem.status` | 维护增值税号、法定地址等要件，状态仅限 ADMIN 推进核验（PENDING, IN_REVIEW, COMPLETED）（`evidence:rule.005`）。 |
| **7. 常见问题与法律政策说明维护** | `page:F04`, `page:F01` | `model:FaqItem`, `field:FaqItem.category` | 涉及定价、工种范畴、调度与材料政策的分类展示（`evidence:rule.006`）。 |

---

## Playbook 详情与检查清单

### 1. 修改工单询价与提交逻辑 (Quote Inquiry Modification)
- **改动入口导航**：
  - 前端入口：检查 `page:F01` (`route:HomeFrontend`) 与 `page:F06` (`route:QuoteRequestForm`) 中的表单提交逻辑与参数接收（如路由参数 `categoryKey`，对应 `field:ServiceCategory.key`）。
  - 数据模型：检查 `model:QuoteRequest` 对应字段写入定义。
- **不变量与依赖核查**：
  - 初始状态必须为 NEW（`evidence:state.001.F01.HomeFrontend`）。
  - 必须绑定合规的行政区 `field:QuoteRequest.districtId`（外键关联 `model:ViennaDistrict`）及有效联系方式（`evidence:rule.004`, `evidence:rule.007`）。
  - 若用户处于登录态，须关联 `field:QuoteRequest.customerId`（`evidence:rule.007`）。

### 2. 演进工单生命周期与审批状态 (Quote Lifecycle Transition)
- **改动入口导航**：
  - 后台主控台：检查 `page:B01` (`route:AdminOperationsDashboard`) 列表批量动作与工单流转逻辑。
  - 工单详情页：检查 `page:B02` (`route:AdminQuoteDetail`) 详情及推进按钮（通过路由参数 `quoteRequestId` 对应 `field:QuoteRequest.id`）。
  - 客户端展示：检查 `page:F07` (`route:CustomerInquiryTracker`) 进度只读展示。
- **不变量与依赖核查**：
  - 严格保持正向状态流转链：NEW $\rightarrow$ CONTACTED $\rightarrow$ ESTIMATE_SENT $\rightarrow$ QUOTED $\rightarrow$ SCHEDULED $\rightarrow$ COMPLETED（`evidence:state.001.F01.HomeFrontend`）。
  - 一旦工单达到 COMPLETED 终态，必须对该记录执行编辑锁定，禁止回滚或修改（`evidence:rule.007`）。

### 3. 更新工种目录与基准费率 (Service Category & Rate Configuration)
- **改动入口导航**：
  - 费率配置后台：检查 `page:B03` (`route:AdminCategoriesRates`) 及 `page:B01`。
  - 前台目录展示：检查 `page:F02` (`route:ServicesCatalog`)、`page:F03` (`route:ServiceCategoryDetail`) 与 `page:F04` (`route:PricingScope`)。
- **不变量与依赖核查**：
  - 基准工时单价必须满足法定底线约束：$\ge 15\text{ EUR/h}$（`evidence:rule.003`, `evidence:flow.003.F01.HomeFrontend`）。
  - 工种资质属性 `field:ServiceCategory.craftClassification` 必须显式属于 `FREIES_HANDWERK` 或 `MEISTER_KOOPERATION`，不得留空（`evidence:rule.003`, `evidence:flow.010.B01.AdminOperationsDashboard`）。
  - 费率与品类变更仅允许 ADMIN 权限操作（`evidence:rule.003`）。

### 4. 账户安全与数据隔离调整 (Identity & Data Isolation)
- **改动入口导航**：
  - 认证页面：检查 `page:F08` (`route:CustomerLogin`)、`page:F09` (`route:CustomerRegister`)、`page:B05` (`route:AdminLogin`) 与 `page:B06` (`route:AdminRegister`)。
  - 客户数据追踪：检查 `page:F07` (`route:CustomerInquiryTracker`)。
- **不变量与依赖核查**：
  - 用户表 `model:AccountUser` 中邮箱必须全表唯一（`evidence:rule.002`）。
  - 角色鉴权：`field:AccountUser.role` 必须严格区分 CUSTOMER 与 ADMIN。客户在 `page:F07` 发起的数据读取请求必须以当前登录用户的 `field:AccountUser.id` 为条件进行数据隔离，禁止越权访问其他客户的 `model:QuoteRequest` 记录（`evidence:rule.002`, `evidence:rule.007`）。

---

## Unknowns
- **接口定义与契约**：服务端具体 API 动作名与控制器映射在地图提取中暂缺，修改后端调用逻辑时需直接检索代码中的路由注册与控制器实现。
- **作废与取消路径**：当前状态机仅包含正向推进路径（`evidence:state.001.F01.HomeFrontend`），若需增加客户主动取消或后台作废工单功能，需在代码中定义新的状态分支并评估终态锁定逻辑。
