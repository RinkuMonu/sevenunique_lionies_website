import React from "react";

const categories = [
  { id: 1, image: "../images/tshirts.avif", label: "T-Shirts" },
  { id: 2, image: "../images/shirts.avif", label: "Shirts" },
  { id: 3, image: "../images/winter.avif", label: "Winter Edit" },
  { id: 4, image: "../images/pants.avif", label: "Pants" },
  { id: 5, image: "../images/jeans.avif", label: "Jeans" },
  { id: 6, image: "../images/polos.avif", label: "Polos" },
  { id: 7, image: "../images/joggers.avif", label: "Joggers" },
];

export default function CategoriesSection() {
  return (
    <section className="pt-16 bg-white">
      <div className=" mx-auto px-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top Categories
            </h2>
            <span className="text-sm text-gray-500">
              Browse Popular Categories
            </span>
          </div>
          <button className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-10">
      <img src="../images/centerbanner.webp" className="w-full" alt="Center Banner" />
      </div>
    </section>
  );
}
