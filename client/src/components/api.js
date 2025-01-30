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
export const addAttendee = (event, profile)=> {
  console.log({id: event.id, profile})
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
    console.log({id: event.id, profile})
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
          console.log("Request data ", request.data)
          return request.data
    }
    catch(error){
      console.log(error)
    }
  }
}