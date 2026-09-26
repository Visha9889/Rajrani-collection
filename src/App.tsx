import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AuthModal } from './components/AuthModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AiStyleAssistantModal } from './components/AiStyleAssistantModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { WishlistModal } from './components/WishlistModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FaqHelpCenter } from './components/FaqHelpCenter';
import { LiveChatSupport } from './components/LiveChatSupport';
import { RetailHome } from './components/RetailHome';
import { WholesalePortal } from './components/WholesalePortal';
import { B2BHubPage } from './components/B2BHubPage';
import { AccountPage } from './components/AccountPage';
import { Product } from './types';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeRole, products, toastMessage } = useApp();

  // Active Menu Navigation Tab ('catalog' | 'b2b_hub' | 'account')
  const [activeTab, setActiveTab] = useState<'catalog' | 'b2b_hub' | 'account'>('catalog');

  // Search & Categories state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const isRetail = activeRole === 'retail';

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased text-slate-900 ${
      isRetail ? 'retail-theme bg-[#FFF5F7]' : 'wholesale-theme bg-[#E3F2FD]'
    }`}>
      {/* Toast Notification Alert Banner */}
      {toastMessage && (
        <div
          className={`fixed top-16 right-4 z-50 max-w-sm rounded-2xl px-4 py-3 shadow-2xl text-xs font-bold text-white flex items-center gap-2 animate-bounce ${
            toastMessage.type === 'error'
              ? 'bg-red-600'
              : toastMessage.type === 'info'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-emerald-600'
          }`}
        >
          {toastMessage.type === 'error' && <AlertCircle className="h-4 w-4 shrink-0" />}
          {toastMessage.type === 'info' && <Info className="h-4 w-4 shrink-0" />}
          {toastMessage.type === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Header */}
      <Header
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCart={() => setCartModalOpen(true)}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenAiAssistant={() => setAiModalOpen(true)}
        onOpenOrders={() => setOrdersModalOpen(true)}
        onOpenFaq={() => setFaqModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6">
        {activeTab === 'account' ? (
          <AccountPage onOpenOrders={() => setOrdersModalOpen(true)} />
        ) : activeTab === 'b2b_hub' && !isRetail ? (
          <B2BHubPage
            products={products}
            onOpenCart={() => setCartModalOpen(true)}
          />
        ) : isRetail ? (
          <RetailHome
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenProductDetail={prod => setSelectedProduct(prod)}
            onOpenAiAssistant={() => setAiModalOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <WholesalePortal
            products={products}
            onOpenProductDetail={prod => setSelectedProduct(prod)}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenCart={() => setCartModalOpen(true)}
            onNavigateToB2BHub={() => setActiveTab('b2b_hub')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Live Floating Chat Support */}
      <LiveChatSupport />

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenAiAssistant={() => {
          setSelectedProduct(null);
          setAiModalOpen(true);
        }}
      />

      <CartCheckoutModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        onOpenOrders={() => setOrdersModalOpen(true)}
      />

      <OrderTrackingModal
        isOpen={ordersModalOpen}
        onClose={() => setOrdersModalOpen(false)}
      />

      <AiStyleAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        onOpenCart={() => setCartModalOpen(true)}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <FaqHelpCenter
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
