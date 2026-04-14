"use client";

import React, { useEffect, useState, use } from "react";
import { client, notify } from "@/utils/helper";
import { getColorbySlug } from "@/api/api-call";
import { useRouter } from "next/navigation";

export default function page({ params }) {
    const router = useRouter();
    const { slug } = use(params); // ✅ same as category

    const [loading, setLoading] = useState(false);
    const [fetchloading, setFetchLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    });

    const [color, setColor] = useState("#000000");

    // 🔥 Fetch Color Data
    async function fetchColor() {
        try {
            setFetchLoading(true);

            const { res } = await getColorbySlug(slug);
            const data = res.data;

            setFormData({
                name: data.name,
                slug: data.slug,
            });

            setColor(data.color_code || "#000000");
        } catch (error) {
            console.log(error);
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        fetchColor();
    }, []);

    // 🔥 Handle Name Change (Slug Auto Update)
    const handleNameChange = (e) => {
        const value = e.target.value;

        setFormData({
            name: value,
            slug: value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, ""),
        });
    };

    // 🔥 Submit
    const submitHandler = (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            slug: formData.slug,
            color_code: color,
        };

        setLoading(true);

        client
            .put(`color/update/${slug}`, payload)
            .then((res) => {
                notify(res.data.message, res.data.success);

                if (res.data.success) {
                    router.push("/admin/color"); // ✅ prevents double notify
                }
            })
            .catch(() => {
                notify("internal server error", false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Edit Color
                </h1>
                <p className="text-gray-500 mt-1">
                    Update color details
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
                                Color Name
                            </label>

                            <input
                                type="text"
                                value={formData.name}
                                onChange={handleNameChange}
                                placeholder="Enter Color Name"
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
                                value={formData.slug}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-gray-50 outline-none"
                            />
                        </div>

                    </div>

                    {/* 🔹 Color Picker */}
                    <h2 className="text-lg font-semibold my-4 mt-8">
                        Select Your Color
                    </h2>

                    <div className="p-6 border rounded-2xl">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                            {/* LEFT */}
                            <div className="flex flex-col gap-4">

                                <div className="flex items-center gap-4">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-16 h-16 p-1 border rounded-xl cursor-pointer"
                                    />

                                    <div>
                                        <p className="text-sm text-gray-500">Hex Code</p>
                                        <p className="font-semibold text-lg">{color}</p>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                                />

                                {/* Presets */}
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Quick Select
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "#000000", "#ffffff", "#ef4444", "#3b82f6",
                                            "#22c55e", "#eab308", "#a855f7", "#f97316"
                                        ].map((preset) => (
                                            <button
                                                key={preset}
                                                type="button"
                                                onClick={() => setColor(preset)}
                                                className="w-8 h-8 rounded-full border hover:scale-110 transition"
                                                style={{ backgroundColor: preset }}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT Preview */}
                            <div className="flex flex-col items-center gap-3">
                                <div
                                    className="w-full h-40 rounded-xl border shadow-inner"
                                    style={{ backgroundColor: color }}
                                ></div>

                                <p className="text-sm text-gray-500">
                                    Live Preview
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* 🔹 Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                    >
                        {loading ? "Updating Color..." : "Update Color"}
                    </button>
                </div>

            </form>
        </div>
    );
}