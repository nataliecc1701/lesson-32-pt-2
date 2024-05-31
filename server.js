const app = require("./router")

/**
 * 
 * LISTENER
 * 
 */

const port = 3000;
app.listen(port, function() {
    console.log(`App running on port ${port}`)
})