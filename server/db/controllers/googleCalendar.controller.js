exports.getAuthorization = async (req,res)=>{
    fetchCredentials()
    await res.status(200).send({msg: "It's okay"})
}