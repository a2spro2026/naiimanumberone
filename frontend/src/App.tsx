import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { HomePage } from '@/pages/HomePage'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { FournisseursPage } from '@/pages/admin/FournisseursPage'
import { StockPage } from '@/pages/admin/StockPage'
import { ClientsPage } from '@/pages/admin/ClientsPage'
import { CalendrierPage } from '@/pages/admin/CalendrierPage'
import { ReservationsPage } from '@/pages/admin/ReservationsPage'
import { CollaborateursPage } from '@/pages/admin/CollaborateursPage'
import { ConfigurationPage } from '@/pages/admin/ConfigurationPage'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="fournisseurs" element={<FournisseursPage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="calendrier" element={<CalendrierPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="collaborateurs" element={<CollaborateursPage />} />
            <Route path="configuration" element={<ConfigurationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
