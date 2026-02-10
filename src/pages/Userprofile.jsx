import React, { useState } from "react";
import {
    FaShoppingBag,
    FaHeart,
    FaBox,
    FaTruck,
    FaCheckCircle,
    FaMapMarkerAlt,
} from "react-icons/fa";

const orders = [
    {
        id: "ORD001",
        product: "Cotton Kurti",
        image: "/image/tee1.jpg",
        size: "M",
        qty: 1,
        price: 1299,
        status: "Delivered",
    },
    {
        id: "ORD002",
        product: "Denim Jacket",
        image: "/image/tee1.jpg",
        size: "L",
        qty: 1,
        price: 2499,
        status: "Shipped",
    },
    {
        id: "ORD003",
        product: "Floral Dress",
        image: "/image/tee1.jpg",
        size: "S",
        qty: 2,
        price: 1999,
        status: "Processing",
    },
];


export default function UserProfilePage() {
    const [showOrders, setShowOrders] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f2e8] py-10">
            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* LEFT PROFILE */}
                <div className="bg-white rounded-3xl h-fit shadow-lg p-6 text-center border border-[#927f6830] sticky top-6">

                    <img
                        src="/image/avatar.jpg"
                        alt="User"
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-[#927f68]"
                    />

                    <h2 className="text-xl font-semibold text-[#927f68]">
                        Devika Chhipa
                    </h2>
                    <p className="text-sm text-gray-500">devika@email.com</p>

                    <div className="flex justify-center gap-2 mt-4">
                        <span className="px-4 py-1 text-xs rounded-full bg-[#927f68] text-white">
                            Premium User
                        </span>
                        <span className="px-4 py-1 text-xs rounded-full border border-[#927f68] text-[#927f68]">
                            Since 2023
                        </span>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-left text-gray-700">
                        <div className="flex items-center gap-2">
                            <FaShoppingBag className="text-[#927f68]" /> 24 Orders
                        </div>
                        <div className="flex items-center gap-2">
                            <FaHeart className="text-[#927f68]" /> 12 Wishlist Items
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="lg:col-span-3 space-y-6">
                    {/* ACCOUNT DETAILS */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-[#927f6830]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-[#927f68]">
                                Account Details
                            </h3>
                            <button
                                onClick={() => setEdit(!edit)}
                                className="px-5 py-2 text-sm rounded-full bg-[#927f68] text-white hover:opacity-90 transition"
                            >
                                {edit ? "Save Changes" : "Edit Profile"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Full Name",
                                "Email",
                                "Password",
                                "Phone",
                            ].map((label, i) => (
                                <input
                                    key={i}
                                    disabled={!edit}
                                    defaultValue={
                                        label === "Full Name"
                                            ? "Devika Chhipa"
                                            : label === "Email"
                                                ? "devika@email.com"
                                                : label === "Password"
                                                    ? "password"
                                                    : "+91 98765 43210"
                                    }
                                    type={label === "Password" ? "password" : "text"}
                                    className="border border-gray-400 rounded-xl p-3 w-full"
                                    placeholder={label}
                                />
                            ))}
                        </div>

                        <textarea
                            disabled={!edit}
                            defaultValue="Jaipur, Rajasthan, India"
                            className="border border-gray-400 rounded-xl p-3 w-full mt-4 "
                            placeholder="Address"
                        />
                    </div>

                    {/* ORDER HISTORY */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-[#927f6830]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#927f68]">
                                Order History
                            </h3>
                            <button
                                onClick={() => setShowOrders(!showOrders)}
                                className="text-sm px-4 py-2 rounded-full border border-[#927f68] text-[#927f68] hover:bg-[#927f68] hover:text-white transition"
                            >
                                {showOrders ? "Hide Orders" : "View Orders"}
                            </button>
                        </div>

                        {showOrders && (
                            <div className="mt-6 space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between bg-[#f9f3eb] rounded-2xl p-4 gap-4"
                                    >
                                        {/* LEFT: IMAGE + DETAILS */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={order.image}
                                                alt={order.product}
                                                className="w-16 h-16 rounded-xl object-cover border border-[#927f6830]"
                                            />

                                            <div>
                                                <p className="font-medium">{order.product}</p>
                                                <p className="text-sm text-gray-600">
                                                    Order ID: {order.id}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Size {order.size} • Qty {order.qty}
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT: PRICE + STATUS */}
                                        <div className="text-right">
                                            <p className="font-semibold text-[#927f68]">
                                                ₹{order.price}
                                            </p>
                                            <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#927f68] text-[#927f68]">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* ORDER TRACKING */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-[#927f6830]">
                        <h3 className="text-lg font-semibold text-[#927f68] mb-4">
                            Latest Order Tracking
                        </h3>

                       <div className="overflow-x-auto">
  <div className="flex items-center justify-between gap-6 px-4">
    <HorizontalTimelineItem
      icon={<FaBox />}
      title="Order Placed"
      date="12 Feb 2026"
      active
      last={false}
    />

    <Connector active />

    <HorizontalTimelineItem
      icon={<FaTruck />}
      title="Shipped"
      date="13 Feb 2026"
      active
      last={false}
    />

    <Connector active />

    <HorizontalTimelineItem
      icon={<FaMapMarkerAlt />}
      title="Out for Delivery"
      date="14 Feb 2026"
      active={false}
      last={false}
    />

    <Connector active={false} />

    <HorizontalTimelineItem
      icon={<FaCheckCircle />}
      title="Delivered"
      date="Expected 15 Feb"
      active={false}
      last
    />
  </div>
</div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ icon, title, date, active }) {
    return (
        <div className="flex items-start gap-4">
            <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${active
                        ? "bg-[#927f68] text-white"
                        : "bg-[#f5f0dd] text-[#927f68]"
                    }`}
            >
                {icon}
            </div>
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{date}</p>
            </div>
        </div>
    );
}

function HorizontalTimelineItem({ icon, title, date, active }) {
  return (
    <div className="flex flex-col items-center min-w-[140px] text-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3
          ${
            active
              ? "bg-[#927f68] text-white shadow-lg"
              : "bg-[#f5f0dd] text-[#927f68] border border-[#927f6830]"
          }`}
      >
        {icon}
      </div>

      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  );
}

function Connector({ active }) {
  return (
    <div
      className={`h-1 flex-1 rounded-full ${
        active ? "bg-[#927f68] mb-8" : "bg-[#e5dfcf] mb-8"
      }`}
    />
  );
}

