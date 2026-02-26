import React, { memo, useCallback, useMemo, useState } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaRegStar, FaRegCopy, FaFileDownload, FaStar, FaCheck } from 'react-icons/fa';
import { PiMapPinSimpleArea, PiArrowLeft } from 'react-icons/pi';

const sampleOrders = [
    {
        id: 'ORD-00001',
        product: 'Nike Air Max 270',
        brand: 'Nike',
        rating: 4.2,
        status: 'Delivered',
        date: '2026-02-15',
        price: 4297,
        items: [
            { name: 'Nike Air Max 270 - White', qty: 2, price: 1299, image: '../images/23.jpg' },
            { name: 'Nike Crew Socks', qty: 3, price: 299, image: '../images/Oversized.webp' }
        ],
        hasReviewed: false
    },
    {
        id: 'ORD-00002',
        product: "Levi's Slim Fit Jeans",
        brand: "Levi's",
        rating: 4.0,
        status: 'Delivered',
        date: '2026-02-12',
        price: 2999,
        items: [{ name: "Levi's Slim Fit Jeans - Blue", qty: 1, price: 2999, image: '../images/Similer/S3.webp' }],
        hasReviewed: true
    },
    {
        id: 'ORD-00003',
        product: 'Puma T7 Track Pants',
        brand: 'Puma',
        rating: 4.5,
        status: 'Pending',
        date: '2026-02-18',
        price: 3798,
        items: [
            { name: 'Puma T7 Track Pants - Black', qty: 2, price: 1899, image: '../images/Similer/S10.webp' }
        ],
        hasReviewed: false
    }
];

const OrdersList = ({ orders = sampleOrders }) => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const filteredOrders = useMemo(
        () =>
            orders.filter((order) => {
                const matchesSearch =
                    order.id.toLowerCase().includes(normalizedSearchTerm) ||
                    order.product.toLowerCase().includes(normalizedSearchTerm);
                const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

                return matchesSearch && matchesStatus;
            }),
        [orders, normalizedSearchTerm, filterStatus]
    );

    const goBack = useCallback(() => {
        setViewMode('list');
        setSelectedOrder(null);
    }, []);

    const handleOpenOrderDetails = useCallback((order) => {
        setSelectedOrder(order);
        setViewMode('details');
    }, []);

    if (viewMode === 'details' && selectedOrder) {
        return <OrderDetailsPage order={selectedOrder} onBack={goBack} />;
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center bg-white border rounded-2xl p-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">All Orders ({filteredOrders.length})</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onClick={() => handleOpenOrderDetails(order)}
                    />
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center">
                    <div className="flex items-center justify-center mx-auto">
                        <iframe
                            className="lg:w-[400px] lh:h-[500px]"
                            src="https://lottie.host/embed/424c2a72-0548-4d23-a52b-e36d79336d43/QHunyzsZme.lottie"
                            title="No orders animation"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-500 mb-2">No orders found</h3>
                </div>
            )}
        </div>
    );
};

