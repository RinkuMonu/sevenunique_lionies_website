import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    image: "/images/Kids/1.png",
    title: "Boys Clothing",
    subtitle: "shirts and outfits for boys.",
    badge: "Up To 50% Off",
    col: "lg:col-span-1"
  },
  {
    id: 2,
    image: "/images/Kids/2.png",
    title: "Girls Clothing",
    subtitle: "stylish outfits for girls.",
    badge: "Up To 60% Off",
    col: "lg:col-span-1"
  },
  {
    id: 3,
    image: "/images/Kids/3.png",
    title: "Baby Clothing",
    subtitle: "Soft clothes for newborn babies.",
    badge: "Up To 40% Off",
    col: "lg:col-span-1"
  },
  {
    id: 4,
    image: "/images/Kids/4.png",
    title: "Winter Wear",
    subtitle: "sweaters and hoodies for kids.",
    badge: "Up To 45% Off",
    col: "lg:col-span-1"
  },
  {
    id: 5,
    image: "/images/Kids/6.png",
    title: "Kids Footwear",
    subtitle: "Comfortable shoes, sneakers and sandals.",
    badge: "Up To 35% Off",
    col: "lg:col-span-2"
  },
];

export default function KidsCategories() {
  return (
    <section className="py-16 bg-[#faf4f0]">
      <div className="px-8">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-[#2b2b2b] mb-3">
            Kids Categories
          </h2>
          <p className="text-lg text-gray-600">
            Find all your favorite bakery items in one place.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`relative bg-white p-6 mb-5 hover:shadow-lg border border-[#cccc] rounded-md transition ${cat.col}`}
            >

              {/* Text */}
              <div className="max-w-[65%]">
                <h3 className="text-xl font-bold text-[#2b2b2b] mb-2">
                  {cat.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {cat.subtitle}
                </p>

                <span className="bg-[#ffe7d1] text-[#c46b1f] px-4 py-1 rounded-full text-sm font-semibold">
                  {cat.badge}
                </span>
              </div>

              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute bottom-0 right-0 w-[45%] object-contain pointer-events-none"
              />

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}