import { ImagePlus, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCatalog } from '@/context/CatalogContext'

function readImageFile(file: File, onLoad: (dataUrl: string) => void) {
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') onLoad(reader.result)
  }
  reader.readAsDataURL(file)
}

export function HabillagePage() {
  const { categories, dishes, updateCategory, updateDish, resetCatalog } = useCatalog()

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
            <Palette className="h-3.5 w-3.5" />
            Configuration
          </div>
          <h1 className="font-display text-3xl text-green sm:text-4xl">Habillage</h1>
          <p className="mt-2 max-w-2xl text-sm text-brown/70">
            Modifiez les photos et les titres affichés sur le site public.
          </p>
        </div>
        <Button variant="outline" className="border-brown/20 text-brown" onClick={resetCatalog}>
          Réinitialiser
        </Button>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-2xl text-ink">Catégories gourmandes</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className="rounded-[20px] border border-brown/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <label className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full ring-2 ring-gold/40">
                  <img src={cat.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100">
                    <ImagePlus className="h-5 w-5 text-white" />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) readImageFile(file, (image) => updateCategory(cat.id, { image }))
                    }}
                  />
                </label>
                <label className="min-w-0 flex-1 text-sm">
                  <span className="mb-1.5 block font-medium text-brown">Titre</span>
                  <input
                    value={cat.name}
                    onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                    className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-3 py-2.5 outline-none focus:border-gold"
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl text-ink">Menu des plats</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dishes.map((dish) => (
            <article
              key={dish.id}
              className="overflow-hidden rounded-[20px] border border-brown/10 bg-white shadow-sm"
            >
              <label className="group relative block aspect-[16/9] cursor-pointer overflow-hidden">
                <img src={dish.image} alt="" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100">
                  <ImagePlus className="h-6 w-6 text-white" />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) readImageFile(file, (image) => updateDish(dish.id, { image }))
                  }}
                />
              </label>
              <div className="p-4">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-brown">Titre</span>
                  <input
                    value={dish.name}
                    onChange={(e) => updateDish(dish.id, { name: e.target.value })}
                    className="w-full rounded-2xl border border-brown/15 bg-beige/50 px-3 py-2.5 outline-none focus:border-gold"
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
