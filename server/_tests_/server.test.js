const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("test");
  });

  afterAll(async () => {
    await connection.close();
  });
  console.log(db)
  it('should get events', async () => {
    const events = db.collection('events');
    const returnedEvents = await events.find({}).toArray()
    expect(returnedEvents).toEqual("something")
  });
});