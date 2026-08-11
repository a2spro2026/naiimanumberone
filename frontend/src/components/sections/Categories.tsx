import { Reveal } from '@/components/Reveal'
import { useCatalog } from '@/context/CatalogContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

export function Categories() {
  const { categories } = useCatalog()

  return (
    <section id="categories" className="bg-beige py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            Nos signatures
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Catégories gourmandes
          </h2>
        </Reveal>

        <div className="mt-12 hidden flex-wrap justify-center gap-6 md:flex lg:gap-8">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.04}>
              <a href="#menu" className="group flex w-28 flex-col items-center gap-3 lg:w-32">
                <div className="overflow-hidden rounded-full border-2 border-gold/40 p-1 shadow-md transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_10px_30px_rgba(212,175,55,0.35)]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-24 w-24 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 lg:h-28 lg:w-28"
                    loading="lazy"
                  />
                </div>
                <span className="text-center text-sm font-semibold text-ink">{cat.name}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Swiper modules={[FreeMode]} freeMode spaceBetween={16} slidesPerView={2.4}>
            {categories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <a href="#menu" className="flex flex-col items-center gap-2">
                  <div className="overflow-hidden rounded-full border-2 border-gold/40 p-1">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-24 w-24 rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-center text-xs font-semibold">{cat.name}</span>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
