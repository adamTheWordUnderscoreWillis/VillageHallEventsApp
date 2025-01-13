const { ObjectId } = require("mongodb")
const database = require("../connection.js")
exports.fetchAllEvents = async ()=>{
    let db = database.getDb()
    let data = await db.collection("events").find({}).toArray()
    if(data.length>0){
        const formattedData = data.map((event)=>{
            return {
                name: event["name"],
                id: event["_id"],
                description: event["description"],
                start: event["start"],
                end: event["end"],
                logo: event["logo"],
                currancy: event["currency"],
                created: event["created"],
                price: event["price"],
                attendees: event["attendees"]
            }
        })
        return formattedData
    }
    else{
        throw new Error("Data was not found")
    }
}
exports.fetchEventById = async (eventId)=>{

    console.log("This should be the ID: ", ObjectId.createFromHexString(eventId))

    let db = database.getDb()
    let data = await db.collection("events").findOne({_id: ObjectId.createFromHexString(eventId)})
    if(Object.keys(data).length >0){
        const formattedData = [data].map((event)=>{
            return {
                name: event["name"],
                id: event["_id"],
                description: event["description"],
                start: event["start"],
                end: event["end"],
                logo: event["logo"],
                currancy: event["currency"],
                created: event["created"],
                price: event["price"],
                attendees: event["attendees"]
            }
        })
        return formattedData
    }
    else{
        throw new Error("Data was not found")
    }
}