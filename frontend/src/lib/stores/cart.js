import { writable } from 'svelte/store';

// Läs in tidigare cart från localStorage (om det finns)
const initial = JSON.parse(localStorage.getItem('cart') || '[]');

export const cart = writable(initial);

// Spara alltid till localStorage när den ändras
cart.subscribe(items => {
  localStorage.setItem('cart', JSON.stringify(items));
});

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

export const removeFromCart = productId => {
  cart.update(items => items.filter(i => i.id !== productId));
};

export const updateQuantity = (productId, quantity) => {
  cart.update(items => {
    return items.map(i => i.id === productId ? { ...i, quantity } : i);
  });
};

export const clearCart = () => {
  cart.set([]);
};
