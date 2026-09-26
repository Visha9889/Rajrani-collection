import React from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AdvancedSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (p: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (b: boolean) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPriceFilter,
  setMaxPriceFilter,
  inStockOnly,
  setInStockOnly
}) => {
  const { formatPrice, t } = useApp();

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 text-xs pl-9 pr-8 py-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-pink-500"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
          {[
            { id: 'all', label: t('allProducts') },
            { id: 'saree', label: t('sarees') },
            { id: 'suit', label: t('suits') },
            { id: 'lehenga', label: t('lehengas') },
            { id: 'combo', label: t('combos') }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-slate-700 font-semibold">
        {/* Price Slider */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <span className="text-slate-500">अधिकतम मूल्य:</span>
          <input
            type="range"
            min={1000}
            max={20000}
            step={500}
            value={maxPriceFilter}
            onChange={e => setMaxPriceFilter(Number(e.target.value))}
            className="accent-pink-600 cursor-pointer flex-1"
          />
          <span className="font-mono font-bold text-pink-700">{formatPrice(maxPriceFilter)}</span>
        </div>

        {/* In Stock Only Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => setInStockOnly(e.target.checked)}
            className="rounded text-pink-600 accent-pink-600"
          />
          <span>केवल उपलब्ध स्टॉक (In Stock Only)</span>
        </label>
      </div>
    </div>
  );
};
