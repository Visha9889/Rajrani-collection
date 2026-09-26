import React, { useState } from 'react';
import { Product, ProductReview } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Gift,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Calculator,
  MessageCircle,
  Copy,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenAiAssistant: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenAiAssistant
}) => {
  const {
    activeRole,
    language,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    showToast,
    t
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [angle360Mode, setAngle360Mode] = useState(false);
  const [angle360Index, setAngle360Index] = useState(0);

  const [quantity, setQuantity] = useState(
    product && activeRole === 'wholesale' ? product.pricing.wholesale.moq : 1
  );

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const isWholesale = activeRole === 'wholesale';
  const galleryImages = [product.images.primary, ...product.images.gallery];

  // Calculate tier price if wholesale
  let currentUnitPrice = product.pricing.retail.sellingPrice;
  if (isWholesale) {
    const matchedTier = [...product.pricing.wholesale.tiers]
      .reverse()
      .find(tier => quantity >= tier.minQty);
    if (matchedTier) {
      currentUnitPrice = matchedTier.pricePerUnit;
    }
  }

  const handleAddToCart = () => {
    const res = addToCart(product, quantity);
    if (res.success) onClose();
  };

  const handleShareWhatsApp = () => {
    const text = `🌸 *${product.name[language] || product.name.en}* 🌸\nराजरानी कलेक्शन (Hardoi, UP)\nविशेष मूल्य: ${formatPrice(currentUnitPrice)}\nयहाँ देखें: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('लॉन्च लिंक क्लिपबोर्ड पर कॉपी हुआ!', 'success');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !reviewerName.trim()) {
      showToast('कृपया नाम और समीक्षा विवरण भरें', 'error');
      return;
    }
    const reviewObj: ProductReview = {
      id: `rev_${Date.now()}`,
      userName: reviewerName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      userRole: activeRole,
      city: 'Hardoi'
    };
    product.reviews.unshift(reviewObj);
    product.ratings.totalReviews += 1;
    setNewComment('');
    setReviewerName('');
    showToast('आपकी समीक्षा सफलतापूर्वक सबमिट हुई!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden my-6 text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-slate-900/60 p-2 text-white hover:bg-slate-900 transition backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery & 360 View */}
          <div className="p-4 bg-slate-50 flex flex-col items-center justify-between border-r border-slate-200">
            {/* Main Display Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-200 shadow-inner group">
              {!angle360Mode ? (
                <img
                  src={galleryImages[activeImageIndex]}
                  alt="Product view"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="relative h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white">
                  <img
                    src={product.images.angles360?.[angle360Index] || galleryImages[0]}
                    alt="360 angle view"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 inset-x-4 bg-black/60 backdrop-blur-md p-2 rounded-xl text-center text-xs flex items-center justify-between">
                    <span>360° एंगल: {angle360Index + 1} / {product.images.angles360?.length || 1}</span>
                    <input
                      type="range"
                      min={0}
                      max={(product.images.angles360?.length || 1) - 1}
                      value={angle360Index}
                      onChange={e => setAngle360Index(Number(e.target.value))}
                      className="w-1/2 accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* 360 View Toggle Badge */}
              {product.images.angles360 && (
                <button
                  onClick={() => setAngle360Mode(!angle360Mode)}
                  className="absolute top-3 left-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{angle360Mode ? 'सामान्य फोटो देखें' : '360° व्यू देखें'}</span>
                </button>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 mt-4 overflow-x-auto w-full pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAngle360Mode(false);
                    setActiveImageIndex(idx);
                  }}
                  className={`h-16 w-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                    activeImageIndex === idx && !angle360Mode
                      ? 'border-pink-600 ring-2 ring-pink-300'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt="thumb" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* AI Style Helper Banner */}
            <div className="w-full mt-4 bg-gradient-to-r from-purple-950 to-pink-900 text-white p-3 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
                <div className="text-xs">
                  <p className="font-bold">साड़ी ड्रेपिंग या मैचिंग ब्लाउज सलाह लें</p>
                  <p className="text-[10px] text-pink-200">AI स्टाइल कंसल्टेंट से पूछें</p>
                </div>
              </div>
              <button
                onClick={onOpenAiAssistant}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl shadow-xs"
              >
                स्टाइल सलाह
              </button>
            </div>
          </div>

          {/* Right Column: Specifications & Pricing */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Title */}
              <div className="flex items-center justify-between text-xs text-pink-700 font-bold mb-1">
                <span className="uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-md">
                  {product.category} • SKU: {product.sku}
                </span>
                <span className="text-slate-500 font-medium">स्टॉक: {product.inventory.retailStock} Pcs</span>
              </div>

              <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
                {product.name[language] || product.name.hi || product.name.en}
              </h2>

              {/* Rating Summary */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="ml-1">{product.ratings.average}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 font-medium">{product.ratings.totalReviews} ग्राहक समीक्षाएं</span>
              </div>

              {/* Product Description */}
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {product.description[language] || product.description.hi || product.description.en}
              </p>

              {/* Specs Table */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block">फैब्रिक (Fabric):</span>
                  <span className="font-bold text-slate-800">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">रंग (Color):</span>
                  <span className="font-bold text-slate-800">{product.color}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">लम्बाई (Length):</span>
                  <span className="font-bold text-slate-800">{product.length || 'Standard'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">धुलाई निर्देश:</span>
                  <span className="font-bold text-slate-800">{product.careInstructions || 'Dry Clean'}</span>
                </div>
              </div>

              {/* RETAIL PRICING VIEW */}
              {!isWholesale ? (
                <div className="mt-5 p-4 rounded-2xl bg-pink-50/60 border border-pink-200/80 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-black text-2xl text-pink-900">
                      {formatPrice(product.pricing.retail.sellingPrice)}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(product.pricing.retail.mrp)}
                    </span>
                    <span className="bg-pink-600 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                      {product.pricing.retail.discountPercent}% OFF
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-100/80 px-3 py-1 rounded-xl w-fit">
                    <Gift className="h-4 w-4 text-emerald-600" />
                    <span>ऑर्डर पर {product.pricing.retail.pointsEarned} रिवॉर्ड पॉइंट्स मिलेंगे!</span>
                  </div>
                </div>
              ) : (
                /* WHOLESALE TIER MATRIX VIEW */
                <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-amber-900 flex items-center gap-1">
                      <Layers className="h-4 w-4 text-amber-600" />
                      <span>थोक मात्रा डिस्काउंट दरें (Wholesale Tier Pricing Matrix)</span>
                    </h4>
                    <span className="text-[10px] bg-amber-200 font-bold text-amber-900 px-2 py-0.5 rounded-full">
                      MOQ: {product.pricing.wholesale.moq} Pcs
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.pricing.wholesale.tiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          quantity >= tier.minQty
                            ? 'bg-amber-200/80 border-amber-500 font-bold text-amber-950 shadow-xs'
                            : 'bg-white border-amber-200 text-slate-600'
                        }`}
                      >
                        <div className="text-[11px] font-semibold">{tier.qtyRange}</div>
                        <div className="text-sm font-black text-amber-900">{formatPrice(tier.pricePerUnit)}/Pc</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{tier.discountPercent}% OFF</div>
                      </div>
                    ))}
                  </div>

                  {/* Live Profit Margin Estimator */}
                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1">
                        <Calculator className="h-4 w-4 text-emerald-600" />
                        <span>दुकान का संभावित मुनाफा (Profit Estimate):</span>
                      </span>
                      <span className="text-emerald-700 font-black text-sm">
                        {formatPrice((product.pricing.retail.sellingPrice - currentUnitPrice) * quantity)}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      (MRP दर {formatPrice(product.pricing.retail.sellingPrice)} पर बेचने पर संभावित बचत)
                    </p>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="font-bold text-xs text-slate-700">मात्रा (Quantity):</span>
                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 p-1">
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(
                          isWholesale ? product.pricing.wholesale.moq : 1,
                          quantity - 1
                        )
                      )
                    }
                    className="h-8 w-8 rounded-lg bg-white shadow-xs text-slate-700 font-black hover:bg-slate-100 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-lg bg-white shadow-xs text-slate-700 font-black hover:bg-slate-100 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  कुल राशि: <strong>{formatPrice(currentUnitPrice * quantity)}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition transform active:scale-98 ${
                    isWholesale
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                      : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>
                    {isWholesale
                      ? `थोक ऑर्डर कार्ट में जोड़ें (${quantity} Pcs)`
                      : t('addToCart')}
                  </span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-2xl border-2 transition ${
                    isWishlisted
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'border-slate-300 text-slate-600 hover:bg-pink-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-700">सोशल मीडिया पर शेयर करें:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="p-2 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition flex items-center gap-1 font-bold text-[11px]"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition flex items-center gap-1 font-bold text-[11px]"
                  >
                    <Copy className="h-4 w-4" />
                    <span>लिंक कॉपी करें</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">ग्राहक समीक्षाएं ({product.reviews.length})</h3>

              {/* Reviews List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1 text-xs">
                {product.reviews.map(rev => (
                  <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{rev.userName} {rev.city ? `(${rev.city})` : ''}</span>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-[11px]">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                  </div>
                ))}
              </div>

              {/* Write Review Form */}
              <form onSubmit={handleAddReview} className="bg-slate-100 p-3 rounded-2xl space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">अपनी समीक्षा लिखें (Rate this item):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="आपका नाम (Your Name)"
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 p-1.5 bg-white text-xs"
                  />
                  <select
                    value={newRating}
                    onChange={e => setNewRating(Number(e.target.value))}
                    className="rounded-lg border border-slate-300 p-1.5 bg-white text-xs font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="कपड़े की क्वालिटी या सिलाई कैसी लगी?"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-1.5 bg-white text-xs"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 py-2 font-bold text-white hover:bg-slate-800 transition"
                >
                  समीक्षा सबमिट करें (Submit Review)
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
