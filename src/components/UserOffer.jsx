import React, { useEffect, useMemo, useRef, useState } from 'react';

const OFFERS = [
    {
        id: 1,
        img: '../images/Coupons/Co1.jpg',
        discount: '15% OFF',
        detail: 'on purchase',
        code: 'NIKE15',
        expiryDate: '2026-02-28',
        featured: true,
        active: true
    },
    {
        id: 2,
        img: '../images/Coupons/Co2.jpg',
        discount: 'Flat 10% OFF',
        detail: 'Min purchase',
        code: 'ADIDAS10',
        expiryDate: '2026-03-04',
        featured: false,
        active: true
    },
    {
        id: 3,
        img: '../images/Coupons/Co3.jpg',
        discount: 'Flat 10% OFF ₹999',
        detail: 'Min purchase',
        code: 'NORETURN10',
        expiryDate: '2026-03-15',
        featured: true,
        active: true
    },
    {
        id: 4,
        img: '../images/Coupons/Co4.jpg',
        discount: 'Flat 5% OFF',
        detail: 'Min purchase',
        code: 'NEWMENS5',
        expiryDate: '2026-04-01',
        featured: false,
        active: true
    }
];

const TABS = ['Trending', 'Discount', 'Expiring Soon', 'All'];

const getDiscountValue = (discountText) => {
    const match = discountText.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
};

const getDaysUntilExpiry = (dateString, referenceDate) => {
    const now = new Date(referenceDate);
    now.setHours(0, 0, 0, 0);
    const expiry = new Date(dateString);
    expiry.setHours(0, 0, 0, 0);
    const diffMs = expiry - now;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

const formatExpiry = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

const UserOffer = () => {
    const [activeTab, setActiveTab] = useState('Trending');
    const [copiedCode, setCopiedCode] = useState('');
    const copyResetTimeoutRef = useRef(null);
    const today = useMemo(() => new Date(), []);

    useEffect(() => () => {
        if (copyResetTimeoutRef.current) {
            clearTimeout(copyResetTimeoutRef.current);
        }
    }, []);

    const tabCounts = useMemo(() => {
        const activeOffers = OFFERS.filter((offer) => offer.active);
        const discountOffers = activeOffers.filter((offer) => getDiscountValue(offer.discount) >= 10);
        const expiringSoonOffers = activeOffers.filter((offer) => {
            const daysLeft = getDaysUntilExpiry(offer.expiryDate, today);
            return daysLeft >= 0 && daysLeft <= 7;
        });
        const trendingOffers = activeOffers.filter((offer) => offer.featured);

        return {
            Trending: trendingOffers.length,
            Discount: discountOffers.length,
            'Expiring Soon': expiringSoonOffers.length,
            All: activeOffers.length
        };
    }, [today]);

    const filteredOffers = useMemo(() => {
        const activeOffers = OFFERS.filter((offer) => offer.active);

        switch (activeTab) {
            case 'Discount':
                return activeOffers.filter((offer) => getDiscountValue(offer.discount) >= 10);
            case 'Expiring Soon':
                return activeOffers
                    .filter((offer) => {
                        const daysLeft = getDaysUntilExpiry(offer.expiryDate, today);
                        return daysLeft >= 0 && daysLeft <= 7;
                    })
                    .sort((a, b) => getDaysUntilExpiry(a.expiryDate, today) - getDaysUntilExpiry(b.expiryDate, today));
            case 'All':
                return activeOffers;
            case 'Trending':
            default:
                return activeOffers.filter((offer) => offer.featured);
        }
    }, [activeTab, today]);

    const copyCode = async (code) => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(code);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            setCopiedCode(code);
            if (copyResetTimeoutRef.current) {
                clearTimeout(copyResetTimeoutRef.current);
            }
            copyResetTimeoutRef.current = setTimeout(() => setCopiedCode(''), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Header & Tabs */}
            <div className="flex flex-col lg:flex-row justify-between mb-8 gap-3 items-start lg:items-center bg-white border border-gray-200 rounded-2xl p-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Offers</h1>
                    <p className="text-sm text-gray-500 mt-1">Filter by trending, discount level, or expiry window.</p>
                </div>
                <div className="flex flex-wrap gap-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            {tab} <span className="ml-1 text-xs opacity-80">({tabCounts[tab] ?? 0})</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Offers Grid */}
            {filteredOffers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredOffers.map((offer) => {
                    const daysLeft = getDaysUntilExpiry(offer.expiryDate, today);
                    return (
                    <div key={offer.id} className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                        {/* Image */}
                        <div className="relative mb-4">
                            <img 
                                src={offer.img} 
                                alt={offer.code}
                                loading="lazy"
                                className="w-full h-48 md:h-52 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                <span className="text-xs font-bold text-gray-900">{offer.discount}</span>
                            </div>
                            {daysLeft <= 7 && (
                                <div className="absolute top-3 left-3 bg-red-50 border border-red-200 px-3 py-1 rounded-full shadow-sm">
                                    <span className="text-xs font-bold text-red-600">
                                        {daysLeft === 0
                                            ? 'Ends Today'
                                            : `${daysLeft}d left`}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-600">{offer.detail}</p>
                            <div className="font-semibold text-lg text-gray-900">Code: {offer.code}</div>
                            <div className="text-xs text-gray-500">Exp: {formatExpiry(offer.expiryDate)}</div>
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={() => copyCode(offer.code)}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                            disabled={copiedCode === offer.code}
                        >
                            {copiedCode === offer.code ? 'Copied!' : `Copy ${offer.code}`}
                        </button>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    );
                })}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">No offers in this filter</h3>
                    <p className="text-sm text-gray-500 mt-1">Try switching to another tab.</p>
                </div>
            )}
        </div>
    );
};

export default UserOffer;
