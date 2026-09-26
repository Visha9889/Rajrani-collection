import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreditTermsDisplay: React.FC = () => {
  const { user, formatPrice } = useApp();
  const profile = user.wholesaleProfile;

  const creditLimit = profile?.creditLimit || 100000;
  const creditUsed = profile?.creditUsed || 35000;
  const availableCredit = creditLimit - creditUsed;

  const terms = [
    {
      title: '100% अग्रिम भुगतान (Advance Payment)',
      desc: 'कार्ड / यूपीआई / बैंक ट्रांसफर द्वारा तत्काल भुगतान।',
      available: true
    },
    {
      title: '50-50 क्रेडिट टर्म (50% Split)',
      desc: '50% राशि अभी दें, शेष 50% डिलीवरी समय पर।',
      available: true
    },
    {
      title: '7-दिवसीय बी2बी क्रेडिट (7 Days Term)',
      desc: 'माप की डिलीवरी के 7 दिनों के भीतर भुगतान करें।',
      available: true
    },
    {
      title: '15-दिवसीय क्रेडिट (15 Days Term)',
      desc: '₹50,000+ नियमित आर्डर पूरे करने वाले व्यापारियों हेतु।',
      available: profile?.status === 'approved'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-blue-200 shadow-md space-y-4 text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-700" />
          <h4 className="font-serif font-bold text-base text-blue-950">बी2बी क्रेडिट सीमा एवं भुगतान शर्तें (B2B Credit Terms)</h4>
        </div>

        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>उपलब्ध क्रेडिट: {formatPrice(availableCredit)}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {terms.map((t, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl border transition ${
              t.available
                ? 'bg-blue-50/50 border-blue-200'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className={`h-4 w-4 ${t.available ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{t.title}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
