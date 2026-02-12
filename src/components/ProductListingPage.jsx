import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiGrid, FiList, FiChevronDown, FiSearch } from "react-icons/fi";
import { BsCart } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";

const ProductListingPage = () => {
  const title = "T-Shirts";

  const products = [
    {
      id: 1,
      img: "../images/similar1.png",
      hoverImg: "../images/similarback1.png",
      name: `${title} Classic`,
      price: 999,
      size: "M",
      category: "Hooded T-Shirts",
      theme: "Batman",
      rating: 4.5,
      discount: 10,
      fabric: "Cotton",
      color: "Black",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Short",
      neck: "Round",
    },
    {
      id: 2,
      img: "../images/similar2.png",
      hoverImg: "../images/similarback2.jpeg",
      name: `${title} Premium`,
      price: 1299,
      size: "L",
      category: "Men Co-Ord Sets",
      theme: "Attack On Titan",
      rating: 4.2,
      discount: 15,
      fabric: "Polyester",
      color: "Grey",
      design: "Printed",
      fit: "Slim",
      sleeves: "Long",
      neck: "V-Neck",
    },
    {
      id: 3,
      img: "../images/similar3.png",
      hoverImg: "../images/similarback3.png",
      name: `${title} Street`,
      price: 1499,
      size: "S",
      category: "Oversized Polos",
      theme: "5 Star",
      rating: 4.8,
      discount: 5,
      fabric: "Cotton",
      color: "White",
      design: "Plain",
      fit: "Oversized",
      sleeves: "Short",
      neck: "Polo",
    },
    {
      id: 4,
      img: "../images/similar4.png",
      hoverImg: "../images/similarback4.png",
      name: `${title} Street`,
      price: 1599,
      size: "XL",
      category: "Oversized T-Shirts",
      theme: "Avatar",
      rating: 4.1,
      discount: 20,
      fabric: "Cotton Blend",
      color: "Blue",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Short",
      neck: "Round",
    },
    {
      id: 5,
      img: "../images/similar5.png",
      hoverImg: "../images/similarback5.png",
      name: `${title} Street`,
      price: 1799,
      size: "M",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.7,
      discount: 8,
      fabric: "Cotton",
      color: "Red",
      design: "Printed",
      fit: "Slim",
      sleeves: "Short",
      neck: "Crew",
    },
    {
      id: 6,
      img: "../images/similar1.png",
      hoverImg: "../images/similarback6.png",
      name: `${title} Street`,
      price: 899,
      size: "S",
      category: "Hooded T-Shirts",
      theme: "5 Star",
      rating: 4.3,
      discount: 12,
      fabric: "Fleece",
      color: "Navy",
      design: "Plain",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 7,
      img: "../images/similar2.png",
      hoverImg: "../images/similarback7.png",
      name: `${title} Street`,
      price: 1999,
      size: "XXL",
      category: "Oversized Polos",
      theme: "Avatar",
      rating: 4.6,
      discount: 25,
      fabric: "Pima Cotton",
      color: "Green",
      design: "Graphic",
      fit: "Oversized",
      sleeves: "Short",
      neck: "Polo",
    },
    {
      id: 8,
      img: "../images/similar3.png",
      hoverImg: "../images/similarback1.png",
      name: `${title} Street`,
      price: 1099,
      size: "L",
      category: "Men Co-Ord Sets",
      theme: "Attack On Titan",
      rating: 4.4,
      discount: 18,
      fabric: "Cotton",
      color: "Black",
      design: "Printed",
      fit: "Slim",
      sleeves: "Short",
      neck: "V-Neck",
    },
    {
      id: 9,
      img: "../images/similar4.png",
      hoverImg: "../images/similarback2.jpeg",
      name: `${title} Street`,
      price: 1399,
      size: "XL",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.9,
      discount: 7,
      fabric: "Organic Cotton",
      color: "White",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 10,
      img: "../images/similar5.png",
      hoverImg: "../images/similarback3.png",
      name: `${title} Street`,
      price: 1899,
      size: "XXL",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.9,
      discount: 7,
      fabric: "Organic Cotton",
      color: "White",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 1,
      img: "../images/similar1.png",
      hoverImg: "../images/similarback1.png",
      name: `${title} Classic`,
      price: 999,
      size: "M",
      category: "Hooded T-Shirts",
      theme: "Batman",
      rating: 4.5,
      discount: 10,
      fabric: "Cotton",
      color: "Black",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Short",
      neck: "Round",
    },
    {
      id: 2,
      img: "../images/similar2.png",
      hoverImg: "../images/similarback2.jpeg",
      name: `${title} Premium`,
      price: 1299,
      size: "L",
      category: "Men Co-Ord Sets",
      theme: "Attack On Titan",
      rating: 4.2,
      discount: 15,
      fabric: "Polyester",
      color: "Grey",
      design: "Printed",
      fit: "Slim",
      sleeves: "Long",
      neck: "V-Neck",
    },
    {
      id: 3,
      img: "../images/similar3.png",
      hoverImg: "../images/similarback3.png",
      name: `${title} Street`,
      price: 1499,
      size: "S",
      category: "Oversized Polos",
      theme: "5 Star",
      rating: 4.8,
      discount: 5,
      fabric: "Cotton",
      color: "White",
      design: "Plain",
      fit: "Oversized",
      sleeves: "Short",
      neck: "Polo",
    },
    {
      id: 4,
      img: "../images/similar4.png",
      hoverImg: "../images/similarback4.png",
      name: `${title} Street`,
      price: 1599,
      size: "XL",
      category: "Oversized T-Shirts",
      theme: "Avatar",
      rating: 4.1,
      discount: 20,
      fabric: "Cotton Blend",
      color: "Blue",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Short",
      neck: "Round",
    },
    {
      id: 5,
      img: "../images/similar5.png",
      hoverImg: "../images/similarback5.png",
      name: `${title} Street`,
      price: 1799,
      size: "M",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.7,
      discount: 8,
      fabric: "Cotton",
      color: "Red",
      design: "Printed",
      fit: "Slim",
      sleeves: "Short",
      neck: "Crew",
    },
    {
      id: 6,
      img: "../images/similar1.png",
      hoverImg: "../images/similarback6.png",
      name: `${title} Street`,
      price: 899,
      size: "S",
      category: "Hooded T-Shirts",
      theme: "5 Star",
      rating: 4.3,
      discount: 12,
      fabric: "Fleece",
      color: "Navy",
      design: "Plain",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 7,
      img: "../images/similar2.png",
      hoverImg: "../images/similarback7.png",
      name: `${title} Street`,
      price: 1999,
      size: "XXL",
      category: "Oversized Polos",
      theme: "Avatar",
      rating: 4.6,
      discount: 25,
      fabric: "Pima Cotton",
      color: "Green",
      design: "Graphic",
      fit: "Oversized",
      sleeves: "Short",
      neck: "Polo",
    },
    {
      id: 8,
      img: "../images/similar3.png",
      hoverImg: "../images/similarback1.png",
      name: `${title} Street`,
      price: 1099,
      size: "L",
      category: "Men Co-Ord Sets",
      theme: "Attack On Titan",
      rating: 4.4,
      discount: 18,
      fabric: "Cotton",
      color: "Black",
      design: "Printed",
      fit: "Slim",
      sleeves: "Short",
      neck: "V-Neck",
    },
    {
      id: 9,
      img: "../images/similar4.png",
      hoverImg: "../images/similarback2.jpeg",
      name: `${title} Street`,
      price: 1399,
      size: "XL",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.9,
      discount: 7,
      fabric: "Organic Cotton",
      color: "White",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 10,
      img: "../images/similar5.png",
      hoverImg: "../images/similarback3.png",
      name: `${title} Street`,
      price: 1899,
      size: "XXL",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.9,
      discount: 7,
      fabric: "Organic Cotton",
      color: "White",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 11,
      img: "../images/similar1.png",
      hoverImg: "../images/similarback1.png",
      name: `${title} Classic`,
      price: 999,
      size: "M",
      category: "Hooded T-Shirts",
      theme: "Batman",
      rating: 4.5,
      discount: 10,
      fabric: "Cotton",
      color: "Black",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Short",
      neck: "Round",
    },
    {
      id: 12,
      img: "../images/similar2.png",
      hoverImg: "../images/similarback2.jpeg",
      name: `${title} Premium`,
      price: 1299,
      size: "L",
      category: "Men Co-Ord Sets",
      theme: "Attack On Titan",
      rating: 4.2,
      discount: 15,
      fabric: "Polyester",
      color: "Grey",
      design: "Printed",
      fit: "Slim",
      sleeves: "Long",
      neck: "V-Neck",
    },
    {
      id: 13,
      img: "../images/similar3.png",
      hoverImg: "../images/similarback3.png",
      name: `${title} Street`,
      price: 1499,
      size: "S",
      category: "Oversized Polos",
      theme: "5 Star",
      rating: 4.8,
      discount: 5,
      fabric: "Cotton",
      color: "White",
      design: "Plain",
      fit: "Oversized",
      sleeves: "Short",
      neck: "Polo",
    },
    {
      id: 14,
      img: "../images/similar4.png",
      hoverImg: "../images/similarback4.png",
      name: `${title} Street`,
      price: 1599,
      size: "XL",
      category: "Oversized T-Shirts",
      theme: "Avatar",
      rating: 4.1,
      discount: 20,
      fabric: "Cotton Blend",
      color: "Blue",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Short",
      neck: "Round",
    },
    {
      id: 15,
      img: "../images/similar5.png",
      hoverImg: "../images/similarback5.png",
      name: `${title} Street`,
      price: 1799,
      size: "M",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.7,
      discount: 8,
      fabric: "Cotton",
      color: "Red",
      design: "Printed",
      fit: "Slim",
      sleeves: "Short",
      neck: "Crew",
    },
    {
      id: 16,
      img: "../images/similar1.png",
      hoverImg: "../images/similarback6.png",
      name: `${title} Street`,
      price: 899,
      size: "S",
      category: "Hooded T-Shirts",
      theme: "5 Star",
      rating: 4.3,
      discount: 12,
      fabric: "Fleece",
      color: "Navy",
      design: "Plain",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 17,
      img: "../images/similar2.png",
      hoverImg: "../images/similarback7.png",
      name: `${title} Street`,
      price: 1999,
      size: "XXL",
      category: "Oversized Polos",
      theme: "Avatar",
      rating: 4.6,
      discount: 25,
      fabric: "Pima Cotton",
      color: "Green",
      design: "Graphic",
      fit: "Oversized",
      sleeves: "Short",
      neck: "Polo",
    },
    {
      id: 18,
      img: "../images/similar3.png",
      hoverImg: "../images/similarback1.png",
      name: `${title} Street`,
      price: 1099,
      size: "L",
      category: "Men Co-Ord Sets",
      theme: "Attack On Titan",
      rating: 4.4,
      discount: 18,
      fabric: "Cotton",
      color: "Black",
      design: "Printed",
      fit: "Slim",
      sleeves: "Short",
      neck: "V-Neck",
    },
    {
      id: 19,
      img: "../images/similar4.png",
      hoverImg: "../images/similarback2.jpeg",
      name: `${title} Street`,
      price: 1399,
      size: "XL",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.9,
      discount: 7,
      fabric: "Organic Cotton",
      color: "White",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
    {
      id: 20,
      img: "../images/similar5.png",
      hoverImg: "../images/similarback3.png",
      name: `${title} Street`,
      price: 1899,
      size: "XXL",
      category: "Oversized T-Shirts",
      theme: "Batman",
      rating: 4.9,
      discount: 7,
      fabric: "Organic Cotton",
      color: "White",
      design: "Graphic",
      fit: "Regular",
      sleeves: "Long",
      neck: "Round",
    },
  ];

  const [viewMode, setViewMode] = useState("grid");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [selectedFit, setSelectedFit] = useState("");
  const [selectedSleeve, setSelectedSleeve] = useState("");
  const [selectedNeck, setSelectedNeck] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedNewArrivals, setSelectedNewArrivals] = useState("");
const [selectedTopRated, setSelectedTopRated] = useState("");
  const [openFilters, setOpenFilters] = useState({
    subcat: true,
    size: true,
    color: true,
    design: true,
    fit: true,
    sleeves: true,
    neck: true,
    type: true,
    discounts: true,
    rating: true,
    fabric: true,
    price: true,
    new: true,
    toprated: true,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const resetFilters = () => {
    setSelectedSize("");
    setSelectedColor("");
    setSelectedDesign("");
    setSelectedFit("");
    setSelectedSleeve("");
    setSelectedNeck("");
    setSelectedType("");
    setSelectedRating("");
    setSelectedDiscount("");
    setSelectedFabric("");
    setPriceRange("");
    setSortBy("");
    setOpenFilters({});
  };
  const filteredProducts = products
    .filter((p) => {
      return (
        (selectedSize ? p.size === selectedSize : true) &&
        (selectedColor ? p.color === selectedColor : true) &&
        (selectedDesign ? p.design === selectedDesign : true) &&
        (selectedFit ? p.fit === selectedFit : true) &&
        (selectedSleeve ? p.sleeves === selectedSleeve : true) &&
        (selectedNeck ? p.neck === selectedNeck : true) &&
        (priceRange
          ? {
              "0-1000": p.price <= 1000,
              "1001-1500": p.price > 1000 && p.price <= 1500,
              "1501-2000": p.price > 1500 && p.price <= 2000,
              "2001+": p.price > 2000,
            }[priceRange]
          : true) &&
        (selectedRating ? p.rating >= parseFloat(selectedRating) : true) &&
        (selectedDiscount ? p.discount >= parseInt(selectedDiscount) : true) &&
        (selectedFabric ? p.fabric === selectedFabric : true)&&

        (!selectedNewArrivals || selectedNewArrivals === "new") &&
        (!selectedTopRated || selectedTopRated === "top")
      );
    })
    .sort((a, b) => {
      if (selectedNewArrivals === "new") return b.id - a.id;
      if (selectedTopRated === "top") return b.rating - a.rating;
      
      switch (sortBy) {
        case "new":
          return b.id - a.id;
        case "top":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <section className="min-h-screen bg-white py-8">
      <div className=" px-4 sm:px-6">
        <div className="w-full h-48 sm:h-64 lg:h-80 mb-8 overflow-hidden">
          <img
            src="../images/all.webp"
            className="w-full h-full object-cover"
            alt={`${title} Banner`}
          />
        </div>

        <div className="overflow-x-auto pb-6 mb-10 -mx-4 sm:-mx-6 lg:mx-0 lg:pb-0 lg:overflow-visible">
          <div className="flex gap-4 px-4 sm:px-6 lg:px-0 lg:gap-10 min-w-max">
            {[
              { name: "All", img: "../images/all.webp" },
              { name: "Polo", img: "../images/similar2.png" },
              { name: "Graphic", img: "../images/similarback5.png" },
              { name: "Plain", img: "../images/plain.webp" },
              { name: "Oversized", img: "../images/Oversized.webp" },
              { name: "Printed", img: "../images/printed.webp" },
            ].map(({ name, img }) => (
              <Link
                key={name}
                to={`/category/${name.toLowerCase()}`}
                className="flex flex-col items-center gap-2 px-3 py-4 shrink-0 group hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedType(name === "All" ? "" : name)}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center whitespace-nowrap">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-gray-100">
          <button
            onClick={toggleMobileFilters}
            className="lg:hidden self-start px-8 py-3 bg-linear-to-r from-[#d18736] to-[#995d37] text-white rounded-2xl font-bold text-sm uppercase tracking-wide hover:from-[#995d37] hover:to-[#d18736] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Filters
          </button>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            {filteredProducts.length} Products
          </span>
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex gap-1 p-1.5 bg-gray-100/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all flex items-center justify-center group hover:scale-105 ${
                  viewMode === "grid"
                    ? "bg-linear-to-r from-[#d18736] to-[#995d37] text-white shadow-lg scale-105 active:scale-100"
                    : "text-gray-600 hover:text-[#d18736] hover:bg-white hover:shadow-md bg-white/80"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <FiGrid
                  size={18}
                  className="group-active:scale-90 transition-transform"
                />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all flex items-center justify-center group hover:scale-105 ${
                  viewMode === "list"
                    ? "bg-linear-to-r from-[#d18736] to-[#995d37] text-white shadow-lg scale-105 active:scale-100"
                    : "text-gray-600 hover:text-[#d18736] hover:bg-white hover:shadow-md bg-white/80"
                }`}
                title="List View"
                aria-label="List View"
              >
                <FiList
                  size={18}
                  className="group-active:scale-90 transition-transform"
                />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-3 px-5 ps-1 py-2 bg-transparent border text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d18736]/50 rounded-md cursor-pointer hover:text-[#d18736] transition-colors"
            >
              <option value="">Sort</option>
              <option value="new">New Arrivals</option>
              <option value="top">Top Rated</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
            {selectedSize && (
              <span className="px-3 py-1 bg-[#d18736]/10 text-[#d18736] text-xs font-semibold rounded-full">
                {selectedSize}
              </span>
            )}
            {selectedColor && (
              <span className="px-3 py-1 bg-[#d18736]/10 text-[#d18736] text-xs font-semibold rounded-full">
                {selectedColor}
              </span>
            )}
            {priceRange && (
              <span className="px-3 py-1 bg-[#d18736]/10 text-[#d18736] text-xs font-semibold rounded-full">
                ₹{priceRange}
              </span>
            )}
            <button
              onClick={resetFilters}
              className="ml-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#d18736] hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside
            className={`w-full sidebar lg:w-80 xl:w-96 order-2 lg:order-1 transition-all duration-300 ${
              showMobileFilters ? "block" : "lg:block"
            } lg:sticky lg:top-24 self-start`}
          >
            <div className="bg-white p-6 lg:p-8 border border-gray-100  sticky lg:static top-0">
              {!showMobileFilters && (
                <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-6 flex items-center gap-3">
                  <CiFilter className="w-7 h-7 text-[#d18736]" />
                  Filters
                </h2>
              )}

              {[
                {
                  id: "subcat",
                  title: "Sub Categories",
                  options: ["Polo", "Graphic", "Plain", "Oversized"],
                },
                {
                  id: "size",
                  title: "Size",
                  options: ["XS", "S", "M", "L", "XL", "XXL"],
                },
                {
                  id: "color",
                  title: "Color",
                  options: [
                    "Black",
                    "White",
                    "Grey",
                    "Blue",
                    "Red",
                    "Navy",
                    "Green",
                  ],
                },
                {
                  id: "design",
                  title: "Design",
                  options: ["Graphic", "Printed", "Plain"],
                },
                {
                  id: "fit",
                  title: "Fit",
                  options: ["Regular", "Slim", "Oversized"],
                },
                {
                  id: "sleeves",
                  title: "Sleeves",
                  options: ["Short", "Long", "Sleeveless"],
                },
                {
                  id: "neck",
                  title: "Neck",
                  options: ["Round", "V-Neck", "Polo", "Crew"],
                },
                {
                  id: "type",
                  title: "Type",
                  options: ["Casual", "Formal", "Sports"],
                },
                { id: "rating", title: "Rating", options: ["4+", "4.5+", "5"] },
                {
                  id: "discounts",
                  title: "Discounts",
                  options: ["10%+", "20%+", "30%+"],
                },
                {
                  id: "fabric",
                  title: "Fabric",
                  options: ["Cotton", "Polyester", "Fleece", "Pima Cotton"],
                },
                {
                  id: "price",
                  title: "Price Range",
                  options: ["0-1000", "1001-1500", "1501-2000", "2001+"],
                },
                {
                  id: "new",
                  title: "New Arrivals",
                  options: ["Last 7 Days", "Last 30 Days", "This Month"],
                },
                {
                  id: "toprated",
                  title: "Top Rated",
                  options: ["4 Stars & Up", "4.5 Stars & Up", "5 Stars"],
                },
              ].map(({ id, title, options }) => (
                <div
                  key={id}
                  className="mb-6 last:mb-0 border-b pb-6 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFilter(id)}
                    className="w-full flex items-center justify-between cursor-pointer rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full bg-linear-to-r from-[#d18736] to-[#995d37] ${openFilters[id] ? "scale-110 shadow-lg" : ""}`}
                      ></div>
                      <span className="font-semibold text-lg text-gray-900 group-hover:text-[#d18736]">
                        {title}
                      </span>
                    </div>
                    <FiChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${openFilters[id] ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openFilters[id] && (
                    <div className="mt-5 pl-8 space-y-3 animate-in slide-in-from-top-4 duration-300">
                      {id === "size" && (
                        <div className="flex flex-wrap gap-2">
                          {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                            <button
                              key={s}
                              onClick={() =>
                                setSelectedSize((prev) => (prev === s ? "" : s))
                              }
                              className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all shadow-sm ${
                                selectedSize === s
                                  ? "bg-[#d18736] text-white border-[#d18736] shadow-md scale-105"
                                  : "border-gray-300 hover:border-[#d18736] hover:shadow-md hover:scale-105"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}

                      {id === "color" && (
                        <div className="flex flex-wrap gap-3">
                          {[
                            "Black",
                            "White",
                            "Grey",
                            "Blue",
                            "Red",
                            "Navy",
                            "Green",
                          ].map((c) => (
                            <button
                              key={c}
                              onClick={() =>
                                setSelectedColor((prev) =>
                                  prev === c ? "" : c,
                                )
                              }
                              className={`w-10 h-10 rounded-2xl shadow-lg hover:shadow-xl transition-all border-4 ${
                                selectedColor === c
                                  ? "border-[#d18736] scale-110"
                                  : "border-white hover:border-[#d18736] hover:scale-105"
                              }`}
                              style={{ backgroundColor: c.toLowerCase() }}
                            />
                          ))}
                        </div>
                      )}

                      {id === "price" && (
                        <div className="space-y-3">
                          {[
                            { val: "0-1000", label: "Under ₹1,000" },
                            { val: "1001-1500", label: "₹1,001 - ₹1,500" },
                            { val: "1501-2000", label: "₹1,501 - ₹2,000" },
                            { val: "2001+", label: "₹2,000+" },
                          ].map(({ val, label }) => (
                            <label
                              key={val}
                              className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all"
                            >
                              <input
                                type="radio"
                                name="price"
                                className="mr-3 w-5 h-5 accent-[#d18736] shadow-sm"
                                checked={priceRange === val}
                                onChange={() =>
                                  setPriceRange((prev) =>
                                    prev === val ? "" : val,
                                  )
                                }
                              />
                              <span className="text-sm font-medium">
                                {label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {options.length > 0 &&
                        id !== "size" &&
                        id !== "color" &&
                        id !== "price" && (
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {options.map((option) => (
                              <label
                                key={option}
                                className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                              >
                                <input
                                  type="checkbox"
                                  className="mr-3 w-4 h-4 accent-[#d18736]"
                                  onChange={() => {
                                    if (id === "rating")
                                      setSelectedRating((prev) =>
                                        prev === option ? "" : option,
                                      );
                                    if (id === "discounts")
                                      setSelectedDiscount((prev) =>
                                        prev === option ? "" : option,
                                      );
                                  }}
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                     
                    </div>
                  )}
                </div>
              ))}

              {showMobileFilters && (
                <button
                  onClick={toggleMobileFilters}
                  className="mt-8 w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-all shadow-lg"
                >
                  Close Filters
                </button>
              )}

              <button
                onClick={resetFilters}
                className="mt-6 w-full border-2 border-[#d18736] text-[#d18736] py-3 px-6 rounded-2xl font-semibold hover:bg-[#d18736] hover:text-white transition-all shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          <main className="w-full lg:flex-1 order-1 lg:order-2">
            {showMobileFilters && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={toggleMobileFilters}
              />
            )}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                  : "grid-cols-1 divide-y-2 divide-gray-100"
              }`}
            >
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <Link to={`/checkout`} className="block overflow-hidden ">
                    <div className="relative h-64 md:h-72 lg:h-80 ">
                      <div className="absolute top-0 left-0 z-20">
                        <span className="text-white text-xs px-3 py-1.5 font-bold bg-linear-to-r from-green-500 to-green-600">
                          -{p.discount}%
                        </span>
                      </div>

                      <div className="absolute top-12 right-[-100px] group-hover:right-3 transition-all duration-500 flex flex-col gap-2 z-30">
                        <div className="relative group/cart">
                          <div className="bg-white p-2.5 rounded-2xl shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110">
                            <BsCart size={18} className="text-gray-800" />
                          </div>
                          <span
                            className="absolute -right-32 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 
                                                          group-hover/cart:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl z-10"
                          >
                            Add to Cart
                          </span>
                        </div>

                        <div className="relative group/qv">
                          <div className="bg-white p-2.5 rounded-2xl shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110">
                            <svg
                              className="w-5 h-5 text-gray-800"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <span
                            className="absolute -right-32 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 
                                                          group-hover/qv:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl z-10"
                          >
                            Quick View
                          </span>
                        </div>
                      </div>

                      <img
                        src={p.img}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        alt={p.name}
                      />
                      <img
                        src={p.hoverImg}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        alt={p.name}
                      />
                    </div>

                    <div className="p-4 pt-3">
                      <h3 className="font-semibold text-sm lg:text-base text-gray-900 mb-2 truncate leading-tight">
                        {p.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg lg:text-xl font-bold text-[#633426] tracking-tight">
                          ₹{p.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{(p.price * 1.2).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 px-4">
                <div className="w-28 h-28 mx-auto mb-8 bg-linear-to-br from-gray-100 via-white to-gray-100 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-dashed border-gray-300">
                  <FiSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  No products found
                </h3>
                <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
                  Try adjusting your filters or browse other categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-10 py-4 bg-linear-to-r from-[#d18736] to-[#995d37] text-white rounded-2xl font-bold text-lg uppercase tracking-wide hover:from-[#995d37] hover:to-[#d18736] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform"
                >
                  Explore All Products
                </button>
              </div>
            )}
          </main>
        </div>

        {showMobileFilters && (
          <button
            className="fixed bottom-6 right-6 lg:hidden w-16 h-16 bg-[#d18736] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center justify-center text-2xl"
            onClick={toggleMobileFilters}
          >
            ×
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductListingPage;
