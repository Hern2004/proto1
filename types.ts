
export interface Protocol {
  id: string;
  version: string;
  title: string;
  description: string;
  category: 'Collection' | 'Verification' | 'Analysis' | 'Risk' | 'Output';
  content: string[]; // Key points for quick UI summary
  fullText: string; // The complete raw text of the protocol document
}

export interface RiskMetric {
  category: string;
  score: number; // 0-100
  label: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ProjectAnalysis {
  id: string;
  name: string;
  ticker: string;
  logoUrl: string;
  totalScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  verdict: string;
  riskMetrics: RiskMetric[];
  narrativePosition: string;
  protocolStatus: {
    [key: string]: 'Pending' | 'In Progress' | 'Completed' | 'Flagged';
  };
  lastUpdated: string;
}

export interface ResearchReport {
  name: string;
  ticker: string;
  
  // Protocol: Research Framework V7.0
  oneSentenceThesis: string; 

  meta: {
    version: string;
    timestamp: string;
    transparencyScore: number;
    // Protocol: Output V3.0 Detailed Consistency Check
    consistencyChecks: {
        item: string; // e.g., "Chain vs Whitepaper"
        status: 'Consistent' | 'Deviation' | 'Contradiction';
        details: string;
    }[];
    dataSources: string[];
  };

  // Protocol: Info Collection V4.0
  collection: {
    identityLock: 'Verified' | 'Conflict' | 'Pending';
    lockMethod?: string; // Reason for lock (e.g., "Mutual Links + Domain")
    mutualLinkCheck: boolean; 
    missingInfoReason?: string; 
    officialLinks: { 
      platform: string; 
      url: string; 
      status: 'Verified' | 'Suspect';
    }[];
    // V4.0 Three-Layer System Classification
    sourceLayers: {
        t1_official: string[];      // Website, Twitter, Github
        t2_authoritative: string[]; // CMC, DefiLlama
        t3_community: string[];     // Reddit, Medium
    };
    // V4.0 Secondary Identity Check
    secondaryCheck: {
        passed: boolean;
        flags: string[]; // e.g. "Low Twitter Followers", "Empty Github", "Domain Mismatch"
    };
  };

  // Protocol: Info Verification V6.0
  verification: {
    trustTier: 'R1' | 'R2' | 'R3' | 'R4' | 'R5'; 
    trustScore: number;
    verdict: string;
    dataDecayWarning: boolean; 
    scannedLayers: {
      T1_OnChain: boolean;
      T2_Official: boolean;
      T3_Database: boolean;
      T4_Social: boolean;
      T5_Sentiment: boolean;
    };
    modules: {
      contractAuthenticity: 'Verified' | 'Unverified' | 'HighRisk';
      liquiditySafety: 'Locked' | 'Unlocked' | 'Unknown';
      teamIdentity: 'Public' | 'Anon' | 'Fake';
    };
    conflicts: {
      dataPoint: string;
      source1: string; 
      source2: string; 
      resolution: string; 
    }[];
  };

  executiveSummary: {
    grade: string;
    totalScore: number;
    summary: string;
    antiFragilityScore: number; 
  };
  scoreMatrix: { category: string; score: number; full: number; isNegative?: boolean }[];
  fundamental: { verdict: string; content: string; };
  
  // Protocol: Tech Feasibility V3.0
  techFeasibility: {
    score: number;
    grade: string;
    dimensions: { label: string; score: number; confidence: number }[];
    analysis: string;
    githubAudit: {
        repoActivity: 'High' | 'Medium' | 'Low' | 'Fake/None';
        dependencyRisk: 'Safe' | 'High';
        isFake: boolean;
        fakeReason?: string;
        notes: string;
    };
  };

  // Protocol: TIP V5.0
  tokenomics: { 
      verdict: string; 
      score: number; 
      details: string; 
      flags: string[];
      demandLevel: 1 | 2 | 3 | 4 | 5; 
      // TIP V5.0 Unlock Cliff
      unlockCliff: {
          exists: boolean;
          note: string; // Details about the cliff (e.g. "20% unlock in 3 months")
      };
      // Reflexivity Check
      reflexivity: {
        type: 'Positive' | 'Negative' | 'Neutral';
        deathSpiralRisk: 'Low' | 'Medium' | 'High' | 'Critical';
      };
  };
  
  // Protocol: Market Structure Protocol (MSP) from V7.0 (NEW)
  marketStructure: {
      vcCostBasis: string; // e.g. "Est. $0.05 (10x ROI)" or "Unknown"
      liquidityStatus: string; // e.g. "Healthy CEX Depth" or "Thin Liquidity"
      holderStructure: string; // e.g. "VC Heavy" or "Community Distributed"
  };

  // Protocol: On-chain Monitoring V3.0
  onchain: { 
    verdict: string; 
    details: string; 
    monitorTags: string[]; 
    grayAreaTags?: string[]; 
    // Structured Funds Flow
    fundsFlow: {
        inflow: string; // e.g., "Stable"
        outflow: string; // e.g., "High (Team Cashout)"
        whaleBehavior: string;
    };
  };

  // Protocol: Risk V6.0
  riskAssessment: {
    tier: string;
    riskTrend: 'Decreasing' | 'Stable' | 'Increasing';
    mitigations: string[]; // NEW: Risk V6.0 Mitigation Factors
    // Adversarial Detection
    adversarialCheck: {
        isForged: boolean; // Fake Documents
        behaviorPattern: string; // NEW: Behavior Fingerprint (e.g. "Similar to known rug patterns")
        details: string; 
    };
    dimensions: { label: string; level: string; score: number; note?: string; }[];
  };

  // Protocol: Stress Test V3.0
  stressTest: { 
    survivalProb: string; 
    deathSpiralProb: string; 
    scenario: string; 
    criticalParam: string;
    // Protocol Detail: Time-to-failure distribution
    timeToFailure: {
        P10: string; // e.g. "3 days"
        P50: string; // e.g. "12 days"
        P90: string; // e.g. "> 90 days"
    };
  };

  sentiment: { quality: string; risk: string; details: string; };
  
  // Protocol: Narrative Cycle V7.0
  narrative: { 
    stage: 'N1 萌芽期' | 'N2 早期扩散' | 'N3 主流叙事' | 'N4 狂热期' | 'N5 疲弱期' | 'N6 破裂期';
    heatScore: number; 
    position: string; 
    strategy: string; 
  };
  
  // Protocol: Valuation V7.0
  valuation: {
    bearCase: string;
    baseCase: string;
    bullCase: string;
  };

  // Protocol: Whitepaper Alignment V3.0 (WAP)
  alignment: {
    score: number; 
    deviationGrade: 0 | 1 | 2 | 3 | 4; 
    verdict: string;
    commitments: {
      claim: string;    
      reality: string;  
      status: 'Aligned' | 'Deviation' | 'Fatal';
    }[];
    mechanisms: {
       name: string;
       status: string; 
    }[];
  };

  aiExplainability: { evidenceChain: string[]; logicPath: string; };
  finalVerdict: { rating: string; advice: string; };
}

export enum ViewState {
  Landing = 'LANDING',
  Dashboard = 'DASHBOARD',
  Protocols = 'PROTOCOLS',
  Report = 'REPORT',
}
