
const connect = require("./db/connection.js")
const app = require("./app.js")

const {PORT} = process.env

app.listen(PORT, async()=> {
    await connect.connectToServer()
    await connect.getDb()

    console.log(`Server is listening on ${PORT}`)
});

