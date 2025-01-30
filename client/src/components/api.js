import axios from "axios"

const backEnd = axios.create({
    baseURL: "http://localhost:5050",
});

export const fetchEvents = ()=> {
    return backEnd
    .get("/events")
    .then(({data})=>{
        return data
    })
}
export const fetchStaffMember = (emailAddress)=> {
  try{
    return backEnd
    .get(`/staff/${emailAddress}`)
    .then(({data})=>{
      console.log(data)
        return data
    })
  }
  catch(err){
    console.log(err)
  }
}
export const addAttendee = (event, profile)=> {
    const attendeeData = {
        [profile.email]: profile.name
      }
    return backEnd
    .patch(`/events/${event.id}/attendee`, attendeeData)
    .then(({data})=>{
        console.log("Added Attendee Response", data)
        return data
    })
}
export const removeAttendee = (event, profile)=> {
    const attendeeData = {
      [profile.email]: profile.name
    }
    return backEnd
    .patch(`/events/${event.id}/RemoveAttendee`, attendeeData)
    .then(({data})=>{
        console.log("Removed Attendee Response", data)
        return data
    })
}

export const getUsernfo = async (user) => {
  if (user) {
    try{
      const request = await axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          return request.data
    }
    catch(error){
      console.log(error)
    }
  }
}
export const addEventToUserCalendar = async (user) => {

  console.log("This is the user: ", user)
    try{
      const event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Googles developer products.',
        'start': {
          'dateTime': '2025-01-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        'end': {
          'dateTime': '2025-01-28T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        'attendees': [
          {'email': 'lpage@example.com'},
          {'email': 'sbrin@example.com'},
        ],
      };

      const request = await axios
          .post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`,event, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          console.log(request.data)
          return request.data
    }
    catch(error){
      console.log(error)
    }
}