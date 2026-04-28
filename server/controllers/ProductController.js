const { json } = require("express");
const ProductModel = require("../models/ProductModel");
const { createUniqueName } = require("../utils/helper");
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError, sendOk } = require("../utils/response")


const create = async (req, res) => {
    try {
        const { name, slug, categoryId, brandId, colorId } = req.body;
        const image = req.files.image;

        if (!name || !slug || !image || !categoryId) return sendBadRequest(res)
        const product = await ProductModel.findOne({ name })
        if (product) return sendConflict(res, "Product Already Exist")
        const img_name = createUniqueName(image.name)
        const destination = `./public/product/${img_name}`
        image.mv(
            destination,
            async (err) => {
                if (err) return sendServerError(res, "Unable to Upload File")
                await ProductModel.create({ name, slug, image: img_name, categoryId: JSON.parse(categoryId), brandId: JSON.parse(brandId), colorId: JSON.parse(colorId) });
                return sendCreated(res)
            })
    } catch (error) {
        sendServerError(res, error)
    }
}

const read = async (req, res) => {
    try {
        // console.log(req.body)
        const product = await ProductModel.find().populate("categoryId").populate("brandId").populate("colorId");
        const total = await ProductModel.find().countDocuments();
        if (product) return sendSuccess(res, "product Data Fetched Successfully", product, {
            total,
            imageBaseURL: "http://localhost:5000/product/"
        })
    } catch (error) {
        // console.log(error)
        sendServerError(res, error)
    }
}

const getByID = async (req, res) => {
    try {

        const id = req.params.id;
        const product = await ProductModel.findById(id);

        if (product) return sendSuccess(res, "product Data Fetched Successfully", product, {
            imageBaseURL: "http://localhost:5000/product/"
        })

    } catch (error) {
        sendServerError(res)
    }
}

const readbySlug = async (req, res) => {
    try {

        const slug = req.params.slug;
        const product = await ProductModel.findOne({ slug });

        if (product) return sendSuccess(res, "product Data Fetched Successfully", product, {
            imageBaseURL: "http://localhost:5000/product/"
        })

    } catch (error) {
        sendServerError(res)
    }
}

const statusupdateByID = async (req, res) => {

    try {
        const id = req.params.id
        const { field } = req.body


        const status = await ProductModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await ProductModel.findByIdAndUpdate(id, {
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
        const status = await ProductModel.findById(id)
        // console.log(status)
        if (!status) {
            return sendNotFound(res)
        } else {
            const statusUpdate = await ProductModel.findByIdAndDelete(id)
            sendSuccess(res, `Deleted Successfully`, status)
        }

    } catch (error) {
        sendServerError(res)
    }

}


const update = async (req, res) => {
    try {
        const image = req.files?.image || null;
        const slug = req.params?.slug;

        const product = await ProductModel.findOne({ slug });
        if (!product) return sendNotFound(res);

        const object = {};

        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        const fields = ["categoryId", "brandId", "colorId"];
        fields.forEach((field) => {
            if (req.body[field]) {
                object[field] = JSON.parse(req.body[field]);
            }
        });

        if (image) {
            const product_image = createUniqueName(image.name);
            const destination = "./public/product/" + product_image;

            await image.mv(destination);
            object.thumbnail = product_image; // ✅ also fixed key name
        }

        await ProductModel.updateOne(
            { _id: product._id },
            { $set: object }
        );

        return sendSuccess(res, "Product Updated Successfully");

    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
};


module.exports = { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update }