import React from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";

const AdminHeader = () => {
  return (
    <header className="h-16 bg-white shadow-sm px-6 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left - Title + (future toggle button) */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600">
          <FiMenu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Admin Panel
        </h1>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products, orders..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <FiBell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
            alt="profile"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700">USER</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;