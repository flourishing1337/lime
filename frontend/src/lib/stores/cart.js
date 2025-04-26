import { writable } from 'svelte/store';
import { browser } from '$app/environment';  // SvelteKit‐flagga för klient vs server

// Initialt värde – bara läs från localStorage i browser
const initial = browser
  ? JSON.parse(localStorage.getItem('cart') || '[]')
  : [];

// Skapa store
export const cart = writable(initial);

// Spara alltid till localStorage, men bara i browser
if (browser) {
  cart.subscribe(items => {
    localStorage.setItem('cart', JSON.stringify(items));
  });
}

// Hjälpfunktioner
export const addToCart = (product, quantity = 1) => {
  cart.update(items => {
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }
    return items;
  });
};

export const removeFromCart = (id) => {
  cart.update(items => items.filter(i => i.id !== id));
};

export const updateQuantity = (id, qty) => {
  cart.update(items =>
    items.map(i => (i.id === id ? { ...i, quantity: qty } : i))
  );
};

export const clearCart = () => {
  cart.set([]);
};
