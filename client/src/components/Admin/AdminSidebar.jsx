"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiHome,
    FiBox,
    FiLayers,
    FiTag,
    FiShoppingCart,
    FiUsers,
    FiSettings,
} from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";

const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/admin" },
    { name: "Products", icon: <FiBox />, path: "/admin/product" },
    { name: "Categories", icon: <FiLayers />, path: "/admin/category" },
    { name: "Brands", icon: <FiTag />, path: "/admin/brand" },
    { name: "Colors", icon: <IoIosColorPalette />, path: "/admin/color" },
    { name: "Orders", icon: <FiShoppingCart />, path: "/admin/order" },
    { name: "Users", icon: <FiUsers />, path: "/admin/users" },
    { name: "Settings", icon: <FiSettings />, path: "/admin/setting" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">

            <div className="flex flex-col gap-3 p-3 rounded-2xl bg-white shadow-lg border border-gray-200">

                {menu.map((item, i) => {
                    const active = pathname === item.path;

                    return (
                        <Link
                            href={item.path}
                            key={i}
                            className="group relative"
                        >
                            {/* Icon Button */}
                            <div
                                className={`w-12 h-12 flex items-center justify-center rounded-xl transition

                ${active
                                        ? "bg-indigo-500 text-white shadow-md"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }
                `}
                            >
                                {item.icon}
                            </div>

                            {/* Tooltip */}
                            <span
                                className="absolute left-14 top-1/2 -translate-y-1/2 
                whitespace-nowrap text-sm px-3 py-1.5 rounded-md 
                bg-gray-900 text-white opacity-0 group-hover:opacity-100 
                translate-x-2 group-hover:translate-x-0 transition"
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}