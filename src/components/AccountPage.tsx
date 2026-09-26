import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  Store,
  CreditCard,
  Gift,
  Building2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Package,
  LogOut,
  FileText
} from 'lucide-react';

interface AccountPageProps {
  onOpenOrders: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onOpenOrders }) => {
  const { user, activeRole, logoutUser, formatPrice } = useApp();

  const isRetail = activeRole === 'retail';
  const retailProf = user.retailProfile;
  const wholesaleProf = user.wholesaleProfile;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-slate-900">
          <div className={`h-16 w-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-md ${
            isRetail
              ? 'bg-gradient-to-br from-pink-600 to-rose-800'
              : 'bg-gradient-to-br from-blue-600 to-slate-900'
          }`}>
            {isRetail
              ? (retailProf?.name?.[0] || 'R')
              : (wholesaleProf?.shopName?.[0] || 'W')}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                isRetail
                  ? 'bg-pink-100 text-pink-900 border-pink-300'
                  : 'bg-blue-100 text-blue-900 border-blue-300'
              }`}>
                {isRetail ? '🛍️ Retail Customer Profile' : '🏪 Verified Wholesale Dealer'}
              </span>
            </div>

            <h2 className="font-serif font-black text-2xl text-slate-900 mt-1">
              {isRetail ? (retailProf?.name || 'Customer Name') : (wholesaleProf?.shopName || 'Shop Name')}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              मालिक/सदस्य: {isRetail ? retailProf?.name : wholesaleProf?.name} • फ़ोन: {user.phone}
            </p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-4 py-2.5 rounded-2xl border border-red-200 flex items-center gap-1.5 transition"
        >
          <LogOut className="h-4 w-4" />
          <span>लॉगआउट (Logout)</span>
        </button>
      </div>

      {/* RETAIL PROFILE DETAILS */}
      {isRetail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Box */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-pink-900 flex items-center gap-2 border-b border-pink-100 pb-3">
              <UserIcon className="h-4 w-4 text-pink-600" />
              <span>व्यक्तिगत खाते का विवरण (Personal Account)</span>
            </h3>

            <div className="space-y-2.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">पूरा नाम:</span>
                <span className="font-bold text-slate-900">{retailProf?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">मोबाइल नंबर:</span>
                <span className="font-mono font-bold text-slate-900">{retailProf?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ईमेल आईडी:</span>
                <span className="font-mono text-slate-800">{retailProf?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">राज्य एवं शहर:</span>
                <span className="font-bold text-slate-900">{retailProf?.city}, {retailProf?.state} ({retailProf?.pincode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">डिलीवरी पता:</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px]">{retailProf?.address || 'हरदोई, उत्तर प्रदेश'}</span>
              </div>
            </div>
          </div>

          {/* Loyalty & Rewards Box */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-amber-900 flex items-center gap-2 border-b border-amber-100 pb-3">
              <Gift className="h-4 w-4 text-amber-600" />
              <span>रिवॉर्ड एवं लॉयल्टी स्थिति (Rewards & Tier)</span>
            </h3>

            <div className="p-4 bg-gradient-to-r from-pink-900 to-rose-950 text-white rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-amber-300 font-bold">लॉयल्टी पॉइंट्स:</span>
                <span className="font-mono font-black text-2xl text-amber-300">{retailProf?.points || 0} pts</span>
              </div>
              <p className="text-[11px] text-pink-200">
                वैल्‍यू: {formatPrice((retailProf?.points || 0) / 100)} डिस्काउंट की छूट
              </p>
              <div className="pt-1 flex justify-between text-[11px] font-semibold border-t border-pink-800/80">
                <span>सदस्यता टियर:</span>
                <span className="text-amber-400 font-bold">{retailProf?.tier || 'Bronze'} ⭐</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-slate-700">
              <span>रेफरल कोड: <code className="font-mono font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded">{retailProf?.referralCode}</code></span>
              <span className="text-slate-500">{retailProf?.referralsCount || 0} मित्र जोड़े गए</span>
            </div>
          </div>
        </div>
      )}

      {/* WHOLESALE PROFILE DETAILS */}
      {!isRetail && (
        <div className="space-y-6">
          {/* Shop & Tax Details */}
          <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-blue-950 flex items-center gap-2 border-b border-blue-100 pb-3">
              <Store className="h-5 w-5 text-blue-700" />
              <span>थोक व्यापारी एवं दुकान की संपूर्ण जानकारी (Shop & Dealer Profile)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">दुकान का नाम (Shop Name):</span>
                  <span className="font-bold text-slate-900">{wholesaleProf?.shopName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">दुकान का प्रकार (Type):</span>
                  <span className="font-bold text-slate-900 uppercase">{wholesaleProf?.shopType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">मालिक का नाम (Owner):</span>
                  <span className="font-bold text-slate-900">{wholesaleProf?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">मोबाइल नंबर:</span>
                  <span className="font-mono font-bold text-slate-900">{wholesaleProf?.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">बिज़नेस PAN (Mandatory):</span>
                  <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">{wholesaleProf?.businessPan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">आधार कार्ड नंबर (Mandatory):</span>
                  <span className="font-mono font-bold text-slate-900">****{wholesaleProf?.aadhaar?.slice(-4) || '1012'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">जीएसटीएन (GSTN - Optional):</span>
                  <span className="font-mono font-bold text-slate-800">{wholesaleProf?.gstn || 'N/A (Optional)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">उद्यम रजिस्ट्रेशन (Optional):</span>
                  <span className="font-mono text-slate-800">{wholesaleProf?.udyam || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between text-slate-600 gap-1">
              <span>दुकान का पूरा पता: <strong>{wholesaleProf?.shopAddress}, {wholesaleProf?.city}, {wholesaleProf?.state} ({wholesaleProf?.pincode})</strong></span>
            </div>
          </div>

          {/* Bank & Financial Credit Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span>बैंक खाता जानकारी (Optional Settlement Bank)</span>
              </h4>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">खाताधारक नाम:</span>
                  <span className="font-bold text-slate-900">{wholesaleProf?.accountHolder || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">खाता नंबर (A/C No):</span>
                  <span className="font-mono font-bold text-slate-900">{wholesaleProf?.accountNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IFSC कोड:</span>
                  <span className="font-mono font-bold text-slate-900">{wholesaleProf?.ifsc || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-md space-y-3 text-xs border border-blue-700">
              <h4 className="font-bold text-cyan-200 text-sm flex items-center gap-1.5 border-b border-blue-800 pb-2">
                <CreditCard className="h-4 w-4 text-cyan-300" />
                <span>B2B क्रेडिट सीमा स्थिति (Credit Limit Status)</span>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-200">कुल क्रेडिट सीमा:</span>
                  <span className="font-mono font-bold text-amber-300">{formatPrice(wholesaleProf?.creditLimit || 100000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">उपयोग किया गया:</span>
                  <span className="font-mono text-slate-200">{formatPrice(wholesaleProf?.creditUsed || 35000)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-blue-800 font-bold text-emerald-400 text-sm">
                  <span>उपलब्ध बची क्रेडिट:</span>
                  <span className="font-mono font-black">{formatPrice((wholesaleProf?.creditLimit || 100000) - (wholesaleProf?.creditUsed || 35000))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Quick Launcher Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-base text-amber-300 flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-400" />
            <span>मेरे आदेश एवं कूरियर लाइव ट्रैकिंग</span>
          </h4>
          <p className="text-xs text-slate-300">
            अपने वर्तमान एवं पिछले आर्डरों की लाइव स्थिति और दिल्लीवरी ट्रैकिंग देखें।
          </p>
        </div>

        <button
          onClick={onOpenOrders}
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md shrink-0 transition"
        >
          आर्डर देखें
        </button>
      </div>
    </div>
  );
};
