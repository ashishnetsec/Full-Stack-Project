import React from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Link from "next/link";
// import { getBrand } from "@/api/api-call";
import StatusBtn from "@/components/Admin/StatusBtn";
import DeleteBtn from "@/components/Admin/DeleteBtn";
import { getBrand } from "@/api/api-call";








export default async function brandPage() {





    const statusName = ["status", "is_Home", "is_Top", "is_Popular"]
    const { res } = await getBrand()
    let brand = res.data
    let meta = res.meta
    return (
        <div>
            {/* 🔹 Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Brand Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage brand, images and SEO-friendly slugs
                    </p>
                </div>
                <Link href={"/admin/brand/add"}>
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition ">
                        <FiPlus />
                        Add Brand
                    </button>
                </Link>

            </div>

            {/* 🔹 Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">

                    {/* Header */}
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Brand Name</th>
                            <th className="px-6 py-3">Slug</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Home</th>
                            <th className="px-6 py-3">Top</th>
                            <th className="px-6 py-3">Popular</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {brand.map((cat) => (

                            <tr key={cat._id} className="border-t hover:bg-gray-50 transition">

                                {/* Image */}
                                <td className="px-6 py-4">
                                    <img
                                        src={meta.imageBaseURL + cat.image}
                                        alt={cat.name}
                                        className="w-10 h-10 rounded-md object-cover border"
                                    />
                                </td>

                                {/* Name */}
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {cat.name}
                                </td>

                                {/* Slug */}
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {cat.slug}
                                </td>

                                {/* Status */}

                                {
                                    statusName.map((data, index) => {
                                        // console.log(data)
                                        return <td key={index} className="px-6 py-4 ">
                                            <StatusBtn cat={cat} data={data} path="brand" />
                                        </td>
                                    })
                                }

                                {/* Actions */}
                                <td className="px-6 py-4 flex justify-center gap-3">
                                    
                                    <Link href={`/admin/brand/edit/${cat.slug}`}>
                                        <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                                            <FiEdit />
                                            Edit
                                        </button>
                                    </Link>


                                    <DeleteBtn cat={cat} value = "brand"/>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

