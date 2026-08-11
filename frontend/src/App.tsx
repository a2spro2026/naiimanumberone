import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { CatalogProvider } from '@/context/CatalogContext'
import { HomePage } from '@/pages/HomePage'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute'
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

export default function App() {
  return (
    <AuthProvider>
      <CatalogProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="fournisseurs" element={<FournisseursPage />} />
                <Route path="stock" element={<StockPage />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="calendrier" element={<CalendrierPage />} />
                <Route path="reservations" element={<ReservationsPage />} />
                <Route path="collaborateurs" element={<CollaborateursPage />} />
                <Route path="configuration" element={<ConfigurationPage />} />
                <Route path="configuration/habillage" element={<HabillagePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </CatalogProvider>
    </AuthProvider>
  )
}
