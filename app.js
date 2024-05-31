const express = require("express")
const items = require("./fakeDb")

app = express()

app.use(express.json())

app.get("/items", function(request,response) {
    return response.json(items)
})

app.post("/items", function(request,response) {
    if (request.body && request.body.name && request.body.price) {
        const { name, price } = request.body
        const newItem = { name, price } // extract these and only these from request.body
        items.push(newItem)
        return response.json({added : newItem})
    }
    else {
        return response.status(400).json({message : "item needs a name and a price"})
    }
})


const port = 3000;
app.listen(port, function() {
    console.log(`App running on port ${port}`)
})