import React from 'react'

const products = [
  { id: 1, image: "../images/8.webp" },
  { id: 2, image: "../images/9.webp" },
  { id: 3, image: "../images/10.webp" },
  { id: 4, image: "../images/11.webp" },
  { id: 5, image: "../images/12.webp" },
  { id: 6, image: "../images/13.webp" },
  { id: 7, image: "../images/14.webp" },
  { id: 8, image: "../images/15.jpg" },
];

export default function PopularProducts() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="">
      <div className="flex items-center justify-between mb-8 px-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              50% Discount 
            </h2>
            <span className="text-sm text-gray-500">
              Browse Popular Categories
            </span>
          </div>
          <button className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-10">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer bg-white ">
              <div className="relative overflow-hidden bg-gray-100 h-100">
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
