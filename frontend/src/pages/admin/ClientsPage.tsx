import { Users } from 'lucide-react'
import { AdminModulePage } from '@/components/admin/AdminModulePage'

const rows = [
  { nom: 'Sara Benali', email: 'sara.b@email.ma', type: 'Mariage', commande: '12 400 MAD' },
  { nom: 'Youssef Amrani', email: 'y.amrani@corp.ma', type: 'Entreprise', commande: '8 200 MAD' },
  { nom: 'Lina Kadiri', email: 'lina.k@email.ma', type: 'Anniversaire', commande: '3 150 MAD' },
]

export function ClientsPage() {
  return (
    <AdminModulePage
      title="Client"
      description="Base clients particuliers et professionnels."
      icon={Users}
      actionLabel="Nouveau client"
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type' },
        { key: 'commande', label: 'Dernière commande' },
      ]}
      rows={rows}
    />
  )
}
