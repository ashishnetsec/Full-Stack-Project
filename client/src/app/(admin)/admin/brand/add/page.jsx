"use client";

import React, { useRef, useState, useEffect } from "react"; // ✅ added useEffect
import { client, notify } from "@/utils/helper";
import { getCategory } from "@/api/api-call";
import Select from 'react-select'

export default function page() {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const slugRef = useRef();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [categories, setCategories] = useState([])
  const [selCategories, setselCategories] = useState([])


  function categorySelect(cat){
    const selItem = cat.map((cat)=>cat.value)
    setselCategories(selItem)
    // console.log(selCategories)
  }

  function createSlug() {
    const brandSlug = nameRef.current.value;
    const generatedSlug = brandSlug
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
    payload.append("categoryId", JSON.stringify(selCategories));

    if (imageFile) {
      payload.append("image", imageFile);
    }

    setLoading(true);

    client
      .post("brand/create", payload)
      .then((res) => {
        notify(res.data.message, res.data.success);

        if (res.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          setselCategories([])
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

  const fetchCategories = async () => {

    try {

      const { res } = await getCategory();
      setCategories(res.data)


    } catch (error) {
      console.log(error)
      setCategories([])
    }

  }


  useEffect(() => {
    fetchCategories()
  }, [])


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
          Create New Brand
        </h1>
        <p className="text-gray-500 mt-1">
          Add brand details and configure visibility settings
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
                Brand Name
              </label>
              <input
                type="text"
                ref={nameRef}
                onChange={createSlug}
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
                ref={slugRef}
                readOnly
                placeholder="slug-name"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              />
            </div>


          </div>


          {/* Add categories Input */}
          <div className="grid grid-cols-1 gap-6 my-4">

            {/* Name */}
            <div className="bg-white mt-3 p-6 rounded-2xl shadow-sm border">
              <label className="text-sm font-medium mb-1 block">
                Category Name
              </label>
              <Select
                closeMenuOnSelect={false}
                onChange={categorySelect}
                className="border rounded focus:ring-2 focus:ring-black outline-none"
                isMulti
                options={categories.map((cat) => (
                  { value: cat._id, label: cat.name }
                ))} />
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