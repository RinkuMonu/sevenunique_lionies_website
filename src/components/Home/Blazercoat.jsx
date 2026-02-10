import { BsCart } from "react-icons/bs";
const products = [
    {
        id: 1,
        front: "../images/similar1.png",
        back: "../images/similarback1.png",
        name: "Polo - Speed Hunters Oversized",
        price: "759.00",
        original: "1,999.00",
    },
    {
        id: 2,
        front: "../images/similar2.png",
        back: "../images/similarback2.jpeg",
        name: "Polo - Speed Hunters Oversized",
        price: "699.00",
        original: "1,899.00",
    },
    {
        id: 3,
        front: "../images/similar3.png",
        back: "../images/similarback3.png",
        name: "Polo - Speed Hunters Oversized",
        price: "999.00",
        original: "1,899.00",
    },
    {
        id: 4,
        front: "../images/similar4.png",
        back: "../images/similarback4.png",
        name: "Polo - Speed Hunters Oversized",
        price: "799.00",
        original: "1,899.00",
    },
    {
        id: 5,
        front: "../images/similar5.png",
        back: "../images/similarback5.png",
        name: "Polo - Speed Hunters Oversized",
        price: "899.00",
        original: "1,899.00",
    },
    {
        id: 6,
        front: "../images/similar6.png",
        back: "../images/similarback6.png",
        name: "Polo - Speed Hunters Oversized",
        price: "1299.00",
        original: "1,899.00",
    },
    {
        id: 7,
        front: "../images/similar7.png",
        back: "../images/similarback7.png",
        name: "Polo - Speed Hunters Oversized",
        price: "599.00",
        original: "1,899.00",
    },
    {
        id: 8,
        front: "../images/similar1.png",
        back: "../images/similarback1.png",
        name: "Polo - Speed Hunters Oversized",
        price: "759.00",
        original: "1,999.00",
    },
    {
        id: 9,
        front: "../images/similar2.png",
        back: "../images/similarback2.jpeg",
        name: "Polo - Speed Hunters Oversized",
        price: "699.00",
        original: "1,899.00",
    },
    {
        id: 10,
        front: "../images/similar3.png",
        back: "../images/similarback3.png",
        name: "Polo - Speed Hunters Oversized",
        price: "999.00",
        original: "1,899.00",
    },
];

const Blazercoat = () => {
    return (
        <>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Blazer and Coat</h2>
                        <span className="text-sm text-gray-500">Shop now for ultimate comfort</span>
                    </div>
                    <button className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden bg-gray-100">
                                <img
                                    src={product.front}
                                    alt="product"
                                    className="w-full transition duration-500 group-hover:opacity-0"
                                />

                                <img
                                    src={product.back}
                                    alt="product hover"
                                    className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500"
                                />

                                <div className="absolute top-3 right-[-60px] group-hover:right-3 transition-all duration-500 flex flex-col gap-2">
                                    <div className="relative group/cart">
                                        <div className="bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                            <BsCart size={18} className="text-gray-800" />
                                        </div>
                                        <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/cart:opacity-100 transition whitespace-nowrap shadow-lg z-20">
                                            Add to cart
                                        </span>
                                    </div>

                                    <div className="relative group/quickview">
                                        <div className="bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                        <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/quickview:opacity-100 transition whitespace-nowrap shadow-lg z-20">
                                            Quick View
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <p className="mt-3 text-sm font-medium">{product.name}</p>
                            <p className="text-red-500 font-semibold">
                                Rs. {product.price}{" "}
                                <span className="line-through text-gray-400 ml-2">
                                    Rs. {product.original}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default Blazercoat;
