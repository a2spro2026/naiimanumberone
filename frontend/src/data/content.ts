export type Dish = {
  id: string
  name: string
  description: string
  price: number
  rating: number
  prepTime: string
  category: string
  popular?: boolean
  image: string
}

export type Category = {
  id: string
  name: string
  image: string
}

export type EventCard = {
  id: string
  title: string
  description: string
  image: string
  icon: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  photo: string
  rating: number
  comment: string
}

export const categories: Category[] = [
  { id: 'tajines', name: 'Tajines', image: '/images/dish-tagine.webp' },
  { id: 'couscous', name: 'Couscous', image: '/images/dish-couscous.webp' },
  { id: 'pastilla', name: 'Pastilla', image: '/images/dish-bastilla.webp' },
  { id: 'harira', name: 'Harira', image: '/images/dish-harira.webp' },
  { id: 'grillades', name: 'Grillades', image: '/images/dish-tajine-pruneaux.jpg' },
  { id: 'rfissa', name: 'Rfissa', image: '/images/dish-couscous-royal.jpg' },
  { id: 'desserts', name: 'Desserts', image: '/images/tea-banner.webp' },
  { id: 'the', name: 'Thé Marocain', image: '/images/tea-banner.webp' },
  { id: 'jus', name: 'Jus Naturels', image: '/images/dish-harira.webp' },
]

export const dishes: Dish[] = [
  {
    id: 'tajine-citron',
    name: 'Tajine Poulet Citron',
    description: 'Poulet confit au citron confit, olives vertes et safran — signature marocaine.',
    price: 95,
    rating: 4.9,
    prepTime: '45 min',
    category: 'tajines',
    popular: true,
    image: '/images/dish-tajine-citron.jpg',
  },
  {
    id: 'tajine-pruneaux',
    name: 'Tajine Viande Pruneaux',
    description: 'Agneau fondant, pruneaux mijotés, amandes dorées et cannelle.',
    price: 120,
    rating: 4.9,
    prepTime: '60 min',
    category: 'tajines',
    popular: true,
    image: '/images/dish-tajine-pruneaux.jpg',
  },
  {
    id: 'couscous-royal',
    name: 'Couscous Royal',
    description: 'Semoule artisanale, légumes de saison, merguez, agneau et poulet.',
    price: 140,
    rating: 5,
    prepTime: '50 min',
    category: 'couscous',
    popular: true,
    image: '/images/dish-couscous-royal.jpg',
  },
  {
    id: 'pastilla',
    name: 'Pastilla',
    description: 'Feuilleté croustillant au poulet, amandes, œufs et sucre glace.',
    price: 85,
    rating: 4.8,
    prepTime: '40 min',
    category: 'pastilla',
    image: '/images/dish-bastilla.webp',
  },
  {
    id: 'harira',
    name: 'Harira',
    description: 'Soupe traditionnelle aux légumineuses, tomates et coriandre fraîche.',
    price: 35,
    rating: 4.7,
    prepTime: '25 min',
    category: 'harira',
    image: '/images/dish-harira.webp',
  },
  {
    id: 'rfissa',
    name: 'Rfissa',
    description: 'Msemen émietté, poulet, lentilles et fenugrec — plat de fête.',
    price: 110,
    rating: 4.8,
    prepTime: '55 min',
    category: 'rfissa',
    image: '/images/dish-couscous.webp',
  },
  {
    id: 'tanjia',
    name: 'Tanjia',
    description: 'Spécialité marrakchie mijotée longuement aux épices et citron confit.',
    price: 130,
    rating: 4.9,
    prepTime: '90 min',
    category: 'tajines',
    popular: true,
    image: '/images/dish-tagine.webp',
  },
  {
    id: 'mechoui',
    name: 'Méchoui',
    description: 'Agneau rôti lentement, croûte dorée, viande fondante — idéal pour événements.',
    price: 180,
    rating: 5,
    prepTime: '120 min',
    category: 'grillades',
    popular: true,
    image: '/images/dish-tajine-pruneaux.jpg',
  },
  {
    id: 'brochettes',
    name: 'Brochettes',
    description: 'Brochettes marinées au cumin et paprika, grillées à la perfection.',
    price: 75,
    rating: 4.6,
    prepTime: '30 min',
    category: 'grillades',
    image: '/images/dish-tagine.webp',
  },
  {
    id: 'seffa',
    name: 'Seffa',
    description: 'Vermicelles parfumés à la cannelle, raisins secs et amandes toastées.',
    price: 60,
    rating: 4.7,
    prepTime: '35 min',
    category: 'desserts',
    image: '/images/dish-couscous.webp',
  },
  {
    id: 'baghrir',
    name: 'Baghrir',
    description: 'Crêpes aux mille trous, miel et beurre — douceur du petit-déjeuner.',
    price: 28,
    rating: 4.8,
    prepTime: '20 min',
    category: 'desserts',
    image: '/images/tea-banner.webp',
  },
  {
    id: 'chebakia',
    name: 'Chebakia',
    description: 'Pâtisserie au miel et sésame, croustillante et parfumée.',
    price: 40,
    rating: 4.9,
    prepTime: '15 min',
    category: 'desserts',
    image: '/images/tea-banner.webp',
  },
]

