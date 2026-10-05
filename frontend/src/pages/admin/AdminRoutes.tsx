import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminOnlyRoute, FullAccessRoute, ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { FournisseursPage } from '@/pages/admin/FournisseursPage'
import { StockPage } from '@/pages/admin/StockPage'
import { ClientsPage } from '@/pages/admin/ClientsPage'
import { CalendrierPage } from '@/pages/admin/CalendrierPage'
import { ReservationsPage } from '@/pages/admin/ReservationsPage'
import { CollaborateursPage } from '@/pages/admin/CollaborateursPage'
import { ConfigurationPage } from '@/pages/admin/ConfigurationPage'
import { HabillagePage } from '@/pages/admin/HabillagePage'
import { UtilisateursPage } from '@/pages/admin/UtilisateursPage'

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="configuration/habillage" element={<HabillagePage />} />
            <Route element={<FullAccessRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="fournisseurs" element={<FournisseursPage />} />
              <Route path="stock" element={<StockPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="calendrier" element={<CalendrierPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="collaborateurs" element={<CollaborateursPage />} />
              <Route path="configuration" element={<ConfigurationPage />} />
              <Route element={<AdminOnlyRoute />}>
                <Route path="configuration/utilisateurs" element={<UtilisateursPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
