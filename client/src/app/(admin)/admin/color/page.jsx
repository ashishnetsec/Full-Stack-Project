import React from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { getColor } from "@/api/api-call";
import StatusBtn from "@/components/Admin/StatusBtn";
import DeleteBtn from "@/components/Admin/DeleteBtn";


export default async function colorPage() {

    const statusName = ["status"]
    const { res } = await getColor()
    let color = res.data
    let meta = res.meta
    return (
        <div>
            {/* 🔹 Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Color Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage color, images and SEO-friendly slugs
                    </p>
                </div>
                <Link href={"/admin/color/add"}>
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition ">
                        <FiPlus />
                        Add Color
                    </button>
                </Link>

            </div>

            {/* 🔹 Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">

                    {/* Header */}
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-3">Color</th>
                            <th className="px-6 py-3">Color Name</th>
                            <th className="px-6 py-3">Slug</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {color.map((cat) => (

                            <tr key={cat._id} className="border-t hover:bg-gray-50 transition">

                                {/* Image */}
                                <td className="px-6 py-4">
                                    <div
                                        className="w-10 h-10 rounded-md object-cover border"
                                        style={{ backgroundColor: cat.color_code }}
                                    ></div>
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
                                            <StatusBtn cat={cat} data={data} path="color" />
                                        </td>
                                    })
                                }

                                {/* Actions */}
                                <td className="px-6 py-4 flex justify-center gap-3">

                                    <Link href={`/admin/color/edit/${cat.slug}`}>
                                        <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                                            <FiEdit />
                                            Edit
                                        </button>
                                    </Link>


                                    <DeleteBtn cat={cat} value="color" />

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div >
        </div >
    );
}

