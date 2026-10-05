import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Coffee, ImagePlus, Moon, Palette, Pencil, Plus, Sun, Trash2, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DishFormModal } from '@/components/admin/DishFormModal'
import { useAdminLang } from '@/context/AuthContext'
import { useCatalog } from '@/context/CatalogContext'
import { dishMeals, dishSizes, type Dish, type DishMeal } from '@/data/content'
import { ApiError } from '@/lib/api'
import { blobToDataUrl, resizeImage } from '@/lib/image'
import { cn } from '@/lib/utils'

const CATEGORY_IMAGE_SIZE = 600

const mealIcons: Record<DishMeal, LucideIcon> = { breakfast: Coffee, lunch: Sun, dinner: Moon }

const inputClass =
  'w-full rounded-2xl border border-brown/15 bg-beige/50 px-3 py-2.5 outline-none focus:border-gold'

const overlayClass =
  'absolute flex items-center justify-center bg-black/45 transition [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100'

export function HabillagePage() {
  const { categories, dishes, dishesLoading, dishesError, updateCategory, resetCategories, deleteDish } =
    useCatalog()
  const { ar, t } = useAdminLang()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Dish | null>(null)
  const [meal, setMeal] = useState<DishMeal>('breakfast')
  const currentMeal = dishMeals.find((m) => m.value === meal) ?? dishMeals[0]
  const mealDishes = dishes.filter((d) => d.meals.includes(meal))

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (dish: Dish) => {
    setEditing(dish)
    setFormOpen(true)
  }

  const dishLabel = (dish: Dish) => (ar ? dish.nameAr : dish.name || dish.nameAr)

  const remove = async (dish: Dish) => {
    const question = t(
      `Supprimer le plat « ${dishLabel(dish)} » du menu ?`,
      `حذف الطبق « ${dishLabel(dish)} » من القائمة؟`,
    )
    if (!window.confirm(question)) return
    try {
      await deleteDish(dish.id)
    } catch (err) {
      window.alert(ar ? 'تعذر الحذف.' : err instanceof ApiError ? err.message : 'Suppression impossible.')
    }
  }

  const changeCategoryImage = async (id: string, file: File) => {
    try {
      const image = await blobToDataUrl(await resizeImage(file, CATEGORY_IMAGE_SIZE))
      updateCategory(id, { image })
    } catch (err) {
      window.alert(ar ? 'تعذرت قراءة الصورة.' : err instanceof Error ? err.message : 'Image illisible.')
    }
  }

  const count = mealDishes.length
  const mealName = t(currentMeal.fr, currentMeal.ar)

  return (
    <div dir={ar ? 'rtl' : undefined} lang={ar ? 'ar' : undefined} className="space-y-10">
      <div>
        {!ar && (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
            <Palette className="h-3.5 w-3.5" />
            Configuration
          </div>
        )}
        <h1 className="font-display text-3xl text-green sm:text-4xl">{t('Habillage', 'الأطباق')}</h1>
        <p className="mt-2 max-w-2xl text-sm text-brown/70">
          {t(
            'Gérez les plats du menu et les photos affichées sur le site public.',
            'أضف الأطباق وعدّلها كما تظهر في الموقع.',
          )}
        </p>
      </div>

      <section className="space-y-4">
        <div role="tablist" aria-label={t('Repas', 'الوجبات')} className="grid grid-cols-3 gap-2 rounded-[20px] bg-white p-1.5 shadow-sm">
          {dishMeals.map((m) => {
            const Icon = mealIcons[m.value]
            const active = m.value === meal
            const total = dishes.filter((d) => d.meals.includes(m.value)).length
            return (
              <button
                key={m.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMeal(m.value)}
                className={cn(
                  'flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-2 font-semibold transition',
                  active ? 'bg-green text-beige shadow' : 'text-brown hover:bg-beige',
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                <span className={ar ? 'text-base' : 'text-sm'}>{t(m.fr, m.ar)}</span>
                <span className={cn('text-xs font-medium', active ? 'text-beige/70' : 'text-brown/55')}>{total}</span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink">{mealName}</h2>
            <p className="text-sm text-brown/60">
              {dishesLoading
                ? t('Chargement…', 'جارٍ التحميل…')
                : t(
                    `${count} plat${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''} sur le site`,
                    `عدد الأطباق في الموقع: ${count}`,
                  )}
            </p>
          </div>
          <Button variant="gold" className="h-12 w-full text-base sm:w-auto" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            {t(`Ajouter un plat (${currentMeal.fr})`, `إضافة طبق إلى ${currentMeal.ar}`)}
          </Button>
        </div>

        {dishesError && <p className="text-sm text-red-600">{t(dishesError, 'تعذر تحميل الأطباق.')}</p>}

        {!dishesLoading && !dishesError && count === 0 && (
          <p className="rounded-[20px] border border-dashed border-brown/20 bg-white/60 px-4 py-8 text-center text-sm text-brown/60">
            {t(
              `Aucun plat pour le ${currentMeal.fr.toLowerCase()}. Cliquez sur « Ajouter un plat ».`,
              `لا توجد أطباق في ${currentMeal.ar}. اضغط على « إضافة طبق ».`,
            )}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mealDishes.map((dish) => (
            <article
              key={dish.id}
              className="flex flex-col overflow-hidden rounded-[20px] border border-brown/10 bg-white shadow-sm"
            >
              <img src={dish.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col p-4">
                <p dir="rtl" lang="ar" className="font-display text-lg font-bold text-ink">
                  {dish.nameAr}
                </p>
                {!ar && dish.name && <p className="text-sm font-semibold text-brown">{dish.name}</p>}
                <p className="mt-1 line-clamp-2 text-xs text-brown/60">
                  {ar ? dish.descriptionAr : dish.description || dish.descriptionAr}
                </p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {dishSizes.map((s) => (
                    <div key={s.value} className="rounded-xl bg-beige/70 px-1 py-2">
                      <dt className="text-[11px] font-medium text-brown/60">{t(s.fr, s.ar)}</dt>
                      <dd dir="ltr" className="text-sm font-bold text-green">
                        {dish.prices[s.value].toFixed(2)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="h-11 flex-1 border-green/30 text-green"
                    onClick={() => openEdit(dish)}
                  >
                    <Pencil className="h-4 w-4" />
                    {t('Modifier', 'تعديل')}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 border-red-200 text-red-600 hover:bg-red-50"
                    aria-label={t(`Supprimer ${dishLabel(dish)}`, `حذف ${dishLabel(dish)}`)}
                    title={t('Supprimer', 'حذف')}
                    onClick={() => remove(dish)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl text-ink">{t('Catégories gourmandes', 'الأصناف')}</h2>
          <Button
            variant="outline"
            className="w-full border-brown/20 text-brown sm:w-auto"
            onClick={() => {
              const question = t(
                'Réinitialiser les photos et titres des catégories ?',
                'إرجاع الصور والعناوين الأصلية للأصناف؟',
              )
              if (window.confirm(question)) resetCategories()
            }}
          >
            {t('Réinitialiser les catégories', 'إرجاع الأصناف الأصلية')}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <article key={cat.id} className="rounded-[20px] border border-brown/10 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <label className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full ring-2 ring-gold/40">
                  <img src={cat.image} alt="" className="h-full w-full object-cover" />
                  <span className={`${overlayClass} inset-x-0 bottom-0 h-7 [@media(hover:hover)]:inset-0 [@media(hover:hover)]:h-auto`}>
                    <ImagePlus className="h-4 w-4 text-white" />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) changeCategoryImage(cat.id, file)
                      e.target.value = ''
                    }}
                  />
                </label>
                <div className="min-w-0 flex-1 space-y-2">
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-brown">{t('Titre en arabe', 'الاسم بالعربية')}</span>
                    <input
                      dir="rtl"
                      lang="ar"
                      value={cat.nameAr ?? ''}
                      onChange={(e) => updateCategory(cat.id, { nameAr: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                  {!ar && (
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-brown">Titre en français</span>
                      <input
                        value={cat.name}
                        onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                        className={inputClass}
                      />
                    </label>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {formOpen && (
          <DishFormModal
            key={editing?.id ?? `new-${meal}`}
            dish={editing}
            defaultMeal={meal}
            onClose={() => setFormOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
