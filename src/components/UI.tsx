import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-card rounded-3xl p-6 transition-all duration-300 hover:shadow-lg border border-white/40 ${className} ${onClick ? 'cursor-pointer hover:scale-[1.01] active:scale-95' : ''}`}
  >
    {children}
  </div>
);

export const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; className?: string; onClick?: () => void; disabled?: boolean }> = ({ children, variant = 'primary', className = '', onClick, disabled }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]";
  const interactionStyle = disabled ? "opacity-50 cursor-not-allowed" : "active:scale-95 cursor-pointer";
  
  const variants = {
    primary: "bg-[#1D1D1F] text-white hover:bg-black shadow-md",
    secondary: "bg-[#E8E8ED] text-[#1D1D1F] hover:bg-[#D2D2D7]",
    ghost: "bg-transparent text-[#007AFF] hover:bg-blue-50/50"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${interactionStyle} ${className}`} 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'blue' | 'yellow' | 'red' | 'gray' }> = ({ children, color = 'gray' }) => {
  const colors = {
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]} backdrop-blur-sm`}>
      {children}
    </span>
  );
};

export const SectionHeading: React.FC<{ title: string; subtitle?: string, className?: string }> = ({ title, subtitle, className = '' }) => (
  <div className={`mb-8 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-2">{title}</h2>
    {subtitle && <p className="text-lg text-[#86868B] font-light max-w-2xl">{subtitle}</p>}
  </div>
);