import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiTruck,
  FiRotateCcw,
  FiGift,
  FiHeart,
  FiMapPin,
} from "react-icons/fi";
import { LuLogIn, LuUser } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { X } from "lucide-react";

import CartTrigger from "./CartTrigger";
import CartOffCanvas from "./CartOffCanvas";
import LoginModal from "./Login";
import { useAuth } from "../service/AuthContext";

export default function Header() {
  const { loginOpen, setLoginOpen, user, pareantcategory } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
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

  // const categoryIcons = {
  //   ALL: "../images/9.webp",
  //   Joggers: "../images/polos.avif",
  //   Jeans: "../images/jeans2.PNG",
  //   "T-Shirts": "../images/similarback5.png",
  //   Shirts: "../images/shirts2.PNG",
  //   "Treack Pents": "../images/trackpants.webp",
  //   "Lionies Collection": "../images/14.webp",
  // };

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
            {user?.user ? (
              <Link
                to="userprofile"
                className="flex flex-col items-center cursor-pointer"
              >
                <LuUser size={18} />
                <span className="hidden sm:block">Profile</span>
              </Link>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex flex-col items-center cursor-pointer"
              >
                <LuLogIn size={18} />
                <span className="hidden sm:block">Login</span>
              </button>
            )}
          </div>
        </div>
        <div className="px-4 pb-4 pt-2 sm:px-6 md:flex md:justify-center md:gap-10 md:py-4 md:border-t md:border-gray-300 md:text-sm overflow-x-auto lg:overflow-visible">
          {/* ALL button - ALWAYS visible */}
          <button
            onClick={() => setShowAllMenu(true)}
            className="hover:underline inline-flex items-center font-semibold text-md tracking-wide cursor-pointer whitespace-nowrap px-2 py-1 shrink-0 md:flex-col md:gap-2 group"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0 overflow-hidden group-hover:scale-110 transition-all duration-200 md:w-12 md:h-12">
              <img
                src="../images/9.webp"
                alt="ALL"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="md:mt-1">ALL</span>
          </button>

          {/* Categories - HIDDEN on mobile (lg+ only) */}
          <div className="hidden lg:flex md:justify-center md:gap-10">
            {pareantcategory.map((item) => (
              <Link
                key={item._id}
                to={`/${item.name.replace(/\s+/g, "-")}`}
                className="flex flex-col items-center gap-2 whitespace-nowrap px-2 py-1 shrink-0 group hover:scale-105 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden group-hover:scale-110 transition-all duration-200">
                  <img
                    src={
                      `http://localhost:5000${item?.smallimage}` ||
                      "../images/placeholder.png"
                    }
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-center">
                  {item?.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Ticker */}
        <div className="relative w-full overflow-hidden bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] py-2">
          <div className="flex whitespace-nowrap animate-ticker text-white text-xs sm:text-sm font-medium">
            <span className="mx-4 sm:mx-12">Discover Our Summer Sale</span>
            <span className="mx-4 sm:mx-12">
              15% Off Dresses With Valid ID!
            </span>
            <span className="mx-4 sm:mx-12">
              Shop Our New Arrivals With Intro Discounts!
            </span>
            <span className="mx-4 sm:mx-12">
              Shop Our Exclusive Dress Collection
            </span>
            <span className="mx-4 sm:mx-12">Discover Our Summer Sale</span>
            <span className="mx-4 sm:mx-12">
              15% Off Dresses With Valid ID!
            </span>
            <span className="mx-4 sm:mx-12">
              Shop Our New Arrivals With Intro Discounts!
            </span>
            <span className="mx-4 sm:mx-12">
              Shop Our Exclusive Dress Collection
            </span>
          </div>
        </div>

        {/* MEN Only Sidebar - ONLY from ALL button */}
        <div
          className={`fixed inset-0 z-60 ${showAllMenu ? "visible" : "invisible"}`}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity ${
              showAllMenu ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowAllMenu(false)}
          />
          <div
            className={`absolute left-0 top-0 h-full w-full sm:w-[420px] bg-white
              transform transition-transform duration-300 overflow-y-auto
              ${showAllMenu ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-white z-10">
              <Link
                to="/"
                className="bg-[#d6b28a] text-white font-black text-2xl px-4 py-2 lowercase"
              >
                LIONIES
              </Link>
              <X
                size={22}
                className="cursor-pointer"
                onClick={() => setShowAllMenu(false)}
              />
            </div>

            <div className="px-4 py-4 border-b bg-gray-50 sticky top-[72px] z-10">
              <h2 className="text-xl font-bold text-gray-900">MEN</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
              {menCategoryData.highlights.map((item) => (
                <Link
                  key={item.title}
                  to={`/men/${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setShowAllMenu(false)}
                  className="text-center text-xs font-medium hover:bg-gray-50 p-3 transition-all hover:scale-105 rounded-md"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-14 w-14 mx-auto rounded-lg object-cover mb-2"
                  />
                  <span className="block font-semibold">{item.title}</span>
                </Link>
              ))}
            </div>

            <div className="px-4 divide-y text-sm font-medium pb-20">
              {["polotshirts", "tracksuits", "overshirts"].map(
                (section) =>
                  menCategoryData[section] && (
                    <div key={section}>
                      <button
                        onClick={() =>
                          setOpenAccordion(
                            openAccordion === section ? null : section,
                          )
                        }
                        className="flex justify-between w-full py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors font-semibold"
                      >
                        <span className="capitalize">
                          {section.replace(/^\w/, (c) => c.toUpperCase())}
                        </span>
                        <span className="text-lg font-bold">
                          {openAccordion === section ? "−" : "+"}
                        </span>
                      </button>

                      {openAccordion === section && (
                        <ul className="pb-6 space-y-3 text-gray-600">
                          {menCategoryData[section].map((item) => (
                            <Link
                              key={item.title}
                              to={`/men/${item.title
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              onClick={() => setShowAllMenu(false)}
                              className="flex items-center gap-3 py-3 px-3 hover:bg-gray-50 rounded-md transition-colors border-l-4 border-[#d18736]"
                            >
                              <img
                                src={item.img}
                                alt={item.title}
                                className="h-12 w-12 rounded-lg object-cover shrink-0"
                              />
                              <span className="text-gray-700 font-medium flex-1">
                                {item.title}
                              </span>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </header>

      <CartOffCanvas isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
