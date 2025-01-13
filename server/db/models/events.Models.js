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
    let db = database.getDb()
    let data = await db.collection("events").findOne({_id: ObjectId.createFromHexString(eventId)})
        if(data !== null && Object.keys(data).length >0){
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
            throw new Error("We could not find any data for that event", {status: 404, msg: "We could not find any data for that event"})
        }
}