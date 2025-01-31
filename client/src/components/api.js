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

export const fetchUserCalendarEvents = async(user)=>{
  try{
  const request = await axios
          .get(`https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${"Little Tidford Village Hall"}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          return request.data.items
    }
    catch(error){
      console.log("This is the fetch Error", error)
    }
}

export const removeEventFromUserCalendar = async(user, calendarEventId)=>{
  console.log("The id coming in", calendarEventId)
  try{
  const request = await axios
          .delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarEventId}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          console.log(request.data)
          return request.data
    }
    catch(error){
      console.log("This is the delete Error", error)
    }
}
export const addEventToUserCalendar = async (user, event) => {
    try{
      const requestEvent = {
        'summary': event.name.text,
        'location': 'Little Tidford Village Hall, 53 The street, Little Tidford, LT9 9LT',
        'description': event.description.text,
        'start': {
          'dateTime': event.start.local+"-00:00",
          'timeZone': event.start.timeZone,
        },
        'end': {
          'dateTime': event.end.local+"-00:00",
          'timeZone': event.start.timeZone,
        },
        'organizer':{email:"littletidfordvillagehall@gmail.com"},
        'attendees': [
        ],
      };
      Object.keys(event.attendees).map((user)=> requestEvent.attendees.push({email: user}))

      const request = await axios
          .post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`,requestEvent, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          console.log("This is the request: ", request.data)
          return request.data
    }
    catch(error){
      console.log("This is the error", error)
    }
}