
import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Protocols from './pages/Protocols';
import Report from './pages/Report';
import VeoStudio from './pages/VeoStudio';
import Pricing from './pages/Pricing';
import { ViewState, ResearchReport } from './types';
import { Activity, Book, Video, Wallet, Globe, ChevronDown } from 'lucide-react';
import { Logo } from './components/Logo';
import { translations } from './i18n';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.Landing);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reportData, setReportData] = useState<ResearchReport | null>(null);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const t = translations[lang];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setReportData(null); // Reset previous report
    setCurrentView(ViewState.Dashboard);
  };

  const handleAnalysisComplete = (data: ResearchReport) => {
    setReportData(data);
    setCurrentView(ViewState.Report);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.Landing:
        return <Landing 
          onSearch={handleSearch} 
          onDocs={() => setCurrentView(ViewState.Protocols)} 
          onVeo={() => setCurrentView(ViewState.Veo)}
          onPricing={() => setCurrentView(ViewState.Pricing)}
          onToggleLang={toggleLanguage}
          lang={lang}
        />;
      case ViewState.Dashboard:
        return (
          <Dashboard 
            query={searchQuery} 
            onAnalysisComplete={handleAnalysisComplete}
            onViewReport={() => setCurrentView(ViewState.Report)} 
            lang={lang}
          />
        );
      case ViewState.Protocols:
        return <Protocols lang={lang} />;
      case ViewState.Report:
        return <Report query={searchQuery} data={reportData} lang={lang} />;
      case ViewState.Veo:
        return <VeoStudio lang={lang} />;
      case ViewState.Pricing:
        return <Pricing lang={lang} />;
      default:
        return <Landing 
          onSearch={handleSearch} 
          onDocs={() => setCurrentView(ViewState.Protocols)}
          onVeo={() => setCurrentView(ViewState.Veo)}
          onPricing={() => setCurrentView(ViewState.Pricing)}
          onToggleLang={toggleLanguage}
          lang={lang}
        />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 bg-[#F5F5F7]">
      {/* Navbar - Apple Style Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border-b border-white/40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group h-9" 
            onClick={() => setCurrentView(ViewState.Landing)}
          >
            {/* Only show logo in the header of the Home page */}
            {currentView === ViewState.Landing && (
              <Logo className="w-9 h-9" showText={false} disableAnimation />
            )}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 text-sm font-medium text-[#1D1D1F]">
             
             {/* Language Switcher - Apple Style Glass */}
             <button 
                onClick={toggleLanguage}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 active:scale-95"
                title="Switch Language"
             >
                <Globe size={15} className="text-[#1D1D1F]/70 group-hover:text-[#1D1D1F] transition-colors"/> 
                <span className="font-medium text-xs text-[#1D1D1F]/80 group-hover:text-[#1D1D1F] tracking-wide w-5 text-center">{lang === 'zh' ? 'CN' : 'EN'}</span>
                <ChevronDown size={12} className="text-[#1D1D1F]/40 group-hover:text-[#1D1D1F]/70 transition-colors"/>
             </button>

             {/* Pricing/Payment Button - Premium Solid Black */}
             <button 
                onClick={() => setCurrentView(ViewState.Pricing)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-95 border border-transparent ${
                    currentView === ViewState.Pricing 
                    ? 'bg-[#1D1D1F] text-white' 
                    : 'bg-[#1D1D1F] text-white hover:bg-black'
                }`}
             >
                <Wallet size={15} className="text-white/90"/> 
                <span className="font-medium tracking-wide text-xs md:text-sm">{t.nav.pricing}</span>
             </button>

             {/* Divider */}
             <div className="h-4 w-[1px] bg-[#1D1D1F]/10 mx-1 hidden md:block"></div>

             {/* Main Navigation Links - Clean Text */}
             <div className="hidden md:flex items-center gap-1">
                <button 
                    onClick={() => setCurrentView(ViewState.Veo)}
                    className={`px-4 py-2 rounded-full transition-all text-sm ${currentView === ViewState.Veo ? 'text-black font-semibold bg-black/5' : 'text-[#86868B] hover:text-black hover:bg-black/5'}`}
                >
                    {t.nav.veo}
                </button>
                <button 
                    onClick={() => setCurrentView(ViewState.Dashboard)}
                    className={`px-4 py-2 rounded-full transition-all text-sm ${currentView === ViewState.Dashboard ? 'text-black font-semibold bg-black/5' : 'text-[#86868B] hover:text-black hover:bg-black/5'}`}
                >
                    {t.nav.analysis}
                </button>
                <button 
                    onClick={() => setCurrentView(ViewState.Protocols)}
                    className={`px-4 py-2 rounded-full transition-all text-sm ${currentView === ViewState.Protocols ? 'text-black font-semibold bg-black/5' : 'text-[#86868B] hover:text-black hover:bg-black/5'}`}
                >
                    {t.nav.protocols}
                </button>
             </div>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {renderView()}
      </main>

    </div>
  );
};

export default App;
