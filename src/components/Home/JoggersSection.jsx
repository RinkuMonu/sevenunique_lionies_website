import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart } from 'react-icons/bs'

const joggers = [
    {
        id: 1, image: "../images/similar1.png",
        name: "Navy Blue Joggers", price: "1299", original: "2199", badge: "41% OFF", rating: 4.8
    },
    {
        id: 2, image: "../images/similar2.png",
        name: "Black Cargo Joggers", price: "1499", original: "2599", badge: "42% OFF", rating: 4.7
    },
    {
        id: 3, image: "../images/similar3.png",
        name: "Brown Track Pants", price: "1099", original: "1899", badge: "42% OFF", rating: 4.6
    },
    {
        id: 4, image: "../images/similar4.png",
        name: "Purple Joggers", price: "1399", original: "2299", badge: "39% OFF", rating: 4.9
    },
    {
        id: 5, image: "../images/similar5.png",
        name: "Maroon Track Pants", price: "1199", original: "1999", badge: "40% OFF", rating: 4.5
    },
    {
        id: 6, image: "../images/similar1.png",
        name: "Navy Blue Joggers", price: "1299", original: "2199", badge: "41% OFF", rating: 4.8
    },
    {
        id: 7, image: "../images/similar2.png",
        name: "Black Cargo Joggers", price: "1499", original: "2599", badge: "42% OFF", rating: 4.7
    },
    {
        id: 8, image: "../images/similar3.png",
        name: "Brown Track Pants", price: "1099", original: "1899", badge: "42% OFF", rating: 4.6
    },
    {
        id: 9, image: "../images/similar4.png",
        name: "Purple Joggers", price: "1399", original: "2299", badge: "39% OFF", rating: 4.9
    },
    {
        id: 10, image: "../images/similar5.png",
        name: "Maroon Track Pants", price: "1199", original: "1999", badge: "40% OFF", rating: 4.5
    },
]

export default function JoggersSection() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Joggers</h2>
                        <span className="text-sm text-gray-500">Shop now for ultimate comfort</span>
                    </div>
                    <button className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {joggers.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <Link to="#" className="block  overflow-hidden ">
                                <div className="relative h-full">
                                    <div className="absolute top-0 left-0 z-20">
                                        <span className="text-white text-xs px-2 py-1 font-bold  bg-green-500/90">
                                            {product.badge}
                                        </span>
                                    </div>

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    <div className="absolute top-3 right-[-80px] group-hover:right-3 transition-all duration-500 flex flex-col gap-1 z-30">
                                        
                                        <div className="relative group/cart">
                                            <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                                                <BsCart size={16} className="text-gray-800" />
                                            </div>
                                            <span className="absolute -right-28 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 
                                                           group-hover/cart:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg z-10">
                                                Add to cart
                                            </span>
                                        </div>

                                        <div className="relative group/qv">
                                            <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                                                <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            <span className="absolute -right-28 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 
                                                           group-hover/qv:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg z-10">
                                                Quick View
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 px-0 pt-2">
                                    <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg font-bold text-[#633426]">
                                            Rs. {product.price}
                                        </span>
                                        <span className="text-xs text-gray-400 line-through">
                                            Rs. {product.original}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
