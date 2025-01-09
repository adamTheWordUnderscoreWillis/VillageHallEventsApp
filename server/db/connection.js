const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv")
dotenv.config()

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  let database
  module.exports = {
      connectToServer: ()=>{
        database = client.db("test")
      },
      getDb: ()=> {
        return database
      }
  }
