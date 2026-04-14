"use client";

import React from "react";
import {
  FiShoppingCart,
  FiUsers,
  FiBox,
  FiTruck,
  FiAlertCircle,
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Seller Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Monitor your store performance and operations
        </p>
      </div>

      {/* 🔹 KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Total Orders" value="1,245" icon={<FiShoppingCart />} />
        <KPI title="Pending Orders" value="32" icon={<FiTruck />} />
        <KPI title="Customers" value="5,230" icon={<FiUsers />} />
        <KPI title="Products" value="842" icon={<FiBox />} />
      </div>

      {/* 🔹 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales Chart */}
        <div className="col-span-2 bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
              <FiTrendingUp className="text-gray-400" />
              Sales Overview
            </h2>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>

          <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Chart Area 📈
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-700 mb-4">
            <FiBarChart2 className="text-gray-400" />
            Orders Breakdown
          </h2>

          <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Pie Chart 🍩
          </div>
        </div>

      </div>

      {/* 🔹 Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Orders Summary */}
        <Card title="Orders Summary">
          <Summary label="Pending" value="32" color="yellow" />
          <Summary label="Shipped" value="210" color="blue" />
          <Summary label="Delivered" value="980" color="green" />
          <Summary label="Cancelled" value="23" color="red" />
        </Card>

        {/* Shipping */}
        <Card title="Shipping Status">
          <Summary label="In Transit" value="120" color="blue" />
          <Summary label="Out for Delivery" value="45" color="yellow" />
          <Summary label="Delivered Today" value="60" color="green" />
        </Card>

        {/* Alerts */}
        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-700 mb-4">
            <FiAlertCircle className="text-red-400" />
            Alerts
          </h2>

          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black transition cursor-pointer">
              • 5 products are out of stock
            </li>
            <li className="hover:text-black transition cursor-pointer">
              • 3 orders delayed
            </li>
            <li className="hover:text-black transition cursor-pointer">
              • Low inventory on 2 items
            </li>
          </ul>
        </div>

      </div>

      {/* 🔹 Recent Orders */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">

        <div className="p-5 border-b">
          <h2 className="text-sm font-semibold text-gray-700">
            Recent Orders
          </h2>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            <OrderRow id="#1001" name="Ashish" date="Today" amount="₹1200" status="Delivered" />
            <OrderRow id="#1002" name="Rahul" date="Yesterday" amount="₹850" status="Pending" />
            <OrderRow id="#1003" name="Ankit" date="2 days ago" amount="₹1500" status="Cancelled" />
          </tbody>
        </table>

      </div>

    </div>
  );
}

/* 🔹 KPI */
const KPI = ({ title, value, icon }) => {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center justify-between shadow-sm 
    hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">

      <div>
        <p className="text-xs text-gray-500 tracking-wide">{title}</p>
        <h2 className="text-lg font-semibold text-gray-800 mt-1">
          {value}
        </h2>
      </div>

      <div className="text-gray-400 text-xl">{icon}</div>
    </div>
  );
};

/* 🔹 Card Wrapper */
const Card = ({ title, children }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

/* 🔹 Summary */
const Summary = ({ label, value, color }) => {
  const colors = {
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    blue: "text-blue-600",
  };

  return (
    <div className="flex justify-between px-2 py-2 rounded-md 
    hover:bg-gray-50 transition cursor-pointer">
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${colors[color]}`}>
        {value}
      </span>
    </div>
  );
};

/* 🔹 Order Row */
const OrderRow = ({ id, name, date, amount, status }) => {
  const getStatus = () => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition duration-150">
      <td className="px-5 py-3 font-medium text-gray-800">{id}</td>
      <td className="px-5 py-3 text-gray-600">{name}</td>
      <td className="px-5 py-3 text-gray-500">{date}</td>
      <td className="px-5 py-3 font-medium text-gray-700">{amount}</td>
      <td className="px-5 py-3">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatus()}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};