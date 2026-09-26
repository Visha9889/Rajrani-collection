import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { CreditTermsDisplay } from './CreditTermsDisplay';
import { AccountManagerWidget } from './AccountManagerWidget';
import { WholesaleInvoiceManager } from './WholesaleInvoiceManager';
import { ProfitCalculator } from './ProfitCalculator';
import {
  Store,
  PackageCheck,
  ShoppingBag,
  Calculator,
  ShieldCheck
} from 'lucide-react';

interface B2BHubPageProps {
  products: Product[];
  onOpenCart: () => void;
}

export const B2BHubPage: React.FC<B2BHubPageProps> = ({ products, onOpenCart }) => {
  const { addToCart, formatPrice, showToast } = useApp();

  // Selected Product for Profit Calculator
  const [selectedCalcProduct, setSelectedCalcProduct] = useState<Product | null>(products[0] || null);

  // Quick Pad Bulk Order quantities
  const [quickPadQtys, setQuickPadQtys] = useState<Record<string, number>>({});

  const handlePadQtyChange = (productId: string, val: number) => {
    setQuickPadQtys(prev => ({ ...prev, [productId]: Math.max(0, val) }));
  };

  const handleAddBulkFromPad = () => {
    let addedCount = 0;
    Object.entries(quickPadQtys).forEach(([prodId, qty]) => {
      if (qty > 0) {
        const prod = products.find(p => p.id === prodId);
        if (prod) {
          addToCart(prod, qty);
          addedCount++;
        }
      }
    });
    if (addedCount > 0) {
      showToast(`${addedCount} थोक उत्पादों के बल्क ऑर्डर कार्ट में जोड़े गए!`, 'success');
      onOpenCart();
    } else {
      showToast('कृपया किसी उत्पाद की मात्रा (Quantity) दर्ज करें', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="bg-cyan-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 w-fit">
              <Store className="h-3.5 w-3.5" />
              बी2बी मैनेजमेंट हब (B2B Hub)
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-cyan-100">
              थोक व्यापारी सुविधाएं एवं क्रेडिट प्रबंधन
            </h2>
            <p className="text-xs text-blue-200">
              क्रेडिट लिमिट, समर्पित मैनेजर, प्रॉफिट कैलकुलेटर, त्वरित बल्क पैड एवं टैक्स इनवॉइस।
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="bg-cyan-400 hover:bg-cyan-500 text-blue-950 font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md transition flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>थोक कार्ट देखें</span>
          </button>
        </div>
      </div>

      {/* Grid: B2B Manager & Credit Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountManagerWidget />
        <CreditTermsDisplay />
      </div>

      {/* Profit Calculator Tool */}
      {selectedCalcProduct && (
        <ProfitCalculator
          product={selectedCalcProduct}
          onAddToCart={qty => addToCart(selectedCalcProduct, qty)}
        />
      )}

      {/* QUICK BULK ORDER PAD */}
      <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-blue-600" />
              <span>त्वरित थोक ऑर्डर ग्रिड (Quick Bulk Order Pad)</span>
            </h3>
            <p className="text-xs text-slate-500">
              प्रत्येक साड़ी/सूट की आवश्यक पीस संख्या दर्ज करें और एक साथ बल्क कार्ट में भेजें।
            </p>
          </div>

          <button
            onClick={handleAddBulkFromPad}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>चुने हुए उत्पाद बल्क कार्ट में भेजें</span>
          </button>
        </div>

        {/* Quick Order Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-blue-50 border-b border-blue-200 text-slate-700 font-bold">
                <th className="p-3">उत्पाद नाम / मॉडल</th>
                <th className="p-3">श्रेणी</th>
                <th className="p-3">न्यूनतम (MOQ)</th>
                <th className="p-3">थोक दर (Starting Rate)</th>
                <th className="p-3">उपलब्ध स्टॉक</th>
                <th className="p-3 text-center">संख्या दर्ज करें (Quantity)</th>
                <th className="p-3 text-center">कैलकुलेटर</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(prod => {
                const moq = prod.pricing.wholesale.moq;
                const lowestRate = prod.pricing.wholesale.tiers[0]?.pricePerUnit || prod.pricing.retail.sellingPrice;
                const qtyVal = quickPadQtys[prod.id] || 0;

                return (
                  <tr key={prod.id} className="hover:bg-blue-50/40 transition">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                      <img src={prod.images.primary} alt="p" className="h-10 w-10 object-cover rounded-lg shrink-0" />
                      <div>
                        <p className="line-clamp-1">{prod.name.hi || prod.name.en}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{prod.sku}</span>
                      </div>
                    </td>
                    <td className="p-3 uppercase text-[10px] font-bold text-blue-700 bg-blue-50 rounded px-2 py-0.5">
                      {prod.category}
                    </td>
                    <td className="p-3 font-bold text-amber-800">{moq} Pcs</td>
                    <td className="p-3 font-black text-blue-900">{formatPrice(lowestRate)} / Pc</td>
                    <td className="p-3 text-slate-600 font-medium">{prod.inventory.wholesaleStock} Pcs</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handlePadQtyChange(prod.id, qtyVal - 1)}
                          className="h-7 w-7 rounded bg-slate-200 font-bold hover:bg-slate-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={qtyVal || ''}
                          placeholder="0"
                          onChange={e => handlePadQtyChange(prod.id, Number(e.target.value))}
                          className="w-16 text-center font-bold border border-slate-300 rounded py-1 text-xs"
                        />
                        <button
                          onClick={() => handlePadQtyChange(prod.id, qtyVal + 1)}
                          className="h-7 w-7 rounded bg-slate-200 font-bold hover:bg-slate-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedCalcProduct(prod)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-[10px] px-2.5 py-1 rounded-lg"
                      >
                        मुनाफा जांचें
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* GST Invoices & ITC Section */}
      <WholesaleInvoiceManager />
    </div>
  );
};
