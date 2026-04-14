const mongoose = require("mongoose")

const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required"],
            unique: true,
            trim: true,
            minlength: [2, "Brand name must be at least 2 characters long"],
            maxlength: [50, "Brand name cannot exceed 50 characters"]
        },

        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        status: {
            type: Boolean,
            default: true,
        },

        color_code: {
            type: String,
            unique: true,
            require: true
        }
    },
    {
        timestamps: true,
    }
);


const ColorModel = mongoose.model("color", ColorSchema)
module.exports = ColorModel;