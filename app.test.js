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
    test("POST /Airport should create the new Airport", (done) => {
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
                // console.log(airports[airports.length-1])
                expect(airports[airports.length-1]).toEqual(newAirport);
                return done();
            });
    });
    test("GET /airport should return a specific airport", (done) => {
        const airport = airports[Math.floor(Math.random()*airports.length)];
        request(app)
            .get("/airports/"+ airport.icao)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(airport);
                done();
            });
    });
    test("DELETE /airport should return a specific airport", (done) => {
        const originalAirportLength = airports.length
        const airport = airports[Math.floor(Math.random()*airports.length)];
        request(app)
        
            .delete("/airports/"+ airport.icao)
            .expect(200)
            .then((response) => {
                expect(airports.length).toEqual(originalAirportLength-1);
                done();
            });
    });
    test("PUT /airport should return a specific airport", (done) => {
        const airport = airports[Math.floor(Math.random()*airports.length)];
        const newAirport = {
            "icao": "GR0D",
            "iata": "",
            "name": "Random Airport",
            "city": "Multiverse City",
            "state": "London",
            "country": "UK",
            "elevation": 450,
            "lat": 59.94919968,
            "lon": -151.695999146,
            "tz": "America/Anchorage"
        };
        const index = airports.indexOf(airport)

        request(app)
            .put("/airports/"+ airport.icao)
            .send(newAirport2)
            .then((response) => {
                expect(200)
                console.log("New Airport",newAirport)
                expect(airports[index]).toEqual(newAirport);
                done();
            });
    });
    
});