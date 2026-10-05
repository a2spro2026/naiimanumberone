export type DishSize = 'small' | 'medium' | 'large'

export const dishSizes: { value: DishSize; fr: string; ar: string }[] = [
  { value: 'small', fr: 'Petit', ar: 'صغير' },
  { value: 'medium', fr: 'Moyen', ar: 'متوسط' },
  { value: 'large', fr: 'Grand', ar: 'كبير' },
]

export type DishMeal = 'breakfast' | 'lunch' | 'dinner'

export const dishMeals: { value: DishMeal; fr: string; ar: string }[] = [
  { value: 'breakfast', fr: 'Petit-déjeuner', ar: 'الفطور' },
  { value: 'lunch', fr: 'Déjeuner', ar: 'الغداء' },
  { value: 'dinner', fr: 'Dîner', ar: 'العشاء' },
]

export type Dish = {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  prices: Record<DishSize, number>
  rating: number
  prepTime: string | null
  popular?: boolean
  meals: DishMeal[]
  image: string
}

export type Category = {
  id: string
  name: string
  nameAr: string
  image: string
}

export type EventCard = {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  image: string
  icon: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  roleAr: string
  photo: string
  rating: number
  comment: string
  commentAr: string
}

export const categories: Category[] = [
  { id: 'tajines', name: 'Tajines', nameAr: 'طواجن', image: '/images/dish-tagine.webp' },
  { id: 'couscous', name: 'Couscous', nameAr: 'كسكس', image: '/images/dish-couscous.webp' },
  { id: 'pastilla', name: 'Pastilla', nameAr: 'بسطيلة', image: '/images/dish-bastilla.webp' },
  { id: 'harira', name: 'Harira', nameAr: 'حريرة', image: '/images/dish-harira.webp' },
  { id: 'grillades', name: 'Grillades', nameAr: 'مشويات', image: '/images/dish-tajine-pruneaux.webp' },
  { id: 'rfissa', name: 'Rfissa', nameAr: 'رفيسة', image: '/images/dish-couscous-royal.webp' },
  { id: 'desserts', name: 'Desserts', nameAr: 'حلويات', image: '/images/tea-banner.webp' },
  { id: 'the', name: 'Thé Marocain', nameAr: 'أتاي مغربي', image: '/images/tea-banner.webp' },
  { id: 'jus', name: 'Jus Naturels', nameAr: 'عصائر طبيعية', image: '/images/dish-harira.webp' },
]

