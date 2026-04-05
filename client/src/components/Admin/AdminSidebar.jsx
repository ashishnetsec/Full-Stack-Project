'use client'


import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
    FiHome,
    FiBox,
    FiLayers,
    FiTag,
    FiShoppingCart,
    FiUsers,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";





const AdminSidebar = () => {
    const [open, setOpen] = useState(true)
    const pathname = usePathname();
    // console.log(pathname)
    const menu = [
        {
            title: "Dashboard",
            items: [{ name: "Overview", icon: <FiHome />, path: "/admin" }],
        },
        {
            title: "Catalog",
            items: [
                { name: "Products", icon: <FiBox />, path: "/admin/product" },
                { name: "Categories", icon: <FiLayers />, path: "/admin/category" },
                { name: "Brands", icon: <FiTag />, path: "/admin/brand" },
                { name: "Colors", icon: <IoIosColorPalette />, path: "/admin/color" },
            ],
        },
        {
            title: "Sales",
            items: [{ name: "Orders", icon: <FiShoppingCart />, path: "/admin/order" }],
        },
        {
            title: "Users",
            items: [{ name: "Customers", icon: <FiUsers />, path: "/admin/users" }],
        },
        {
            title: "Settings",
            items: [{ name: "Settings", icon: <FiSettings />, path: "/admin/setting" }],
        },
    ];
    return (
        <aside className={` ${open?"w-64":"w-25"} transition-all duration-300 h-screen bg-gray-900 text-white flex flex-col sticky top-0`}>

            {/* Logo */}
            <div className={`h-16 flex items-center ${open? "justify-between" : "justify-center"} transition-all duration-500 px-6 text-xl font-bold border-b border-gray-700`}>
                {open && <span>I-SHOP ADMIN</span>}
                <span className="cursor-pointer" onClick={()=>{setOpen(!open)}}><FaBars /></span>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                {menu.map((section, i) => (
                    <div key={i} className="mb-6">

                        <p className={`text-xs flex ${open?"justify-start":"justify-center"} transition-all duration-500 text-gray-400 uppercase mb-2`}>
                            {section.title}
                        </p>

                        <div className="flex flex-col gap-1">
                            {section.items.map((item, idx) => (
                                <Link href={item.path}
                                    key={idx}
                                    className={`flex items-center ${open?"justify-start":"justify-center"} gap-3 px-3 py-3 rounded-lg cursor-pointer ${item.path == pathname ? "bg-gray-700" : "bg-gray-900"} hover:bg-gray-800 transition-all duration-500 `}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {open && <span className="text-sm">{item.name}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition">
                    <FiLogOut />
                    {open && <span className="text-sm transition-all duration-500">Logout</span>}
                </div>
            </div>
        </aside >
    );
};

export default AdminSidebar;