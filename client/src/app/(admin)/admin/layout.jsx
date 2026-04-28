import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f5f7fb] text-gray-800">

        {/* Toast */}
        <ToastContainer theme="light" />

        {/* 🔥 Floating Sidebar */}
        <AdminSidebar />

        {/* 🔹 Main Area */}
        <div className="min-h-screen flex flex-col">

          {/* Header */}
          <AdminHeader />

          {/* Content */}
          <main className="flex-1 px-10 py-6 pl-28">

            {/* 🔥 Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {children}
            </div>

          </main>

        </div>

      </body>
    </html>
  );
}