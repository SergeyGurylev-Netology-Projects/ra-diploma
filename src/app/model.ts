export interface fetchStatus {
  status: "idle" | "loading" | "failed" | "complete" | "none"
}

export interface CategoryItem {
  id: number
  title: string
}

export interface CatalogItem {
  id: number
  category: number
  title: string
  price: number
  images: string[]
}

export interface TopSalesItem extends CatalogItem {
}

export interface Product extends CatalogItem{
  sku: string
  manufacturer: string
  color: string
  material: string
  reason: string
  season: string
  heelSize: string
  sizes: {
    size: string
    available: boolean
    }[]
}

export interface CartItem {
  id: number
  title: string
  price: number
  size: string
  amount: number
}

export interface MenuItem {
  id: number
  caption: string
  alt: string
  url: string
}

export interface Order {
  owner: {
    phone: string
    address: string
  },
  items: {
      id: number
      price: number
      count: number
    } []
}
