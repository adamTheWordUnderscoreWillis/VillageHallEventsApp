const { fetcStaffMemberbyKey } = require("../models/staff.models")

exports.checkStaffMemberbyEmailAddress = async (req,res, next) =>{
    const {emailAddress} = req.params
   try{
       const result = await fetcStaffMemberbyKey(emailAddress)
       res.status(200).send(result)
   }
   catch(err){
    next(err)
   }
}