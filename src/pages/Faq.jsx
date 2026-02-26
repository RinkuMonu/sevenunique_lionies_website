import React, { useState } from "react";
import { 
    FaShippingFast, FaBox, FaCartArrowDown, FaExchangeAlt, FaShieldAlt, FaCreditCard, 
    FaStore, FaLandmark, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaHeadset 
} from "react-icons/fa";
import {
    RiAccountPinCircleFill, RiMapPinTimeFill, RiArrowLeftBoxFill, RiGift2Fill,
    RiInformationFill, RiCustomerService2Fill, RiWallet3Fill, RiTruckFill
} from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { PiCursorClickFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";

const Faq = () => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [activeTab, setActiveTab] = useState("Shipping");
    const [searchQuery, setSearchQuery] = useState("");

    const tabs = [
        { key: "Shipping", label: "Shipping & Delivery", icon: FaShippingFast },
        { key: "Orders", label: "Orders", icon: FaBox },
        { key: "Payment", label: "Payment", icon: FaCreditCard },
        { key: "Tracking", label: "Tracking", icon: RiMapPinTimeFill },
        { key: "Return Process", label: "Returns", icon: RiArrowLeftBoxFill },
        { key: "Returns & Exchange", label: "Exchanges", icon: FaExchangeAlt },
        { key: "My Account", label: "Account", icon: RiAccountPinCircleFill },
        { key: "Buy Now", label: "Buy Now Pay Later", icon: FaCartArrowDown },
        { key: "Click & Collect", label: "Click & Collect", icon: PiCursorClickFill },
        { key: "Gift Cards", label: "Gift Cards", icon: RiGift2Fill },
        { key: "Landmark Rewards", label: "Rewards", icon: FaStar },
        { key: "In Store", label: "In-Store", icon: FaStore },
        { key: "Account Deletion", label: "Delete Account", icon: TiUserDelete },
        { key: "Other Information", label: "Others", icon: RiInformationFill }
    ];

    const faqData = {
        Shipping: [
            { id: 1, question: "When will I receive my order?", answer: "Delivery times vary by location. Check estimated delivery on product pages by entering your pincode." },
            { id: 2, question: "What if I'm not home during delivery?", answer: "Our delivery partner will contact you to reschedule. They attempt delivery 2-3 times before returning." },
            { id: 3, question: "Do you ship all products together?", answer: "Items may ship separately based on warehouse availability. You'll receive tracking for each shipment." }
        ],
        "My Account": [
            { id: 1, question: "How do I update my profile information?", answer: "Login → My Account → Profile Settings. Update name, email, phone, and address as needed." },
            { id: 2, question: "How do I change my password?", answer: "Go to My Account → Security → Change Password. Enter current password and new password twice." },
            { id: 3, question: "Can I have multiple shipping addresses?", answer: "Yes! Add and save multiple addresses in My Account → Addresses for quick checkout." }
        ],
        Orders: [
            { id: 1, question: "How do I track my order?", answer: "Login → My Orders → Click on order number to view real-time tracking and status updates." },
            { id: 2, question: "Can I cancel my order?", answer: "Orders can be cancelled before packing (within 30 mins). Go to My Orders → Cancel Order." },
            { id: 3, question: "Where is my invoice?", answer: "Download invoices from My Orders. Physical invoice included in every package." }
        ],
        Payment: [
            { id: 1, question: "What payment methods do you accept?", answer: "Credit/Debit cards, UPI, Net Banking, Wallets (Paytm/PhonePe), EMI, and Cash on Delivery." },
            { id: 2, question: "Is my payment secure?", answer: "Yes, all payments processed via PCI-DSS compliant gateways with 256-bit SSL encryption." },
            { id: 3, question: "When will I receive refund?", answer: "Refunds processed within 5-7 days to original payment method after return approval." }
        ],
        "Buy Now": [
            { id: 1, question: "What is Buy Now Pay Later?", answer: "Pay in 3 interest-free installments or full payment later via Simplify, LazyPay, or ZestMoney." },
            { id: 2, question: "Do I need approval for Buy Now?", answer: "Instant approval based on your payment history. No paperwork required." },
            { id: 3, question: "What are the payment dates?", answer: "1st installment at purchase, 2nd & 3rd after 30 & 60 days. Clear reminders sent via SMS/email." }
        ],
        Tracking: [
            { id: 1, question: "How do I know my order shipped?", answer: "You'll receive SMS/email with tracking link once order ships. Check My Orders anytime." },
            { id: 2, question: "What do tracking statuses mean?", answer: "Order Confirmed → Packed → Shipped → Out for Delivery → Delivered. Live GPS tracking available." },
            { id: 3, question: "My tracking shows delivered but I didn't receive?", answer: "Contact support with AWB number. We'll coordinate with courier for investigation." }
        ],
        "Return Process": [
            { id: 1, question: "What is your return policy?", answer: "15-day free returns on all apparel. Return unused items in original packaging with tags." },
            { id: 2, question: "How do I initiate a return?", answer: "My Orders → Select order → Return Items → Choose reason → Print return label." },
            { id: 3, question: "How long does return pickup take?", answer: "Pickup scheduled within 2-3 days. Track return status in My Returns section." }
        ],
        "Returns & Exchange": [
            { id: 1, question: "Can I exchange for different size?", answer: "Yes! Exchange for same product different size/color within 15 days. Same shipping fee applies." },
            { id: 2, question: "What items are non-returnable?", answer: "Innerwear, custom stitching, personalized items, and used/discarded packaging items." },
            { id: 3, question: "Do I get full refund on returns?", answer: "Full refund minus shipping if return approved. Original payment method credited." }
        ],
        "Click & Collect": [
            { id: 1, question: "What is Click & Collect?", answer: "Order online, collect free from nearest store. Available in 50+ cities across India." },
            { id: 2, question: "How long to collect my order?", answer: "Ready for pickup within 2 hours. SMS alert with pickup code sent to registered mobile." },
            { id: 3, question: "What if I can't collect on time?", answer: "Valid for 7 days. After that, order auto-cancelled with full refund to original payment." }
        ],
        "Gift Cards": [
            { id: 1, question: "How do I use gift cards?", answer: "Enter 16-digit code at checkout. Can combine multiple gift cards in single order." },
            { id: 2, question: "Can I use partial gift card amount?", answer: "Yes! Pay remaining amount via any other payment method. No minimum order value." },
            { id: 3, question: "What is gift card validity?", answer: "1 year from activation date. Check balance and expiry in My Account → Gift Cards." }
        ],
        "Other Information": [
            { id: 1, question: "What is your size guide?", answer: "Click Size Guide on every product. Measurements in inches for chest, waist, length." },
            { id: 2, question: "Do you offer gift wrapping?", answer: "Yes! Select gift wrap at checkout (₹99). Add personalized message up to 100 characters." },
            { id: 3, question: "How do I contact customer care?", answer: "WhatsApp: +91-XXXXXXXXX or Email: care@yourstore.com. Live chat available 10AM-10PM." }
        ],
        "Landmark Rewards": [
            { id: 1, question: "How do I join Rewards program?", answer: "Auto-enrolled! Earn 1 point per ₹100 spent. 50 points = ₹100 voucher." },
            { id: 2, question: "Where can I redeem reward points?", answer: "All purchases online and 500+ stores. Points valid 12 months from earning date." },
            { id: 3, question: "How do I check my points balance?", answer: "My Account → Rewards. View points history, expiry dates, and redeem vouchers." }
        ],
        "In Store": [
            { id: 1, question: "Do you have physical stores?", answer: "Yes! 100+ stores across India. Find nearest store using Store Locator on homepage." },
            { id: 2, question: "Can I return online orders in store?", answer: "Yes! Free in-store returns. Show order details and get instant exchange/refund." },
            { id: 3, question: "Are store prices same as online?", answer: "Yes, same prices + exclusive in-store offers. Loyalty points earned everywhere." }
        ],
        "Account Deletion": [
            { id: 1, question: "How do I delete my account?", answer: "My Account → Data & Privacy → Delete Account → Confirm via email link." },
            { id: 2, question: "What happens when I delete account?", answer: "All personal data + order history permanently deleted within 30 days. Cannot be recovered." },
            { id: 3, question: "Can I create new account later?", answer: "Yes, using different email. Previous orders/points won't transfer to new account." }
        ]
    };

    const filteredFaqs = faqData[activeTab]?.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const IconComponent = tabs.find(tab => tab.key === activeTab)?.icon || FaShippingFast;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        <span className="text-sm text-gray-500">Find answers to common questions about orders, payments, returns & more</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* SEARCH */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
                                <div className="relative">
                                    <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search FAQs..."
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* TABS */}
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-3">
                                        <IconComponent className="text-2xl text-blue-600" />
                                        All Categories
                                    </h3>
                                </div>
                                <nav className="max-h-96 overflow-y-auto sidebar">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.key}
                                                onClick={() => {
                                                    setActiveTab(tab.key);
                                                    setSearchQuery("");
                                                    setOpenAccordion(null);
                                                }}
                                                className={`w-full flex items-center gap-4 p-5 hover:bg-blue-50 transition-all duration-200 group ${
                                                    activeTab === tab.key
                                                        ? "bg-linear-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-inner"
                                                        : "hover:shadow-md"
                                                }`}
                                            >
                                                <Icon className={`w-6 h-6 shrink-0 transition-transform ${
                                                    activeTab === tab.key ? "scale-110 text-blue-600" : "text-gray-500 group-hover:text-blue-600"
                                                }`} />
                                                <span className="font-semibold text-left flex-1">{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* CONTACT */}
                            <div className="mt-8 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-2xl shadow-2xl p-6">
                                <h4 className="font-bold text-xl mb-3 flex items-center gap-3">
                                    <FaHeadset className="w-6 h-6" />
                                    Need Help?
                                </h4>
                                <p className="text-emerald-100 mb-4">Can't find your answer?</p>
                                <div className="space-y-3">
                                    <a href="tel:+919876543210" className="flex items-center gap-3 hover:scale-105 transition-transform">
                                        <FaPhoneAlt className="w-5 h-5" />
                                        +91 01234567898
                                    </a>
                                    <a href="mailto:care@yourstore.com" className="flex items-center gap-3 hover:scale-105 transition-transform">
                                        <RiCustomerService2Fill className="w-5 h-5" />
                                        care@yourstore.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-4">
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 overflow-hidden">
                            {/* HEADER */}
                            <div className="bg-[#0043dc] p-4 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20  flex items-center justify-center">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black">{tabs.find(t => t.key === activeTab)?.label}</h2>
                                        <p className="opacity-90 mt-1">{filteredFaqs.length} questions</p>
                                    </div>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="ml-auto p-2 hover:bg-white/20 rounded-xl transition-all"
                                        >
                                            <IoIosClose className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* ACCORDION */}
                            <div className="p-8 divide-y divide-gray-100">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((item) => (
                                        <div key={item.id} className="pb-6">
                                            <button
                                                onClick={() => toggleAccordion(item.id)}
                                                className="w-full flex justify-between cursor-pointer  items-start py-4 px-2 focus:outline-0 outline-0 text-left group hover:bg-gray-50 rounded-xl p-4 transition-all duration-200"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors pr-4">
                                                        {item.question}
                                                    </h3>
                                                </div>
                                                <div className="shrink-0 ml-4">
                                                    <IoIosArrowDown 
                                                        className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                                            openAccordion === item.id ? 'rotate-180 text-blue-600' : ''
                                                        }`} 
                                                    />
                                                </div>
                                            </button>

                                            {openAccordion === item.id && (
                                                <div className="mt-4 pt-6 border-t border-gray-100">
                                                    <p className="text-gray-700 leading-relaxed text-lg">{item.answer}</p>
                                                    
                                                    {/* HELPFUL BUTTONS */}
                                                    <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                                                        <span className="text-sm text-gray-500 font-medium">Helpful?</span>
                                                        <div className="flex gap-3">
                                                            <button className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 transition-all font-medium">
                                                                Yes (87%)
                                                            </button>
                                                            <button className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl hover:bg-red-100 transition-all font-medium">
                                                                No (13%)
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20">
                                        <HiOutlineSearch className="w-24 h-24 text-gray-300 mx-auto mb-6 opacity-50" />
                                        <h3 className="text-2xl font-bold text-gray-500 mb-2">No results found</h3>
                                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                            Try searching with different keywords or browse all questions in this category.
                                        </p>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg"
                                        >
                                            Clear Search
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
