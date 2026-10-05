import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChefHat, Star } from 'lucide-react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const yChef = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img
          src="/images/hero-ceremony.webp"
          alt=""
          className="h-full w-full scale-105 object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
        <div className="absolute inset-0 bg-ink/30" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl content-start items-center gap-6 px-4 pb-12 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-28 lg:content-center lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="text-center text-beige lg:text-right">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            NA3IMA-numberONE
          </motion.p>

          <motion.h1
            dir="rtl"
            lang="ar"
            className="font-arabic leading-[1.45]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <span className="slogan-ar block text-[2.9rem] font-bold min-[380px]:text-[3.3rem] sm:text-6xl lg:text-7xl">
              بنّة الدار المغربية
            </span>
            <span className="mt-1 block text-[2rem] text-beige min-[380px]:text-4xl sm:text-5xl lg:text-[3.4rem]">
              فكل فرحة ديالكم
            </span>
          </motion.h1>

          <motion.div
            aria-hidden
            className="mx-auto mt-6 flex max-w-xs items-center gap-3 lg:ml-auto lg:mr-0"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
            <span className="h-2.5 w-2.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-[min(78vw,340px)] sm:w-[380px] lg:-mt-24 lg:w-[420px]"
          style={{ y: yChef }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-gold/20 blur-3xl" />

          {/* Offset outline arch */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] translate-x-3 translate-y-3 rounded-t-full rounded-b-[28px] border border-gold/40 sm:translate-x-4 sm:translate-y-4" />

          <div className="relative aspect-[5/7] overflow-hidden rounded-b-[28px]">
            {/* Moroccan arch */}
            <div className="absolute inset-x-0 bottom-0 h-[80%] overflow-hidden rounded-t-full rounded-b-[28px] border-2 border-gold/80 bg-gradient-to-b from-green via-green-deep to-ink shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <div className="zellige-pattern absolute inset-0 opacity-70" />
              <div className="absolute inset-3 rounded-t-full rounded-b-[20px] border border-gold/30" />
            </div>

            <img
              src="/images/hero-chef-tagine.webp"
              alt="Chef NA3IMA présentant un tajine traditionnel"
              className="absolute inset-x-0 top-0 z-10 w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]"
              fetchPriority="high"
            />

            <div className="absolute inset-x-0 bottom-0 z-20 h-1/5 rounded-b-[28px] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          </div>

          <motion.div
            className="glass absolute -left-3 top-[38%] z-30 flex items-center gap-2 rounded-2xl px-3 py-2 text-beige shadow-xl sm:-left-10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold text-ink">
              <ChefHat className="h-4 w-4" />
            </span>
            <span className="text-left leading-tight">
              <span dir="rtl" lang="ar" className="block text-sm font-semibold">
                الشيف نعيمة
              </span>
              <span className="block text-[11px] text-beige/70">Chef NA3IMA</span>
            </span>
          </motion.div>

          <motion.div
            className="glass absolute -right-2 bottom-[16%] z-30 rounded-2xl px-3 py-2 text-beige shadow-xl sm:-right-8"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <span className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-gold" />
              ))}
            </span>
            <span className="mt-0.5 block text-xs font-semibold" dir="rtl" lang="ar">
              بنّة بلدية أصيلة
            </span>
            <span className="block text-[10px] text-beige/70">Saveur authentique</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
