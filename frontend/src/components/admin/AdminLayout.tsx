import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  Menu,
  Package,
  Palette,
  Settings,
  Shield,
  Truck,
  UserCog,
  Users,
  UsersRound,
  UtensilsCrossed,
  X,
  LayoutDashboard,
  ArrowLeft,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GERANT_HOME, isGerant, useAdminLang, useAuth } from '@/context/AuthContext'

const adminLinks = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/fournisseurs', label: 'Fournisseur', icon: Truck },
  { to: '/admin/stock', label: 'Stock', icon: Package },
  { to: '/admin/clients', label: 'Client', icon: Users },
  { to: '/admin/calendrier', label: 'Calendrier', icon: CalendarDays },
  { to: '/admin/reservations', label: 'Réservations', icon: CalendarRange },
  { to: '/admin/collaborateurs', label: 'Collaborateurs', icon: UsersRound },
]

function DisabledLink({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span
      aria-disabled="true"
      title="غير متاح"
      className="flex cursor-not-allowed select-none items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-beige/30"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      {label}
    </span>
  )
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { logout, user } = useAuth()
  const { t } = useAdminLang()
  const restricted = isGerant(user)
  const navigate = useNavigate()
  const location = useLocation()
  const configOpen = location.pathname.startsWith('/admin/configuration')

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  const nav = restricted ? (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4">
      {adminLinks.map(({ to, label, icon: Icon }) => (
        <DisabledLink key={to} icon={Icon} label={label} />
      ))}
      <div className="mt-1">
        <DisabledLink icon={Settings} label="Configuration" />
        <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-3">
          <NavLink
            to={GERANT_HOME}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-base font-semibold transition-all duration-300',
                isActive ? 'bg-gold/90 text-ink' : 'text-beige/80 hover:bg-white/5 hover:text-gold',
              )
            }
          >
            <UtensilsCrossed className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span dir="rtl" lang="ar">
              الأطباق
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4">
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

      <div className="mt-1">
        <NavLink
          to="/admin/configuration"
          end
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
          <Settings className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1">Configuration</span>
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', configOpen && 'rotate-180')}
          />
        </NavLink>
        <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-3">
            <NavLink
              to="/admin/configuration/habillage"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gold/90 text-ink'
                    : 'text-beige/70 hover:bg-white/5 hover:text-gold',
                )
              }
            >
              <Palette className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              Habillage
            </NavLink>
            {user?.isAdmin && (
              <NavLink
                to="/admin/configuration/utilisateurs"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'bg-gold/90 text-ink'
                      : 'text-beige/70 hover:bg-white/5 hover:text-gold',
                  )
                }
              >
                <UserCog className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                Utilisateurs
              </NavLink>
            )}
          </div>
      </div>
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
        <div className="space-y-2 border-t border-white/10 p-4">
          <Button asChild variant="outline" className="w-full border-gold/40 text-gold hover:bg-gold/10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              {t('Retour au site', 'الرجوع إلى الموقع')}
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-beige/80 hover:bg-white/10 hover:text-beige"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {t('Déconnexion', 'تسجيل الخروج')}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="pt-safe sticky top-0 z-40 border-b border-brown/10 bg-white/90 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-4 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-ink hover:bg-brown/10 lg:hidden"
                aria-label={t('Menu admin', 'القائمة')}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 lg:hidden">
                <Building2 className="h-4 w-4 text-green" />
                <span className="font-display text-lg text-green">{t('Espace Admin', 'لوحة التحكم')}</span>
              </div>
              <p className="hidden text-sm text-brown/70 lg:block">
                {t('Gérez fournisseurs, stock, clients et réservations.', 'أضف الأطباق وعدّلها كما تظهر في الموقع.')}
              </p>
            </div>
            <Button asChild variant="green" size="sm" className="hidden sm:inline-flex lg:hidden">
              <Link to="/">{t('Site public', 'الموقع')}</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-brown hover:bg-brown/10 sm:hidden"
              aria-label={t('Déconnexion', 'تسجيل الخروج')}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="pb-safe-4 flex-1 px-3 pt-4 sm:px-4 lg:p-8">
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
              className="pt-safe pb-safe fixed inset-y-0 left-0 z-[60] flex w-72 max-w-[85vw] flex-col bg-green shadow-2xl lg:hidden"
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
                  aria-label={t('Fermer le menu', 'إغلاق القائمة')}
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {nav}
              <div className="space-y-2 border-t border-white/10 p-4">
                <Button asChild variant="gold" className="w-full">
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    {t('Retour au site', 'الرجوع إلى الموقع')}
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-beige/80 hover:bg-white/10"
                  onClick={() => {
                    setMobileOpen(false)
                    handleLogout()
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  {t('Déconnexion', 'تسجيل الخروج')}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
