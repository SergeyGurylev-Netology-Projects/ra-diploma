import { TopSalesItem, CatalogItem, CategoryItem, Product, Order } from './model'

const url = import.meta.env.VITE_APP_URL || 'http://localhost';
const port = import.meta.env.VITE_APP_PORT || '7070';
const path = `${url}:${port}/api`;

export function getTopSalesItems() {
  return new Promise<{ items: TopSalesItem[] }>((resolve, reject) => {
    fetch(`${path}/top-sales`)
      .then(response => response.json())
      .then((data) => resolve({items: data}))
      .catch(() => reject());
    })
  }

export function getCategoryItems() {
  return new Promise<{ items: CategoryItem[] }>((resolve, reject) => {
    fetch(`${path}/categories`)
      .then(response => response.json())
      .then((data) => resolve({items: data}))
      .catch(() => reject());
  })
}

export function getCatalogItems({ search = "", offset = 0, category = -1 }) {
  return new Promise<{ items: CatalogItem[], offset: number }>((resolve, reject) => {

    const params = [];
    if (search.trim()) params.push(`q=${search.trim()}`);
    if (offset > 0) params.push(`offset=${offset}`);
    if (category !== -1) params.push(`categoryId=${category}`);

    const str_params = params.length > 0 ? '?' + params.join('&') : '';

    fetch(`${path}/items${str_params}`)
      .then(response => response.json())
      .then((data) => resolve({items: data, offset: offset}))
      .catch(() => reject());
    })
  }

export function getProduct({ id = 0 }) {
  return new Promise<{ item: Product }>((resolve, reject) => {
    fetch(`${path}/items/${id}`)
      .then(response => response.json())
      .then((data) => resolve({item: data}))
      .catch(() => reject());
  })
}

export function putOrder(order: Order) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  };
  return new Promise((resolve, reject) => {
    fetch(`${path}/order`, options)
      .then(response => {
        if (response.ok) {
          resolve(true);
        } else {
          throw new Error(response.status.toString());
        }
      })
      .catch(() => reject());
  })
}
