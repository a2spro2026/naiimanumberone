import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, Shield, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { navLinks } from '@/data/content'
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
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/10 bg-ink/90 shadow-lg backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <a href="#accueil" className="flex items-center gap-2.5">
          <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.35)] sm:h-12 sm:w-12">
            <img
              src="/images/logo-mark.png?v=3"
              alt="NA3IMA-numberONE"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold tracking-wide text-gold sm:text-xl">
              NA3IMA-numberONE
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.18em] text-beige/70 sm:block">
              Cuisine marocaine
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-beige/90 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-colors duration-300 hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden border-gold/50 text-gold hover:bg-gold/10 sm:inline-flex">
            <Link to="/admin/login">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-beige"
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
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <a href="#menu">Commander maintenant</a>
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-display text-xl text-gold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-beige"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-4 font-display text-3xl text-beige"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button asChild variant="outline" size="lg" className="mt-4 border-gold/50 text-gold">
                <Link to="/admin/login" onClick={() => setMobileOpen(false)}>
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              </Button>
              <Button asChild variant="gold" size="lg" className="mt-3">
                <a href="#menu" onClick={() => setMobileOpen(false)}>
                  Commander maintenant
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function CartDrawer() {
  const { items, total, removeItem, clear, isOpen, setIsOpen } = useCart()

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
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-beige shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="flex items-center justify-between border-b border-brown/10 px-5 py-4">
              <h2 className="font-display text-2xl text-green">Votre panier</h2>
              <Button variant="ghost" size="icon" className="text-ink" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="text-sm text-brown/70">Votre panier est vide.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ dish, quantity }) => (
                    <li key={dish.id} className="flex gap-3 rounded-[20px] bg-white p-3 shadow-sm">
                      <img
                        src={dish.image}
                        alt=""
                        className="h-16 w-16 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink">{dish.name}</p>
                        <p className="text-sm text-brown/70">
                          {quantity} × {formatPrice(dish.price)}
                        </p>
                        <button
                          type="button"
                          className="mt-1 text-xs text-brown underline"
                          onClick={() => removeItem(dish.id)}
                        >
                          Retirer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-brown/10 px-5 py-4">
              <div className="mb-4 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-green">{formatPrice(total)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-brown/30 text-brown" onClick={clear}>
                  Vider
                </Button>
                <Button asChild variant="gold" className="flex-1">
                  <a href="#contact" onClick={() => setIsOpen(false)}>
                    Commander
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
