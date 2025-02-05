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

  async function run() {
    try {
      await client.connect()
      await client.db("development").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
  }

  let database
  module.exports = {
    connectToServer: async ()=>{
        await run().catch(console.dir);
        await client.connect()
        database = await client.db("development")
      },
      connectToTestServer: async ()=>{
        await client.connect()
        database = client.db("test")
      },
      getDb: ()=> {
        return database
      },
      disconectFromServer: ()=>{
        client.close()
      }
  }
