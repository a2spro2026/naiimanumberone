import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, Phone, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { BiLabel } from '@/components/Bi'
import { useCart } from '@/context/CartContext'
import { CONTACT_PHONE, WHATSAPP_URL, dishSizes } from '@/data/content'

const itemClass =
  'flex flex-1 flex-col items-center justify-center gap-1 py-1.5 text-xs font-semibold text-beige/90 transition-colors active:text-gold'

export function MobileActionBar() {
  const { count, setIsOpen, lastAdded } = useCart()
  const size = lastAdded && dishSizes.find((s) => s.value === lastAdded.size)

  return (
    <>
      <AnimatePresence>
        {lastAdded && (
          <motion.div
            key={`${lastAdded.dish.id}:${lastAdded.size}`}
            role="status"
            className="fixed inset-x-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex items-center gap-3 rounded-2xl border border-gold/30 bg-ink/95 px-4 py-3 text-sm text-beige shadow-2xl backdrop-blur-md lg:hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
            <span className="min-w-0 flex-1">
              <span dir="rtl" lang="ar" className="block truncate">
                <strong className="font-semibold">{lastAdded.dish.nameAr || lastAdded.dish.name}</strong>
                {size && ` (${size.ar})`} أضيف إلى السلة
              </span>
              <span className="block truncate text-xs text-beige/70">
                {lastAdded.dish.name || lastAdded.dish.nameAr}
                {size && ` (${size.fr})`} ajouté au panier
              </span>
            </span>
            <button
              type="button"
              className="shrink-0 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-ink"
              onClick={() => setIsOpen(true)}
            >
              <BiLabel ar="عرض" fr="Voir" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Actions rapides"
        className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink/95 backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto flex h-[68px] max-w-xl items-stretch">
          <a href={`tel:${CONTACT_PHONE}`} className={itemClass}>
            <Phone className="h-5 w-5 text-gold" />
            <BiLabel ar="اتصل" fr="Appeler" />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={itemClass}>
            <MessageCircle className="h-5 w-5 text-gold" />
            <BiLabel ar="واتساب" fr="WhatsApp" />
          </a>
          <button type="button" className={itemClass} onClick={() => setIsOpen(true)}>
            <span className="relative">
              <ShoppingBag className="h-5 w-5 text-gold" />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </span>
            <BiLabel ar="السلة" fr="Panier" />
          </button>
          <a
            href="#menu"
            className="m-2 flex flex-[1.4] items-center justify-center gap-1.5 rounded-2xl bg-gold px-2 text-sm font-bold text-ink shadow-[0_6px_20px_rgba(212,175,55,0.35)] active:scale-[0.97]"
          >
            <UtensilsCrossed className="h-4 w-4 shrink-0 max-[374px]:hidden" />
            <BiLabel ar="اطلب" fr="Commander" />
          </a>
        </div>
      </nav>
    </>
  )
}
