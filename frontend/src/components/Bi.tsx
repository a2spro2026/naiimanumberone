import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BiProps = {
  ar: ReactNode
  fr: ReactNode
  arClassName?: string
  frClassName?: string
}

/**
 * Arabic line first, French translation underneath (smaller, muted).
 * The French block stays RTL so it aligns on the same side as the Arabic line
 * (right by default, centered when an ancestor is centered); the inner LTR span keeps
 * French punctuation in order.
 */
export function Bi({ ar, fr, arClassName, frClassName }: BiProps) {
  return (
    <span dir="rtl" className="block">
      <span lang="ar" className={cn('block', arClassName)}>
        {ar}
      </span>
      {fr !== '' && fr != null && (
        <span lang="fr" className={cn('mt-1 block text-[0.72em] opacity-75', frClassName)}>
          <span dir="ltr">{fr}</span>
        </span>
      )}
    </span>
  )
}

/** Compact two-line label for buttons and small UI. */
export function BiLabel({ ar, fr, className }: { ar: ReactNode; fr: ReactNode; className?: string }) {
  return (
    <span className={cn('flex flex-col items-center leading-tight', className)}>
      <span dir="rtl" lang="ar">
        {ar}
      </span>
      <span lang="fr" className="text-[0.72em] font-medium opacity-75">
        {fr}
      </span>
    </span>
  )
}

type SectionHeadingProps = {
  eyebrowAr?: string
  eyebrow?: string
  titleAr: string
  title: string
  descriptionAr?: string
  description?: string
  dark?: boolean
}

export function SectionHeading({
  eyebrowAr,
  eyebrow,
  titleAr,
  title,
  descriptionAr,
  description,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className="text-center">
      {eyebrow && eyebrowAr && (
        <p
          className={cn(
            'mb-3 text-sm font-semibold',
            dark ? 'text-gold' : 'text-brown',
          )}
        >
          <Bi
            ar={eyebrowAr}
            fr={eyebrow}
            frClassName="mt-0.5 text-[0.7rem] uppercase tracking-[0.25em]"
          />
        </p>
      )}
      <h2
        className={cn(
          'font-display text-3xl font-bold sm:text-4xl lg:text-5xl',
          dark ? 'text-beige' : 'text-green',
        )}
      >
        <Bi ar={titleAr} fr={title} frClassName="mt-2 text-[0.6em] font-semibold" />
      </h2>
      {description && descriptionAr && (
        <p className={cn('mx-auto mt-4 max-w-2xl', dark ? 'text-beige/75' : 'text-brown/75')}>
          <Bi ar={descriptionAr} fr={description} frClassName="text-[0.85em]" />
        </p>
      )}
    </div>
  )
}
