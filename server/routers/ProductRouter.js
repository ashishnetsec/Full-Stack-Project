const productRouter = require("express").Router()

const fileUploader = require("express-fileupload")
const { read, readbySlug, create, statusupdateByID, getByID, deleteByID, update } = require("../controllers/ProductController")

productRouter.post("/create", fileUploader({ createParentPath: true }), create)
productRouter.get("/", read)
productRouter.get("/:slug", readbySlug)
productRouter.patch("/status-update/:id", statusupdateByID)
productRouter.get("/:id", getByID)
productRouter.delete("/delete/:id", deleteByID)
productRouter.put("/update/:slug", fileUploader({ createParentPath: true }), update)

module.exports = productRouter;