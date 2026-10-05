import { Bi, SectionHeading } from '@/components/Bi'
import { Reveal } from '@/components/Reveal'
import { galleryImages } from '@/data/content'
import { cn } from '@/lib/utils'

export function Gallery() {
  return (
    <section id="galerie" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrowAr="معرض الصور"
            eyebrow="Galerie"
            titleAr="أجواء ونكهات"
            title="Atmosphère & saveurs"
          />
        </Reveal>

        <div className="mt-10 columns-2 gap-3 sm:mt-12 sm:gap-4 lg:columns-3">
          {galleryImages.map((img, i) => (
            <Reveal key={img.id} delay={(i % 3) * 0.05} className="mb-3 break-inside-avoid sm:mb-4">
              <figure
                className={cn(
                  'group relative overflow-hidden rounded-2xl sm:rounded-[20px]',
                  img.span === 'tall' && 'h-[240px] sm:h-[320px]',
                  img.span === 'wide' && 'h-[160px] sm:h-[220px]',
                  img.span === 'normal' && 'h-[180px] sm:h-[240px]',
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-4 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                  <span className="text-xs font-medium text-beige sm:text-sm">
                    <Bi ar={img.altAr} fr={img.alt} frClassName="mt-0 text-[0.85em]" />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
