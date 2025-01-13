
const {fetchAllEvents, fetchEventById} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res) =>{
    const events = await fetchAllEvents()
    await res.status(200).send({events:events})
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