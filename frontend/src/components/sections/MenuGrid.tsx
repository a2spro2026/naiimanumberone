import { Clock, Star } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { dishes } from '@/data/content'
import { formatPrice } from '@/lib/utils'

export function MenuGrid() {
  const { addItem } = useCart()

  return (
    <section id="menu" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            La carte
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Menu des plats
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-brown/75">
            Des recettes traditionnelles préparées pour vos tables familières et vos plus grands
            événements.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dishes.map((dish, i) => (
            <Reveal key={dish.id} delay={(i % 4) * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(16,16,16,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(16,16,16,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {dish.popular && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                      Populaire
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center justify-between gap-2 text-xs text-brown/70">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                      {dish.rating.toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {dish.prepTime}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-ink">{dish.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/70">
                    {dish.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-lg font-bold text-green">{formatPrice(dish.price)}</p>
                    <Button size="sm" variant="gold" onClick={() => addItem(dish)}>
                      Ajouter
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
