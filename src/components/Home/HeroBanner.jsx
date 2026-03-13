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
        image: "/images/Herobanner/Kids/B1.webp",
    },
    {
        id: 3,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/All/B1.webp",
    },
    {
        id: 4,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Hurry Up",
        image: "/images/Herobanner/All/B3.webp",
    },
    {
        id: 5,
        title: "Summer Sale",
        subtitle: "Everything 30% OFF",
        cta: "Grab Deals",
        image: "/images/Herobanner/Womans/B2.webp",
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
        image: "/images/Herobanner/Womans/B1.webp",
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
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
});

export default HeroBanner;
