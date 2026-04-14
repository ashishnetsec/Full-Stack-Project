const ColorRouter = require("express").Router()
const { create, read, statusupdateByID, getByID, deleteByID, readbySlug, update } = require("../controllers/ColorController")
// const fileUploader = require("express-fileupload")

ColorRouter.post("/create", create)
ColorRouter.get("/", read)
ColorRouter.get("/:slug", readbySlug)
ColorRouter.patch("/status-update/:id", statusupdateByID)
ColorRouter.get("/:id", getByID)
ColorRouter.delete("/delete/:id", deleteByID)
ColorRouter.put("/update/:slug", update)

module.exports = ColorRouter;