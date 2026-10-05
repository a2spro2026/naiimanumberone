import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { categories as defaultCategories, type Category, type Dish } from '@/data/content'
import { api, request } from '@/lib/api'

const STORAGE_KEY = 'na3ima-catalog'

type CategoryPatch = Partial<Pick<Category, 'name' | 'nameAr' | 'image'>>

type CatalogContextValue = {
  categories: Category[]
  dishes: Dish[]
  dishesLoading: boolean
  dishesError: string
  reloadDishes: () => Promise<void>
  createDish: (data: FormData) => Promise<Dish>
  saveDish: (id: string, data: FormData) => Promise<Dish>
  deleteDish: (id: string) => Promise<void>
  updateCategory: (id: string, patch: CategoryPatch) => void
  resetCategories: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

/** Categories are still stored in the browser; fills fields added after they were saved. */
function loadCategories(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored = raw ? (JSON.parse(raw) as { categories?: Partial<Category>[] }).categories : undefined
    if (!stored?.length) return defaultCategories
    return stored.map((item) => ({ ...defaultCategories.find((d) => d.id === item.id), ...item }) as Category)
  } catch {
    return defaultCategories
  }
}

function persistCategories(categories: Category[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ categories }))
  } catch {
    window.alert(
      "Espace de stockage du navigateur plein : la dernière photo n'a pas pu être enregistrée. Utilisez une image plus légère.",
    )
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(loadCategories)
  const [dishes, setDishes] = useState<Dish[]>([])
  const [dishesLoading, setDishesLoading] = useState(true)
  const [dishesError, setDishesError] = useState('')

  const reloadDishes = useCallback(async () => {
    setDishesError('')
    try {
      const data = await request<{ dishes: Dish[] }>('/api/dishes')
      setDishes(data.dishes)
    } catch {
      setDishesError('Impossible de charger le menu pour le moment.')
    } finally {
      setDishesLoading(false)
    }
  }, [])

  useEffect(() => {
    reloadDishes()
  }, [reloadDishes])

  const createDish = useCallback(async (data: FormData) => {
    const { dish } = await api<{ dish: Dish }>('/dishes', { method: 'POST', body: data })
    setDishes((list) => [...list, dish])
    return dish
  }, [])

  const saveDish = useCallback(async (id: string, data: FormData) => {
    const { dish } = await api<{ dish: Dish }>(`/dishes/${id}`, { method: 'POST', body: data })
    setDishes((list) => list.map((d) => (d.id === id ? dish : d)))
    return dish
  }, [])

  const deleteDish = useCallback(async (id: string) => {
    await api(`/dishes/${id}`, { method: 'DELETE' })
    setDishes((list) => list.filter((d) => d.id !== id))
  }, [])

  const updateCategory = useCallback((id: string, patch: CategoryPatch) => {
    setCategories((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
      persistCategories(next)
      return next
    })
  }, [])

  const resetCategories = useCallback(() => {
    persistCategories(defaultCategories)
    setCategories(defaultCategories)
  }, [])

  const value = useMemo(
    () => ({
      categories,
      dishes,
      dishesLoading,
      dishesError,
      reloadDishes,
      createDish,
      saveDish,
      deleteDish,
      updateCategory,
      resetCategories,
    }),
    [categories, dishes, dishesLoading, dishesError, reloadDishes, createDish, saveDish, deleteDish, updateCategory, resetCategories],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
