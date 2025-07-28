import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, removeAccount } from "../Redux/authSlice";
import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Gift,
  Percent,
  Bookmark,
  User,
  LogOut,
  Shirt,
} from "lucide-react";

const Profiledropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect after logout
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (confirm) {
      dispatch(removeAccount());
      navigate("/"); // Navigate away after deletion (adjust as needed)
    }
  };

  const menuItems = [
    {
      icon: Heart,
      label: "My Wishlist",
      onClick: () => navigate("/wishlist"),
    },
    {
      icon: ShoppingBag,
      label: "Order History",
      onClick: () => navigate("/orders"), // adjust route if you have an orders page
    },
    {
      icon: ShoppingCart,
      label: "Shopping Cart",
      onClick: () => navigate("/cart"),
    },
    {
      icon: Gift,
      label: "Gift Vouchers",
      onClick: () => navigate("/giftvouchers"), // adjust route
    },
    {
      icon: Percent,
      label: "Coupons & Offers",
      onClick: () => navigate("/coupons"), // adjust route
    },
    {
      icon: Bookmark,
      label: "Saved for Later",
      onClick: () => navigate("/saved"), // adjust route
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg shadow-xl flex flex-col bg-white w-[320px] max-h-[500px] overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-5 text-center border-b border-gray-100">
        <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Shirt className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-bold text-xl text-gray-800 mb-2">
          {currentUser?.name || "Welcome"}
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed px-2">
          {currentUser
            ? `Logged in as ${currentUser.email || currentUser.phone}`
            : "Login to access your fashion collection, orders & exclusive deals."}
        </p>
      </div>

      {/* Login/Signup Buttons - Only show when not logged in */}
      {!currentUser && (
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={handleLogin}
              className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md text-sm"
              type="button"
            >
              LOGIN
            </button>
            <span className="flex items-center text-gray-400 font-medium text-sm"> / </span>
            <button
              onClick={handleSignup}
              className="flex-1 border-2 border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm"
              type="button"
            >
              SIGNUP
            </button>
          </div>
        </div>
      )}

      {/* Menu Items - Only show when logged in */}
      {currentUser && (
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 hover:bg-rose-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0 group"
                onClick={item.onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    item.onClick();
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-r from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200 rounded-full flex items-center justify-center transition-colors duration-200">
                    <IconComponent className="w-4 h-4 text-rose-600" />
                  </div>
                  <span className="font-medium text-gray-700 text-sm group-hover:text-rose-700 transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Extra Sections */}
          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-rose-50">
            <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Quick Access
            </h3>
            <div className="space-y-2">
              {["Size Guide", "Return Policy", "Style Guide"].map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => console.log(`${text} clicked`)} // Replace with actual action
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") console.log(`${text} clicked`);
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      idx % 2 === 0 ? "bg-rose-400" : "bg-pink-400"
                    }`}
                  ></div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 bg-gradient-to-r from-rose-50 to-pink-50">
            <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Shop by Category
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                className="bg-white p-2 rounded-md shadow-sm hover:shadow-md text-center cursor-pointer"
                onClick={() => navigate("/women")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/women");
                }}
              >
                <div className="text-orange-600 font-medium">Women</div>
              </div>
              <div
                className="bg-white p-2 rounded-md shadow-sm hover:shadow-md text-center cursor-pointer"
                onClick={() => navigate("/men")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/men");
                }}
              >
                <div className="text-orange-600 font-medium">Men</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-100 p-3 bg-white">
        {currentUser ? (
          <div className="space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-rose-500 font-medium py-2 transition-colors duration-200 text-sm"
              type="button"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 font-medium py-2 transition-colors duration-200 text-sm"
              onClick={handleDeleteAccount}
              type="button"
            >
              <User className="w-4 h-4" />
              Delete My Account
            </button>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500">
            Please login to access all features
          </div>
        )}
      </div>
    </div>
  );
};

export default Profiledropdown;