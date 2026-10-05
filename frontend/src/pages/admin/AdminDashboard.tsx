import {
  CalendarDays,
  CalendarRange,
  Package,
  Settings,
  Truck,
  Users,
  UsersRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'

const cards = [
  {
    to: '/admin/fournisseurs',
    title: 'Fournisseur',
    desc: 'Gérer vos partenaires et approvisionnements.',
    icon: Truck,
    stat: '12 actifs',
  },
  {
    to: '/admin/stock',
    title: 'Stock',
    desc: 'Suivre inventaire, alertes et mouvements.',
    icon: Package,
    stat: '48 articles',
  },
  {
    to: '/admin/clients',
    title: 'Client',
    desc: 'Fiches clients, historiques et contacts.',
    icon: Users,
    stat: '126 fiches',
  },
  {
    to: '/admin/calendrier',
    title: 'Calendrier',
    desc: 'Vue d’ensemble des événements à venir.',
    icon: CalendarDays,
    stat: '8 ce mois',
  },
  {
    to: '/admin/reservations',
    title: 'Réservations',
    desc: 'Commandes traiteur et confirmations.',
    icon: CalendarRange,
    stat: '17 en cours',
  },
  {
    to: '/admin/collaborateurs',
    title: 'Collaborateurs',
    desc: 'Équipe, rôles et disponibilités.',
    icon: UsersRound,
    stat: '9 membres',
  },
  {
    to: '/admin/configuration',
    title: 'Configuration',
    desc: 'Paramètres de l’entreprise et du site.',
    icon: Settings,
    stat: 'Réglages',
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brown">Administration</p>
        <h1 className="mt-2 font-display text-3xl text-green sm:text-4xl">
          Interface principale
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brown/70">
          Accédez rapidement à tous les modules de gestion NA3IMA-numberONE.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <Reveal key={card.to} delay={i * 0.04}>
              <Link
                to={card.to}
                className="group flex h-full flex-col rounded-[20px] border border-brown/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(16,16,16,0.08)] active:scale-[0.99] sm:p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green/10 text-green transition-colors group-hover:bg-gold/15 group-hover:text-brown">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl text-ink">{card.title}</h2>
                <p className="mt-2 flex-1 text-sm text-brown/70">{card.desc}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold">
                  {card.stat}
                </p>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
