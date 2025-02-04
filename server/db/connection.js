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
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect()
      // Send a ping to confirm a successful connection
      await client.db("development").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
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
        // await client.connect()
        // database = await client.db("development")
        return database
      },
      disconectFromServer: ()=>{
        client.close()
      }
  }
