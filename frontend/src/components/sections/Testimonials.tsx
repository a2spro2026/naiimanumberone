import { Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Reveal } from '@/components/Reveal'
import { testimonials } from '@/data/content'
import 'swiper/css'
import 'swiper/css/pagination'

export function Testimonials() {
  return (
    <section id="temoignages" className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            Avis clients
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Ils nous font confiance
          </h2>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <article className="flex h-full flex-col rounded-[20px] bg-white p-7 shadow-[0_12px_40px_rgba(16,16,16,0.06)]">
                  <div className="mb-4 flex gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold" />
                    ))}
                  </div>
                  <p className="flex-1 font-display text-lg italic leading-relaxed text-ink/90">
                    “{t.comment}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-brown/70">{t.role}</p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  )
}
