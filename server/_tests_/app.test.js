const app = require("../app")
const request = require("supertest")

describe('LittleTidfordApp Unit Tests', () => {

  describe('Get All Events Endpoint', ()=>{
    test ("200: Returns Okay Status Code", ()=>{
      return request(app).get("/events").expect(200)
    })
  })
});