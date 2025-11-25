
import { Protocol, ProjectAnalysis } from '../types';

export const protocolsData: Protocol[] = [
  {
    id: 'research-framework-v7',
    version: 'V7.0',
    title: 'Web3 投研分析协议 (Meta)',
    category: 'Analysis',
    description: '全局投研元架构，统领所有子协议。',
    content: [
      '【核心原则】P1 链上验证优先 (On-chain First)；P2 概率化结论；P3 叙事决定资金流向。',
      '【执行流程】全流程包含：白皮书对齐 -> 叙事周期 -> 经济模型 -> 链上数据 -> 团队执行 -> 市场结构 -> 风险管理 -> 场景估值。',
      '【场景化估值 SVP】输出必须包含三种场景估值：Bear Case (保守 - 生态停滞)、Base Case (中性 - 线性增长)、Bull Case (乐观 - 叙事爆发)。',
      '【最终结论】必须包含 "One-Sentence Thesis" (一句话核心逻辑) 和明确的评级 (A+/A/B/C/D)。'
    ],
    fullText: `
《Web3 投研分析协议 V7.0 – 终极完整版》
0. 协议核心原则
P1 — 所有主张必须由链上数据验证（On-chain First）。
P2 — 不给出价格预测，只给出概率权重（Probabilistic Analysis）。
P3 — 判断叙事，不判断价格（Narrative is the Meta-Layer）。
P4 — 一切项目先做“白皮书对齐测试”（Alignment Test）。
P5 — 输出必须是场景化结论（Scenario-Based）。

1. 全局投研框架地图
系统由 8 大系统组成：白皮书对齐、叙事周期、经济模型、链上数据、团队执行、市场结构、风险管理、场景估值。

2. 场景化估值协议（Scenario Valuation Protocol – SVP）
以未来三种场景估值：
1）保守（Bear Case）：生态增长停滞。
2）中性（Base Case）：生态保持目前速度增长。
3）乐观（Bull Case）：叙事强化 + 增长加速。

3. 最终投研结论
(1) 一句话定位 (One-Sentence Thesis)
(2) 高维量化评分 (基于 Score V3.0)
(3) 投资策略与评级 (A+/A/B/C/D)
`
  },
  {
    id: 'narrative-cycle-v7',
    version: 'NCP V7.0',
    title: '叙事周期协议',
    category: 'Analysis',
    description: '基于 N1-N6 阶段论的趋势定位与策略生成。',
    content: [
      '【N1 萌芽期 (Seed)】小圈层讨论，技术突破，无大众关注。策略：提前布局 (Early Position)。',
      '【N2 早期扩散 (Early Diffusion)】KOL 低频讨论，VC 观察，开发者活跃。策略：建立核心仓位 (Core Position)。',
      '【N3 主流叙事 (Mainstream)】CEX 上线，媒体大量报道，资金涌入。策略：趋势跟随 (Momentum)。',
      '【N4 狂热期 (Overheated)】散户进场，搜索量爆炸，无关资产跟涨。策略：分批止盈 (Scale Out)。',
      '【N5 疲弱期 (Exhaustion)】内容重复，增速断崖下跌，社区沉寂。策略：大幅降仓 (Reduce)。',
      '【N6 破裂期 (Collapse)】链上活动归零，话题消失。策略：清仓/观察 (Clear)。',
      '【判断指标】基于 Twitter 讨论密度、Google Trends 趋势、机构研报数量综合判定。'
    ],
    fullText: `
《叙事周期协议（Narrative Cycle Protocol – NCP）V7.0》
叙事是加密最大驱动力。V7.0 分为 6 大叙事阶段（N1–N6）：

N1：叙事萌芽（Seed Narrative）
特征：小圈层出现、少量高质量分析、技术突破/论文初现。
策略：提前布局（Early Position）。

N2：早期扩散（Early Diffusion）
特征：KOL 开始低频讨论、开发者活跃度提升、风投开始观察。
策略：建立核心仓位（Core Position）。

N3：主流叙事（Mainstream Narrative）
特征：大部分人听过、CEX/媒体开始推、资金大量进入。
策略：趋势跟随（Momentum）。

N4：狂热叙事（Overheated Narrative）
特征：散户大规模进入、不相关资产也跟涨、搜索量爆炸。
策略：逐步减仓（Scale Out）。

N5：叙事疲弱（Narrative Exhaustion）
特征：内容重复、增速明显下降、社区热度断崖式下跌。
策略：大幅降仓。

N6：叙事破裂（Narrative Collapse）
特征：链上活动下降 90%、话题消失、Model 死亡。
策略：清仓，仅保留观察仓。
`
  },
  {
    id: 'info-collection',
    version: 'V4.0',
    title: '信息采集协议',
    category: 'Collection',
    description: '多层级信息采集与身份锁定标准。',
    content: [
      '【三层采集体系】T1 官方源(官网/推特/Github) > T2 权威中立源(CMC/DefiLlama) > T3 社区源(Reddit/Medium)。',
      '【身份锁定算法】必须验证互指链接：检查 官网是否链接到Twitter 且 Twitter是否链接回官网。',
      '【锁定状态判定】若双向链接存在 -> [Verified]；若仅单向或域名不一致 -> [Conflict]；无法确定 -> [Pending]。',
      '【缺失处理规则】信息缺失时禁止留白，必须标注原因：(1)官方未披露 (2)早期未公开 (3)来源不足。',
      '【冲突初筛】若官方源内部冲突，以“域名+Github”代码库信息优先。'
    ],
    fullText: `
《信息采集协议 V4.0》
0. 协议目标
确保采集到的信息完整、真实、可验证，并避免被污染。

1. 信息采集流程 (Master Process)
1.1 三层采集体系
第一层：官方源（T1，绝对优先级）。包括：官方网站（顶级域名）、官方 Twitter（X）、官方 Github。
第二层：权威中立信息源（T2）。包括：CoinMarketCap, DefiLlama, Dune Analytics。
第三层：社区与媒体源（T3）。包括：Reddit, Twitter 社群讨论。社区源永远不能覆盖官方源的信息。

2. 统一身份锁定机制 (Project Identity Lock)
2.1 主身份锁定
确定项目的主要身份必须满足 至少两项同时成立：
- 含有唯一域名
- Social 链接互相指向（官网指向 Twitter，Twitter 指向官网，互指链接 Check）
- Github 仓库与官网/Docs互链
如果只有单链路，视为“疑似官方”。
`
  },
  {
    id: 'research-verification',
    version: 'V6.0 (Full)',
    title: '信息验证协议',
    category: 'Verification',
    description: '六层级验证体系、信息老化衰减与冲突裁决逻辑。',
    content: [
      '【六层级验证体系(T-Levels)】',
      'L1 (Absolute): 链上不可篡改信息。L2 (Structured): 代码diff/Tokenomics合约。L3 (Semi): 官方文档。L4 (Social): 声明。L5 (Sentiment): 舆情。',
      '【信息老化衰减】任何来源可信度随时间衰减。>6个月的文档或>1年的推文，可信度自动降级。',
      '【子模块验证 (Module Check)】',
      '1. 技术验证：检查合约是否开源(Verified)、是否Proxy、是否Renounced。',
      '2. 流动性验证：检查LP是否锁仓(Time-locked) vs 可随时移除(Rug risk)。',
      '3. 团队验证：检查GitHub贡献真实性、LinkedIn背景一致性。',
      '【冲突裁决模型 (MCRM)】T1 绝对优于 T2/T3。若链上数据(T1)显示"Mintable"而白皮书(T2)承诺"Fixed Supply"，判为 R1 (Rug Risk)。',
      '【风险分级 (R-Tier)】R1 (Rug/极高) | R2 (High/高) | R3 (Medium/中) | R4 (Low/低) | R5 (Trusted/可信)。'
    ],
    fullText: `
《信息验证协议（Protocol 2）V6.0 — 专家级版本》
一、六层级验证体系 (T-Levels)
L1：绝对验证（Absolute）。链上交易、合约代码。无条件覆盖其他来源。
L2：结构化强验证。GitHub 代码 diff、备案文件。
L3：半结构化验证。白皮书、Docs。
L4：社交验证。Twitter、Discord。
L5：舆情验证。论坛讨论。

二、复杂情况处理 (MCRM)
情况 A：官方信息自相矛盾。链上查询优先；时间戳较新优先。
情况 B：团队隐藏身份。不以“匿名”为负面，但需检查伪造头像。
情况 C：融资信息造假。要求至少两个 VC 官网公告；仅媒体报道降级到 L4。

三、信息老化衰减
任何来源的可信度会随着时间衰减。AI 需自动降级 >6个月的文档可信度。

四、子模块验证
1. 技术验证：合约开源、Proxy检查。
2. 流动性验证：LP 锁仓检查。
3. 团队验证：GitHub 贡献真实性检查。
`
  },
  {
    id: 'whitepaper-alignment',
    version: 'WAP V3.0',
    title: '白皮书对齐协议',
    category: 'Verification',
    description: '意图(Intent)与结果(Outcome)的偏差分析标准。',
    content: [
      '【元结构抽取】必须从白皮书抽取8类结构：Tokenomics、治理权限、经济行为、核心生态角色、关键变量、操纵点、承诺、未知区。',
      '【对齐逻辑】先问“能否被白皮书解释”，再问“是否偏离”。',
      '【偏差评分模型(0-4)】0:无偏差 | 1:弱偏差(未提及但可解释) | 2:中等偏差(非致命差异) | 3:强偏差(违背承诺) | 4:致命偏差(如Owner未弃权/可随意增发)。',
      '【大额资金脱敏(5步法)】大额持仓需经过判断：(1)是池子? (2)是聚合钱包? (3)是合约? (4)是Bot? (5)白皮书有解释? 全部失败才判定为“鲸鱼风险”。',
      '【风险结论】必须基于“白皮书设计 -> 链上行为 -> 偏差模型”路径得出，而非表象数据。'
    ],
    fullText: `
《白皮书对齐协议（Whitepaper Alignment Protocol, WAP）V3.0》
核心理念：白皮书是设计意图（Intent），链上是实现结果（Outcome）。风险评估的本质是“偏差分析”。

1. 白皮书元结构抽取
AI 必须抽取 8 类“元结构”：Tokenomics 结构、治理与权限模型、经济行为框架、核心生态角色、系统关键变量、可被操纵点识别、项目承诺、不确定区。

2. 偏差评分模型 (Deviation Scoring)
0：无偏差。完全符合。
1：弱偏差。白皮书未提及但可解释（如新奖励池）。
2：中等偏差。存在差异但不损害资产安全。
3：强偏差。明显违背承诺（如提前解锁）。
4：致命偏差。直接违背承诺且构成风险（如 Owner 未弃权、可增发）。

3. 复杂情况处理：大额资金误判机制
判断集中是否危险必须经过“五步脱敏”：
Step 1：是否为池子类地址？
Step 2：是否为聚合钱包？
Step 3：是否为合约持有？
Step 4：行为是否自动化？
Step 5：是否可通过白皮书解释？
五步全部失败，才判为“鲸鱼风险”。
`
  },
  {
    id: 'tech-feasibility',
    version: 'Tech V3.0',
    title: '技术实现能力协议',
    category: 'Analysis',
    description: '工程落地能力与代码质量评估。',
    content: [
      '【评估维度与权重】1.架构可行性(25%) 2.团队代码贡献(20%) 3.性能基准(20%) 4.安全性(25%) 5.交付能力(10%)。',
      '【GitHub审计】检查 Commit 分布、贡献者真实性。若代码库主要由单一账户提交或仅为 Readme 更新，标记 [Low Eng Activity]。',
      '【安全验证】检查合约权限(Admin Key/Timelock)。若存在无限制 Mint 权限且无 Timelock，技术分直接扣除 30分。',
      '【依赖风险】检查是否依赖中心化组件(如单一 Sequencer 且无去中心化路线图)，若有则扣分。'
    ],
    fullText: `
《技术实现能力协议 V3.0》
核心目标：量化技术可实现性，识别“吹牛/伪创新”。

五大评估维度：
1. 架构与设计可行性 (25%)：模块边界、数据可用性 (DA)、可扩展路径。
2. 团队能力与资源匹配 (20%)：核心开发者履历、GitHub 活跃度 (非 Marketing commits)、人员配比。
3. 性能/可扩展性 (20%)：宣称 TPS 与基准测试匹配度、关键路径瓶颈。
4. 安全与合约可信性 (25%)：合约权限 (Owner/Mint/Upgrade)、已知漏洞修复、依赖库审计。
5. 可交付性 & 工程实践 (10%)：CI/CD pipelines、Devops 文档。

GitHub 造假检测：
检查 fork 代码、买星星、空仓库、人工堆 commit。若发现，技术分大幅扣除。
`
  },
  {
    id: 'onchain-monitoring',
    version: 'Monitor V3.0',
    title: '链上行为监控协议',
    category: 'Analysis',
    description: '实时识别洗盘、女巫与资金流向。',
    content: [
      '【智能识别引擎】需识别：Dump risk (抛压)、Wash trading (刷量)、Whale accumulation (吸筹)。',
      '【资金流监控】官方金库/运营钱包的大额转账必须与公告对齐。若无公告大额转出 -> Tier 4 风险。',
      '【用户行为画像】识别“女巫集群”(资金源一致、行为同步) 和 “高频套利机器人”。',
      '【灰度行为】识别“可疑但未达阈值”的行为，标记为 [Gray Area]，不计入立刻扣分但列入观察。'
    ],
    fullText: `
《链上行为监控协议 V3.0》
协议目标：对项目相关地址的资金动向、交互模式、风险行为进行识别。

智能识别算法体系 (AI Behavior Engine)：
1. 模式识别：KNN 相似度交易行为聚类、高频交易时序模型。
2. 风险标签：Dump risk、Flash-loan pattern、Bot trading、Whale accumulation、Wash trading。
3. 灰度区分：可疑但未达风险阈值、正常但不稳定行为。

监控指标：
- 资金流监控：项目资金池净流入/出、大户买卖。
- 用户行为监控：女巫集群（资金源一致）、机器人行为。
- 合约行为监控：高频合约调用、异常调用链、权限变更。

风险等级：R1(低) - R4(重大风险: Dump/Rug)。
`
  },
  {
    id: 'risk-identification',
    version: 'Risk V6.0',
    title: '风险识别协议',
    category: 'Risk',
    description: '五维风险体系、趋势推演与动态评级。',
    content: [
      '【五维模型】1.结构性(机制缺陷) 2.行为性(团队异常抛售) 3.技术性(合约漏洞/依赖) 4.外部性(监管/赛道) 5.未来性(解锁抛压)。',
      '【风险趋势推演】预测未来30日风险：解锁临近 -> 风险急升；用户增长停滞 -> 外部风险上升。',
      '【风险分级】Tier 1(低风险) | Tier 2(中风险) | Tier 3(高风险-核心机制警告) | Tier 4(极高风险-Rug/致命缺陷)。',
      '【缓和因子】若存在 Timelock > 48h、多签(>3/5)、或顶级审计报告，可降低 1 个风险等级。',
      '【对抗性检测】识别“伪造透明”，如伪造审计报告或合作关系。'
    ],
    fullText: `
《风险识别协议 V6.0》
核心升级：五维风险体系 + 动态风险流程 + 对抗性检测。

一、五维风险体系 (5-Pillars)
1. 结构性风险 (30%)：Token 结构不可持续、流动性无锁仓、单点依赖。
2. 行为性风险 (30%)：团队大额资金异常流动、PR 与链上矛盾、GitHub 权限异常。
3. 技术性风险 (15%)：合约 Upgrade 权限过大、已知漏洞、依赖风险。
4. 外部性风险 (15%)：监管趋势、宏观周期、竞品替代。
5. 未来性风险 (10%)：代币解锁临近、盈利模型不可扩展。

二、动态风险评级
Tier 1：低风险。有缓和机制。
Tier 2：中风险。风险可控。
Tier 3：高风险。核心机制出现重大警告。
Tier 4：极高风险。跑路、归零或致命缺陷。

三、风险缓和 (Mitigation)
- 机制缓和：Timelock、多签。
- 历史行为缓和：长期无恶意行为。
`
  },
  {
    id: 'tokenomics-analysis',
    version: 'TIP V5.0',
    title: '代币经济解析协议',
    category: 'Analysis',
    description: '机构级代币模型审计。',
    content: [
      '【供给侧】检查通胀率、解锁悬崖(Cliff)、团队/VC 持仓占比。Top10 持仓 > 80% 且非合约锁仓 -> 高集中度风险。',
      '【需求侧】评级：Level 1(纯投机) < Level 3(Gas/治理) < Level 5(真实外生收入)。若仅靠投机，标记 [Ponzi Structure]。',
      '【反身性】检查“死亡螺旋”风险：价格下跌是否会导致协议核心机制(如算稳/借贷)崩溃？',
      '【可持续性】协议收入(Revenue) 是否覆盖代币激励(Incentives)？若否，标记 [Unsustainable]。'
    ],
    fullText: `
《代币经济解析协议 V5.0》
1. 供给侧 (Supply)
检查总量设计、通胀率 (>15% 危险)、解锁压力、团队/VC 占比。
验证销毁机制是否真实执行。

2. 需求侧 (Demand)
Level 1: 投机需求 (★)
Level 2: 治理权 (★★)
Level 3: Gas (★★★)
Level 4: 抵押/借贷/质押 (★★★★)
Level 5: 外生真实需求 (AI/算力/存储) (★★★★★)
项目若只有 L1-L2，不具备长期价值。

3. 反身性 (Reflexivity)
核心问题：价跌是否导致死亡螺旋？
正反身性 -> 牛市强势；负反身性 -> 一跌就死。
`
  },
  {
    id: 'stress-test',
    version: 'Stress V3.0',
    title: '经济模型压力测试协议',
    category: 'Analysis',
    description: '极端行情下的生存率仿真。',
    content: [
      '【场景库】S1: 价格暴跌30% (24h); S2: TVL流失40% (7d); S3: 大额解锁抛售 (Team/VC)。',
      '【关键指标】输出 Survival Probability (存活率) 和 Death Spiral Probability (死亡螺旋概率)。',
      '【阈值告警】若死亡螺旋概率 > 40%，必须触发 [CRITICAL ALERT]。',
      '【复合场景】测试“解锁 + 市场暴跌”双重冲击下的协议表现。'
    ],
    fullText: `
《经济模型压力测试协议 V3.0》
目标：把经济压力测试从静态断言变成可运行、概率化的风险引擎。

场景库：
S1：价格暴跌 30% (24h)。
S2：TVL 流失 40% (7d)。
S3：单日 LP 移除 50%。
S4：团队/大户解锁并抛售 20% 流通量。
C1 (复合)：解锁 + Price Shock 同步发生。

输出指标：
- Survival Probability (存活率)
- Death Spiral Probability (死亡螺旋概率)。若 > 40% 触发 CRITICAL ALERT。
`
  },
  {
    id: 'project-scoring',
    version: 'Score V3.0',
    title: '项目评分协议',
    category: 'Output',
    description: '自适应权重评分系统。',
    content: [
      '【评分权重(Score V3.0)】总分(100) = 项目质量(20%) + 技术能力(15%) + 代币经济(15%) + 链上安全(20%) + 市场行为(10%) + 舆情(10%) + 叙事适配(10%)。',
      '【反脆弱加分】若项目在市场下跌期间 TVL/用户数 逆势增长，给予额外 [Anti-Fragility Bonus] (+5分)。',
      '【致命一票否决】若触发 Tier 4 风险(如 Rug 迹象)，总分强制封顶 59 分(F级)。',
      '【叙事扭曲校准】泡沫期叙事得分 x 0.85；冷淡期叙事得分 x 1.2。'
    ],
    fullText: `
《项目评分协议 V3.0》
V3.0 核心：自适应权重、多周期评分、反脆弱评分、叙事扭曲校准。

1. 评分总结构 (权重)
- 项目质量 (Quality): 20%
- 技术能力 (Tech): 15%
- 代币经济 (Tokenomics): 15%
- 链上安全 (Security): 20%
- 市场行为 (Market): 10%
- 舆情 (Sentiment): 10%
- 叙事适配 (Narrative): 10%

2. 反脆弱性评分 (Anti-Fragility)
加分条件：大盘暴跌时 TVL 逆势上涨、收入在熊市提升。
反脆弱分值：0-20，直接叠加。

3. 风险封顶
若任何 Tier 4 (极高风险) 触发，总分上限强制设为 60。
`
  },
  {
    id: 'final-output',
    version: 'Output V3.0',
    title: '最终输出协议',
    category: 'Output',
    description: '标准化、无偏差、可解释的报告生成。',
    content: [
      '【透明度评分】基于数据源的可信度计算：(T1源数量 x 20 + T2源数量 x 10)。>85为高可靠。',
      '【一致性检查】必须显式列出“链上 vs 白皮书”、“白皮书 vs 舆情”的一致性状态。',
      '【AI解释性】每个结论必须附带“证据链(Evidence Chain)”，即引用了哪个具体来源。',
      '【最终评级】A+(强基本面+低风险) | A | B | C | D(高风险)。'
    ],
    fullText: `
《最终输出协议 V3.0》
目的：确保输出稳定、结构化、无偏差、可解释。

1. 风险权重排序 (优先级)
链上安全风险 > 资金流/代币模型风险 > 合约权限风险 > 中心化风险 > 运营风险 > 团队风险 > 舆情风险。

2. 冲突处理规则
链上数据 > 白皮书 > 市场行为 > 舆情。

3. 透明度评分 (Transparency Score)
基于来源可验证性 (30%)、数据完整度 (30%)、算法参与透明度 (20%) 计算。
> 85: 高可靠。 < 60: 低可靠。

4. 最终投资结论分类
A+：强基本面 + 强链上数据 + 低风险。
A：基本面优秀，风险可控。
B：潜力项目，风险中等。
C：短期机会型项目，高波动。
D：高风险，建议规避。
`
  }
];

export const mockProject: ProjectAnalysis = {
  id: 'ether-layer-x',
  name: 'EtherLayer X',
  ticker: 'ELX',
  logoUrl: 'https://picsum.photos/200',
  totalScore: 83,
  grade: 'A',
  verdict: 'Strong fundamental architecture with verifiable on-chain assets.',
  narrativePosition: 'N3: Mainstream Narrative',
  riskMetrics: [
    { category: 'Structural', score: 85, label: 'Low' },
  ],
  protocolStatus: {},
  lastUpdated: '2023-10-27T10:00:00Z'
};