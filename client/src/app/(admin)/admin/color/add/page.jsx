"use client";

import React, { useRef, useState, useEffect } from "react";
import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#000000");

  const nameRef = useRef();
  const slugRef = useRef();
  const colorRef = useRef();

  function createSlug() {
    const colorSlug = nameRef.current.value;
    const generatedSlug = colorSlug
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    slugRef.current.value = generatedSlug;
  }


  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      color_code: colorRef.current.value
    }

    setLoading(true);

    client
      .post("color/create", payload)
      .then((res) => {
        notify(res.data.message, res.data.success);

        if (res.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          colorRef.current.value = "";
        }
      })
      .catch(() => {
        notify("internal server error", false);
      })
      .finally(() => {
        setLoading(false);
        router.push("/admin/color")
      });
  };


  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create New color
        </h1>
        <p className="text-gray-500 mt-1">
          Add color details and configure visibility settings
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-6">

        {/* 🔹 Basic Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Color Name
              </label>
              <input
                type="text"
                ref={nameRef}
                onChange={createSlug}
                placeholder="Enter color Name"
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
                ref={slugRef}
                readOnly
                placeholder="slug-name"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

          </div>

          {/* 🔹 Color Picker */}
          <h2 className="text-lg font-semibold my-4 mt-8">
            Select Your Color
          </h2>
          <div className="bg-white mt-3 p-6 rounded-2xl shadow-sm border">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

              {/* LEFT: Picker + Hex */}
              <div className="flex flex-col gap-4">

                {/* Color Picker */}
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={color}
                    ref={colorRef}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-16 p-1 border rounded-xl cursor-pointer"
                  />

                  {/* Hex Code */}
                  <div>
                    <p className="text-sm text-gray-500">Hex Code</p>
                    <p className="font-semibold text-lg">{color}</p>
                  </div>
                </div>

                {/* Manual Input */}
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />

                {/* Preset Colors */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Quick Select</p>
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

              {/* RIGHT: Big Preview */}
              <div className="flex flex-col items-center justify-center gap-3">

                <div
                  className="w-full h-40 rounded-xl border shadow-inner"
                  style={{ backgroundColor: color }}
                ></div>

                <p className="text-sm text-gray-500 text-center">
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
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Saving color" : "Save color"}
          </button>
        </div>

      </form>
    </div>
  );
}