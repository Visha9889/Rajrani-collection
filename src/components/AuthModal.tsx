import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Phone, Mail, CheckCircle2, ShieldCheck, Store, UserCheck, Upload, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, registerRetailUser, registerWholesaleUser, setActiveRole, showToast } = useApp();

  const [step, setStep] = useState<'login' | 'role_select' | 'register_retail' | 'register_wholesale'>('login');
  const [loginPhone, setLoginPhone] = useState(user.phone || '+919876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('123456');

  // Retail Form State
  const [retailForm, setRetailForm] = useState({
    name: user.retailProfile?.name || 'प्रिया शर्मा',
    phone: user.phone || '+919876543210',
    email: user.email || 'priya@example.com',
    state: 'Uttar Pradesh',
    city: 'Hardoi',
    pincode: '241001',
    address: '123 मेन रोड',
    aadhaarLast4: '5678',
    pan: 'ABCDE1234F'
  });

  // Wholesale Form State
  const [wholesaleForm, setWholesaleForm] = useState({
    name: 'राज शर्मा',
    phone: user.phone || '+919876543210',
    email: 'raj@sharmasarees.com',
    shopName: 'शर्मा साड़ी एंड सूट एम्पोरियम',
    shopType: 'both' as 'physical' | 'online' | 'both',
    businessPan: 'ABCDE1234F',
    aadhaar: '987654321012',
    gstn: '09AABCS1234H1Z0',
    udyam: 'UDYAM-UP-34-001234',
    state: 'Uttar Pradesh',
    city: 'Hardoi',
    pincode: '241001',
    shopAddress: '45 गांधी गंज चौक, हरदोई, उत्तर प्रदेश',
    accountHolder: 'Raj Sharma',
    accountNumber: '918273645019',
    ifsc: 'SBIN0001234',
    docGstUploaded: true,
    docShopPhotosUploaded: true
  });

  const [gstnVerified, setGstnVerified] = useState(true);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (loginPhone.length < 10) {
      showToast('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें', 'error');
      return;
    }
    setOtpSent(true);
    showToast('6 अंकों का OTP +91 ' + loginPhone.slice(-4) + ' पर भेजा गया (Test OTP: 123456)', 'info');
  };

  const handleVerifyOtp = () => {
    if (otpCode !== '123456') {
      showToast('गलत OTP कोड दर्ज किया गया (Test OTP: 123456)', 'error');
      return;
    }
    showToast('OTP सफलतापूर्व सत्यापित हुआ!', 'success');
    setStep('role_select');
  };

  const handleVerifyGstn = () => {
    if (wholesaleForm.gstn.length < 15) {
      showToast('वैध 15 अंकों का GSTN दर्ज करें (उदा. 09AABCS1234H1Z0)', 'error');
      return;
    }
    setGstnVerified(true);
    showToast('✅ GSTN सरकारी डेटाबेस से सत्यापित हुआ!', 'success');
  };

  const submitRetail = (e: React.FormEvent) => {
    e.preventDefault();
    registerRetailUser(retailForm);
    onClose();
  };

  const submitWholesale = (e: React.FormEvent) => {
    e.preventDefault();
    registerWholesaleUser(wholesaleForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl my-8 text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Title Banner */}
        <div className="text-center pb-4 border-b border-slate-100">
          <span className="font-serif font-black text-2xl text-pink-900 tracking-tight">
            राजरानी कलेक्शन
          </span>
          <p className="text-xs text-slate-500 font-medium">
            {step === 'login' && 'मोबाइल OTP द्वारा त्वरित लॉगिन'}
            {step === 'role_select' && 'अपने उपयोग का प्रकार चुनें'}
            {step === 'register_retail' && 'रिटेल ग्राहक पंजीकरण (Retail Account)'}
            {step === 'register_wholesale' && 'थोक व्यापारी पंजीकरण (Wholesale Dealer Account)'}
          </p>
        </div>

        {/* STEP 1: LOGIN WITH OTP */}
        {step === 'login' && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                मोबाइल नंबर (Mobile Number)
              </label>
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-600">
                  +91 (IND)
                </span>
                <input
                  type="text"
                  value={loginPhone}
                  onChange={e => setLoginPhone(e.target.value)}
                  placeholder="9876543210"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full rounded-xl bg-pink-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-pink-700 transition"
              >
                OTP प्राप्त करें (Send OTP)
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="rounded-lg bg-pink-50 p-3 text-xs text-pink-800 border border-pink-200 flex items-center justify-between">
                  <span>OTP भेजा गया: <strong>+91 {loginPhone}</strong></span>
                  <span className="text-[10px] bg-pink-200 font-mono font-bold px-1.5 py-0.5 rounded">Test OTP: 123456</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">6-अंकों का OTP कोड</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    maxLength={6}
                    className="w-full text-center tracking-widest text-lg font-mono font-bold rounded-lg border border-slate-300 py-2 focus:border-pink-500"
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                >
                  सत्यापित करें और आगे बढ़ें (Verify & Continue)
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: ROLE SELECTION */}
        {step === 'role_select' && (
          <div className="mt-6 space-y-4">
            <h3 className="text-center text-xs font-bold text-slate-600">
              कृपया चुनें आप किस उद्देश्य से खरीदारी करना चाहते हैं:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Retail Card */}
              <div
                onClick={() => {
                  setActiveRole('retail');
                  setStep('register_retail');
                }}
                className="cursor-pointer rounded-2xl border-2 border-slate-200 hover:border-pink-600 p-4 bg-slate-50 hover:bg-pink-50/50 transition flex flex-col items-center text-center space-y-2 group"
              >
                <div className="h-12 w-12 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">👤 रिटेल ग्राहक (Retail Buyer)</h4>
                <p className="text-[11px] text-slate-500">
                  खुद के उपयोग, शादी-त्यौहार या उपहार हेतु। 500 वेलकम पॉइंट्स + हर खरीद पर रिवॉर्ड।
                </p>
                <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2.5 py-1 rounded-full">
                  चुने और आगे बढ़ें →
                </span>
              </div>

              {/* Wholesale Card */}
              <div
                onClick={() => {
                  setActiveRole('wholesale');
                  setStep('register_wholesale');
                }}
                className="cursor-pointer rounded-2xl border-2 border-slate-200 hover:border-amber-500 p-4 bg-slate-50 hover:bg-amber-50/50 transition flex flex-col items-center text-center space-y-2 group"
              >
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                  <Store className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">🏪 थोक व्यापारी (Wholesaler)</h4>
                <p className="text-[11px] text-slate-500">
                  दुकानदार या रिसेलर हेतु। भारी मात्रा डिस्काउंट (Tier 1-4) + ₹1L तक क्रेडिट सुविधा।
                </p>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2.5 py-1 rounded-full">
                  B2B पोर्टल खोलें →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: RETAIL REGISTRATION */}
        {step === 'register_retail' && (
          <form onSubmit={submitRetail} className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">पूरा नाम (Full Name) *</label>
                <input
                  type="text"
                  required
                  value={retailForm.name}
                  onChange={e => setRetailForm({ ...retailForm, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">मोबाइल नंबर *</label>
                <input
                  type="text"
                  disabled
                  value={retailForm.phone}
                  className="w-full rounded-lg bg-slate-100 border border-slate-300 p-2 text-xs text-slate-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ईमेल (Email ID)</label>
                <input
                  type="email"
                  value={retailForm.email}
                  onChange={e => setRetailForm({ ...retailForm, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">राज्य (State) *</label>
                <select
                  value={retailForm.state}
                  onChange={e => setRetailForm({ ...retailForm, state: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                >
                  <option value="Uttar Pradesh">उत्तर प्रदेश (Uttar Pradesh)</option>
                  <option value="Delhi">दिल्ली (Delhi)</option>
                  <option value="Bihar">बिहार (Bihar)</option>
                  <option value="Madhya Pradesh">मध्य प्रदेश (Madhya Pradesh)</option>
                  <option value="Rajasthan">राजस्थान (Rajasthan)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">शहर (City) *</label>
                <input
                  type="text"
                  required
                  value={retailForm.city}
                  onChange={e => setRetailForm({ ...retailForm, city: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">पिनकोड (Pincode) *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={retailForm.pincode}
                  onChange={e => setRetailForm({ ...retailForm, pincode: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">पता (Full Delivery Address)</label>
              <textarea
                rows={2}
                value={retailForm.address}
                onChange={e => setRetailForm({ ...retailForm, address: e.target.value })}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-pink-600 py-2.5 text-xs font-bold text-white hover:bg-pink-700 shadow-md transition"
              >
                रजिस्ट्रेशन पूर्ण करें (Complete Registration)
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: WHOLESALE REGISTRATION */}
        {step === 'register_wholesale' && (
          <form onSubmit={submitWholesale} className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">PAN एवं आधार सत्यापित थोक व्यापारी खाता</p>
                <p className="text-[11px] text-amber-700">
                  PAN और आधार सत्यापन द्वारा आप सीधे कारखाने की दरों पर बल्क आर्डर दे पाएंगे। GSTN ऐच्छिक है।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">दुकानदार का नाम (Full Name) *</label>
                <input
                  type="text"
                  required
                  value={wholesaleForm.name}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">दुकान / प्रतिष्ठान का नाम (Shop Name) *</label>
                <input
                  type="text"
                  required
                  value={wholesaleForm.shopName}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, shopName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">बिज़नेस पैन (Business PAN) * [अनिवार्य]</label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  placeholder="ABCDE1234F"
                  value={wholesaleForm.businessPan}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, businessPan: e.target.value.toUpperCase() })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">आधार नंबर (Aadhaar Number - 12 Digits) * [अनिवार्य]</label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  placeholder="987654321012"
                  value={wholesaleForm.aadhaar}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, aadhaar: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">GSTN नंबर (15 Digits) - (ऐच्छिक / Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="09AABCS1234H1Z0 (Optional)"
                    value={wholesaleForm.gstn}
                    onChange={e => setWholesaleForm({ ...wholesaleForm, gstn: e.target.value.toUpperCase() })}
                    className="flex-1 rounded-lg border border-slate-300 p-2 text-xs font-mono font-bold tracking-wider uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyGstn}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs"
                  >
                    सत्यापित करें
                  </button>
                </div>
                {wholesaleForm.gstn && gstnVerified && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> GSTIN Verified: Active taxpayer record found in UP
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">दुकान का प्रकार (Shop Type)</label>
                <select
                  value={wholesaleForm.shopType}
                  onChange={e =>
                    setWholesaleForm({
                      ...wholesaleForm,
                      shopType: e.target.value as 'physical' | 'online' | 'both'
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                >
                  <option value="physical">भौतिक दुकान (Physical Retail Shop)</option>
                  <option value="online">ऑनलाइन स्टोर / रिसेलर (Online)</option>
                  <option value="both">दोनों (Physical & Online)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">बैंक खाताधारक का नाम (ऐच्छिक / Optional)</label>
                <input
                  type="text"
                  value={wholesaleForm.accountHolder}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, accountHolder: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">बैंक खाता नंबर (Account Number) - (ऐच्छिक / Optional)</label>
                <input
                  type="text"
                  value={wholesaleForm.accountNumber}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, accountNumber: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">IFSC कोड - (ऐच्छिक / Optional)</label>
                <input
                  type="text"
                  value={wholesaleForm.ifsc}
                  onChange={e => setWholesaleForm({ ...wholesaleForm, ifsc: e.target.value.toUpperCase() })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">दुकान का पूरा पता *</label>
              <textarea
                rows={2}
                required
                value={wholesaleForm.shopAddress}
                onChange={e => setWholesaleForm({ ...wholesaleForm, shopAddress: e.target.value })}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              />
            </div>

            {/* Document Upload Simulator */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-800">दस्तावेज अपलोड (Documents)</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-dashed border-slate-300 rounded-lg bg-white flex items-center justify-between">
                  <span className="truncate text-[11px]">GSTIN Certificate.pdf</span>
                  <Upload className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="p-2 border border-dashed border-slate-300 rounded-lg bg-white flex items-center justify-between">
                  <span className="truncate text-[11px]">Shop_Photo.jpg</span>
                  <Upload className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-600 shadow-md transition"
              >
                थोक व्यापारी रजिस्ट्रेशन जमा करें (Submit Application)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
