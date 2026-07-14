import { Truck } from 'lucide-react'
import { AdminModulePage } from '@/components/admin/AdminModulePage'

const rows = [
  { nom: 'Agro Atlas SARL', contact: '06 11 22 33 44', categorie: 'Épices & huiles', statut: 'Actif' },
  { nom: 'Souk Fresh', contact: '05 22 33 44 55', categorie: 'Légumes', statut: 'Actif' },
  { nom: 'Viandes du Sud', contact: '06 98 76 54 32', categorie: 'Viandes', statut: 'En revue' },
]

export function FournisseursPage() {
  return (
    <AdminModulePage
      title="Fournisseur"
      description="Liste de vos fournisseurs et interlocuteurs d’approvisionnement."
      icon={Truck}
      actionLabel="Nouveau fournisseur"
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'contact', label: 'Contact' },
        { key: 'categorie', label: 'Catégorie' },
        { key: 'statut', label: 'Statut' },
      ]}
      rows={rows}
    />
  )
}
