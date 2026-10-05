import { useForm } from 'react-hook-form'
import { CreditCard, Share2, ShieldCheck, Truck } from 'lucide-react'
import { Bi, BiLabel } from '@/components/Bi'
import { Button } from '@/components/ui/button'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, navLinks } from '@/data/content'

type NewsletterForm = { email: string }

function ColumnTitle({ ar, fr }: { ar: string; fr: string }) {
  return (
    <h4 className="text-lg font-semibold text-gold">
      <Bi ar={ar} fr={fr} frClassName="mt-0 text-xs uppercase tracking-[0.18em] text-gold/80" />
    </h4>
  )
}

export function Footer() {
  const { register, handleSubmit, reset } = useForm<NewsletterForm>()

  return (
    <footer className="bg-ink pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-beige lg:pb-0">
      <div dir="rtl" className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:px-8 lg:py-14">
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
          <p className="mt-4 text-sm leading-relaxed text-beige/70">
            <Bi
              ar="المذاق المغربي الأصيل، يوصل لجميع مناسباتكم."
              fr="Le goût authentique du Maroc, livré à tous vos événements."
              frClassName="text-[0.9em]"
            />
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" className="rounded-full border border-white/15 p-2 hover:border-gold hover:text-gold" aria-label="Réseaux sociaux">
              <Share2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <ColumnTitle ar="روابط" fr="Navigation" />
          <ul className="mt-4 space-y-3 text-sm text-beige/75">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">
                  <Bi ar={l.labelAr} fr={l.label} frClassName="mt-0 text-[0.85em]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle ar="معلومات" fr="Informations" />
          <ul className="mt-4 space-y-3 text-sm text-beige/75">
            <li>
              <Bi ar="الدار البيضاء، المغرب" fr="Casablanca, Maroc" frClassName="mt-0 text-[0.85em]" />
            </li>
            <li>
              <a href={`tel:${CONTACT_PHONE}`} dir="ltr" className="transition hover:text-gold">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href="mailto:contact@na3ima.ma" className="transition hover:text-gold">
                contact@na3ima.ma
              </a>
            </li>
            <li>
              <Bi
                ar="من الإثنين إلى الأحد 09:00–23:00"
                fr="Lun–Dim 09:00–23:00"
                frClassName="mt-0 text-[0.85em]"
              />
            </li>
          </ul>
        </div>

        <div>
          <ColumnTitle ar="النشرة الإخبارية" fr="Newsletter" />
          <p className="mt-3 text-sm text-beige/70">
            <Bi ar="عروض وقوائم الموسم." fr="Offres et menus de saison." frClassName="mt-0 text-[0.9em]" />
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={handleSubmit(() => {
              reset()
            })}
          >
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="بريدكم الإلكتروني / Votre email"
              className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-gold"
              {...register('email', { required: true })}
            />
            <Button type="submit" variant="gold" size="sm" className="h-12">
              <BiLabel ar="اشترك" fr="OK" />
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-beige/55 sm:flex-row lg:px-8">
          <p className="text-center sm:text-left">
            <Bi
              ar={`© ${new Date().getFullYear()} NA3IMA-numberONE. جميع الحقوق محفوظة.`}
              fr="Tous droits réservés."
              frClassName="mt-0"
            />
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <BiLabel ar="دفع آمن" fr="Paiement sécurisé" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-gold" />
              <BiLabel ar="توصيل سريع" fr="Livraison rapide" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-gold" />
              <BiLabel ar="بطاقة · نقداً" fr="CB · Espèces" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
