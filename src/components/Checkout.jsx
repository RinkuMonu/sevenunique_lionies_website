import { useState } from "react";
import Payment from "../components/cart/Payment.jsx";
import Address from "../components/cart/Address.jsx";
import Delivery from "../components/cart/Delivery.jsx"; 

const CheckoutPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "DR CRZ Jacket", price: 235, qty: 1, image:  "../extra/wo1.png"},
    { id: 2, name: "Look Cream Sneakers", price: 397, qty: 1, image: "../extra/sneak1.png" },
  ]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showLottie, setShowLottie] = useState(false); // ✅ REQUIRED

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shipping = 6;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon === "SAVE10" && !couponApplied) {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
      setShowLottie(true);

      setTimeout(() => {
        setShowLottie(false);
      }, 2500);
    }
  };

  return (
    <>
      {/* 🎉 LOTTIE CELEBRATION */}
      {showLottie && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/10">
          <iframe
            src="https://lottie.host/embed/c0ba5fdc-793b-4076-9f17-01b91cd310d5/tFXMU37AOa.lottie"
            className="w-80 h-80"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="min-h-screen py-10">
        <div className=" mx-auto px-4">

          {/* STEPS */}
          <div className="flex justify-center gap-6 mb-8 text-sm font-semibold">
            <span className="text-gray-400">BAG</span>
            <span className="text-gray-400">----------</span>
            <span className="text-[#633426]">ADDRESS</span>
            <span className="text-gray-400">----------</span>
            <span className="text-gray-400">PAYMENT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-xl p-8">
                <Address />
              </div>

              <div className="bg-white rounded-xl p-8">
                <Delivery />
              </div>

              <div className="bg-white rounded-xl p-8">
                <Payment />
              </div>
            </div>

            {/* RIGHT CART */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white border border-gray-300 rounded-2xl p-5">

                <h3 className="text-sm font-semibold mb-4">
                  Products <span className="text-gray-400">({cart.length})</span>
                </h3>

                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm font-semibold mt-1">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 border rounded-full px-2 py-1 text-sm">
                      <button onClick={() => decreaseQty(item.id)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>
                ))}

                {/* PROMO */}
                <div className="flex gap-2 mb-4">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Promo code"
                    className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-xs outline-none"
                    disabled={couponApplied}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    className="px-4 py-2 text-xs border rounded-lg hover:border-black disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between font-semibold text-sm mt-3">
                  <span>Total amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-[#633426] text-white py-3 rounded-full mt-5 hover:opacity-90">
                  PLACE ORDER
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
