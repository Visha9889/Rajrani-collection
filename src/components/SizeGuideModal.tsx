import React from 'react';
import { X, Ruler, Shirt, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-pink-600" />
            <h2 className="font-serif font-bold text-lg text-slate-900">
              साइज़ एवं नाप गाइड (Size & Measurement Guide)
            </h2>
          </div>

          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs leading-relaxed">
          {/* Saree Measurements */}
          <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 space-y-1">
            <h4 className="font-bold text-pink-900 text-sm flex items-center gap-1.5">
              <Shirt className="h-4 w-4" /> साड़ी माप (Saree Dimensions)
            </h4>
            <p className="text-slate-700"><strong>साड़ी लम्बाई:</strong> 5.5 मीटर (बिना ब्लाउज) / 6.3 मीटर (ब्लाउज पीस सहित)</p>
            <p className="text-slate-700"><strong>ब्लाउज पीस:</strong> 80 सेमी अनस्टिच्ड अथवा एड्जेस्टेबल स्ट्रेचेबल रेडीमेड</p>
          </div>

          {/* Suit Measurements */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
              <Shirt className="h-4 w-4" /> अनारकली एवं पटियाला सूट माप (Suit Sizes)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 bg-white rounded-xl border border-amber-200">
                <span className="font-bold block text-slate-800">M / L (Medium / Large)</span>
                <span className="text-slate-500">सीना (Chest): 38-40" • लम्बाई: 46"</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-amber-200">
                <span className="font-bold block text-slate-800">XL / XXL (Extra Large)</span>
                <span className="text-slate-500">सीना (Chest): 42-44" • लम्बाई: 48"</span>
              </div>
            </div>
          </div>

          {/* Lehenga Measurements */}
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
            <h4 className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
              <Shirt className="h-4 w-4" /> दुल्हन लहंगा माप (Lehenga Sizes)
            </h4>
            <p className="text-slate-700"><strong>लहंगा घेरा (Flare):</strong> 4.5 मीटर भव्य फ्लेयर</p>
            <p className="text-slate-700"><strong>कमर नाप (Waist):</strong> 28 से 42 इंच तक एडजस्टेबल फ्री-साइज़ सेमी-स्टिच्ड</p>
          </div>

          {/* Fabric Care */}
          <div className="p-3 bg-slate-100 rounded-2xl text-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 text-xs">धुलाई एवं देखभाल निर्देश (Fabric Care)</h4>
            <p className="text-[11px] text-slate-600">
              • शुद्ध सिल्क, वेलवेट एवं जरी वर्क वस्त्रों हेतु केवल ड्राई क्लीन (Dry Clean Only) कराएं।<br />
              • कॉटन पटियाला सूट को ठंडे पानी में धोएं तथा धूप में सीधे न सुखाएं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
