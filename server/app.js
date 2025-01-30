const express = require("express")
const session = require('express-session');
const cors = require("cors")
const {getAllEvents, getEventById, addAttendebyEventId, createNewEvent, deleteEventById, removeAttendeeByID} = require("./db/controllers/events.controllers");
const { handleBsonErrors, handle404Errors, handleCustomErrors, handleServerErrors } = require("./db/controllers/errorhandling");
const { getAuthorization } = require("./db/controllers/googleCalendar.controller");
const { checkStaffMemberbyEmailAddress } = require("./db/controllers/staff.controllers");

const app = express()

app.use(cors());
app.use(express.json());
app.use(session({ 
    secret: process.env.SECRET,
    saveUninitialized: false, 
    resave: false, 
    cookie: { 
        maxAge: 60000 * 60,

     }}))

app.get('/events', getAllEvents)
app.get('/events/:eventId', getEventById)
app.get('/events/:eventId', getEventById)
app.get('/auth', getAuthorization)
app.get('/staff/:emailAddress', checkStaffMemberbyEmailAddress)
app.post("/events/newEvent", createNewEvent)
app.delete("/events/:eventId/deleteEvent", deleteEventById)
app.patch("/events/:eventId/attendee", addAttendebyEventId)
app.patch("/events/:eventId/removeAttendee", removeAttendeeByID)


app.use(handleBsonErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors)
app.all("*", handle404Errors);

module.exports = app;