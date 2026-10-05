import {
  Award,
  Flame,
  Gem,
  ShoppingBasket,
  Sparkles,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import { Bi, SectionHeading } from '@/components/Bi'
import { Reveal } from '@/components/Reveal'
import { whyUs } from '@/data/content'

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Award,
  ShoppingBasket,
  Timer,
  Sparkles,
  Gem,
}

export function WhyUs() {
  return (
    <section id="pourquoi" className="bg-green py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading
            dark
            eyebrowAr="ما يميزنا"
            eyebrow="Notre différence"
            titleAr="لماذا تختاروننا"
            title="Pourquoi nous choisir"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Sparkles
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.05}>
                <article dir="rtl" className="h-full rounded-[20px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-gold">
                    <Bi ar={item.titleAr} fr={item.title} frClassName="text-[0.8em] font-semibold" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-beige/80">
                    <Bi ar={item.descriptionAr} fr={item.description} frClassName="text-[0.9em]" />
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
