import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const yChef = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img
          src="/images/hero-ceremony.jpg"
          alt=""
          className="h-full w-full scale-105 object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/35" />
        <div className="absolute inset-0 bg-ink/30" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-24">
        <div className="max-w-xl text-beige">
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            NA3IMA-numberONE
          </motion.p>
          <motion.h1
            className="font-display text-4xl leading-[1.08] text-beige sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Découvrez les{' '}
            <span className="text-gradient-gold">Saveurs Authentiques</span> du Maroc
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-beige/80 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Préparation artisanale et livraison de plats marocains traditionnels pour tous vos
            événements.
          </motion.p>

          <motion.div
            className="ornate-frame mt-7 max-w-lg bg-black/30 px-6 py-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <p className="slogan-ar text-2xl font-bold sm:text-3xl" lang="ar">
              مذاق المغرب الأصيل في قلب مناسباتكم
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            <Button asChild variant="gold" size="lg" className="group">
              <a href="#menu">
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
                Commander maintenant
              </a>
            </Button>
            <Button asChild variant="green" size="lg">
              <a href="#menu">Découvrir le menu</a>
            </Button>
          </motion.div>
          <p className="mt-6 text-sm text-beige/60">
            Le goût authentique du Maroc, livré à tous vos événements.
          </p>
        </div>

        <motion.div
          className="relative mx-auto flex w-full max-w-md justify-center lg:max-w-none lg:justify-end"
          style={{ y: yChef }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="pointer-events-none absolute inset-y-8 right-4 left-8 rounded-full bg-gold/25 blur-3xl" />
          <img
            src="/images/hero-chef-tagine.png?v=2"
            alt="Chef NA3IMA présentant un tajine traditionnel"
            className="relative z-10 h-auto w-full max-w-[520px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            fetchPriority="high"
          />        </motion.div>
      </div>
    </section>
  )
}
