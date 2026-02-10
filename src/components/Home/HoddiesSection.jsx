import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
  {
    id: 1,
    bgColor: 'bg-[#eaedca]',
    title: 'POLO Tshirts',
    subtitle: 'Top Product',
    image: '../images/polo.webp',
    shadowColor: 'shadow-orange-200'
  },
  {
    id: 2,
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    title: 'Hoodies',
    subtitle: 'New Arrival',
    image: '../images/hoddies.webp',
    shadowColor: 'shadow-blue-200'
  },
  {
    id: 3,
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    title: 'Sweaters',
    subtitle: 'Best Seller',
    image: '../images/sweater.webp',
    shadowColor: 'shadow-purple-200'
  },
  {
    id: 4,
    bgColor: 'bg-gradient-to-r from-rose-50 to-orange-50',
    title: 'Jackets',
    subtitle: 'Winter Collection',
    image: '../images/jacket.webp',
    shadowColor: 'shadow-rose-200'
  },
  {
    id: 5,
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    title: 'Track Pants',
    subtitle: 'Sportswear',
    image: '../images/trackpants.webp',
    shadowColor: 'shadow-emerald-200'
  },
  {
    id: 6,
    bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
    title: 'Cargo Pants',
    subtitle: 'Street Style',
    image: '../images/cargopants.webp',
    shadowColor: 'shadow-amber-200'
  },
]

export default function HoddiesSection() {
  return (
    <>
      <section className="pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Most Selling Categories
              </h2>
              <span className="text-sm text-gray-500">
                Browse Popular Categories
              </span>
            </div>
            <button className="text-[#633426] font-semibold text-sm hover:text-orange-600 transition-colors duration-300">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`${category.bgColor}  p-4 md:p-6 `}
              >
                <div className="flex items-center gap-3 md:gap-4 h-full">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base md:text-xl font-black text-gray-900 mb-2 md:mb-3 leading-tight">
                      {category.title}
                    </h2>
                    <span className="text-[14px] text-gray-600 font-medium uppercase tracking-wide mb-3 md:mb-4 block">
                      {category.subtitle}
                    </span>
                    <Link 
                      to="#"
                      className={`group inline-block px-4 py-2 md:px-5 md:py-3 bg-white/90 backdrop-blur-sm text-gray-900 
                                text-sm md:text-md font-semibold  border-white/50 
                                group-hover:${category.shadowColor}`}
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="shrink-0 w-16 h-16 md:w-40 md:h-34 ">
                    <img 
                      src={category.image}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                      alt={category.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
