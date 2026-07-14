import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[20px] text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-ink shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:scale-[1.03] hover:bg-gold-light hover:shadow-[0_10px_40px_rgba(212,175,55,0.5)] active:scale-[0.98]',
        green:
          'bg-green text-beige shadow-[0_8px_30px_rgba(14,71,56,0.35)] hover:scale-[1.03] hover:bg-green-deep hover:shadow-[0_10px_40px_rgba(14,71,56,0.45)] active:scale-[0.98]',
        outline:
          'border border-gold/50 bg-transparent text-gold hover:border-gold hover:bg-gold/10 hover:scale-[1.02]',
        ghost: 'bg-transparent text-beige hover:bg-white/10',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
