const { ObjectId } = require("mongodb")
const database = require("../connection.js")
exports.fetcStaffMemberbyKey = async(emailAddress)=>{
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
   
    
    if(regex.test(emailAddress)){
        let db = database.getDb()
        let data = await db.collection("staff").findOne({email: emailAddress})
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
    }
    else{
        throw {status: 400, msg: "This endpoint ony accepts email addresses"}
    }
}