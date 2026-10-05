import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Dish, DishSize } from '@/data/content'

export type CartItem = {
  key: string
  dish: Dish
  size: DishSize
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  addItem: (dish: Dish, size: DishSize) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clear: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  lastAdded: { dish: Dish; size: DishSize } | null
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'na3ima-cart'
const DESKTOP_QUERY = '(min-width: 1024px)'

export function cartLinePrice(item: Pick<CartItem, 'dish' | 'size'>) {
  return item.dish.prices[item.size]
}

/** Drops lines saved before dishes had sizes (old single-price format). */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : []
    return parsed.filter((i) => i.key && i.size && typeof i.dish?.prices?.[i.size] === 'number')
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState<CartContextValue['lastAdded']>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const addItem = useCallback((dish: Dish, size: DishSize) => {
    const key = `${dish.id}:${size}`
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { key, dish, size, quantity: 1 }]
    })
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setIsOpen(true)
      return
    }
    setLastAdded({ dish, size })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setLastAdded(null), 2200)
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      total: items.reduce((n, i) => n + cartLinePrice(i) * i.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clear,
      isOpen,
      setIsOpen,
      lastAdded,
    }),
    [items, addItem, removeItem, updateQuantity, clear, isOpen, lastAdded],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
