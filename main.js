const config = require('config');
const express = require('express');
const sequelize = require('./config/db')
const indexRoute = require("./routes");
const cookieParser = require('cookie-parser');
const PORT = config.get("PORT")

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use("/api", indexRoute)

async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => { 
            console.log(`Server running at port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()