const express = require("express")
const cors = require("cors")
const {getAllEvents} = require("./db/controllers/events.controllers")

const app = express()

app.use(cors());
app.use(express.json());

app.get('/events', getAllEvents)

module.exports = app;