
import React, { useState } from 'react';
import { Button, GlassCard } from '../components/UI';
import { ArrowRight, ShieldCheck, Activity, FileText, Search, Video, CreditCard, Globe } from 'lucide-react';
import { Logo } from '../components/Logo';
import { translations } from '../i18n';

interface LandingProps {
  onSearch: (query: string) => void;
  onDocs: () => void;
  onVeo: () => void;
  onPricing: () => void;
  onToggleLang: () => void;
  lang: 'zh' | 'en';
}

const Landing: React.FC<LandingProps> = ({ onSearch, onDocs, onVeo, onPricing, onToggleLang, lang }) => {
  const [input, setInput] = useState('');
  const t = translations[lang].landing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 space-y-6 md:space-y-8 w-full">
        
        {/* Brand Logo Large - Animation Disabled */}
        <div className="flex justify-center mb-4 md:mb-6">
          <Logo className="w-24 h-24 md:w-32 md:h-32" showText={false} disableAnimation={true} />
        </div>

        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tighter text-[#1D1D1F] leading-[1.1]">
            ProtoEngine <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#8B5CF6]">{t.title_sub}</span>
          </h1>
          <p className="text-base md:text-xl text-[#86868B] font-light max-w-2xl mx-auto leading-relaxed px-4">
            {t.subtitle}
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-lg mx-auto relative z-20 space-y-4">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full pl-12 pr-4 py-4 md:py-5 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-base md:text-lg transition-all placeholder:text-gray-400"
            />
            <button 
              type="submit"
              className="absolute inset-y-2 right-2 bg-[#1D1D1F] hover:bg-black text-white px-4 md:px-6 rounded-xl font-medium transition-all active:scale-95 text-sm md:text-base"
            >
              {t.start_analysis}
            </button>
          </form>

          <div className="flex flex-wrap gap-3 justify-center text-sm text-[#86868B]">
            <span>{t.hot_search}:</span>
            <button onClick={() => onSearch('EtherLayer X')} className="hover:text-blue-600 underline decoration-dotted">EtherLayer X</button>
            <button onClick={() => onSearch('ZkSync')} className="hover:text-blue-600 underline decoration-dotted">ZkSync</button>
            <button onClick={() => onSearch('Arbitrum')} className="hover:text-blue-600 underline decoration-dotted">Arbitrum</button>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Button variant="primary" onClick={onPricing} className="text-sm md:text-base bg-[#1D1D1F] text-white hover:scale-105 transition-transform">
              <CreditCard size={18} /> {t.pricing_btn}
          </Button>
          <Button variant="secondary" onClick={onVeo} className="text-sm md:text-base">
              <Video size={18} /> {t.veo_btn}
          </Button>
          <Button variant="ghost" onClick={onToggleLang} className="text-sm md:text-base bg-white/50 hover:bg-white border border-gray-200">
              <Globe size={18} /> {lang === 'zh' ? 'Switch to English' : '切换中文'}
          </Button>
          <Button variant="ghost" onClick={onDocs} className="text-sm md:text-base">
            {t.docs_btn} <ArrowRight size={16} className="ml-2"/>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 text-left">
          <GlassCard className="space-y-3 p-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#007AFF]">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-semibold">{t.card_protocol_title}</h3>
            <p className="text-[#86868B] text-sm leading-relaxed">
              {t.card_protocol_desc}
            </p>
          </GlassCard>
          
          <GlassCard className="space-y-3 p-6">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-semibold">{t.card_risk_title}</h3>
            <p className="text-[#86868B] text-sm leading-relaxed">
              {t.card_risk_desc}
            </p>
          </GlassCard>

          <GlassCard className="space-y-3 p-6">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Activity size={20} />
            </div>
            <h3 className="text-lg font-semibold">{t.card_stress_title}</h3>
            <p className="text-[#86868B] text-sm leading-relaxed">
              {t.card_stress_desc}
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
export default Landing;
