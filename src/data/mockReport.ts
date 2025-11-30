import { ResearchReport } from '../types';

export const mockReportData: ResearchReport = {
  name: "EtherLayer X",
  ticker: "ELX",
  oneSentenceThesis: "EtherLayer X provides a decentralized verification layer that fundamentally solves L2 fragmentation, backed by strong on-chain adoption metrics despite recent market volatility.",
  meta: {
    version: "V3.0",
    timestamp: new Date().toISOString(),
    transparencyScore: 88,
    consistencyChecks: [
        { item: "Chain vs Whitepaper", status: "Consistent", details: "Token minting schedule matches on-chain events exactly." },
        { item: "Whitepaper vs Social", status: "Consistent", details: "Official announcements align with documentation roadmap." },
        { item: "Team vs LinkedIn", status: "Deviation", details: "CTO listed on LinkedIn left 2 months ago (minor delay)." }
    ],
    dataSources: [
        "https://etherlayerx.io",
        "https://twitter.com/etherlayerx",
        "https://github.com/etherlayerx",
        "https://defillama.com/protocol/etherlayerx",
        "https://etherscan.io/address/0x..."
    ]
  },
  collection: {
    identityLock: "Verified",
    lockMethod: "Mutual Links + Domain",
    mutualLinkCheck: true,
    officialLinks: [
      { platform: "官网", url: "https://etherlayerx.io", status: "Verified" },
      { platform: "Twitter", url: "https://twitter.com/etherlayerx", status: "Verified" },
      { platform: "GitHub", url: "https://github.com/etherlayerx", status: "Verified" }
    ],
    sourceLayers: {
        t1_official: ["Website", "Twitter", "GitHub"],
        t2_authoritative: ["DefiLlama", "CoinGecko"],
        t3_community: ["Reddit", "Discord"]
    },
    secondaryCheck: {
        passed: true,
        flags: []
    }
  },
  verification: {
    trustTier: "R5",
    trustScore: 92,
    verdict: "High confidence. Core contracts are verified and ownership is managed by a 5/8 Multisig with a 48h Timelock.",
    dataDecayWarning: false,
    scannedLayers: {
      T1_OnChain: true,
      T2_Official: true,
      T3_Database: true,
      T4_Social: true,
      T5_Sentiment: true
    },
    modules: {
      contractAuthenticity: "Verified",
      liquiditySafety: "Locked",
      teamIdentity: "Public"
    },
    conflicts: []
  },
  executiveSummary: {
    grade: "A",
    totalScore: 85,
    summary: "EtherLayer X demonstrates exceptional technical integrity and on-chain transparency. While market sentiment is currently cooling (N5), the fundamental architecture and risk management strategies are sound. Recommended for long-term accumulation.",
    antiFragilityScore: 12
  },
  scoreMatrix: [
    { category: "项目质量", score: 18, full: 20 },
    { category: "技术能力", score: 14, full: 15 },
    { category: "代币经济", score: 12, full: 15 },
    { category: "链上安全", score: 19, full: 20 },
    { category: "市场行为", score: 7, full: 10 },
    { category: "舆情", score: 8, full: 10 },
    { category: "叙事适配", score: 7, full: 10 }
  ],
  fundamental: {
    verdict: "Solid",
    content: "Addresses key L2 interoperability issues with a novel ZK-proof aggregation layer."
  },
  techFeasibility: {
    score: 92,
    grade: "A",
    analysis: "Codebase shows high activity with 15+ active contributors. Core ZK circuits are audited by ConsenSys and Zellic.",
    dimensions: [
        { label: "架构可行性", score: 95, confidence: 0.9 },
        { label: "团队代码贡献", score: 88, confidence: 0.85 },
        { label: "性能基准", score: 90, confidence: 0.8 },
        { label: "安全性", score: 94, confidence: 0.95 },
        { label: "交付能力", score: 90, confidence: 0.8 }
    ],
    githubAudit: {
        repoActivity: "High",
        dependencyRisk: "Safe",
        isFake: false,
        notes: "Consistent commit history over 2 years. No signs of star buying."
    }
  },
  tokenomics: {
    verdict: "Sustainable",
    score: 82,
    details: "Deflationary mechanism active. Revenue sharing model aligns incentives with long-term holders.",
    demandLevel: 4,
    unlockCliff: {
        exists: true,
        note: "15% Team allocation unlocks in 4 months (Cliff)."
    },
    reflexivity: {
        type: "Positive",
        deathSpiralRisk: "Low"
    },
    flags: ["Vesting Cliff Upcoming"]
  },
  marketStructure: {
      vcCostBasis: "Est. $0.05 (Current 12x)",
      liquidityStatus: "High (Binance/Coinbase)",
      holderStructure: "Distributed (Top 10 < 15%)"
  },
  onchain: {
    verdict: "Healthy",
    details: "Consistent inflow of TVL even during market downturns. Whale wallets are accumulating.",
    fundsFlow: {
        inflow: "Strong (+5% 7d)",
        outflow: "Normal",
        whaleBehavior: "Accumulation"
    },
    monitorTags: ["Whale accumulation"],
    grayAreaTags: []
  },
  riskAssessment: {
    tier: "Tier 1",
    riskTrend: "Stable",
    mitigations: ["Timelock (48h)", "Audited (x3)", "Multisig (5/8)"],
    adversarialCheck: {
        isForged: false,
        behaviorPattern: "Normal DeFi Protocol",
        details: "No suspicious mixing or circular transactions detected."
    },
    dimensions: [
      { label: "结构性", level: "低", score: 1, note: "Decentralized architecture." },
      { label: "行为性", level: "低", score: 1, note: "Team verified." },
      { label: "技术性", level: "低", score: 2, note: "Complex ZK circuits." },
      { label: "外部性", level: "中", score: 3, note: "Regulatory uncertainty." },
      { label: "未来性", level: "低", score: 2, note: "Clear roadmap." }
    ]
  },
  stressTest: {
    survivalProb: "94%",
    deathSpiralProb: "2%",
    scenario: "S1: Market Crash (-30%)",
    criticalParam: "Liquidity Depth",
    timeToFailure: {
        P10: "> 365 days",
        P50: "> 365 days",
        P90: "180 days"
    }
  },
  sentiment: {
    quality: "High",
    risk: "Low",
    details: "Community is technical and engaged. Low spam/bot ratio."
  },
  narrative: {
    stage: "N3 主流叙事",
    heatScore: 75,
    position: "Leader",
    strategy: "Trend Following (Momentum)"
  },
  valuation: {
    bearCase: "$1.2B FDV",
    baseCase: "$3.5B FDV",
    bullCase: "$8.0B FDV"
  },
  alignment: {
    score: 95,
    deviationGrade: 0,
    verdict: "High Alignment. Delivered features match Whitepaper V2 exactly.",
    commitments: [
      { claim: "Burn 50% of revenue", reality: "Burned 51% (Variance < 2%)", status: "Aligned" },
      { claim: "Decentralized Sequencer", reality: "Live on Mainnet", status: "Aligned" }
    ],
    mechanisms: [
       { name: "ZK-Rollup", status: "Active" }
    ]
  },
  aiExplainability: {
    evidenceChain: [
        "Source 1 (Etherscan) confirms burn transaction 0x123...",
        "Source 3 (Github) confirms sequencer code merge #452",
        "Source 4 (DefiLlama) verifies TVL growth"
    ],
    logicPath: "Verified on-chain data matches whitepaper claims. Tokenomics show sustainability via revenue burn. Risk is mitigated by multisig."
  },
  finalVerdict: {
    rating: "A",
    advice: "Accumulate on dips. Watch out for the vesting cliff in 4 months."
  }
};