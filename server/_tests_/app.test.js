const app = require("../app")
const request = require("supertest")
const testDatabase = require("../db/connection")
const {MongoClient, ServerApiVersion} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

describe('LittleTidfordApp Unit Tests', () => {

  beforeAll(async () => {
    testDatabase.connectToServer()
    db = testDatabase.getDb()
    console.log(db)
  })
  afterAll(async ()=>{
    testDatabase.disconectFromServer()
  })

  describe('Get All Events Endpoint', ()=>{
    test ("200: Returns Okay Status Code", ()=>{
      return request(app).get("/events").expect(200)
    })
    test("200: Return All events Data", ()=>{
      const desiredData = {
        testData: "testData"
      }
      return request(app)
      .get("/events")
      .then(({body})=>{
        expect(body).toEqual(desiredData)
      })
    })
  })
});