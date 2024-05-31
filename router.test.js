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