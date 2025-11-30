
import React, { useState } from 'react';
import { GlassCard, Button, SectionHeading, Badge } from '../components/UI';
import { translations } from '../i18n';
import { CheckCircle2, CreditCard, Wallet, Smartphone, QrCode, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface PricingProps {
  lang: 'zh' | 'en';
}

const Pricing: React.FC<PricingProps> = ({ lang }) => {
  const t = translations[lang].pricing;
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'wechat' | 'alipay' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2000);
  };

  const resetPayment = () => {
    setIsPaid(false);
    setPaymentMethod(null);
  };

  if (isPaid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-[#1D1D1F] mb-4">{t.payment_success}</h2>
        <p className="text-[#86868B] mb-8 text-lg">Thank you for your subscription. Your account has been upgraded.</p>
        <Button onClick={resetPayment}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <SectionHeading 
        title={t.title} 
        subtitle={t.subtitle}
        className="text-center mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Pro Plan */}
        <GlassCard 
          className={`p-8 border-2 transition-all cursor-pointer relative overflow-hidden ${selectedPlan === 'pro' ? 'border-indigo-500 shadow-2xl scale-[1.02] bg-white' : 'border-transparent hover:border-gray-200'}`}
          onClick={() => setSelectedPlan('pro')}
        >
          {selectedPlan === 'pro' && (
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">SELECTED</div>
          )}
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-xl font-bold text-[#1D1D1F]">{t.pro_title}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                   <span className="text-4xl font-bold text-[#1D1D1F]">{t.pro_price}</span>
                   <span className="text-[#86868B]">{t.pro_period}</span>
                </div>
             </div>
             <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <Zap size={24} />
             </div>
          </div>
          <div className="space-y-3 mb-8">
             <div className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-2">{t.features}</div>
             {[1,2,3,4].map(i => (
               <div key={i} className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                  <CheckCircle2 size={16} className="text-green-500"/> Feature {i} Description
               </div>
             ))}
          </div>
        </GlassCard>

        {/* Enterprise Plan */}
        <GlassCard 
          className={`p-8 border-2 transition-all cursor-pointer relative overflow-hidden ${selectedPlan === 'enterprise' ? 'border-indigo-500 shadow-2xl scale-[1.02] bg-white' : 'border-transparent hover:border-gray-200'}`}
          onClick={() => setSelectedPlan('enterprise')}
        >
           {selectedPlan === 'enterprise' && (
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">SELECTED</div>
          )}
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-xl font-bold text-[#1D1D1F]">{t.ent_title}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                   <span className="text-4xl font-bold text-[#1D1D1F]">{t.ent_price}</span>
                   <span className="text-[#86868B]">{t.ent_period}</span>
                </div>
             </div>
             <div className="p-3 bg-gray-100 rounded-xl text-gray-800">
                <ShieldCheck size={24} />
             </div>
          </div>
          <div className="space-y-3 mb-8">
             <div className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-2">{t.features}</div>
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                  <CheckCircle2 size={16} className="text-green-500"/> Advanced Feature {i}
               </div>
             ))}
          </div>
        </GlassCard>
      </div>

      {/* Payment Methods */}
      <GlassCard className="max-w-2xl mx-auto p-8">
        <h3 className="text-lg font-bold mb-6 text-center">Select Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
           <button 
             onClick={() => setPaymentMethod('crypto')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'crypto' ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-md transform scale-[1.02]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
           >
              <Wallet size={24} />
              <span className="text-sm font-medium">{t.pay_crypto}</span>
           </button>
           <button 
             onClick={() => setPaymentMethod('wechat')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'wechat' ? 'bg-green-50 border-green-500 text-green-700 shadow-md transform scale-[1.02]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
           >
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">W</div>
              <span className="text-sm font-medium">{t.pay_wechat}</span>
           </button>
           <button 
             onClick={() => setPaymentMethod('alipay')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'alipay' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md transform scale-[1.02]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
           >
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">支</div>
              <span className="text-sm font-medium">{t.pay_alipay}</span>
           </button>
        </div>

        {paymentMethod === 'crypto' && (
           <div className="text-center space-y-4 animate-fade-in">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                 <p className="text-sm text-gray-500 mb-2">Send USDT (ERC20) to:</p>
                 <code className="bg-white px-3 py-1 rounded border text-xs font-mono break-all text-orange-600">0xdAC17F958D2ee523a2206206994597C13D831ec7</code>
              </div>
              <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                {isProcessing ? t.payment_processing : t.connect_wallet}
              </Button>
           </div>
        )}

        {(paymentMethod === 'wechat' || paymentMethod === 'alipay') && (
           <div className="text-center space-y-4 animate-fade-in">
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                 <QrCode size={64} className="text-gray-400"/>
                 <div className="absolute bottom-2 text-[10px] text-gray-400">Mock QR Code</div>
              </div>
              <p className="text-sm text-gray-500">{t.scan_qr}</p>
              <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-[#1D1D1F] hover:bg-black text-white">
                {isProcessing ? t.payment_processing : "I have paid"}
              </Button>
           </div>
        )}
      </GlassCard>

    </div>
  );
};

export default Pricing;
