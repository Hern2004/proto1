
import React, { useState } from 'react';
import { protocolsData } from '../data/protocols';
import { GlassCard, SectionHeading, Badge } from '../components/UI';
import { ChevronDown, ChevronUp, BookOpen, FileText } from 'lucide-react';

interface ProtocolsProps {
    lang?: 'zh' | 'en';
}

const Protocols: React.FC<ProtocolsProps> = ({ lang = 'zh' }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFullText, setShowFullText] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleFullText = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setShowFullText(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Collection': return 'blue';
      case 'Verification': return 'green';
      case 'Risk': return 'red';
      case 'Analysis': return 'yellow';
      default: return 'gray';
    }
  };

  // Translate categories for display
  const translateCategory = (cat: string) => {
    switch (cat) {
      case 'Collection': return '采集类 (Collection)';
      case 'Verification': return '验证类 (Verification)';
      case 'Risk': return '风控类 (Risk)';
      case 'Analysis': return '分析类 (Analysis)';
      case 'Output': return '输出类 (Output)';
      default: return cat;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <SectionHeading 
        title="Protocol Standard Library" 
        subtitle="12 core methodologies driving the Aura Research Engine."
      />

      <div className="grid gap-6">
        {protocolsData.map((protocol) => (
          <GlassCard 
            key={protocol.id} 
            className="transition-all duration-300"
          >
            <div 
              className="flex items-start justify-between cursor-pointer"
              onClick={() => toggleExpand(protocol.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge color={getCategoryColor(protocol.category) as any}>{translateCategory(protocol.category)}</Badge>
                  <span className="text-xs font-mono text-[#86868B] bg-gray-100 px-2 py-0.5 rounded text-opacity-80">
                    {protocol.version}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-1">{protocol.title}</h3>
                <p className="text-[#86868B] text-sm md:text-base">{protocol.description}</p>
              </div>
              <div className="ml-4 mt-2 text-[#86868B]">
                {expandedId === protocol.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {expandedId === protocol.id && (
              <div className="mt-6 pt-6 border-t border-[#E5E5EA] animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#86868B] flex items-center gap-2">
                      <BookOpen size={14} /> Core Abstract
                    </h4>
                    <button 
                      onClick={(e) => toggleFullText(e, protocol.id)}
                      className="text-xs text-[#007AFF] flex items-center gap-1 hover:underline"
                    >
                      <FileText size={12} /> {showFullText[protocol.id] ? 'Collapse' : 'View Full Text'}
                    </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  {protocol.content.map((line, idx) => (
                    <div key={idx} className="flex gap-3 text-[#1D1D1F] leading-relaxed text-sm md:text-base">
                      <span className="text-[#007AFF] font-bold">•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                {showFullText[protocol.id] && protocol.fullText && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono text-[#515154] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {protocol.fullText.trim()}
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Protocols;
