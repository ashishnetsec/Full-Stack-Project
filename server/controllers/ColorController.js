const ColorModel = require("../models/ColorModel");
const { createUniqueName } = require("../utils/helper");
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError, sendOk } = require("../utils/response")


const create = async (req, res) => {
    try {
        const { name, slug, color_code } = req.body;

        if (!name || !slug || !color_code) return sendBadRequest(res)
        const color = await ColorModel.findOne({ name })
        if (color) return sendConflict(res, "Color Already Exist")
        // const img_name = createUniqueName(image.name)
        // const destination = `./public/color/${img_name}`
        // if (err) return sendServerError(res, "Unable to Upload File")
        await ColorModel.create({ name, slug, color_code});
        return sendCreated(res)

    } catch (error) {
        sendServerError(res, error)
    }
}

const read = async (req, res) => {
    try {
        // console.log(req.body)
        const color = await ColorModel.find();
        const total = await ColorModel.find().countDocuments();
        if (color) return sendSuccess(res, "Color Data Fetched Successfully", color, {
            total
        })
    } catch (error) {
        console.log(error)
        sendServerError(res, error)
    }
}

const getByID = async (req, res) => {
    try {

        const id = req.params.id;
        const color = await ColorModel.findById(id);

        if (color) return sendSuccess(res, "color Data Fetched Successfully", color)

    } catch (error) {
        sendServerError(res)
    }
}

const readbySlug = async (req, res) => {
    try {

        const slug = req.params.slug;
        const color = await ColorModel.findOne({ slug });

        if (color) return sendSuccess(res, "color Data Fetched Successfully", color)

    } catch (error) {
        sendServerError(res)
    }
}

const statusupdateByID = async (req, res) => {

    try {
        const id = req.params.id
        const { field } = req.body


        const status = await ColorModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await ColorModel.findByIdAndUpdate(id, {
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
        const status = await ColorModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await ColorModel.findByIdAndDelete(id)
            sendSuccess(res, `Deleted Successfully`, status)
        }

    } catch (error) {
        sendServerError(res)
    }

}


const update = async (req, res) => {
    try {

        // const image = req.files?.image || null;
        const slug = req.params.slug;

        const color = await ColorModel.findOne({ slug });
        if (!color) return sendNotFound(res)

        const object = {}

        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
            object.color_code = req.body.color_code;
        }

        await ColorModel.updateOne(
            { _id: color._id },
            { $set: object }
        )

        return sendSuccess(res, "color Updated Successfully");


    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
}


module.exports = { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update }