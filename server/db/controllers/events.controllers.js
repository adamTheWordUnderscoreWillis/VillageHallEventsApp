const {fetchAllEvents, insertNewAttendee} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res) =>{
    const events = await fetchAllEvents()
    await res.status(200).send({events:events})
}
exports.addAttendebyEventId = (req,res) =>{
    const { eventId} = req.params
    const {body} = req
    
 const response = insertNewAttendee(eventId, body)
    res.status(204).send({msg:"It's okay"})
}