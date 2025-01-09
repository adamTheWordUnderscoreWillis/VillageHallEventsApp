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
                
            }
        })
        console.log(formattedData)
        return formattedData
    }
    else{
        throw new Error("Data was not found")
    }
}