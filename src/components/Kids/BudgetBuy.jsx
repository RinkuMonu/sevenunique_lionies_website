import React from "react";
import { Link } from "react-router-dom";

const budgetCategories = [
  {
    id: 1,
    title: "T-SHIRTS",
    price: "₹499",
    image: "/images/Kids/under.webp"
  },
  {
    id: 2,
    title: "DRESSES",
    price: "₹799",
    image: "/images/Kids/under.webp"
  },
  {
    id: 3,
    title: "ETHNIC WEAR",
    price: "₹999",
    image: "/images/Kids/under.webp"
  },
  {
    id: 4,
    title: "SHORTS",
    price: "₹599",
    image: "/images/Kids/under.webp"
  },
  {
    id: 5,
    title: "VALUE PACKS",
    price: "₹799",
    image: "/images/Kids/under.webp"
  },
  {
    id: 6,
    title: "FOOTWEAR",
    price: "₹699",
    image: "/images/Kids/under.webp"
  }
];

export default function BudgetBuy() {
  return (
    <section className="py-16 bg-white">
      <div className="px-6">

        <h2 className="text-4xl tracking-[8px] font-semibold text-[#34495e] mb-12">
          BUDGET BUY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {budgetCategories.map((item) => (
            <Link
              key={item.id}
              to={`/category/${item.id}`}
              className="relative h-[170px] overflow-hidden group"
            >
              
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition duration-500"
              />

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}