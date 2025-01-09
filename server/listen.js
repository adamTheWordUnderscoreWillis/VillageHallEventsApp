
const app = require("./app.js")

const {PORT} = process.env

console.log(process.env)

app.listen(PORT,()=>{
    console.log(`Server is listening on http//localhost:${PORT}`)
});

