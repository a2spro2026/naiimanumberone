import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Clock3, Mail, MapPin, Phone, Send, Share2 } from 'lucide-react'
import { Bi, BiLabel, SectionHeading } from '@/components/Bi'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from '@/data/content'

type ContactForm = {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
}

const eventTypes = [
  { fr: 'Mariage', ar: 'عرس' },
  { fr: 'Fiançailles', ar: 'خطوبة' },
  { fr: 'Anniversaire', ar: 'عيد ميلاد' },
  { fr: 'Baptême', ar: 'عقيقة' },
  { fr: 'Entreprise', ar: 'شركة' },
  { fr: 'Réception', ar: 'حفل خاص' },
  { fr: 'Traiteur VIP', ar: 'خدمة VIP' },
  { fr: 'Autre', ar: 'أخرى' },
]

const inputClass =
  'w-full rounded-2xl border border-brown/15 bg-beige/50 px-4 py-3 text-sm outline-none transition focus:border-gold'

function FieldLabel({ ar, fr }: { ar: string; fr: string }) {
  return (
    <span className="mb-1.5 block text-base font-semibold text-brown">
      <Bi ar={ar} fr={fr} frClassName="mt-0 text-xs font-medium" />
    </span>
  )
}

function FieldError({ show, ar, fr }: { show: boolean; ar: string; fr: string }) {
  if (!show) return null
  return (
    <p className="mt-1 text-sm text-red-600">
      <Bi ar={ar} fr={fr} frClassName="mt-0 text-xs" />
    </p>
  )
}

function InfoItem({ icon, ar, fr, children }: { icon: ReactNode; ar: string; fr: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div>
        <p className="font-semibold">
          <Bi ar={ar} fr={fr} frClassName="mt-0 text-[0.8em] font-medium" />
        </p>
        <div className="mt-1 text-beige/80">{children}</div>
      </div>
    </li>
  )
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
          <SectionHeading
            eyebrowAr="اتصل بنا"
            eyebrow="Contact"
            titleAr="لنخطط لمناسبتكم"
            title="Planifions votre événement"
          />
        </Reveal>

        <Reveal className="mt-12" delay={0.08}>
          <div className="grid overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(16,16,16,0.08)] lg:grid-cols-2">
            <div dir="rtl" className="bg-green p-6 text-beige sm:p-8 lg:p-10">
              <h3 className="font-display text-3xl text-gold">NA3IMA-numberONE</h3>
              <p className="mt-3 max-w-sm text-beige/75">
                <Bi
                  ar="طبخ مغربي استثنائي للأفراد وللمناسبات."
                  fr="Cuisine marocaine d'exception pour particuliers et événements."
                  frClassName="text-[0.85em]"
                />
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <InfoItem icon={<Phone className="h-5 w-5" />} ar="الهاتف" fr="Téléphone">
                  <a href={`tel:${CONTACT_PHONE}`} dir="ltr" className="hover:text-gold">
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </InfoItem>
                <InfoItem icon={<Send className="h-5 w-5" />} ar="واتساب" fr="WhatsApp">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-gold">
                    <Bi ar="تواصلوا معنا" fr="Discutez avec nous" frClassName="mt-0 text-[0.9em]" />
                  </a>
                </InfoItem>
                <InfoItem icon={<Mail className="h-5 w-5" />} ar="البريد الإلكتروني" fr="Email">
                  <a href="mailto:contact@na3ima.ma" className="hover:text-gold">
                    contact@na3ima.ma
                  </a>
                </InfoItem>
                <InfoItem icon={<MapPin className="h-5 w-5" />} ar="العنوان" fr="Adresse">
                  <Bi ar="الدار البيضاء، المغرب" fr="Casablanca, Maroc" frClassName="mt-0 text-[0.9em]" />
                </InfoItem>
                <InfoItem icon={<Clock3 className="h-5 w-5" />} ar="أوقات العمل" fr="Horaires">
                  <Bi
                    ar="من الإثنين إلى الأحد · 09:00 – 23:00"
                    fr="Lun–Dim · 09:00 – 23:00"
                    frClassName="mt-0 text-[0.9em]"
                  />
                </InfoItem>
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 sm:p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold text-ink">
                <Bi ar="طلب عرض سعر" fr="Demande de devis" frClassName="text-[0.75em] font-semibold" />
              </h3>
              {sent && (
                <p className="rounded-xl bg-green/10 px-4 py-3 text-sm text-green">
                  <Bi
                    ar="شكراً! سنتصل بكم قريباً."
                    fr="Merci ! Nous vous recontactons très vite."
                    frClassName="text-[0.9em]"
                  />
                </p>
              )}
              <label className="block">
                <FieldLabel ar="الاسم" fr="Nom" />
                <input
                  autoComplete="name"
                  className={inputClass}
                  {...register('name', { required: true })}
                />
                <FieldError show={!!errors.name} ar="الاسم مطلوب" fr="Nom requis" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <FieldLabel ar="البريد الإلكتروني" fr="Email" />
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className={inputClass}
                    {...register('email', { required: true })}
                  />
                  <FieldError show={!!errors.email} ar="البريد مطلوب" fr="Email requis" />
                </label>
                <label className="block">
                  <FieldLabel ar="الهاتف" fr="Téléphone" />
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                    {...register('phone', { required: true })}
                  />
                  <FieldError show={!!errors.phone} ar="الهاتف مطلوب" fr="Téléphone requis" />
                </label>
              </div>
              <label className="block">
                <FieldLabel ar="نوع المناسبة" fr="Type d'événement" />
                <select
                  className={inputClass}
                  {...register('eventType', { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    اختاروا… — Sélectionnez…
                  </option>
                  {eventTypes.map((t) => (
                    <option key={t.fr} value={t.fr}>
                      {t.ar} — {t.fr}
                    </option>
                  ))}
                </select>
                <FieldError show={!!errors.eventType} ar="اختاروا نوع المناسبة" fr="Choisissez un type" />
              </label>
              <label className="block">
                <FieldLabel ar="الرسالة" fr="Message" />
                <textarea
                  rows={4}
                  className={`${inputClass} resize-none`}
                  {...register('message', { required: true })}
                />
                <FieldError show={!!errors.message} ar="الرسالة مطلوبة" fr="Message requis" />
              </label>
              <Button type="submit" variant="gold" size="lg" className="h-16 w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <BiLabel ar="جارٍ الإرسال…" fr="Envoi…" />
                ) : (
                  <BiLabel ar="إرسال الطلب" fr="Envoyer la demande" />
                )}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
