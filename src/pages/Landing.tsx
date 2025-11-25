import React, { useState } from 'react';
import { Button, GlassCard } from '../components/UI';
import { ArrowRight, ShieldCheck, Activity, FileText, Search } from 'lucide-react';
import { Logo } from '../components/Logo';
import { HeroAnimation } from '../components/HeroAnimation';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingProps {
  onSearch: (query: string) => void;
  onDocs: () => void;
}

const Landing: React.FC<LandingProps> = ({ onSearch, onDocs }) => {
  const [input, setInput] = useState('');
  const [introComplete, setIntroComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
            <HeroAnimation onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 md:px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Decor - Hidden on mobile to improve performance and prevent overflow */}
        <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto z-10 space-y-6 md:space-y-8 w-full">
          
          {/* Brand Logo Large */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Logo className="w-24 h-24 md:w-32 md:h-32" showText={false} />
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-7xl font-semibold tracking-tighter text-[#1D1D1F] leading-[1.1]">
              ProtoEngine <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#8B5CF6]">Web3 投研引擎</span>
            </h1>
            <p className="text-base md:text-xl text-[#86868B] font-light max-w-2xl mx-auto leading-relaxed px-4">
              由协议驱动的Web3投研引擎<br className="hidden md:block"/>
              验证真实性 · 对齐白皮书 · 识别深层风险
            </p>
          </div>

          {/* Search Section */}
          <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入项目名称 或 合约地址"
                className="w-full pl-12 pr-4 py-4 md:py-5 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-base md:text-lg transition-all placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="absolute inset-y-2 right-2 bg-[#1D1D1F] hover:bg-black text-white px-4 md:px-6 rounded-xl font-medium transition-all active:scale-95 text-sm md:text-base"
              >
                开始分析
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-3 md:gap-4 justify-center text-sm text-[#86868B]">
              <span>热门搜索:</span>
              <button onClick={() => onSearch('EtherLayer X')} className="hover:text-blue-600 underline decoration-dotted">EtherLayer X</button>
              <button onClick={() => onSearch('ZkSync')} className="hover:text-blue-600 underline decoration-dotted">ZkSync</button>
              <button onClick={() => onSearch('Arbitrum')} className="hover:text-blue-600 underline decoration-dotted">Arbitrum</button>
            </div>
          </div>

          <div className="pt-4 md:pt-8">
            <Button variant="ghost" onClick={onDocs} className="text-sm md:text-base">
              查看协议文档库 <ArrowRight size={16} className="ml-2"/>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 text-left">
            <GlassCard className="space-y-3 p-6 md:p-8">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#007AFF]">
                <FileText size={20} />
              </div>
              <h3 className="text-lg font-semibold">协议驱动</h3>
              <p className="text-[#86868B] text-sm leading-relaxed">
                基于信息采集协议 (V4.0) 和白皮书对齐协议 (WAP V3.0) 确保结构完整性。
              </p>
            </GlassCard>
            
            <GlassCard className="space-y-3 p-6 md:p-8">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-semibold">风险识别</h3>
              <p className="text-[#86868B] text-sm leading-relaxed">
                通过多层验证协议 (V6.0) 和链上监控 (V3.0) 过滤噪音，直击风险本质。
              </p>
            </GlassCard>

            <GlassCard className="space-y-3 p-6 md:p-8">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-semibold">压力测试</h3>
              <p className="text-[#86868B] text-sm leading-relaxed">
                内置代币经济学 (V5.0) 和经济压力测试 (V3.0) 仿真引擎，预演极端行情。
              </p>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Landing;