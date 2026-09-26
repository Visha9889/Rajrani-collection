import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { AdvancedSearch } from './AdvancedSearch';
import {
  Store,
  CheckCircle2,
  AlertCircle,
  PackageCheck
} from 'lucide-react';

interface WholesalePortalProps {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onNavigateToB2BHub: () => void;
}

export const WholesalePortal: React.FC<WholesalePortalProps> = ({
  products,
  onOpenProductDetail,
  onNavigateToB2BHub
}) => {
  const { user } = useApp();
  const profile = user.wholesaleProfile;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState(20000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      Object.values(p.name).some(val => val.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.pricing.retail.sellingPrice <= maxPriceFilter;
    const matchesStock = !inStockOnly || p.inventory.wholesaleStock > 0;

    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  return (
    <div className="space-y-5 pb-12 animate-fade-in">
      {/* ABSOLUTE TOP: WHOLESALE BULK CATALOG HEADER & QUICK ACCESS */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-blue-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Store className="h-3.5 w-3.5" />
              थोक बल्क कैटलॉग (Wholesale Bulk Catalog)
            </span>
            {profile?.status === 'approved' ? (
              <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> PAN & Aadhaar Verified
              </span>
            ) : (
              <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Pending Approval
              </span>
            )}
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-3xl text-cyan-100">
            {profile?.shopName || 'शर्मा साड़ी एंड सूट एम्पोरियम'}
          </h2>
          <p className="text-blue-200 text-xs font-medium">
            कारखाने की थोक दरें • न्यूनतम MOQ 5 Pcs • {filteredProducts.length} परिधान उपलब्ध
          </p>
        </div>

        <button
          onClick={onNavigateToB2BHub}
          className="bg-cyan-400 hover:bg-cyan-500 text-blue-950 font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md transition flex items-center gap-2 shrink-0"
        >
          <PackageCheck className="h-4 w-4" />
          <span>💼 B2B हब टूल (क्रेडिट & इनवॉइस)</span>
        </button>
      </div>

      {/* ABSOLUTE TOP STEP 2: SEARCH & FILTER BAR */}
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

      {/* ABSOLUTE TOP STEP 3: WHOLESALE BULK PRODUCT GRID */}
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
          <Store className="h-12 w-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">कोई थोक उत्पाद नहीं मिला</h4>
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
            className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md"
          >
            सभी फ़िल्टर रीसेट करें
          </button>
        </div>
      )}
    </div>
  );
};
