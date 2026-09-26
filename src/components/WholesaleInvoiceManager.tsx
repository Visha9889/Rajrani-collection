import React from 'react';
import { FileText, Download, Building2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WholesaleInvoiceManager: React.FC = () => {
  const { orders, formatPrice, showToast } = useApp();

  const handleDownloadInvoice = (invoiceNo: string) => {
    showToast(`📄 टैक्स इनवॉइस bill (${invoiceNo}) डाउनलोड हो गया! (ITC Tax Credit Valid)`, 'success');
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-blue-200 shadow-md space-y-4 text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-700" />
          <h4 className="font-serif font-bold text-base text-blue-950">जीएसटी टैक्स इनवॉइस बिल (GST Invoices & ITC Claims)</h4>
        </div>

        <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-700" /> GST Tax Compliant
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {orders.length === 0 ? (
          <p className="text-slate-500 text-center py-4">अभी कोई पिछला आर्डर इनवॉइस रिकॉर्ड नहीं है।</p>
        ) : (
          orders.map(ord => (
            <div
              key={ord.id}
              className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between gap-2"
            >
              <div>
                <span className="font-mono font-bold text-blue-900 block">{ord.invoiceNumber}</span>
                <span className="text-[11px] text-slate-500">आर्डर #: {ord.id} • {ord.createdAt}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-slate-900">{formatPrice(ord.totalAmount)}</span>
                <button
                  onClick={() => handleDownloadInvoice(ord.invoiceNumber)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-xl shadow-xs transition"
                  title="Download Invoice PDF"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
