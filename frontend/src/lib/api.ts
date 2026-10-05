export class ApiError extends Error {
  status: number
  errors: Record<string, string[]>

  constructor(status: number, message: string, errors: Record<string, string[]> = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

function xsrfToken() {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

type RequestOptions = { method?: string; body?: unknown }

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const isForm = options.body instanceof FormData
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': xsrfToken(),
  }
  if (!isForm && options.body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    credentials: 'same-origin',
    cache: 'no-store',
    headers,
    body:
      options.body === undefined
        ? undefined
        : isForm
          ? (options.body as FormData)
          : JSON.stringify(options.body),
  })

  if (response.status === 204) return undefined as T

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      response.status === 419
        ? 'Session expirée. Rechargez la page.'
        : response.status === 413
          ? 'Photo trop lourde.'
          : (data.message as string) || 'Une erreur est survenue.'
    throw new ApiError(response.status, message, data.errors ?? {})
  }

  return data as T
}

/** Admin API (`/api/admin/...`), authenticated by the Laravel session. */
export function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return request<T>(`/api/admin${path}`, options)
}
