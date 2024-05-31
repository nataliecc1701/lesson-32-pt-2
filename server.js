const express = require("express")
const router = require("./router")
const ExpressError = require("./error")

const app = express()

app.use("/items", router)

/**
 * 
 * ERROR HANDLERS
 * 
*/

// 404 handler
app.use(function(req, res, next) {
    const notFoundError = new ExpressError("Not found", 404);
    return next(notFoundError)
})

// general purpose error handler
app.use(function(err, req, res, next) {
    const status = err.status || 500
    const message = err.message
    
    res.status(status).json({
        error : {message, status}
    })
})


/**
 * 
 * LISTENER
 * 
 */

const port = 3000;
app.listen(port, function() {
    console.log(`App running on port ${port}`)
})