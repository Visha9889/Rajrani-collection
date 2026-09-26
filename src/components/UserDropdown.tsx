import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  LogOut,
  Gift,
  Award,
  CreditCard,
  Building2,
  Phone,
  ChevronDown,
  ShieldCheck,
  MapPin,
  X
} from 'lucide-react';

interface UserDropdownProps {
  onOpenAuth: () => void;
  onOpenOrders: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  onOpenAuth,
  onOpenOrders
}) => {
  const { user, activeRole, logoutUser, formatPrice, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user.isLoggedIn) {
    return (
      <button
        onClick={onOpenAuth}
        className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
      >
        <UserIcon className="h-4 w-4" />
        <span>{t('loginSignup')}</span>
      </button>
    );
  }

  const isRetail = activeRole === 'retail';
  const retailProf = user.retailProfile;
  const wholesaleProf = user.wholesaleProfile;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold transition border border-slate-200"
      >
        <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
          isRetail ? 'bg-pink-600 text-white' : 'bg-blue-600 text-white'
        }`}>
          {isRetail
            ? (retailProf?.name?.[0] || 'R')
            : (wholesaleProf?.shopName?.[0] || 'W')}
        </div>
        <span className="hidden md:inline max-w-[110px] truncate">
          {isRetail
            ? retailProf?.name.split(' ')[0]
            : wholesaleProf?.shopName}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 z-50 space-y-3 text-xs animate-fade-in text-slate-800">
          {/* Header Profile Info */}
          <div className="pb-3 border-b border-slate-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className={`font-black text-[10px] px-2 py-0.5 rounded-full uppercase ${
                isRetail
                  ? 'bg-pink-100 text-pink-800 border border-pink-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}>
                {isRetail ? '🛍️ Retail Customer' : '🏪 Wholesale Dealer'}
              </span>

              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <h4 className="font-bold text-slate-900 text-sm">
              {isRetail ? retailProf?.name : wholesaleProf?.shopName}
            </h4>
            <p className="text-[11px] text-slate-500 font-mono">{user.phone}</p>
          </div>

          {/* Role specific metrics */}
          {isRetail ? (
            <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 space-y-1">
              <div className="flex justify-between items-center text-pink-900 font-bold">
                <span className="flex items-center gap-1">
                  <Gift className="h-3.5 w-3.5 text-pink-600" />
                  <span>पॉइंट्स बैलेंस:</span>
                </span>
                <span className="font-mono text-sm">{retailProf?.points || 0} pts</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>मेंबरशिप स्तर:</span>
                <span className="font-bold text-amber-700">{retailProf?.tier || 'Bronze'} ⭐</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
              <div className="flex justify-between items-center text-blue-950 font-bold">
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5 text-blue-700" />
                  <span>उपलब्ध क्रेडिट:</span>
                </span>
                <span className="font-mono text-sm font-black text-emerald-700">
                  {formatPrice((wholesaleProf?.creditLimit || 100000) - (wholesaleProf?.creditUsed || 35000))}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>जीएसटीएन / पैन:</span>
                <span className="font-mono font-bold">{wholesaleProf?.businessPan}</span>
              </div>
            </div>
          )}

          {/* Action links */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenOrders();
              }}
              className="w-full p-2 rounded-xl text-left hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-between"
            >
              <span>मेरे आर्डर एवं लाइव ट्रैकिंग</span>
              <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono">Order Tracking</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setIsOpen(false);
                logoutUser();
              }}
              className="w-full p-2 rounded-xl text-left text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>लॉगआउट (Logout)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
