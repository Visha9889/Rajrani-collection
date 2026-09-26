import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { LoyaltyPointsWidget } from './LoyaltyPointsWidget';
import { ReferralWidget } from './ReferralWidget';
import { AdvancedSearch } from './AdvancedSearch';
import {
  Sparkles,
  Flame,
  Clock,
  Shirt
} from 'lucide-react';

interface RetailHomeProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenAiAssistant: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const RetailHome: React.FC<RetailHomeProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  onOpenProductDetail,
  onOpenAiAssistant,
  searchQuery,
  setSearchQuery
}) => {
  const { user, t } = useApp();

  // Search & Filter local state
  const [maxPriceFilter, setMaxPriceFilter] = useState(20000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Flash Sale Countdown Timer (5 hours live sale simulator)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 24, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const profile = user.retailProfile;

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      Object.values(p.name).some(val => val.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.pricing.retail.sellingPrice <= maxPriceFilter;
    const matchesStock = !inStockOnly || p.inventory.retailStock > 0;

    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero Banner with Loyalty Points Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-pink-900 via-pink-800 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-700/50 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2 max-w-xl relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-pink-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {profile?.tier || 'Bronze'} मेंबरशिप ⭐
              </span>
              <span className="text-pink-200 text-xs">हस्तनिर्मित भारतीय परिधान</span>
            </div>

            <h2 className="font-serif font-black text-2xl sm:text-4xl text-amber-100 tracking-tight leading-tight">
              नमस्ते, {profile?.name || 'प्रिया जी'}!
            </h2>
            <p className="text-pink-100 text-xs sm:text-sm leading-relaxed">
              राजरानी कलेक्शन (हरदोई) में आपका स्वागत है। शादियों एवं त्यौहारों के लिए शाही बनारसी साड़ियां, अनारकली सूट और वेलवेट लहंगे।
            </p>

            {/* AI Assistant Quick Launcher */}
            <div className="pt-2">
              <button
                onClick={onOpenAiAssistant}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition transform active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-pink-900" />
                <span>AI स्टाइल कंसल्टेंट - साड़ी ड्रेपिंग सलाह लें</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loyalty Points Widget */}
        <div className="lg:col-span-1">
          <LoyaltyPointsWidget
            points={profile?.points || 1250}
            tier={profile?.tier || 'Bronze'}
          />
        </div>
      </div>

      {/* Live Flash Sale Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 p-4 sm:p-5 rounded-2xl shadow-lg border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-xl shadow-md shrink-0">
            <Flame className="h-6 w-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm sm:text-base text-slate-950">
                🔥 दीवाली स्पेशल लाइव सेल (Diwali Flash Sale)
              </h3>
              <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                20% OFF
              </span>
            </div>
            <p className="text-xs text-slate-800 font-semibold">
              कूपन कोड लागू करें: <code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">SEPT20</code>
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-inner font-mono font-bold text-xs shrink-0">
          <Clock className="h-4 w-4 text-amber-400" />
          <span>समाप्त होने में: </span>
          <span className="text-amber-400 font-black">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Advanced Filter & Search Bar */}
      <AdvancedSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        maxPriceFilter={maxPriceFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />

      {/* Product Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-slate-900">
            नवीनतम भारतीय संग्रह ({filteredProducts.length} परिधान)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={onOpenProductDetail}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Shirt className="h-12 w-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-800 text-base">कोई परिणाम नहीं मिला</h4>
            <p className="text-xs text-slate-500">
              कृपया दूसरा फ़िल्टर चुनें या खोज शब्द बदलें।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setMaxPriceFilter(20000);
                setInStockOnly(false);
              }}
              className="bg-pink-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md"
            >
              सभी फ़िल्टर रीसेट करें
            </button>
          </div>
        )}
      </div>

      {/* Referral Program Widget */}
      <ReferralWidget
        referralCode={profile?.referralCode || 'PRIYA250'}
        referralsCount={profile?.referralsCount || 3}
      />
    </div>
  );
};
