import React from 'react';
import { Phone, MessageCircle, Mail, User, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountManagerWidget: React.FC = () => {
  const { user } = useApp();
  const manager = user.wholesaleProfile?.assignedManager || {
    name: 'राहुल कुमार (Rahul Kumar)',
    phone: '+919811223344'
  };

  const handleCall = () => {
    window.location.href = `tel:${manager.phone}`;
  };

  const handleWhatsApp = () => {
    const text = `नमस्ते ${manager.name}, मैं राजरानी कलेक्शन थोक पोर्टल से सम्पर्क कर रहा/रही हूँ।`;
    window.open(`https://api.whatsapp.com/send?phone=${manager.phone}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:wholesale@rajranicollection.com?subject=Wholesale Enquiry`);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-blue-200 shadow-md space-y-3 text-slate-800">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
          <User className="h-6 w-6" />
        </div>

        <div>
          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            समर्पित थोक मैनेजर (Dedicated B2B Manager)
          </span>
          <h4 className="font-bold text-sm text-slate-900 mt-0.5">{manager.name}</h4>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="h-3 w-3 text-emerald-600" />
            <span>उत्तर समय: 15 मिनट से कम</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
        <button
          onClick={handleCall}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-xs transition"
        >
          <Phone className="h-3.5 w-3.5" />
          <span>कॉल करें</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-xs transition"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleEmail}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>ईमेल</span>
        </button>
      </div>
    </div>
  );
};
