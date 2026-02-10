import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiTruck,
  FiRotateCcw,
  FiGift,
  FiHeart,
  FiMapPin,
} from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { X } from "lucide-react";

import CartTrigger from "./CartTrigger";
import CartOffCanvas from "./CartOffCanvas";
import LoginModal from "./Login";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // 🔥 NEW: scroll-based hide state
  const [hideCategoryIcons, setHideCategoryIcons] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        setHideCategoryIcons(true); // scrolling down
      } else {
        setHideCategoryIcons(false); // scrolling up
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menCategoryData = {
    highlights: [
      { title: "Polo Tshirts", img: "../extra/new.png" },
      { title: "Track Suits", img: "../extra/hot.png" },
      { title: "Overshirts", img: "../extra/anime.png" },
      { title: "shirts", img: "../extra/harry.png" },
      { title: "jeans", img: "../extra/marvel.png" },
      { title: "Trousers", img: "../extra/anime.png" },
      { title: "Lower", img: "../extra/hot.png" },
      { title: "Kurta", img: "../extra/new.png" },
      { title: "Blazers", img: "../extra/marvel.png" },
    ],
    polotshirts: [
      { title: "Polo Tshirts 1", img: "../extra/anime.png" },
      { title: "Polo Tshirts 2", img: "../extra/marvel.png" },
      { title: "Polo Tshirts 3", img: "../extra/harry.png" },
    ],
    tracksuits: [
      { title: "Track Suits 1", img: "../extra/hot.png" },
      { title: "Track Suits 2", img: "../extra/new.png" },
    ],
    overshirts: [
      { title: "Overshirts 1", img: "../extra/anime.png" },
      { title: "Overshirts 2", img: "../extra/marvel.png" },
    ],
  };

  const categoryIcons = {
    ALL: "../images/9.webp",
    "Polo Shop": "../images/polos.avif",
    Jeans: "../images/jeans2.PNG",
    "T-Shirts": "../images/similarback5.png",
    Shirts: "../images/shirts2.PNG",
    "Treack Pents": "../images/trackpants.webp",
    "Lionies Collection": "../images/14.webp",
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-3 bg-black text-white text-xs">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1"><FiTruck /> Free Shipping</span>
          <span className="flex items-center gap-1"><FiRotateCcw /> Return To Store</span>
          <span className="flex items-center gap-1"><FiGift /> Online Gift Card</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1"><FiMapPin /> Delivering To</span>
          <Link to="#">Download Our Apps</Link>
          <Link to="#">Store Locator</Link>
          <Link to="#">Help</Link>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        {/* Main header row */}
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="bg-[#d6b28a] text-white font-black text-xl px-3 py-2 lowercase">
            LIONIES
          </Link>

          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-gray-100 px-4 py-3 text-sm outline-none rounded"
            />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link to="/whishlist" className="flex flex-col items-center">
              <FiHeart size={18} />
              <span className="hidden sm:block">Wishlist</span>
            </Link>

            <CartTrigger onOpen={() => setCartOpen(true)} />

            <button onClick={() => setLoginOpen(true)} className="flex flex-col items-center">
              <LuLogIn size={18} />
              <span className="hidden sm:block">Login</span>
            </button>

            <Link to="/userprofile" className="bg-[#927f68] text-white rounded-full p-2">
              <IoMdPerson size={25} />
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div
          className={`px-4 py-3 sm:px-6 flex justify-center gap-8 border-t transition-all duration-300
            ${hideCategoryIcons ? "pb-4" : "pb-4"}
          `}
        >
          {["ALL", "Polo Shop", "Jeans", "T-Shirts", "Shirts", "Treack Pents", "Lionies Collection"].map(
            (item) => (
              <Link
                key={item}
                to={item === "ALL" ? "#" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={item === "ALL" ? () => setShowAllMenu(true) : undefined}
                className="flex flex-col items-center gap-2 text-sm font-medium"
              >
                {/* 🔥 ICON hides on scroll */}
                <div
                  className={`transition-all duration-300 overflow-hidden
                    ${hideCategoryIcons ? "h-0 opacity-0 scale-75" : "h-12 opacity-100 scale-100"}
                  `}
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={categoryIcons[item]}
                      alt={item}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text always visible */}
                <span className="whitespace-nowrap">{item}</span>
              </Link>
            )
          )}
        </div>
      </header>

        {/* Ticker */}
        <div className="relative w-full overflow-hidden bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] py-2">
          <div className="flex whitespace-nowrap animate-ticker text-white text-xs sm:text-sm font-medium">
            <span className="mx-4 sm:mx-12">Discover Our Summer Sale</span>
            <span className="mx-4 sm:mx-12">15% Off Dresses With Valid ID!</span>
            <span className="mx-4 sm:mx-12">
              Shop Our New Arrivals With Intro Discounts!
            </span>
            <span className="mx-4 sm:mx-12">Shop Our Exclusive Dress Collection</span>
            <span className="mx-4 sm:mx-12">Discover Our Summer Sale</span>
            <span className="mx-4 sm:mx-12">15% Off Dresses With Valid ID!</span>
            <span className="mx-4 sm:mx-12">
              Shop Our New Arrivals With Intro Discounts!
            </span>
            <span className="mx-4 sm:mx-12">Shop Our Exclusive Dress Collection</span>
          </div>
        </div>

      <CartOffCanvas isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
