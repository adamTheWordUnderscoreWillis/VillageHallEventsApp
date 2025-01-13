const { BSONError } = require("bson")

exports.handleBsonErrors = (err,req,res,next)=>{
    if(err instanceof BSONError){
       return res.status(404).send({ msg: "Database Error: We cannot find the thing you seek..." })
    }
    else next(err);
}
exports.handleCustomErrors = (err,req,res,next)=>{
    if(err.message){
        console.log( "It's im the error handler, ", err.message)
       return res.status(404).send({msg: err.message})
    }
    else next(err);
}

exports.handle404Errors = (req, res) =>{
    res.status(404).send({msg: "I'm afraid that does not exist"})
}