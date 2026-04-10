const CategoriesModel = require("../models/CategoryModel");
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError, sendOk } = require("../utils/response")


const create = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const image = req.files.image;
        
        if (!name || !slug || !image) return sendBadRequest(res)
        const destination = `./public/category/${image.name}`
        image.mv(
            destination,
            async (err) => {
            if (err) return sendServerError(res, "Unable to Upload File")
            const category = await CategoriesModel.findOne({ name })
            if (category) return sendConflict(res, "Category Already Exist")
            await CategoriesModel.create({ name, slug, image: image.name });
            return sendCreated(res)
        })
    } catch (error) {
        sendServerError(res, error)
    }
}

const read = async (req, res) => {
    try {
        // console.log(req.body)
        const category = await CategoriesModel.find();
        const total = await CategoriesModel.find().countDocuments();
        if (category) return sendSuccess(res, "Category Data Fetched Successfully", category, {
            total,
            imageBaseURL : "http://localhost:5000/category/"
        })
    } catch (error) {
        // console.log(error)
        sendServerError(res, error)
    }
}

const getByID = async (req, res) => {
    try {

        const id = req.params.id;
        const category = await CategoriesModel.findById(id)

        if (category) sendSuccess(res, "Category Fetched via ID", category)

    } catch (error) {
        sendServerError(res)
    }
}

const statusupdateByID = async (req, res) => {

    try {
        const id = req.params.id
        const { field } = req.body


        const status = await CategoriesModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await CategoriesModel.findByIdAndUpdate(id, {
                [field]: !status[field]
            })
            sendOk(res, `${field} Upadated Successfully`)
        }



    } catch (error) {
        sendServerError(res)
    }
}


const deleteByID = async (req, res) => {
    try {

        const id = req.params.id
        const status = await CategoriesModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await CategoriesModel.findByIdAndDelete(id)
            sendSuccess(res, `Deleted Successfully`, status)
        }

    } catch (error) {
        sendServerError(res)
    }

}


module.exports = { create, read, statusupdateByID, getByID, deleteByID }