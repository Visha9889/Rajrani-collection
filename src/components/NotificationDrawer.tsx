import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, Sparkles, Package, Gift, Check, ArrowRight } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsAsRead, addNotification, showToast } = useApp();

  if (!isOpen) return null;

  const handleMarkRead = () => {
    markNotificationsAsRead();
    showToast('सभी नोटिफिकेशन्स पढ़े गए मार्क हुए', 'info');
  };

  const handleSendTestPush = () => {
    addNotification(
      '🎉 नया स्टॉक अलर्ट - दुल्हन लहंगे',
      'राजरानी कलेक्शन में हैवी वेलवेट दुल्हन लहंगों की नई खेप आ गई है!',
      'arrival'
    );
    showToast('पुश नोटिफिकेशन भेजा गया!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col text-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-pink-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              पुश नोटिफिकेशन्स (Push Notifications)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkRead}
              className="text-xs font-bold text-pink-700 hover:underline flex items-center gap-1"
            >
              <Check className="h-3.5 w-3.5" /> Mark All Read
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition ${
                !n.read
                  ? 'bg-pink-50/60 border-pink-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  {n.category === 'arrival' && <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />}
                  {n.category === 'stock' && <Package className="h-4 w-4 text-emerald-600 shrink-0" />}
                  {n.category === 'promo' && <Gift className="h-4 w-4 text-pink-600 shrink-0" />}
                  <span>{n.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
              </div>

              <p className="mt-1 text-xs text-slate-600 leading-relaxed">{n.body}</p>
            </div>
          ))}
        </div>

        {/* Bottom Test Button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={handleSendTestPush}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <Bell className="h-4 w-4" />
            <span>टेस्ट नया स्टॉक अलर्ट भेजें (Test Push Notification)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
