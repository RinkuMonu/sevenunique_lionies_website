import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const images = [
  "../images/21.webp",
  "../images/22.webp",
  "../images/23.jpg",
  "../images/24.webp",
  "../images/25.webp",
  "../images/26.jpg",
];

export default function TrendingCategorie() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Trending Categories
            </h2>
            <span className="text-sm text-gray-500">
              Latest trends you love
            </span>
          </div>
          <button className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
            View All →
          </button>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[ Autoplay]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link to={"#"} className="w-full h-full  overflow-hidden cursor-pointer">
                <img
                  src={image}
                  alt={`Trend ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
