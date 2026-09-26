import React, { useState } from 'react';
import { Gift, Award, ChevronRight } from 'lucide-react';
import { LoyaltyTier } from '../types';
import { LoyaltyTiersModal } from './LoyaltyTiersModal';
import { useApp } from '../context/AppContext';

interface LoyaltyPointsWidgetProps {
  points: number;
  tier: LoyaltyTier;
}

export const LoyaltyPointsWidget: React.FC<LoyaltyPointsWidgetProps> = ({
  points,
  tier
}) => {
  const { formatPrice } = useApp();
  const [showTiersModal, setShowTiersModal] = useState(false);

  const nextTierPoints = tier === 'Bronze' ? 2500 : tier === 'Silver' ? 5000 : 10000;
  const progressPercent = Math.min(100, Math.round((points / nextTierPoints) * 100));

  return (
    <>
      <div className="bg-gradient-to-br from-pink-900 via-rose-900 to-pink-950 text-white rounded-3xl p-5 shadow-lg border border-pink-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <Gift className="h-4 w-4" />
            <span>रिवार्ड पॉइंट्स बैलेंस</span>
          </div>
          <span className="text-[10px] bg-amber-400 text-pink-950 font-black px-2.5 py-0.5 rounded-full uppercase">
            {tier} ⭐
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-mono font-black text-3xl text-amber-300">
              {points.toLocaleString()}
            </span>
            <span className="text-xs text-pink-200 block">
              (= {formatPrice(points / 100)} डिस्काउंट वैल्‍यू)
            </span>
          </div>

          <button
            onClick={() => setShowTiersModal(true)}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1 transition"
          >
            <span>फायदे देखें</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-1">
          <div className="w-full bg-pink-950/80 h-2 rounded-full overflow-hidden border border-pink-800">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-pink-200 text-right">
            अगले टियर हेतु {Math.max(0, nextTierPoints - points)} और पॉइंट्स चाहिए ({progressPercent}%)
          </p>
        </div>
      </div>

      <LoyaltyTiersModal
        isOpen={showTiersModal}
        onClose={() => setShowTiersModal(false)}
        currentTier={tier}
      />
    </>
  );
};
