const { ObjectId } = require("mongodb")
const database = require("../connection.js")
exports.fetcStaffMemberbyKey = async(emailAddress)=>{
    let db = database.getDb()
    let data = await db.collection("staff").findOne({email: emailAddress})
    console.log(data)
    if(!data){
        return {
            queriedEmailAddress: emailAddress,
            staffCheck: false,
            msg: `We could not find user: ${emailAddress} in the database`
        }
    }
    else if(data.email === emailAddress){
        return {
            queriedEmailAddress: emailAddress,
            staffCheck: true,
            msg: `${emailAddress} is a staff member`
        }
    }
    console.log("data from staff Database: ",data)
}