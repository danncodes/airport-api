const express = require("express")
const airports = require("./airports")

const app = express()

app.use(express.json())

// /Get and Post to All Airports
app.get("/airports", (req,res) => {
    res.json(airports)
})

app.post("/airports", (req, res) => {
    aiports.push(req.body);
    console.log(aiports);
    res.sendStatus(201);
});

module.exports = app

