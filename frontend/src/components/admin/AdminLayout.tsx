import { NavLink, Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  CalendarDays,
  CalendarRange,
  Menu,
  Package,
  Settings,
  Shield,
  Truck,
  Users,
  UsersRound,
  X,
  LayoutDashboard,
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const adminLinks = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/fournisseurs', label: 'Fournisseur', icon: Truck },
  { to: '/admin/stock', label: 'Stock', icon: Package },
  { to: '/admin/clients', label: 'Client', icon: Users },
  { to: '/admin/calendrier', label: 'Calendrier', icon: CalendarDays },
  { to: '/admin/reservations', label: 'Réservations', icon: CalendarRange },
  { to: '/admin/collaborateurs', label: 'Collaborateurs', icon: UsersRound },
  { to: '/admin/configuration', label: 'Configuration', icon: Settings },
]

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {adminLinks.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300',
              isActive
                ? 'bg-gold text-ink shadow-[0_8px_24px_rgba(212,175,55,0.35)]'
                : 'text-beige/75 hover:bg-white/5 hover:text-gold',
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-svh bg-beige text-ink">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col border-r border-white/10 bg-green lg:flex">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <Shield className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg text-gold">Admin</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-beige/60">NA3IMA-numberONE</p>
          </div>
        </div>
        {nav}
        <div className="border-t border-white/10 p-4">
          <Button asChild variant="outline" className="w-full border-gold/40 text-gold hover:bg-gold/10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Link>
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-brown/10 bg-white/90 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-ink lg:hidden"
              aria-label="Menu admin"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 lg:hidden">
              <Building2 className="h-4 w-4 text-green" />
              <span className="font-display text-lg text-green">Espace Admin</span>
            </div>
            <p className="hidden text-sm text-brown/70 lg:block">
              Gérez fournisseurs, stock, clients et réservations.
            </p>
          </div>
          <Button asChild variant="green" size="sm" className="hidden sm:inline-flex lg:hidden">
            <Link to="/">Site public</Link>
          </Button>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer"
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[60] flex w-72 flex-col bg-green shadow-2xl lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <span className="font-display text-xl text-gold">Admin</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-beige"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {nav}
              <div className="border-t border-white/10 p-4">
                <Button asChild variant="gold" className="w-full">
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    Retour au site
                  </Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
