import express from "express";
import cors from "cors"

const PORT = process.env.PORT 
const app = express()

app.use(cors());
app.use(express.json);

// app.get('/events', getAllEvents )

app.listen(PORT, ()=>{
    console.log(`Server is listening on Port ${PORT}`)
});