import { useState } from "react";

const Delivery = () => {
  const [deliveryType, setDeliveryType] = useState("standard");

  const options = [
    {
      id: "standard",
      title: "Standard Delivery",
      desc: "Delivered in 5–7 business days",
      price: 0,
      eta: "Free",
    },
    {
      id: "fast",
      title: "Fast Delivery",
      desc: "Delivered in 2–3 business days",
      price: 99,
      eta: "₹99",
    },
    {
      id: "express",
      title: "Express Delivery",
      desc: "Delivered in 24 hours",
      price: 199,
      eta: "₹199",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Delivery Options</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition
              ${
                deliveryType === option.id
                  ? "border-[#633426] bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
          >
            <div className="flex gap-3">
              <input
                type="radio"
                name="delivery"
                checked={deliveryType === option.id}
                onChange={() => setDeliveryType(option.id)}
                className="mt-1 accent-[#633426] cursor-pointer"
              />

              <div className="text-sm">
                <p className="font-medium">{option.title}</p>
                <p className="text-gray-500">{option.desc}</p>
              </div>
            </div>

            <span className="text-sm font-semibold">
              {option.price === 0 ? "Free" : `₹${option.price}`}
            </span>
          </label>
        ))}
      </div>

      {/* INFO */}
      <div className="mt-4 text-xs text-gray-500">
        Delivery dates may vary depending on your location and availability.
      </div>
    </div>
  );
};

export default Delivery;
