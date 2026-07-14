import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Clock3, Mail, MapPin, Phone, Send, Share2 } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'

type ContactForm = {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
}

export function Contact() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>()

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600))
    setSent(true)
    reset()
  }

  return (
    <section id="contact" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            Contact
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Planifions votre événement
          </h2>
        </Reveal>

        <Reveal className="mt-12" delay={0.08}>
          <div className="grid overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(16,16,16,0.08)] lg:grid-cols-2">
            <div className="bg-green p-8 text-beige lg:p-10">
              <h3 className="font-display text-3xl text-gold">NA3IMA-numberONE</h3>
              <p className="mt-3 max-w-sm text-beige/75">
                Cuisine marocaine d&apos;exception pour particuliers et événements.
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <a href="tel:+212600000000" className="text-beige/80 hover:text-gold">
                      +212 6 00 00 00 00
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Send className="mt-0.5 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a
                      href="https://wa.me/212600000000"
                      target="_blank"
                      rel="noreferrer"
                      className="text-beige/80 hover:text-gold"
                    >
                      Discutez avec nous
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:contact@na3ima.ma" className="text-beige/80 hover:text-gold">
                      contact@na3ima.ma
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p className="text-beige/80">Casablanca, Maroc</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold">Horaires</p>
                    <p className="text-beige/80">Lun–Dim · 09:00 – 23:00</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-ink"
                  aria-label="Réseaux sociaux"
                >
                  <Share2 className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 overflow-hidden rounded-[16px] border border-white/10">
                <iframe
                  title="Carte NA3IMA"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d-7.62!3d33.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzEyLjAiTiA3wrAzNycxMi4wIlc!5e0!3m2!1sfr!2sma!4v1"
                  className="h-44 w-full grayscale-[30%] contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8 lg:p-10">
              <h3 className="font-display text-2xl text-ink">Demande de devis</h3>
              {sent && (
                <p className="rounded-xl bg-green/10 px-4 py-3 text-sm text-green">
                  Merci ! Nous vous recontactons très vite.
                </p>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brown">Nom</label>
                <input
                  className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-3 text-sm outline-none transition focus:border-gold"
                  {...register('name', { required: 'Nom requis' })}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brown">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-3 text-sm outline-none transition focus:border-gold"
                    {...register('email', { required: 'Email requis' })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brown">Téléphone</label>
                  <input
                    className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-3 text-sm outline-none transition focus:border-gold"
                    {...register('phone', { required: 'Téléphone requis' })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brown">Type d&apos;événement</label>
                <select
                  className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-3 text-sm outline-none transition focus:border-gold"
                  {...register('eventType', { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez…
                  </option>
                  <option>Mariage</option>
                  <option>Fiançailles</option>
                  <option>Anniversaire</option>
                  <option>Baptême</option>
                  <option>Entreprise</option>
                  <option>Réception</option>
                  <option>Traiteur VIP</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brown">Message</label>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-brown/15 bg-beige/50 px-4 py-3 text-sm outline-none transition focus:border-gold"
                  {...register('message', { required: 'Message requis' })}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi…' : 'Envoyer la demande'}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
