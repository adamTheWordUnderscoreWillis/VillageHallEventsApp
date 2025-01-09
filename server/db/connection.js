import { MongoClient } from "mongodb";
import {dotenv} from "dotenv"

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri);

try{
    await client.connect();

    await client.db("admin").command({ping:1});
    console.log("You are succescfully connected to MongoDB!");
}
catch(err){
    console.log(err)
}

let db = client.db("test")
export default db;