const express = require("express")
const airports = require("./airports")

const app = express()

app.use(express.json())

app.get("/airports", (req, res) => {
    let { page = 0, pageSize = 25 } = req.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const airportsPage = airports.slice(
        page * pageSize,
        page * pageSize + pageSize
    );
    // console.log({ page, pageSize });
    // console.log(airportsPage.length);
    res.json(airportsPage);
});

app.post("/airports", (req, res) => {
    airports.push(req.body);
    // console.log(airports);
    res.sendStatus(201);
});



app.get("/airports/:id", (req,res) => {
    const airport = airports.find(airport => airport.icao == req.params.id);
    res.json(airport);
})

app.delete("/airports/:id", (req,res) => {
    const airport = airports.find(airport => airport.icao == req.params.id);
    const index = airports.indexOf(airport)
    // console.log(airports[index],"has been deleted")
    airports.splice(index, 1)
    res.sendStatus(200);
})

app.put("/airports/:id", (req, res) => {
    let airport = airports.find(airport => airport.icao == req.params.id);
    const index = airports.indexOf(airport)
    airport = req.body

    airports[index] = airport
    res.sendStatus(200);
});



module.exports = app

