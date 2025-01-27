
const connect = require("./db/connection.js")
const app = require("./app.js")

const {PORT} = process.env
console.log(process.env)
app.listen(PORT,()=>{
    connect.connectToServer()
    console.log(`Server is listening on http//localhost:${PORT}`)
});

