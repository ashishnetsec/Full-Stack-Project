const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required"],
            unique: true,
            trim: true,
            minlength: [3, "Brand name must be at least 3 characters long"],
            maxlength: [50, "Brand name cannot exceed 50 characters"]
        },

        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        image: {
            type: String,
            default: null,
        },

        status: {
            type: Boolean,
            default: true,
        },

        is_Popular: {
            type: Boolean,
            default: false,
        },

        is_Top: {
            type: Boolean,
            default: false,
        },

        is_Home: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


const BrandModel = mongoose.model("brand", BrandSchema)
module.exports = BrandModel;