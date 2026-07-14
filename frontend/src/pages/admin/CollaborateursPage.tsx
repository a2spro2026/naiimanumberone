import { UsersRound } from 'lucide-react'
import { AdminModulePage } from '@/components/admin/AdminModulePage'

const rows = [
  { nom: 'Naima El Fassi', role: 'Cheffe', tel: '06 00 11 22 33', statut: 'Disponible' },
  { nom: 'Karim Tazi', role: 'Cuisine', tel: '06 44 55 66 77', statut: 'En service' },
  { nom: 'Imane Saadi', role: 'Service', tel: '06 88 99 00 11', statut: 'Disponible' },
]

export function CollaborateursPage() {
  return (
    <AdminModulePage
      title="Collaborateurs"
      description="Équipe interne, rôles et statut de disponibilité."
      icon={UsersRound}
      actionLabel="Ajouter un collaborateur"
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'role', label: 'Rôle' },
        { key: 'tel', label: 'Téléphone' },
        { key: 'statut', label: 'Statut' },
      ]}
      rows={rows}
    />
  )
}
