import { Reveal } from '@/components/Reveal'
import { processSteps } from '@/data/content'

export function Process() {
  return (
    <section id="processus" className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brown">
            Comment ça marche
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-green sm:text-4xl lg:text-5xl">
            Processus de commande
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent lg:block" />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="relative flex h-full flex-col items-center rounded-[20px] bg-white p-5 text-center shadow-md">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-beige font-display text-lg font-bold text-green">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-brown/70">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
