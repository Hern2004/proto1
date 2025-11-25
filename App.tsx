import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Protocols from './pages/Protocols';
import Report from './pages/Report';
import { ViewState, ResearchReport } from './types';
import { Activity, Book } from 'lucide-react';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.Landing);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reportData, setReportData] = useState<ResearchReport | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setReportData(null); // Reset previous report
    setCurrentView(ViewState.Dashboard);
  };

  const handleAnalysisComplete = (data: ResearchReport) => {
    setReportData(data);
    setCurrentView(ViewState.Report);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.Landing:
        return <Landing onSearch={handleSearch} onDocs={() => setCurrentView(ViewState.Protocols)} />;
      case ViewState.Dashboard:
        return (
          <Dashboard 
            query={searchQuery} 
            onAnalysisComplete={handleAnalysisComplete}
            onViewReport={() => setCurrentView(ViewState.Report)} 
          />
        );
      case ViewState.Protocols:
        return <Protocols />;
      case ViewState.Report:
        return <Report query={searchQuery} data={reportData} />;
      default:
        return <Landing onSearch={handleSearch} onDocs={() => setCurrentView(ViewState.Protocols)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group h-9" 
            onClick={() => setCurrentView(ViewState.Landing)}
          >
            {/* 
                Logo Logic based on request:
                "只在主页的页眉位置展示" (Only show in the header of the Home page)
            */}
            {currentView === ViewState.Landing && (
              <Logo className="w-9 h-9" showText={false} disableAnimation />
            )}
            {/* For other pages, we leave it empty or use a simple home icon if requested, but for now we follow strict "only on home" */}
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-[#1D1D1F]">
             <button 
                onClick={() => setCurrentView(ViewState.Dashboard)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${currentView === ViewState.Dashboard ? 'bg-white shadow-sm text-black' : 'text-[#86868B] hover:text-black'}`}
             >
                <Activity size={16}/> 投研分析
             </button>
             <button 
                onClick={() => setCurrentView(ViewState.Protocols)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${currentView === ViewState.Protocols ? 'bg-white shadow-sm text-black' : 'text-[#86868B] hover:text-black'}`}
             >
                <Book size={16}/> 协议文档
             </button>
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