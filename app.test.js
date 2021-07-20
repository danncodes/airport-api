const originalAirports = require("./airports.json");
const airports = require("./airports");
const app = require("./app");
const request = require("supertest");

describe("airport tests", () => {
    test("GET /airports should return all airports", (done) => {
        request(app)
            .get("/airports")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(originalAirports);
                done();
            });
    });
    test("POST /restaurants should create the new restaurant", (done) => {
        const newAirport = {
            "icao": "XXXX",
            "iata": "",
            "name": "Test Airport",
            "city": "Daniel Town",
            "state": "London",
            "country": "UK",
            "elevation": 450,
            "lat": 59.94919968,
            "lon": -151.695999146,
            "tz": "America/Anchorage"
        };
        request(app)
            .post("/airports")
            .send(newAirport)
            .expect(201)
            .end(() => {
                console.log("HERE!!!!", airports[airports.length-1])
                expect(airports[airports.length-1]).toEqual(newAirport);
                return done();
            });
    });
});