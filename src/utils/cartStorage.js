export const CART_KEY = "lionies_cart_v1";
export const CART_UPDATED_EVENT = "cart-updated";

export const getCartItems = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");

export const setCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { items } }));
};

export const getCartCount = () =>
  getCartItems().reduce((total, item) => total + Number(item.quantity || item.qty || 0), 0);
