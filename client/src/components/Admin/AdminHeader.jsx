"use client";

import React from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import Link from "next/link";

const AdminHeader = () => {
  return (
    <div className="px-10 pl-28 pt-6">

      {/* 🔥 Full Width Floating Bar */}
      <div className="px-8 py-2 rounded-2xl bg-white shadow-md border border-gray-200 flex items-center justify-between">

        {/* 🔹 Left Section (Logo + Search) */}
        <div className="flex items-center gap-6 w-full max-w-2xl">

          {/* 🔥 Logo */}
          <Link href="/admin" className="select-none shrink-0">
            <h1
              className="
              text-xl font-bold tracking-tight
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              bg-[length:200%_200%]
              bg-clip-text text-transparent
              animate-gradient
              "
            >
              AshishIsHere
            </h1>
          </Link>
        </div>

        {/* 🔍 Search Input */}
        <div className="flex items-center flex-1 bg-gray-100 rounded-xl px-4 py-2 
          focus-within:bg-white border border-transparent focus-within:border-gray-300 transition">

          <FiSearch className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search products, orders..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* 🔹 Right Icons */}
        <div className="flex items-center gap-3 ml-6">

          {/* Notification */}
          <button className="relative w-11 h-11 flex items-center justify-center rounded-xl 
          text-gray-500 hover:bg-gray-100 transition">
            <FiBell />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="w-11 h-11 flex items-center justify-center rounded-xl 
          text-gray-500 hover:bg-gray-100 transition">
            <FiUser />
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminHeader;