const CategoriesModel = require("../models/CategoryModel");
const { createUniqueName } = require("../utils/helper");
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError, sendOk } = require("../utils/response")


const create = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const image = req.files.image;

        if (!name || !slug || !image) return sendBadRequest(res)
        const category = await CategoriesModel.findOne({ name })
        if (category) return sendConflict(res, "Category Already Exist")
        const img_name = createUniqueName(image.name)
        const destination = `./public/category/${img_name}`
        image.mv(
            destination,
            async (err) => {
                if (err) return sendServerError(res, "Unable to Upload File")
                await CategoriesModel.create({ name, slug, image: img_name });
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
            imageBaseURL: "http://localhost:5000/category/"
        })
    } catch (error) {
        // console.log(error)
        sendServerError(res, error)
    }
}

const getByID = async (req, res) => {
    try {

        const id = req.params.id;
        const category = await CategoriesModel.findById(id);

        if (category) return sendSuccess(res, "Category Data Fetched Successfully", category, {
            imageBaseURL: "http://localhost:5000/category/"
        })

    } catch (error) {
        sendServerError(res)
    }
}

const readbySlug = async (req, res) => {
    try {

        const slug = req.params.slug;
        const category = await CategoriesModel.findOne({ slug });

        if (category) return sendSuccess(res, "Category Data Fetched Successfully", category, {
            imageBaseURL: "http://localhost:5000/category/"
        })

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


const update = async (req, res) => {
    try {

        const image = req.files?.image || null;
        const slug = req.params.slug;

        const category = await CategoriesModel.findOne({ slug });
        if (!category) return sendNotFound(res)

        const object = {}

        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        if (image) {
            const category_image = createUniqueName(image.name);
            const destination = "./public/category/" + category_image;

            await image.mv(destination);
            object.image = category_image;


        }

        await CategoriesModel.updateOne(
            { _id: category._id },
            { $set: object }
        )

        return sendSuccess(res, "Category Updated Successfully");


    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
}


module.exports = { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update }