import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  categories as defaultCategories,
  dishes as defaultDishes,
  type Category,
  type Dish,
} from '@/data/content'

const STORAGE_KEY = 'na3ima-catalog'

type CatalogState = {
  categories: Category[]
  dishes: Dish[]
}

type CatalogContextValue = CatalogState & {
  updateCategory: (id: string, patch: Partial<Pick<Category, 'name' | 'image'>>) => void
  updateDish: (id: string, patch: Partial<Pick<Dish, 'name' | 'image'>>) => void
  resetCatalog: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

function loadCatalog(): CatalogState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { categories: defaultCategories, dishes: defaultDishes }
    const parsed = JSON.parse(raw) as Partial<CatalogState>
    return {
      categories: parsed.categories?.length ? parsed.categories : defaultCategories,
      dishes: parsed.dishes?.length ? parsed.dishes : defaultDishes,
    }
  } catch {
    return { categories: defaultCategories, dishes: defaultDishes }
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CatalogState>(loadCatalog)

  const persist = useCallback((next: CatalogState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return next
  }, [])

  const updateCategory = useCallback(
    (id: string, patch: Partial<Pick<Category, 'name' | 'image'>>) => {
      setState((prev) =>
        persist({
          ...prev,
          categories: prev.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        }),
      )
    },
    [persist],
  )

  const updateDish = useCallback(
    (id: string, patch: Partial<Pick<Dish, 'name' | 'image'>>) => {
      setState((prev) =>
        persist({
          ...prev,
          dishes: prev.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        }),
      )
    },
    [persist],
  )

  const resetCatalog = useCallback(() => {
    setState(persist({ categories: defaultCategories, dishes: defaultDishes }))
  }, [persist])

  const value = useMemo(
    () => ({
      ...state,
      updateCategory,
      updateDish,
      resetCatalog,
    }),
    [state, updateCategory, updateDish, resetCatalog],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
