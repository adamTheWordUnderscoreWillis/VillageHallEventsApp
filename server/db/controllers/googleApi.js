const { authorizeClient, fetchToken, createCalendarEvent, fetchUserInfo } = require("../models/googleApi.model")
const crypto = require("crypto")
const url = require('url')

exports.getClientAuthorization = async (req,res,next)=> {
  try{

    const state = crypto.randomBytes(32).toString('hex')
    console.log(req.session.id)
    req.session.state = state
    const response = await authorizeClient(state)
    res.redirect(response)
  }
  catch(err){
    console.log(err)
    next(err)

  }
}
exports.receiveAccessToken= async(req,res, next)=>{
    let q = url.parse(req.url, true).query
    let state = req.session.state

    

    try{
        const auth = await fetchToken(q,state)
        
        res.status(200).send({calendarData})
    }
    catch(err){
        console.log(err)
        next(err)
    }

}
exports.addEventToCalendar = ()=>{
  // const event = {
    //     'summary': 'Google I/O 2015',
    //     'location': '800 Howard St., San Francisco, CA 94103',
    //     'description': 'A chance to hear more about Googles developer products.',
    //     'start': {
    //       'dateTime': '2025-01-28T09:00:00-07:00',
    //       'timeZone': 'America/Los_Angeles',
    //     },
    //     'end': {
    //       'dateTime': '2025-01-28T17:00:00-07:00',
    //       'timeZone': 'America/Los_Angeles',
    //     },
    //     'attendees': [
    //       {'email': 'lpage@example.com'},
    //       {'email': 'sbrin@example.com'},
    //     ],
    //   };
// const calendarData = await createCalendarEvent(event, auth)
}