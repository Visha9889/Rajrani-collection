import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  RotateCcw,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const { orders, formatPrice, showToast, t } = useApp();

  if (!isOpen) return null;

  const handleDownloadInvoice = (orderId: string) => {
    showToast(`📄 इनवॉइस टैक्स बिल (Invoice ${orderId}) डाउनलोड हो रहा है...`, 'success');
  };

  const handleInitiateReturn = (orderId: string) => {
    showToast(`🔄 ऑर्डर ${orderId} के लिए वापसी/रिटर्न अनुरोध दर्ज कर लिया गया है। पिकअप टीम संपर्क करेगी।`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl my-6 text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-pink-600" />
            <h2 className="font-serif font-bold text-lg text-slate-900">
              मेरे ऑर्डर एवं लाइव ट्रैकिंग (Order Tracking)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Orders List Content */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Package className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">आपका कोई पिछला ऑर्डर नहीं है</h3>
              <p className="text-xs text-slate-500">
                ऑर्डर देने के पश्चात आप यहाँ रियल-टाइम लाइव कूरियर स्थिति देख सकते हैं।
              </p>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-xs"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs">
                  <div>
                    <span className="text-slate-400">ऑर्डर आईडी:</span>
                    <strong className="font-mono text-pink-700 ml-1 text-sm">{order.id}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{order.createdAt}</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {order.items.map((it, i) => (
                      <img
                        key={i}
                        src={it.product.images.primary}
                        alt="item"
                        className="h-12 w-12 object-cover rounded-lg border border-slate-300"
                      />
                    ))}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-slate-400 block text-[10px]">कुल देय राशि:</span>
                    <span className="font-mono font-black text-slate-900 text-base">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* VISUAL TRACKING TIMELINE */}
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      लाइव ट्रैकिंग: <span className="text-pink-600">{order.orderStatus}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {order.courierName} • {order.trackingNumber}
                    </span>
                  </div>

                  {/* Step Progress Bar */}
                  <div className="grid grid-cols-4 gap-1 relative text-[10px] text-center font-bold">
                    {order.timeline.map((step, idx) => (
                      <div key={idx} className="space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            step.completed ? 'bg-pink-600' : 'bg-slate-200'
                          }`}
                        />
                        <span className={step.completed ? 'text-pink-900' : 'text-slate-400'}>
                          {step.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="flex items-center gap-1.5 text-pink-700 font-bold hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    <span>बी2बी / जीएसटी इनवॉइस डाउनलोड</span>
                  </button>

                  <button
                    onClick={() => handleInitiateReturn(order.id)}
                    className="flex items-center gap-1 text-slate-600 font-semibold hover:text-slate-900"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>7-दिन आसान रिटर्न रिक्वेस्ट</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
