import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiChevronDown, FiCopy, FiHeart, FiShoppingCart, FiStar, FiTruck } from "react-icons/fi";
import { PRODUCTS, getProductById } from "../data/products";
import { useAuth } from "../components/service/AuthContext";
import { getCartItems, setCartItems } from "../utils/cartStorage";
import { getWishlist, setWishlist } from "../utils/wishlistStorage";

const RECENTLY_VIEWED_KEY = "lionies_recently_viewed_v1";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const OFFER_LIST = [
  "10% instant discount on HDFC cards above Rs. 1,999",
  "Festival offer: Flat Rs. 300 off on 2+ items",
  "No cost EMI available on orders above Rs. 3,000",
  "Get extra 5% off on prepaid orders",
];

const DETAIL_SECTIONS = [
  { key: "details", title: "Product Details", render: (p) => p.description },
  { key: "care", title: "Fabric & Care", render: (p) => `${p.material}. ${p.care}` },
  { key: "fit", title: "Size & Fit", render: (p) => p.fit },
  { key: "material", title: "Material & Transparency", render: (p) => `${p.material}; Opaque fabric.` },
  { key: "pattern", title: "Pattern / Occasion", render: (p) => `${p.pattern}; Suitable for ${p.occasion}.` },
  { key: "origin", title: "Country of Origin", render: (p) => p.countryOfOrigin },
  { key: "manufacturer", title: "Manufacturer Details", render: (p) => p.manufacturer },
];

