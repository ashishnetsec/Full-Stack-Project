const BrandModel = require("../models/BrandModel");
const { createUniqueName } = require("../utils/helper");
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError, sendOk } = require("../utils/response")


const create = async (req, res) => {
    try {
        const { name, slug, categoryId } = req.body;
        const image = req.files.image;

        if (!name || !slug || !image || !categoryId ) return sendBadRequest(res)
        const brand = await BrandModel.findOne({ name })
        if (brand) return sendConflict(res, "Brand Already Exist")
        const img_name = createUniqueName(image.name)
        const destination = `./public/brand/${img_name}`
        image.mv(
            destination,
            async (err) => {
                if (err) return sendServerError(res, "Unable to Upload File")
                await BrandModel.create({ name, slug, image: img_name, categoryId: JSON.parse(categoryId) });
                return sendCreated(res)
            })
    } catch (error) {
        sendServerError(res, error)
    }
}

const read = async (req, res) => {
    try {
        // console.log(req.body)
        const brand = await BrandModel.find().populate("categoryId");
        const total = await BrandModel.find().countDocuments();
        if (brand) return sendSuccess(res, "Brand Data Fetched Successfully", brand, {
            total,
            imageBaseURL: "http://localhost:5000/brand/"
        })
    } catch (error) {
        // console.log(error)
        sendServerError(res, error)
    }
}

const getByID = async (req, res) => {
    try {

        const id = req.params.id;
        const brand = await BrandModel.findById(id);

        if (brand) return sendSuccess(res, "Brand Data Fetched Successfully", brand, {
            imageBaseURL: "http://localhost:5000/brand/"
        })

    } catch (error) {
        sendServerError(res)
    }
}

const readbySlug = async (req, res) => {
    try {

        const slug = req.params.slug;
        const brand = await BrandModel.findOne({ slug });

        if (brand) return sendSuccess(res, "brand Data Fetched Successfully", brand, {
            imageBaseURL: "http://localhost:5000/brand/"
        })

    } catch (error) {
        sendServerError(res)
    }
}

const statusupdateByID = async (req, res) => {

    try {
        const id = req.params.id
        const { field } = req.body


        const status = await BrandModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await BrandModel.findByIdAndUpdate(id, {
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
        const status = await BrandModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await BrandModel.findByIdAndDelete(id)
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

        const brand = await BrandModel.findOne({ slug });
        if (!brand) return sendNotFound(res)

        const object = {}

        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        if (image) {
            const brand_image = createUniqueName(image.name);
            const destination = "./public/brand/" + brand_image;

            await image.mv(destination);
            object.image = brand_image;


        }

        await BrandModel.updateOne(
            { _id: brand._id },
            { $set: object }
        )

        return sendSuccess(res, "Brand Updated Successfully");


    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
}


module.exports = { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update }