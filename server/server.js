require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json())
app.use(cors("*"))
app.use(express.static("./public"))
app.use("/api/category", require('./routers/CategoryRouter'))
app.use("/api/brand", require('./routers/BrandRouter'))
app.use("/api/color", require('./routers/BrandRouter'))

mongoose.connect(process.env.MONGODB_URL).then(() => {

    
    app.listen(process.env.port, () => {
        console.log("Server Started Successfully")
    })
    console.log("Database Connected Successfully")

}).catch((err) => {
    console.log("Database not connected")
})
