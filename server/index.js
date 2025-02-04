
const connect = require("./db/connection.js")
const app = require("./app.js")

const {PORT} = process.env

app.listen(PORT, async()=> {
    await connect.connectToServer()
    const data = await connect.getDb()
    console.log(data)

    console.log(`Server is listening on ${PORT}`)
});

