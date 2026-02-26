import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { PRODUCTS } from "../../data/products";
import { getCartItems, setCartItems } from "../../utils/cartStorage";

const BANNER_IMAGE = "/images/shoip_your_size_1_1.webp";
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
});

const TopProducts = React.memo(function TopProducts() {
    const handleAddToCart = React.useCallback((product) => {
        const existing = getCartItems();
        const selectedSize = product.sizes?.[0] || "M";
        const selectedColor = product.colors?.[0] || "Black";
        const currentIndex = existing.findIndex(
            (item) => item.productId === product.id && item.size === selectedSize && item.color === selectedColor
        );

        if (currentIndex > -1) {
            existing[currentIndex].quantity += 1;
        } else {
            existing.push({
                lineId: `${product.id}-${selectedSize}-${selectedColor}`,
                productId: product.id,
                quantity: 1,
                size: selectedSize,
                color: selectedColor,
                price: product.price,
                name: product.name,
                image: product.front,
            });
        }

        setCartItems(existing);
    }, []);

    const formattedProducts = React.useMemo(
        () =>
            PRODUCTS.slice(0, 10).map((product) => {
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
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Rated Products</h2>
                        <span className="text-sm text-gray-500">Shop now for ultimate comfort</span>
                    </div>
                    <Link to="/productlist" className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
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

            <div className="w-full my-10">
                <img src={BANNER_IMAGE} alt="Shop your size banner" className="w-full" loading="lazy" decoding="async" />
            </div>
        </>
    );
});

export default TopProducts;
