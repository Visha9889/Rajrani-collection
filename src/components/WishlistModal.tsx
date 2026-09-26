import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose, onOpenCart }) => {
  const { wishlist, toggleWishlist, products, addToCart, formatPrice, activeRole, showToast } = useApp();

  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    let movedCount = 0;
    wishlistedProducts.forEach(prod => {
      const qty = activeRole === 'wholesale' ? prod.pricing.wholesale.moq : 1;
      addToCart(prod, qty);
      movedCount++;
    });
    if (movedCount > 0) {
      showToast(`${movedCount} उत्पाद कार्ट में स्थानांतरित किए गए!`, 'success');
      onClose();
      onOpenCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600 fill-pink-600" />
            <h2 className="font-serif font-bold text-lg text-slate-900">
              मेरी पसंदीदा सूची (My Wishlist) ({wishlistedProducts.length})
            </h2>
          </div>

          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Heart className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">विशलिस्ट खाली है</h3>
              <p className="text-xs text-slate-500">
                अपनी पसंदीदा साड़ी या सूट पर दिल ❤️ आइकॉन टैप करें।
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 divide-y divide-slate-100">
                {wishlistedProducts.map(prod => (
                  <div key={prod.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images.primary}
                        alt="p"
                        className="h-14 w-14 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 line-clamp-1">
                          {prod.name.hi || prod.name.en}
                        </h4>
                        <span className="text-[10px] text-pink-700 font-bold bg-pink-50 px-1.5 py-0.2 rounded uppercase">
                          {prod.category}
                        </span>
                        <div className="font-bold text-slate-900 mt-1">
                          {formatPrice(prod.pricing.retail.sellingPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const qty = activeRole === 'wholesale' ? prod.pricing.wholesale.moq : 1;
                          addToCart(prod, qty);
                        }}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>कार्ट में जोड़ें</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                <span>सभी आइटम कार्ट में भेजें (Move All To Cart)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
