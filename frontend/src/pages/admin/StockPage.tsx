import { Package } from 'lucide-react'
import { AdminModulePage } from '@/components/admin/AdminModulePage'

const rows = [
  { article: 'Safran', qte: '1,2 kg', seuil: '0,5 kg', emplacement: 'Épicerie A1' },
  { article: 'Pruneaux séchés', qte: '18 kg', seuil: '10 kg', emplacement: 'Sec B3' },
  { article: 'Semoule fine', qte: '42 kg', seuil: '20 kg', emplacement: 'Sec C2' },
  { article: 'Citron confit', qte: '8 kg', seuil: '5 kg', emplacement: 'Frais F1' },
]

export function StockPage() {
  return (
    <AdminModulePage
      title="Stock"
      description="Inventaire des matières premières et alertes de réapprovisionnement."
      icon={Package}
      actionLabel="Mouvement de stock"
      columns={[
        { key: 'article', label: 'Article' },
        { key: 'qte', label: 'Quantité' },
        { key: 'seuil', label: 'Seuil' },
        { key: 'emplacement', label: 'Emplacement' },
      ]}
      rows={rows}
    />
  )
}
