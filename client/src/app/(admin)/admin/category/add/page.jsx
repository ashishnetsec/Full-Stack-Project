"use client";

import React, { useRef, useState, useEffect } from "react"; // ✅ added useEffect
import { client, notify } from "@/utils/helper";

export default function page() {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const slugRef = useRef();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  function createSlug() {
    const categorySlug = nameRef.current.value;
    const generatedSlug = categorySlug
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    slugRef.current.value = generatedSlug;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file); // store file (for submit)

      const previewURL = URL.createObjectURL(file); // create preview
      setImagePreview(previewURL);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("name", nameRef.current.value);
    payload.append("slug", slugRef.current.value);

    if (imageFile) {
      payload.append("image", imageFile);
    }

    setLoading(true);

    client
      .post("category/create", payload)
      .then((res) => {
        notify(res.data.message, res.data.success);

        if (res.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          setImagePreview(null); 
          setImageFile(null); 
        }
      })
      .catch(() => {
        notify("internal server error", false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create New Category
        </h1>
        <p className="text-gray-500 mt-1">
          Add category details and configure visibility settings
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
                Category Name
              </label>
              <input
                type="text"
                ref={nameRef}
                onChange={createSlug}
                placeholder="Enter Category Name"
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

          {/* 🔹 Image Upload */}
          <div className="bg-white mt-3 p-6 rounded-2xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">
              Upload Category Image
            </h2>

            <label className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50 transition block">

              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm overflow-hidden">

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Preview"
                  )}

                </div>

                <p className="text-gray-500 text-sm">
                  Click to upload image
                </p>
              </div>

              {/* Hidden Input */}
              <input
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange} // ✅ FIX
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
            {loading ? "Saving Category" : "Save Category"}
          </button>
        </div>

      </form>
    </div>
  );
}