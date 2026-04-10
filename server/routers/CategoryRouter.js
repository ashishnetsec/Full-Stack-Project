const categoryRouter = require("express").Router()
const { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update } = require("../controllers/CategoryController")
const fileUploader = require("express-fileupload")

categoryRouter.post("/create", fileUploader({ createParentPath: true }), create)
categoryRouter.get("/", read)
categoryRouter.get("/:slug", readbySlug)
categoryRouter.patch("/status-update/:id", statusupdateByID)
categoryRouter.get("/:id", getByID)
categoryRouter.delete("/delete/:id", deleteByID)
categoryRouter.put("/update/:slug", fileUploader({ createParentPath: true }), update)

module.exports = categoryRouter;