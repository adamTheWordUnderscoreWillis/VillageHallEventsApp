const express = require("express")
const cors = require("cors")
const {getAllEvents, getEventById, addAttendebyEventId, createNewEvent, deleteEventById} = require("./db/controllers/events.controllers");
const { handleBsonErrors, handle404Errors, handleCustomErrors } = require("./db/controllers/errorhandling");

const app = express()

app.use(cors());
app.use(express.json());

app.get('/events', getAllEvents)
app.patch("/event/:eventId/attendee", addAttendebyEventId)
app.get('/events/:eventId', getEventById)
// app.delete("/event:eventId/attende", removeAttendeeByID)
app.post("/events/newEvent", createNewEvent)
app.delete("/events/:eventId/deleteEvent", deleteEventById)

app.use(handleBsonErrors);
app.use(handleCustomErrors);
app.all("*", handle404Errors);

module.exports = app;