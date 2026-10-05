import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MessageCircle, Minus, Phone, Plus, ShoppingBag, Shield, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Bi, BiLabel } from '@/components/Bi'
import { Button } from '@/components/ui/button'
import { cartLinePrice, useCart } from '@/context/CartContext'
import { CONTACT_PHONE, WHATSAPP_URL, dishSizes, navLinks } from '@/data/content'
import { cn, formatPrice } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, setIsOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'pt-safe fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/10 bg-ink/90 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-b from-ink/70 to-transparent lg:bg-none',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-[72px] sm:gap-4 sm:px-4 lg:px-8">
        <a href="#accueil" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.35)] sm:h-12 sm:w-12">
            <img
              src="/images/logo-mark.png?v=3"
              alt="NA3IMA-numberONE"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-base font-semibold tracking-wide text-gold min-[380px]:text-lg sm:text-xl">
              NA3IMA-numberONE
            </p>
            <p className="hidden text-[11px] text-beige/70 sm:block">
              <span dir="rtl" lang="ar">المطبخ المغربي</span>
              <span className="mx-1.5 opacity-50">·</span>
              <span className="uppercase tracking-[0.14em]">Cuisine marocaine</span>
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-4 text-sm font-medium text-beige/90 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-colors duration-300 hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              <BiLabel ar={link.labelAr} fr={link.label} className="text-[15px]" />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button asChild variant="outline" size="sm" className="hidden border-gold/50 text-gold hover:bg-gold/10 sm:inline-flex">
            <Link to="/admin/login">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden text-beige lg:inline-flex"
            aria-label="Panier"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </Button>
          <Button asChild variant="gold" size="sm" className="hidden h-12 md:inline-flex lg:hidden xl:inline-flex">
            <a href="#menu">
              <BiLabel ar="اطلب الآن" fr="Commander maintenant" className="text-sm" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-beige lg:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}

/** Portaled: the scrolled header's backdrop-filter would otherwise confine this fixed overlay to the header box. */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="pt-safe fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-3">
            <span className="font-display text-xl text-gold">
              <span dir="rtl" lang="ar">القائمة</span>
              <span className="mx-2 opacity-50">·</span>
              Menu
            </span>
            <Button variant="ghost" size="icon" className="text-beige" onClick={onClose} aria-label="Fermer">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="pb-safe-4 flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-6 pt-4">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-white/10 py-3 text-center font-display text-2xl font-bold text-beige active:text-gold sm:text-3xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
              >
                <Bi ar={link.labelAr} fr={link.label} frClassName="mt-0 text-base font-medium text-beige/60" />
              </motion.a>
            ))}
            <div className="mt-5 grid shrink-0 grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-14 border-gold/50 text-gold">
                <a href={`tel:${CONTACT_PHONE}`}>
                  <Phone className="h-4 w-4" />
                  <BiLabel ar="اتصل" fr="Appeler" />
                </a>
              </Button>
              <Button asChild variant="green" className="h-14">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  <BiLabel ar="واتساب" fr="WhatsApp" />
                </a>
              </Button>
            </div>
            <Button asChild variant="gold" size="lg" className="mt-3 h-16 shrink-0">
              <a href="#menu" onClick={onClose}>
                <BiLabel ar="اطلب الآن" fr="Commander maintenant" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-3 shrink-0 border-gold/50 text-gold">
              <Link to="/admin/login" onClick={onClose}>
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function CartDrawer() {
  const { items, total, removeItem, updateQuantity, clear, isOpen, setIsOpen } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Fermer le panier"
            className="fixed inset-0 z-[70] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className="pt-safe fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col bg-beige shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="flex items-center justify-between border-b border-brown/10 px-5 py-3">
              <h2 className="font-display text-2xl font-bold text-green">
                <Bi ar="سلتكم" fr="Votre panier" frClassName="mt-0 text-sm font-semibold" />
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-ink hover:bg-brown/10"
                aria-label="Fermer le panier"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
              {items.length === 0 ? (
                <p className="text-center text-base text-brown/70">
                  <Bi ar="سلتكم فارغة." fr="Votre panier est vide." frClassName="text-sm" />
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const { key, dish, size, quantity } = item
                    const sizeLabel = dishSizes.find((s) => s.value === size)
                    const lineTotal = cartLinePrice(item) * quantity
                    return (
                    <li key={key} dir="rtl" className="flex gap-3 rounded-[20px] bg-white p-3 shadow-sm">
                      <img
                        src={dish.image}
                        alt=""
                        className="h-16 w-16 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink">
                          <Bi
                            ar={dish.nameAr || dish.name}
                            fr={dish.name}
                            arClassName="truncate"
                            frClassName="mt-0 truncate text-xs font-medium"
                          />
                        </p>
                        {sizeLabel && (
                          <span className="mt-1 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brown">
                            {sizeLabel.ar} · {sizeLabel.fr}
                          </span>
                        )}
                        <p className="mt-1 text-sm text-brown/70">
                          <span dir="rtl" lang="ar">{lineTotal.toFixed(2)} درهم</span>
                          <span className="mx-1.5 opacity-50">·</span>
                          {formatPrice(lineTotal)}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div dir="ltr" className="flex items-center rounded-full border border-brown/15 bg-beige">
                            <button
                              type="button"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-brown active:bg-brown/10"
                              aria-label={`Diminuer ${dish.name || dish.nameAr}`}
                              onClick={() => updateQuantity(key, quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
                            <button
                              type="button"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-brown active:bg-brown/10"
                              aria-label={`Augmenter ${dish.name || dish.nameAr}`}
                              onClick={() => updateQuantity(key, quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="px-2 py-1 text-sm text-brown underline"
                            onClick={() => removeItem(key)}
                          >
                            <BiLabel ar="حذف" fr="Retirer" />
                          </button>
                        </div>
                      </div>
                    </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div className="pb-safe-4 border-t border-brown/10 px-4 pt-4 sm:px-5">
              <div dir="rtl" className="mb-4 flex items-center justify-between font-semibold">
                <BiLabel ar="المجموع" fr="Total" className="items-start text-base" />
                <span className="text-left text-green">
                  <Bi
                    ar={`${total.toFixed(2)} درهم`}
                    fr={formatPrice(total)}
                    arClassName="text-lg"
                    frClassName="mt-0 text-xs"
                  />
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-14 flex-1 border-brown/30 text-brown" onClick={clear}>
                  <BiLabel ar="إفراغ" fr="Vider" />
                </Button>
                <Button asChild variant="gold" className="h-14 flex-1">
                  <a href="#contact" onClick={() => setIsOpen(false)}>
                    <BiLabel ar="اطلب" fr="Commander" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
