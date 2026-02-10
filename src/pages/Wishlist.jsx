import { useState } from "react";
import { X } from "lucide-react";

const initialWishlist = [
  {
    id: 1,
    title: "Naruto Shippuden: Konoha Leaf",
    subtitle: "Oversized Full Sleeve T-Shirts",
    price: 1199,
    mrp: 1299,
  
  },
  {
    id: 2,
    title: "Minions: Blah Blah Blah",
    subtitle: "Oversized T-Shirts",
    price: 849,
    mrp: 899,
    
  },
  {
    id: 3,
    title: "The Flash: Barry Allen",
    subtitle: "Oversized Jerseys",
    price: 1099,
    mrp: 1199,
   
  },
  {
    id: 4,
    title: "HTTYD: Night Fury Chibi",
    subtitle: "Oversized T-Shirts",
    price: 749,
    mrp: 799,
    
  },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);


  const removeFromWishlist = (id) => {
    setWishlistItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h1 className="text-lg font-semibold mb-6">
          My Wishlist{" "}
          <span className="text-gray-500">
            ({wishlistItems.length} items)
          </span>
        </h1>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="border-[#633426] rounded-lg overflow-hidden relative shadow-sm hover:border transition cursor-pointer  "
              >
                
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 cursor-pointer"
                >
                  <X size={14} />
                </button>

              
                <img
                  src="/image/tee1.jpg"
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-sm font-semibold leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-500 mb-2">
                    {item.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#fff4e7] text-[#927f68] text-sm font-semibold px-2 py-0.5 rounded">
                      Membership Price ₹{item.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{item.mrp}
                    </span>
                  </div>

                  {/* Button */}
                  <button className="w-full text-sm font-semibold text-[#633426] border-t pt-3 hover:text-teal-900 cursor-pointer">
                    MOVE TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