export const events: EventCard[] = [
  {
    id: 'mariage',
    title: 'Mariage',
    titleAr: 'العرس',
    description: 'Menus traiteur sur-mesure pour un banquet digne de votre plus beau jour.',
    descriptionAr: 'قوائم طعام حسب الطلب لمأدبة تليق بأجمل يوم في حياتكم.',
    image: '/images/hero-ceremony.webp',
    icon: 'Heart',
  },
  {
    id: 'fiancailles',
    title: 'Fiançailles',
    titleAr: 'الخطوبة',
    description: 'Buffets raffinés et présentation élégante pour célébrer votre engagement.',
    descriptionAr: 'بوفيهات راقية وتقديم أنيق للاحتفال بخطوبتكم.',
    image: '/images/hero-ceremony.webp',
    icon: 'Gem',
  },
  {
    id: 'anniversaire',
    title: 'Anniversaire',
    titleAr: 'عيد الميلاد',
    description: 'Des saveurs authentiques pour une fête mémorable en famille ou entre amis.',
    descriptionAr: 'نكهات أصيلة لحفل لا يُنسى مع العائلة والأصدقاء.',
    image: '/images/dish-couscous-royal.webp',
    icon: 'Cake',
  },
  {
    id: 'bapteme',
    title: 'Baptême',
    titleAr: 'العقيقة',
    description: 'Cuisine traditionnelle généreuse pour accueillir vos proches.',
    descriptionAr: 'طبخ تقليدي سخي لاستقبال أحبابكم.',
    image: '/images/dish-tajine-citron.webp',
    icon: 'Baby',
  },
  {
    id: 'entreprise',
    title: 'Entreprise',
    titleAr: 'حفلات الشركات',
    description: 'Séminaires, cocktails et lunchs corporatifs avec service premium.',
    descriptionAr: 'ندوات وحفلات استقبال ووجبات غداء للشركات بخدمة راقية.',
    image: '/images/dish-bastilla.webp',
    icon: 'Building2',
  },
  {
    id: 'reception',
    title: 'Réception',
    titleAr: 'الحفلات الخاصة',
    description: 'Réceptions privées : décoration orientale et gastronomie marocaine.',
    descriptionAr: 'حفلات خاصة بديكور شرقي وطبخ مغربي فاخر.',
    image: '/images/hero-ceremony.webp',
    icon: 'Sparkles',
  },
  {
    id: 'traiteur-vip',
    title: 'Traiteur VIP',
    titleAr: 'خدمة VIP',
    description: 'Service sur-mesure à domicile, chefs et staffing pour une expérience exclusive.',
    descriptionAr: 'خدمة خاصة في المنزل مع طهاة وطاقم كامل لتجربة استثنائية.',
    image: '/images/hero-chef-tagine.webp',
    icon: 'Crown',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sara Benali',
    role: 'Mariage — Casablanca',
    roleAr: 'عرس — الدار البيضاء',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Un service impeccable. Nos 180 invités ont adoré chaque plat. NA3IMA a transformé notre réception.',
    commentAr: 'خدمة ممتازة. 180 ضيفاً أحبوا كل طبق. نعيمة جعلت حفلنا رائعاً.',
  },
  {
    id: '2',
    name: 'Youssef Amrani',
    role: 'Séminaire — Rabat',
    roleAr: 'ندوة — الرباط',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Professionnalisme rare. Livraison ponctuelle, présentation soignée, goût authentique.',
    commentAr: 'احترافية نادرة. توصيل في الوقت، تقديم أنيق ومذاق أصيل.',
  },
  {
    id: '3',
    name: 'Lina Kadiri',
    role: 'Anniversaire — Marrakech',
    roleAr: 'عيد ميلاد — مراكش',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Le tajine pruneaux et la pastilla étaient divins. On a déjà réservé pour notre prochaine fête.',
    commentAr: 'طاجين البرقوق والبسطيلة كانا رائعين. حجزنا من الآن لحفلتنا القادمة.',
  },
  {
    id: '4',
    name: 'Karim Tazi',
    role: 'Traiteur VIP — Tanger',
    roleAr: 'خدمة VIP — طنجة',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Cuisine d’exception, équipe discrète et élégante. Exactement ce qu’il fallait pour nos clients VIP.',
    commentAr: 'طبخ استثنائي وفريق راقٍ وأنيق. بالضبط ما كنا نحتاجه لضيوفنا المميزين.',
  },
]

export const galleryImages = [
  { id: 'g1', src: '/images/dish-tagine.webp', alt: 'Tajine traditionnel', altAr: 'طاجين تقليدي', span: 'tall' as const },
  { id: 'g2', src: '/images/dish-couscous-royal.webp', alt: 'Couscous royal', altAr: 'الكسكس الملكي', span: 'wide' as const },
  { id: 'g3', src: '/images/tea-banner.webp', alt: 'Thé marocain', altAr: 'أتاي مغربي', span: 'normal' as const },
  { id: 'g4', src: '/images/hero-ceremony.webp', alt: 'Mariage marocain', altAr: 'عرس مغربي', span: 'wide' as const },
  { id: 'g5', src: '/images/dish-bastilla.webp', alt: 'Buffet pastilla', altAr: 'بوفيه البسطيلة', span: 'normal' as const },
  { id: 'g6', src: '/images/dish-tajine-citron.webp', alt: 'Décoration orientale', altAr: 'ديكور شرقي', span: 'tall' as const },
  { id: 'g7', src: '/images/dish-harira.webp', alt: 'Harira', altAr: 'الحريرة', span: 'normal' as const },
  { id: 'g8', src: '/images/hero-chef-tagine.webp', alt: 'Chef NA3IMA', altAr: 'الشيف نعيمة', span: 'normal' as const },
]

