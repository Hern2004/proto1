
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SectionHeading, Button } from '../components/UI';
import { protocolsData } from '../data/protocols';
import { ResearchReport } from '../types';
import { ShieldCheck, AlertCircle, Activity } from 'lucide-react';

interface DashboardProps {
  onViewReport: () => void;
  onAnalysisComplete: (data: ResearchReport) => void;
  query: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewReport, onAnalysisComplete, query }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  const hasFetched = useRef(false);

  // Define the JSON Schema matching V3.0/V7.0 Requirements
  const reportSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      ticker: { type: Type.STRING },
      oneSentenceThesis: { type: Type.STRING, description: "The core logic of the project in one sentence." },
      meta: {
        type: Type.OBJECT,
        properties: {
          version: { type: Type.STRING },
          timestamp: { type: Type.STRING },
          transparencyScore: { type: Type.INTEGER },
          consistencyChecks: { 
              type: Type.ARRAY,
              items: {
                  type: Type.OBJECT,
                  properties: {
                      item: { type: Type.STRING },
                      status: { type: Type.STRING },
                      details: { type: Type.STRING }
                  }
              }
          },
          dataSources: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      },
      collection: {
        type: Type.OBJECT,
        properties: {
          identityLock: { type: Type.STRING, description: "Verified | Conflict | Pending" },
          lockMethod: { type: Type.STRING, description: "The reasoning for lock (e.g. Mutual Links + Domain)" },
          mutualLinkCheck: { type: Type.BOOLEAN },
          missingInfoReason: { type: Type.STRING },
          officialLinks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING },
                url: { type: Type.STRING },
                status: { type: Type.STRING }
              }
            }
          },
          sourceLayers: {
            type: Type.OBJECT,
            properties: {
                t1_official: { type: Type.ARRAY, items: { type: Type.STRING } },
                t2_authoritative: { type: Type.ARRAY, items: { type: Type.STRING } },
                t3_community: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          secondaryCheck: {
            type: Type.OBJECT,
            properties: {
                passed: { type: Type.BOOLEAN },
                flags: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      },
      verification: {
        type: Type.OBJECT,
        properties: {
          trustTier: { type: Type.STRING, description: "R1, R2, R3, R4, R5" },
          trustScore: { type: Type.INTEGER },
          verdict: { type: Type.STRING },
          dataDecayWarning: { type: Type.BOOLEAN },
          scannedLayers: {
            type: Type.OBJECT,
            properties: {
               T1_OnChain: { type: Type.BOOLEAN },
               T2_Official: { type: Type.BOOLEAN },
               T3_Database: { type: Type.BOOLEAN },
               T4_Social: { type: Type.BOOLEAN },
               T5_Sentiment: { type: Type.BOOLEAN }
            }
          },
          modules: {
            type: Type.OBJECT,
            properties: {
               contractAuthenticity: { type: Type.STRING },
               liquiditySafety: { type: Type.STRING },
               teamIdentity: { type: Type.STRING }
            }
          },
          conflicts: {
             type: Type.ARRAY,
             items: {
                type: Type.OBJECT,
                properties: {
                   dataPoint: { type: Type.STRING },
                   source1: { type: Type.STRING },
                   source2: { type: Type.STRING },
                   resolution: { type: Type.STRING }
                }
             }
          }
        }
      },
      executiveSummary: {
        type: Type.OBJECT,
        properties: {
          grade: { type: Type.STRING },
          totalScore: { type: Type.INTEGER },
          summary: { type: Type.STRING },
          antiFragilityScore: { type: Type.INTEGER }
        }
      },
      scoreMatrix: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            score: { type: Type.INTEGER },
            full: { type: Type.INTEGER },
            isNegative: { type: Type.BOOLEAN }
          }
        }
      },
      fundamental: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING },
          content: { type: Type.STRING }
        }
      },
      techFeasibility: {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.INTEGER },
            grade: { type: Type.STRING },
            analysis: { type: Type.STRING },
            githubAudit: {
                type: Type.OBJECT,
                properties: {
                    repoActivity: { type: Type.STRING },
                    dependencyRisk: { type: Type.STRING },
                    isFake: { type: Type.BOOLEAN },
                    fakeReason: { type: Type.STRING },
                    notes: { type: Type.STRING }
                }
            },
            dimensions: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        label: { type: Type.STRING },
                        score: { type: Type.INTEGER },
                        confidence: { type: Type.NUMBER }
                    }
                }
            }
        }
      },
      tokenomics: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING },
          score: { type: Type.INTEGER },
          details: { type: Type.STRING },
          demandLevel: { type: Type.INTEGER },
          unlockCliff: {
             type: Type.OBJECT,
             properties: {
                 exists: { type: Type.BOOLEAN },
                 note: { type: Type.STRING }
             }
          },
          reflexivity: {
            type: Type.OBJECT,
            properties: {
                type: { type: Type.STRING, description: "Positive | Negative | Neutral" },
                deathSpiralRisk: { type: Type.STRING, description: "Low | Medium | High | Critical" }
            }
          },
          flags: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      },
      marketStructure: {
          type: Type.OBJECT,
          properties: {
              vcCostBasis: { type: Type.STRING },
              liquidityStatus: { type: Type.STRING },
              holderStructure: { type: Type.STRING }
          }
      },
      onchain: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING },
          details: { type: Type.STRING },
          fundsFlow: {
             type: Type.OBJECT,
             properties: {
                 inflow: { type: Type.STRING },
                 outflow: { type: Type.STRING },
                 whaleBehavior: { type: Type.STRING }
             }
          },
          monitorTags: { type: Type.ARRAY, items: { type: Type.STRING } },
          grayAreaTags: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      },
      riskAssessment: {
        type: Type.OBJECT,
        properties: {
          tier: { type: Type.STRING },
          riskTrend: { type: Type.STRING },
          mitigations: { type: Type.ARRAY, items: { type: Type.STRING } },
          adversarialCheck: {
            type: Type.OBJECT,
            properties: {
                isForged: { type: Type.BOOLEAN },
                behaviorPattern: { type: Type.STRING, description: "Behavior Fingerprint Analysis" },
                details: { type: Type.STRING }
            }
          },
          dimensions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                level: { type: Type.STRING },
                score: { type: Type.INTEGER },
                note: { type: Type.STRING }
              }
            }
          }
        }
      },
      stressTest: {
        type: Type.OBJECT,
        properties: {
          survivalProb: { type: Type.STRING },
          deathSpiralProb: { type: Type.STRING },
          scenario: { type: Type.STRING },
          criticalParam: { type: Type.STRING },
          timeToFailure: {
             type: Type.OBJECT,
             properties: {
                 P10: { type: Type.STRING },
                 P50: { type: Type.STRING },
                 P90: { type: Type.STRING }
             }
          }
        }
      },
      sentiment: {
        type: Type.OBJECT,
        properties: {
          quality: { type: Type.STRING },
          risk: { type: Type.STRING },
          details: { type: Type.STRING }
        }
      },
      narrative: {
        type: Type.OBJECT,
        properties: {
          stage: { type: Type.STRING },
          heatScore: { type: Type.INTEGER },
          position: { type: Type.STRING },
          strategy: { type: Type.STRING }
        }
      },
      valuation: {
        type: Type.OBJECT,
        properties: {
            bearCase: { type: Type.STRING },
            baseCase: { type: Type.STRING },
            bullCase: { type: Type.STRING }
        }
      },
      alignment: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          deviationGrade: { type: Type.INTEGER },
          verdict: { type: Type.STRING },
          commitments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                claim: { type: Type.STRING },
                reality: { type: Type.STRING },
                status: { type: Type.STRING }
              }
            }
          },
          mechanisms: {
             type: Type.ARRAY,
             items: {
                type: Type.OBJECT,
                properties: {
                   name: { type: Type.STRING },
                   status: { type: Type.STRING }
                }
             }
          }
        }
      },
      aiExplainability: {
        type: Type.OBJECT,
        properties: {
          evidenceChain: { type: Type.ARRAY, items: { type: Type.STRING } },
          logicPath: { type: Type.STRING }
        }
      },
      finalVerdict: {
        type: Type.OBJECT,
        properties: {
          rating: { type: Type.STRING },
          advice: { type: Type.STRING }
        }
      }
    }
  };

  // Robust JSON Extraction with Brace Matching
  const extractJSON = (text: string): string | null => {
    const startIndex = text.indexOf('{');
    if (startIndex === -1) return null;
    
    let braceCount = 0;
    let insideString = false;
    let escape = false;
    
    for (let i = startIndex; i < text.length; i++) {
        const char = text[i];
        
        if (!escape && char === '"') {
            insideString = !insideString;
        }
        
        if (!insideString) {
            if (char === '{') {
                braceCount++;
            } else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    return text.substring(startIndex, i + 1);
                }
            }
        }
        
        if (char === '\\' && !escape) {
            escape = true;
        } else {
            escape = false;
        }
    }
    
    // Fallback
    const lastIndex = text.lastIndexOf('}');
    if (lastIndex > startIndex) {
        return text.substring(startIndex, lastIndex + 1);
    }
    return null;
  };

  useEffect(() => {
    if (!query || hasFetched.current) return;
    hasFetched.current = true;

    const runAnalysis = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const steps = [
          "Step 1: 初始化 Web3 投研元架构 V7.0...",
          "Step 2: 运行信息采集协议 V4.0 (身份锁定)...",
          "Step 3: 执行信息验证协议 V6.0 (六层级扫描)...",
          "Step 4: 白皮书对齐 WAP V3.0 (偏差与承诺核对)...",
          "Step 5: 技术实现能力评估 Tech V3.0 (代码审计)...",
          "Step 6: 叙事周期协议 NCP V7.0 (阶段与策略)...",
          "Step 7: 代币经济解析 TIP V5.0 (需求侧分级)...",
          "Step 8: 链上行为监控 Monitor V3.0 (资金流向)...",
          "Step 9: 风险识别协议 Risk V6.0 (五维模型)...",
          "Step 10: 经济模型压力测试 Stress V3.0 (死亡螺旋)...",
          "Step 11: 项目评分协议 Score V3.0 (反脆弱计算)...",
          "Step 12: 最终输出协议 Output V3.0 (生成报告)..."
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
          if (currentStep < steps.length) {
            setCurrentAction(steps[currentStep]);
            setProgress(prev => Math.min(prev + (100/12), 95)); 
            currentStep++;
          }
        }, 1200);

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const protocolContext = protocolsData.map(p => 
          `\n>>> [PROTOCOL ${p.version}] ${p.title} RULES:\n${p.fullText}`
        ).join('\n');

        const prompt = `
          Role: You are "Aura", the ultimate Web3 Research Engine. You are a strict execution engine following 12 specific protocols provided in the context.
          Target: Analyze "${query}" based on real-time web data.
          
          --- YOUR LAWS (FULL PROTOCOL CONTEXT) ---
          ${protocolContext}
          ------------------------------------

          --- CRITICAL LOGIC CONSTRAINTS (MUST FOLLOW) ---
          1. [Score V3.0 RULE] IF Risk Tier is "Tier 4" (Critical) or "Tier 3" (High), the "totalScore" MUST be capped at 60. DO NOT exceed 60 if risk is high.
          2. [WAP V3.0 RULE] For 'whaleBehavior', apply the 5-Step Filter: Check if address is (1)Staking Pool (2)Exchange (3)Contract (4)Bot (5)Whitepaper-explained. Only if ALL false, label "Whale Risk".
          3. [Monitor V3.0 RULE] Use specific tags: "Dump risk", "Wash trading", "Whale accumulation", "Flash-loan pattern" if evidence matches.
          4. [Tech V3.0 RULE] If "repoActivity" is "Fake/None" or "isFake" is true, "techFeasibility.score" MUST be < 40.
          5. [TIP V5.0 RULE] If "Top 10 Holders" > 80% AND not confirmed as Locked/Contract, mark as High Concentration Risk.
          
          --- EXECUTION WORKFLOW (AGENTIC CHAIN OF THOUGHT) ---

          PHASE 0: META FRAMEWORK (V7.0)
          - Generate a "One-Sentence Thesis".

          PHASE 1: COLLECTION (V4.0) - IDENTITY LOCK ALGORITHM
          - EXECUTE Identity Lock V4.0.
          - TWO-CONDITION RULE: To label 'identityLock' as 'Verified', you MUST find at least TWO corroborating links.
          - INTERNAL T1 RESOLUTION: If official sources conflict, PRIORITY is given to Github/Domain.
          - OUTPUT 'lockMethod'.
          - MISSING INFO MANDATE: If core info missing, fill 'missingInfoReason'.

          PHASE 1.5: DEEP VERIFICATION (Verification V6.0)
          - STRICTLY EXECUTE SIX-LAYER VERIFICATION.
          - CHECK INFO DECAY.
          - RUN MODULE CHECKS.

          PHASE 2: ALIGNMENT & TECH (WAP V3.0 & Tech V3.0)
          - EXECUTE WAP V3.0: Deviation Scoring (0-4).
          - EXECUTE Tech V3.0: CHECK for FAKE CODEBASE.
          - TECH SCORING WEIGHTS: Architecture(25%)+Team(20%)+Performance(20%)+Security(25%)+Deliverability(10%).

          PHASE 3: NARRATIVE CYCLE ANALYSIS (NCP V7.0)
          - Determine Stage (N1-N6) and Strategy.
          - ENFORCE STRATEGY MAPPING: N1->Early Position, N2->Core Position, N3->Momentum, N4->Scale Out, N5->Reduce, N6->Clear.

          PHASE 4: MONITORING & TOKENOMICS (Monitor V3.0 & TIP V5.0)
          - Monitor V3.0: Populate "fundsFlow". Use standard monitor tags.
          - TIP V5.0: Assign "demandLevel" (1-5). INFLATION THRESHOLD CHECK (>15% is High). Check "reflexivity".
          - CLIFF DETECTION: Specifically identify if there is a massive unlock event ("Cliff") upcoming. Populate 'unlockCliff'.
          - MSP V7.0: Populate "marketStructure" (VC Cost Basis, Liquidity Status).

          PHASE 4.5: RISK V6.0 (5-PILLARS)
          - Assess 5 Dimensions.
          - DETERMINE "riskTrend".
          - FINGERPRINT MATCHING: Check 'adversarialCheck.behaviorPattern'. Does funds flow/behavior match known rugs?
          - EXECUTE "mitigation": Identify factors like Timelock > 48h, Audits, Multisig. List them in 'mitigations'.

          PHASE 5: STRESS TEST & VALUATION (Stress V3.0 & Valuation V7.0)
          - Bear/Base/Bull scenarios.
          - ESTIMATE "timeToFailure" distribution (P10/P50/P90) based on burn rate and risks.

          PHASE 6: SCORING & OUTPUT (Score V3.0 & Output V3.0)
          - CALCULATE Anti-Fragility Score.
          - NARRATIVE DISTORTION FORMULA (N4x0.85, N5/N6x1.2).
          - CALCULATE TOTAL SCORE (Weighted) - APPLY CAP IF RISK IS HIGH.
          - CALCULATE TRANSPARENCY SCORE (Output V3.0 Formula).
          - GENERATE DETAILED CONSISTENCY CHECKS array (Chain vs Paper, Paper vs Social, etc.).

          --- OUTPUT REQUIREMENT ---
          Return ONLY raw JSON matching the schema below. 
          STRICTLY JSON. NO MARKDOWN. NO CODE BLOCKS.
          Language: Chinese (中文).
          
          JSON Schema:
          ${JSON.stringify(reportSchema, null, 2)}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          }
        });

        clearInterval(interval);
        setProgress(100);
        setCurrentAction("报告生成完毕");

        const rawText = response.text || "";
        if (!rawText) throw new Error("AI 未返回数据");
        
        const jsonText = extractJSON(rawText);
        if (!jsonText) throw new Error("无法从 AI 响应中提取有效的 JSON 数据");

        let reportData: ResearchReport;
        try {
            reportData = JSON.parse(jsonText) as ResearchReport;
        } catch (e) {
            console.error("JSON Parse Error:", e);
            console.error("Extracted JSON Text:", jsonText);
            throw new Error("AI 返回数据格式异常，无法解析。");
        }

        if (!reportData.meta) {
            reportData.meta = {
                version: "V3.0",
                timestamp: new Date().toISOString(),
                transparencyScore: 0,
                consistencyChecks: [],
                dataSources: []
            }; 
        }
        
        // Extract grounding sources
        if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
          const chunks = response.candidates[0].groundingMetadata.groundingChunks;
          const sources = chunks
            .map((c: any) => c.web?.title || c.web?.uri)
            .filter((s: any) => typeof s === 'string') as string[];
          reportData.meta.dataSources = Array.from(new Set(sources)).slice(0, 10);
        } else if (!reportData.meta.dataSources) {
            reportData.meta.dataSources = [];
        }
        
        if (!reportData.meta.transparencyScore) {
           reportData.meta.transparencyScore = 50;
        }

        setTimeout(() => {
          onAnalysisComplete(reportData);
        }, 800);

      } catch (err) {
        console.error("Analysis Failed:", err);
        setError("AI 分析引擎连接超时或生成格式错误，请重试。");
        setLoading(false);
      }
    };

    runAnalysis();
  }, [query, onAnalysisComplete]);

  if (loading || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-md space-y-6 text-center">
          {error ? (
             <div className="space-y-4 animate-fade-in">
                <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                  <AlertCircle className="text-red-500" size={40} />
                </div>
                <h2 className="text-2xl font-semibold text-[#1D1D1F]">{error}</h2>
                <Button onClick={() => window.location.reload()} className="mx-auto">重试</Button>
             </div>
          ) : (
            <>
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"
                ></div>
                <ShieldCheck className="absolute inset-0 m-auto text-blue-500 animate-pulse" size={32} />
              </div>
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-2">正在分析目标: {query}</h2>
                <p className="text-[#86868B] font-mono text-sm min-h-[24px] flex items-center justify-center gap-2">
                  <Activity size={14} className="animate-pulse"/>
                  {currentAction}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4 opacity-50">
                 {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-colors duration-300 ${i < Math.floor(progress / (100/12)) ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                 ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return null; 
};

export default Dashboard;