const OrderDetailsPage = ({ order, onBack }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submittedReview, setSubmittedReview] = useState(null); // Single review storage

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (rating === 0) return;
        
        setSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store the single submitted review
        const review = {
            rating,
            text: reviewText.trim() || '',
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        setSubmittedReview(review);
        setSubmitting(false);
        setShowReviewForm(false); // Hide form permanently
        setRating(0);
        setReviewText('');
    };
    const [copied, setCopied] = useState(false);
    const totalItems = useMemo(
        () => order.items.reduce((sum, item) => sum + item.qty, 0),
        [order.items]
    );

    const handleCopyOrderId = async () => {
        try {
            await navigator.clipboard.writeText(order.id);
            setCopied(true);
            // Reset after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = order.id;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen py-6 px-4">
            <div className="mx-auto max-w-4xl">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 py-1.5 px-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm"
                >
                    <PiArrowLeft className="text-sm" />
                    Back
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                    {/* Existing order header */}
                    <div className="flex items-center justify-between">
                        <div className="font-mono text-lg bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold">
                            {order.id}
                        </div>
                        <StatusBadge status={order.status} />
                    </div>

                    {/* Existing order items section */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                            Order Items ({order.items.length})
                        </h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                                    <div className="w-14 h-14 bg-linear-to-br from-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-gray-900 truncate">{item.name}</div>
                                        <div className="text-xs text-gray-500">₹{item.price.toLocaleString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-sm text-gray-900">x{item.qty}</div>
                                        <div className="text-xs text-gray-500">₹{(item.price * item.qty).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Existing total and address sections */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <div className="text-gray-600 mb-1">Total</div>
                            <div className="font-bold text-xl text-blue-900">₹{order.price.toLocaleString()}</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl">
                            <div className="text-gray-600 mb-1">{order.items.length} items</div>
                            <div className="text-sm">{order.date}</div>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                            <PiMapPinSimpleArea className="text-blue-500" />
                            Address
                        </div>
                        <div className="p-4 border border-gray-300 rounded-xl bg-white/50">
                            <div className="font-semibold text-gray-900">Nandini Singh</div>
                            <div className="text-sm text-gray-700">Jaipur, Rajasthan</div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                            <CiDeliveryTruck className="text-green-500" />
                            Status
                        </div>
                        <div className="p-3 bg-white border border-gray-300 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <div className="text-sm text-gray-500">
                                Razorpay • {totalItems} items
                            </div>
                            <StatusBadge status={order.status} className="px-3 py-1 text-xs" />
                        </div>
                    </div>

                    {order.status === 'Delivered' && (
                        <div className="border-t pt-6">
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
                                <FaRegStar className="text-yellow-500 text-xl" />
                                Your Review
                            </div>

                            {submittedReview && (
                                <div className="p-6 border border-gray-200 rounded-2xl mb-6">
                                    <div className="flex items-start gap-4 mb-2">
                                        <div className="w-12 h-12 border border-gray-200 rounded-2xl flex items-center justify-center shrink-0">
                                            <FaStar className="text-yellow-300 text-2xl" />
                                        </div>
                                        <div className="flex-1 min-w-0 relative">
                                            <div className="font-bold text-gray-900 text-lg mb-1">Nandini Singh</div>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`text-lg transition-all ${
                                                            i < submittedReview.rating 
                                                                ? 'text-yellow-400 fill-yellow-400' 
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                                <span className="text-sm font-medium text-gray-600 ml-2">
                                                    {submittedReview.rating} stars
                                                </span>
                                            </div>
                                            <div className="text-xs absolute right-0 top-0 text-gray-500 bg-white/50 px-3 py-1 rounded-full inline-block">
                                                Submitted {submittedReview.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {submittedReview.text && (
                                        <p className="text-gray-700 leading-relaxed text-base pl-16">
                                            {submittedReview.text}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!submittedReview && !showReviewForm ? (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="w-full text-yellow-500 py-3 px-8 rounded-xl bg-yellow-100 font-bold border border-yellow-200 flex items-center justify-center gap-3 text-base"
                                >
                                    <FaRegStar className="text-xl" />
                                    Write Your First Review
                                </button>
                            ) : (
                                !submittedReview && showReviewForm && (
                                    <form onSubmit={handleSubmitReview} className="space-y-6 p-1">
                                        <div>
                                            <label className="block text-lg font-semibold text-gray-900 mb-4">
                                                Rate this order
                                            </label>
                                            <div className="flex gap-1 justify-center">
                                                {[5, 4, 3, 2, 1].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`cursor-pointer transition-all text-3xl hover:scale-110 ${
                                                            star <= rating
                                                                ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg'
                                                                : 'text-gray-300 hover:text-yellow-400 hover:drop-shadow-lg'
                                                        }`}
                                                        onClick={() => setRating(star)}
                                                    />
                                                ))}
                                            </div>
                                            {!rating && (
                                                <p className="text-center text-sm text-gray-500 mt-2">
                                                    Click a star to rate
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div className='mb-0'>
                                            <label className="block text-lg font-semibold text-gray-900 mb-3">
                                                Share your experience (Optional)
                                            </label>
                                            <textarea
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                rows={4}
                                                placeholder="Tell us about your order experience..."
                                                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-3 focus:ring-yellow-500 focus:border-yellow-500 resize-none text-base"
                                                maxLength={500}
                                            />
                                            <div className="text-right text-xs text-gray-500 mt-1">
                                                {reviewText.length}/500
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-4 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowReviewForm(false);
                                                    setRating(0);
                                                    setReviewText('');
                                                }}
                                                className="w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all text-base border border-gray-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={submitting || rating === 0}
                                                className=" text-blue-600 py-2 w-auto px-6 rounded-xl font-bold transition-all text-base  border-gray-200 border bg-blue-100  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 disabled:gap-0"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaStar className="text-lg" />
                                                        Submit Review
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )
                            )}
                        </div>
                    )}

                    <div className="flex gap-3 pt-6 border-t">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all text-sm shadow-lg">
                            <FaFileDownload className="text-sm" />
                            Download Invoice
                        </button>
                        <button
                        onClick={handleCopyOrderId}
                        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all text-sm shadow-sm ${
                            copied
                                ? 'bg-green-500 text-white shadow-lg scale-105'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-102'
                        }`}
                    >
                        {copied ? (
                            <>
                                <FaCheck className="text-sm animate-pulse" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <FaRegCopy className="text-sm" />
                                Copy Order ID
                            </>
                        )}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const OrderCard = memo(({ order, onClick }) => (
    <div onClick={onClick} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-4">
            <div className="font-mono text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {order.id}
            </div>
            <StatusBadge status={order.status} />
        </div>

        <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    <img src={order.items[0]?.image || '../images/plain.webp'} alt={order.product} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm leading-tight">{order.product}</div>
                    <div className="text-xs text-gray-500">Brand: {order.brand}</div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <FaRegStar
                        key={i}
                        className={`text-sm transition-colors ${i < Math.floor(order.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        size={14}
                    />
                ))}
                <span className="text-sm text-gray-500 ml-1">({order.rating})</span>
            </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
            <span>{order.items.length} items</span>
            <span className="font-medium text-blue-600 group-hover:underline">View Details</span>
        </div>
    </div>
));

const StatusBadge = memo(({ status, className = '' }) => {
    const colors = {
        Delivered: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Cancelled: 'bg-red-100 text-red-800'
    };
    return (
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
            {status}
        </span>
    );
});

export default OrdersList;
