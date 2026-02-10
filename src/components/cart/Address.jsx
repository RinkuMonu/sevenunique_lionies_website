import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Address = () => {
    const [showNewForm, setShowNewForm] = useState(false);
    const [selected, setSelected] = useState(1);
    const [activeBadge, setActiveBadge] = useState("Home");

    const addresses = [
        {
            id: 1,
            name: "Jiya Sharma",
            phone: "9876543210",
            address: "123, MG Road, Near Metro Station",
            city: "Delhi",
            state: "Delhi",
            zip: "110001",
        },
        {
            id: 2,
            name: "Jiya Sharma",
            phone: "9876543210",
            address: "45, Malviya Nagar",
            city: "Jaipur",
            state: "Rajasthan",
            zip: "302017",
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>

            {/* 🔹 SAVED ADDRESSES */}
            {!showNewForm && (
                <div className="space-y-4">
                    {addresses.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between border border-gray-200 rounded-xl p-4 hover:border-black transition"
                        >
                            <div className="flex gap-3">
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selected === item.id}
                                    onChange={() => setSelected(item.id)}
                                    className="mt-1 accent-black cursor-pointer"
                                />

                                <div className="text-sm">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-600">{item.address}</p>
                                    <p className="text-gray-600">
                                        {item.city}, {item.state} - {item.zip}
                                    </p>
                                    <p className="text-gray-600 flex items-center gap-2">
                                        <FaPhoneAlt className="text-xs cursor-pointer" />
                                        <span>{item.phone}</span>
                                    </p>

                                </div>
                            </div>

                            <button
                                type="button"
                                className="text-gray-500 hover:text-black"
                                title="Edit Address"
                            >
                                <FaEdit className="cursor-pointer" />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => setShowNewForm(true)}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm font-medium hover:border-[#633426] transition cursor-pointer"
                    >
                        + Add New Address
                    </button>
                </div>
            )}

            {/* 🔹 NEW ADDRESS FORM (EMPTY) */}
            {showNewForm && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Full Name*"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[black] focus:ring-2 focus:ring-black/20 outline-none"
                        />
                        <input
                            placeholder="Phone Number*"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                        />
                    </div>

                    <input
                        placeholder="Address*"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            placeholder="City*"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                        />
                        <input
                            placeholder="State*"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                        />
                        <input
                            placeholder="Pincode*"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
                        />
                    </div>

                    <div className="flex gap-2">
  <button
    type="button"
    className="bg-[#633426] text-white px-3 py-1.5 text rounded-lg hover:opacity-90 transition cursor-pointer"
  >
    Save Address
  </button>

  <button
    type="button"
    onClick={() => setShowNewForm(false)}
    className="border border-gray-300 px-3 py-1.5 text rounded-lg hover:border-black transition cursor-pointer"
  >
    Cancel
  </button>
</div>

                </div>

            )}
            {/* ADDRESS TYPE BADGES */}
            <div className="flex gap-2 justify-start mt-3">
                {["Home", "Work", "Other"].map((item) => (
                    <span
                        key={item}
                        onClick={() => setActiveBadge(item)}
                        className={`px-3 py-1 text-xs rounded-full cursor-pointer transition
        ${activeBadge === item
                                ? "border border-[#633426] bg-[#633426] text-white"
                                : "border border-gray-300 text-gray-600 hover:border-black hover:text-black"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>



        </div>
    );
};

export default Address;
