import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";


const banners = [
    {
        id: 1,
        title: "Winter Collection",
        subtitle: "Up to 50% OFF",
        cta: "Shop Now",
        image: "/images/1.jpg",
    },
    {
        id: 2,
        title: "New Arrivals",
        subtitle: "Latest Trends",
        cta: "Explore",
        image: "/images/2.jpg",
    },
    {
        id: 3,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/3.jpg",
    },
    {
        id: 4,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Hurry Up",
        image: "/images/4.jpg",
    },
    {
        id: 5,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/5.jpg",
    },
];

export default function HeroBanner() {
    return (
        <section className=" h-[70vh]  z-10 overflow-hidden">
            <Swiper
                modules={[Autoplay, Navigation, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="w-full h-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id} className="h-full ">
                        <div className="w-full h-full relative flex items-center justify-center">
                            <div
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    backgroundImage: `url(${banner.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            />

                            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/50" />

                            <div className="relative z-20 w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-16 text-center text-white py-12">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-8 drop-shadow-2xl bg-linear-to-r from-white via-white/90 to-yellow-200/90 bg-clip-text text-transparent">
                                    {banner.title}
                                </h1>

                                <Link
                                    to="/shop"
                                    className="group inline-block px-12 py-6 bg-white/95 backdrop-blur-xl text-gray-900 text-xl md:text-2xl font-black hover:bg-white transition-all duration-500 shadow-2xl hover:shadow-3xl border-4 border-white/60 hover:border-white hover:scale-110 hover:-translate-y-3 transform-gpu"
                                >
                                    <span className="flex items-center justify-center space-x-3">
                                        <span>{banner.cta}</span>
                                        <svg
                                            className="w-7 h-7 group-hover:translate-x-2 transition-all duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
}