export const whyUs = [
  { title: 'Cuisine authentique', titleAr: 'طبخ أصيل', description: 'Saveurs du Maroc préservées dans chaque assiette.', descriptionAr: 'نكهات المغرب محفوظة في كل طبق.', icon: 'Flame' },
  { title: 'Chefs expérimentés', titleAr: 'طهاة ذوو خبرة', description: 'Une équipe passionnée formée à la haute cuisine marocaine.', descriptionAr: 'فريق شغوف متمرس في فن الطبخ المغربي الراقي.', icon: 'Award' },
  { title: 'Produits frais', titleAr: 'منتجات طازجة', description: 'Chaîne du froid maîtrisée, produits de saison.', descriptionAr: 'سلسلة تبريد محكمة ومنتجات موسمية.', icon: 'ShoppingBasket' },
  { title: 'Livraison rapide', titleAr: 'توصيل سريع', description: 'Logistique dédiée aux événements et domiciles.', descriptionAr: 'توصيل مخصص للمناسبات وللمنازل.', icon: 'Timer' },
  { title: 'Hygiène', titleAr: 'النظافة', description: 'Protocols sanitaires stricts et cuisine aux normes.', descriptionAr: 'معايير صحية صارمة ومطبخ مطابق للمعايير.', icon: 'Sparkles' },
  { title: 'Service Premium', titleAr: 'خدمة راقية', description: 'Accompagnement personnalisé du menu au service.', descriptionAr: 'مرافقة شخصية من اختيار القائمة حتى التقديم.', icon: 'Gem' },
]

export const processSteps = [
  { title: 'Choisissez vos plats', titleAr: 'اختاروا أطباقكم', description: 'Parcourez notre carte et composez votre menu.', descriptionAr: 'تصفحوا قائمتنا وكوّنوا قائمة طعامكم.' },
  { title: 'Sélectionnez la date', titleAr: 'حددوا التاريخ', description: 'Indiquez le jour et l’heure de votre événement.', descriptionAr: 'أخبرونا بيوم وساعة مناسبتكم.' },
  { title: 'Confirmez la commande', titleAr: 'أكدوا الطلب', description: 'Validez votre panier et vos préférences.', descriptionAr: 'أكدوا سلتكم واختياراتكم.' },
  { title: 'Préparation', titleAr: 'التحضير', description: 'Nos chefs mijotent chaque plat avec soin.', descriptionAr: 'طهاتنا يحضّرون كل طبق بعناية.' },
  { title: 'Livraison', titleAr: 'التوصيل', description: 'Nous livrons à l’heure, prêts à servir.', descriptionAr: 'نوصل في الوقت، جاهز للتقديم.' },
  { title: 'Profitez de votre événement', titleAr: 'استمتعوا بمناسبتكم', description: 'Savourez un moment inoubliable.', descriptionAr: 'عيشوا لحظة لا تُنسى.' },
]

export const navLinks = [
  { href: '#accueil', label: 'Accueil', labelAr: 'الرئيسية' },
  { href: '#menu', label: 'Menu', labelAr: 'القائمة' },
  { href: '#evenements', label: 'Événements', labelAr: 'المناسبات' },
  { href: '#pourquoi', label: 'Pourquoi nous', labelAr: 'لماذا نحن' },
  { href: '#temoignages', label: 'Témoignages', labelAr: 'آراء الزبناء' },
  { href: '#contact', label: 'Contact', labelAr: 'اتصل بنا' },
]

export const CONTACT_PHONE = '+212600000000'
export const CONTACT_PHONE_DISPLAY = '+212 6 00 00 00 00'
export const WHATSAPP_URL = 'https://wa.me/212600000000'
