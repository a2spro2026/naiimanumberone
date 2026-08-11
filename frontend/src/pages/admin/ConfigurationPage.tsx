import { Palette, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function ConfigurationPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
          <Settings className="h-3.5 w-3.5" />
          Module
        </div>
        <h1 className="font-display text-3xl text-green sm:text-4xl">Configuration</h1>
        <p className="mt-2 max-w-2xl text-sm text-brown/70">
          Paramètres généraux de l’entreprise, contacts et préférences du site.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[20px] border border-brown/10 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl text-ink">Entreprise</h2>
          <div className="mt-4 space-y-3">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-brown">Nom</span>
              <input
                defaultValue="NA3IMA-numberONE"
                className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-2.5 outline-none focus:border-gold"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-brown">Téléphone</span>
              <input
                defaultValue="+212 6 00 00 00 00"
                className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-2.5 outline-none focus:border-gold"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-brown">Email</span>
              <input
                defaultValue="contact@na3ima.ma"
                className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-2.5 outline-none focus:border-gold"
              />
            </label>
          </div>
        </section>

        <section className="rounded-[20px] border border-brown/10 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl text-ink">Site & notifications</h2>
          <div className="mt-4 space-y-4 text-sm">
            <label className="flex items-center justify-between gap-3 rounded-2xl bg-beige/60 px-4 py-3">
              <span>Emails de nouvelles réservations</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-green" />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-2xl bg-beige/60 px-4 py-3">
              <span>Alertes stock bas</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-green" />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-2xl bg-beige/60 px-4 py-3">
              <span>Mode maintenance site public</span>
              <input type="checkbox" className="h-4 w-4 accent-green" />
            </label>
          </div>
        </section>
      </div>

      <Link
        to="/admin/configuration/habillage"
        className="flex items-center justify-between rounded-[20px] border border-gold/30 bg-white p-5 shadow-sm transition hover:border-gold"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <Palette className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-xl text-ink">Habillage</p>
            <p className="text-sm text-brown/70">Photos et titres des catégories et du menu.</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-gold">Ouvrir →</span>
      </Link>

      <Button variant="gold">Enregistrer les paramètres</Button>
    </div>
  )
}
