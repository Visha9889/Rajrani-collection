import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-pink-600 mt-16">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-950/80 rounded-2xl border border-pink-800/50 text-pink-400 shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">एक्सप्रेस डिलीवरी</h4>
              <p className="text-xs text-slate-400">3-5 दिनों में पूरे भारत में डिलीवरी</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-950/80 rounded-2xl border border-amber-800/50 text-amber-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% सुरक्षित भुगतान</h4>
              <p className="text-xs text-slate-400">Razorpay, UPI & बैंक ट्रांसफर</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-950/80 rounded-2xl border border-pink-800/50 text-pink-400 shrink-0">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">आसान 7-दिन रिटर्न</h4>
              <p className="text-xs text-slate-400">बिना सवाल पूछे आसान वापसी</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-950/80 rounded-2xl border border-amber-800/50 text-amber-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">शुद्ध क्वालिटी गारंटी</h4>
              <p className="text-xs text-slate-400">अस्सल बनारसी एवं कांचीपुरम सिल्क</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs leading-relaxed">
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-pink-600 flex items-center justify-center font-serif font-black text-amber-300 text-base">
              RC
            </div>
            <h3 className="font-serif font-bold text-lg text-white">राजरानी कलेक्शन</h3>
          </div>
          <p className="text-slate-400">
            महिलाओं के एथनिक वियर (साड़ी, सूट, लहंगा) का अग्रणी रिटेल एवं थोक स्टोर। हरदोई (उत्तर प्रदेश) स्थित प्रमुख गारमेंट डिस्ट्रीब्यूटर।
          </p>
          <div className="space-y-1.5 text-slate-300 pt-2">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-pink-500 shrink-0" />
              <span>45, गांधी गंज चौक, मुख्य बाजार, हरदोई, उ.प्र. 241001</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-500 shrink-0" />
              <span>+91 98765 43210 / +91 94150 00000</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-pink-500 shrink-0" />
              <span>contact@rajranicollection.com</span>
            </p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3 text-amber-400">
            परिधान श्रेणियाँ
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li className="hover:text-white cursor-pointer transition">बनारसी रेशमी साड़ियाँ (Banarasi Sarees)</li>
            <li className="hover:text-white cursor-pointer transition">कांचीपुरम गोटा वर्क साड़ियाँ</li>
            <li className="hover:text-white cursor-pointer transition">अनारकली एम्ब्रॉयडर्ड सूट (3-Piece Suits)</li>
            <li className="hover:text-white cursor-pointer transition">पंजाबी पटियाला कॉटन सूट ड्रेस मैटेरियल</li>
            <li className="hover:text-white cursor-pointer transition">दुल्हन हैवी वेलवेट लहंगे (Bridal Lehengas)</li>
            <li className="hover:text-white cursor-pointer transition">3-इन-1 ब्राइडल कम्प्लीट कॉम्बो सेट</li>
          </ul>
        </div>

        {/* Wholesale Portal Info */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3 text-amber-400">
            थोक व्यापारी पोर्टल (B2B)
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li className="hover:text-white cursor-pointer transition">जीएसटीएन रजिस्ट्रेशन एवं सत्यापन</li>
            <li className="hover:text-white cursor-pointer transition">मात्रा के अनुसार थोक डिस्काउंट (Tiers 1-4)</li>
            <li className="hover:text-white cursor-pointer transition">क्रेडिट भुगतान सुविधाएं (7-15 दिन क्रेडिट)</li>
            <li className="hover:text-white cursor-pointer transition">प्रॉफिट मार्जिन कैलकुलेटर</li>
            <li className="hover:text-white cursor-pointer transition">जीएसटीएन इनवॉइस बिल डाउनलोड</li>
            <li className="hover:text-white cursor-pointer transition">अकाउंट मैनेजर सहायता (+91 98112 23344)</li>
          </ul>
        </div>

        {/* Payment & Security */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3 text-amber-400">
            सुरक्षित पेमेंट पार्टनर्स
          </h4>
          <p className="text-slate-400 mb-3">
            हम क्रेडिट कार्ड, डेबिट कार्ड, गूगल पे, फोनपे, पेटीएम और बैंक ट्रांसफर द्वारा 100% सुरक्षित भुगतान स्वीकार करते हैं।
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-bold text-white">Razorpay</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-bold text-white">UPI</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-bold text-white">Google Pay</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-bold text-white">Paytm</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-bold text-white">B2B Credit</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 Rajrani Collection (हरदोई, उत्तर प्रदेश). सर्वाधिकार सुरक्षित।</p>
        <div className="flex gap-4 text-slate-400">
          <span className="hover:underline cursor-pointer">नियम एवं शर्तें</span>
          <span className="hover:underline cursor-pointer">गोपनीयता नीति</span>
          <span className="hover:underline cursor-pointer">जीएसटी अनुपालन</span>
        </div>
      </div>
    </footer>
  );
};
