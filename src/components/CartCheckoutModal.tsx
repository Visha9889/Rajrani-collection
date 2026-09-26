import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  FileText,
  Gift,
  ArrowRight,
  Sparkles,
  Building2,
  Download
} from 'lucide-react';
import { Order } from '../types';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrders: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  onOpenOrders
}) => {
  const {
    user,
    activeRole,
    cart,
    updateCartQty,
    removeFromCart,
    placeOrder,
    formatPrice,
    showToast,
    t
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'confirmed'>('cart');

  // Coupon code
  const [promoCode, setPromoCode] = useState('SEPT20');
  const [couponApplied, setCouponApplied] = useState(true);

  // Points redemption
  const [usePoints, setUsePoints] = useState(false);
  const maxPoints = user.retailProfile?.points || 0;

  // Address
  const [shippingAddress, setShippingAddress] = useState({
    name:
      activeRole === 'wholesale'
        ? user.wholesaleProfile?.name || 'राज शर्मा'
        : user.retailProfile?.name || 'प्रिया शर्मा',
    phone: user.phone || '+919876543210',
    street:
      activeRole === 'wholesale'
        ? user.wholesaleProfile?.shopAddress || '45 गांधी गंज चौक, हरदोई'
        : user.retailProfile?.address || '123 मेन बाजार, हरदोई',
    city:
      activeRole === 'wholesale'
        ? user.wholesaleProfile?.city || 'Hardoi'
        : user.retailProfile?.city || 'Hardoi',
    state:
      activeRole === 'wholesale'
        ? user.wholesaleProfile?.state || 'Uttar Pradesh'
        : user.retailProfile?.state || 'Uttar Pradesh',
    pincode:
      activeRole === 'wholesale'
        ? user.wholesaleProfile?.pincode || '241001'
        : user.retailProfile?.pincode || '241001',
    shopName: user.wholesaleProfile?.shopName || '',
    gstn: user.wholesaleProfile?.gstn || ''
  });

  // Payment Option
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>(
    activeRole === 'wholesale' ? 'WholesaleCredit5050' : 'UPI'
  );

  // Confirmed Order
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const isWholesale = activeRole === 'wholesale';
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  let promoDiscount = 0;
  if (couponApplied) {
    if (promoCode.toUpperCase() === 'SEPT20' || promoCode.toUpperCase() === 'DIWALI20') {
      promoDiscount = Math.round(subtotal * 0.2);
    } else if (promoCode.toUpperCase() === 'FIRST10') {
      promoDiscount = Math.round(subtotal * 0.1);
    }
  }

  const pointsDiscount = usePoints ? Math.floor(maxPoints / 100) : 0;
  const totalDiscount = promoDiscount + pointsDiscount;
  const shippingFee = subtotal > 500 ? 0 : 99;
  const taxAmount = Math.round((subtotal - totalDiscount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - totalDiscount + shippingFee + taxAmount);

  const handleApplyCoupon = () => {
    const codeUpper = promoCode.trim().toUpperCase();
    if (codeUpper === 'SEPT20' || codeUpper === 'DIWALI20' || codeUpper === 'FIRST10') {
      setCouponApplied(true);
      showToast(`🎉 कूपन ${codeUpper} लागू हुआ!`, 'success');
    } else {
      showToast('अवैध कूपन कोड (Try SEPT20 or FIRST10)', 'error');
    }
  };

  const handleConfirmOrder = () => {
    const res = placeOrder(
      shippingAddress,
      paymentMethod,
      usePoints ? maxPoints : 0,
      couponApplied ? promoCode : undefined
    );

    if (res.success && res.order) {
      setConfirmedOrder(res.order);
      setCheckoutStep('confirmed');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-pink-600" />
            <h2 className="font-serif font-bold text-lg text-slate-900">
              {checkoutStep === 'cart' && 'शॉपिंग कार्ट (Shopping Cart)'}
              {checkoutStep === 'address' && 'डिलीवरी पता (Delivery Address)'}
              {checkoutStep === 'payment' && 'भुगतान विकल्प (Payment Method)'}
              {checkoutStep === 'confirmed' && 'ऑर्डर पूर्ण हुआ (Order Placed!)'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* STEP 1: CART REVIEW */}
        {checkoutStep === 'cart' && (
          <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">आपकी कार्ट खाली है</h3>
                <p className="text-xs text-slate-500">
                  राजरानी कलेक्शन की सुंदर साड़ियां और सूट देखने के लिए संग्रह ब्राउज करें।
                </p>
                <button
                  onClick={onClose}
                  className="bg-pink-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
                >
                  खरीदारी शुरू करें
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3 divide-y divide-slate-100">
                  {cart.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex gap-3 items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images.primary}
                          alt="p"
                          className="h-16 w-16 object-cover rounded-xl border border-slate-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1">
                            {item.product.name.hi || item.product.name.en}
                          </h4>
                          <span className="text-[10px] text-pink-700 bg-pink-50 px-1.5 py-0.2 rounded font-semibold uppercase">
                            {item.product.category}
                          </span>
                          <div className="font-bold text-slate-800 mt-1">
                            {formatPrice(item.unitPrice)} / Piece
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 p-0.5">
                          <button
                            onClick={() => updateCartQty(item.product.id, -1)}
                            className="h-6 w-6 rounded bg-white shadow-xs font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.product.id, 1)}
                            className="h-6 w-6 rounded bg-white shadow-xs font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-black text-slate-900 w-20 text-right">
                          {formatPrice(item.totalPrice)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code & Points Box */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  {/* Coupon */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="कूपन कोड (e.g. SEPT20)"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-300 p-2 text-xs font-mono font-bold uppercase"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-pink-600 text-white font-bold px-4 py-2 rounded-xl"
                    >
                      लागू करें
                    </button>
                  </div>

                  {/* Points Redemption Checkbox (Retail only) */}
                  {!isWholesale && maxPoints > 0 && (
                    <label className="flex items-center gap-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={usePoints}
                        onChange={e => setUsePoints(e.target.checked)}
                        className="rounded text-pink-600 accent-pink-600"
                      />
                      <span className="font-semibold text-xs">
                        {maxPoints} रिवार्ड पॉइंट्स रिडीम करें ({formatPrice(Math.floor(maxPoints / 100))} छूट)
                      </span>
                    </label>
                  )}
                </div>

                {/* Bill Summary */}
                <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>उपकुल (Subtotal):</span>
                    <span className="font-mono font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>डिस्काउंट (Discount):</span>
                      <span className="font-mono font-bold">- {formatPrice(totalDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>शिपिंग शुल्क (Shipping):</span>
                    <span className="font-mono font-bold text-white">
                      {shippingFee === 0 ? 'मुफ्त (FREE)' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>जीएसटी कर (5% Textile GST):</span>
                    <span className="font-mono font-bold text-white">{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-amber-300">
                    <span>कुल देय राशि (Grand Total):</span>
                    <span className="font-mono font-black text-lg">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('address')}
                  className="w-full py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <span>चेकआउट आगे बढ़ाएं (Proceed to Address)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 2: ADDRESS INPUT */}
        {checkoutStep === 'address' && (
          <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">प्राप्तकर्ता का नाम *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.name}
                  onChange={e => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">फ़ोन नंबर *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.phone}
                  onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">पूरा डिलीवरी पता (Street Address / Landmark) *</label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress.street}
                  onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">शहर (City) *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">पिनकोड (Pincode) *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={shippingAddress.pincode}
                  onChange={e => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setCheckoutStep('cart')}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                पीछे
              </button>
              <button
                onClick={() => setCheckoutStep('payment')}
                className="flex-1 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>भुगतान पर जाएं (Select Payment)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {checkoutStep === 'payment' && (
          <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
              सुरक्षित पेमेंट गेटवे विकल्प चुनें:
            </h3>

            <div className="space-y-3">
              {/* UPI Option */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition border-pink-600 bg-pink-50/50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay_method"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="accent-pink-600"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <QrCode className="h-4 w-4 text-pink-600" />
                      <span>UPI (Google Pay, PhonePe, Paytm QR)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">तत्काल 1-क्लिक भुगतान सुविधा</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Fast Choice
                </span>
              </label>

              {/* Cards Option */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-slate-200 cursor-pointer hover:border-pink-300">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay_method"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-slate-700" />
                      <span>क्रेडिट / डेबिट कार्ड (Visa, MasterCard, RuPay)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">256-बिट SSL सुरक्षित Razorpay गेटवे</p>
                  </div>
                </div>
              </label>

              {/* Wholesale 50-50 Split Option */}
              {isWholesale && (
                <label className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-amber-500 bg-amber-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pay_method"
                      checked={paymentMethod === 'WholesaleCredit5050'}
                      onChange={() => setPaymentMethod('WholesaleCredit5050')}
                    />
                    <div>
                      <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-amber-600" />
                        <span>थोक 50-50 क्रेडिट शर्तें (50% अग्रिम + 50% क्रेडिट)</span>
                      </h4>
                      <p className="text-[11px] text-amber-800">
                        {formatPrice(grandTotal / 2)} अभी दें, शेष 15 दिनों में
                      </p>
                    </div>
                  </div>
                </label>
              )}
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs">
              <span>अंतिम देय राशि:</span>
              <span className="font-mono font-black text-amber-300 text-base">{formatPrice(grandTotal)}</span>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setCheckoutStep('address')}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                पीछे
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span>ऑर्डर कन्फर्म करें (Place Order)</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMED CELEBRATION */}
        {checkoutStep === 'confirmed' && confirmedOrder && (
          <div className="p-6 text-center space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="font-serif font-black text-2xl text-slate-900">
              बधाई हो! ऑर्डर सफलतापूर्वक दर्ज हुआ 🎉
            </h3>
            <p className="text-xs text-slate-600">
              ऑर्डर संख्या: <strong className="font-mono text-pink-700">{confirmedOrder.id}</strong>
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">प्राप्तकर्ता:</span>
                <span className="font-bold text-slate-900">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">कुरियर पार्टनर:</span>
                <span className="font-bold text-slate-900">{confirmedOrder.courierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ट्रैकिंग कोड:</span>
                <span className="font-mono font-bold text-pink-700">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">संभावित डिलीवरी तिथि:</span>
                <span className="font-bold text-slate-900">{confirmedOrder.expectedDelivery}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenOrders();
                }}
                className="flex-1 py-3 rounded-2xl bg-pink-600 text-white font-bold text-xs hover:bg-pink-700 shadow-md"
              >
                ऑर्डर लाइव ट्रैक करें (Track Order)
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                बंद करें
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
