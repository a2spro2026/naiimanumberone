import { Leaf, ChefHat, Truck, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { advantages } from '@/data/content'

const icons = { Leaf, ChefHat, Truck, ShieldCheck } as const

export function Advantages() {
  return (
    <section className="zellige-pattern bg-green py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {advantages.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons]
          return (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="group rounded-[20px] border border-gold/20 bg-green-deep/50 p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-xl text-gold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-beige/75">{item.description}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
