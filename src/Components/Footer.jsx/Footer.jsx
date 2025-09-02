import React from "react";
import bg from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#d3af10ab] to to-[#b3c706] mt-5 text-black py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2  bg-center">
            <img className="h-10 w-10 rounded-full" src={bg} alt="" />
            {" "}
            <h2 className="text-white font-scope-one-regular font-bold text-2xl ">
              Cloth Canvas
            </h2>
          </div>

          <p className="mt-3 text-sm">
            Your Style, Our Passion. Trendy outfits at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Shop Men</li>
            <li>Shop Women</li>
            <li>New Arrivals</li>
            <li>Offers</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Shipping & Returns</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
            <li>Payment Options</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm mb-3">Subscribe for latest offers & trends</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg text-black flex-1"
            />
            <button className="bg-red-500 px-4 py-2 rounded-r-lg text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © 2025 Cloth Canvas Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
