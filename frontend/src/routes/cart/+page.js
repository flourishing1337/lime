import { cart } from '$lib/stores/cart';
import { get } from 'svelte/store';

export function load() {
  const items = get(cart);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { items, total };
}
