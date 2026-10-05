import { useState, type ComponentType, type CSSProperties } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

const supportsTextSecurity =
  typeof CSS !== 'undefined' && CSS.supports?.('-webkit-text-security', 'disc')

type SecretInputProps = {
  id: string
  kind: 'login' | 'password'
  value: string
  onChange: (value: string) => void
  visible: boolean
  onToggleVisible: () => void
  icon?: ComponentType<{ className?: string }>
  invalid?: boolean
  className?: string
}

/**
 * Masked input that browsers cannot autofill or offer to save: no `name`, readonly until the
 * user interacts, password-manager opt-outs. The login variant uses `-webkit-text-security`
 * so it is not detected as a second password field.
 */
export function SecretInput({
  id,
  kind,
  value,
  onChange,
  visible,
  onToggleVisible,
  icon: Icon,
  invalid,
  className,
}: SecretInputProps) {
  const [readOnly, setReadOnly] = useState(true)
  const useCssMask = kind === 'login' && supportsTextSecurity
  const unlock = () => setReadOnly(false)

  const label = kind === 'login' ? 'le login' : 'le mot de passe'

  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
      )}
      <input
        id={id}
        type={visible || useCssMask ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        onFocus={unlock}
        onPointerDown={unlock}
        autoComplete={useCssMask ? 'off' : 'new-password'}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        data-lpignore="true"
        data-1p-ignore=""
        data-form-type="other"
        aria-invalid={invalid || undefined}
        style={useCssMask && !visible ? ({ WebkitTextSecurity: 'disc' } as CSSProperties) : undefined}
        className={cn(
          'w-full rounded-2xl border border-brown/15 bg-beige/60 py-3.5 pr-12 text-sm outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20',
          Icon ? 'pl-11' : 'pl-4',
          invalid && 'border-red-300',
          className,
        )}
      />
      <button
        type="button"
        className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-brown/50 transition hover:text-brown"
        onClick={onToggleVisible}
        aria-label={visible ? `Masquer ${label}` : `Afficher ${label}`}
        title={visible ? `Masquer ${label}` : `Afficher ${label}`}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
