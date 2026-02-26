import { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { CART_UPDATED_EVENT, getCartCount } from "../../utils/cartStorage";

export default function CartTrigger({ onOpen }) {
  const [cartCount, setCartCount] = useState(() => getCartCount());

  useEffect(() => {
    const syncCount = () => setCartCount(getCartCount());
    window.addEventListener(CART_UPDATED_EVENT, syncCount);
    window.addEventListener("storage", syncCount);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCount);
      window.removeEventListener("storage", syncCount);
    };
  }, []);

  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-center relative focus:outline-none  cursor-pointer"
    >
      <FiShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] leading-4">
          {cartCount}
        </span>
      )}
      <span className="hidden sm:block lg:inline">Basket</span>
    </button>
  );
}
