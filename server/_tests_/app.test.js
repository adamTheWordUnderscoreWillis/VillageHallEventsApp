const app = require("../app")
const request = require("supertest")
const testDatabase = require("../db/connection")

describe('LittleTidfordApp Unit Tests', () => {

  beforeAll(async () => {
    testDatabase.connectToTestServer()
    db = testDatabase.getDb()
  })
  afterAll(async ()=>{
    testDatabase.disconectFromServer()
  })

  describe('Get All Events Endpoint', ()=>{
    test ("200: Returns Okay Status Code", ()=>{
      return request(app).get("/events").expect(200)
    })
    test("200: Return All events Data", ()=>{
      const desiredEventsData = {
          "events": [
            {
              "name": {
                "text": "Riso Club - Cut & Paste a Limited Edition Print",
                "html": "Riso Club - Cut &amp; Paste a Limited Edition Print"
              },
              "id": "677d06d3724343657a79816d",
              "description": {
                "text": "Risograph printing is  often described as digital screen printing. Think screen printing but with the convenience of a photocopier.",
                "html": "Risograph printing is  often described as digital screen printing. Think screen printing but with the convenience of a photocopier."
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2022-06-04T10:00:00",
                "utc": "2022-06-04T09:00:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2022-06-04T14:00:00",
                "utc": "2022-06-04T13:00:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 120
                  },
                  "width": 1920,
                  "height": 960
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F263741449%2F265578049482%2F1%2Foriginal.20220309-091348?auto=format%2Ccompress&q=75&sharp=10&s=cc685bb6d3ff0126b6b67d58d39c8046",
                  "width": 1920,
                  "height": 1080
                },
                "id": "263741449",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F263741449%2F265578049482%2F1%2Foriginal.20220309-091348?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C120%2C1920%2C960&s=bed03692a0ccc3ddb71d39d75b389787",
                "aspect_ratio": "2",
                "edge_color": "#ffffff",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2022-04-09T10:16:13Z",
              "price": 10,
              "attendees": {},
            },
            {
              "name": {
                "text": "An Introduction to Screen Printing",
                "html": "An Introduction to Screen Printing"
              },
              "id": "677d06d3724343657a798172",
              "description": {
                "text": "Learn the basic principles and different techniques of screen printing",
                "html": "Learn the basic principles and different techniques of screen printing"
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2025-04-12T10:30:00",
                "utc": "2025-04-12T09:30:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2025-04-12T13:30:00",
                "utc": "2025-04-12T12:30:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 0
                  },
                  "width": 940,
                  "height": 470
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F918018403%2F265578049482%2F1%2Foriginal.20241216-091457?auto=format%2Ccompress&q=75&sharp=10&s=a65d439183e35dc60578ecb04b7731e6",
                  "width": 940,
                  "height": 470
                },
                "id": "918018403",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F918018403%2F265578049482%2F1%2Foriginal.20241216-091457?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=c08ea8da2adf41e13591e587ec30b7d0",
                "aspect_ratio": "2",
                "edge_color": "#7d7575",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-12-16T09:15:22Z",
              "price": 10,
              "attendees": {},
            },
            {
              "name": {
                "text": "Italian Street Foods Making Workshop",
                "html": "Italian Street Foods Making Workshop"
              },
              "id": "677d06d3724343657a79816a",
              "description": {
                "text": "Join me for this virtual trip to Italy from North to South through regional dishes of the italian tradition.",
                "html": "Join me for this virtual trip to Italy from North to South through regional dishes of the italian tradition."
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2024-11-17T11:00:00",
                "utc": "2024-11-17T11:00:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2024-11-17T14:00:00",
                "utc": "2024-11-17T14:00:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 363
                  },
                  "width": 2000,
                  "height": 1000
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F856961009%2F650895938373%2F1%2Foriginal.20240923-141246?auto=format%2Ccompress&q=75&sharp=10&s=0ecd17a53a16d36d65af296e02b287f8",
                  "width": 2000,
                  "height": 1500
                },
                "id": "856961009",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F856961009%2F650895938373%2F1%2Foriginal.20240923-141246?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C363%2C2000%2C1000&s=a59d54d525b90b25f5e3ea7d7fd450fc",
                "aspect_ratio": "2",
                "edge_color": "#a4998a",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-09-23T13:55:33Z",
              "price": 10,
              "attendees": {},
            },
            {
              "name": {
                "text": "Basic Bread Making Workshop",
                "html": "Basic Bread Making Workshop"
              },
              "id": "677d06d3724343657a79816c",
              "description": {
                "text": "Come learn how to make delicious bread from scratch at our Basic Bread Making Workshop!",
                "html": "Come learn how to make delicious bread from scratch at our Basic Bread Making Workshop!"
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2025-03-09T11:00:00",
                "utc": "2025-03-09T11:00:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2025-03-09T14:00:00",
                "utc": "2025-03-09T14:00:00Z"
              },
              "logo": {
                "crop_mask": null,
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F915190323%2F650895938373%2F1%2Foriginal.20241210-211708?auto=format%2Ccompress&q=75&sharp=10&s=6a952b8686794e468965a53944a2651f",
                  "width": 1500,
                  "height": 2000
                },
                "id": "915190323",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F915190323%2F650895938373%2F1%2Foriginal.20241210-211708?crop=focalpoint&fit=crop&h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.50948682882&fp-y=0.718754495025&s=9d67ea1a4de9e2b4e49cb1bf345d234a",
                "aspect_ratio": "0.75",
                "edge_color": "#70543c",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-12-10T21:21:05Z",
              "price": 2,
              "attendees": {},
            },
            {
              "name": {
                "text": "Colchester Makerspace Christmas Market Briefing (Members Only)",
                "html": "Colchester Makerspace Christmas Market Briefing (Members Only)"
              },
              "id": "677d06d3724343657a79816e",
              "description": {
                "text": "Your first stall? Feeling a bit nervous? Want some tips and advice on where to start?",
                "html": "Your first stall? Feeling a bit nervous? Want some tips and advice on where to start?"
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2024-09-30T18:30:00",
                "utc": "2024-09-30T17:30:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2024-09-30T19:30:00",
                "utc": "2024-09-30T18:30:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 247
                  },
                  "width": 1080,
                  "height": 540
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F850901899%2F265578049482%2F1%2Foriginal.20240916-021646?auto=format%2Ccompress&q=75&sharp=10&s=765e167690622ecc8247e6b0e20d6a4c",
                  "width": 1080,
                  "height": 1080
                },
                "id": "850901899",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F850901899%2F265578049482%2F1%2Foriginal.20240916-021646?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C247%2C1080%2C540&s=49841fdc3a42ec711960a85b1e1ae15a",
                "aspect_ratio": "2",
                "edge_color": "#63635f",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-09-16T02:16:57Z",
              "price": 10,
              "attendees": {},
            },
            {
              "name": {
                "text": "An Introduction to Linocut",
                "html": "An Introduction to Linocut"
              },
              "id": "677d06d3724343657a798170",
              "description": {
                "text": "Enjoy the exquisite craft of Linocut, a traditional printmaking technique and a variant of woodcut.",
                "html": "Enjoy the exquisite craft of Linocut, a traditional printmaking technique and a variant of woodcut."
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2025-02-13T18:30:00",
                "utc": "2025-02-13T18:30:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2025-02-13T21:30:00",
                "utc": "2025-02-13T21:30:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 0
                  },
                  "width": 940,
                  "height": 470
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F917741023%2F265578049482%2F1%2Foriginal.20241215-175051?auto=format%2Ccompress&q=75&sharp=10&s=ed4a1e18c3be11a5a0e4e82a4c63a420",
                  "width": 940,
                  "height": 470
                },
                "id": "917741023",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F917741023%2F265578049482%2F1%2Foriginal.20241215-175051?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=cdcba10fdc78a0a5c25cb58ab137bde0",
                "aspect_ratio": "2",
                "edge_color": "#785e55",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-12-15T17:51:03Z",
              "price": 10,
              "attendees": {},
            },
            {
              "name": {
                "text": "Learn the Art of Jigsaw Lino Printing",
                "html": "Learn the Art of Jigsaw Lino Printing"
              },
              "id": "677d06d3724343657a798171",
              "description": {
                "text": "Imagine creating stunning prints by piecing together a puzzle of lino.",
                "html": "Imagine creating stunning prints by piecing together a puzzle of lino."
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2025-03-16T10:30:00",
                "utc": "2025-03-16T10:30:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2025-03-16T14:30:00",
                "utc": "2025-03-16T14:30:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 340
                  },
                  "width": 1080,
                  "height": 540
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F913758563%2F265578049482%2F1%2Foriginal.20241208-200148?auto=format%2Ccompress&q=75&sharp=10&s=856510db29b30f48f6d95ca273ecd2e4",
                  "width": 1080,
                  "height": 1349
                },
                "id": "913758563",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F913758563%2F265578049482%2F1%2Foriginal.20241208-200148?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C340%2C1080%2C540&s=c111f9d9818bc44072fbc39e22c384be",
                "aspect_ratio": "2",
                "edge_color": "#8f8b83",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-12-08T18:53:01Z",
              "price": 10,
              "attendees": {},
            },
            {
              "name": {
                "text": "Teapot Masterclass",
                "html": "Teapot Masterclass"
              },
              "id": "677d06d3724343657a79816f",
              "description": {
                "text": "Explore the art of teapot creation with Neville Tatham.",
                "html": "Explore the art of teapot creation with Neville Tatham."
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2025-02-03T18:30:00",
                "utc": "2025-02-03T18:30:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2025-02-03T20:30:00",
                "utc": "2025-02-03T20:30:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 659
                  },
                  "width": 1440,
                  "height": 720
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F909291443%2F265578049482%2F1%2Foriginal.20241201-125701?auto=format%2Ccompress&q=75&sharp=10&s=0f82c96189b7568fb72b09f44eca7ac5",
                  "width": 1440,
                  "height": 1799
                },
                "id": "909291443",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F909291443%2F265578049482%2F1%2Foriginal.20241201-125701?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C659%2C1440%2C720&s=d1cd89b2ef9f24dcf4276c3aa7d32e3c",
                "aspect_ratio": "2",
                "edge_color": "#9a7a50",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-12-01T13:14:34Z",
              "price": 10.5,
              "attendees": {},
            },
            {
              "name": {
                "text": "Focaccia Making workshop",
                "html": "Focaccia Making workshop"
              },
              "id": "677d06d3724343657a79816b",
              "description": {
                "text": "Join us for a hands-on Focaccia Making workshop where you'll learn to bake delicious Italian bread from scratch!",
                "html": "Join us for a hands-on Focaccia Making workshop where you'll learn to bake delicious Italian bread from scratch!"
              },
              "start": {
                "timezone": "Europe/London",
                "local": "2025-02-02T11:00:00",
                "utc": "2025-02-02T11:00:00Z"
              },
              "end": {
                "timezone": "Europe/London",
                "local": "2025-02-02T14:00:00",
                "utc": "2025-02-02T14:00:00Z"
              },
              "logo": {
                "crop_mask": {
                  "top_left": {
                    "x": 0,
                    "y": 1079
                  },
                  "width": 3000,
                  "height": 1500
                },
                "original": {
                  "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F904634603%2F650895938373%2F1%2Foriginal.20241122-155250?auto=format%2Ccompress&q=75&sharp=10&s=8eb81e331f992a55d273692798c187bd",
                  "width": 3001,
                  "height": 4001
                },
                "id": "904634603",
                "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F904634603%2F650895938373%2F1%2Foriginal.20241122-155250?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C1079%2C3000%2C1500&s=0072f7958000510fe557ba387aa9310c",
                "aspect_ratio": "2",
                "edge_color": "#838289",
                "edge_color_set": true
              },
              "currancy": "GBP",
              "created": "2024-11-22T15:55:50Z",
              "price": 10,
              "attendees": {},
            }
          ]
        }
      return request(app)
      .get("/events")
      .then(({body})=>{
        expect(body).toEqual(desiredEventsData)
      })
    })
  })
});