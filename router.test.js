process.env.NODE_ENV = "test";

const request = require("supertest");

const router = require("./router");
let items = require("./fakeDb");

const mcn = { name: "mochaccino", price: 5.95 }

beforeEach(function() {
    items.push(mcn);
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function(){
    test("Gets a list of items", async function() {
        const resp = await request(router).get("/items");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [mcn]})
    })
})

describe("POST /items", function(){
    test("Adds an item to the list", async function(){
        const vanilla = {name : "vanilla extract", price : 9.99}
        const resp = await request(router)
            .post("/items")
            .send(vanilla);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added: vanilla})
        
        const resp2 = await request(router).get("/items")
        expect(resp2.statusCode).toBe(200)
        expect(resp2.body).toEqual({items: [mcn, vanilla]})
    })
})

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
        const resp = await request(router).get(`/items/${mcn.name}`)
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(mcn)
    })
    test("404s on bad request", async function() {
        const resp = await request(router).get("/items/qwertyuiop")
        expect(resp.statusCode).toBe(404)
    })
})

describe("PATCH /items/:name", function() {
    test("Patches name", async function() {
        const testName = "mocha"
        const resp = await request(router)
            .patch(`/items/${mcn.name}`)
            .send({name : testName})
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated : {name : testName, price: mcn.price}})
        
        const resp2 = await request(router).get(`/items/${testName}`)
        expect(resp2.statusCode).toBe(200)
        expect(resp2.body).toEqual({name : testName, price: mcn.price})
    })
    test("Patches price", async function() {
        const resp = await request(router)
            .patch(`/items/${mcn.name}`)
            .send({price : 6.95})
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated : {name : mcn.name, price: 6.95}})
    })
    test("404s on bad request", async function() {
        const resp = await request(router).get("/items/qwertyuiop")
        expect(resp.statusCode).toBe(404)
    })
})

describe("DELETE /items/:name", function() {
    test("Deletes item", async function() {
        const resp = await request(router).delete(`/items/${mcn.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({message:"Deleted"})
        
        const resp2 = await request(router).get("/items")
        expect(resp2.statusCode).toBe(200)
        expect(resp2.body).toEqual({items: []})
    })
    test("404s on bad request", async function() {
        const resp = await request(router).get("/items/qwertyuiop")
        expect(resp.statusCode).toBe(404)
    })
})