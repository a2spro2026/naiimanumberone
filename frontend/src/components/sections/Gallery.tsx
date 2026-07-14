import { Reveal } from '@/components/Reveal'
import { galleryImages } from '@/data/content'
import { cn } from '@/lib/utils'

export function Gallery() {
  return (
    <section id="galerie" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            Galerie
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Atmosphère & saveurs
          </h2>
        </Reveal>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, i) => (
            <Reveal key={img.id} delay={(i % 3) * 0.05} className="mb-4 break-inside-avoid">
              <figure
                className={cn(
                  'group relative overflow-hidden rounded-[20px]',
                  img.span === 'tall' && 'min-h-[320px]',
                  img.span === 'wide' && 'min-h-[220px]',
                  img.span === 'normal' && 'min-h-[240px]',
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-beige">{img.alt}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
