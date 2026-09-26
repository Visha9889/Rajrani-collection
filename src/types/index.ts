export type UserRole = 'retail' | 'wholesale';

export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'bn' | 'mr' | 'gu' | 'pa';

export type CurrencyCode = 'INR' | 'USD' | 'AED' | 'EUR' | 'GBP';

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export type WholesaleStatus = 'pending' | 'approved' | 'rejected';

export interface RetailProfile {
  name: string;
  phone: string;
  email?: string;
  state: string;
  city: string;
  pincode: string;
  address?: string;
  aadhaarLast4?: string;
  pan?: string;
  points: number;
  tier: LoyaltyTier;
  referralCode: string;
  referralsCount: number;
}

export interface WholesaleProfile {
  name: string;
  phone: string;
  email?: string;
  shopName: string;
  shopType: 'physical' | 'online' | 'both';
  businessPan: string; // Mandatory
  aadhaar: string;     // Mandatory
  gstn?: string;      // Optional
  udyam?: string;
  state: string;
  city: string;
  pincode: string;
  shopAddress: string;
  accountHolder?: string; // Optional
  accountNumber?: string; // Optional
  ifsc?: string;          // Optional
  status: WholesaleStatus;
  creditLimit: number;
  creditUsed: number;
  documentsUploaded: boolean;
  assignedManager?: {
    name: string;
    phone: string;
  };
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  role: UserRole;
  language: LanguageCode;
  currency: CurrencyCode;
  isLoggedIn: boolean;
  registrationComplete: boolean;
  retailProfile?: RetailProfile;
  wholesaleProfile?: WholesaleProfile;
}

export interface WholesaleTier {
  qtyRange: string;
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  discountPercent: number;
}

export interface ProductPricing {
  retail: {
    mrp: number;
    sellingPrice: number;
    discountPercent: number;
    pointsEarned: number;
  };
  wholesale: {
    moq: number;
    tiers: WholesaleTier[];
  };
}

export interface Product {
  id: string;
  sku: string;
  name: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  category: 'saree' | 'suit' | 'lehenga' | 'combo';
  subCategory?: string;
  fabric: string;
  color: string;
  length?: string;
  weight?: string;
  careInstructions?: string;
  images: {
    primary: string;
    gallery: string[];
    angles360?: string[];
  };
  pricing: ProductPricing;
  inventory: {
    retailStock: number;
    wholesaleStock: number;
    reserved: number;
  };
  ratings: {
    average: number;
    totalReviews: number;
  };
  reviews: ProductReview[];
  tags: string[];
  status: 'active' | 'out_of_stock' | 'featured';
  createdAt: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  userRole?: UserRole;
  city?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedRole: UserRole;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'Order Confirmed' | 'Packed' | 'In Transit' | 'Delivered' | 'Returned';

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  role: UserRole;
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  discountApplied: number;
  pointsEarned: number;
  pointsRedeemed: number;
  shippingFee: number;
  taxAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    shopName?: string;
    gstn?: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD' | 'WholesaleCredit5050' | 'BankTransfer';
  paymentStatus: 'Paid' | 'Pending' | 'Partially Paid';
  orderStatus: OrderStatus;
  timeline: OrderTimeline[];
  trackingNumber: string;
  courierName: string;
  invoiceNumber: string;
  createdAt: string;
  expectedDelivery: string;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  category: 'arrival' | 'promo' | 'order' | 'stock';
  link?: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  retailRevenue: number;
  wholesaleRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  pendingWholesaleRequests: number;
  topSellingCategories: { category: string; salesCount: number; revenue: number }[];
  monthlySalesTrends: { month: string; retail: number; wholesale: number }[];
}
