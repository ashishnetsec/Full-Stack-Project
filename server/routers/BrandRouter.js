const brandRouter = require("express").Router()
const { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update } = require("../controllers/BrandController")
const fileUploader = require("express-fileupload")

brandRouter.post("/create", fileUploader({ createParentPath: true }), create)
brandRouter.get("/", read)
brandRouter.get("/:slug", readbySlug)
brandRouter.patch("/status-update/:id", statusupdateByID)
brandRouter.get("/:id", getByID)
brandRouter.delete("/delete/:id", deleteByID)
brandRouter.put("/update/:slug", fileUploader({ createParentPath: true }), update)

module.exports = brandRouter;