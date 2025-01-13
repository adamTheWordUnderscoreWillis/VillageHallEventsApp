const {fetchAllEvents, fetchEventById, insertNewAttendee} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res) =>{
    const events = await fetchAllEvents()
    await res.status(200).send({events:events})
}
exports.addAttendebyEventId = async (req,res, next) =>{
    const { eventId} = req.params
    const {body} = req
    
 const response = await insertNewAttendee(eventId, body)
 console.log("This is the response", response)
    await res.status(204).send({msg:"It's okay"})

}

exports.getEventById = async (req,res,next) =>{
    const {eventId}= req.params
    try{
        const event = await fetchEventById(eventId)
        await res.status(200).send({event: event[0]})
    }
    catch(err){
        next(err)
    }
}