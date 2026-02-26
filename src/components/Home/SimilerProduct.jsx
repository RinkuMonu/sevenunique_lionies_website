import React, { useState } from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        title: "Women Oversized T-Shirt",
        price: "Rs. 1,200",
        originalPrice: "Rs. 1,800",
        image: "/images/similar1.png",
        colors: ["#000000", "#ff6b6b", "#4ecdc4"],
    },
    {
        id: 2,
        title: "Women Graphic T-Shirt",
        price: "Rs. 1,000",
        originalPrice: "Rs. 1,500",
        image: "/images/similar2.png",
        colors: ["#ffffff", "#333333", "#666666"],
    },
    {
        id: 3,
        title: "Women Sun Graphic T-Shirt",
        price: "Rs. 1,100",
        originalPrice: "Rs. 1,600",
        image: "/images/similar3.png",
        colors: ["#808080", "#ffffff"],
    },
    {
        id: 4,
        title: "Men Regular Fit Shirt",
        price: "Rs. 2,400",
        originalPrice: "Rs. 3,000",
        image: "/images/similar4.png",
        colors: ["#000000", "#ff9500", "#4a4a4a", "#ffffff"],
    },
];

const SimilerProduct = () => {
    const [selectedColors, setSelectedColors] = useState({
        1: "#000000",
        2: "#ffffff",
        3: "#808080",
        4: "#000000",
    });

    const handleColorSelect = (productId, color) => {
        setSelectedColors((prev) => ({
            ...prev,
            [productId]: color,
        }));
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Similer Product</h2>
                        <span className="text-sm text-gray-500">Trending Pieces You'll Want</span>
                    </div>
                    <Link to="/productlist" className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative cursor-pointer bg-white overflow-hidden">
                            <div className="relative h-80 lg:h-96 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 shadow-lg">
                                    New
                                </span>

                                <Link
                                    to={`/product/${product.id}`}
                                    className="absolute text-center bottom-6 w-[90%] left-1/2 right-10 -translate-x-1/2 bg-black text-white px-8 py-3 rounded-sm font-semibold shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all cursor-pointer duration-300 transform -translate-y-4 group-hover:translate-y-0"
                                >
                                    Select
                                </Link>
                            </div>

                            <div className="py-2">
                                <h3 className="text-lg md:text-md font-semibold text-gray-900 line-clamp-2">{product.title}</h3>

                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-md font-bold text-gray-900">{product.price}</span>
                                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Color:</span>
                                    <div className="flex gap-1">
                                        {product.colors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleColorSelect(product.id, color)}
                                                className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 cursor-pointer relative ${
                                                    selectedColors[product.id] === color
                                                        ? "border-black ring-4 ring-white/50 shadow-lg scale-110"
                                                        : "border-gray-300 hover:border-gray-500 hover:shadow-md"
                                                }`}
                                                aria-label={`Select ${color} color`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimilerProduct;