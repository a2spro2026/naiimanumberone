import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { CatalogProvider } from '@/context/CatalogContext'
import { HomePage } from '@/pages/HomePage'

const AdminRoutes = lazy(() => import('@/pages/admin/AdminRoutes'))

function PageLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-ink">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
    </div>
  )
}

export default function App() {
  return (
    <CatalogProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </CatalogProvider>
  )
}
