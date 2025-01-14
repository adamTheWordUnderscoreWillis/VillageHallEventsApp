const {fetchAllEvents, fetchEventById, insertNewAttendee, insertNewEvent} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res) =>{
    const events = await fetchAllEvents()
    await res.status(200).send({events:events})
}
exports.addAttendebyEventId = async (req,res, next) =>{
    const { eventId} = req.params
    const {body} = req
    
 const response = await insertNewAttendee(eventId, body)
    await res.status(201).send({msg:"It's okay"})
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
exports.createNewEvent = async(req,res,next)=>{
    
    try{
        const event = await insertNewEvent(req.body)
        console.log(event)
        await res.status(201).send({msg: `${req.body.name.text} event added to database`, id: event.insertedId })
    }
    catch(err){
        console.log("The error, ", err)
        next(err)
    }
}