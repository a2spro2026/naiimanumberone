import { CalendarDays } from 'lucide-react'
import { AdminModulePage } from '@/components/admin/AdminModulePage'

const rows = [
  { date: '18 juil. 2026', evenement: 'Mariage Benali', lieu: 'Casablanca', equipe: 'Équipe A' },
  { date: '22 juil. 2026', evenement: 'Séminaire Atlas Bank', lieu: 'Rabat', equipe: 'Équipe B' },
  { date: '02 août 2026', evenement: 'Baptême Kadiri', lieu: 'Marrakech', equipe: 'Équipe A' },
]

export function CalendrierPage() {
  return (
    <AdminModulePage
      title="Calendrier"
      description="Planning des événements et disponibilités."
      icon={CalendarDays}
      actionLabel="Bloquer une date"
      columns={[
        { key: 'date', label: 'Date' },
        { key: 'evenement', label: 'Événement' },
        { key: 'lieu', label: 'Lieu' },
        { key: 'equipe', label: 'Équipe' },
      ]}
      rows={rows}
    />
  )
}
