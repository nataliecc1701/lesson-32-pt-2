const express = require("express")
const router = require("./router")
const ExpressError = require("./error")

const app = express()

app.use("/items", router)


/**
 * 
 * LISTENER
 * 
 */

const port = 3000;
app.listen(port, function() {
    console.log(`App running on port ${port}`)
})