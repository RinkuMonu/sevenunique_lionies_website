import React from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
    {
      id: 1,
      image: "/images/Kids/kid.PNG",
      brand: "Hopscotch",
      title: "Boys Printed Cotton T-Shirt & Shorts Set",
      price: "₹799",
      oldPrice: "₹1599",
      discount: "50% OFF",
      rating: "4.6"
    },
    {
      id: 2,
      image: "/images/Kids/kid1.jpg",
      brand: "Babyhug",
      title: "Girls Floral Printed Cotton Dress",
      price: "₹699",
      oldPrice: "₹1299",
      discount: "46% OFF",
      rating: "4.5"
    },
    {
      id: 3,
      image: "/images/Kids/kid2.jpeg",
      brand: "Little Kangaroos",
      title: "Boys Denim Slim Fit Jeans",
      price: "₹999",
      oldPrice: "₹1999",
      discount: "50% OFF",
      rating: "4.6"
    },
    {
      id: 4,
      image: "/images/Kids/1033.jpg",
      brand: "Mothercare",
      title: "Girls Casual Cotton Top & Leggings Set",
      price: "₹899",
      oldPrice: "₹1799",
      discount: "50% OFF",
      rating: "4.7"
    },
    {
      id: 5,
      image: "/images/Kids/kid3.jpg",
      brand: "FirstCry",
      title: "Baby Boys Printed Romper",
      price: "₹599",
      oldPrice: "₹1099",
      discount: "45% OFF",
      rating: "4.6"
    },
    {
      id: 6,
      image: "/images/Kids/kid3.jpg",
      brand: "Peppermint",
      title: "Girls Party Wear Frill Dress",
      price: "₹1099",
      oldPrice: "₹2199",
      discount: "50% OFF",
      rating: "4.7"
    },
    {
      id: 7,
      image: "/images/Kids/kid2.jpeg",
      brand: "Gini & Jony",
      title: "Boys Casual Checked Shirt",
      price: "₹899",
      oldPrice: "₹1699",
      discount: "47% OFF",
      rating: "4.5"
    },
    {
      id: 8,
      image: "/images/Kids/Night Suit.jpg",
      brand: "Mini Klub",
      title: "Kids Comfortable Cotton Night Suit",
      price: "₹799",
      oldPrice: "₹1499",
      discount: "46% OFF",
      rating: "4.6"
    }
  ];

export default function TopFeaturedProducts() {
  return (
    <section className="py-16 bg-[#f5f5f5]">
      <div className="px-6">

        {/* Section Title */}
        <h2 className="text-3xl font-semibold mb-10 text-[#2c3e50]">
          Top Featured Products
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {products.map((item) => (
            <Link href="productlisting"
              key={item.id}
              className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >

              {/* Image */}
              <div className="relative">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[340px] object-cover"
                />

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {item.rating}
                </div>

                {/* Wishlist */}
                <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer">
                  <Heart size={18} />
                </div>

              </div>

              {/* Content */}
              <div className="p-4">

                <p className="font-semibold text-gray-800">
                  {item.brand}
                </p>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.title}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">

                  <span className="font-semibold text-lg">
                    {item.price}
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    {item.oldPrice}
                  </span>

                  <span className="text-green-600 text-sm font-semibold">
                    {item.discount}
                  </span>

                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
      <div className="mt-10">
        <img src="/images/Herobanner/Kids/centerbanner.png" className="w-full h-full"  />
      </div>
    </section>
  );
}