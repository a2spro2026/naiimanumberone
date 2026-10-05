import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Check, ImagePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdminLang } from '@/context/AuthContext'
import { useCatalog } from '@/context/CatalogContext'
import { dishMeals, dishSizes, type Dish, type DishMeal, type DishSize } from '@/data/content'
import { ApiError } from '@/lib/api'
import { resizeImage } from '@/lib/image'
import { cn } from '@/lib/utils'

const MAX_UPLOAD_SIZE = 1200

type FormState = {
  nameAr: string
  name: string
  descriptionAr: string
  description: string
  prices: Record<DishSize, string>
  meals: DishMeal[]
}

type TextField = Exclude<keyof FormState, 'prices' | 'meals'>

const fieldClass =
  'w-full rounded-2xl border border-brown/15 bg-beige/60 px-4 py-3 text-sm outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20'

const priceKey: Record<DishSize, string> = {
  small: 'price_small',
  medium: 'price_medium',
  large: 'price_large',
}

const errorKey: Record<TextField, string> = {
  nameAr: 'name_ar',
  name: 'name',
  descriptionAr: 'description_ar',
  description: 'description',
}

function initialState(dish: Dish | null, defaultMeal: DishMeal): FormState {
  return {
    meals: dish ? dish.meals : [defaultMeal],
    nameAr: dish?.nameAr ?? '',
    name: dish?.name ?? '',
    descriptionAr: dish?.descriptionAr ?? '',
    description: dish?.description ?? '',
    prices: {
      small: dish ? String(dish.prices.small) : '',
      medium: dish ? String(dish.prices.medium) : '',
      large: dish ? String(dish.prices.large) : '',
    },
  }
}