export const events: EventCard[] = [
  {
    id: 'mariage',
    title: 'Mariage',
    description: 'Menus traiteur sur-mesure pour un banquet digne de votre plus beau jour.',
    image: '/images/hero-ceremony.jpg',
    icon: 'Heart',
  },
  {
    id: 'fiancailles',
    title: 'Fiançailles',
    description: 'Buffets raffinés et présentation élégante pour célébrer votre engagement.',
    image: '/images/hero-ceremony.jpg',
    icon: 'Gem',
  },
  {
    id: 'anniversaire',
    title: 'Anniversaire',
    description: 'Des saveurs authentiques pour une fête mémorable en famille ou entre amis.',
    image: '/images/dish-couscous-royal.jpg',
    icon: 'Cake',
  },
  {
    id: 'bapteme',
    title: 'Baptême',
    description: 'Cuisine traditionnelle généreuse pour accueillir vos proches.',
    image: '/images/dish-tajine-citron.jpg',
    icon: 'Baby',
  },
  {
    id: 'entreprise',
    title: 'Entreprise',
    description: 'Séminaires, cocktails et lunchs corporatifs avec service premium.',
    image: '/images/dish-bastilla.webp',
    icon: 'Building2',
  },
  {
    id: 'reception',
    title: 'Réception',
    description: 'Réceptions privées : décoration orientale et gastronomie marocaine.',
    image: '/images/hero-ceremony.jpg',
    icon: 'Sparkles',
  },
  {
    id: 'traiteur-vip',
    title: 'Traiteur VIP',
    description: 'Service sur-mesure à domicile, chefs et staffing pour une expérience exclusive.',
    image: '/images/hero-chef-tagine.png',
    icon: 'Crown',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sara Benali',
    role: 'Mariage — Casablanca',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Un service impeccable. Nos 180 invités ont adoré chaque plat. NA3IMA a transformé notre réception.',
  },
  {
    id: '2',
    name: 'Youssef Amrani',
    role: 'Séminaire — Rabat',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Professionnalisme rare. Livraison ponctuelle, présentation soignée, goût authentique.',
  },
  {
    id: '3',
    name: 'Lina Kadiri',
    role: 'Anniversaire — Marrakech',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Le tajine pruneaux et la pastilla étaient divins. On a déjà réservé pour notre prochaine fête.',
  },
  {
    id: '4',
    name: 'Karim Tazi',
    role: 'Traiteur VIP — Tanger',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 5,
    comment:
      'Cuisine d’exception, équipe discrète et élégante. Exactement ce qu’il fallait pour nos clients VIP.',
  },
]

export const galleryImages = [
  { id: 'g1', src: '/images/dish-tagine.webp', alt: 'Tajine traditionnel', span: 'tall' as const },
  { id: 'g2', src: '/images/dish-couscous-royal.jpg', alt: 'Couscous royal', span: 'wide' as const },
  { id: 'g3', src: '/images/tea-banner.webp', alt: 'Thé marocain', span: 'normal' as const },
  { id: 'g4', src: '/images/hero-ceremony.jpg', alt: 'Mariage marocain', span: 'wide' as const },
  { id: 'g5', src: '/images/dish-bastilla.webp', alt: 'Buffet pastilla', span: 'normal' as const },
  { id: 'g6', src: '/images/dish-tajine-citron.jpg', alt: 'Décoration orientale', span: 'tall' as const },
  { id: 'g7', src: '/images/dish-harira.webp', alt: 'Harira', span: 'normal' as const },
  { id: 'g8', src: '/images/hero-chef-tagine.png', alt: 'Chef NA3IMA', span: 'normal' as const },
]

export const advantages = [
  { title: 'Produits frais', description: 'Ingrédients sélectionnés chaque jour auprès de producteurs locaux.', icon: 'Leaf' },
  { title: 'Cuisine traditionnelle', description: 'Recettes transmises et préparées selon les règles de l’art.', icon: 'ChefHat' },
  { title: 'Livraison rapide', description: 'Service ponctuel pour particuliers et événements.', icon: 'Truck' },
  { title: 'Qualité garantie', description: 'Hygiène stricte et excellence gastronomique à chaque commande.', icon: 'ShieldCheck' },
]

export const whyUs = [
  { title: 'Cuisine authentique', description: 'Saveurs du Maroc préservées dans chaque assiette.', icon: 'Flame' },
  { title: 'Chefs expérimentés', description: 'Une équipe passionnée formée à la haute cuisine marocaine.', icon: 'Award' },
  { title: 'Produits frais', description: 'Chaîne du froid maîtrisée, produits de saison.', icon: 'ShoppingBasket' },
  { title: 'Livraison rapide', description: 'Logistique dédiée aux événements et domiciles.', icon: 'Timer' },
  { title: 'Hygiène', description: 'Protocols sanitaires stricts et cuisine aux normes.', icon: 'Sparkles' },
  { title: 'Service Premium', description: 'Accompagnement personnalisé du menu au service.', icon: 'Gem' },
]

export const processSteps = [
  { title: 'Choisissez vos plats', description: 'Parcourez notre carte et composez votre menu.' },
  { title: 'Sélectionnez la date', description: 'Indiquez le jour et l’heure de votre événement.' },
  { title: 'Confirmez la commande', description: 'Validez votre panier et vos préférences.' },
  { title: 'Préparation', description: 'Nos chefs mijotent chaque plat avec soin.' },
  { title: 'Livraison', description: 'Nous livrons à l’heure, prêts à servir.' },
  { title: 'Profitez de votre événement', description: 'Savourez un moment inoubliable.' },
]

export const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'Menu' },
  { href: '#evenements', label: 'Événements' },
  { href: '#pourquoi', label: 'Pourquoi nous' },
  { href: '#temoignages', label: 'Témoignages' },
  { href: '#contact', label: 'Contact' },
]
