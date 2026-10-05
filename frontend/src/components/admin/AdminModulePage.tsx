import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Column = { key: string; label: string }

type AdminModulePageProps = {
  title: string
  description: string
  icon: LucideIcon
  columns: Column[]
  rows: Record<string, ReactNode>[]
  actionLabel?: string
}

export function AdminModulePage({
  title,
  description,
  icon: Icon,
  columns,
  rows,
  actionLabel = 'Ajouter',
}: AdminModulePageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
            <Icon className="h-3.5 w-3.5" />
            Module
          </div>
          <h1 className="font-display text-3xl text-green sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-brown/70">{description}</p>
        </div>
        <Button variant="gold" className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      </div>

      <div className="rounded-[20px] border border-brown/10 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative mb-4 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
          <input
            type="search"
            placeholder={`Rechercher dans ${title.toLowerCase()}…`}
            className="w-full rounded-2xl border border-brown/15 bg-beige/50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gold"
          />
        </div>

        <ul className="space-y-3 md:hidden">
          {rows.map((row, i) => {
            const [first, ...rest] = columns
            return (
              <li key={i} className="rounded-2xl border border-brown/10 bg-beige/40 p-4">
                <p className="font-semibold text-ink">{row[first.key]}</p>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  {rest.map((col) => (
                    <div key={col.key} className="contents">
                      <dt className="text-xs uppercase tracking-wide text-brown/55">{col.label}</dt>
                      <dd className="min-w-0 break-words text-right text-ink/90">{row[col.key]}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            )
          })}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brown/10 text-xs uppercase tracking-wide text-brown/55">
                {columns.map((col) => (
                  <th key={col.key} className="px-3 py-3 font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-brown/5 transition-colors hover:bg-beige/60"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-3.5 text-ink/90">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