export function DishFormModal({
  dish,
  defaultMeal,
  onClose,
}: {
  dish: Dish | null
  defaultMeal: DishMeal
  onClose: () => void
}) {
  const { createDish, saveDish } = useCatalog()
  // The gérant only reads Arabic: French fields are hidden for him (existing French text is kept).
  const { ar, t } = useAdminLang()
  const [form, setForm] = useState<FormState>(() => initialState(dish, defaultMeal))
  const [photo, setPhoto] = useState<{ blob: Blob; preview: string } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.preview)
  }, [photo])

  const clearError = (key: string) =>
    setErrors((e) => (e[key] ? { ...e, [key]: '' } : e))

  const set = (key: TextField) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    clearError(errorKey[key])
  }

  const toggleMeal = (meal: DishMeal) => {
    setForm((f) => ({
      ...f,
      meals: f.meals.includes(meal) ? f.meals.filter((m) => m !== meal) : [...f.meals, meal],
    }))
    clearError('meals')
  }

  const pickPhoto = async (file: File) => {
    try {
      const blob = await resizeImage(file, MAX_UPLOAD_SIZE)
      setPhoto({ blob, preview: URL.createObjectURL(blob) })
      clearError('image')
    } catch (err) {
      const fallback = err instanceof Error ? err.message : 'Image illisible.'
      setErrors((e) => ({ ...e, image: t(fallback, 'تعذرت قراءة الصورة.') }))
    }
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!dish && !photo) next.image = t('Importez une photo du plat.', 'أضف صورة الطبق.')
    if (form.meals.length === 0) next.meals = t('Choisissez au moins un repas.', 'اختر وجبة واحدة على الأقل.')
    if (!form.nameAr.trim()) next.name_ar = t('Le titre en arabe est obligatoire.', 'اسم الطبق إجباري.')
    if (!form.descriptionAr.trim()) {
      next.description_ar = t('La description en arabe est obligatoire.', 'وصف الطبق إجباري.')
    }
    if (!ar) {
      if (!form.name.trim()) next.name = 'Le titre en français est obligatoire.'
      if (!form.description.trim()) next.description = 'La description en français est obligatoire.'
    }
    for (const s of dishSizes) {
      const value = Number(form.prices[s.value].replace(',', '.'))
      if (form.prices[s.value].trim() === '' || Number.isNaN(value) || value < 0) {
        next[priceKey[s.value]] = t(`Prix ${s.fr.toLowerCase()} obligatoire.`, `ثمن ${s.ar} إجباري.`)
      }
    }
    return next
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const clientErrors = validate()
    setErrors(clientErrors)
    setMessage('')
    if (Object.keys(clientErrors).length) return

    const data = new FormData()
    data.append('name_ar', form.nameAr.trim())
    data.append('name', form.name.trim())
    data.append('description_ar', form.descriptionAr.trim())
    data.append('description', form.description.trim())
    for (const s of dishSizes) {
      data.append(priceKey[s.value], form.prices[s.value].replace(',', '.'))
    }
    for (const m of form.meals) data.append('meals[]', m)
    if (photo) data.append('image', photo.blob, 'photo.jpg')

    setSaving(true)
    try {
      if (dish) await saveDish(dish.id, data)
      else await createDish(data)
      onClose()
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.errors).length) {
        setErrors(Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v[0]])))
      } else if (ar) {
        setMessage('تعذر الحفظ. حاول مرة أخرى.')
      } else {
        setMessage(err instanceof ApiError ? err.message : 'Enregistrement impossible.')
      }
    } finally {
      setSaving(false)
    }
  }

  const fieldError = (key: string) =>
    errors[key] ? <p className="mt-1 text-xs text-red-600">{errors[key]}</p> : null

  const preview = photo?.preview ?? dish?.image
  const labelClass = cn('mb-1.5 block font-semibold text-brown', ar ? 'text-base' : 'text-sm')

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      <motion.button
        type="button"
        aria-label={t('Fermer', 'إغلاق')}
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-form-title"
        dir={ar ? 'rtl' : undefined}
        lang={ar ? 'ar' : undefined}
        className="pb-safe-4 relative max-h-[94svh] w-full overflow-y-auto rounded-t-[24px] bg-white shadow-2xl sm:max-w-xl sm:rounded-[24px] sm:pb-0"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brown/10 bg-white px-5 py-4">
          <h2 id="dish-form-title" className="font-display text-2xl text-green">
            {dish ? t('Modifier le plat', 'تعديل الطبق') : t('Ajouter un plat', 'إضافة طبق')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-brown transition hover:bg-brown/10"
            aria-label={t('Fermer', 'إغلاق')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4 px-5 py-5">
          {message && (
            <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {message}
            </p>
          )}

          <div>
            <label
              className={cn(
                'group relative flex aspect-[16/9] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed text-sm font-semibold transition',
                errors.image ? 'border-red-300 bg-red-50/50' : 'border-gold/50 bg-beige/50 hover:border-gold',
              )}
            >
              {preview ? (
                <>
                  <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-white">
                    <ImagePlus className="h-4 w-4" />
                    {t('Changer la photo', 'تغيير الصورة')}
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-gold" />
                  <span className={cn('text-brown', ar && 'text-base')}>{t('Importer la photo', 'إضافة صورة الطبق')}</span>
                  <span className="text-xs font-normal text-brown/60">
                    {t('Galerie ou appareil photo', 'من المعرض أو الكاميرا')}
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label={t('Importer la photo du plat', 'إضافة صورة الطبق')}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) pickPhoto(file)
                  e.target.value = ''
                }}
              />
            </label>
            {fieldError('image')}
          </div>

          <fieldset>
            <legend className={labelClass}>{t('Servi au', 'يقدم في')}</legend>
            <div className="grid grid-cols-3 gap-2">
              {dishMeals.map((m) => {
                const checked = form.meals.includes(m.value)
                return (
                  <label
                    key={m.value}
                    className={cn(
                      'flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-2 py-2 text-center font-semibold transition',
                      ar ? 'text-base' : 'text-sm',
                      checked ? 'border-green bg-green text-beige' : 'border-brown/15 bg-beige/60 text-brown',
                      errors.meals && !checked && 'border-red-300',
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleMeal(m.value)}
                    />
                    {checked && <Check className="h-4 w-4 shrink-0" strokeWidth={3} />}
                    {t(m.fr, m.ar)}
                  </label>
                )
              })}
            </div>
            {fieldError('meals')}
          </fieldset>

          <div className={cn('grid gap-4', !ar && 'sm:grid-cols-2')}>
            <div>
              <label htmlFor="dish-name-ar" className={labelClass}>
                {t('Titre en arabe', 'اسم الطبق')}
              </label>
              <input
                id="dish-name-ar"
                dir="rtl"
                lang="ar"
                value={form.nameAr}
                onChange={(e) => set('nameAr')(e.target.value)}
                className={fieldClass}
              />
              {fieldError('name_ar')}
            </div>
            {!ar && (
              <div>
                <label htmlFor="dish-name" className={labelClass}>
                  Titre en français
                </label>
                <input
                  id="dish-name"
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                  className={fieldClass}
                />
                {fieldError('name')}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="dish-desc-ar" className={labelClass}>
              {t('Description en arabe', 'وصف الطبق')}
            </label>
            <textarea
              id="dish-desc-ar"
              dir="rtl"
              lang="ar"
              rows={2}
              maxLength={500}
              value={form.descriptionAr}
              onChange={(e) => set('descriptionAr')(e.target.value)}
              className={cn(fieldClass, 'resize-none')}
            />
            {fieldError('description_ar')}
          </div>
          {!ar && (
            <div>
              <label htmlFor="dish-desc" className={labelClass}>
                Description en français
              </label>
              <textarea
                id="dish-desc"
                rows={2}
                maxLength={500}
                value={form.description}
                onChange={(e) => set('description')(e.target.value)}
                className={cn(fieldClass, 'resize-none')}
              />
              {fieldError('description')}
            </div>
          )}

          <fieldset>
            <legend className={labelClass}>{t('Prix (MAD)', 'الثمن (درهم)')}</legend>
            <div className="grid grid-cols-3 gap-2">
              {dishSizes.map((s) => (
                <div key={s.value}>
                  <label
                    htmlFor={`dish-price-${s.value}`}
                    className={cn('mb-1 block font-medium text-brown/70', ar ? 'text-sm' : 'text-xs')}
                  >
                    {ar ? s.ar : `${s.fr} · ${s.ar}`}
                  </label>
                  <input
                    id={`dish-price-${s.value}`}
                    type="text"
                    inputMode="decimal"
                    dir="ltr"
                    placeholder="0.00"
                    value={form.prices[s.value]}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.,]/g, '')
                      setForm((f) => ({ ...f, prices: { ...f.prices, [s.value]: value } }))
                      clearError(priceKey[s.value])
                    }}
                    className={cn(fieldClass, 'px-3 text-center', errors[priceKey[s.value]] && 'border-red-300')}
                  />
                  {fieldError(priceKey[s.value])}
                </div>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="h-12 border-brown/30 text-brown" onClick={onClose}>
              {t('Annuler', 'إلغاء')}
            </Button>
            <Button type="submit" variant="gold" className={cn('h-12', ar && 'text-base')} disabled={saving}>
              {saving
                ? t('Enregistrement…', 'جارٍ الحفظ…')
                : dish
                  ? t('Enregistrer', 'حفظ')
                  : t('Ajouter le plat', 'إضافة الطبق')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
