const categoryRouter = require("express").Router()
const { create, read, statusupdateByID, getByID, deleteByID } = require("../controllers/CategoryController")
const fileUploader = require("express-fileupload")

categoryRouter.post("/create", fileUploader({ createParentPath: true }), create)
categoryRouter.get("/", read)
categoryRouter.patch("/status-update/:id", statusupdateByID)
categoryRouter.get("/:id", getByID)
categoryRouter.delete("/delete/:id", deleteByID)

module.exports = categoryRouter;