import React from 'react';
import { X, Award, CheckCircle2, Star, Crown, Shield } from 'lucide-react';
import { LoyaltyTier } from '../types';

interface LoyaltyTiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: LoyaltyTier;
}

export const LoyaltyTiersModal: React.FC<LoyaltyTiersModalProps> = ({
  isOpen,
  onClose,
  currentTier
}) => {
  if (!isOpen) return null;

  const tiers = [
    {
      name: 'Bronze',
      pointsRange: '0 - 2,500 pts',
      icon: <Award className="h-6 w-6 text-amber-700" />,
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      benefits: [
        'खरीद पर 5% रिवॉर्ड पॉइंट्स',
        'जन्मदिन विशेष उपहार (100 पॉइंट्स बोनस)',
        'सामान्य डिस्काउंट कूपन'
      ]
    },
    {
      name: 'Silver',
      pointsRange: '2,501 - 5,000 pts',
      icon: <Star className="h-6 w-6 text-slate-400" />,
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
      benefits: [
        'सभी परिधानों पर +3% अतिरिक्त छूट',
        '₹500+ ऑर्डर पर सदैव मुफ़्त डिलीवरी',
        'सेल की प्री-एक्सेस (Early Access)',
        '200 जन्मदिन बोनस पॉइंट्स'
      ]
    },
    {
      name: 'Gold',
      pointsRange: '5,001 - 10,000 pts',
      icon: <Shield className="h-6 w-6 text-amber-500" />,
      badgeBg: 'bg-amber-200 text-amber-950 border-amber-400',
      benefits: [
        'सभी परिधानों पर +5% अतिरिक्त छूट',
        'सदैव मुफ़्त डिलीवरी & मुफ़्त 7-दिन रिटर्न',
        'पर्सनल एथनिक स्टाइल कंसल्टेंट सहायता',
        '500 जन्मदिन बोनस पॉइंट्स'
      ]
    },
    {
      name: 'Platinum',
      pointsRange: '10,000+ pts',
      icon: <Crown className="h-6 w-6 text-purple-600" />,
      badgeBg: 'bg-purple-100 text-purple-950 border-purple-300',
      benefits: [
        'सभी परिधानों पर +8% वीआईपी छूट',
        'वीआईपी कस्टमर केयर सपोर्ट (+91 94150 00000)',
        'मुफ़्त कस्टम ब्लाउज स्टिचिंग वाउचर',
        '1000 जन्मदिन बोनस पॉइंट्स'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-pink-900 to-rose-900 text-white">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-amber-300" />
            <div>
              <h2 className="font-serif font-bold text-lg">राजरानी लॉयल्टी मेंबरशिप टियर्स</h2>
              <p className="text-[11px] text-pink-200">आपकी वर्तमान सदस्यता: <strong>{currentTier} ⭐</strong></p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-full p-1.5 text-white/80 hover:bg-white/20 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tiers List */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiers.map(t => {
              const isCurrent = t.name.toLowerCase() === currentTier.toLowerCase();
              return (
                <div
                  key={t.name}
                  className={`p-4 rounded-2xl border-2 transition relative space-y-2 ${
                    isCurrent
                      ? 'border-pink-600 bg-pink-50/50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute top-3 right-3 bg-pink-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                      वर्तमान स्तर
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                      {t.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{t.name} Tier</h4>
                      <span className="text-[11px] text-slate-500 font-semibold">{t.pointsRange}</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {t.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