const REVIEW_DATA = [
  {
    id: 1,
    author: "Arjun S.",
    rating: 5,
    helpful: 32,
    date: "2026-02-12",
    comment: "Fit is perfect and quality is great for the price.",
    images: ["/images/similar1.png", "/images/similarback1.png"],
  },
  {
    id: 2,
    author: "Kiran M.",
    rating: 4,
    helpful: 11,
    date: "2026-01-25",
    comment: "Color and print look exactly like photos.",
    images: [],
  },
  {
    id: 3,
    author: "Dev P.",
    rating: 5,
    helpful: 19,
    date: "2026-02-19",
    comment: "Soft fabric and good oversized look.",
    images: ["/images/similar3.png"],
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = getProductById(id || 1);
  const { user, setLoginOpen } = useAuth();

  const [selectedImage, setSelectedImage] = useState(product?.gallery?.[0] || "");
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryState, setDeliveryState] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [toast, setToast] = useState("");
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [openSection, setOpenSection] = useState("details");
  const [reviewSort, setReviewSort] = useState("helpful");
  const [shareCopied, setShareCopied] = useState(false);
  const [wishlist, setWishlistState] = useState(() => getWishlist());

  const isLoggedIn = Boolean(user?.user || user);

  const unavailableSizes = useMemo(() => {
    if (!product) return [];
    return selectedColor === product.colors[0] ? product.unavailableSizes || [] : [];
  }, [product, selectedColor]);

  const discountPercent = useMemo(() => {
    if (!product) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((item) => item.id !== product.id).slice(0, 8);
  }, [product]);

  const recentlyViewed = useMemo(() => {
    const ids = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
    return ids
      .filter((itemId) => itemId !== product?.id)
      .map((itemId) => getProductById(itemId))
      .filter(Boolean)
      .slice(0, 8);
  }, [product?.id]);

  const sortedReviews = useMemo(() => {
    if (reviewSort === "latest") {
      return [...REVIEW_DATA].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [...REVIEW_DATA].sort((a, b) => b.helpful - a.helpful);
  }, [reviewSort]);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product.gallery?.[0] || "");
    setSelectedColor(product.colors?.[0] || "");
    setSelectedSize("");
    setQuantity(1);
    setPincode("");
    setDeliveryState(null);
    setSizeError("");
  }, [product]);

  useEffect(() => {
    if (!product) return;
    if (selectedSize && unavailableSizes.includes(selectedSize)) {
      setSelectedSize("");
      setSizeError("Selected size is unavailable for this variant.");
    }
  }, [selectedColor, unavailableSizes, selectedSize, product]);

  useEffect(() => {
    if (!product) return;
    const previous = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
    const next = [product.id, ...previous.filter((itemId) => itemId !== product.id)].slice(0, 20);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  }, [product]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!product) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
          <p className="text-gray-500 mt-2">The product you are trying to open does not exist.</p>
          <Link to="/productlist" className="inline-block mt-6 px-5 py-2.5 rounded-md bg-[#633426] text-white">
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  const isColorOutOfStock = (color) => (product.unavailableColors || []).includes(color);
  const isSizeOutOfStock = (size) => unavailableSizes.includes(size);
  const isSizeSelected = Boolean(selectedSize);
  const isOutOfStock = product.stock <= 0;
  const isWishlisted = wishlist.includes(product.id);

  const getColorImage = (color) => {
    const colorIndex = product.colors.indexOf(color);
    return product.gallery[colorIndex % product.gallery.length] || product.gallery[0];
  };

  const addToCart = () => {
    if (!navigator.onLine) {
      setToast("Network issue. Please check your internet.");
      return;
    }
    if (!isSizeSelected) {
      setSizeError("Please select a size before adding to bag.");
      return;
    }
    if (isOutOfStock) {
      setToast("Product is out of stock.");
      return;
    }

    const currentItems = getCartItems();
    const lineId = `${product.id}-${selectedSize}-${selectedColor}`;
    const existingIndex = currentItems.findIndex((item) => item.lineId === lineId);

    if (existingIndex > -1) {
      currentItems[existingIndex].quantity += quantity;
    } else {
      currentItems.push({
        lineId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    }

    setCartItems(currentItems);
    setToast("Added to bag");
  };

  const handleBuyNow = () => {
    if (!isSizeSelected) {
      setSizeError("Please select a size before buying.");
      return;
    }
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    addToCart();
    navigate("/checkout");
  };

  const toggleWishlist = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    const next = isWishlisted
      ? wishlist.filter((itemId) => itemId !== product.id)
      : [...wishlist, product.id];
    setWishlist(next);
    setWishlistState(next);
    setToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const checkDelivery = () => {
    if (!navigator.onLine) {
      setDeliveryState({ type: "error", message: "Network issue. Try again." });
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setDeliveryState({ type: "error", message: "Invalid pincode." });
      return;
    }

    setDeliveryState({
      type: "success",
      message: `Delivery by ${new Date(Date.now() + 3 * 24 * 3600 * 1000).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })}`,
      cod: product.codAvailable ? "Available" : "Not Available",
      shipping: product.shippingCharge === 0 ? "Free" : `Rs. ${product.shippingCharge}`,
      returns: "7-day easy return available",
    });
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    } catch {
      setToast("Could not copy link");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 pb-28 md:pb-10">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-md text-sm shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <button
          type="button"
          onClick={() => {
            if (location.state?.returnTo) {
              navigate(location.state.returnTo);
              return;
            }
            navigate(-1);
          }}
          className="hover:text-gray-800"
        >
          Back
        </button>
        <button type="button" className="flex items-center gap-1 hover:text-gray-800" onClick={copyShareLink}>
          {shareCopied ? <FiCheck /> : <FiCopy />} Share
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div
            className="bg-gray-100 overflow-hidden rounded-md"
            onMouseEnter={() => setIsZoomEnabled(true)}
            onMouseLeave={() => setIsZoomEnabled(false)}
            onClick={() => setIsZoomEnabled((prev) => !prev)}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className={`w-full h-[420px] md:h-[540px] object-cover transition-transform duration-300 ${
                isZoomEnabled ? "scale-125" : "scale-100"
              }`}
            />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto snap-x">
            {product.gallery.map((image) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`border rounded-md overflow-hidden shrink-0 snap-start ${
                  selectedImage === image ? "border-[#633426]" : "border-gray-200"
                }`}
              >
                <img src={image} alt="Product preview" className="w-20 h-20 md:w-24 md:h-24 object-cover" loading="lazy" />
              </button>
            ))}
            <button
              type="button"
              className="w-20 h-20 md:w-24 md:h-24 shrink-0 border border-dashed border-gray-300 rounded-md text-xs text-gray-500"
              aria-label="Video thumbnail"
            >
              Video
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="flex items-center gap-1 text-gray-700"><FiStar className="text-yellow-500" />{product.rating}</span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="mt-5">
            <span className="text-3xl font-bold text-[#633426]">Rs. {CURRENCY_FORMATTER.format(product.price)}</span>
            <span className="text-gray-400 line-through ml-3">Rs. {CURRENCY_FORMATTER.format(product.originalPrice)}</span>
            <span className="ml-3 text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">{discountPercent}% OFF</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>

          <div className="mt-6">
            <p className="text-sm font-semibold mb-2">Color</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  disabled={isColorOutOfStock(color)}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedImage(getColorImage(color));
                  }}
                  className={`px-3 py-1.5 rounded border text-sm ${
                    selectedColor === color ? "bg-[#633426] text-white border-[#633426]" : "border-gray-300"
                  } ${isColorOutOfStock(color) ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Select Size</p>
              <button
                type="button"
                onClick={() => setOpenSection(openSection === "size-chart" ? "" : "size-chart")}
                className="text-xs text-[#633426] font-semibold"
              >
                Size Chart
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  disabled={isSizeOutOfStock(size)}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError("");
                  }}
                  className={`w-10 h-10 rounded border text-sm ${
                    selectedSize === size ? "bg-black text-white border-black" : "border-gray-300"
                  } ${isSizeOutOfStock(size) ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="text-xs text-red-600 mt-2">{sizeError}</p>}
            {openSection === "size-chart" && (
              <div className="mt-3 border rounded-md p-3 text-xs text-gray-600 bg-gray-50">
                S: 38 | M: 40 | L: 42 | XL: 44 | XXL: 46 inches chest
              </div>
            )}
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button type="button" className="w-10 h-10 border rounded" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
              <span className="min-w-8 text-center font-semibold">{quantity}</span>
              <button type="button" className="w-10 h-10 border rounded" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={addToCart}
              disabled={!isSizeSelected || isOutOfStock}
              className="flex-1 h-12 rounded-md bg-[#633426] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiShoppingCart /> Add to Bag
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!isSizeSelected || isOutOfStock}
              className="flex-1 h-12 rounded-md border border-[#633426] text-[#633426] font-semibold disabled:opacity-50"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={toggleWishlist}
              className={`h-12 w-12 rounded-md border flex items-center justify-center ${
                isWishlisted ? "bg-red-50 border-red-300 text-red-600" : "border-gray-300"
              }`}
            >
              <FiHeart />
            </button>
          </div>

          {isOutOfStock && <p className="mt-3 text-sm text-red-600">This product is currently out of stock.</p>}

          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <p className="text-sm font-semibold flex items-center gap-2"><FiTruck /> Check Delivery</p>
            <div className="mt-3 flex gap-2">
              <input
                value={pincode}
                onChange={(event) => setPincode(event.target.value.replace(/[^0-9]/g, ""))}
                maxLength={6}
                placeholder="Enter pincode"
                className="flex-1 h-10 rounded border px-3"
              />
              <button type="button" onClick={checkDelivery} className="px-4 h-10 rounded bg-black text-white text-sm">Check</button>
            </div>
            {deliveryState && (
              <div className={`mt-3 text-sm ${deliveryState.type === "error" ? "text-red-600" : "text-gray-700"}`}>
                <p>{deliveryState.message}</p>
                {deliveryState.type === "success" && (
                  <ul className="mt-2 space-y-1 text-xs text-gray-600">
                    <li>COD: {deliveryState.cod}</li>
                    <li>Shipping: {deliveryState.shipping}</li>
                    <li>{deliveryState.returns}</li>
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 border rounded-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Offers & Coupons</h3>
              <button type="button" className="text-xs text-[#633426]" onClick={() => setShowAllOffers((prev) => !prev)}>
                {showAllOffers ? "View less" : "View more offers"}
              </button>
            </div>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              {(showAllOffers ? OFFER_LIST : OFFER_LIST.slice(0, 2)).map((offer) => (
                <li key={offer}>- {offer}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border rounded-md">
        {DETAIL_SECTIONS.map((section) => (
          <div key={section.key} className="border-b last:border-b-0">
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold"
              onClick={() => setOpenSection((prev) => (prev === section.key ? "" : section.key))}
            >
              {section.title}
              <FiChevronDown className={`transition-transform ${openSection === section.key ? "rotate-180" : ""}`} />
            </button>
            {openSection === section.key && <p className="px-4 pb-4 text-sm text-gray-600">{section.render(product)}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Ratings & Reviews</h2>
          <div className="flex items-center gap-2">
            <select
              value={reviewSort}
              onChange={(event) => setReviewSort(event.target.value)}
              className="h-9 border rounded px-2 text-sm"
            >
              <option value="helpful">Most Helpful</option>
              <option value="latest">Latest</option>
            </select>
            <button type="button" disabled className="h-9 px-3 text-sm border rounded text-gray-400 cursor-not-allowed">
              Write Review (Post Purchase)
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border rounded-md p-4">
            <p className="text-3xl font-bold">{product.rating}</p>
            <p className="text-sm text-gray-500">Overall rating ({product.reviews} reviews)</p>
            <div className="mt-3 text-xs text-gray-600 space-y-1">
              <p>5 star: 72%</p>
              <p>4 star: 18%</p>
              <p>3 star: 6%</p>
              <p>2 star: 2%</p>
              <p>1 star: 2%</p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            {sortedReviews.map((review) => (
              <article key={review.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString("en-IN")}</span>
                </div>
                <p className="text-sm mt-1">Rating: {review.rating}/5</p>
                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                {review.images.length > 0 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {review.images.map((image) => (
                      <img key={image} src={image} alt="Review" className="w-16 h-16 object-cover rounded" />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">You may also like</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {relatedProducts.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className="group block min-w-[180px]" state={{ returnTo: location.pathname + location.search }}>
              <div className="bg-gray-100 overflow-hidden rounded-md">
                <img src={item.front} alt={item.name} className="w-[180px] h-[220px] object-cover group-hover:scale-105 transition" loading="lazy" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
              <p className="text-sm text-[#633426] font-semibold">Rs. {CURRENCY_FORMATTER.format(item.price)}</p>
            </Link>
          ))}
        </div>
      </div>

      {recentlyViewed.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="group block min-w-[160px]">
                <div className="bg-gray-100 overflow-hidden rounded-md">
                  <img src={item.front} alt={item.name} className="w-[160px] h-[190px] object-cover" loading="lazy" />
                </div>
                <p className="mt-2 text-sm text-gray-800 line-clamp-2">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 md:hidden z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Price</p>
            <p className="font-bold text-[#633426]">Rs. {CURRENCY_FORMATTER.format(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={addToCart}
            disabled={!isSizeSelected || isOutOfStock}
            className="h-10 px-3 rounded bg-[#633426] text-white text-sm font-semibold disabled:opacity-50"
          >
            Add to Bag
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!isSizeSelected || isOutOfStock}
            className="h-10 px-3 rounded border border-[#633426] text-[#633426] text-sm font-semibold disabled:opacity-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;