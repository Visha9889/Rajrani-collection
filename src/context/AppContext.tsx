import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  LanguageCode,
  CurrencyCode,
  Product,
  CartItem,
  Order,
  PushNotification,
  WholesaleProfile,
  RetailProfile,
  OrderStatus
} from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { CURRENCIES, UI_TRANSLATIONS } from '../data/translations';

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => { success: boolean; message: string };
  updateCartQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  placeOrder: (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod'],
    pointsRedeemed?: number,
    promoCode?: string
  ) => { success: boolean; order?: Order; message: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  notifications: PushNotification[];
  addNotification: (title: string, body: string, category: PushNotification['category'], link?: string) => void;
  markNotificationsAsRead: () => void;
  registerRetailUser: (data: Partial<RetailProfile>) => void;
  registerWholesaleUser: (data: Partial<WholesaleProfile>) => void;
  logoutUser: () => void;
  formatPrice: (amountInINR: number) => string;
  t: (key: string) => string;
  toastMessage: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  isOnline: boolean;
  restockProduct: (productId: string, retailQty: number, wholesaleQty: number) => void;
  updateWholesaleStatus: (status: WholesaleProfile['status'], creditLimit?: number) => void;
}

const DEFAULT_USER: User = {
  id: 'usr_guest_01',
  phone: '+919876543210',
  email: 'customer@rajranicollection.com',
  role: 'retail',
  language: 'hi',
  currency: 'INR',
  isLoggedIn: true,
  registrationComplete: true,
  retailProfile: {
    name: 'प्रिया शर्मा (Priya Sharma)',
    phone: '+919876543210',
    email: 'priya@rajranicollection.com',
    state: 'Uttar Pradesh',
    city: 'Hardoi',
    pincode: '241001',
    address: '123 मेन बाजार, हरदोई',
    points: 1250,
    tier: 'Bronze',
    referralCode: 'PRIYA250',
    referralsCount: 3
  },
  wholesaleProfile: {
    name: 'राज शर्मा (Raj Sharma)',
    phone: '+919876543210',
    email: 'raj@sharmasarees.com',
    shopName: 'शर्मा साड़ी एंड सूट एम्पोरियम',
    shopType: 'both',
    businessPan: 'ABCDE1234F',
    aadhaar: '987654321012',
    gstn: '09AABCS1234H1Z0',
    udyam: 'UDYAM-UP-34-001234',
    state: 'Uttar Pradesh',
    city: 'Hardoi',
    pincode: '241001',
    shopAddress: '45 गांधी गंज चौक, हरदोई, उत्तर प्रदेश',
    accountHolder: 'Raj Sharma',
    accountNumber: '918273645019',
    ifsc: 'SBIN0001234',
    status: 'approved',
    creditLimit: 100000,
    creditUsed: 35000,
    documentsUploaded: true,
    assignedManager: {
      name: 'राहुल कुमार (Rahul Kumar)',
      phone: '+919811223344'
    }
  }
};

