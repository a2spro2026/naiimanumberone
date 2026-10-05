import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, Plus, Trash2, UserCog, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SecretInput } from '@/components/admin/SecretInput'
import { api, ApiError } from '@/lib/api'

type ManagedUser = {
  id: number
  name: string
  contact: string | null
  role: string
  roleLabel: string
  login: string
}

type RoleOption = { value: string; label: string }

type FormState = {
  name: string
  contact: string
  role: string
  login: string
  password: string
}

const emptyForm: FormState = { name: '', contact: '', role: '', login: '', password: '' }

const fieldClass =
  'w-full rounded-2xl border border-brown/15 bg-beige/60 px-4 py-3 text-sm outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20'

const MASK = '••••••••'

export function UtilisateursPage() {
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [roles, setRoles] = useState<RoleOption[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [editing, setEditing] = useState<ManagedUser | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const load = useCallback(async () => {
    setLoadError('')
    try {
      const data = await api<{ users: ManagedUser[]; roles: RoleOption[] }>('/users')
      setUsers(data.users)
      setRoles(data.roles)
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : 'Chargement impossible.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (user: ManagedUser) => {
    setEditing(user)
    setFormOpen(true)
  }

  const remove = async (user: ManagedUser) => {
    if (!window.confirm(`Supprimer l'utilisateur « ${user.name} » ?`)) return
    try {
      await api(`/users/${user.id}`, { method: 'DELETE' })
      setUsers((list) => list.filter((u) => u.id !== user.id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'Suppression impossible.')
    }
  }

  const onSaved = (saved: ManagedUser) => {
    setUsers((list) => {
      const exists = list.some((u) => u.id === saved.id)
      return exists ? list.map((u) => (u.id === saved.id ? saved : u)) : [...list, saved]
    })
    setFormOpen(false)
  }

  const actions = (user: ManagedUser) => (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => openEdit(user)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-green transition hover:bg-green/10"
        aria-label={`Modifier ${user.name}`}
        title="Modifier"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => remove(user)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-red-600 transition hover:bg-red-50"
        aria-label={`Supprimer ${user.name}`}
        title="Supprimer"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
            <UserCog className="h-3.5 w-3.5" />
            Configuration
          </div>
          <h1 className="font-display text-3xl text-green sm:text-4xl">Utilisateurs</h1>
          <p className="mt-2 max-w-2xl text-sm text-brown/70">
            Comptes autorisés à accéder à l’espace admin.
          </p>
        </div>
        <Button variant="gold" className="w-full sm:w-auto" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <div className="rounded-[20px] border border-brown/10 bg-white p-3 shadow-sm sm:p-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          </div>
        ) : loadError ? (
          <p className="px-2 py-8 text-center text-sm text-red-600">{loadError}</p>
        ) : users.length === 0 ? (
          <p className="px-2 py-10 text-center text-sm text-brown/60">
            Aucun utilisateur pour le moment. Cliquez sur « Ajouter ».
          </p>
        ) : (
          <>
            <ul className="space-y-3 md:hidden">
              {users.map((user) => (
                <li key={user.id} className="rounded-2xl border border-brown/10 bg-beige/40 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-ink">
                      <span className="mr-2 text-xs text-brown/50">#{user.id}</span>
                      {user.name}
                    </p>
                    {actions(user)}
                  </div>
                  <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                    <dt className="text-xs uppercase tracking-wide text-brown/55">Contact</dt>
                    <dd className="min-w-0 break-words text-right text-ink/90">{user.contact || '—'}</dd>
                    <dt className="text-xs uppercase tracking-wide text-brown/55">Statut</dt>
                    <dd className="text-right text-ink/90">{user.roleLabel}</dd>
                    <dt className="text-xs uppercase tracking-wide text-brown/55">Login</dt>
                    <dd className="min-w-0 break-words text-right text-ink/90">{user.login}</dd>
                    <dt className="text-xs uppercase tracking-wide text-brown/55">Mot de passe</dt>
                    <dd className="text-right tracking-widest text-ink/60">{MASK}</dd>
                  </dl>
                </li>
              ))}
            </ul>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brown/10 text-xs uppercase tracking-wide text-brown/55">
                    <th className="px-3 py-3 font-semibold">ID</th>
                    <th className="px-3 py-3 font-semibold">Nom complet</th>
                    <th className="px-3 py-3 font-semibold">Contact</th>
                    <th className="px-3 py-3 font-semibold">Statut</th>
                    <th className="px-3 py-3 font-semibold">Login</th>
                    <th className="px-3 py-3 font-semibold">Mot de passe</th>
                    <th className="px-3 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-brown/5 transition-colors hover:bg-beige/60">
                      <td className="px-3 py-3 text-brown/60">{user.id}</td>
                      <td className="px-3 py-3 font-medium text-ink">{user.name}</td>
                      <td className="px-3 py-3 text-ink/90">{user.contact || '—'}</td>
                      <td className="px-3 py-3">
                        <span className="rounded-full bg-green/10 px-2.5 py-1 text-xs font-semibold text-green">
                          {user.roleLabel}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-ink/90">{user.login}</td>
                      <td className="px-3 py-3 tracking-widest text-ink/60">{MASK}</td>
                      <td className="px-3 py-1.5">{actions(user)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {formOpen && (
          <UserFormModal
            key={editing?.id ?? 'new'}
            user={editing}
            roles={roles}
            onClose={() => setFormOpen(false)}
            onSaved={onSaved}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function UserFormModal({
  user,
  roles,
  onClose,
  onSaved,
}: {
  user: ManagedUser | null
  roles: RoleOption[]
  onClose: () => void
  onSaved: (user: ManagedUser) => void
}) {
  const [form, setForm] = useState<FormState>(
    user
      ? { name: user.name, contact: user.contact ?? '', role: user.role, login: user.login, password: '' }
      : emptyForm,
  )
  const [showLogin, setShowLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const set = (key: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setMessage('')
    const payload = { ...form, password: form.password || undefined }
    setForm((f) => ({ ...f, password: '' }))
    setShowPassword(false)
    try {
      const data = user
        ? await api<{ user: ManagedUser }>(`/users/${user.id}`, { method: 'PUT', body: payload })
        : await api<{ user: ManagedUser }>('/users', { method: 'POST', body: payload })
      onSaved(data.user)
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.errors)
        setMessage(Object.keys(err.errors).length ? '' : err.message)
      } else {
        setMessage('Enregistrement impossible.')
      }
    } finally {
      setSaving(false)
    }
  }

  const fieldError = (key: string) =>
    errors[key]?.[0] ? <p className="mt-1 text-xs text-red-600">{errors[key][0]}</p> : null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      <motion.button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        className="pb-safe-4 relative max-h-[92svh] w-full overflow-y-auto rounded-t-[24px] bg-white shadow-2xl sm:max-w-lg sm:rounded-[24px] sm:pb-0"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        <div className="flex items-center justify-between border-b border-brown/10 px-5 py-4">
          <h2 id="user-form-title" className="font-display text-2xl text-green">
            {user ? 'Modifier l’utilisateur' : 'Ajouter un utilisateur'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-brown transition hover:bg-brown/10"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={submit}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore=""
          noValidate
          className="space-y-4 px-5 py-5"
        >
          {message && (
            <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {message}
            </p>
          )}

          <div>
            <label htmlFor="user-name" className="mb-1.5 block text-sm font-semibold text-brown">
              Nom complet
            </label>
            <input
              id="user-name"
              value={form.name}
              onChange={(e) => set('name')(e.target.value)}
              autoComplete="off"
              data-lpignore="true"
              className={fieldClass}
            />
            {fieldError('name')}
          </div>

          <div>
            <label htmlFor="user-contact" className="mb-1.5 block text-sm font-semibold text-brown">
              Contact
            </label>
            <input
              id="user-contact"
              type="tel"
              inputMode="tel"
              value={form.contact}
              onChange={(e) => set('contact')(e.target.value)}
              autoComplete="off"
              data-lpignore="true"
              className={fieldClass}
            />
            {fieldError('contact')}
          </div>

          <div>
            <label htmlFor="user-role" className="mb-1.5 block text-sm font-semibold text-brown">
              Statut
            </label>
            <select
              id="user-role"
              value={form.role}
              onChange={(e) => set('role')(e.target.value)}
              className={fieldClass}
            >
              <option value="" disabled>
                — Sélectionner —
              </option>
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {fieldError('role')}
          </div>

          <div>
            <label htmlFor="user-login" className="mb-1.5 block text-sm font-semibold text-brown">
              Login
            </label>
            <SecretInput
              id="user-login"
              kind="login"
              value={form.login}
              onChange={set('login')}
              visible={showLogin}
              onToggleVisible={() => setShowLogin((v) => !v)}
              invalid={Boolean(errors.login)}
            />
            {fieldError('login')}
          </div>

          <div>
            <label htmlFor="user-password" className="mb-1.5 block text-sm font-semibold text-brown">
              Mot de passe
            </label>
            <SecretInput
              id="user-password"
              kind="password"
              value={form.password}
              onChange={set('password')}
              visible={showPassword}
              onToggleVisible={() => setShowPassword((v) => !v)}
              invalid={Boolean(errors.password)}
            />
            {user && !errors.password && (
              <p className="mt-1 text-xs text-brown/60">Laissez vide pour garder le mot de passe actuel.</p>
            )}
            {fieldError('password')}
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="h-12 border-brown/30 text-brown" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" variant="gold" className="h-12" disabled={saving}>
              {saving ? 'Enregistrement…' : user ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
