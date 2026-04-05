const mongoose = require("mongoose")

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    slug:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    image: {
        type: String,
        default: null,
    },
    status:{
        type:Boolean,
        default: true,
    },
    is_Home: {
        type: Boolean,
        default: false
    },
    is_Top: {
        type: Boolean,
        default: false
    },
    is_Popular: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)


const CategoriesModel = mongoose.model("categories", CategoriesSchema)
module.exports = CategoriesModel;