"use client";

export default function ProductForm() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Add New Product
        </h1>
        <p className="text-gray-500 mt-1">
          Fill in the product details below
        </p>
      </div>

      <form className="space-y-6">

        {/* 🔹 Basic Info */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Product Name (full width feel) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg 
        focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Slug
              </label>
              <input
                type="text"
                placeholder="product-slug"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg 
        bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <select className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option>Select Category</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Brand
              </label>
              <select className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option>Select Brand</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Color
              </label>
              <select className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option>Select Color</option>
              </select>
            </div>

          </div>

          {/* Descriptions */}
          <div className="mt-6 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Short Description
              </label>
              <textarea
                rows="2"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Long Description
              </label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none"
              ></textarea>
            </div>

          </div>
        </div>

        {/* 🔹 Pricing */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Pricing</h2>

          <div className="grid grid-cols-3 gap-4">

            <div>
              <label className="block text-sm mb-1">Original Price</label>
              <input type="number" className="w-full border px-3 py-2 rounded-md" />
            </div>

            <div>
              <label className="block text-sm mb-1">Final Price</label>
              <input type="number" className="w-full border px-3 py-2 rounded-md" />
            </div>

            <div>
              <label className="block text-sm mb-1">Discount (%)</label>
              <input type="number" className="w-full border px-3 py-2 rounded-md" />
            </div>

          </div>
        </div>

        {/* 🔹 Images */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Images</h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="border-dashed border-2 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
              <p className="text-sm text-gray-500">Upload Thumbnail</p>
              <input type="file" className="hidden" />
            </div>

            <div className="border-dashed border-2 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
              <p className="text-sm text-gray-500">Upload Gallery Images</p>
              <input type="file" multiple className="hidden" />
            </div>

          </div>
        </div>


        {/* 🔹 SEO */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">SEO</h2>

          <div>
            <label className="block text-sm mb-1">Page Title</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* 🔹 Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Save Product
          </button>
        </div>

      </form>
    </div>
  );
}