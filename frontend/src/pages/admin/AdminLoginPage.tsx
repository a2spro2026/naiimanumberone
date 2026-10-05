import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Lock, Shield, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SecretInput } from '@/components/admin/SecretInput'
import { useAuth } from '@/context/AuthContext'
import { ApiError } from '@/lib/api'

type LoginError = { ar: string; fr: string }

function loginError(err: unknown): LoginError {
  if (err instanceof ApiError && err.status === 422) {
    return { ar: 'اسم المستخدم أو كلمة المرور غير صحيحة.', fr: err.message }
  }
  if (err instanceof ApiError && err.status === 429) {
    return { ar: 'محاولات كثيرة. انتظر دقيقة ثم حاول مرة أخرى.', fr: err.message }
  }
  return { ar: 'تعذر الدخول. حاول مرة أخرى.', fr: err instanceof ApiError ? err.message : 'Connexion impossible. Réessayez.' }
}

const labelClass = 'mb-1.5 flex items-baseline justify-between gap-2 font-semibold text-brown'

export function AdminLoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth()
  const navigate = useNavigate()
  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<LoginError | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const reset = () => {
      setLoginValue('')
      setPassword('')
      setShowLogin(false)
      setShowPassword(false)
      setError(null)
    }
    reset()
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-ink">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!loginValue.trim() || !password) {
      setError({ ar: 'أدخل اسم المستخدم وكلمة المرور.', fr: 'Saisissez votre login et votre mot de passe.' })
      return
    }
    const credentials = { login: loginValue, password }
    setLoginValue('')
    setPassword('')
    setShowLogin(false)
    setShowPassword(false)
    setError(null)
    setSubmitting(true)
    try {
      await login(credentials.login, credentials.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(loginError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-ink px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-[calc(2.5rem+env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/hero-ceremony.webp"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-green/80 to-ink/95" />
        <div className="zellige-pattern absolute inset-0 opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="overflow-hidden rounded-[24px] border border-gold/25 bg-white/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="bg-gradient-to-r from-green to-green-deep px-6 py-6 text-center sm:px-8 sm:py-7">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/40">
              <Shield className="h-7 w-7 text-gold" />
            </span>
            <h1 className="font-display text-3xl text-beige">
              <span dir="rtl" lang="ar" className="block">
                تسجيل الدخول
              </span>
              <span className="mt-1 block text-lg text-beige/80">Connexion Admin</span>
            </h1>
            <p className="mt-1 text-sm text-beige/70">NA3IMA-numberONE · Espace sécurisé</p>
          </div>

          <form
            onSubmit={onSubmit}
            autoComplete="off"
            data-lpignore="true"
            data-1p-ignore=""
            noValidate
            className="space-y-5 px-6 py-7 sm:px-8 sm:py-8"
          >
            {error && (
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <span dir="rtl" lang="ar" className="block text-base">
                  {error.ar}
                </span>
                <span className="mt-0.5 block text-xs opacity-80">{error.fr}</span>
              </p>
            )}

            <div>
              <label className={labelClass} htmlFor="admin-login">
                <span className="text-sm">Login</span>
                <span dir="rtl" lang="ar" className="text-base">
                  اسم المستخدم
                </span>
              </label>
              <SecretInput
                id="admin-login"
                kind="login"
                icon={User}
                value={loginValue}
                onChange={setLoginValue}
                visible={showLogin}
                onToggleVisible={() => setShowLogin((v) => !v)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="admin-password">
                <span className="text-sm">Mot de passe</span>
                <span dir="rtl" lang="ar" className="text-base">
                  كلمة المرور
                </span>
              </label>
              <SecretInput
                id="admin-password"
                kind="password"
                icon={Lock}
                value={password}
                onChange={setPassword}
                visible={showPassword}
                onToggleVisible={() => setShowPassword((v) => !v)}
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="h-auto min-h-14 w-full py-2" disabled={submitting}>
              <span className="flex flex-col items-center leading-tight">
                <span dir="rtl" lang="ar" className="text-base">
                  {submitting ? 'جارٍ الدخول…' : 'دخول'}
                </span>
                <span className="text-xs font-medium opacity-75">{submitting ? 'Connexion…' : 'Se connecter'}</span>
              </span>
            </Button>

            <p className="text-center text-xs text-brown/50">
              Accès réservé à l&apos;administration NA3IMA
            </p>

            <div className="pt-1 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-green underline-offset-4 transition hover:text-gold hover:underline"
              >
                <span dir="rtl" lang="ar">
                  الرجوع إلى الموقع
                </span>{' '}
                · ← Retour au site
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
