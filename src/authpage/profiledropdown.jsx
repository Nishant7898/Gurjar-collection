import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, removeAccount } from "../Redux/authSlice";
import { User, LogOut, Edit3, Phone, Mail } from "lucide-react";
import toast from "react-hot-toast";

const Profiledropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have been signed out");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      dispatch(removeAccount());
      toast.success("Account deleted successfully");
      navigate("/");
    }
  };

  const editEmail = () => {
    const newEmail = prompt("Enter new email:", currentUser?.email || "");
    if (newEmail && newEmail !== currentUser?.email) {
      console.log("Updated email to:", newEmail);
      toast.success("Email updated successfully");
      // Dispatch update email API call here
    }
  };

  const editPhone = () => {
    const newPhone = prompt("Enter new phone number:", currentUser?.phone || "");
    if (newPhone && newPhone !== currentUser?.phone) {
      console.log("Updated phone to:", newPhone);
      toast.success("Phone number updated successfully");
      // Dispatch update phone API call here
    }
  };

  return (
    <div className="w-[320px] bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 flex flex-col">
      
      {/* Header with Name */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-center text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-lg font-semibold">
          {currentUser?.name || "Guest User"}
        </h1>
      </div>

      {/* Profile Details */}
      {currentUser && (
        <div className="p-4 flex flex-col gap-4">
          
          {/* Email */}
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2 text-gray-800">
              <Mail size={16} /> {currentUser.email || "No email added"}
            </div>
            <button
              onClick={editEmail}
              className="text-orange-500 hover:underline text-xs flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit
            </button>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2 text-gray-800">
              <Phone size={16} /> {currentUser.phone || "No number added"}
            </div>
            <button
              onClick={editPhone}
              className="text-orange-500 hover:underline text-xs flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit
            </button>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {currentUser && (
        <div className="border-t flex flex-col">
          <button
            onClick={handleLogout}
            className="py-3 text-gray-700 hover:bg-rose-50 flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> Sign Out
          </button>
          <button
            onClick={handleDeleteAccount}
            className="py-3 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2 text-sm"
          >
            <User size={16} /> Delete My Account
          </button>
        </div>
      )}

      {!currentUser && (
        <div className="p-4 text-sm text-center text-gray-600">
          Please log in to view your profile
        </div>
      )}
    </div>
  );
};

export default Profiledropdown;
