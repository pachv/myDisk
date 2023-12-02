require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const log = require("./log/log")

const authRouter = require("./routes/authRouter")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/auth",authRouter)

const startApp = async () => {
    try {

        await mongoose.connect(process.env.db_url)
        log.Info("connected to bd successfully")

        app.listen(process.env.port, () => {
            log.Info(`server started on port ${process.env.port}`);
        })
        
    } catch (e) {
        console.log(e);
    }
}

startApp()