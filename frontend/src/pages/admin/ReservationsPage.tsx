import { CalendarRange } from 'lucide-react'
import { AdminModulePage } from '@/components/admin/AdminModulePage'

const rows = [
  { ref: 'RES-2041', client: 'Sara Benali', date: '18 juil.', statut: 'Confirmée', total: '12 400 MAD' },
  { ref: 'RES-2042', client: 'Atlas Bank', date: '22 juil.', statut: 'En attente', total: '8 200 MAD' },
  { ref: 'RES-2043', client: 'Lina Kadiri', date: '02 août', statut: 'Devis', total: '3 150 MAD' },
]

export function ReservationsPage() {
  return (
    <AdminModulePage
      title="Réservations"
      description="Suivi des réservations traiteur et commandes événements."
      icon={CalendarRange}
      actionLabel="Nouvelle réservation"
      columns={[
        { key: 'ref', label: 'Réf.' },
        { key: 'client', label: 'Client' },
        { key: 'date', label: 'Date' },
        { key: 'statut', label: 'Statut' },
        { key: 'total', label: 'Total' },
      ]}
      rows={rows}
    />
  )
}
