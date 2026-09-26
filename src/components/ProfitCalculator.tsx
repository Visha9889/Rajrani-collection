import React, { useState } from 'react';
import { Calculator, ShoppingBag, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProfitCalculatorProps {
  product: Product;
  onAddToCart: (qty: number) => void;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  product,
  onAddToCart
}) => {
  const { formatPrice } = useApp();
  const [quantity, setQuantity] = useState(product.pricing.wholesale.moq || 5);

  const mrp = product.pricing.retail.sellingPrice; // Suggested resale MRP

  // Calculate unit price based on wholesale tiers
  const matchedTier = [...product.pricing.wholesale.tiers]
    .reverse()
    .find(tier => quantity >= tier.minQty);

  const wholesaleUnitPrice = matchedTier
    ? matchedTier.pricePerUnit
    : product.pricing.wholesale.tiers[0]?.pricePerUnit || mrp;

  const totalCost = wholesaleUnitPrice * quantity;
  const totalRetailRevenue = mrp * quantity;
  const netProfit = totalRetailRevenue - totalCost;
  const profitPercentage = Math.round((netProfit / totalCost) * 100);

  return (
    <div className="p-5 rounded-3xl bg-blue-50/80 border-2 border-blue-200 shadow-md space-y-4 text-slate-800">
      <div className="flex items-center justify-between border-b border-blue-200 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-700" />
          <h4 className="font-bold text-sm text-blue-950">थोक मुनाफ़ा कैलकुलेटर (Reseller Profit Estimator)</h4>
        </div>
        <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
          MOQ: {product.pricing.wholesale.moq} Pcs
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-slate-500 block mb-1">उत्पाद नाम:</span>
          <span className="font-bold text-slate-900 line-clamp-1">{product.name.hi || product.name.en}</span>
        </div>

        <div>
          <span className="text-slate-500 block mb-1">अनुशंसित एमआरपी (MRP):</span>
          <span className="font-bold text-slate-900">{formatPrice(mrp)} / Pc</span>
        </div>
      </div>

      {/* Quantity Slider / Selector */}
      <div className="space-y-1.5 pt-2 border-t border-blue-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>ऑर्डर संख्या (Quantity):</span>
          <span className="text-blue-700 font-mono font-black text-sm">{quantity} Pieces</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(product.pricing.wholesale.moq, quantity - 5))}
            className="h-8 w-8 rounded-xl bg-white shadow-xs font-bold text-slate-800 hover:bg-slate-100 border border-blue-200"
          >
            -5
          </button>

          <input
            type="range"
            min={product.pricing.wholesale.moq}
            max={200}
            step={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="flex-1 accent-blue-600 cursor-pointer"
          />

          <button
            onClick={() => setQuantity(quantity + 5)}
            className="h-8 w-8 rounded-xl bg-white shadow-xs font-bold text-slate-800 hover:bg-slate-100 border border-blue-200"
          >
            +5
          </button>
        </div>
      </div>

      {/* Results Breakdown Box */}
      <div className="p-4 bg-white rounded-2xl border border-blue-200 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-500">थोक खरीद दर (Wholesale Rate):</span>
          <span className="font-mono font-bold text-blue-900">{formatPrice(wholesaleUnitPrice)} / Pc</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">आपकी कुल लागत (Total Investment):</span>
          <span className="font-mono font-bold text-slate-900">{formatPrice(totalCost)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">संभावित बिक्री मूल्य (Retail Revenue):</span>
          <span className="font-mono font-bold text-slate-900">{formatPrice(totalRetailRevenue)}</span>
        </div>

        <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-emerald-700 text-sm">
          <span className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span>शुद्ध मुनाफा (Net Profit):</span>
          </span>
          <span className="font-mono font-black text-base">{formatPrice(netProfit)} ({profitPercentage}%)</span>
        </div>
      </div>

      <button
        onClick={() => onAddToCart(quantity)}
        className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
      >
        <ShoppingBag className="h-4 w-4" />
        <span>{quantity} पीस थोक कार्ट में भेजें ({formatPrice(totalCost)})</span>
      </button>
    </div>
  );
};
