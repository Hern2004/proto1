
import React, { useState } from 'react';
import { GlassCard, Button, Badge } from '../components/UI';
import { ResearchReport } from '../types';
import { 
  Download, Share2, ShieldCheck, BrainCircuit, Activity, Lock, Globe, 
  TrendingUp, FileText, CheckCircle2, HelpCircle, AlertTriangle, XCircle,
  Layers, Scale, Fingerprint, Eye, Cpu, Zap, BarChart3, Link, Check, ExternalLink, Timer, Scale as ScaleIcon, 
  Quote, Github, Star, Anchor, ArrowRight, Shield, Clock, Search
} from 'lucide-react';

interface ReportProps {
  query?: string;
  data: ResearchReport | null;
}

const ReportSection: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode, className?: string }> = ({ title, icon, children, className }) => (
  <section className={`mb-10 animate-fade-in print:mb-6 ${className}`}>
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5E5EA]/60 print:border-gray-200">
      {icon && <span className="text-[#007AFF] print:hidden">{icon}</span>}
      <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight print:text-base print:font-bold">{title}</h3>
    </div>
    {children}
  </section>
);

const Report: React.FC<ReportProps> = ({ query, data }) => {
  const [showChecks, setShowChecks] = useState(false);
  
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-[#86868B]">
        未找到相关报告数据，请重新搜索。
      </div>
    );
  }

  // Destructure
  const { 
    name, ticker, oneSentenceThesis, meta, collection, verification, executiveSummary, scoreMatrix, fundamental, 
    techFeasibility, tokenomics, onchain, riskAssessment, stressTest, sentiment, 
    narrative, valuation, alignment, aiExplainability, finalVerdict, marketStructure 
  } = data;

  const getDeviationColor = (grade: number) => {
     if (grade === 0) return 'bg-green-500';
     if (grade === 1) return 'bg-green-400';
     if (grade === 2) return 'bg-yellow-400';
     if (grade === 3) return 'bg-orange-500';
     return 'bg-red-600';
  };
  const getDeviationLabel = (grade: number) => {
     if (grade === 0) return '无偏差 (Perfect)';
     if (grade === 1) return '弱偏差 (Weak)';
     if (grade === 2) return '中等偏差 (Medium)';
     if (grade === 3) return '强偏差 (Strong)';
     return '致命偏差 (Fatal)';
  };

  const getTransparencyColor = (score: number) => {
      if (score > 85) return 'text-green-600 bg-green-50';
      if (score < 60) return 'text-red-600 bg-red-50';
      return 'text-blue-600 bg-blue-50';
  };
  const getTransparencyLabel = (score: number) => {
      if (score > 85) return '高可靠 (High Reliability)';
      if (score < 60) return '低可靠 (Low Reliability)';
      return '中等可靠 (Medium)';
  };

  const narrativeStages = ['N1 萌芽期', 'N2 早期扩散', 'N3 主流叙事', 'N4 狂热期', 'N5 疲弱期', 'N6 破裂期'];
  const getCurrentStageIndex = () => {
     if (!narrative?.stage) return -1;
     return narrativeStages.findIndex(s => narrative.stage.includes(s.split(' ')[0]));
  };

  const parseProb = (str?: string) => {
    if(!str) return 0;
    const num = parseFloat(str.replace('%', ''));
    return isNaN(num) ? 0 : num;
  };
  const deathSpiralProbValue = parseProb(stressTest?.deathSpiralProb);

  const renderSourceLink = (source: string) => {
    if (source.startsWith('http')) {
        return (
            <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                <Link size={12} /> {new URL(source).hostname}
            </a>
        );
    }
    return <span>{source}</span>;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pb-24 print:py-0 print:px-0 print:max-w-none">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-[#E5E5EA] pb-8 gap-4 print:mb-6 print:pb-4 print:block">
        <div>
          <div className="flex items-center gap-2 mb-2 print:mb-1">
            <Badge color="blue">最终输出协议 V3.0</Badge>
            <span className="text-xs font-mono text-[#86868B]">{meta?.timestamp ? new Date(meta.timestamp).toLocaleDateString() : new Date().toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-2 print:text-2xl">深度投研报告</h1>
          <p className="text-lg text-[#86868B] font-light print:text-sm">
            目标标的: <span className="font-medium text-[#1D1D1F]">{name || "Unknown"} ({ticker || "?"})</span>
          </p>
          {/* One Sentence Thesis (V7.0) */}
          {oneSentenceThesis && (
            <div className="mt-4 flex gap-2 text-[#515154] italic text-lg max-w-3xl border-l-4 border-[#007AFF] pl-4 py-1 bg-blue-50/30 rounded-r-lg print:text-sm print:bg-gray-50 print:border-gray-300">
                <Quote size={20} className="text-[#007AFF] shrink-0 opacity-50 print:hidden" />
                {oneSentenceThesis}
            </div>
          )}
        </div>
        <div className="flex gap-3 no-print">
          <Button variant="secondary" className="h-10 px-5"><Share2 size={18}/></Button>
          <Button className="h-10 px-5" onClick={() => window.print()}><Download size={18} className="mr-2"/> 导出 PDF</Button>
        </div>
      </div>

      {/* Meta Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 print:block print:space-y-4">
        <GlassCard className="p-4 flex items-center gap-3 print:border-gray-200">
          <div className={`p-2 rounded-full ${getTransparencyColor(meta?.transparencyScore || 0).split(' ')[1]} ${getTransparencyColor(meta?.transparencyScore || 0).split(' ')[0]} print:hidden`}>
             <Eye size={20}/>
          </div>
          <div>
            <div className="text-xs text-[#86868B] uppercase tracking-wide">透明度评分</div>
            <div className={`font-bold ${getTransparencyColor(meta?.transparencyScore || 0).split(' ')[0]}`}>
               {meta?.transparencyScore || 0}/100 
               <span className="text-[10px] ml-1 font-normal opacity-80">{getTransparencyLabel(meta?.transparencyScore || 0)}</span>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors relative group print:block print:cursor-default" onClick={() => setShowChecks(!showChecks)}>
          <div className="p-2 bg-green-50 rounded-full text-green-600 print:hidden"><CheckCircle2 size={20}/></div>
          <div className="flex-1">
            <div className="text-xs text-[#86868B] uppercase tracking-wide flex items-center gap-1">一致性检查 <ChevronDownIcon size={12}/></div>
            <div className="font-bold text-[#1D1D1F] text-sm truncate">点击查看详细对比</div>
          </div>
          {/* Detailed Consistency Dropdown - Always show on print if data exists */}
          {((showChecks || false) || typeof window !== 'undefined' && window.matchMedia('print').matches) && meta?.consistencyChecks && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-20 text-xs print:static print:shadow-none print:border-0 print:p-0 print:mt-2">
                  {meta.consistencyChecks.map((check, i) => (
                      <div key={i} className="mb-2 last:mb-0 border-b last:border-0 border-gray-50 pb-2 print:border-gray-200">
                          <div className="flex justify-between font-medium">
                              <span>{check.item}</span>
                              <span className={check.status === 'Consistent' ? 'text-green-600' : 'text-red-600'}>{check.status}</span>
                          </div>
                          <div className="text-gray-500 mt-1">{check.details}</div>
                      </div>
                  ))}
              </div>
          )}
        </GlassCard>
        
        <GlassCard className="p-4 flex items-center gap-3 print:border-gray-200">
          <div className="p-2 bg-purple-50 rounded-full text-purple-600 print:hidden"><Layers size={20}/></div>
          <div>
            <div className="text-xs text-[#86868B] uppercase tracking-wide">数据源</div>
            <div className="font-bold text-[#1D1D1F] text-sm">{(meta?.dataSources || []).length} 个独立源 (T1-T3)</div>
          </div>
        </GlassCard>
      </div>

      {/* Identity Lock Section (V4.0) */}
      <div className="mb-12 print:break-inside-avoid">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#007AFF] print:hidden"/>
              <h4 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">身份锁定 (Collection V4.0)</h4>
           </div>
           <div className="flex items-center gap-2">
              {collection?.lockMethod && (
                  <span className="text-xs text-[#86868B] bg-gray-50 px-2 py-1 rounded border border-gray-100 print:border-gray-300">
                      锁定依据: {collection.lockMethod}
                  </span>
              )}
              {collection?.identityLock === 'Verified' ? (
                  <Badge color="green">✅ 身份已锁定 (Verified)</Badge>
              ) : collection?.identityLock === 'Conflict' ? (
                  <Badge color="red">⚠️ 身份冲突 (Conflict)</Badge>
              ) : (
                  <Badge color="yellow">⏳ 待验证 (Pending)</Badge>
              )}
           </div>
        </div>
        
        {collection?.secondaryCheck && !collection.secondaryCheck.passed && (collection.secondaryCheck.flags || []).length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex gap-2 items-center print:border-red-200">
                <AlertTriangle size={16} className="text-red-500 print:hidden" />
                <span className="text-sm text-red-700 font-medium">
                    辅助验证警告: {(collection.secondaryCheck.flags || []).join(', ')}
                </span>
            </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 print:block print:space-y-2">
           {(collection?.officialLinks || []).map((link, idx) => (
             <GlassCard key={idx} className="p-3 flex items-center gap-3 !rounded-xl border border-gray-100 bg-white/50 hover:bg-white transition-colors print:bg-white print:border-gray-300">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#86868B]">{link.platform}</div>
                  {link.url !== '未找到' ? (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium truncate text-blue-600 hover:underline block" title={link.url}>
                        {link.url}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-gray-400 italic">未找到</div>
                  )}
                </div>
                {link.status === 'Verified' && <CheckCircle2 size={14} className="text-green-500 print:hidden"/>}
             </GlassCard>
           ))}
        </div>

        {collection?.sourceLayers && (
            <div className="flex gap-2 text-xs font-mono text-[#86868B] bg-gray-50 p-3 rounded-lg border border-gray-100 print:bg-white print:border-gray-200">
                <span className="font-semibold text-gray-500">Source Layers:</span>
                <span className={collection.sourceLayers.t1_official?.length ? "text-green-600" : "text-gray-300"}>T1({collection.sourceLayers.t1_official?.length || 0})</span>
                <span>/</span>
                <span className={collection.sourceLayers.t2_authoritative?.length ? "text-blue-600" : "text-gray-300"}>T2({collection.sourceLayers.t2_authoritative?.length || 0})</span>
                <span>/</span>
                <span className={collection.sourceLayers.t3_community?.length ? "text-orange-600" : "text-gray-300"}>T3({collection.sourceLayers.t3_community?.length || 0})</span>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
        <div className="lg:col-span-2 space-y-12 print:space-y-6">
          
          <ReportSection title="信息验证与评级 (V6.0)" icon={<ShieldCheck size={20}/>}>
             <div className="flex items-center gap-6 mb-6">
                <div className={`text-4xl font-bold ${verification?.trustTier === 'R5' || verification?.trustTier === 'R4' ? 'text-green-600' : 'text-red-600'}`}>
                    {verification?.trustTier || "N/A"}
                </div>
                <div className="h-10 w-[1px] bg-gray-200"></div>
                <div className="text-sm text-[#515154]">
                   <div>可信度评分: <span className="font-semibold">{verification?.trustScore || 0}/100</span></div>
                   <div className="text-[#86868B] text-xs mt-1">{verification?.verdict}</div>
                </div>
             </div>
             
             <div className="grid grid-cols-3 gap-4 mb-6 print:block print:space-y-2">
                 <div className={`p-3 rounded-xl border ${verification?.modules?.contractAuthenticity === 'Verified' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="text-xs text-[#86868B] mb-1">合约验证</div>
                    <div className="font-semibold text-sm">{verification?.modules?.contractAuthenticity || 'Unknown'}</div>
                 </div>
                 <div className={`p-3 rounded-xl border ${verification?.modules?.liquiditySafety === 'Locked' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <div className="text-xs text-[#86868B] mb-1">流动性安全</div>
                    <div className="font-semibold text-sm">{verification?.modules?.liquiditySafety || 'Unknown'}</div>
                 </div>
                 <div className={`p-3 rounded-xl border ${verification?.modules?.teamIdentity === 'Public' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-xs text-[#86868B] mb-1">团队身份</div>
                    <div className="font-semibold text-sm">{verification?.modules?.teamIdentity || 'Unknown'}</div>
                 </div>
             </div>

             {verification?.dataDecayWarning && (
                 <div className="p-3 bg-orange-50 text-orange-700 text-sm rounded-lg flex items-center gap-2 mb-4">
                    <Timer size={16}/>
                    <span>警告：部分数据源已陈旧（&gt;6个月），可信度已自动降级。</span>
                 </div>
             )}

             <div className="flex gap-1 mb-4 print:hidden">
                 {['T1_OnChain', 'T2_Official', 'T3_Database', 'T4_Social', 'T5_Sentiment'].map((layer) => {
                     const isActive = verification?.scannedLayers?.[layer as keyof typeof verification.scannedLayers];
                     return (
                         <div key={layer} className={`flex-1 h-1.5 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`} title={layer}></div>
                     );
                 })}
             </div>
             
             {verification?.conflicts && verification.conflicts.length > 0 && (
                <div className="space-y-2 mt-4">
                   <h5 className="text-xs font-semibold text-[#86868B] uppercase">冲突裁决日志 (MCRM)</h5>
                   {verification.conflicts.map((conf, i) => (
                      <div key={i} className="text-sm bg-red-50 p-3 rounded-lg border border-red-100 print:bg-white print:border-red-200">
                         <div className="font-medium text-red-800 flex items-center gap-2"><ScaleIcon size={14}/> {conf.dataPoint}</div>
                         <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                            <div><span className="text-red-500">Source A:</span> {conf.source1}</div>
                            <div><span className="text-red-500">Source B:</span> {conf.source2}</div>
                         </div>
                         <div className="mt-2 pt-2 border-t border-red-100 text-red-700 font-medium text-xs">
                            裁决: {conf.resolution}
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </ReportSection>

          <ReportSection title="技术实现能力 (Tech V3.0)" icon={<Cpu size={20}/>}>
             <div className="flex items-start gap-6 print:block">
                <div className="text-center shrink-0 mb-4 print:text-left">
                    <div className="text-3xl font-bold mb-1">{techFeasibility?.score || 0}</div>
                    <div className={`px-2 py-0.5 rounded text-xs font-bold inline-block ${techFeasibility?.grade === 'A' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        Grade {techFeasibility?.grade}
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    <p className="text-sm text-[#515154] leading-relaxed">{techFeasibility?.analysis}</p>
                    
                    {techFeasibility?.githubAudit?.isFake && (
                        <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                            <div>
                                <div className="font-bold text-sm">CRITICAL: 疑似伪造代码库</div>
                                <div className="text-xs mt-1">{techFeasibility.githubAudit.fakeReason}</div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        {techFeasibility?.dimensions?.map((dim, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs">
                                <span className="w-24 text-[#86868B] truncate">{dim.label}</span>
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden print:hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dim.score}%` }}></div>
                                </div>
                                <span className="w-8 text-right font-mono">{dim.score}</span>
                            </div>
                        ))}
                    </div>

                    {techFeasibility?.githubAudit && (
                        <div className="mt-4 grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3 rounded-lg border border-gray-100 print:bg-white print:border-gray-300">
                             <div>
                                <span className="text-gray-400 block mb-1">Repo Activity</span>
                                <span className="font-medium">{techFeasibility.githubAudit.repoActivity}</span>
                             </div>
                             <div>
                                <span className="text-gray-400 block mb-1">Dependency Risk</span>
                                <span className={`font-medium ${techFeasibility.githubAudit.dependencyRisk === 'High' ? 'text-red-600' : 'text-green-600'}`}>
                                    {techFeasibility.githubAudit.dependencyRisk}
                                </span>
                             </div>
                             <div className="col-span-2 pt-2 border-t border-gray-200 text-gray-500">
                                 {techFeasibility.githubAudit.notes}
                             </div>
                        </div>
                    )}
                </div>
             </div>
          </ReportSection>

          <ReportSection title="代币经济与需求 (TIP V5.0)" icon={<Zap size={20}/>}>
             <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{tokenomics?.score}/100</span>
                    <div className="flex text-yellow-400 print:hidden">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < (tokenomics?.demandLevel || 0) ? "currentColor" : "none"} className={i < (tokenomics?.demandLevel || 0) ? "" : "text-gray-300"} />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">(Demand L{tokenomics?.demandLevel})</span>
                 </div>
             </div>

             <div className="mb-4 text-sm text-[#515154]">{tokenomics?.details}</div>

             {/* TIP V5.0 Unlock Cliff */}
             {tokenomics?.unlockCliff?.exists && (
                 <div className="mb-4 p-3 bg-orange-50 border border-orange-100 rounded-lg flex gap-3 items-center">
                    <Clock size={16} className="text-orange-600 shrink-0"/>
                    <div>
                        <div className="text-xs font-bold text-orange-800 uppercase">解锁悬崖警告 (Cliff Detected)</div>
                        <div className="text-xs text-orange-700">{tokenomics.unlockCliff.note}</div>
                    </div>
                 </div>
             )}

             {/* Reflexivity Card */}
             {tokenomics?.reflexivity && (
                 <div className="mb-4 p-3 rounded-xl border bg-gray-50 border-gray-100 flex items-center justify-between print:bg-white print:border-gray-200">
                     <div>
                        <div className="text-xs text-[#86868B]">反身性类型 (Reflexivity)</div>
                        <div className="font-semibold text-sm">{tokenomics.reflexivity.type}</div>
                     </div>
                     <div className="text-right">
                        <div className="text-xs text-[#86868B]">死亡螺旋风险</div>
                        <div className={`font-semibold text-sm ${tokenomics.reflexivity.deathSpiralRisk === 'Critical' ? 'text-red-600' : 'text-gray-700'}`}>
                            {tokenomics.reflexivity.deathSpiralRisk}
                        </div>
                     </div>
                 </div>
             )}

             <div className="flex flex-wrap gap-2">
                {tokenomics?.flags?.map((flag, i) => (
                  <Badge key={i} color={flag.includes('High') || flag.includes('Ponzi') ? 'red' : 'yellow'}>{flag}</Badge>
                ))}
             </div>
          </ReportSection>
          
          {/* Market Structure Protocol (V7.0) */}
          {marketStructure && (
              <ReportSection title="市场结构分析 (MSP V7.0)" icon={<BarChart3 size={20}/>}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:block print:space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="text-xs text-[#86868B] mb-1">VC 成本基准</div>
                          <div className="font-semibold text-sm">{marketStructure.vcCostBasis}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="text-xs text-[#86868B] mb-1">流动性状态</div>
                          <div className="font-semibold text-sm">{marketStructure.liquidityStatus}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="text-xs text-[#86868B] mb-1">筹码结构</div>
                          <div className="font-semibold text-sm">{marketStructure.holderStructure}</div>
                      </div>
                  </div>
              </ReportSection>
          )}

          <ReportSection title="链上行为监控 (Monitor V3.0)" icon={<Activity size={20}/>}>
             <p className="text-sm text-[#515154] mb-4">{onchain?.details}</p>
             
             {onchain?.fundsFlow && (
                 <div className="grid grid-cols-3 gap-2 mb-4 text-center print:block print:space-y-2">
                     <div className="p-2 bg-green-50 rounded border border-green-100">
                        <div className="text-xs text-green-600 mb-1">Inflow</div>
                        <div className="font-bold text-sm">{onchain.fundsFlow.inflow}</div>
                     </div>
                     <div className="p-2 bg-red-50 rounded border border-red-100">
                        <div className="text-xs text-red-600 mb-1">Outflow</div>
                        <div className="font-bold text-sm">{onchain.fundsFlow.outflow}</div>
                     </div>
                     <div className="p-2 bg-blue-50 rounded border border-blue-100">
                        <div className="text-xs text-blue-600 mb-1">Whale Behavior</div>
                        <div className="font-bold text-sm">{onchain.fundsFlow.whaleBehavior}</div>
                     </div>
                 </div>
             )}

             <div className="space-y-2">
               <div className="flex flex-wrap gap-2">
                 {(onchain?.monitorTags || []).map((tag, i) => (
                   <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium border border-red-200">
                      🚨 {tag}
                   </span>
                 ))}
                 {(onchain?.grayAreaTags || []).map((tag, i) => (
                   <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                      👁️ {tag} (Gray Area)
                   </span>
                 ))}
               </div>
             </div>
          </ReportSection>

          <ReportSection title="白皮书对齐 (WAP V3.0)" icon={<Scale size={20}/>}>
             <div className="flex items-center gap-4 mb-4">
                 <div className={`h-2 flex-1 rounded-full overflow-hidden bg-gray-100 print:hidden`}>
                     <div className={`h-full ${getDeviationColor(alignment?.deviationGrade || 0)}`} style={{ width: `${100 - (alignment?.deviationGrade || 0) * 20}%` }}></div>
                 </div>
                 <span className="text-sm font-bold whitespace-nowrap">{getDeviationLabel(alignment?.deviationGrade || 0)}</span>
             </div>
             
             <p className="text-sm text-[#515154] mb-6">{alignment?.verdict}</p>

             <div className="border border-[#E5E5EA] rounded-xl overflow-hidden print:border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-[#86868B] print:bg-white">
                        <tr>
                            <th className="px-4 py-2 font-medium">承诺 (Claim)</th>
                            <th className="px-4 py-2 font-medium">现实 (Reality)</th>
                            <th className="px-4 py-2 font-medium w-24">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5EA] print:divide-gray-200">
                        {alignment?.commitments?.map((c, i) => (
                            <tr key={i} className="bg-white">
                                <td className="px-4 py-3">{c.claim}</td>
                                <td className="px-4 py-3 text-[#1D1D1F]">{c.reality}</td>
                                <td className="px-4 py-3">
                                    <Badge color={c.status === 'Aligned' ? 'green' : c.status === 'Fatal' ? 'red' : 'yellow'}>
                                        {c.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </ReportSection>
        </div>

        {/* Right Column - Risks & Metrics */}
        <div className="space-y-8 print:space-y-6">
          
          <GlassCard className="p-6 bg-gradient-to-b from-white to-gray-50/50 print:bg-white print:border-gray-300">
             <div className="flex items-center justify-between mb-4">
                <div>
                   <div className="text-sm text-[#86868B] uppercase tracking-wide mb-1">总评分 (Score V3.0)</div>
                   <div className="text-5xl font-bold text-[#1D1D1F] tracking-tighter">{executiveSummary?.totalScore}</div>
                </div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg ${
                    ['A+', 'A'].includes(executiveSummary?.grade || '') ? 'bg-[#007AFF]' : 
                    ['B'].includes(executiveSummary?.grade || '') ? 'bg-yellow-500' : 
                    ['C'].includes(executiveSummary?.grade || '') ? 'bg-orange-500' : 'bg-red-500'
                } print:border print:text-black print:shadow-none`}>
                    {executiveSummary?.grade}
                </div>
             </div>
             <p className="text-sm text-[#515154] leading-relaxed mb-4">{executiveSummary?.summary}</p>
             
             {executiveSummary?.antiFragilityScore !== undefined && executiveSummary.antiFragilityScore > 0 && (
                 <div className="p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 font-medium mb-4 flex justify-between">
                    <span>🛡️ 反脆弱加分 (Anti-Fragility)</span>
                    <span>+{executiveSummary.antiFragilityScore}</span>
                 </div>
             )}

             <div className="space-y-2">
                {scoreMatrix?.map((item, idx) => (
                   <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B]">{item.category}</span>
                      <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden print:hidden">
                              <div className={`h-full rounded-full ${item.isNegative ? 'bg-red-500' : 'bg-[#1D1D1F]'}`} style={{ width: `${(item.score / item.full) * 100}%` }}></div>
                          </div>
                          <span className="w-8 text-right font-medium">{item.score}/{item.full}</span>
                      </div>
                   </div>
                ))}
             </div>
          </GlassCard>

          {/* Narrative Cycle (V7.0) */}
          <GlassCard className="p-6 relative overflow-hidden print:bg-white print:border-gray-200">
              <div className="absolute top-0 right-0 p-4 opacity-10 print:hidden"><TrendingUp size={80}/></div>
              <h4 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-4">叙事周期 (NCP V7.0)</h4>
              
              <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-mono uppercase">
                      <span>N1</span><span>N6</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex print:border print:border-gray-300">
                      {narrativeStages.map((stage, i) => {
                          const currentIndex = getCurrentStageIndex();
                          let bgClass = "bg-gray-200";
                          if (i < currentIndex) bgClass = "bg-blue-300";
                          if (i === currentIndex) bgClass = "bg-blue-600";
                          return <div key={i} className={`flex-1 border-r border-white ${bgClass}`} title={stage}></div>
                      })}
                  </div>
                  <div className="text-center mt-2 font-bold text-[#1D1D1F]">{narrative?.stage}</div>
              </div>

              <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-[#86868B]">热度评分</span>
                      <span className="font-mono font-bold">{narrative?.heatScore}/100</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-[#86868B]">市场位置</span>
                      <span className="text-right">{narrative?.position}</span>
                  </div>
                  <div className="pt-1">
                      <span className="text-[#86868B] block mb-1">策略建议 (Strategy)</span>
                      <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">{narrative?.strategy}</span>
                  </div>
              </div>
          </GlassCard>

          {/* Risk Assessment (V6.0) */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">风险五维模型 (Risk V6.0)</h4>
                <Badge color={riskAssessment?.tier === 'Tier 1' ? 'green' : riskAssessment?.tier === 'Tier 4' ? 'red' : 'yellow'}>
                    {riskAssessment?.tier}
                </Badge>
             </div>
             
             <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm print:border-gray-300 print:shadow-none">
                 <span className="text-xs text-[#86868B]">未来 30 天风险趋势</span>
                 <div className="flex items-center gap-1 font-medium text-sm">
                     {riskAssessment?.riskTrend === 'Increasing' && <TrendingUp size={16} className="text-red-500"/>}
                     {riskAssessment?.riskTrend === 'Decreasing' && <TrendingUp size={16} className="text-green-500 rotate-180"/>}
                     {riskAssessment?.riskTrend === 'Stable' && <Activity size={16} className="text-blue-500"/>}
                     <span>{riskAssessment?.riskTrend}</span>
                 </div>
             </div>
             
             {/* Risk Mitigation (V6.0) */}
             {riskAssessment?.mitigations && riskAssessment.mitigations.length > 0 && (
                 <div className="p-3 bg-green-50 border border-green-100 rounded-lg print:bg-white print:border-green-200">
                    <div className="text-xs font-bold text-green-800 flex items-center gap-1 mb-1">
                        <Shield size={12}/> 风险缓和因子 (Mitigation)
                    </div>
                    <ul className="text-xs text-green-700 list-disc pl-4 space-y-0.5">
                        {riskAssessment.mitigations.map((m, i) => (
                            <li key={i}>{m}</li>
                        ))}
                    </ul>
                 </div>
             )}

             {riskAssessment?.adversarialCheck && (
                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 print:bg-white">
                     <div className="font-bold flex items-center gap-1 mb-1"><AlertTriangle size={12}/> 对抗性检测警报 (Adversarial)</div>
                     {riskAssessment.adversarialCheck.isForged && (
                        <div className="mb-1">• 伪造检测: <span className="font-medium">{riskAssessment.adversarialCheck.details}</span></div>
                     )}
                     {riskAssessment.adversarialCheck.behaviorPattern && (
                        <div>• 行为指纹 (Behavior Fingerprint): <span className="font-medium italic">{riskAssessment.adversarialCheck.behaviorPattern}</span></div>
                     )}
                 </div>
             )}

             <div className="space-y-3">
                {riskAssessment?.dimensions?.map((dim, i) => (
                   <div key={i} className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md print:shadow-none print:border-gray-300">
                      <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{dim.label}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              dim.score >= 4 ? 'bg-red-100 text-red-600' : 
                              dim.score >= 3 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                          }`}>{dim.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2 print:hidden">
                          <div className={`h-full ${dim.score >= 3 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(dim.score/5)*100}%` }}></div>
                      </div>
                      {dim.note && <div className="text-xs text-[#86868B] leading-tight">{dim.note}</div>}
                   </div>
                ))}
             </div>
          </div>

          {/* Stress Test (V3.0) */}
          <GlassCard className="p-6 border-red-100/50 bg-red-50/10 print:bg-white print:border-red-200">
              <h4 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-4 flex items-center gap-2">
                 <Activity size={16}/> 经济压力测试
              </h4>
              
              {deathSpiralProbValue > 40 && (
                  <div className="mb-4 p-3 bg-red-600 text-white rounded-lg animate-pulse shadow-lg text-center font-bold text-sm print:bg-red-100 print:text-red-700 print:border-red-200 print:animate-none">
                      🚨 CRITICAL ALERT: 死亡螺旋概率高 ({deathSpiralProbValue}%)
                  </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                 <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <div className="text-2xl font-bold text-[#1D1D1F]">{stressTest?.survivalProb}</div>
                    <div className="text-xs text-[#86868B]">存活概率 (S3)</div>
                 </div>
                 <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <div className="text-2xl font-bold text-red-600">{stressTest?.deathSpiralProb}</div>
                    <div className="text-xs text-[#86868B]">死亡螺旋概率</div>
                 </div>
              </div>
              <div className="text-xs text-[#515154] space-y-1 mb-3">
                  <div><span className="font-semibold">测试场景:</span> {stressTest?.scenario}</div>
                  <div><span className="font-semibold">关键脆弱参数:</span> {stressTest?.criticalParam}</div>
              </div>
              
              {/* Time-to-Failure V3.0 */}
              {stressTest?.timeToFailure && (
                 <div className="bg-white p-2 rounded-lg border border-red-100/50 print:border-gray-200">
                    <div className="text-[10px] text-[#86868B] uppercase font-bold mb-1 flex items-center gap-1"><Clock size={10}/> 崩溃时间分布 (Time-to-Failure)</div>
                    <div className="grid grid-cols-3 gap-1 text-center text-xs">
                        <div>
                            <span className="block text-gray-400 text-[10px]">P10</span>
                            <span className="font-mono text-red-600 font-bold">{stressTest.timeToFailure.P10}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-[10px]">P50</span>
                            <span className="font-mono text-orange-600 font-bold">{stressTest.timeToFailure.P50}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-[10px]">P90</span>
                            <span className="font-mono text-green-600 font-bold">{stressTest.timeToFailure.P90}</span>
                        </div>
                    </div>
                 </div>
              )}
          </GlassCard>

          {/* Valuation (V7.0) */}
          <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">场景化估值 (SVP V7.0)</h4>
              <div className="text-xs grid grid-cols-3 gap-2">
                  <div className="p-2 bg-red-50 border border-red-100 rounded text-center print:bg-white print:border-gray-200">
                      <div className="font-bold text-red-700">Bear</div>
                      <div className="text-red-600">{valuation?.bearCase}</div>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-100 rounded text-center print:bg-white print:border-gray-200">
                      <div className="font-bold text-gray-700">Base</div>
                      <div className="text-gray-600">{valuation?.baseCase}</div>
                  </div>
                  <div className="p-2 bg-green-50 border border-green-100 rounded text-center print:bg-white print:border-gray-200">
                      <div className="font-bold text-green-700">Bull</div>
                      <div className="text-green-600">{valuation?.bullCase}</div>
                  </div>
              </div>
          </div>

        </div>
      </div>
      
      {/* Evidence Chain */}
      <div className="mt-12 pt-8 border-t border-[#E5E5EA] print:mt-6 print:pt-4">
          <h4 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-4 flex items-center gap-2">
             <BrainCircuit size={16}/> AI 解释性证据链
          </h4>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm font-mono text-[#515154] space-y-2 print:bg-white print:border-gray-300">
              <p className="font-semibold mb-2">逻辑路径 (Reasoning Path):</p>
              <p className="mb-4 leading-relaxed">{aiExplainability?.logicPath}</p>
              <p className="font-semibold mb-2">关键证据 (Evidence):</p>
              <ul className="list-disc pl-5 space-y-1">
                  {aiExplainability?.evidenceChain?.map((e, i) => (
                      <li key={i}>{e}</li>
                  ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-semibold mb-2">数据来源 (Data Sources):</p>
                  <div className="flex flex-wrap gap-2">
                      {(meta?.dataSources || []).map((source, i) => (
                          <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs flex items-center gap-1 print:border-gray-300">
                              {renderSourceLink(source)}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};

// Simple Chevron Icon for Dropdown
const ChevronDownIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export default Report;
