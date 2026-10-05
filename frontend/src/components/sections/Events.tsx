import {
  Baby,
  Building2,
  Cake,
  Crown,
  Gem,
  Heart,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Bi, BiLabel, SectionHeading } from '@/components/Bi'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { events } from '@/data/content'

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Gem,
  Cake,
  Baby,
  Building2,
  Sparkles,
  Crown,
}

export function Events() {
  return (
    <section id="evenements" className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrowAr="ممون الحفلات"
            eyebrow="Traiteur événementiel"
            titleAr="نحضّر لجميع مناسباتكم"
            title="Nous préparons tous vos événements."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event, i) => {
            const Icon = iconMap[event.icon] ?? Sparkles
            return (
              <Reveal key={event.id} delay={(i % 3) * 0.06}>
                <article className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[20px] shadow-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
                  <div dir="rtl" className="relative p-5 pt-24 text-beige sm:p-6 sm:pt-28">
                    <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/20 text-gold backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl font-bold">
                      <Bi ar={event.titleAr} fr={event.title} frClassName="mt-0.5 text-[0.7em]" />
                    </h3>
                    <p className="mt-2 text-sm text-beige/85">
                      <Bi ar={event.descriptionAr} fr={event.description} frClassName="text-[0.9em]" />
                    </p>
                    <Button asChild variant="gold" size="sm" className="mt-4 h-12 px-5">
                      <a href="#contact">
                        <BiLabel ar="احجز" fr="Réserver" className="text-sm" />
                      </a>
                    </Button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
