const express = require("express")
const cors = require("cors")
const {getAllEvents, getEventById, addAttendebyEventId} = require("./db/controllers/events.controllers");
const { handleBsonErrors, handle404Errors, handleCustomErrors } = require("./db/controllers/errorhandling");

const app = express()

app.use(cors());
app.use(express.json());

app.get('/events', getAllEvents)
app.patch("/event/:eventId/attendee", addAttendebyEventId)
app.get('/events/:eventId', getEventById)
// app.patch("/event:eventId/attende", addAttendeeByID)
// app.delete("/event:eventId/attende", removeAttendeeByID)
// app.post("event", createNewEvent)
// app.delete("/event:eventId", deleteEventById)

app.use(handleBsonErrors);
app.use(handleCustomErrors);
app.all("*", handle404Errors);

module.exports = app;