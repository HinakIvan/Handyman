# Domain Model Reference
> Fact layer - grounded expansion. Verify against code before editing.

## Bounded Contexts

本项目围绕维也纳及周边区域的多语言房屋维修与装修服务（Handyman and Property Renovation Platform）划分为以下限界上下文：

| 限界上下文 (Bounded Context) | 说明 | 核心实体 / 模型 | 关联页面 |
| :--- | :--- | :--- | :--- |
| **Identity & Access** | 用户账户认证与权限划分，区分普通客户与管理员。 | model:AccountUser | page:F08, page:F09, page:B05, page:B06 |
| **Quote & Inquiry Lifecycle** | 客户询价报价的全生命周期流转、现场任务描述、时间与预算估算及追踪。 | model:QuoteRequest | page:F01, page:F06, page:F07, page:B01, page:B02 |
| **Catalog & Trade Compliance** | 维修工种分类、基准工时费率配置以及符合奥地利 GewO 法规的工种合规分类。 | model:ServiceCategory | page:F02, page:F03, page:F04, page:B01, page:B03 |
| **Territory & Logistics** | 维也纳 1010-1230 邮编行政区划、物流圈层及调度响应时效管理。 | model:ViennaDistrict | page:F01, page:F05 |
| **Business Setup & Regulatory Compliance** | 奥地利法定合规项（如增值税号、营业执照地址等）的审查与维护。 | model:SetupChecklistItem | page:B01, page:B04 |
| **Knowledge Base (FAQ)** | 面向客户的多语言定价、材料政策与法规说明问答。 | model:FaqItem | page:F01, page:F04 |

## Aggregates

### 1. QuoteRequest Aggregate
- **聚合根**: model:QuoteRequest
- **关联引用**:
  - `field:QuoteRequest.customerId` 指向 model:AccountUser（可选，匿名访客提交或已注册客户提交）
  - `field:QuoteRequest.serviceCategoryId` 指向 model:ServiceCategory
  - `field:QuoteRequest.districtId` 指向 model:ViennaDistrict
- **描述**: 贯穿整个平台的核心业务聚合。记录客户在维也纳特定区域针对指定工种提出的维修需求、排期偏好、材料准备情况，并跟踪从询价创建到最终工单完成的全状态变迁。

### 2. ServiceCategory Aggregate
- **聚合根**: model:ServiceCategory
- **描述**: 平台支持的工种与费率聚合。定义各个工种的多语言展示内容、基准工时费率（`baseline_hourly_rate`）以及奥地利 GewO 1994 下的工种资质分类（`field:ServiceCategory.craftClassification`）。

### 3. AccountUser Aggregate
- **聚合根**: model:AccountUser
- **描述**: 系统的用户实体，通过 `field:AccountUser.role` 区分权限边界（CUSTOMER 与 ADMIN）。

### 4. SetupChecklistItem Aggregate
- **聚合根**: model:SetupChecklistItem
- **描述**: 独立合规条目聚合。用于跟踪奥地利本地商业运营合规资质（如 VAT UID、营业地址）的核验进度与法律依据。

### 5. ViennaDistrict Aggregate
- **聚合根**: model:ViennaDistrict
- **描述**: 维也纳各区域预设主数据聚合。维护 1010 至 1230 邮编对应的区域、物流圈层（`field:ViennaDistrict.zone`）与派工响应时效。

### 6. FaqItem Aggregate
- **聚合根**: model:FaqItem
- **描述**: 常见问题主数据聚合。分类存储多语言政策与定价解释。

## Invariants And State Rules

### 1. 账户不变量与权限规则
- 注册账户的邮箱在系统内必须唯一，作为主登录标识符（evidence:rule.002）。
- 用户角色 `field:AccountUser.role` 严格决定操作边界：管理员拥有后台运营所有权限；客户仅能查询和追踪归属于自己账户的询价记录（evidence:rule.002, evidence:rule.007）。

### 2. 工种与费率不变量
- 工种基准工时费率存在业务底线，最低必须为 15 EUR/h（evidence:rule.003）。
- 仅系统管理员有权修改服务分类配置与工时费率（evidence:rule.003, page:B03）。
- 工种合规属性 `field:ServiceCategory.craftClassification` 必须符合奥地利 GewO 1994 规定，限定于自由手工业（FREIES_HANDWERK）或大师级合作手工业（MEISTER_KOOPERATION）（evidence:rule.003, evidence:flow.010.B01.AdminOperationsDashboard）。

### 3. 合规条目与主数据规则
- 合规审查条目 `field:SetupChecklistItem.status`（PENDING、IN_REVIEW、COMPLETED）仅允许管理员进行核验与状态更新（evidence:rule.005, page:B04）。
- 维也纳行政区数据 `field:ViennaDistrict.zone` 为预置的主数据（涵盖 1010 至 1230 邮编）（evidence:rule.004）。

### 4. 报价请求状态机规则（QuoteRequest Lifecycle）
根据 evidence:state.001.F01.HomeFrontend，`field:QuoteRequest.status` 遵循严格的单向递进状态机：

```
[__create__]
     │
     │ Client submits inquiry (F01, F06)
     ▼
   NEW
     │
     │ Administrator logs consultation callback (B01)
     ▼
 CONTACTED
     │
     │ Administrator transmits binding estimate (B01)
     ▼
 ESTIMATE_SENT
     │
     │ Client accepts binding quote rate (B01)
     ▼
  QUOTED
     │
     │ Administrator schedules artisan team (B01)
     ▼
 SCHEDULED
     │
     │ Handyman completes work & invoices (B01)
     ▼
 COMPLETED (Locked against edits)
```

- **创建触发**: 访客或客户在首页 page:F01 或表单页 page:F06 提交询价，初始状态置为 NEW。
- **状态流转**: 后台管理员在 page:B01 仪表板中依序推动状态：NEW -> CONTACTED -> ESTIMATE_SENT -> QUOTED -> SCHEDULED -> COMPLETED（evidence:state.001.F01.HomeFrontend）。
- **终态锁定**: 一旦 `field:QuoteRequest.status` 到达终态 COMPLETED，该记录将被锁定，禁止后续任何修改（evidence:rule.007）。

## Unknowns

- **匿名与认证关联机制**: 当匿名访客提交 model:QuoteRequest（`field:QuoteRequest.customerId` 为 null）后，后续若使用相同邮箱注册或登录 model:AccountUser，系统是否会自动追溯关联已提交的历史记录，输入中未作明确规定。
- **逆向状态流转与取消逻辑**: 状态机 evidence:state.001.F01.HomeFrontend 仅定义了线性的正向状态流转路径；关于客户主动取消询价、管理员拒绝或工单作废的具体状态（例如 CANCELLED / REJECTED）及对应流转规则未在输入中提及。
