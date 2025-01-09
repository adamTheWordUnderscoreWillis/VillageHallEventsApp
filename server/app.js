import express from "express";
import cors from "cors"
import  getAllEvents  from "./eventsControllers.js";


const app = express()

app.use(cors());
app.use(express.json());

app.get('/events', getAllEvents)

export default app