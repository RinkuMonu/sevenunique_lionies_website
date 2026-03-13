import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const brandLogos = [
    "/images/Brands/allen-solly.webp",
    "/images/Brands/levis.webp",
    "/images/Brands/nautinati.webp",
    "/images/Brands/uspa.webp",
    "/images/Brands/miniklub.webp",
    "/images/Brands/peppermint.webp",
    "/images/Brands/ginijony.webp",
    "/images/Brands/yk.webp"
];

export default function BrandsSection() {
    return (
        <section className="w-full py-20 bg-white">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Kids Brands</h2>
                        <span className="text-sm text-gray-500">Most Favourite Brands</span>
                    </div>
                    <Link to="/kids-productlist" className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
                        View All
                    </Link>
                </div>
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={4}
                    spaceBetween={2}
                    loop
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 20 },
                        640: { slidesPerView: 3, spaceBetween: 24 },
                        768: { slidesPerView: 4, spaceBetween: 32 },
                        1024: { slidesPerView: 5, spaceBetween: 40 },
                        1280: { slidesPerView: 6, spaceBetween: 48 }
                    }}
                    className=""
                >
                    {brandLogos.map((logo, index) => (
                        <SwiperSlide key={index} className=" flex! justify-center">
                            <div className="overflow-hiddenflex items-center justify-center p-2 sm:p-3 hover:scale-110 transition-all duration-300 cursor-pointer mx-auto">
                                <img
                                    src={logo}
                                    alt="Brand"
                                    className="w-full h-full object-contain rounded-full"
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
