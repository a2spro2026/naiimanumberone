import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Shield, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

type LoginForm = {
  login: string
  password: string
}

export function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: { login: '', password: '' },
  })

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = (data: LoginForm) => {
    setError('')
    const ok = login(data.login, data.password)
    if (ok) {
      navigate('/admin', { replace: true })
      return
    }
    setError('Identifiants incorrects. Réessayez.')
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-ink px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/hero-ceremony.jpg"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-green/80 to-ink/95" />
        <div className="zellige-pattern absolute inset-0 opacity-40" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden rounded-[24px] border border-gold/25 bg-white/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="bg-gradient-to-r from-green to-green-deep px-8 py-7 text-center">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/40">
              <Shield className="h-7 w-7 text-gold" />
            </span>
            <h1 className="font-display text-3xl text-beige">Connexion Admin</h1>
            <p className="mt-1 text-sm text-beige/70">NA3IMA-numberONE · Espace sécurisé</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-8 py-8">
            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown" htmlFor="login">
                Login
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
                <input
                  id="login"
                  autoComplete="username"
                  placeholder="bilal"
                  className="w-full rounded-2xl border border-brown/15 bg-beige/60 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20"
                  {...register('login', { required: true })}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="0661755048"
                  className="w-full rounded-2xl border border-brown/15 bg-beige/60 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20"
                  {...register('password', { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-brown/50 transition hover:text-brown"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Connexion…' : 'Se connecter'}
            </Button>

            <p className="text-center text-xs text-brown/50">
              Accès réservé à l&apos;administration NA3IMA
            </p>

            <div className="pt-1 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-green underline-offset-4 transition hover:text-gold hover:underline"
              >
                ← Retour au site
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
