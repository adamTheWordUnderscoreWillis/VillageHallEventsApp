const {fetchAllEvents} = require("../models/events.Models.js")

exports.getAllEvents = async (req,res) =>{
    const events = await fetchAllEvents()
    await res.status(200).send({events:events})
}

// fetchStuff = async ()=>{
//     let db = database.getDb()
//     let data = await db.collection("events").find({}).toArray()
//     if(data.length>0){
//         return data
        
//     }
//     else{
//         throw new Error("Data was not found")
//     }
// }