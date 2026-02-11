import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* ================= WHITE FOOTER ================= */}
      <footer className="bg-white text-[#212121] pt-16 pb-6 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">

          {/* Newsletter + Apps */}
          <div className="py-16 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              <div>
                <h3 className="text-3xl font-semibold mb-4">
                  Subscribe to our awesome emails.
                </h3>
                <p className="text-md text-gray-500 mb-4">
                  Get our latest offers and news straight in your inbox.
                </p>

                <div className="flex max-w-md overflow-hidden">
                  <input
                    type="email"
                    placeholder="Please enter an email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 outline-none bg-[#f5f5f5]"
                  />
                  <button
                    onClick={() => {
                      if (!email) return alert("Please enter your email");
                      window.location.href = `mailto:support@driptees.com?subject=Newsletter Subscription&body=My email is: ${email}`;
                    }}
                    className="bg-black text-white px-9"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-semibold mb-4">
                  Enjoy our amazing apps
                </h3>
                <p className="text-md text-gray-500 mb-4">
                  Shop our products and offers on-the-go.
                </p>

                <div className="flex gap-4 mt-4">
                  <img src="/image/app1.png" className="w-40 cursor-pointer" />
                  <img src="/image/app2.png" className="w-40 cursor-pointer" />
                </div>
              </div>

            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-12 text-sm text-gray-600">

            {[
              ["Categories", ["Jeans", "Casual Shirt", "T-Shirt", "Co-ord Set", "Shorts", "Blazer", "Hoodie", "Cargo", "Coats"]],
              ["Pants", ["Trouser", "Bootcut", "Gurkha", "Lower", "Cargo", "Loose Fit", "Slim Fit"]],
              ["Jeans", ["Cargo", "Six Pocket", "Boot Cut", "Straight", "Baggy", "Slim Fit"]],
              ["Shirt", ["Floral", "Stripes", "Checks"]],
              ["T-Shirt", ["Polo", "Round Neck"]],
            ].map(([title, items], i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4 text-black">{title}</h4>
                <ul className="space-y-2">
                  {items.map((item, idx) => (
                    <li key={idx}>
                      <Link to="/" className="hover:text-black">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p className="flex items-center gap-1">
              <FaRegCopyright /> 2023 Biztek. All Rights Reserved.
            </p>
            <div className="flex gap-6 mt-3 md:mt-0">
              <Link to="/">Make an Enquiry</Link>
              <Link to="/">Terms & Conditions</Link>
            </div>
          </div>

        </div>
      </footer>
<footer className="">
      <div className="relative  px-4  bg-[url('/image/footer-img2.jpeg')] bg-cover bg-center w-full overflow-hidden">

        <div className="absolute inset-0 rounded-lg bg-black/70"></div>

        <div className='absolute top-70 left-10'>
          <img
            src="/image/Mens-logo.PNG"
            alt="Model"
            className="w-50 object-cover "
          />

        </div>


        <div className="relative z-10 px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 text-[#f5efdd]">

            <div className="lg:col-span-1">
              <h4 className="mb-4 font-semibold">Contact Us</h4>

              <ul className="space-y-4 text-sm text-[#f5efdd]">
                <li className="flex items-center gap-3">
                  <FiPhone className="text-lg" />
                  <a href="tel:+00123456789" className="hover:text-white transition">
                    +00 12 34 56 789
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <FiMail className="text-lg" />
                  <a
                    href="mailto:contact@lionies.com"
                    className="hover:text-white transition"
                  >
                    contact@lionies.com
                  </a>
                </li>
              </ul>

              {/* SOCIAL LINKS */}
              <h4 className="my-4 font-semibold">Social Links</h4>
              <div className="flex gap-4 mt-6 text-[#f5efdd]">
                <a href="#" className="hover:text-white transition">
                  <FaInstagram />
                </a>

                <a href="#" className="hover:text-white transition">
                  <FaLinkedinIn />
                </a>

                <a href="#" className="hover:text-white transition">
                  <FaGithub />
                </a>

                <a href="#" className="hover:text-white transition">
                  <FaXTwitter />
                </a>
              </div>
            </div>


            <div className="lg:col-span-1">
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <Link to="/"><li className='pb-3'>Home</li></Link>
                <Link to="/"><li className='pb-3'>FAQs</li></Link>
                <Link to="/"><li className='pb-3'>Contact</li></Link>
                <Link to="/"><li className='pb-3'>Products</li></Link>
              </ul>
            </div>

            {/* SHOP */}
            <div className="lg:col-span-1">
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className="space-y-3 text-sm">
                <Link to="/"><li className='pb-3'>Home</li></Link>
                <Link to="/"><li className='pb-3'>FAQs</li></Link>
                <Link to="/"><li className='pb-3'>Contact</li></Link>
                <Link to="/"><li className='pb-3'>Products</li></Link>
              </ul>
            </div>

         
            <div className="lg:col-span-2 space-y-6">

              {/* Newsletter */}
              <div className='p-4 rounded-lg'>
                <h3 className="text-2xl font-serif mb-4">
                  Join Our News Letter
                </h3>

                <p className="text-sm text-[#f5efdd]/80 mb-6 max-w-md">
                  Subscribe to our newsletter and receive exclusive offers
                </p>

                <div className="flex items-center border-b border-white/40 pb-2 max-w-md">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="bg-transparent w-full outline-none placeholder-white/40"
                  />
                  <FaArrowRight />
                </div>
              </div>

              {/* Image */}
              <img
                src="/images/all.webp"
                alt="Model"
                className="w-full object-cover"
              />
            </div>

          </div>


          {/* DIVIDER */}
          <div className="border-t border-white/20 mb-10"></div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#f5efdd] gap-4">
            <span>© {new Date().getFullYear()} Graphy. All rights reserved.</span>

            <div className="flex gap-6">
              <Link to="/refund">Refund Policy</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
    </>
  );
}
