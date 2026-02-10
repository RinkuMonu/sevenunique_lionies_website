import { useState } from "react";
const Payment = () => {
    const [method, setMethod] = useState(null); 
    

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

            {/* PAYMENT ICONS */}
            <div className="flex gap-4 mb-6">
                {[
                    { id: "card", img: "../images/visa.png" },
                    { id: "paypal", img: "../images/mastercard.png" },
                    { id: "apple", img: "../images/paypal.png" },
                    { id: "mastercard", img: "../images/applepay.png" },
                    {id: "cod" , img: "../images/cod.png"}

                ].map((item, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setMethod(item.id)}
                        className={`border rounded-xl p-3 transition cursor-pointer
              ${method === item.id
                                ? "border-black ring-2 ring-black/20"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        <img
                            src={item.img}
                            alt={item.id}
                            className="h-8 w-auto object-contain"
                        />
                    </button>
                ))}
            </div>

            {/* PAYMENT DETAILS (ONLY OPEN AFTER SELECTION) */}
            {method && (
                <div className="border border-gray-300 rounded-xl p-6">
                    {method === "card" && (
                        <div className="space-y-4">
                            <input
                                placeholder="Card Number"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="MM / YY"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                                />
                                <input
                                    placeholder="CVV"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                                />
                            </div>
                            <input
                                placeholder="Card Holder Name"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />
                        </div>
                    )}

                    {method === "paypal" && (
                        <div className="space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="PayPal Email"
                                className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />

                            <input
                                type="password"
                                required
                                placeholder="PayPal Password"
                                className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />
                        </div>
                    )}


                    {method === "apple" && (
                        <div className="space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="Apple ID"
                                className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />

                            <input
                                type="password"
                                required
                                placeholder="Apple Pay Verification Code"
                                className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />
                        </div>
                    )}

                    {method === "mastercard" && (
                        <div className="space-y-4">
                            <input
                                required
                                placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                                className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    required
                                    placeholder="Expiry (MM/YY)"
                                    className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                                />
                                <input
                                    required
                                    placeholder="CVV"
                                    className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                                />
                            </div>

                            <input
                                required
                                placeholder="Cardholder Name"
                                className="w-full rounded-xl border px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                            />
                        </div>
                    )}
                        {method === "cod" && (
                        <div className="space-y-4">
                            <p class = "text-gray-600">Cod is choosen</p>
                        </div>
                    )}


                </div>
            )}
        </div>
    );
};

export default Payment;
