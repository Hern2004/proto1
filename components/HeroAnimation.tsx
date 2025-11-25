import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { ChevronRight, X } from 'lucide-react';

interface HeroAnimationProps {
  onComplete: () => void;
}

export const HeroAnimation: React.FC<HeroAnimationProps> = ({ onComplete }) => {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // Timeline orchestration (Total ~15s)
    const times = [
      2500, // Scene 0: Brand (Static) (0-2.5s)
      3000, // Scene 1: Protocols (2.5-5.5s)
      3000, // Scene 2: Geometric Assembly (5.5-8.5s)
      3500, // Scene 3: Vis (8.5-12s)
      // Scene 4 is CTA
    ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let accumulatedTime = 0;

    // Scene 0 is initial state
    accumulatedTime += times[0];
    timeouts.push(setTimeout(() => setScene(1), accumulatedTime));

    accumulatedTime += times[1];
    timeouts.push(setTimeout(() => setScene(2), accumulatedTime));

    accumulatedTime += times[2];
    timeouts.push(setTimeout(() => setScene(3), accumulatedTime));

    accumulatedTime += times[3];
    timeouts.push(setTimeout(() => setScene(4), accumulatedTime));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F5F7] overflow-hidden font-sans absolute inset-0 flex flex-col items-center justify-center">
      
      {/* Skip Button */}
      <motion.button
        className="absolute top-6 right-6 z-50 text-[#86868B] text-sm hover:text-[#1D1D1F] transition-colors flex items-center gap-1 p-2"
        onClick={onComplete}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        跳过动画 <X size={14} />
      </motion.button>

      <AnimatePresence mode="wait">
        
        {/* SCENE 0: Brand Intro (Static Logo) */}
        {scene === 0 && (
          <motion.div
            key="scene0"
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Logo className="w-20 h-20 md:w-24 md:h-24 mb-6" showText={false} disableAnimation />
            <motion.h1 
              className="text-3xl md:text-6xl font-semibold text-[#1D1D1F] tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              ProtoEngine
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-[#86868B] font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              以协议驱动的全链研究引擎
            </motion.p>
          </motion.div>
        )}

        {/* SCENE 1: Protocols */}
        {scene === 1 && (
          <motion.div
            key="scene1"
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center scale-75 md:scale-100">
                {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 m-auto rounded-full border border-blue-500/30"
                    style={{ width: 200 + i * 80, height: 200 + i * 80 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                    scale: [0.8, 1, 1.02, 1],
                    opacity: 1,
                    borderColor: ["rgba(59, 130, 246, 0.3)", "rgba(99, 102, 241, 0.5)", "rgba(59, 130, 246, 0.3)"]
                    }}
                    transition={{ 
                    delay: i * 0.2, 
                    duration: 2, 
                    times: [0, 0.5, 0.8, 1],
                    repeat: Infinity 
                    }}
                >
                    <motion.div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F7] px-2 text-xs font-medium text-blue-600 whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                    >
                        {['协议抽取', '链上验证', '多模型共识'][i]}
                    </motion.div>
                </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* SCENE 2: Geometric Assembly (Constructing the Logo) */}
        {scene === 2 && (
          <motion.div
            key="scene2"
            className="absolute inset-0 flex items-center justify-center bg-[#F5F5F7]"
            exit={{ opacity: 0 }}
          >
             <div className="relative w-32 h-32 md:w-48 md:h-48">
                {/* We use a raw SVG here to perfectly match the Logo component's coordinate system */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                   <defs>
                      <linearGradient id="geoGradientAnim" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4285F4" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>

                   {/* Stem: Rising up animation */}
                   {/* Target Y is 18 (from Logo.tsx). We animate transform or Y attr. */}
                   <motion.rect
                      x="24" width="16" height="64" rx="8"
                      fill="url(#geoGradientAnim)"
                      initial={{ y: 80, opacity: 0 }} 
                      animate={{ y: 18, opacity: 1 }} 
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                   />

                   {/* Loop: Sliding in animation */}
                   <motion.path
                      d="M 48 18 H 60 A 20 20 0 0 1 60 58 H 48"
                      stroke="url(#geoGradientAnim)"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                   />
                </svg>
             </div>

            <motion.p
               className="absolute mt-48 md:mt-56 text-[#1D1D1F] font-medium tracking-wide text-lg md:text-xl"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.0 }}
            >
                构建可验证的信任
            </motion.p>
          </motion.div>
        )}

        {/* SCENE 3: Visualization Cards */}
        {scene === 3 && (
          <motion.div
            key="scene3"
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6"
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Left: 3D Cards - HIDDEN ON MOBILE to prevent crashes/overflow */}
            <div className="relative w-64 h-80 perspective-1000 hidden md:block">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col justify-between"
                        style={{ zIndex: 3-i }}
                        initial={{ opacity: 0, x: -50, rotateY: -20 }}
                        animate={{ 
                            opacity: 1, 
                            x: i * 20, 
                            y: i * 20, 
                            scale: 1 - i * 0.05,
                            rotateY: 0
                        }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                    >
                        <div className="h-4 w-24 bg-gray-100 rounded mb-4"/>
                        <div className="flex-1 bg-blue-50/50 rounded-lg mb-2 relative overflow-hidden">
                             <div className={`absolute bottom-0 left-0 w-full bg-blue-500 opacity-20`} style={{ height: `${40 + i*20}%` }}></div>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded"/>
                    </motion.div>
                ))}
            </div>

            {/* Right: Text - Centered on mobile */}
            <div className="space-y-6 text-center md:text-left">
                {[
                    { title: "结构化 · 可验证", desc: "Tokenomics & On-chain" },
                    { title: "多模型 · 高置信", desc: "Risk V6.0 Framework" },
                    { title: "实时监控 · 自动预警", desc: "Monitor V3.0 Engine" }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                    >
                        <h3 className="text-xl font-bold text-[#1D1D1F]">{item.title}</h3>
                        <p className="text-sm text-[#86868B]">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* SCENE 4: CTA */}
        {scene === 4 && (
          <motion.div
            key="scene4"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
             <Logo className="w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8" showText={false} />
             <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1F] mb-6 md:mb-8">开启专业投研之旅</h2>
             
             <motion.button
                onClick={onComplete}
                className="group relative bg-[#1D1D1F] text-white text-base md:text-lg font-medium px-8 md:px-10 py-3 md:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{ boxShadow: ["0px 4px 12px rgba(0,0,0,0.1)", "0px 8px 24px rgba(59, 130, 246, 0.3)", "0px 4px 12px rgba(0,0,0,0.1)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
             >
                <Logo className="w-5 h-5 md:w-6 md:h-6" showText={false} />
                开始研究
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
             </motion.button>
             
             <p className="mt-6 text-sm text-[#86868B]">免费试用 · 立即上手</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};