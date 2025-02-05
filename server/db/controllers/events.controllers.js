const {fetchAllEvents, fetchEventById, insertNewAttendee, insertNewEvent, removeEventById, deleteAttendee} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res,next) =>{
    try{
        const events = await fetchAllEvents()
        await res.status(200).send({events:events})
    }
    catch(err){
        console.log(err)
        next(err)
    }
}


exports.getEventById = async (req,res,next) =>{
    const {eventId}= req.params
    try{
        const event = await fetchEventById(eventId)
        await res.status(200).send({event: event[0]})
    }
    catch(err){
        console.log(err)
        next(err)
    }
}
exports.createNewEvent = async(req,res,next)=>{
    const {authorization} = req.headers
    const newEvent = req.body
    try{
        const event = await insertNewEvent(newEvent, authorization)
        await res.status(201).send({msg: `${newEvent.name.text} event added to database`, id: event.insertedId })
    }
    catch(err){
        console.log(err)
        next(err)
    }
}
exports.deleteEventById = async (req,res,next)=>{
    const {eventId}= req.params
    const {authorization} = req.headers
    try{
        await removeEventById(eventId, authorization)
        await res.status(204).send()
    }
    catch(err){
        console.log(err)
        next(err)
    }
}
exports.addAttendebyEventId = async (req,res, next) =>{
    const { eventId} = req.params
    const {body} = req
    
    try{
        await insertNewAttendee(eventId, body)
        userKey = Object.keys(body)[0]
        await res.status(201).send({msg:`User: ${body[userKey]} has been added to event ${eventId}`})
    }
    catch(err){
        console.log(err)
        next(err)
    }
}
exports.removeAttendeeByID = async (req,res, next)=>{
    const { eventId} = req.params
    const {body} = req
    
    try{
        const response = await deleteAttendee(eventId, body)
        await res.status(201).send(response)

    }
    catch(err){
        console.log(err)
        next(err)
    }
}