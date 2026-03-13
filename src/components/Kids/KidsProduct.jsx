import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

const KIDS_PRODUCTS = [
    {
        id: 1,
        name: "Kids Dino T-Shirt",
        front: "../images/Kids/K1.jpg",
        back: "/images/Kids/KB1.jpg",
        price: 599,
        originalPrice: 999,
        sizes: ["S", "M", "L"],
        colors: ["Green", "Blue"]
    },
    {
        id: 2,
        name: "Girls Floral Dress",
        front: "/images/Kids/W1.jpg",
        back: "/images/Kids/WB1.jpg",
        price: 1299,
        originalPrice: 1999,
        sizes: ["2-3Y", "4-5Y", "6-7Y"],
        colors: ["Pink", "Yellow"]
    },
    {
        id: 3,
        name: "Boys Cargo Shorts",
        front: "/images/Kids/K5.jpg",
        back: "/images/Kids/KB5.jpg",
        price: 799,
        originalPrice: 1299,
        sizes: ["S", "M", "L"],
        colors: ["Khaki", "Navy"]
    },
    {
        id: 4,
        name: "Unicorn Graphic Tee",
        front: "/images/Kids/K2.jpg",
        back: "/images/Kids/KB2.jpg",
        price: 499,
        originalPrice: 799,
        sizes: ["XS", "S", "M"],
        colors: ["Purple", "White"]
    },
    {
        id: 5,
        name: "Summer Romper Set",
        front: "/images/Kids/K3.jpeg",
        back: "/images/Kids/KB3.jpeg",
        price: 1499,
        originalPrice: 2299,
        sizes: ["12M", "18M", "24M"],
        colors: ["Blue", "Coral"]
    },
    {
        id: 6,
        name: "Boys Surf Tee",
        front: "/images/Kids/K4.jpg",
        back: "/images/Kids/KB4.jpg",
        price: 699,
        originalPrice: 1099,
        sizes: ["S", "M", "L"],
        colors: ["Aqua", "Red"]
    },
    {
        id: 7,
        name: "Girls Ruffle Top",
        front: "/images/Kids/K6.jpg",
        back: "/images/Kids/KB6.jpg",
        price: 899,
        originalPrice: 1499,
        sizes: ["4Y", "5Y", "6Y"],
        colors: ["Peach", "Mint"]
    },
    {
        id: 8,
        name: "Kids Beach Shorts",
        front: "/images/Kids/K7.jpg",
        back: "/images/Kids/KB7.jpg",
        price: 599,
        originalPrice: 999,
        sizes: ["S", "M", "L"],
        colors: ["Orange", "Turquoise"]
    },
    {
        id: 9,
        name: "Cartoon Print Dress",
        front: "/images/Kids/K8.jpg",
        back: "/images/Kids/KB8.jpg",
        price: 1099,
        originalPrice: 1799,
        sizes: ["3-4Y", "5-6Y"],
        colors: ["Multi"]
    },
    {
        id: 10,
        name: "Boys Adventure Tee",
        front: "/images/Kids/K9.jpg",
        back: "/images/Kids/KB9.jpg",
        price: 549,
        originalPrice: 899,
        sizes: ["XS", "S", "M"],
        colors: ["Gray", "Green"]
    }
];

const BANNER_IMAGE = "/images/Kids/B1.webp"; 
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
});

const KidsProducts = React.memo(function KidsProducts() {
    const handleAddToCart = React.useCallback((product) => {
        console.log("Added to cart:", product.name, "Size:", product.sizes?.[0] || "M");
        alert(`${product.name} added to cart! (Demo)`);
    }, []);

    const formattedProducts = React.useMemo(
        () =>
            KIDS_PRODUCTS.map((product) => {
                const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                return {
                    ...product,
                    discountPercent,
                    formattedPrice: CURRENCY_FORMATTER.format(product.price),
                    formattedOriginal: CURRENCY_FORMATTER.format(product.originalPrice),
                };
            }),
        []
    );

    return (
        <>
            <div className=" px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Kids Summer Products</h2>
                        <span className="text-sm text-gray-500">Fun & comfortable summer wear</span>
                    </div>
                    <Link to="/kids-productlist" className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
                        View All 
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {formattedProducts.map((product) => (
                        <article key={product.id} className="group cursor-pointer" aria-label={product.name}>
                            <div className="relative overflow-hidden bg-gray-100">
                                <Link to={`/product/${product.id}`} className="block">
                                    <img
                                        src={product.front}
                                        alt={product.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full transition duration-500 group-hover:opacity-0"
                                    />

                                    <img
                                        src={product.back}
                                        alt={`${product.name} alternate view`}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500"
                                    />

                                    <span className="absolute left-2 top-2 bg-red-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded">
                                        {product.discountPercent}% OFF
                                    </span>
                                </Link>

                                <div className="absolute top-3 right-[-60px] group-hover:right-3 transition-all duration-500">
                                    <button
                                        type="button"
                                        onClick={() => handleAddToCart(product)}
                                        aria-label={`Add ${product.name} to cart`}
                                        className="bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <BsCart size={18} />
                                    </button>
                                </div>
                            </div>

                            <Link to={`/product/${product.id}`} className="block">
                                <p className="mt-3 text-sm font-medium">{product.name}</p>
                                <p className="text-red-500 font-semibold">
                                    Rs. {product.formattedPrice}
                                    <span className="line-through text-gray-400 ml-2">Rs. {product.formattedOriginal}</span>
                                </p>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
});

export default KidsProducts;
