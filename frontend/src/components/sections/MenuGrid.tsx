import { useState } from 'react'
import { Check, Clock, Coffee, Moon, Plus, Star, Sun, type LucideIcon } from 'lucide-react'
import { Bi, BiLabel } from '@/components/Bi'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { useCatalog } from '@/context/CatalogContext'
import { dishMeals, dishSizes, type Dish, type DishMeal, type DishSize } from '@/data/content'
import { cn } from '@/lib/utils'

function DishCard({ dish }: { dish: Dish }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<DishSize>('medium')
  const price = dish.prices[size]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(16,16,16,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(16,16,16,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name || dish.nameAr}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {dish.popular && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-ink">
            <BiLabel ar="الأكثر طلباً" fr="Populaire" />
          </span>
        )}
      </div>
      <div dir="rtl" className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs text-brown/70">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {dish.rating.toFixed(1)}
          </span>
          {dish.prepTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span dir="rtl" lang="ar">
                {dish.prepTime.replace('min', 'دقيقة')}
              </span>
            </span>
          )}
        </div>
        <h3 className="font-display text-xl font-bold text-ink">
          <Bi ar={dish.nameAr} fr={dish.name} frClassName="text-[0.8em] font-semibold" />
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/70">
          <Bi ar={dish.descriptionAr} fr={dish.description} frClassName="text-[0.9em]" />
        </p>

        <div role="radiogroup" aria-label="Taille" className="mt-4 grid grid-cols-3 gap-1.5 rounded-2xl bg-beige p-1">
          {dishSizes.map((s) => {
            const active = s.value === size
            return (
              <button
                key={s.value}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={`${s.fr} — ${dish.prices[s.value].toFixed(2)}`}
                onClick={() => setSize(s.value)}
                className={cn(
                  'flex min-h-11 flex-col items-center justify-center rounded-xl px-1 py-1.5 text-sm font-semibold leading-tight transition',
                  active ? 'bg-green text-beige shadow-sm' : 'text-brown hover:bg-white/70',
                )}
              >
                <span lang="ar">{s.ar}</span>
                <span dir="ltr" className={cn('text-[0.7rem] font-medium', active ? 'text-beige/75' : 'text-brown/60')}>
                  {s.fr}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-bold text-green" aria-live="polite">
            <Bi
              ar={`${price} درهم`}
              fr={price.toFixed(2)}
              arClassName="text-lg"
              frClassName="mt-0 text-xs font-semibold"
            />
          </p>
          <Button
            size="sm"
            variant="gold"
            className="h-12 px-5"
            aria-label={`Ajouter ${dish.name || dish.nameAr} (${dishSizes.find((s) => s.value === size)?.fr}) au panier`}
            onClick={() => addItem(dish, size)}
          >
            <Plus className="h-4 w-4" />
            <BiLabel ar="أضف" fr="Ajouter" className="text-sm" />
          </Button>
        </div>
      </div>
    </article>
  )
}

const mealStyles: Record<DishMeal, { icon: LucideIcon; card: string; badge: string; count: string }> = {
  breakfast: {
    icon: Coffee,
    card: 'bg-[radial-gradient(circle_at_80%_15%,#fff3c4_0%,transparent_45%),linear-gradient(160deg,#f3d27a_0%,#e2a73f_55%,#b9772a_100%)] text-ink',
    badge: 'bg-white/45 text-brown',
    count: 'text-brown/80',
  },
  lunch: {
    icon: Sun,
    card: 'bg-[radial-gradient(circle_at_80%_15%,rgba(232,201,106,0.45)_0%,transparent_45%),linear-gradient(160deg,#17664f_0%,#0e4738_55%,#0a3429_100%)] text-beige',
    badge: 'bg-gold/20 text-gold-light',
    count: 'text-beige/75',
  },
  dinner: {
    icon: Moon,
    card: 'bg-[radial-gradient(circle_at_80%_15%,rgba(212,175,55,0.3)_0%,transparent_40%),linear-gradient(160deg,#2b2440_0%,#171726_55%,#101010_100%)] text-beige',
    badge: 'bg-gold/15 text-gold',
    count: 'text-beige/70',
  },
}

function MealCard({
  meal,
  count,
  active,
  dimmed,
  onSelect,
}: {
  meal: (typeof dishMeals)[number]
  count: number
  active: boolean
  dimmed: boolean
  onSelect: () => void
}) {
  const style = mealStyles[meal.value]
  const Icon = style.icon

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${meal.fr} — ${count} plat${count > 1 ? 's' : ''}`}
      onClick={onSelect}
      className={cn(
        'relative flex min-h-40 flex-col items-center justify-center gap-2 overflow-hidden rounded-[22px] px-2 py-5 text-center shadow-[0_14px_40px_rgba(16,16,16,0.14)] transition-all duration-300 sm:min-h-52 sm:gap-3 sm:rounded-[28px]',
        style.card,
        active ? 'scale-[1.02] ring-4 ring-gold ring-offset-2 ring-offset-cream' : 'hover:-translate-y-1',
        dimmed && 'opacity-60 saturate-50 hover:opacity-90 hover:saturate-100',
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-[16px] border border-current opacity-15 sm:inset-3 sm:rounded-[22px]"
      />
      {active && (
        <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink shadow sm:left-4 sm:top-4 sm:h-8 sm:w-8">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}
      <span className={cn('flex h-11 w-11 items-center justify-center rounded-full sm:h-16 sm:w-16', style.badge)}>
        <Icon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.75} />
      </span>
      <span className="font-display text-xl font-bold leading-tight sm:text-4xl">
        <Bi
          ar={meal.ar}
          fr={meal.fr}
          frClassName="mt-0.5 font-sans text-[0.5em] font-semibold sm:text-[0.42em]"
        />
      </span>
      <span className={cn('text-[11px] font-semibold leading-tight sm:text-sm', style.count)}>
        <Bi
          ar={`${count} ${count === 1 ? 'طبق' : 'أطباق'}`}
          fr={`${count} plat${count > 1 ? 's' : ''}`}
          frClassName="mt-0 text-[0.9em]"
        />
      </span>
    </button>
  )
}

export function MenuGrid() {
  const { dishes, dishesLoading, dishesError } = useCatalog()
  const [meal, setMeal] = useState<DishMeal | null>(null)
  const selectedMeal = dishMeals.find((m) => m.value === meal)
  const visibleDishes = meal ? dishes.filter((d) => d.meals.includes(meal)) : dishes

  return (
    <section id="menu" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-6">
            {dishMeals.map((m) => (
              <MealCard
                key={m.value}
                meal={m}
                count={dishes.filter((d) => d.meals.includes(m.value)).length}
                active={meal === m.value}
                dimmed={meal !== null && meal !== m.value}
                onSelect={() => setMeal((current) => (current === m.value ? null : m.value))}
              />
            ))}
          </div>
        </Reveal>

        {selectedMeal && (
          <div dir="rtl" className="mt-6 flex items-center justify-between gap-3">
            <p className="font-display text-2xl font-bold text-green">
              <Bi ar={selectedMeal.ar} fr={selectedMeal.fr} frClassName="mt-0 font-sans text-[0.55em] font-semibold" />
            </p>
            <button
              type="button"
              onClick={() => setMeal(null)}
              className="rounded-full border border-green/25 bg-white px-4 py-2 text-sm font-semibold text-green transition hover:bg-green hover:text-beige"
            >
              <BiLabel ar="كل الأطباق" fr="Tous les plats" />
            </button>
          </div>
        )}

        {dishesLoading ? (
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[460px] animate-pulse rounded-[20px] bg-white/70" />
            ))}
          </div>
        ) : dishesError ? (
          <p className="mt-10 text-center text-brown/70">
            <Bi ar="تعذر تحميل القائمة حالياً." fr={dishesError} frClassName="text-sm" />
          </p>
        ) : visibleDishes.length === 0 ? (
          <p className="mt-10 rounded-[20px] bg-white/70 px-4 py-10 text-center text-brown/70">
            {meal ? (
              <Bi ar="لا توجد أطباق في هذه الوجبة حالياً." fr="Aucun plat pour ce repas pour le moment." frClassName="text-sm" />
            ) : (
              <Bi ar="قائمة الأطباق قريباً." fr="Notre carte arrive bientôt." frClassName="text-sm" />
            )}
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {visibleDishes.map((dish, i) => (
              <Reveal key={`${meal ?? 'all'}-${dish.id}`} delay={(i % 4) * 0.05}>
                <DishCard dish={dish} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
