import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SWIPER_MODULES = [Autoplay, Navigation];
const AUTOPLAY_CONFIG = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
};
const SWIPER_BREAKPOINTS = {
    0: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 30,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 30,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 40,
    },
    1440: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
};

const banners = [
    {
        id: 1,
        title: "Winter Collection",
        subtitle: "Up to 50% OFF",
        cta: "Shop Now",
        image: "/images/Herobanner/B2.webp",
    },
    {
        id: 2,
        title: "New Arrivals",
        subtitle: "Latest Trends",
        cta: "Explore",
        image: "/images/Herobanner/B3.jpg",
    },
    {
        id: 3,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/B4.jpg",
    },
    {
        id: 4,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Hurry Up",
        image: "/images/Herobanner/B5.jpg",
    },
    {
        id: 5,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/B6.jpg",
    },
    {
        id: 6,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/B7.webp",
    },
    {
        id: 7,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/B8.webp",
    },
    {
        id: 8,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/B9.webp",
    },
];

const HeroBanner = React.memo(function HeroBanner() {
    return (
        <section className="z-10 overflow-hidden">
            <Swiper
                modules={SWIPER_MODULES}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={AUTOPLAY_CONFIG}
                breakpoints={SWIPER_BREAKPOINTS}

                className="mySwiper"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id} className="h-screen">
                        <div className="w-full h-[80vh] relative flex items-center justify-center">
                            <div
                                className="absolute inset-0 w-full"
                                style={{
                                    backgroundImage: `url(${banner.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            />


                            <div className="relative z-20 w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-16 text-center text-white py-12">
                                {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-8 drop-shadow-2xl bg-linear-to-r from-white via-white/90 to-yellow-200/90 bg-clip-text text-transparent">
                                    {banner.title}
                                </h1> */}

                                {/* <Link
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
                                </Link> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
});

export default HeroBanner;
