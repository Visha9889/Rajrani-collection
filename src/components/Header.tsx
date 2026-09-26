import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES, CURRENCIES } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';
import { UserDropdown } from './UserDropdown';
import {
  ShoppingBag,
  Heart,
  Bell,
  Search,
  Sparkles,
  Store,
  UserCheck,
  Globe,
  DollarSign,
  Phone,
  MapPin,
  Menu,
  X,
  HelpCircle,
  PackageCheck,
  User as UserIcon,
  Tag
} from 'lucide-react';
import { LanguageCode, CurrencyCode } from '../types';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenNotifications: () => void;
  onOpenAiAssistant: () => void;
  onOpenOrders: () => void;
  onOpenFaq: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  activeTab: 'catalog' | 'b2b_hub' | 'account';
  setActiveTab: (tab: 'catalog' | 'b2b_hub' | 'account') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenCart,
  onOpenWishlist,
  onOpenNotifications,
  onOpenAiAssistant,
  onOpenOrders,
  onOpenFaq,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeTab,
  setActiveTab
}) => {
  const {
    user,
    activeRole,
    language,
    setLanguage,
    currency,
    setCurrency,
    cart,
    wishlist,
    notifications,
    formatPrice,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const isRetail = activeRole === 'retail';

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Top Bar Announcement */}
      <div className={`py-1.5 px-4 text-white text-xs ${
        isRetail
          ? 'bg-gradient-to-r from-pink-900 via-rose-800 to-pink-900'
          : 'bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className={`font-black text-[10px] px-1.5 py-0.5 rounded uppercase ${
              isRetail ? 'bg-amber-400 text-pink-950' : 'bg-cyan-400 text-blue-950'
            }`}>
              {isRetail ? 'Festival Offer' : 'B2B Wholesale Hub'}
            </span>
            <span className="font-medium text-amber-100">
              {t('diwaliBanner')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-100 shrink-0">
            <div className="hidden md:flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-300" />
              <span>हरदोई, उ.प्र. (Hardoi, UP Store)</span>
            </div>
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-white">
              <Phone className="h-3 w-3 text-amber-300" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="cursor-pointer flex items-center gap-2.5" onClick={() => {
              setActiveTab('catalog');
              setSelectedCategory('all');
            }}>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl p-0.5 shadow-md flex items-center justify-center ${
                isRetail
                  ? 'bg-gradient-to-br from-pink-600 to-pink-900'
                  : 'bg-gradient-to-br from-blue-600 to-blue-900'
              }`}>
                <div className="h-full w-full bg-white/10 rounded-[10px] flex items-center justify-center border border-amber-300/40">
                  <span className="font-serif font-black text-amber-300 text-lg sm:text-xl">RC</span>
                </div>
              </div>

              <div>
                <h1 className={`font-serif font-bold text-lg sm:text-2xl leading-none tracking-tight flex items-center gap-1.5 ${
                  isRetail ? 'text-pink-900' : 'text-blue-950'
                }`}>
                  {t('storeTitle')}
                  <span className="text-[10px] font-sans font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded-full hidden sm:inline-block">
                    Hardoi, UP
                  </span>
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block">
                  {t('tagline')}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm pl-9 pr-24 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <button
                onClick={onOpenAiAssistant}
                className="absolute right-1.5 top-1.5 bg-gradient-to-r from-amber-500 to-pink-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 hover:brightness-110 shadow-sm"
              >
                <Sparkles className="h-3 w-3 text-amber-200 animate-pulse" />
                <span>AI स्टाइल</span>
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Language & Currency Dropdowns */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-full text-xs">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-slate-700 font-medium shadow-xs">
                <Globe className="h-3.5 w-3.5 text-pink-600" />
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value as LanguageCode)}
                  className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.native} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-slate-700 font-medium shadow-xs">
                <DollarSign className="h-3.5 w-3.5 text-amber-600" />
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  {Object.keys(CURRENCIES).map(curr => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white shadow-xs">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Wishlist Button (Retail Only) */}
            {isRetail && (
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition"
                title="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2 text-white px-3 py-1.5 rounded-full transition shadow-sm ${
                isRetail ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-slate-950">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs">
                {cartCount > 0 ? formatPrice(cartTotal) : t('cart')}
              </span>
            </button>

            {/* User Dropdown */}
            <UserDropdown
              onOpenAuth={onOpenAuth}
              onOpenOrders={onOpenOrders}
            />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 lg:hidden flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-xs pl-8 pr-16 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-pink-500"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
          <button
            onClick={onOpenAiAssistant}
            className="bg-gradient-to-r from-amber-500 to-pink-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>AI</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs Bar */}
      <div className="bg-slate-100 border-t border-b border-slate-200 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Main Navigation Menu Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-0.5">
            {/* Catalog Tab */}
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-2xs ${
                activeTab === 'catalog'
                  ? isRetail
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              <span>{isRetail ? '🛍️ मुख्य कैटलॉग (Catalog)' : '🏷️ थोक कैटलॉग (Bulk Catalog)'}</span>
            </button>

            {/* Dedicated B2B Hub Menu Tab (Wholesale Only) */}
            {!isRetail && (
              <button
                onClick={() => setActiveTab('b2b_hub')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-2xs ${
                  activeTab === 'b2b_hub'
                    ? 'bg-cyan-500 text-blue-950 font-black shadow-xs'
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                <PackageCheck className="h-3.5 w-3.5 text-amber-300" />
                <span>💼 B2B हब (B2B Hub)</span>
              </button>
            )}

            {/* Account Tab */}
            <button
              onClick={() => setActiveTab('account')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-2xs ${
                activeTab === 'account'
                  ? isRetail
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <UserIcon className="h-3.5 w-3.5" />
              <span>{isRetail ? '👤 मेरा अकाउंट (Account)' : '🏪 डीलर अकाउंट (Account)'}</span>
            </button>
          </div>

          {/* Quick Category Navigation */}
          {activeTab === 'catalog' && (
            <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto">
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
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? isRetail
                        ? 'bg-pink-100 text-pink-800 border border-pink-300 font-bold'
                        : 'bg-blue-100 text-blue-900 border border-blue-300 font-bold'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Orders & Help Links */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenFaq}
              className="text-slate-600 font-semibold hover:text-slate-900 text-xs flex items-center gap-1"
            >
              <HelpCircle className="h-3.5 w-3.5 text-pink-600" />
              <span>सहायता (FAQ)</span>
            </button>

            <button
              onClick={onOpenOrders}
              className="text-pink-700 font-bold hover:underline text-xs flex items-center gap-1"
            >
              <span>{t('orders')}</span>
              <span className="text-[10px] bg-pink-100 px-1.5 py-0.2 rounded-full font-semibold">
                {t('trackOrder')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setActiveTab('catalog');
                setSelectedCategory('all');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg bg-slate-100 text-left font-semibold text-slate-800"
            >
              {t('allProducts')}
            </button>
            <button
              onClick={() => {
                setActiveTab('catalog');
                setSelectedCategory('saree');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg bg-slate-100 text-left font-semibold text-slate-800"
            >
              {t('sarees')}
            </button>
            <button
              onClick={() => {
                setActiveTab('catalog');
                setSelectedCategory('suit');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg bg-slate-100 text-left font-semibold text-slate-800"
            >
              {t('suits')}
            </button>
            <button
              onClick={() => {
                setActiveTab('catalog');
                setSelectedCategory('lehenga');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg bg-slate-100 text-left font-semibold text-slate-800"
            >
              {t('lehengas')}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-pink-600" />
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as LanguageCode)}
                className="bg-slate-100 p-1 rounded font-semibold text-xs"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-600" />
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value as CurrencyCode)}
                className="bg-slate-100 p-1 rounded font-semibold text-xs"
              >
                {Object.keys(CURRENCIES).map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
