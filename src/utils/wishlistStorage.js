export const WISHLIST_KEY = "lionies_wishlist_v1";
export const WISHLIST_UPDATED_EVENT = "wishlist-updated";

export const getWishlist = () => JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");

export const setWishlist = (items) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, { detail: { items } }));
};
