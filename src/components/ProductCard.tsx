import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Eye, Star, Gift, Store, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { activeRole, language, formatPrice, addToCart, wishlist, toggleWishlist, t } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isWholesale = activeRole === 'wholesale';

  // stock status check
  const currentStock = isWholesale ? product.inventory.wholesaleStock : product.inventory.retailStock;
  const isOutOfStock = currentStock <= 0;

  // Wholesale lowest tier calculation
  const lowestWholesalePrice = product.pricing.wholesale.tiers.length > 0
    ? product.pricing.wholesale.tiers[product.pricing.wholesale.tiers.length - 1].pricePerUnit
    : product.pricing.retail.sellingPrice;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const qty = isWholesale ? product.pricing.wholesale.moq : 1;
    addToCart(product, qty);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.pricing.retail.discountPercent > 0 && !isWholesale && (
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              {product.pricing.retail.discountPercent}% OFF
            </span>
          )}

          {isWholesale && (
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Store className="h-3 w-3" />
              MOQ: {product.pricing.wholesale.moq} Pcs
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md shadow-md transition transform active:scale-90 ${
            isWishlisted
              ? 'bg-pink-600 text-white'
              : 'bg-white/80 text-slate-600 hover:text-pink-600 hover:bg-white'
          }`}
          title="Wishlist"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images.primary}
          alt={product.name[language] || product.name.en}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 text-center">
            <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
              स्टॉक में उपलब्ध नहीं (Out of Stock)
            </span>
          </div>
        )}

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/90 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md hover:bg-white">
            <Eye className="h-3.5 w-3.5 text-pink-600" />
            360° व्यू एवं विवरण (Details)
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-pink-700 bg-pink-50 px-2 py-0.5 rounded">
              {product.subCategory || product.category}
            </span>
            <div className="flex items-center gap-1 font-bold text-amber-600">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.ratings.average}</span>
              <span className="text-slate-400 font-normal">({product.ratings.totalReviews})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 group-hover:text-pink-700 transition-colors leading-snug">
            {product.name[language] || product.name.hi || product.name.en}
          </h3>
        </div>

        {/* Pricing Section */}
        <div className="pt-2 border-t border-slate-100">
          {!isWholesale ? (
            /* Retail Pricing View */
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-black text-base sm:text-lg text-pink-900">
                  {formatPrice(product.pricing.retail.sellingPrice)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.pricing.retail.mrp)}
                </span>
              </div>

              {/* Loyalty Points Badge */}
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                <Gift className="h-3 w-3 text-emerald-600" />
                <span>+ {product.pricing.retail.pointsEarned} रिवॉर्ड पॉइंट्स</span>
              </div>
            </div>
          ) : (
            /* Wholesale Tier Pricing View */
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 font-medium flex items-center justify-between">
                <span>थोक दर (Starting Bulk Rate):</span>
                <span className="font-bold text-amber-700">Tier 1-4 Rates</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-base sm:text-lg text-amber-900">
                  {formatPrice(lowestWholesalePrice)}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ पीस</span>
                <span className="text-[10px] text-slate-400 line-through">
                  {formatPrice(product.pricing.retail.mrp)}
                </span>
              </div>

              <div className="text-[10px] font-bold text-slate-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center justify-between">
                <span>अनुमानित मुनाफा:</span>
                <span className="text-emerald-700">
                  +{formatPrice(product.pricing.retail.sellingPrice - lowestWholesalePrice)} / Pc
                </span>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`mt-2.5 w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isWholesale
                ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-98'
                : 'bg-pink-600 hover:bg-pink-700 text-white active:scale-98'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>
              {isWholesale
                ? `थोक कार्ट में जोड़ें (${product.pricing.wholesale.moq} Pcs)`
                : t('addToCart')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
