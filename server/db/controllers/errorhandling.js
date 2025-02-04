const { BSONError } = require("bson")

exports.handleBsonErrors = (err,req,res,next)=>{
    if(err instanceof BSONError){
       return res.status(404).send({ msg: "Database Error: We cannot find the thing you seek..." })
    }
    else next(err);
}
exports.handleCustomErrors = (err,req,res,next)=>{
    if(err.msg && err.status){
       return res.status(err.status).send({msg: err.msg})
    }
    else next(err);
}
exports.handleServerErrors = (err,req,res,next)=>{
    console.log(err)
       return res.status(500).send({ msg: "Internal Server Error"})
}

exports.handle404Errors = (req, res) =>{
    res.status(404).send({msg: "I'm afraid that does not exist"})
}