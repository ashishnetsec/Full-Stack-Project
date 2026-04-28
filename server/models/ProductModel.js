const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        short_description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 200,
        },

        long_description: {
            type: String,
            required: true,
            trim: true,
        },

        original_price: {
            type: Number,
            required: true,
            min: 0,
        },

        final_price: {
            type: Number,
            required: true,
            min: 0,
        },

        discount_percentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },

        colorId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color",
                required: true,
            }
        ],

        thumbnail: {
            type: String,
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        stock: {
            type: Boolean,
            default: true,
        },

        top_selling: {
            type: Boolean,
            default: false,
        },

        status: {
            type: Boolean,
            default: true,
        },

        page_title: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


const ProductModel = mongoose.model("product", ProductSchema)
module.exports = ProductModel;