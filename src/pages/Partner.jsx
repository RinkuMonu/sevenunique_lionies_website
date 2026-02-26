import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PartnerPage = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-linear-to-r from-blue-600 to-indigo-700 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Partner Network</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                        Become a business supplier or delivery partner. Grow with India's leading men's wear platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="#apply" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all">
                            Apply Now
                        </Link>
                        <Link to="#benefits" className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            <section id="benefits" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Partnership</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Whether supplying premium menswear or handling fast deliveries in Jaipur & beyond.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="group relative h-64 rounded-2xl bg-linear-to-br from-emerald-500 to-green-600 p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">
                            <div className="absolute inset-0 bg-black/10 rounded-2xl" />
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Business Partner</h3>
                            <ul className="space-y-2 relative z-10">
                                <li>• Supply authentic brands</li>
                                <li>• Competitive margins</li>
                                <li>• Jaipur warehouse support</li>
                            </ul>
                        </div>
                        <div className="group relative h-64 rounded-2xl bg-linear-to-br from-orange-500 to-red-600 p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">
                            <div className="absolute inset-0 bg-black/10 rounded-2xl" />
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Delivery Partner</h3>
                            <ul className="space-y-2 relative z-10">
                                <li>• Same-day Jaipur delivery</li>
                                <li>• Weekly payouts</li>
                                <li>• App-based tracking</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition">
                            <summary className="font-semibold text-lg cursor-pointer pb-2">What are the requirements for delivery partners?</summary>
                            <p className="text-gray-600 mt-2">Two-wheeler/bike, valid license, Jaipur area coverage. Earn ₹20k-50k/month.</p>
                        </details>
                        <details className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition">
                            <summary className="font-semibold text-lg cursor-pointer pb-2">How do business partners get paid?</summary>
                            <p className="text-gray-600 mt-2">Net-30 terms, 25-40% margins on verified authentic stock.</p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnerPage;
