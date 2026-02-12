import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { Star } from "lucide-react";
import TopProducts from "../components/Home/TopProducts";
import { LuBadgeCheck } from "react-icons/lu";


export default function ProductDetailPage() {
  const images = [
    "/image/shirt5.jpg",
    "/image/shirt1.jpg",
    "/image/shirt2.jpg",
    "/image/shirt4.jpg",
  ];



  const productDetails = [
    {
      id: 1,
      brand: "LIONIES",
      name: "THE BEAR HOUSE Men's Micro Checked Slim Fit Cotton Casual Shirt",
      price: 1512,
      originalPrice: 1890,
      discount: 20,
      boughtText: "10+ people bought this in the last month",
      colors: [
        { name: "Green", value: "#123f348b" },
        { name: "Black", value: "#000000" },
        { name: "White", value: "#ffffff" },
      ],
      sizes: ["S", "M", "L"],
    },
  ];



  const [selectedImage, setSelectedImage] = useState(images[0]);


  const [copied, setCopied] = useState(false);

  const couponCode = "824739";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [expressAvailable, setExpressAvailable] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState("standard");

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      alert("Please enter valid 6 digit pincode");
      return;
    }

    // Mock logic (replace with API later)
    if (["1", "2", "3", "4"].includes(pincode[0])) {
      setExpressAvailable(true);
    } else {
      setExpressAvailable(false);
      setSelectedDelivery("standard");
    }

    setDeliveryChecked(true);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);


  const ratingData = {
    average: 3.9,
    totalReviews: 712,
    breakdown: [
      { star: 5, count: 388 },
      { star: 4, count: 133 },
      { star: 3, count: 46 },
      { star: 2, count: 26 },
      { star: 1, count: 119 },
    ],
  };

  const total = ratingData.totalReviews;

  const customerPhotos = [
    "/image/shirt1.jpg",
    "/image/shirt2.jpg",
    "/image/shirt4.jpg",
    "/image/shirt4.jpg",

  ];




  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };


  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);



  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="flex gap-6 sticky top-24 self-start h-fit">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onMouseEnter={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div
            className="flex-1 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            <img
              src={selectedImage}
              alt="product"
              style={zoomStyle}
              className={`w-full object-cover transition-transform duration-100 ease-out ${isZooming
                ? "scale-[3.5] cursor-zoom-out"
                : "scale-100 cursor-zoom-in"
                }`}
            />
          </div>
        </div>

        {/* RIGHT SIDE USING MAP */}
        {productDetails.map((product) => {
          const [selectedColor, setSelectedColor] = useState(
            product.colors[0].name
          );

          const [selectedSize, setSelectedSize] = useState(
            product.sizes[0]
          );

          return (
            <div key={product.id} className="space-y-6">

              {/* Brand */}
              <h2 className="text-3xl font-bold mb-1">
                {product.brand}
              </h2>

              {/* Product Name */}
              <h3 className="text-xl text-gray-700 mb-2">
                {product.name}
              </h3>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-gray-400 ">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {product.discount}% OFF
                  </span>
                  <span className="text-red-600 text-sm">
                    Inclusive of all taxes
                  </span>
                </div>

             <div className="inline-flex items-center gap-2 px-6 md:mt-4 py-2 rounded-full text-sm font-medium text-[#927f68] 
bg-[#faf7f3]
shadow-md hover:shadow-lg transition-all duration-300">
  <LuBadgeCheck className="w-4 h-4" />
  {product.boughtText}
</div>


                {/* <div className="inline-block px-16 py-4 text-white font-semibold text-sm
bg-[#927f68]
[clip-path:polygon(0%_0%,_100%_0%,_85%_50%,_100%_100%,_0%_100%)] md:mt-5">
  {product.boughtText}
</div> */}

              </div>

              {/* Color Variant */}

              <div>
                <h3 className="font-semibold mb-3 text-gray-800">
                  Color: <span className="font-normal">{selectedColor}</span>
                </h3>

                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200
        ${selectedColor === color.name
                          ? "ring-2 ring-black scale-110"
                          : "border-gray-300 hover:scale-105"
                        }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>


              {/* Size Variant */}
            <div className="relative">
  {/* Header Row */}
  <div className="flex justify-between items-center mb-3">
    <h3 className="font-semibold text-gray-800">
      Size: <span className="font-normal">{selectedSize}</span>
    </h3>

    <button
      onClick={() => setSizeGuideOpen(true)}
      className="text-sm text-[#927f68] font-medium hover:underline"
    >
      Size Guide
    </button>
  </div>

  {/* Size Buttons */}
  <div className="flex gap-3 flex-wrap">
    {product.sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-5 py-2 text-sm font-medium transition-all duration-200 border
        ${
          selectedSize === size
            ? "bg-[#927f68] text-white border-[#927f68] shadow-md scale-105"
            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>



              {/* Button */}
              <div className="flex gap-4 mt-6">

                {/* Add to Cart Button */}
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#927f68] text-white py-3  font-semibold tracking-wide shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                {/* Wishlist Button */}
                <Link
                  to="/wishlist"
                  className="flex items-center justify-center gap-2 px-6 py-3  border border-[#927f68] text-[#927f68] font-semibold hover:bg-[#927f68] hover:text-white transition-all duration-300 hover:shadow-md"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>

              </div>

              {/* Bottom Style Gallery */}
              <div className="pt-6 border-t mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Coupon Code
                </h3>

                <div className="flex">
                  {[
                    "/image/ticket-2.PNG",
                  ].map((img, index) => (
                    <div
                      key={index}
                      className="relative flex-1 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={img}
                        alt="style"
                        className="w-[50vh] h-[20vh]"
                      />

                      {/* Overlay Text */}
                      <div className="absolute bottom-18 left-10 text-purple-700">

                        <h4
                          className="text-2xl tracking-wide text-purple-800"
                          style={{ fontFamily: "'Pacifico', cursive" }}
                        >
                          Summer Collection
                        </h4>

                        <p className="text-4xl opacity-80">
                          70% off
                        </p>

                        {/* Rotated Code */}
                        <div className="absolute -right-30 top-9 -translate-y-1/2 rotate-[270deg]">
                          <span className="text-white text-lg tracking-[0.4em] font-semibold opacity-80">
                            {couponCode}
                          </span>
                        </div>



                      </div>

                      {/* Copy Coupon Section */}
                      <div
                        onClick={handleCopy}
                        className="mt-3 flex items-center gap-2 text-sm cursor-pointer group select-none"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 font-medium">
                              Copied!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 group-hover:text-purple-900 transition" />
                            <span className="group-hover:text-purple-900 transition">
                              Copy code
                            </span>
                          </>
                        )}
                      </div>

                    </div>

                  ))}
                </div>
              </div>

              {/* Delivery Section */}
              <div className="pt-8 border-t mt-8 space-y-6">

                <h3 className="text-xl font-semibold text-gray-800">
                  Delivery Options
                </h3>

                {/* Pincode Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter your pincode"
                    maxLength={6}
                    className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#927f68]"
                  />

                  <button
                    onClick={checkDelivery}
                    className="px-6 py-3 bg-[#927f68] text-white font-semibold rounded-lg hover:scale-105 transition"
                  >
                    Check
                  </button>
                </div>

                {/* Delivery Results */}
                {deliveryChecked && (
                  <div className="space-y-4">

                    {/* Express Option */}
                    <div
                      onClick={() => expressAvailable && setSelectedDelivery("express")}
                      className={`p-4 rounded-xl border transition-all cursor-pointer
        ${selectedDelivery === "express"
                          ? "border-[#927f68] bg-[#f8f5f1]"
                          : "border-gray-300"
                        }
        ${!expressAvailable ? "opacity-50 cursor-not-allowed" : ""}
        `}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Express Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            Within 24 Hours
                          </p>
                        </div>

                        {expressAvailable ? (
                          <span className="text-green-600 text-sm font-medium">
                            Available
                          </span>
                        ) : (
                          <span className="text-red-500 text-sm font-medium">
                            Not Available
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Standard Option */}
                    <div
                      onClick={() => setSelectedDelivery("standard")}
                      className={`p-4 rounded-xl border transition-all cursor-pointer
        ${selectedDelivery === "standard"
                          ? "border-[#927f68] bg-[#f8f5f1]"
                          : "border-gray-300"
                        }
        `}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Standard Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            1-2 Business Days
                          </p>
                        </div>

                        <span className="text-green-600 text-sm font-medium">
                          Available
                        </span>
                      </div>
                    </div>

                    {/* Selected Delivery Info */}
                    <div className="text-sm text-gray-600 pt-2">
                      Delivering via{" "}
                      <span className="font-semibold capitalize text-[#927f68]">
                        {selectedDelivery}
                      </span>{" "}
                      service to {pincode}
                    </div>

                  </div>
                )}
              </div>

              {/* Product Details Accordion */}
              <div className="pt-8 border-t mt-8">

                {/* Accordion Header */}
                <button
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    Product Details
                  </h3>

                  <span
                    className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${detailsOpen ? "max-h-96 mt-6" : "max-h-0"
                    }`}
                >
                  <div className="bg-gray-100 rounded-xl p-6 space-y-4 text-gray-800">

                    <div className="flex justify-between">
                      <span className="font-medium">Material composition</span>
                      <span>100% Cotton</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Pattern</span>
                      <span>Checkered</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Fit type</span>
                      <span>Slim Fit</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Sleeve type</span>
                      <span>Long Sleeve</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Collar style</span>
                      <span>Button Down</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Length</span>
                      <span>Standard Length</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Country of Origin</span>
                      <span>India</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Return Policy Accordion */}
              <div className="pt-6 border-t mt-6">

                {/* Accordion Header */}
                <button
                  onClick={() => setReturnOpen(!returnOpen)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    Return Policy
                  </h3>

                  <span
                    className={`transition-transform duration-300 ${returnOpen ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${returnOpen ? "max-h-96 mt-6" : "max-h-0"
                    }`}
                >
                  <div className="bg-gray-100 rounded-xl p-6 space-y-6 text-gray-800">

                    {/* 7 Day Return */}
                    <div>
                      <h4 className="font-semibold mb-2">
                        7-Day Easy Returns
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        You can return the product within 7 days of delivery.
                        Items must be unused, unwashed, and in original packaging
                        with tags intact.
                      </p>
                    </div>

                    {/* Refund Policy */}
                    <div>
                      <h4 className="font-semibold mb-2">
                        Refund Process
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Once the returned item passes quality check,
                        your refund will be processed within 5-7 business days
                        to your original payment method.
                      </p>
                    </div>

                    {/* Non-Returnable */}
                    <div>
                      <h4 className="font-semibold mb-2">
                        Non-Returnable Items
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Innerwear, customized products, and items purchased
                        during final sale are not eligible for return.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              <div className="max-w-6xl mx-auto p-6">
                {/* Title */}
                <h2 className="text-2xl font-semibold mb-6">Ratings</h2>

                <div className="flex flex-col md:flex-row gap-10 border-b pb-8">
                  {/* Left Side - Average */}
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                      <h1 className="text-5xl font-bold text-gray-800">
                        {ratingData.average}
                      </h1>
                      <Star className="text-yellow-500 fill-yellow-500 w-8 h-8" />
                    </div>

                    <p className="text-gray-600 mt-2">
                      {ratingData.totalReviews} Verified Buyers
                    </p>
                  </div>

                  {/* Right Side - Breakdown */}
                  <div className="flex-1 space-y-3">
                    {ratingData.breakdown.map((item) => {
                      const percentage = (item.count / total) * 100;

                      return (
                        <div key={item.star} className="flex items-center gap-4">
                          <span className="w-8 text-gray-700">
                            {item.star} ★
                          </span>

                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-yellow-500 h-3 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>

                          <span className="w-10 text-right text-gray-600">
                            {item.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>

        
                </div>

                {/* Customer Photos */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Photos ({customerPhotos.length})
                  </h3>

                  <div className="flex gap-4 flex-wrap">
                    {customerPhotos.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="customer"
                        className="w-32 h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition"
                      />
                    ))}
                  </div>
                </div>
              </div>









{sizeGuideOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    
    <div className="bg-white w-[95%] md:w-[700px] rounded-2xl p-6 shadow-xl relative animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={() => setSizeGuideOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-6">Size Guide</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Size</th>
              <th className="p-3 border">Chest (in)</th>
              <th className="p-3 border">Waist (in)</th>
              <th className="p-3 border">Shoulder (in)</th>
              <th className="p-3 border">Length (in)</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="p-3 border font-medium">S</td>
              <td className="p-3 border">38</td>
              <td className="p-3 border">36</td>
              <td className="p-3 border">17</td>
              <td className="p-3 border">27</td>
            </tr>

            <tr className="text-center bg-gray-50">
              <td className="p-3 border font-medium">M</td>
              <td className="p-3 border">40</td>
              <td className="p-3 border">38</td>
              <td className="p-3 border">18</td>
              <td className="p-3 border">28</td>
            </tr>

            <tr className="text-center">
              <td className="p-3 border font-medium">L</td>
              <td className="p-3 border">42</td>
              <td className="p-3 border">40</td>
              <td className="p-3 border">19</td>
              <td className="p-3 border">29</td>
            </tr>

            <tr className="text-center bg-gray-50">
              <td className="p-3 border font-medium">XL</td>
              <td className="p-3 border">44</td>
              <td className="p-3 border">42</td>
              <td className="p-3 border">20</td>
              <td className="p-3 border">30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


            </div>
          );
        })}


      </div>
      <TopProducts />
    </div>



  );
}
