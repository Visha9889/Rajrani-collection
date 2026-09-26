import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_saree_001',
    sku: 'RC-SAR-101',
    name: {
      hi: 'शाही बनारसी रेशम साड़ी - ट्रेडिशनल रेड एंड गोल्ड',
      en: 'Royal Banarasi Pure Silk Saree - Traditional Red & Gold',
      ta: 'ராயல் பனாரசி பட்டு சேலை - சிவப்பு & தங்கம்',
      te: 'రాయల్ బనారసి పట్టు చీర - ఎరుపు & బంగారం',
      kn: 'ರಾಯಲ್ ಬನಾರಸಿ ರೇಷ್ಮೆ ಸೀರೆ - ಕೆಂಪು & ಚಿನ್ನ',
      ml: 'റോയൽ ബനാറസി പട്ടു സാരി - ചുവപ്പ് & സ്വർണ്ണം',
      bn: 'রয়্যাল বেনারসি সিল্ক শাড়ি - লাল ও সোনালী',
      mr: 'शाही बनारसी रेशीम साडी - लाल आणि सोनेरी',
      gu: 'રોયલ બનારસી રેશમ સાડી - લાલ અને ગોલ્ડ',
      pa: 'ਸ਼ਾਹੀ ਬਨਾਰਸੀ ਰੇਸ਼ਮ ਸਾੜੀ - ਲਾਲ ਅਤੇ ਸੁਨਹਿਰੀ'
    },
    description: {
      hi: 'हैंडवूवेन जरी वर्क के साथ शुद्ध रेशमी बनारसी साड़ी। शादी-विवाह और विशेष अवसरों के लिए राजरानी कलेक्शन की विशेष पेशकश।',
      en: 'Authentic pure silk Banarasi saree with handwoven zari motifs. Rajrani Collection exclusive signature weave crafted for weddings and festive occasions.',
      ta: 'பாரம்பரிய ஜரி வேலைப்பாடுகளுடன் கூடிய அசல் தூய பட்டு பனாரசி சேலை.',
      te: 'హ్యాండ్‌వూవెన్ జరీ వర్క్‌తో స్వచ్ఛమైన పట్టు బనారసి చీర.',
      kn: 'ಅಸಲಿ ಶುದ್ಧ ರೇಷ್ಮೆ ಬನಾರಸಿ ಸೀರೆ ಜರಿ ವರ್ಕ್‌ನೊಂದಿಗೆ.',
      ml: 'ശുദ്ധമായ പട്ടു ബനാറസി സാരി.',
      bn: 'খাঁটি সিল্ক বেনারসি শাড়ি জরি কাজের সাথে।',
      mr: 'हँडविणकाम जरी वर्कसह अस्सल शुद्ध रेशमी बनारसी साडी.',
      gu: 'હેન્ડવોવન જરી વર્ક સાથે શુદ્ધ રેશમ બનારસી સાડી.',
      pa: 'ਹੈਂਡਵੂਵਨ ਜਰੀ ਵਰਕ ਨਾਲ ਖਾਸ ਬਨਾਰਸੀ ਰੇਸ਼ਮ ਸਾੜੀ।'
    },
    category: 'saree',
    subCategory: 'Banarasi Silk',
    fabric: 'Pure Silk / Katan',
    color: 'Crimson Red / Gold Zari',
    length: '6.3 meters with blouse piece',
    weight: '680g',
    careInstructions: 'Dry Clean Only',
    images: {
      primary: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
      ],
      angles360: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
      ]
    },
    pricing: {
      retail: {
        mrp: 5500,
        sellingPrice: 3800,
        discountPercent: 31,
        pointsEarned: 190
      },
      wholesale: {
        moq: 5,
        tiers: [
          { qtyRange: '5 - 10 pcs', minQty: 5, maxQty: 10, pricePerUnit: 2800, discountPercent: 49 },
          { qtyRange: '11 - 25 pcs', minQty: 11, maxQty: 25, pricePerUnit: 2500, discountPercent: 55 },
          { qtyRange: '26 - 50 pcs', minQty: 26, maxQty: 50, pricePerUnit: 2200, discountPercent: 60 },
          { qtyRange: '50+ pcs', minQty: 51, pricePerUnit: 1950, discountPercent: 65 }
        ]
      }
    },
    inventory: {
      retailStock: 42,
      wholesaleStock: 250,
      reserved: 12
    },
    ratings: {
      average: 4.8,
      totalReviews: 128
    },
    reviews: [
      {
        id: 'rev_1',
        userName: 'Sunita Verma',
        rating: 5,
        comment: 'कपड़े की क्वालिटी बहुत ही बेहतरीन है। बनारसी वर्क बेहद शाइनी और असली सिल्क जैसा लगता है।',
        date: '2026-08-14',
        verifiedPurchase: true,
        city: 'Hardoi, UP'
      },
      {
        id: 'rev_2',
        userName: 'Pooja Agarwal (Pooja Sarees)',
        rating: 5,
        comment: 'Ordered 25 pieces for wholesale in Lucknow shop. Super fast shipping and massive profit margin!',
        date: '2026-09-02',
        verifiedPurchase: true,
        userRole: 'wholesale',
        city: 'Lucknow, UP'
      }
    ],
    tags: ['banarasi', 'silk', 'red', 'wedding', 'saree', 'trending'],
    status: 'featured',
    createdAt: '2026-07-10'
  },
  {
    id: 'prod_suit_001',
    sku: 'RC-SUT-201',
    name: {
      hi: 'अनारकली एम्ब्रॉयडर्ड सूट सेट - रॉयल ब्लू विद बनारसी दुपट्टा',
      en: 'Anarkali Heavy Embroidered Suit Set - Royal Blue with Banarasi Dupatta',
      ta: 'அனார்கலி வேலைப்பாடுகளுடன் கூடிய சுடிதார் செட்',
      te: 'అనార్కలీ భారీ వర్క్ సూట్ సెట్',
      kn: 'ಅನಾರ್ಕಲಿ ಎಂಬ್ರಾಯ್ಡರಿ ಸೂಟ್ ಸೆಟ್',
      ml: 'അനാർക്കലി എംബ്രോയ്ഡറി സ്യൂട്ട് സെറ്റ്',
      bn: 'অনারকুলি এমব্রয়ডারি করা সুট সেট',
      mr: 'अनारकली भरतकाम केलेला सूट सेट',
      gu: 'અનારકલી એમ્બ્રોઇડરી સૂટ સેટ',
      pa: 'ਅਨਾਰਕਲੀ ਕਢਾਈ ਵਾਲਾ ਸੂਟ ਸੈੱਟ'
    },
    description: {
      hi: '3-पीस अनारकली सूट, पैंट और हैवी ज़री बॉर्डर बनारसी दुपट्टा। पार्टी और त्यौहारों के लिए आदर्श।',
      en: 'Designer 3-piece Anarkali suit crafted from Georgette with heavy thread-work, matched with organza pants and rich Banarasi silk dupatta.',
      ta: 'துப்பட்டாவுடன் கூடிய 3-பீஸ் அனார்கலி சுடிதார்.',
      te: '3-పీస్ అనార్కలీ సూట్, ఫ్యాన్సీ దుపట్టాతో.',
      kn: '3-ಪೀಸ್ ಅನಾರ್ಕಲಿ ಸೂಟ್ ಸೆಟ್ ದುಪಟ್ಟಾದೊಂದಿಗೆ.',
      ml: '3-പീസ് അനാർക്കലി സ്യൂട്ട് സെറ്റ്.',
      bn: '৩-পিস অনারকলি সুট ও ভারী দুপাট্টা।',
      mr: '३-पीस अनारकली सूट आणि बनारसी दुपट्टा.',
      gu: '૩-પીસ અનારકલી સૂટ અને બનારસી દુપટ્ટો.',
      pa: '3-ਪੀਸ ਅਨਾਰਕਲੀ ਸੂਟ ਅਤੇ ਬਨਾਰਸੀ ਦੁਪੱਟਾ।'
    },
    category: 'suit',
    subCategory: 'Anarkali 3-Piece',
    fabric: 'Georgette & Chanderi Silk',
    color: 'Royal Sapphire Blue',
    length: 'Top: 48 inch, Pants: 38 inch',
    weight: '550g',
    careInstructions: 'Dry Clean or Gentle Hand Wash',
    images: {
      primary: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    pricing: {
      retail: {
        mrp: 4200,
        sellingPrice: 2850,
        discountPercent: 32,
        pointsEarned: 142
      },
      wholesale: {
        moq: 6,
        tiers: [
          { qtyRange: '6 - 12 pcs', minQty: 6, maxQty: 12, pricePerUnit: 1950, discountPercent: 53 },
          { qtyRange: '13 - 30 pcs', minQty: 13, maxQty: 30, pricePerUnit: 1750, discountPercent: 58 },
          { qtyRange: '31 - 60 pcs', minQty: 31, maxQty: 60, pricePerUnit: 1550, discountPercent: 63 },
          { qtyRange: '60+ pcs', minQty: 61, pricePerUnit: 1350, discountPercent: 67 }
        ]
      }
    },
    inventory: {
      retailStock: 28,
      wholesaleStock: 180,
      reserved: 8
    },
    ratings: {
      average: 4.7,
      totalReviews: 94
    },
    reviews: [
      {
        id: 'rev_3',
        userName: 'Meenakshi Sundaram',
        rating: 5,
        comment: 'Very elegant suit and embroidery looks premium in royal blue!',
        date: '2026-08-28',
        verifiedPurchase: true,
        city: 'Chennai, TN'
      }
    ],
    tags: ['anarkali', 'suit', 'blue', 'embroidered', 'festive'],
    status: 'featured',
    createdAt: '2026-07-20'
  },
  {
    id: 'prod_lehenga_001',
    sku: 'RC-LHG-301',
    name: {
      hi: 'दुल्हन वेलवेट लहंगा चोली - मरून गोल्ड ज़री डिज़ाइन',
      en: 'Bridal Micro-Velvet Lehenga Choli - Maroon with Heavy Gold Zari Work',
      ta: 'மணப்பெண் வெல்வெட் லெஹங்கா சோளி - மரூன் தங்கம்',
      te: 'పెళ్లికూతురు వెల్వెట్ లెహంగా చోలీ - మెరూన్ గోల్డ్',
      kn: 'ವಧುವಿನ ವೆಲ್ವೆಟ್ ಲೆಹಂಗಾ ಚೋಲಿ - ಮರೂನ್ ಗೋಲ್ಡ್',
      ml: 'കല്യാണ വെൽവെറ്റ് ലെഹംഗ ചോളി - മരൂൺ ഗോൾഡ്',
      bn: 'ব্রাইডাল ভেলভেট লেহেঙ্গা চোলি - মারুন গোল্ড',
      mr: 'वधूचा वेलव्हेट लेहंगा चोळी - मरून आणि गोल्ड',
      gu: 'બ્રાઇડલ વેલ્વેટ લેહંગા ચોલી - મરૂન ગોલ્ડ',
      pa: 'ਬ੍ਰਾਈਡਲ ਵੈਲਵੇਟ ਲਹਿੰਗਾ ਚੋਲੀ - ਮਰੂਨ ਗੋਲਡ'
    },
    description: {
      hi: 'भारी घेरा माइक्रो वेलवेट लहंगा, एम्ब्रॉयडर्ड चोली और 2 नेट दुपट्टे। शादियों के लिए राजरानी स्पेशल मास्टरपीस।',
      en: 'Grand 4.5m flare velvet lehenga with metallic sequin embroidery, unstitched blouse piece, and 2 designer bridal organza & net dupattas.',
      ta: 'பிரமாண்டமான மணப்பெண் வெல்வெட் லெஹங்கா 2 துப்பட்டாக்களுடன்.',
      te: 'ఘనమైన పెళ్లికూతురు వెల్వెట్ లెహంగా 2 దుపట్టాలతో.',
      kn: 'ಭವ್ಯವಾದ ವಧುವಿನ ವೆಲ್ವೆಟ್ ಲೆಹಂಗಾ 2 ದುಪಟ್ಟಾಗಳೊಂದಿಗೆ.',
      ml: 'ബ്രൈഡൽ വെൽവെറ്റ് ലെഹംഗ.',
      bn: 'মারুন ভেলভেট ব্রাইডাল লেহেঙ্গা দুটি দুপাট্টা সহ।',
      mr: '२ दुपट्ट्यांसह भव्य वधूचा वेलव्हेट लेहंगा.',
      gu: '૨ દુપટ્ટા સાથે ભવ્ય બ્રાઇડલ વેલ્વેટ લેહંગા.',
      pa: '2 ਦੁਪੱਟਿਆਂ ਨਾਲ ਸ਼ਾਨਦਾਰ ਬ੍ਰਾਈਡਲ ਲਹਿੰਗਾ।'
    },
    category: 'lehenga',
    subCategory: 'Bridal Velvet',
    fabric: 'Micro-Velvet & Heavy Net',
    color: 'Deep Maroon Red',
    length: 'Skirt Flare: 4.5m, Blouse: 1m fabric',
    weight: '1850g',
    careInstructions: 'Dry Clean Only - Preserve in Garment Bag',
    images: {
      primary: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    pricing: {
      retail: {
        mrp: 18500,
        sellingPrice: 12900,
        discountPercent: 30,
        pointsEarned: 645
      },
      wholesale: {
        moq: 3,
        tiers: [
          { qtyRange: '3 - 5 pcs', minQty: 3, maxQty: 5, pricePerUnit: 8900, discountPercent: 52 },
          { qtyRange: '6 - 15 pcs', minQty: 6, maxQty: 15, pricePerUnit: 7900, discountPercent: 57 },
          { qtyRange: '16 - 30 pcs', minQty: 16, maxQty: 30, pricePerUnit: 6900, discountPercent: 62 },
          { qtyRange: '30+ pcs', minQty: 31, pricePerUnit: 5900, discountPercent: 68 }
        ]
      }
    },
    inventory: {
      retailStock: 15,
      wholesaleStock: 60,
      reserved: 3
    },
    ratings: {
      average: 4.9,
      totalReviews: 62
    },
    reviews: [
      {
        id: 'rev_4',
        userName: 'Kavita Tripathi',
        rating: 5,
        comment: 'मेरी शादी के लिए यही लहंगा खरीदा था, सभी मेहमानों ने बहुत तारीफ़ की! राजरानी कलेक्शन का बहुत धन्यवाद!',
        date: '2026-09-01',
        verifiedPurchase: true,
        city: 'Kanpur, UP'
      }
    ],
    tags: ['lehenga', 'velvet', 'bridal', 'maroon', 'wedding'],
    status: 'featured',
    createdAt: '2026-06-15'
  },
  {
    id: 'prod_saree_002',
    sku: 'RC-SAR-102',
    name: {
      hi: 'कांचीपुरम सिल्क साड़ी - मस्टर्ड येलो एंड गोटा वर्क',
      en: 'Kanjeevaram Silk Saree - Mustard Yellow & Temple Border Zari',
      ta: 'காஞ்சிபுரம் பட்டு சேலை - மஞ்சள் & கோவில் பார்டர்',
      te: 'కాంచీపురం పట్టు చీర - పసుపు & దేవాలయ బోర్డర్',
      kn: 'ಕಾಂಚೀಪುರಂ ರೇಷ್ಮೆ ಸೀರೆ - ಹಳದಿ & ದೇವಸ್ಥಾನ ಬಾರ್ಡರ್',
      ml: 'കാഞ്ചീപുരം പട്ടു സാരി - മഞ്ഞ',
      bn: 'কাঞ্জিভরম সিল্ক শাড়ি - সরষে হলুদ',
      mr: 'कांजिवरम रेशीम साडी - पिवळा आणि टेम्पल बॉर्डर',
      gu: 'કાંજીવરમ રેશમ સાડી - પીળો અને ટેમ્પલ બોર્ડર',
      pa: 'ਕਾਂਜੀਵਰਮ ਰੇਸ਼ਮ ਸਾੜੀ - ਸਰ੍ਹੋਂ ਪੀਲਾ'
    },
    description: {
      hi: 'पारंपरिक दक्षिण भारतीय कांचीपुरम बॉर्डर साड़ी, पूजा और हल्दी सेरेमनी के लिए सबसे पसंदीदा।',
      en: 'South-Indian inspired Kanjeevaram weave featuring auspicious temple zari border and lustrous gold finish.',
      ta: 'பாரம்பரிய தென்னிந்திய காஞ்சிபுரம் பட்டு சேலை.',
      te: 'పవిత్రమైన కాంచీపురం పట్టు చీర పూజలు మరియు పండుగలకు.',
      kn: 'ಪೂಜೆ ಮತ್ತು ಹಬ್ಬಗಳಿಗೆ ಸೂಕ್ತವಾದ ಕಾಂಚೀಪುರಂ ಸೀರೆ.',
      ml: 'പൂജകൾക്ക് അനുയോജ്യമായ സാരി.',
      bn: 'হলুদ ও পূজা অনুষ্ঠানের জন্য কাঞ্জিভরম সিল্ক।',
      mr: 'पूजा आणि हळदी समारंभासाठी कांजिवरम साडी.',
      gu: 'પૂજા અને હળદર માટે કાંજીવરમ રેશમ સાડી.',
      pa: 'ਪੂਜਾ ਅਤੇ ਹਲਦੀ ਲਈ ਖਾਸ ਸਾੜੀ।'
    },
    category: 'saree',
    subCategory: 'Kanjeevaram Silk',
    fabric: 'Soft Art Silk / Jacquard',
    color: 'Mustard Yellow & Maroon Border',
    length: '6.2 meters',
    weight: '520g',
    careInstructions: 'Gentle Hand Wash or Dry Clean',
    images: {
      primary: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      ]
    },
    pricing: {
      retail: {
        mrp: 3800,
        sellingPrice: 2200,
        discountPercent: 42,
        pointsEarned: 110
      },
      wholesale: {
        moq: 5,
        tiers: [
          { qtyRange: '5 - 10 pcs', minQty: 5, maxQty: 10, pricePerUnit: 1450, discountPercent: 61 },
          { qtyRange: '11 - 25 pcs', minQty: 11, maxQty: 25, pricePerUnit: 1300, discountPercent: 65 },
          { qtyRange: '26 - 50 pcs', minQty: 26, maxQty: 50, pricePerUnit: 1150, discountPercent: 69 },
          { qtyRange: '50+ pcs', minQty: 51, pricePerUnit: 980, discountPercent: 74 }
        ]
      }
    },
    inventory: {
      retailStock: 50,
      wholesaleStock: 300,
      reserved: 10
    },
    ratings: {
      average: 4.6,
      totalReviews: 89
    },
    reviews: [],
    tags: ['kanjeevaram', 'saree', 'yellow', 'haldi', 'silk'],
    status: 'active',
    createdAt: '2026-08-01'
  },
  {
    id: 'prod_suit_002',
    sku: 'RC-SUT-202',
    name: {
      hi: 'पंजाबी पटियाला सूट अनस्टिच्ड - प्रिंटेड कॉटन विद गोटा पट्टी',
      en: 'Punjabi Patiala Suit Unstitched Dress Material - Premium Cotton',
      ta: 'பஞ்சாபி பாட்டியாலா சுடிதார் ஆடை பொருள்',
      te: 'పంజాబీ పాటియాలా సూట్ క్లాత్ - కాటన్',
      kn: 'ಪಂಜಾಬಿ ಪಟಿಯಾಲಾ ಸೂಟ್ ಬಟ್ಟೆ',
      ml: 'പഞ്ചാബി പാട്യാല സ്യൂട്ട് മെറ്റീരിയൽ',
      bn: 'পাঞ্জাবি পাতিয়ালা সুট ফেব্রিক',
      mr: 'पंजाबी पटियाला सूट अनस्टिच्ड कॉटन',
      gu: 'પંજાબી પટિયાલા સૂટ અનસ્ટિચ્ડ કપાસ',
      pa: 'ਪੰਜਾਬੀ ਪਟਿਆਲਾ ਸੂਟ ਅਨਸਟਿਚਡ - ਪਿਓਰ ਕਾਟਨ'
    },
    description: {
      hi: 'शुद्ध सूती कपड़ा (3.5 मीटर कुर्ता + 3 मीटर सलवार + फुल्‍कारी दुपट्टा)। रोज़ाना पहनने और बुटीक टेलरिंग हेतु।',
      en: '100% breathable pure cotton dress material set with traditional Phulkari embroidery heavy dupatta.',
      ta: 'சுத்தமான பருத்தி பஞ்சாபி சுடிதார் பொருள்.',
      te: 'స్వచ్ఛమైన కాటన్ పంజాబీ సూట్ మెటీరియల్.',
      kn: 'ಶುದ್ಧ ಹತ್ತಿ ಪಂಜಾಬಿ ಸೂಟ್ ಬಟ್ಟೆ.',
      ml: 'ശുദ്ധമായ കോട്ടൺ സ്യൂട്ട് മെറ്റീരിയൽ.',
      bn: '১০০% সুতি পাতিয়ালা সুট পিস।',
      mr: '१००% शुद्ध सुती पटियाला सूट कापड.',
      gu: '૧૦૦% શુદ્ધ કપાસ પટિયાલા સૂટ કાપડ.',
      pa: '100% ਪਿਓਰ ਕਾਟਨ ਪਟਿਆਲਾ ਸੂਟ ਕੱਪੜਾ।'
    },
    category: 'suit',
    subCategory: 'Punjabi Patiala',
    fabric: '100% Pure Cambric Cotton',
    color: 'Bright Magenta & Green Phulkari',
    length: 'Top 2.5m, Bottom 3m, Dupatta 2.25m',
    weight: '480g',
    careInstructions: 'Normal Machine Wash / Color Safe',
    images: {
      primary: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      ]
    },
    pricing: {
      retail: {
        mrp: 2200,
        sellingPrice: 1350,
        discountPercent: 38,
        pointsEarned: 67
      },
      wholesale: {
        moq: 10,
        tiers: [
          { qtyRange: '10 - 20 pcs', minQty: 10, maxQty: 20, pricePerUnit: 850, discountPercent: 61 },
          { qtyRange: '21 - 50 pcs', minQty: 21, maxQty: 50, pricePerUnit: 750, discountPercent: 65 },
          { qtyRange: '51 - 100 pcs', minQty: 51, maxQty: 100, pricePerUnit: 680, discountPercent: 69 },
          { qtyRange: '100+ pcs', minQty: 101, pricePerUnit: 590, discountPercent: 73 }
        ]
      }
    },
    inventory: {
      retailStock: 80,
      wholesaleStock: 500,
      reserved: 20
    },
    ratings: {
      average: 4.8,
      totalReviews: 112
    },
    reviews: [],
    tags: ['patiala', 'cotton', 'suit', 'phulkari', 'dailywear'],
    status: 'active',
    createdAt: '2026-08-05'
  },
  {
    id: 'prod_combo_001',
    sku: 'RC-CMB-401',
    name: {
      hi: 'राजशाही ब्राइडल कॉम्बो सेट - बनारसी साड़ी + मैचिंग पेटीकोट + रेडीमेड ब्लाउज',
      en: 'Rajshahi Bridal 3-in-1 Combo - Silk Saree + Satin Petticoat + Designer Blouse',
      ta: '3-இன்-1 பிரைடல் காம்போ - சேலை + பாவாடை + பிளவுஸ்',
      te: '3-ఇన్-1 బ్రైడల్ కాంబో - చీర + లంగా + బ్లౌజ్',
      kn: '3-ಇನ್-1 ಬ್ರೈಡಲ್ ಕಾಂಬೊ - ಸೀರೆ + ಲಂಗ + ಬ್ಲೌಸ್',
      ml: '3-ഇൻ-1 ബ്രൈഡൽ കോംബോ',
      bn: '৩-ইন-১ ব্রাইডাল কম্বো সেট',
      mr: 'शाही ब्राइडल ३-इन-१ कॉम्बो',
      gu: 'બ્રાઇડલ ૩-ઇન-૧ કોમ્બો સેટ',
      pa: 'ਬ੍ਰਾਈਡਲ 3-ਇਨ-1 ਕੌਮਬੋ ਸੈੱਟ'
    },
    description: {
      hi: 'सम्पूर्ण साड़ी कॉम्बो सेट जिसमें बनारसी सिल्क साड़ी, स्टिच्ड ब्लाउज (साइज़ 38-42 तक एड्जस्टेबल) और साटन पेटीकोट शामिल है।',
      en: 'All-inclusive wedding ensemble kit with Banarasi saree, pre-stitched stretchable designer blouse, and color-matched satin petticoat.',
      ta: 'முழுமையான சேலை செட் பிளவுஸ் மற்றும் பாவாடையுடன்.',
      te: 'పూర్తి చీర సెట్ బ్లౌజ్ మరియు లంగాతో.',
      kn: 'ಸಂಪೂರ್ಣ ಸೀರೆ ಸೆಟ್.',
      ml: 'സമ്പൂർണ്ണ സാരി കോംബോ.',
      bn: 'সম্পূর্ণ ব্রাইডাল শাড়ি সেট।',
      mr: 'पूर्ण साडी कॉम्बो ब्लाउज आणि पेटीकोटसह.',
      gu: 'સંપૂર્ણ સાડી કોમ્બો સેટ.',
      pa: 'ਪੂਰਾ ਸਾੜੀ ਕੌਮਬੋ ਸੈੱਟ।'
    },
    category: 'combo',
    subCategory: 'Saree Combo',
    fabric: 'Banarasi Silk & Satin',
    color: 'Emerald Green & Gold',
    length: 'Saree 6.3m, Blouse Size 38-42',
    weight: '900g',
    careInstructions: 'Dry Clean Only',
    images: {
      primary: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    pricing: {
      retail: {
        mrp: 6800,
        sellingPrice: 4200,
        discountPercent: 38,
        pointsEarned: 210
      },
      wholesale: {
        moq: 4,
        tiers: [
          { qtyRange: '4 - 8 pcs', minQty: 4, maxQty: 8, pricePerUnit: 2950, discountPercent: 56 },
          { qtyRange: '9 - 20 pcs', minQty: 9, maxQty: 20, pricePerUnit: 2650, discountPercent: 61 },
          { qtyRange: '21 - 40 pcs', minQty: 21, maxQty: 40, pricePerUnit: 2350, discountPercent: 65 },
          { qtyRange: '40+ pcs', minQty: 41, pricePerUnit: 2100, discountPercent: 69 }
        ]
      }
    },
    inventory: {
      retailStock: 22,
      wholesaleStock: 120,
      reserved: 5
    },
    ratings: {
      average: 4.9,
      totalReviews: 43
    },
    reviews: [],
    tags: ['combo', 'bridal', 'saree', 'blouse', 'green'],
    status: 'featured',
    createdAt: '2026-08-10'
  }
];
