# Project SPEC

## Project Summary
本项目为面向奥地利维也纳及周边区域的多语言房屋维修与手工艺装修平台（Handyman and Renovation Services）。系统核心涵盖客户工时估算与询价提交流程、管理员后台工单全生命周期推进、基于奥地利 GewO 1994 法规的手工艺分类与工时基准费率管理，以及企业本地商业运营合规要件审计。

## Start Here For Updates
update agent 在修改代码时请遵循以下决策路径：
- **已知页面、文件或模型的局部改动**：优先使用局部搜索工具（如 search_code、read_page_info 等）快速定位目标源码。
- **业务功能域入口不明确**：先读取 `read_spec(reference="update-playbooks")` 确定所属业务域及触达页面。
- **涉及 Schema、共享组件、页面生命周期或角色的结构性变更**：读取 `read_spec(reference="change-recipes")`，并可按具体 section（如 Global Write Targets / Schema Change Impact / Freshness And Confidence）精确定位影响面；通用实施模式参考 Skill。
- **深入复杂业务状态机、跨页血缘或风险排查**：按需调用 `read_spec(reference="domain-model")`、`read_spec(reference="flows")` 或 `read_spec(reference="risks")`。
- **跨模块源码坐标或路由映射仍无法确认**：最后查阅较重的 `read_spec(reference="implementation-map")` 获取精确文件与调用地图。

## Scope & Limitations
- **定位与快照说明**：本 SPEC 是辅助 update agent 定位代码的导航索引，而非认证、加密、并发控制或国际化的形式化证明，亦不预测未来改动的运行时副作用。
- **实现态而非规划**：文档内所记录的角色、路由、模型与状态转换均为系统已实现内容的生成时快照，不可视作待办需求（TODO）；确认具体逻辑实现必须核对源码。
- **两大关键陷阱**：
  1. 代码库中属于自动生成层的脚手架或 RPC 产物（如 implementation-map 中的 GENERATED_LAYER）严禁手动修改。
  2. 鉴权或路由守卫文件的物理存在并不等同于其已在运行时 layout 或路由树中正确挂载生效。

## Core Flows
- **工单询价与线索提交**：访客或注册客户在 `page:F01` 或 `page:F06` 提交维修需求，系统创建 `model:QuoteRequest`，状态初始为 NEW（`evidence:state.001.F01.HomeFrontend`）。
- **工单生命周期后台推进**：管理员在 `page:B01` 与 `page:B02` 按照 NEW $\rightarrow$ CONTACTED $\rightarrow$ ESTIMATE_SENT $\rightarrow$ QUOTED $\rightarrow$ SCHEDULED $\rightarrow$ COMPLETED 顺序推动状态机，进入 COMPLETED 后工单锁定不可篡改（`evidence:state.001.F01.HomeFrontend`, `evidence:rule.007`）。
- **工种分类与费率配置**：管理员通过 `page:B03` 维护 `model:ServiceCategory`，确保基准工时费率不低于 15 EUR/h 并严格区分手工业资质类型（`evidence:rule.003`, `evidence:flow.010.B01.AdminOperationsDashboard`）。
- **客户工单追踪与认证**：客户在 `page:F08` 或 `page:F09` 完成登录注册后，在 `page:F07` 依据自身账号凭据安全检索名下工单进度（`evidence:rule.002`, `evidence:rule.007`）。
- **企业法定合规清单审查**：管理员在 `page:B04` 持续审核并更新 `model:SetupChecklistItem` 中的各项奥地利本地商业合规状态（`evidence:rule.005`）。

## Domain Rules
- **报价单生命周期不可逆与锁定**：`field:QuoteRequest.status` 必须严格依序流转，一旦流转至 COMPLETED 状态即刻触发数据锁定，禁止后续编辑与状态回滚（`evidence:state.001.F01.HomeFrontend`, `evidence:rule.007`）。
- **手工艺法律分类与费率底线**：`field:ServiceCategory.craftClassification` 必须显式区分为自由手工业（FREIES_HANDWERK）或特许大师合作（MEISTER_KOOPERATION），且基准单价底线为 15 EUR/h（`evidence:rule.003`）。
- **账户唯一性与数据访问隔离**：`model:AccountUser` 邮箱必须全局唯一；普通客户只能读取与自身 `field:QuoteRequest.customerId` 关联的工单记录（`evidence:rule.002`, `evidence:rule.007`）。

## Implementation Entry Points
- **前台公共与客户门户**：包含主页 `page:F01`、服务目录 `page:F02`、工种详情 `page:F03`、计费说明 `page:F04`、服务区域 `page:F05`、询价表单 `page:F06`、客户追踪 `page:F07`、客户登录 `page:F08`、客户注册 `page:F09`。
- **后台运维控制台**：包含运维主控台 `page:B01`、工单处理详情 `page:B02`、工种费率管理 `page:B03`、合规清单审查 `page:B04`、管理员登录 `page:B05`、管理员注册 `page:B06`。
- **核心数据聚合**：涵盖业务工单 `model:QuoteRequest`、服务品类 `model:ServiceCategory`、区域划分 `model:ViennaDistrict`、系统账户 `model:AccountUser`、合规项 `model:SetupChecklistItem`、问答知识库 `model:FaqItem`。

## Update Playbooks
- **工单流转与状态机逻辑调整**：检查 `model:QuoteRequest` 状态变更入口、`page:F01` 与 `page:F06` 的提交校验、`page:B01` 与 `page:B02` 的推进操作，确保锁定机制有效。
- **服务工种与费率规则变更**：检查 `model:ServiceCategory` 的校验层、`page:B03` 管理入口以及 `page:F02`、`page:F03` 的展示层，确保符合奥地利 GewO 资质区分与最低单价约束。
- **行政区域调度与响应配置**：检查 `model:ViennaDistrict`、`page:F05` 与 `page:F06` 间的区域外键绑定与响应时效逻辑。
- **合规审计条目更新**：检查 `model:SetupChecklistItem`、`page:B04` 与主控制台 `page:B01` 的未合规预警逻辑。

## Known Risks
- **工单终态锁定失效**：若在服务端缺少对 `field:QuoteRequest.status` 处于 COMPLETED 时的只读校验，可能导致已结案工单被非法篡改（`evidence:rule.007`）。
- **工时费率合规越线**：若费率写入逻辑绕过了最低 15 EUR/h 或手工业资质合法分类校验，将引发商业合规风险（`evidence:rule.003`）。
- **工单跨客户越权泄漏**：若 `page:F07` 接口未能严格校验当前登录凭证与 `field:QuoteRequest.customerId`，可能造成客户隐私数据越权访问（`evidence:rule.002`）。
- **路由鉴权守卫脱落**：后台运维页面 `page:B01` 至 `page:B06` 若未在路由层正确挂载 ADMIN 权限校验，将导致敏感管理功能暴露。

## References
- `read_spec(reference="flows")`：深入查看核心业务流程、状态变迁顺序与跨页 Lineage 传递关系。
- `read_spec(reference="domain-model")`：深入查看各领域聚合根定义、不变量与状态机硬性约束。
- `read_spec(reference="update-playbooks")`：按业务功能域分类的详细代码改动导航指南。
- `read_spec(reference="change-recipes")`：深入查看 Schema 变更、全局写目标、共享组件及角色权限变更影响面。
- `read_spec(reference="payment")`：查看支付集成状态、目标市场、推荐支付网关与底层设施文件。
- `read_spec(reference="implementation-map")`：深入查看页面、模型、动作与具体源码路径的完整坐标映射表。
- `read_spec(reference="risks")`：查看系统隐式耦合点与潜在风险清单。
