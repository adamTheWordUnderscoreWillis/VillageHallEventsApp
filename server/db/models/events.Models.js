const { ObjectId } = require("mongodb")
const database = require("../connection.js")
exports.fetchAllEvents = async ()=>{
    await database.connectToServer('development')
    let db = database.getDb()
    try{
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
                    currency: event["currency"],
                    created: event["created"],
                    price: event["price"],
                    attendees: event["attendees"]
                }
            })
            return formattedData
        }
        else{
            return []
        }
    }
    catch(err){
        throw {msg: err,db:db, status: 400}
    }
    
}

exports.fetchEventById = async (eventId)=>{
    await database.connectToServer('development')
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
                    currency: event["currency"],
                    created: event["created"],
                    price: event["price"],
                    attendees: event["attendees"]
                }
            })
            return formattedData
        }

        else{
            throw {status: 404, msg: "We could not find any data for that event"}
        }
}

exports.insertNewAttendee = async (eventId, body)=>{
    await database.connectToServer('development')
        let db = database.getDb()
        let query = {_id: ObjectId.createFromHexString(eventId)}
        let data = await db.collection("events").findOne(query)
        if(data !== null && Object.keys(data).length >0){  
            const attendeeKey = Object.keys(body)
            data.attendees[attendeeKey[0]] = body[attendeeKey[0]]

            let update = {$set: {attendees: data.attendees}}
                let updateResponse = await db.collection("events").updateOne(query, update)
                if(updateResponse.modifiedCount < 1){
                    throw {status: 404, msg: `We were not able to update the attendees data`}
                }
                else{
                    return updateResponse
                }
        }
        else{
            throw {status: 404, msg: "We could not find any data for that event"}
        }
        
        

    
}
exports.insertNewEvent = async(newEvent, authorization)=>{
    const event =  {
        name: newEvent.name,
        description: newEvent.description,
        start: newEvent.start,
        end: newEvent.end,
        logo: newEvent.logo,
        currency: newEvent.currency,
        price: newEvent.price,
        attendees: newEvent.attendees,
        created: new Date().toJSON()
    }   await database.connectToServer('development')
        let db = database.getDb()
        let staff = await db.collection("staff").findOne({email: authorization})

        if(!staff){
            throw {status: 400, msg: "This account is not allowed to create events"}
        }
        else{
            
            let data = await db.collection("events").insertOne(event)
            if(data.acknowledged === true){
                return data
            }
            else{
                throw {status: 400, msg: "Event could not be added to database"}
            }
        }
}
exports.removeEventById = async (eventId, authorization)=>{
    await database.connectToServer('development')
    let db = database.getDb()
        let staff = await db.collection("staff").findOne({email: authorization})

        if(!staff){
            throw {status: 400, msg: "This account is not allowed to delete events"}
        }
        else{
            let deletedEvent = await db.collection("events").deleteOne({_id: ObjectId.createFromHexString(eventId)})
            if(deletedEvent.deletedCount > 0){
                return deletedEvent
            }
            else{
                throw {status: 400, msg: "The event you tried to delete doesn't exist"}
            }
        }
}
exports.deleteAttendee = async (eventId ,body)=>{
    await database.connectToServer('development')
    let db = database.getDb()
        let query = {_id: ObjectId.createFromHexString(eventId)}
        let data = await db.collection("events").findOne(query)
        if(data !== null && Object.keys(data).length >0){  
            const attendeeKey = Object.keys(body)
            delete data.attendees[attendeeKey[0]]
            let deleteStatement = {$unset: {attendees: ""}}
            let update = {$set: {attendees: data.attendees}}
            let deleteString = await db.collection("events").updateOne(query, deleteStatement)
            let updateString = await db.collection("events").updateOne(query, update)

            if(deleteString.modifiedCount <1){
                throw {status: 404, msg: "Could not find attendees data"}
            }
            else if(updateString.modifiedCount < 1){
                throw {status: 404, msg: "User was not signed up to event"}
            }
            else{
                return {msg: `${body[attendeeKey[0]]} has been removed from event ${eventId}`}
            }
        }
        else{
            throw {status: 404, msg: "We could not find any data for that event"}
        }
}