"use client";

import React, { useEffect, useState } from "react"; // ✅ FIX: removed useRef
import { client, notify } from "@/utils/helper";
import { use } from "react";
import { getBrandbySlug } from "@/api/api-call";
import SmartLoader from "@/components/Admin/SmartLoader";
import { useRouter } from "next/navigation";

export default function page({ params }) {
    const router = useRouter();
    const { slug } = use(params);

    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchloading, setfetchLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: ""
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);

            const previewURL = URL.createObjectURL(file);
            setImage(previewURL);
        }
    };


    const submitHandler = (e) => {
        e.preventDefault();

        const payload = new FormData();

        payload.append("name", formData.name);
        payload.append("slug", formData.slug);
        if (image) {
            payload.append("image", imageFile);
        }

        setLoading(true);

        client.put(`brand/update/${slug}`, payload)
            .then((res) => {
                notify(res.data.message, res.data.success);

                if (res.data.success) {
                    router.push(`/admin/brand`);
                }
            })
            .catch(() => {
                notify("internal server error", false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    async function getBrand() {
        try {
            setfetchLoading(true);

            const { res } = await getBrandbySlug(slug);

            const data = res.data;
            const meta = res.meta;

            setFormData({
                name: data.name,
                slug: data.slug
            });

            setImage(`${meta?.imageBaseURL}${data.image}`);

        } catch (error) {
            console.log(error);
        } finally {
            setfetchLoading(false);
        }
    }

    useEffect(() => {
        getBrand();
    }, []);

    if (fetchloading) {
        return <SmartLoader />;
    }

    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Edit brand
                </h1>
                <p className="text-gray-500 mt-1">
                    Edit brand details and configure visibility settings
                </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">

                {/* 🔹 Basic Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium mb-1 block">
                                Brand Name
                            </label>

                            <input
                                type="text"
                                value={formData.name} // ✅ FIX
                                onChange={(e) => {
                                    const value = e.target.value;


                                    setFormData({
                                        name: value,
                                        slug: value
                                            .toLowerCase()
                                            .replace(/ /g, "-")
                                            .replace(/[^\w-]+/g, "")
                                    });
                                }}
                                placeholder="Enter Brand Name"
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="text-sm font-medium mb-1 block">
                                Slug
                            </label>

                            <input
                                type="text"
                                value={formData.slug} // ✅ FIX
                                readOnly
                                placeholder="slug-name"
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                    </div>

                    {/* 🔹 Image Upload */}
                    <div className="bg-white mt-3 p-6 rounded-2xl shadow-sm border">
                        <h2 className="text-lg font-semibold mb-4">
                            Upload Brand Image
                        </h2>

                        <label className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50 transition block">

                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">

                                    <img
                                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                                        src={image}
                                        alt=""
                                    />

                                </div>
                                
                                <p className="text-gray-500 text-sm">
                                    Click to Edit image
                                </p>
                                <p className="text-xs text-gray-400">
                                    Preview only. Changes will be saved after submission.
                                </p>
                            </div>

                            <input
                                type="file"
                                name="image"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                {/* 🔹 Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                        disabled={loading}
                    >
                        {loading ? "Saving brand" : "Edit brand"}
                    </button>
                </div>

            </form>
        </div>
    );
}