const DEFAULT_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif_1',
    title: '✨ दीवाली कलेक्शन लॉन्च',
    body: 'शाही बनारसी और दुल्हन लहंगों की नई रेंज पर थोक व्यापारियों को विशेष क्रेडिट छूट!',
    timestamp: 'Just now',
    read: false,
    category: 'arrival'
  },
  {
    id: 'notif_2',
    title: '📦 स्टॉक अपडेट अलर्ट',
    body: 'अनारकली एम्ब्रॉयडर्ड सूट सेट फिर से स्टॉक में उपलब्ध है!',
    timestamp: '2 hours ago',
    read: false,
    category: 'stock'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('rajrani_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>(user.role || 'retail');
  const [language, setLanguageState] = useState<LanguageCode>(user.language || 'hi');
  const [currency, setCurrencyState] = useState<CurrencyCode>(user.currency || 'INR');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rajrani_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rajrani_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('rajrani_wishlist');
    return saved ? JSON.parse(saved) : ['prod_saree_001'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rajrani_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<PushNotification[]>(DEFAULT_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('rajrani_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rajrani_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rajrani_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rajrani_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rajrani_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    setUser(prev => ({ ...prev, role }));
    showToast(
      role === 'wholesale'
        ? '🏪 थोक व्यापारी मोड चालू (Wholesale Mode Active)'
        : '👤 रिटेल ग्राहक मोड चालू (Retail Mode Active)',
      'info'
    );
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    setUser(prev => ({ ...prev, language: lang }));
  };

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    setUser(prev => ({ ...prev, currency: curr }));
  };

  const formatPrice = (amountInINR: number): string => {
    const currObj = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = amountInINR * currObj.rateToINR;
    if (currency === 'INR') {
      return `₹${amountInINR.toLocaleString('en-IN')}`;
    }
    return `${currObj.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const t = (key: string): string => {
    const langDict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
    return langDict[key] || UI_TRANSLATIONS.en[key] || key;
  };

  const addToCart = (product: Product, qty: number = 1): { success: boolean; message: string } => {
    let unitPrice = product.pricing.retail.sellingPrice;

    if (activeRole === 'wholesale') {
      const moq = product.pricing.wholesale.moq;
      if (qty < moq) {
        showToast(`थोक खरीद के लिए न्यूनतम ऑर्डर संख्या ${moq} है। (MOQ required: ${moq})`, 'error');
        return {
          success: false,
          message: `Minimum order quantity for wholesale is ${moq} pieces.`
        };
      }
      const matchedTier = [...product.pricing.wholesale.tiers]
        .reverse()
        .find(tier => qty >= tier.minQty);
      if (matchedTier) {
        unitPrice = matchedTier.pricePerUnit;
      }
    }

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedRole === activeRole
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + qty;
        
        let newUnitPrice = product.pricing.retail.sellingPrice;
        if (activeRole === 'wholesale') {
          const matchedTier = [...product.pricing.wholesale.tiers]
            .reverse()
            .find(tier => newQty >= tier.minQty);
          if (matchedTier) {
            newUnitPrice = matchedTier.pricePerUnit;
          }
        }

        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          unitPrice: newUnitPrice,
          totalPrice: newUnitPrice * newQty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: qty,
            selectedRole: activeRole,
            unitPrice,
            totalPrice: unitPrice * qty
          }
        ];
      }
    });

    showToast(`'${product.name[language] || product.name.en}' कार्ट में जोड़ा गया!`, 'success');
    return { success: true, message: 'Added to cart successfully.' };
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedRole === activeRole) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;

            let unitPrice = item.product.pricing.retail.sellingPrice;
            if (activeRole === 'wholesale') {
              const matchedTier = [...item.product.pricing.wholesale.tiers]
                .reverse()
                .find(tier => newQty >= tier.minQty);
              if (matchedTier) {
                unitPrice = matchedTier.pricePerUnit;
              }
            }

            return {
              ...item,
              quantity: newQty,
              unitPrice,
              totalPrice: unitPrice * newQty
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedRole === activeRole)));
    showToast('कार्ट से हटाया गया', 'info');
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'विशलिस्ट से हटाया गया' : '❤️ विशलिस्ट में जोड़ा गया', 'info');
      return updated;
    });
  };

  const placeOrder = (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod'],
    pointsRedeemed: number = 0,
    promoCode?: string
  ): { success: boolean; order?: Order; message: string } => {
    if (cart.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }

    const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    let discountApplied = 0;

    if (promoCode) {
      const codeUpper = promoCode.toUpperCase().trim();
      if (codeUpper === 'SEPT20' || codeUpper === 'DIWALI20') {
        discountApplied = Math.round(subtotal * 0.2);
      } else if (codeUpper === 'FIRST10') {
        discountApplied = Math.round(subtotal * 0.1);
      }
    }

    const pointsDiscount = Math.floor(pointsRedeemed / 100);
    discountApplied += pointsDiscount;

    const shippingFee = subtotal > 500 ? 0 : 99;
    const taxAmount = Math.round((subtotal - discountApplied) * 0.05); // 5% GST
    const totalAmount = Math.max(0, subtotal - discountApplied + shippingFee + taxAmount);

    let pointsEarned = 0;
    if (activeRole === 'retail') {
      pointsEarned = Math.round(totalAmount * 0.05);
    }

    const orderId = `RC-ORD-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      customerId: user.id,
      customerName: shippingAddress.name,
      customerPhone: shippingAddress.phone,
      role: activeRole,
      items: [...cart],
      subtotal,
      discountApplied,
      pointsEarned,
      pointsRedeemed,
      shippingFee,
      taxAmount,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'WholesaleCredit5050' ? 'Partially Paid' : 'Paid',
      orderStatus: 'Order Confirmed',
      timeline: [
        {
          status: 'Order Confirmed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'ऑर्डर सफलतापूर्वक दर्ज कर लिया गया है।',
          completed: true
        },
        {
          status: 'Packed',
          timestamp: 'Pending',
          description: 'राज रानी गोदाम (Hardoi, UP) में पैकिंग जारी है।',
          completed: false
        },
        {
          status: 'In Transit',
          timestamp: 'Pending',
          description: 'कुरियर पार्टनर (Delhivery Express) को सौंपा गया।',
          completed: false
        },
        {
          status: 'Delivered',
          timestamp: 'Pending',
          description: 'आपके पते पर डिलीवरी संभावित।',
          completed: false
        }
      ],
      trackingNumber: `DELHI-${Math.floor(100000 + Math.random() * 900000)}`,
      courierName: 'Delhivery Express Direct',
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);

    setProducts(prev =>
      prev.map(p => {
        const item = cart.find(c => c.product.id === p.id);
        if (item) {
          return {
            ...p,
            inventory: {
              ...p.inventory,
              retailStock:
                activeRole === 'retail' ? Math.max(0, p.inventory.retailStock - item.quantity) : p.inventory.retailStock,
              wholesaleStock:
                activeRole === 'wholesale'
                  ? Math.max(0, p.inventory.wholesaleStock - item.quantity)
                  : p.inventory.wholesaleStock
            }
          };
        }
        return p;
      })
    );

    if (activeRole === 'retail' && user.retailProfile) {
      setUser(prev => ({
        ...prev,
        retailProfile: prev.retailProfile
          ? {
              ...prev.retailProfile,
              points: Math.max(0, prev.retailProfile.points - pointsRedeemed + pointsEarned)
            }
          : undefined
      }));
    } else if (activeRole === 'wholesale' && user.wholesaleProfile && paymentMethod === 'WholesaleCredit5050') {
      setUser(prev => ({
        ...prev,
        wholesaleProfile: prev.wholesaleProfile
          ? {
              ...prev.wholesaleProfile,
              creditUsed: prev.wholesaleProfile.creditUsed + Math.round(totalAmount / 2)
            }
          : undefined
      }));
    }

    clearCart();

    addNotification(
      '🎉 नया ऑर्डर नंबर ' + orderId + ' दर्ज हुआ!',
      `कुल राशि ${formatPrice(totalAmount)}। डिलीवरी 3-4 दिनों में सम्भावित है।`,
      'order',
      `/orders`
    );

    showToast(`🎉 बधाई हो! ऑर्डर ${orderId} सफलतापूर्वक दिया गया।`, 'success');
    return { success: true, order: newOrder, message: 'Order placed successfully!' };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline.map(step => {
            if (step.status === status) {
              return {
                ...step,
                completed: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
            }
            return step;
          });
          return { ...ord, orderStatus: status, timeline: updatedTimeline };
        }
        return ord;
      })
    );
    showToast(`ऑर्डर ${orderId} की स्थिति अपडेट की गई: ${status}`, 'info');
  };

  const addNotification = (
    title: string,
    body: string,
    category: PushNotification['category'],
    link?: string
  ) => {
    const newNotif: PushNotification = {
      id: `notif_${Date.now()}`,
      title,
      body,
      timestamp: 'अभी-अभी (Just now)',
      read: false,
      category,
      link
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const registerRetailUser = (data: Partial<RetailProfile>) => {
    setUser(prev => ({
      ...prev,
      role: 'retail',
      isLoggedIn: true,
      registrationComplete: true,
      retailProfile: {
        name: data.name || 'ग्राहक (Customer)',
        phone: data.phone || prev.phone,
        email: data.email || prev.email,
        state: data.state || 'Uttar Pradesh',
        city: data.city || 'Hardoi',
        pincode: data.pincode || '241001',
        address: data.address || '',
        points: 500,
        tier: 'Bronze',
        referralCode: `RAJ${Math.floor(100 + Math.random() * 900)}`,
        referralsCount: 0
      }
    }));
    setActiveRoleState('retail');
    showToast('🎉 आपका रिटेल खाता बन गया है! 500 वेलकम पॉइंट्स मिले।', 'success');
  };

  const registerWholesaleUser = (data: Partial<WholesaleProfile>) => {
    const newWholesale: WholesaleProfile = {
      name: data.name || 'होलसेलर (Dealer)',
      phone: data.phone || user.phone,
      email: data.email || user.email,
      shopName: data.shopName || 'न्यू साड़ी सेंटर',
      shopType: data.shopType || 'physical',
      businessPan: data.businessPan || 'ABCDE1234F',
      aadhaar: data.aadhaar || '987654321012',
      gstn: data.gstn || '',
      udyam: data.udyam || '',
      state: data.state || 'Uttar Pradesh',
      city: data.city || 'Hardoi',
      pincode: data.pincode || '241001',
      shopAddress: data.shopAddress || 'मेन मार्केट, हरदोई',
      accountHolder: data.accountHolder || '',
      accountNumber: data.accountNumber || '',
      ifsc: data.ifsc || '',
      status: 'pending',
      creditLimit: 50000,
      creditUsed: 0,
      documentsUploaded: true,
      assignedManager: {
        name: 'अमित कुमार (Amit Kumar)',
        phone: '+919876500000'
      }
    };

    setUser(prev => ({
      ...prev,
      role: 'wholesale',
      isLoggedIn: true,
      registrationComplete: true,
      wholesaleProfile: newWholesale
    }));
    setActiveRoleState('wholesale');
    showToast('📜 आपका थोक आवेदन जमा कर लिया गया है। सत्यापन 24-48 घंटों में पूर्ण होगा।', 'info');
  };

  const logoutUser = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: false,
      registrationComplete: false
    }));
    showToast('आप सफलतापूर्वक लॉगआउट हो गए हैं।', 'info');
  };

  const restockProduct = (productId: string, retailQty: number, wholesaleQty: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            inventory: {
              ...p.inventory,
              retailStock: p.inventory.retailStock + retailQty,
              wholesaleStock: p.inventory.wholesaleStock + wholesaleQty
            }
          };
        }
        return p;
      })
    );
    const prod = products.find(p => p.id === productId);
    const name = prod ? prod.name[language] || prod.name.en : 'उत्पाद';
    addNotification(
      '📦 नया स्टॉक उपलब्ध - ' + name,
      `इस उत्पाद में ${retailQty + wholesaleQty} नए पीस जोड़े गए हैं। तुरंत ऑर्डर करें!`,
      'stock'
    );
    showToast(`स्टॉक सफलतापूर्वक रिफिल किया गया (${retailQty + wholesaleQty} पीस)`, 'success');
  };

  const updateWholesaleStatus = (status: WholesaleProfile['status'], creditLimit?: number) => {
    setUser(prev => ({
      ...prev,
      wholesaleProfile: prev.wholesaleProfile
        ? {
            ...prev.wholesaleProfile,
            status,
            creditLimit: creditLimit || prev.wholesaleProfile.creditLimit
          }
        : undefined
    }));
    showToast(`होलसेल खाता स्थिति: ${status.toUpperCase()}`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeRole,
        setActiveRole,
        language,
        setLanguage,
        currency,
        setCurrency,
        products,
        setProducts,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        notifications,
        addNotification,
        markNotificationsAsRead,
        registerRetailUser,
        registerWholesaleUser,
        logoutUser,
        formatPrice,
        t,
        toastMessage,
        showToast,
        isOnline,
        restockProduct,
        updateWholesaleStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
