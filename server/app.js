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
// app.use(session({ 
//     secret: process.env.SECRET,
//     saveUninitialized: false, 
//     resave: false, 
//     cookie: { 
//         maxAge: 60000 * 60,

//      }}))
app.get('/api/', (req,res)=>{
    res.status(200).send({msg: "The server is up and working"})
})
app.get('/api/events', getAllEvents)
app.get('/api/events/:eventId', getEventById)
app.get('/api/events/:eventId', getEventById)
app.get('/api/auth', getAuthorization)
app.get('/api/staff/:emailAddress', checkStaffMemberbyEmailAddress)
app.post("/api/events/newEvent", createNewEvent)
app.delete("/api/events/:eventId/deleteEvent", deleteEventById)
app.patch("/api/events/:eventId/attendee", addAttendebyEventId)
app.patch("/api/events/:eventId/removeAttendee", removeAttendeeByID)


app.use(handleBsonErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors)
app.all("*", handle404Errors);

module.exports = app;