import { useForm } from 'react-hook-form'
import { CreditCard, Share2, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/data/content'

type NewsletterForm = { email: string }

export function Footer() {
  const { register, handleSubmit, reset } = useForm<NewsletterForm>()

  return (
    <footer className="bg-ink text-beige">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/50">
              <img
                src="/images/logo-mark.png?v=3"
                alt="NA3IMA-numberONE"
                className="h-full w-full object-cover"
              />
            </span>
            <p className="font-display text-xl text-gold">NA3IMA-numberONE</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-beige/65">
            Le goût authentique du Maroc, livré à tous vos événements.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" className="rounded-full border border-white/15 p-2 hover:border-gold hover:text-gold" aria-label="Réseaux sociaux">
              <Share2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gold">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm text-beige/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gold">Informations</h4>
          <ul className="mt-4 space-y-2 text-sm text-beige/70">
            <li>Casablanca, Maroc</li>
            <li>+212 6 00 00 00 00</li>
            <li>contact@na3ima.ma</li>
            <li>Lun–Dim 09:00–23:00</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gold">Newsletter</h4>
          <p className="mt-3 text-sm text-beige/65">Offres et menus de saison.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={handleSubmit(() => {
              reset()
            })}
          >
            <input
              type="email"
              placeholder="Votre email"
              className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-gold"
              {...register('email', { required: true })}
            />
            <Button type="submit" variant="gold" size="sm">
              OK
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-beige/50 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} NA3IMA-numberONE. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Paiement sécurisé
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-gold" /> Livraison rapide
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-gold" /> CB · Espèces
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
