import app from "./app.js"
import dotenv from "dotenv"


const {PORT=9000} = process.env

app.listen(PORT,()=>{
    console.log(`Server is listening on http//localhost:${PORT}`)
});

