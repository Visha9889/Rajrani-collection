import React from 'react';
import { Users, Copy, MessageCircle, Mail, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReferralWidgetProps {
  referralCode: string;
  referralsCount: number;
}

export const ReferralWidget: React.FC<ReferralWidgetProps> = ({
  referralCode,
  referralsCount
}) => {
  const { showToast } = useApp();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    showToast(`रेफरल कोड ${referralCode} क्लिपबोर्ड पर कॉपी हुआ!`, 'success');
  };

  const handleShareWhatsApp = () => {
    const text = `🌸 राजरानी कलेक्शन (Hardoi, UP) 🌸\nमेरा रेफरल कोड *${referralCode}* इस्तेमाल करके पहले आर्डर पर ₹100 डिस्काउंट पाएं!\nवेबसाइट देखें: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = `Rajrani Collection Referral Code: ${referralCode}`;
    const body = `Use my referral code ${referralCode} at Rajrani Collection to get Rs 100 off on your first order! ${window.location.origin}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-5 sm:p-6 shadow-lg border border-emerald-700/50 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-emerald-800/80 rounded-2xl text-emerald-300">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-emerald-100">मित्रों को रेफर करें और 100 रिवॉर्ड पॉइंट्स कमाएं</h4>
            <p className="text-[11px] text-emerald-200">सहेली को ₹100 छूट मिले + आपको 100 पॉइंट्स</p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] text-emerald-300 block">सफल रेफरल:</span>
          <span className="font-mono font-black text-lg text-amber-300">{referralsCount} मित्र</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-950 p-3 rounded-2xl border border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-300">आपका कोड:</span>
          <span className="font-mono font-black text-amber-300 text-base tracking-wider bg-emerald-900 px-3 py-1 rounded-xl">
            {referralCode}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyCode}
            className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl flex items-center justify-center gap-1 transition"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>कॉपी करें</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex-1 sm:flex-none bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center justify-center gap-1 transition"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
