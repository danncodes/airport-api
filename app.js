const express = require("express")
const airports = require("./airports")

const app = express()

app.use(express.json())

// /Get and Post to All Airports
app.get("/airports", (req,res) => {
    res.json(airports)
})

app.post("/airports", (req, res) => {
    airports.push(req.body);
    // console.log(airports);
    res.sendStatus(201);
});

// /Get Paginated Airports
// app.get("/airports/:page/:pageSize", (req,res) => {
//     const page = req.params.page
//     const pageSize = req.params.pageSize

//     const array = airports.splice(page*pageSize,pageSize)
//     console.log("Array Length", array.length)
//     res.sendStatus(200);
// })

app.get("/airports/?page=2&pageSize=25", (req,res) => {
    const page = req.params.page
    const pageSize = req.params.pageSize
    console.log("Endpoint Hit")
    console.log(page,pageSize)

    // const array = airports.splice(page*pageSize,pageSize)
    // console.log("Array Length", array.length)
    res.sendStatus(200);
})

// /Get Airport
// app.get("/airports/:id", (req,res) => {
//     const airport = airports.find(airport => airport.icao == req.params.id);
//     res.json(airport);
// })

// /Delete Airport
app.delete("/airports/:id", (req,res) => {
    const airport = airports.find(airport => airport.icao == req.params.id);
    const index = airports.indexOf(airport)
    // console.log(airports[index],"has been deleted")
    airports.splice(index, 1)
    res.sendStatus(200);
})

// Put/Replace Airport
app.put("/airports/:id", (req, res) => {
    let airport = airports.find(airport => airport.icao == req.params.id);
    const index = airports.indexOf(airport)
    airport = req.body

    airports[index] = airport
    res.sendStatus(200);
});



module.exports = app

