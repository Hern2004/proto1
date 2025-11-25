import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string; 
  showText?: boolean;
  textClassName?: string;
  disableAnimation?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-12 h-12", 
  showText = true,
  textClassName = "text-2xl",
  disableAnimation = false
}) => {
  return (
    <motion.div 
      className={`flex items-center gap-3 select-none ${className}`}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="geoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" /> {/* Electric Blue */}
            <stop offset="100%" stopColor="#8B5CF6" /> {/* Vivid Violet */}
          </linearGradient>
        </defs>
        
        {/* Stem: Vertical Pillar */}
        {/* x=24, y=18, width=16, height=64 */}
        <motion.rect 
          x="24" y="18" width="16" height="64" rx="8"
          fill="url(#geoGradient)"
          initial={disableAnimation ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Loop: Upper Arc */}
        {/* Starts at 48,18. Width ~12. Arc to 60,58 */}
        <motion.path 
          d="M 48 18 H 60 A 20 20 0 0 1 60 58 H 48"
          stroke="url(#geoGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={disableAnimation ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: disableAnimation ? 0 : 0.15 }}
        />
      </motion.svg>
      
      {showText && (
        <motion.span 
          className={`font-sans font-bold tracking-tight text-[#1E293B] ${textClassName}`}
          initial={disableAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: disableAnimation ? 0 : 0.3, duration: 0.5 }}
        >
          ProtoEngine
        </motion.span>
      )}
    </motion.div>
  );
};