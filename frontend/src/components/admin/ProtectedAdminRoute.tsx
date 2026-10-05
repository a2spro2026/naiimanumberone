import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { GERANT_HOME, isGerant, useAuth } from '@/context/AuthContext'

function Spinner() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-ink">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
    </div>
  )
}

export function ProtectedAdminRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <Spinner />

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export function AdminOnlyRoute() {
  const { user } = useAuth()

  if (!user?.isAdmin) return <Navigate to="/admin" replace />

  return <Outlet />
}

/** Sections greyed out for the gérant: he is sent back to the dishes page. */
export function FullAccessRoute() {
  const { user } = useAuth()

  if (isGerant(user)) return <Navigate to={GERANT_HOME} replace />

  return <Outlet />
}
