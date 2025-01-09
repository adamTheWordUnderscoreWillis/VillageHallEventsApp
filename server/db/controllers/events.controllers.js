const {fetchAllEvents} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res) =>{
    const events = await fetchAllEvents()
    await res.status(200).send({events:events})
}
exports.addAttendebyEventId = (req,res) =>{

    res.status(200).send({msg:"It's okay"})
}