import React from 'react'
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiMenu } from 'react-icons/fi'
import Image from 'next/image'

export default function Header() {
    return (
        <>
            <header className="w-full bg-white border-b">

                {/*  Top Bar  */}
                <div className="hidden md:block  text-sm px-2">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
                        <div className="flex items-center gap-4">
                            <span className="bg-gray-100 px-6 py-2 rounded-xl text-xs font-medium">
                                Hotline 24/7
                            </span>
                            <span className="font-semibold">(025) 3886 25 16</span>
                        </div>

                        <div className="flex items-center gap-6 font-semibold">
                            <span>Sell on Swoo</span>
                            <span>Order Tracking</span>

                            <div className="flex items-center gap-1 cursor-pointer">
                                USD <FiChevronDown size={14} />
                            </div>

                            <div className="flex items-center gap-1 cursor-pointer">
                                Eng <FiChevronDown size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Main Header  */}
                <div className="max-w-7xl mx-auto px-7 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                            <Image
                                src="/logo.png"
                                alt="Swoo Tech Mart Logo"
                                width={40}
                                height={40}
                                className="object-center px-2 mt-2"
                                priority
                            />
                        </div>
                        <span className="font-bold leading-tight">
                            SWOO<br />TECH MART
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer">
                            Homes <FiChevronDown size={14} />
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                            Pages <FiChevronDown size={14} />
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                            Products <FiChevronDown size={14} />
                        </div>
                        <span className="cursor-pointer">Contact</span>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                            <p className="text-xs text-gray-500">WELCOME</p>
                            <p className="font-semibold text-sm">LOG IN / REGISTER</p>
                        </div>

                        <div className="relative flex items-center gap-2 cursor-pointer">
                            <FiShoppingCart size={22} />
                            <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                5
                            </span>
                            <span className="hidden md:block font-semibold">$1,689.00</span>
                        </div>

                        {/* Mobile Menu */}
                        <button className="lg:hidden">
                            <FiMenu size={22} />
                        </button>
                    </div>
                </div>

                {/*  Search Bar  */}
                <div className="bg-teal-500">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-evenly">

                        <div className="flex w-[60%] bg-white rounded-full overflow-hidden">
                            <button className="px-4 text-sm font-medium flex items-center gap-1">
                                All Categories <FiChevronDown size={14} />
                            </button>

                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="flex-1 px-4 py-2 outline-none text-sm"
                            />

                            <button className="px-5 text-gray-600">
                                <FiSearch size={20} />
                            </button>
                        </div>

                        {/* Info Bar */}
                        <div className="hidden lg:flex items-center gap-10 text-white text-sm font-medium">
                            <span>FREE SHIPPING OVER $199</span>
                            <span>30 DAYS MONEY BACK</span>
                            <span>100% SECURE PAYMENT</span>
                        </div>
                    </div>
                </div>

            </header>
        </>
    )
}
