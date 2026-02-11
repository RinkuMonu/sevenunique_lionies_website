import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../components/service/AuthContext";
import { LucideEdit } from "lucide-react";
import api from "../components/service/axios";
import { useNavigate } from "react-router-dom";

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
  const { user, setLoginOpen, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginOpen(true);
      navigate("/");
    }
  }, []);
  const [edit, setEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showOrders, setShowOrders] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);

  const [form, setForm] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    mobile: user?.user?.mobile || "",
    avatar: null,
  });
  useEffect(() => {
    if (user?.user) {
      setForm({
        name: user.user.name || "",
        email: user.user.email || "",
        mobile: user.user.mobile || "",
        avatar: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (name === "mobile") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length === 1 && !/[6-9]/.test(cleaned)) return;
      if (cleaned.length > 10) return;
      setForm((prev) => ({ ...prev, mobile: cleaned }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatar = (e) => {
    setForm((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const trackingSteps = [
    { title: "Order Confirmed", active: true },
    { title: "Order being packed", active: true },
    { title: "Picked by rider", active: true },
    { title: "Out for Delivery", active: false },
    { title: "Rider is en route – Live Map", active: false },
    { title: "Delivered, OTP verified", active: false },
  ];
  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Invalid email format";

    if (!form.mobile || form.mobile.length !== 10)
      err.mobile = "Valid 10-digit mobile required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };
  const handleSave = async () => {
    if (!validate()) return;

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("mobile", form.mobile);
    if (form.password) fd.append("password", form.password);

    try {
      setloading(true);
      const res = await api.put("/auth/update", fd);

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setEdit(false);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f3eb] py-8">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT PROFILE */}
        <div className="bg-white rounded-3xl h-fit shadow-lg p-6 text-center border border-[#927f6830] sticky top-6">
          <label className="relative w-32 h-32 mx-auto block cursor-pointer">
            <img
              src={
                `http://localhost:5000${user?.user?.avatar}` ||
                "/image/avatar.jpg"
              }
              alt="User"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-[#927f68]"
            />

            {/* EDIT ICON */}
            <div className="absolute bottom-2 right-2 bg-[#927f68] p-1 rounded-full text-white shadow-lg">
              <LucideEdit size={10} />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const fd = new FormData();
                fd.append("avatar", file);

                try {
                  const res = await api.put("/auth/update", fd);
                  setUser(res.data);
                } catch (err) {
                  alert("Avatar update failed");
                }
              }}
            />
          </label>

          <h2 className="text-xl font-semibold text-[#927f68]">
            {user?.user?.name || "Lionies user"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.user?.email || "abc@123gmail.com"}
          </p>

          <div className="flex justify-center gap-2 mt-4">
            <span className="px-4 py-1 text-xs rounded-full bg-[#927f68] text-white">
              Premium User
            </span>
            <span className="px-4 py-1 text-xs rounded-full border border-[#927f68] text-[#927f68]">
              {new Date(user?.user?.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="mt-6 space-y-3 text-sm text-left text-gray-700">
            <div className="flex items-center gap-2">
              <FaShoppingBag className="text-[#927f68]" />{" "}
              {user?.totalOrder || 0} Orders
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="text-[#927f68]" /> {user?.totalWishList || 0}{" "}
              Wishlist Items
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {/* TABS ROW */}
          <div className="bg-white shadow-lg p-3 border border-[#927f6830] flex gap-3">
            {[
              { key: "details", label: "User Details" },
              { key: "orders", label: "Previous Orders" },
              { key: "tracking", label: "Latest Tracking" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium transition
                  ${
                    activeTab === tab.key
                      ? "bg-[#927f68] text-white"
                      : "bg-[#f9f3eb] text-[#927f68] hover:bg-[#927f68] hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* USER DETAILS */}
          {activeTab === "details" && (
            <div className="bg-white shadow-lg p-6 border border-[#927f6830]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#927f68]">
                  Account Details
                </h3>
                <button
                  onClick={edit ? handleSave : () => setEdit(true)}
                  disabled={loading}
                  className={`px-5 py-2 text-sm rounded-full cursor-pointer bg-[#927f68] text-white ${loading && "cursor-not-allowed "}`}
                >
                  {edit ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                  <input
                    name="name"
                    value={form.name}
                    disabled={!edit}
                    onChange={handleChange}
                    className="border border-gray-400 p-3 w-full"
                    placeholder="Full Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    name="email"
                    value={form.email}
                    disabled={!edit}
                    onChange={handleChange}
                    className="border border-gray-400 p-3 w-full"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <input
                    name="password"
                    type="password"
                    disabled={!edit}
                    onChange={handleChange}
                    className="border border-gray-400 p-3 w-full"
                    placeholder="New Password (optional)"
                  />
                </div>

                {/* MOBILE */}
                <div>
                  <input
                    name="mobile"
                    value={form.mobile}
                    disabled={!edit}
                    onChange={handleChange}
                    className="border border-gray-400 p-3 w-full"
                    placeholder="Phone"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                  )}
                </div>
              </div>

              <textarea
                disabled={!edit}
                defaultValue="Jaipur, Rajasthan, India"
                className="border border-gray-400 p-3 w-full mt-4"
                placeholder="Address"
              />
            </div>
          )}

          {/* PREVIOUS ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white shadow-lg p-6 border border-[#927f6830] space-y-6">
              <h3 className="text-lg font-semibold text-[#927f68]">
                Previous Orders
              </h3>

              {/* ORDER CARD */}
              <div className="border border-gray-200">
                {/* ORDER HEADER */}
                <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-50 p-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-medium">March 23, 2023</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="text-green-600 font-medium">Placed</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-medium">₹2274.20</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Order Id</p>
                    <p
                      onClick={() => setShowTrackingModal(true)}
                      className="font-medium flex items-center gap-1 cursor-pointer underline text-black"
                    >
                      27245875
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#927f68] text-white text-sm">
                      Order Again
                    </button>
                    <button className="px-4 py-2 border text-sm">
                      View Order
                    </button>
                  </div>
                </div>

                {/* DELIVERY INFO */}
                <div className="p-4 text-sm text-gray-600 border-t">
                  Estimated Delivery Thu, April 20 - Wed, May 2
                </div>

                {/* PRODUCT ITEM */}
                <div className="flex gap-6 p-6 border-t">
                  <img
                    src="/image/tee1.jpg"
                    alt=""
                    className="w-28 h-28 object-cover"
                  />

                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-lg">
                      Fiddle Leaf Fig – Large (5ft)
                    </h4>

                    <p className="text-sm text-gray-600">Size: Medium</p>

                    <p className="text-sm text-gray-600">Quantity: 1</p>

                    <p className="text-sm text-gray-600">
                      Category: Indoor Plants
                    </p>

                    <p className="text-sm text-gray-600">Fabric: Cotton</p>
                  </div>

                  <div className="text-right space-y-3">
                    <p className="text-lg font-semibold text-green-700">
                      ₹1145
                    </p>

                    <button className="px-4 py-2 border text-sm">
                      Buy It Again
                    </button>
                  </div>
                </div>

                {/* SECOND PRODUCT */}
                <div className="flex gap-6 p-6 border-t">
                  <img
                    src="/image/tee1.jpg"
                    alt=""
                    className="w-28 h-28 object-cover"
                  />

                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-lg">
                      Sansevieria Trifasciata ‘Laurentii’
                    </h4>

                    <p className="text-sm text-gray-600">Size: Large</p>

                    <p className="text-sm text-gray-600">Quantity: 1</p>

                    <p className="text-sm text-gray-600">
                      Category: Indoor Plants
                    </p>

                    <p className="text-sm text-gray-600">Fabric: Cotton</p>
                  </div>

                  <div className="text-right space-y-3">
                    <p className="text-lg font-semibold text-green-700">
                      ₹1129
                    </p>

                    <button className="px-4 py-2 border text-sm">
                      Buy It Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LATEST ORDER TRACKING */}
          {activeTab === "tracking" && (
            <div className="bg-white shadow-lg p-6 border border-[#927f6830]">
              <h3 className="text-lg font-semibold text-[#927f68] mb-6">
                Latest Order Tracking
              </h3>

              <div className="flex items-center justify-between gap-6 px-4 overflow-x-auto">
                <HorizontalTimelineItem
                  icon={<FaBox />}
                  title="Order Placed"
                  date="12 Feb 2026"
                  active
                />
                <Connector active />
                <HorizontalTimelineItem
                  icon={<FaTruck />}
                  title="Shipped"
                  date="13 Feb 2026"
                  active
                />
                <Connector />
                <HorizontalTimelineItem
                  icon={<FaMapMarkerAlt />}
                  title="Out for Delivery"
                  date="14 Feb 2026"
                />
                <Connector />
                <HorizontalTimelineItem
                  icon={<FaCheckCircle />}
                  title="Delivered"
                  date="Expected 15 Feb"
                />
              </div>
            </div>
          )}

          {showTrackingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white w-full max-w-md p-6 relative shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-black">
                    Order Tracking
                  </h3>
                  <button
                    onClick={() => setShowTrackingModal(false)}
                    className="text-gray-500 hover:text-black text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Timeline */}
                <div className="relative ">
                  {/* Vertical line */}
                  <div className="absolute left-[10px] top-0 bottom-0 w-px bg-gray-300" />

                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex gap-4 mb-6 last:mb-0">
                      {/* Dot */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center z-10
                ${step.active ? "bg-[#927f68]" : "bg-gray-300"}`}
                      >
                        {step.active && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <p
                          className={`font-medium ${
                            step.active ? "text-black" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>

                        {step.title.includes("Live Map") && step.active && (
                          <button className="text-sm text-black underline mt-1">
                            View Live Map
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 text-right">
                  <button
                    onClick={() => setShowTrackingModal(false)}
                    className="px-5 py-2 bg-[#927f68] text-white text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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
              : "bg-[#f5f0dd] text-[#927f68]"
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
      className={`h-1 flex-1 rounded-full mb-8 ${
        active ? "bg-[#927f68]" : "bg-[#e5dfcf]"
      }`}
    />
  );
}
