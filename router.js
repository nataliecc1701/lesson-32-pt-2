const express = require("express")
const items = require("./fakeDb")
const ExpressError = require("./error")

router = express()

router.use(express.json())

/**
 * 
 * ROUTES
 * 
 */

router.get("/items", function(request,response) {
    return response.json({items})
})

router.post("/items", function(request,response) {
    if (request.body && request.body.name && request.body.price) {
        const { name, price } = request.body
        const newItem = { name, price } // extract these and only these from request.body
        items.push(newItem)
        return response.status(201).json({added : newItem})
    }
    else {
        return next(new ExpressError("Item needs a name and a price", 400))
    }
})

router.get("/items/:name", function(request, response) {
    const item = items.find(item => item.name === request.params.name)
    if (!item) throw new ExpressError("Not found", 404)
        
    return response.json(item)
})

router.patch("/items/:name", function(request, response) {
    const item = items.find(item => item.name === request.params.name)
    if (!item) {throw new ExpressError("Not found", 404)}
    
    
    if (request.body.name) {item.name = request.body.name}
    if (request.body.price) {item.price = request.body.price}
    return response.json({updated : item})
})

router.delete("/items/:name", function(request, response) {
    const item = items.find(item => item.name === request.params.name)
    const idx = items.indexOf(item)
    if (!item) {throw new ExpressError("Not found", 404)}
    
    items.splice(idx,1)
    return response.json({message: "Deleted"})
})

/**
 * 
 * ERROR HANDLERS
 * 
*/

// 404 handler
router.use(function(req, res, next) {
    const notFoundError = new ExpressError("Not found", 404);
    return next(notFoundError)
})

// general purpose error handler
router.use(function(err, req, res, next) {
    const status = err.status || 500
    const message = err.message
    
    res.status(status).json({
        error : {message, status}
    })
})

module.exports = router