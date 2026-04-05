const categoryRouter = require("express").Router()
const { create, read, statusupdateByID, getByID, deleteByID } = require("../controllers/CategoryController")

categoryRouter.post("/create", create)
categoryRouter.get("/", read)
categoryRouter.patch("/status-update/:id", statusupdateByID)
categoryRouter.get("/:id", getByID)
categoryRouter.delete("/delete/:id", deleteByID)



module.exports = categoryRouter;