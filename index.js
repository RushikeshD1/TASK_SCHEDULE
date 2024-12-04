const cron = require('node-cron')
const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require("./routes/user")
const mongoose = require("mongoose")
const path = require('path')

dotenv.config()

const app = express()
const port = process.env.PORT || 10000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))


app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DataBase connected successfully"))
    .catch((e) => console.log("something went wrong", e))

app.use('/', userRoutes)

app.listen(port, () => console.log(`Server Running at port ${port}`))