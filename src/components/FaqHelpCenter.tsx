import React, { useState } from 'react';
import { HelpCircle, X, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqHelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqHelpCenter: React.FC<FaqHelpCenterProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'ऑर्डर डिलीवरी में कितना समय लगता है?',
      a: 'हरदोई एवं आसपास के क्षेत्रों में 1-2 दिन, तथा शेष भारत में एक्सप्रेस कूरियर (Delhivery) द्वारा 3-5 दिनों में डिलीवरी होती है।'
    },
    {
      q: 'थोक खरीद (Wholesale Orders) हेतु न्यूनतम आर्डर मात्रा (MOQ) क्या है?',
      a: 'थोक खरीद हेतु न्यूनतम आर्डर मात्रा 5 पीस है। 11, 26 और 50+ पीस आर्डर करने पर क्रमशः अतिरिक्त टियर डिस्काउंट स्वतः लागू होता है।'
    },
    {
      q: 'रिवॉर्ड पॉइंट्स कैसे रिडीम करें?',
      a: 'चेकआउट पृष्ठ पर रिडीम चेकबॉक्स चुनें। 100 रिवॉर्ड पॉइंट्स = ₹1 डिस्काउंट छूट।'
    },
    {
      q: 'क्या 7-दिन रिटर्न सुविधा उपलब्ध है?',
      a: 'हाँ! यदि वस्त्र में कोई दोष या सिलाई संबंधित त्रुटि हो तो आप आर्डर डिलीवरी के 7 दिनों के भीतर ऑनलाइन रिटर्न रिक्वेस्ट दर्ज कर सकते हैं।'
    },
    {
      q: 'जीएसटी बिल (B2B Tax Invoice) कैसे मिलेगा?',
      a: 'थोक व्यापारी अपना बिजनेस पैन अथवा जीएसटीएन दर्ज करके इनवॉइस पेज से सीधे 100% वैध टैक्स बिल डाउनलोड कर सकते हैं।'
    }
  ];

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-pink-600" />
            <h2 className="font-serif font-bold text-lg text-slate-900">
              सहायता केंद्र एवं अक्सर पूछे जाने वाले प्रश्न (FAQ)
            </h2>
          </div>

          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="सर्च सहायता (e.g. रिटर्न, डिलीवरी, थोक)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  className="w-full p-3 text-left font-bold text-slate-900 flex items-center justify-between gap-2 hover:bg-slate-100 transition"
                >
                  <span>{faq.q}</span>
                  {expandedIdx === idx ? <ChevronUp className="h-4 w-4 shrink-0 text-pink-600" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
                </button>

                {expandedIdx === idx && (
                  <div className="p-3 pt-0 text-slate-600 border-t border-slate-200/60 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
