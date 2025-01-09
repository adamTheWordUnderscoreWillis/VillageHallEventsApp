// import express from "express";
// import cors from "cors"
// import  getAllEvents  from "./eventsControllers.js";

// import dotenv from "dotenv"
const express = require("express")
const cors = require("cors")
const {getAllEvents} = require("./eventsControllers.js")
const dotenv= require("dotenv")
dotenv.config();


const app = express()

app.use(cors());
app.use(express.json());

app.get('/events', getAllEvents)

module.exports = app;