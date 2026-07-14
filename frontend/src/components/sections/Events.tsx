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
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            Traiteur événementiel
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Nous préparons tous vos événements.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event, i) => {
            const Icon = iconMap[event.icon] ?? Sparkles
            return (
              <Reveal key={event.id} delay={(i % 3) * 0.06}>
                <article className="group relative overflow-hidden rounded-[20px] shadow-lg">
                  <div className="aspect-[16/11] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-beige">
                    <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/20 text-gold backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl">{event.title}</h3>
                    <p className="mt-2 text-sm text-beige/80">{event.description}</p>
                    <Button asChild variant="gold" size="sm" className="mt-4">
                      <a href="#contact">Réserver</a>
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
