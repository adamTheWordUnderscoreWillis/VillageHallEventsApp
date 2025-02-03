import axios from "axios"

const backEnd = axios.create({
    baseURL: "/api",
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
      console.log(attendeeData)
      console.log(event.id)
    return backEnd
    .patch(`/events/${event.id}/attendee`, attendeeData)
    .then(({data})=>{
        console.log("Added Attendee Response", data)
        return data
    })
}
export const removeAttendee = (event, attendeeData)=> {
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
      throw new Error(error)
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
      throw new Error(error)
    }
}

export const removeEventFromUserCalendar = async(user, calendarEventId)=>{
  try{
  const request = await axios
          .delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarEventId}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
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
          'dateTime': event.start.utc,
          'timeZone': event.start.timeZone,
        },
        'end': {
          'dateTime': event.end.utc,
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
          return request.data
    }
    catch(error){
      throw new Error(error)
    }
}
export const createNewEvent = async (formData, profile) => {
  const {name, description, start, end, logo, price} = formData
  const newEventData = {
        name: {
          text: name,
          html: name,
        },
        description: {
          text: description,
          html: description
        },
        start: {
          timezone: "Europe/London",
          utc: new Date(start).toJSON(),
        },
        end: {
          timezone: "Europe/London",
          utc: new Date(end).toJSON(),
        },
        logo: {
          crop_mask: {
            top_left: {
              x: 0,
              y: 120
            },
            width: 1920,
            height: 960
          },
          original: {
            url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F263741449%2F265578049482%2F1%2Foriginal.20220309-091348?auto=format%2Ccompress&q=75&sharp=10&s=cc685bb6d3ff0126b6b67d58d39c8046",
            width: 1920,
            height: 1080
          },
          id: "263741449",
          url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F263741449%2F265578049482%2F1%2Foriginal.20220309-091348?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C120%2C1920%2C960&s=bed03692a0ccc3ddb71d39d75b389787",
          aspect_ratio: "2",
          edge_color: "#ffffff",
          edge_color_set: true
        },
        currency: "GBP",
        price: price,
        attendees: {},
  }
  try{
    const request = await backEnd
      .post("/events/newEvent", newEventData, {
        headers:{
          authorization: profile.email 
        }
      })
      console.log(request.data)

  }
  catch(err){
    throw new Error(error)
  }
}
export const deleteEventById = async(event, profile)=>{
  try{

    const request = await backEnd
    .delete(`/events/${event.id}/deleteEvent`, {
      headers:{
        authorization: profile.email 
      }
    })
  }
  catch(err){
    throw new Error(error)
  }
}