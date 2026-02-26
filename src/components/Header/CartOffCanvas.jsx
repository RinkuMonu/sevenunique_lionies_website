import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { CART_UPDATED_EVENT, getCartItems, setCartItems } from "../../utils/cartStorage";

export default function CartOffCanvas({ isOpen, onClose }) {
  const normalizeItems = (items) =>
    items.map((item, index) => ({
      ...item,
      quantity: Number(item.quantity || item.qty || 1),
      lineId: item.lineId || `${item.productId || item.id || "line"}-${item.size || "M"}-${item.color || "Black"}-${index}`,
    }));

  const [cartItems, setLocalCartItems] = useState(() => normalizeItems(getCartItems()));

  useEffect(() => {
    const syncCart = () => setLocalCartItems(normalizeItems(getCartItems()));
    if (isOpen) syncCart();
    window.addEventListener(CART_UPDATED_EVENT, syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, [isOpen]);

  const updateItems = (updater) => {
    const updated = normalizeItems(typeof updater === "function" ? updater(getCartItems()) : updater);
    setCartItems(updated);
    setLocalCartItems(updated);
  };

  const removeItem = (lineId) => {
    updateItems((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const increaseQty = (lineId) => {
    updateItems((prev) =>
      prev.map((item) =>
        item.lineId === lineId ? { ...item, quantity: Number(item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (lineId) => {
    updateItems((prev) =>
      prev.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.max(1, Number(item.quantity || 1) - 1) }
          : item
      )
    );
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || item.qty || 1),
        0
      ),
    [cartItems]
  );

  const discount = subtotal > 4000 ? 250 : 0;
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}

      <div
        className={`fixed top-0 left-0 w-full z-50 transform transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-[#927f68]">
            <div className="flex items-center gap-2 text-white">
              <ShoppingBag size={20} />
              <h3 className="text-lg font-semibold">Your Basket</h3>
            </div>

            <button onClick={onClose} className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30">
              <X size={18} />
            </button>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {cartItems.length === 0 && (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <p className="text-gray-600">Your cart is empty.</p>
                    <Link to="/productlist" onClick={onClose} className="inline-block mt-4 text-[#927f68] font-semibold">
                      Continue shopping
                    </Link>
                  </div>
                )}

                {cartItems.map((item) => (
                  <div key={item.lineId} className="flex gap-4 bg-gray-50 p-4 shadow-sm rounded-lg">
                    <img src={item.image} className="w-20 h-20 rounded-lg object-cover" alt={item.name} />

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-[#F5F0DD]">
                        Size: {item.size} | Color: {item.color}
                      </span>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => decreaseQty(item.lineId)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>

                        <button
                          onClick={() => increaseQty(item.lineId)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-800">Rs. {Number(item.price) * Number(item.quantity)}</div>
                      <button onClick={() => removeItem(item.lineId)} className="text-xs text-red-500 mt-2 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-12 lg:col-span-5">
                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 sticky top-24 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>

                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {discount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>Rs. {total}</span>
                  </div>

                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className={`block text-center w-full py-3 rounded-xl font-semibold text-white ${
                      cartItems.length ? "bg-[#927f68]" : "bg-gray-400 pointer-events-none"
                    }`}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
